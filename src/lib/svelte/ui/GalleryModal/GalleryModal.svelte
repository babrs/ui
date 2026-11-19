<script>
	import Modal from '../Modal/index.js';
	import pullDirection from '../../attachments/pullDirection/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {Array<any>} items - Элементы галереи
	 * @property {number} index - Индекс открытого элемента
	 * @property {string} [labelledby] - id заголовка окна
	 * @property {(index: number) => void} [onchange] - Вызывается при переходе к другому элементу
	 * @property {() => void} onclose - Закрывает галерею
	 * @property {import('svelte').Snippet<[any, number]>} item - Сниппет содержимого элемента
	 */

	/** @type {Props} */
	let { items, index, labelledby, onchange, onclose, item } = $props();

	let direction = $state('next');
	let total = $derived(items.length);

	function next() {
		direction = 'next';
		onchange?.((index + 1) % total);
	}

	function prev() {
		direction = 'prev';
		onchange?.((index - 1 + total) % total);
	}

	/** @param {{ direction: string }} gesture */
	function handleGesture({ direction: swipe }) {
		if (swipe === 'left') next();
		if (swipe === 'right') prev();
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			next();
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			prev();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<Modal {labelledby} {onclose}>
	{#if total}
		<div class="gallery">
			{#key index}
				<div class="gallery__stage gallery__stage_{direction}">
					<div class="gallery__media" {@attach pullDirection(handleGesture, { threshold: 15 })}>
						{@render item(items[index], index)}
					</div>
				</div>
			{/key}

			<div class="gallery__bar">
				<button class="gallery__nav" type="button" aria-label="Предыдущий" onclick={prev}>
					<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
						<path d="M30 10L16 24L30 38" />
					</svg>
				</button>
				<span class="gallery__counter">{index + 1} / {total}</span>
				<button class="gallery__nav" type="button" aria-label="Следующий" onclick={next}>
					<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
						<path d="M18 10L32 24L18 38" />
					</svg>
				</button>
			</div>
		</div>
	{/if}
</Modal>

<style>
	.gallery {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-lg);
	}

	.gallery__stage {
		animation: gallery-in var(--duration-base) var(--easing-standard);
	}

	.gallery__stage_next {
		--gallery-offset: 24px;
	}

	.gallery__stage_prev {
		--gallery-offset: -24px;
	}

	.gallery__media {
		touch-action: pan-y;
	}

	.gallery__bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.gallery__nav {
		display: grid;
		width: 48px;
		height: 48px;
		place-items: center;
		border: 0;
		border-radius: var(--radius-pill);
		background: var(--color-bg-alt);
		color: var(--color-text);
		cursor: pointer;
	}

	.gallery__nav svg {
		width: 24px;
		height: 24px;
		fill: none;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.gallery__counter {
		color: var(--color-text-muted);
		font-weight: var(--font-weight-bold);
		font-variant-numeric: tabular-nums;
	}

	@keyframes gallery-in {
		from {
			opacity: 0;
			transform: translateX(var(--gallery-offset, 24px));
		}

		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.gallery__stage {
			animation: none;
		}
	}
</style>
