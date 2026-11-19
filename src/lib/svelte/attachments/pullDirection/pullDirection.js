const IGNORE = [
	'button',
	'a',
	'input',
	'textarea',
	'select',
	'option',
	'label',
	'[contenteditable="true"]',
	'[data-pull-ignore]'
].join(',');

const EVENTS = {
	touch: ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
	pointer: ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'],
	mouse: ['mousedown', 'mousemove', 'mouseup', 'blur']
};

/** @returns {'touch' | 'pointer' | 'mouse'} */
function detectType() {
	if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return 'touch';
	if (window.PointerEvent) return 'pointer';
	return 'mouse';
}

/**
 * @param {number} dx
 * @param {number} dy
 * @param {number} threshold
 * @returns {'left' | 'right' | 'up' | 'down' | null}
 */
function getDirection(dx, dy, threshold) {
	const ax = Math.abs(dx);
	const ay = Math.abs(dy);

	if (Math.max(ax, ay) < threshold) return null;
	if (ax > ay) return dx > 0 ? 'right' : 'left';
	return dy > 0 ? 'down' : 'up';
}

/**
 * Attachment: распознаёт свайп по узлу и вызывает обработчик с направлением.
 * @param {(detail: { direction: string, dx: number, dy: number, axis: string, input: string, originalEvent: Event }) => void} handler - Вызывается при смене направления жеста
 * @param {{ threshold?: number, continuous?: boolean, preventScroll?: boolean, touchAction?: string | false, ignore?: string }} [options] - Настройки распознавания
 * @returns {(node: HTMLElement) => () => void} Функция-attachment для `{@attach ...}`
 */
export default function pullDirection(handler, options = {}) {
	const {
		threshold = 12,
		continuous = false,
		preventScroll = true,
		touchAction = 'none',
		ignore = IGNORE
	} = options;

	return (node) => {
		const type = detectType();
		const [START, MOVE, END, CANCEL] = EVENTS[type];

		const startOpts = type === 'touch' ? { passive: true } : undefined;
		const moveOpts = type === 'touch' ? { passive: !preventScroll } : undefined;

		if (touchAction !== false) node.style.touchAction = touchAction;

		/** @type {{ id: number | null, sx: number, sy: number, last: string | null } | null} */
		let state = null;

		/** @param {any} event */
		function getPoint(event) {
			if (type === 'touch') {
				const list = event.touches || event.changedTouches;

				for (const t of list) {
					if (state?.id == null || t.identifier === state.id) {
						return { x: t.clientX, y: t.clientY, id: t.identifier };
					}
				}

				return null;
			}

			return {
				x: event.clientX,
				y: event.clientY,
				id: type === 'pointer' ? event.pointerId : null
			};
		}

		function stop() {
			if (!state) return;

			state = null;

			window.removeEventListener(MOVE, move);
			window.removeEventListener(END, end);
			window.removeEventListener(CANCEL, stop);
		}

		/** @param {any} event */
		function start(event) {
			if (event.defaultPrevented) return;
			if (ignore && event.target?.closest?.(ignore)) return;
			if (type !== 'touch' && event.button !== 0) return;

			stop();

			const point = getPoint(event);
			if (!point) return;

			state = { id: point.id, sx: point.x, sy: point.y, last: null };

			window.addEventListener(MOVE, move, moveOpts);
			window.addEventListener(END, end);
			window.addEventListener(CANCEL, stop);
		}

		/** @param {any} event */
		function move(event) {
			if (!state) return;
			if (type === 'pointer' && event.pointerId !== state.id) return;

			const point = getPoint(event);
			if (!point) return;

			const dx = point.x - state.sx;
			const dy = point.y - state.sy;
			const direction = getDirection(dx, dy, threshold);

			if (!direction) return;
			if (preventScroll && event.cancelable) event.preventDefault();
			if (!continuous && direction === state.last) return;

			state.last = direction;

			handler({
				direction,
				dx,
				dy,
				axis: direction === 'left' || direction === 'right' ? 'x' : 'y',
				input: type === 'pointer' ? event.pointerType : type,
				originalEvent: event
			});
		}

		/** @param {any} event */
		function end(event) {
			if (!state) return;
			if (type === 'pointer' && event.pointerId !== state.id) return;

			stop();
		}

		node.addEventListener(START, start, startOpts);

		return () => {
			stop();
			node.removeEventListener(START, start, startOpts);
			node.style.touchAction = '';
		};
	};
}
