<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {Array<any>} items - Элементы галереи
	 * @property {number} index - Индекс открытого элемента (двусторонняя связь)
	 * @property {string} [labelledby] - id заголовка окна
	 * @property {(index: number) => void} [onchange] - Вызывается при переходе к другому элементу
	 * @property {() => void} [onclose] - Закрывает галерею
	 * @property {import('svelte').Snippet<[any, number]>} [item] - Содержимое элемента
	 */

	/** @type {Props} */
	let { items = [], index = $bindable(0), labelledby, onchange, onclose, item } = $props();

	/** @type {HTMLDialogElement | undefined} */
	let dialog = $state();

	$effect(() => {
		const element = dialog;
		if (element && !element.open) element.showModal();
	});

	const current = $derived(items[index]);

	/** @param {string} src */
	function srcOf(value) {
		if (typeof value === 'string') return value;
		return value?.src ?? '';
	}

	/** @param {number} next */
	function go(next) {
		if (!items.length) return;
		index = (next + items.length) % items.length;
		onchange?.(index);
	}

	function close() {
		if (dialog?.open) dialog.close();
		onclose?.();
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'ArrowRight') go(index + 1);
		if (event.key === 'ArrowLeft') go(index - 1);
		if (event.key === 'Escape') {
			event.preventDefault();
			close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<dialog
	bind:this={dialog}
	class="lightbox"
	aria-labelledby={labelledby}
	oncancel={(event) => {
		event.preventDefault();
		close();
	}}
	onclick={(event) => event.target === dialog && close()}
>
	<div class="lightbox__stage">
		<button class="lightbox__close" type="button" aria-label="Закрыть галерею" onclick={close}>
			<Icon name="x" size={18} />
		</button>

		{#if items.length > 1}
			<button class="lightbox__nav lightbox__nav_prev" type="button" aria-label="Предыдущее изображение" onclick={() => go(index - 1)}>
				<Icon name="chevron-left" size={22} />
			</button>
			<button class="lightbox__nav lightbox__nav_next" type="button" aria-label="Следующее изображение" onclick={() => go(index + 1)}>
				<Icon name="chevron-right" size={22} />
			</button>
		{/if}

		{#if item}
			{@render item(current, index)}
		{:else}
			<img src={srcOf(current)} alt={current?.alt ?? ''} />
		{/if}

		{#if items.length > 1}
			<span class="lightbox__counter">{index + 1} / {items.length}</span>
		{/if}
	</div>
</dialog>

<style>
	.lightbox {
		position: fixed;
		inset: 0;
		margin: auto;
		max-width: 95vw;
		max-height: 95vh;
		padding: 0;
		border: none;
		background: transparent;
		box-shadow: none;
		overflow: visible;
	}

	.lightbox::backdrop {
		background: rgb(0 0 0 / 0.95);
	}

	.lightbox__stage {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox__stage :global(img) {
		max-width: 90vw;
		max-height: 80vh;
		object-fit: contain;
		border-radius: var(--radius-md);
	}

	.lightbox__close {
		position: absolute;
		top: -12px;
		right: -12px;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: var(--color-text);
		color: var(--color-bg);
		cursor: pointer;
	}

	.lightbox__nav {
		position: absolute;
		top: 50%;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: rgb(255 255 255 / 0.15);
		color: #fff;
		cursor: pointer;
		transform: translateY(-50%);
		transition: background-color var(--duration-fast) var(--easing-standard);
	}

	.lightbox__nav:hover {
		background: rgb(255 255 255 / 0.25);
	}

	.lightbox__nav_prev {
		left: -60px;
	}

	.lightbox__nav_next {
		right: -60px;
	}

	.lightbox__counter {
		position: absolute;
		bottom: -40px;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		font-size: var(--font-size-base);
		opacity: 0.7;
	}

	@media (max-width: 900px) {
		.lightbox__nav_prev {
			left: 8px;
		}

		.lightbox__nav_next {
			right: 8px;
		}
	}
</style>
