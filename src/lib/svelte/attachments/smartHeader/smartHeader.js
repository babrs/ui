export function smartHeader({ topOffset = 0, hideDistance, onhide } = {}) {
	return (node) => {
		const distance = () => hideDistance ?? node.offsetHeight;
		let lastY = Math.max(window.scrollY, 0);
		let shift = lastY > topOffset ? -distance() : 0;
		let frame = 0;

		const render = () => node.style.setProperty('--smart-header-shift', `${shift}px`);

		const update = () => {
			frame = 0;
			const y = Math.max(window.scrollY, 0);
			const delta = y - lastY;
			lastY = y;

			if (y <= topOffset) {
				shift = 0;
				node.removeAttribute('data-solid');
			} else if (delta < 0) {
				shift = Math.min(0, shift - delta);
				node.setAttribute('data-solid', '');
			} else if (delta > 0) {
				shift = Math.max(-distance(), shift - delta);
				node.removeAttribute('data-solid');
				onhide?.();
			}

			render();
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		render();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(frame);
		};
	};
}
export default smartHeader;
