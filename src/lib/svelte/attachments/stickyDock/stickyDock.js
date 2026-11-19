/**
 * Attachment: липкая панель, которая прячется при прокрутке вниз и возвращается при прокрутке вверх.
 * @param {{ side?: 'top' | 'bottom', offset?: number | string }} [options] - Сторона прилипания и отступ от края
 * @returns {(node: HTMLElement) => (() => void) | undefined} Функция-attachment для `{@attach stickyDock(...)}`
 */
export default function stickyDock({ side = 'top', offset = 0 } = {}) {
	return (node) => {
		if (typeof window === 'undefined') return;

		const isTop = side !== 'bottom';
		const dockSide = isTop ? 'top' : 'bottom';
		const offsetPx = typeof offset === 'number' ? offset : parseFloat(offset) || 0;
		const offsetCss = typeof offset === 'number' ? `${offset}px` : (offset ?? '0px');

		const originalStyle = node.getAttribute('style');
		const style = node.style;

		let height = node.offsetHeight;
		let lastScrollY = window.scrollY;
		let mode = '';
		let exited = false;
		let ticking = false;

		const setMode = (next) => {
			if (mode === next) return;
			mode = next;
			style[dockSide] = next === 'dock' ? offsetCss : `-${height}px`;
		};

		const init = () => {
			style.position = 'sticky';
			style[isTop ? 'bottom' : 'top'] = '';
			setMode('hidden');
		};

		const update = () => {
			ticking = false;

			const y = window.scrollY;
			const delta = y - lastScrollY;
			if (delta === 0) return;

			lastScrollY = y;
			const scrollingDown = delta > 0;
			const rect = node.getBoundingClientRect();

			if (isTop) {
				if (rect.top > offsetPx + 0.5) exited = false;

				if (scrollingDown) {
					const wasDocked = mode === 'dock';
					setMode('hidden');
					if (wasDocked || node.getBoundingClientRect().bottom <= 0) exited = true;
				} else if (exited || rect.bottom <= 0) {
					exited = true;
					setMode('dock');
				} else {
					setMode('hidden');
				}
			} else {
				const vh = window.visualViewport?.height ?? window.innerHeight;

				if (rect.bottom < vh - offsetPx - 0.5) exited = false;

				if (!scrollingDown) {
					const wasDocked = mode === 'dock';
					setMode('hidden');
					if (wasDocked || node.getBoundingClientRect().top >= vh) exited = true;
				} else if (exited || rect.top >= vh) {
					exited = true;
					setMode('dock');
				} else {
					setMode('hidden');
				}
			}
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		};

		const ro = new ResizeObserver(([entry]) => {
			const h = Math.ceil(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
			if (h === height) return;
			height = h;
			if (mode === 'hidden') style[dockSide] = `-${height}px`;
		});

		init();
		ro.observe(node);
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			ro.disconnect();

			if (originalStyle === null) node.removeAttribute('style');
			else node.setAttribute('style', originalStyle);
		};
	};
}
