<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [open] - Открыто ли окно (двусторонняя связь)
	 * @property {string} [title] - Заголовок окна
	 * @property {string} [description] - Пояснение под заголовком
	 * @property {'sm' | 'md' | 'lg' | 'xl' | 'full'} [size] - Ширина окна
	 * @property {string} [label] - Доступное имя, если заголовка нет
	 * @property {string} [labelledby] - id элемента с заголовком
	 * @property {boolean} [hideClose] - Скрыть крестик
	 * @property {() => void} [onclose] - Закрытие окна
	 * @property {import('svelte').Snippet} [children] - Тело окна
	 * @property {import('svelte').Snippet} [footer] - Нижняя панель с кнопками
	 */

	/** @type {Props} */
	let {
		open = $bindable(true),
		title,
		description,
		size = 'md',
		label,
		labelledby,
		hideClose = false,
		onclose,
		children,
		footer
	} = $props();

	/** @type {HTMLDialogElement | undefined} */
	let dialog = $state();

	$effect(() => {
		const element = dialog;
		if (!element) return;

		if (open && !element.open) {
			element.showModal();
			document.documentElement.style.overflow = 'hidden';
		} else if (!open && element.open) {
			element.close();
			document.documentElement.style.overflow = '';
		}
	});

	$effect(() => () => {
		document.documentElement.style.overflow = '';
	});

	function close() {
		open = false;
		onclose?.();
	}

	/** @param {MouseEvent} event */
	function handleClick(event) {
		if (event.target === dialog) close();
	}

	/** @param {Event} event */
	function handleCancel(event) {
		event.preventDefault();
		close();
	}
</script>

<dialog
	bind:this={dialog}
	class="modal modal_{size}"
	aria-labelledby={title ? undefined : labelledby}
	aria-label={title || labelledby ? undefined : label}
	onclick={handleClick}
	oncancel={handleCancel}
>
	{#if title || !hideClose}
		<header class="modal__header">
			<div>
				{#if title}<h3 class="modal__title">{title}</h3>{/if}
				{#if description}<p class="modal__description">{description}</p>{/if}
			</div>
			{#if !hideClose}
				<button class="modal__close" type="button" aria-label="Закрыть окно" onclick={close}>
					<Icon name="x" size={18} />
				</button>
			{/if}
		</header>
	{/if}

	<div class="modal__body">
		{@render children?.()}
	</div>

	{#if footer}
		<footer class="modal__footer">
			{@render footer()}
		</footer>
	{/if}
</dialog>

<style>
	.modal {
		position: fixed;
		inset: 0;
		margin: auto;
		width: min(100% - 2rem, 560px);
		max-height: calc(100dvh - 2rem);
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-card);
		background: var(--color-surface);
		box-shadow: var(--shadow-lg);
		color: var(--color-text);
		overflow: auto;
	}

	.modal:not([open]) {
		display: none;
	}

	.modal[open] {
		animation: modal-in 0.2s var(--easing-standard);
	}

	.modal::backdrop {
		background: rgb(0 0 0 / 0.5);
		backdrop-filter: blur(4px);
	}

	[data-theme='dark'] .modal {
		background: var(--color-bg-alt);
	}

	[data-theme='dark'] .modal::backdrop {
		background: rgb(0 0 0 / 0.7);
	}

	.modal_sm {
		width: min(100% - 2rem, 420px);
	}

	.modal_lg {
		width: min(100% - 2rem, 760px);
	}

	.modal_xl {
		width: min(100% - 2rem, 920px);
	}

	.modal_full {
		width: min(100% - 2rem, 1200px);
	}

	.modal__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md) var(--space-lg);
		border-bottom: 1px solid var(--color-border);
	}

	.modal__title {
		margin: 0;
		font-size: var(--font-size-lg);
		letter-spacing: var(--tracking-display);
	}

	.modal__description {
		margin: 0.25rem 0 0;
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.modal__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		margin: -0.25rem -0.5rem 0 0;
		padding: 0;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--easing-standard),
			color var(--duration-fast) var(--easing-standard);
	}

	.modal__close:hover {
		background: var(--color-bg-alt);
		color: var(--color-text);
	}

	.modal__body {
		padding: var(--space-lg);
	}

	.modal__footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		padding: var(--space-md) var(--space-lg);
		border-top: 1px solid var(--color-border);
	}

	@keyframes modal-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.modal[open] {
			animation: none;
		}
	}
</style>
