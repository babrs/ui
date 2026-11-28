<script module>
	/**
	 * Стор одного экземпляра GalleryModal: элементы, текущий индекс и состояние окна.
	 */
	export function createGalleryStore() {
		let open = $state(false);
		/** @type {Array<any>} */
		let items = $state([]);
		let index = $state(0);

		/**
		 * @param {Array<any>} list
		 * @param {number} [start]
		 */
		function show(list, start = 0) {
			items = list;
			index = start;
			open = true;
		}

		/** @param {number} next */
		function go(next) {
			if (!items.length) return;
			index = (next + items.length) % items.length;
		}

		function close() {
			open = false;
		}

		return {
			get open() {
				return open;
			},
			get items() {
				return items;
			},
			get index() {
				return index;
			},
			get current() {
				return items[index];
			},
			show,
			go,
			close
		};
	}

	/** Смонтированный экземпляр. В приложении GalleryModal ставится один раз — в лейауте. */
	/** @type {ReturnType<typeof createGalleryStore> | null} */
	let active = null;

	/**
	 * Связывает стор с публичным API. Возвращает функцию отвязки.
	 * @param {ReturnType<typeof createGalleryStore>} store
	 */
	export function bindGalleryStore(store) {
		active = store;
		return () => {
			if (active === store) active = null;
		};
	}

	/**
	 * Публичный API: `gallery.open(photos, 2)` открывает лайтбокс с третьим фото.
	 */
	export const gallery = {
		/** @param {Array<any>} items @param {number} [index] */
		open: (items, index = 0) => active?.show(items, index),
		close: () => active?.close()
	};
</script>

<script>
	import Icon from '../Icon/index.js';

	const store = createGalleryStore();

	$effect(() => bindGalleryStore(store));

	/** @type {HTMLDialogElement | undefined} */
	let dialog = $state();

	$effect(() => {
		const element = dialog;
		if (!element) return;
		if (store.open && !element.open) element.showModal();
		else if (!store.open && element.open) element.close();
	});

	/** @param {any} value */
	function srcOf(value) {
		if (typeof value === 'string') return value;
		return value?.src ?? '';
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (!store.open) return;
		if (event.key === 'ArrowRight') store.go(store.index + 1);
		if (event.key === 'ArrowLeft') store.go(store.index - 1);
		if (event.key === 'Escape') {
			event.preventDefault();
			store.close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<dialog
	bind:this={dialog}
	class="lightbox"
	aria-label="Галерея"
	oncancel={(event) => {
		event.preventDefault();
		store.close();
	}}
	onclick={(event) => event.target === dialog && store.close()}
>
	<div class="lightbox__stage">
		<button class="lightbox__close" type="button" aria-label="Закрыть галерею" onclick={() => store.close()}>
			<Icon name="x" size={18} />
		</button>

		{#if store.items.length > 1}
			<button class="lightbox__nav lightbox__nav_prev" type="button" aria-label="Предыдущее изображение" onclick={() => store.go(store.index - 1)}>
				<Icon name="chevron-left" size={22} />
			</button>
			<button class="lightbox__nav lightbox__nav_next" type="button" aria-label="Следующее изображение" onclick={() => store.go(store.index + 1)}>
				<Icon name="chevron-right" size={22} />
			</button>
		{/if}

		{#if store.current}
			<img src={srcOf(store.current)} alt={store.current?.alt ?? ''} />
		{/if}

		{#if store.items.length > 1}
			<span class="lightbox__counter">{store.index + 1} / {store.items.length}</span>
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
