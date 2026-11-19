<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [labelledby] - id элемента с заголовком окна
	 * @property {string} [label] - Подпись окна, если заголовка нет
	 * @property {() => void} onclose - Закрывает окно
	 * @property {import('svelte').Snippet} children - Содержимое окна
	 */

	/** @type {Props} */
	let { labelledby, label, onclose, children } = $props();

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="modal-backdrop" role="presentation" onclick={onclose}></div>

<div class="modal" role="dialog" aria-modal="true" aria-labelledby={labelledby} aria-label={label}>
	<button class="modal__close" type="button" aria-label="Закрыть окно" onclick={onclose}>
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d="M6 6L18 18M18 6L6 18" />
		</svg>
	</button>
	<div class="modal__body">
		{@render children?.()}
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);
		background: var(--color-overlay);
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: calc(var(--z-modal) + 1);
		width: min(100vw - 2rem, 920px);
		max-height: calc(100dvh - 2rem);
		overflow: auto;
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: var(--shadow-lg);
		transform: translate(-50%, -50%);
	}

	.modal__body {
		display: grid;
	}

	.modal__close {
		position: absolute;
		top: var(--space-md);
		right: var(--space-md);
		z-index: 1;
		display: grid;
		width: 44px;
		height: 44px;
		place-items: center;
		border: 0;
		border-radius: var(--radius-pill);
		background: var(--color-bg-alt);
		color: var(--color-text);
		cursor: pointer;
	}

	.modal__close svg {
		width: 20px;
		height: 20px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.4;
		stroke-linecap: round;
	}
</style>
