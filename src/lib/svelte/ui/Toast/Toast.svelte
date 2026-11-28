<script module>
	/**
	 * @typedef {'success' | 'error' | 'warning' | 'info'} ToastType
	 * @typedef {{ id: string, type: ToastType, title?: string, message?: string, duration: number }} ToastItem
	 * @typedef {{ type?: ToastType, title?: string, message?: string, duration?: number }} ToastOptions
	 */

	const DEFAULT_DURATION = 4000;
	const MAX_VISIBLE = 4;

	/**
	 * Стор одного экземпляра Toast: список уведомлений и таймеры.
	 * Создаётся внутри компонента (см. обычный `<script>` ниже), поэтому у каждого экземпляра свой.
	 */
	export function createToastStore() {
		let items = $state(/** @type {ToastItem[]} */ ([]));
		let counter = 0;

		/** @type {Map<string, ReturnType<typeof setTimeout>>} */
		const timers = new Map();

		/** @param {string} id */
		function forget(id) {
			const timer = timers.get(id);
			if (timer) clearTimeout(timer);
			timers.delete(id);
		}

		/** @param {string} id */
		function dismiss(id) {
			forget(id);
			items = items.filter((item) => item.id !== id);
		}

		function clear() {
			for (const timer of timers.values()) clearTimeout(timer);
			timers.clear();
			items = [];
		}

		/** @param {ToastOptions} [options] @returns {string} идентификатор уведомления */
		function show({ type = 'info', title, message, duration = DEFAULT_DURATION } = {}) {
			const id = `toast-${++counter}`;
			const next = [...items, { id, type, title, message, duration }];

			// старые уведомления уходят, чтобы стек не разрастался
			const overflow = next.length - MAX_VISIBLE;
			const dropped = overflow > 0 ? next.splice(0, overflow) : [];

			items = next;
			dropped.forEach((item) => forget(item.id));

			if (duration > 0) timers.set(id, setTimeout(() => dismiss(id), duration));
			return id;
		}

		/** @param {ToastType} type */
		const shortcut = (type) => (/** @type {string} */ title, /** @type {string} */ message, /** @type {{ duration?: number }} */ options) =>
			show({ type, title, message, duration: options?.duration });

		return {
			get items() {
				return items;
			},
			show,
			dismiss,
			clear,
			success: shortcut('success'),
			error: shortcut('error'),
			warning: shortcut('warning'),
			info: shortcut('info'),
			destroy: clear
		};
	}

	/** Смонтированный экземпляр. В приложении Toast ставится один раз — в лейауте. */
	/** @type {ReturnType<typeof createToastStore> | null} */
	let active = null;

	/**
	 * Связывает стор с публичным API. Возвращает функцию отвязки.
	 * @param {ReturnType<typeof createToastStore>} store
	 */
	export function bindToastStore(store) {
		active = store;
		return () => {
			if (active === store) active = null;
		};
	}

	/**
	 * Публичный API уведомлений. Импортируется в страницах:
	 * `import { toast } from '$lib'; toast.success('Готово')`.
	 */
	export const toast = {
		get items() {
			return active?.items ?? [];
		},
		/** @param {ToastOptions} [options] */
		show: (options) => active?.show(options) ?? '',
		/** @param {string} [title] @param {string} [message] @param {{ duration?: number }} [options] */
		success: (title, message, options) => active?.success(title, message, options) ?? '',
		/** @param {string} [title] @param {string} [message] @param {{ duration?: number }} [options] */
		error: (title, message, options) => active?.error(title, message, options) ?? '',
		/** @param {string} [title] @param {string} [message] @param {{ duration?: number }} [options] */
		warning: (title, message, options) => active?.warning(title, message, options) ?? '',
		/** @param {string} [title] @param {string} [message] @param {{ duration?: number }} [options] */
		info: (title, message, options) => active?.info(title, message, options) ?? '',
		/** @param {string} id */
		dismiss: (id) => active?.dismiss(id),
		clear: () => active?.clear()
	};
</script>

<script>
	import { fly } from 'svelte/transition';
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'} [position] - Позиция стека на экране
	 */

	/** @type {Props} */
	let { position = 'top-right' } = $props();

	const store = createToastStore();

	$effect(() => bindToastStore(store));

	const ICONS = {
		success: 'check-circle',
		error: 'x-circle',
		warning: 'alert-triangle',
		info: 'info'
	};
</script>

<div class="toast-stack toast-stack_{position}" aria-live="polite" aria-atomic="false">
	{#each store.items as item (item.id)}
		<div
			class="toast toast_{item.type}"
			role={item.type === 'error' ? 'alert' : 'status'}
			in:fly={{ x: position.includes('right') ? 48 : 0, y: position.includes('center') ? 24 : 0, duration: 220 }}
		>
			<span class="toast__icon toast__icon_{item.type}" aria-hidden="true">
				<Icon name={ICONS[item.type] ?? 'info'} size={22} />
			</span>

			<div class="toast__content">
				{#if item.title}<strong>{item.title}</strong>{/if}
				{#if item.message}<span>{item.message}</span>{/if}
			</div>

			<button
				class="toast__close"
				type="button"
				aria-label="Закрыть уведомление"
				onclick={() => store.dismiss(item.id)}
			>
				<Icon name="x" size={16} />
			</button>
		</div>
	{/each}
</div>

<style>
	.toast-stack {
		position: fixed;
		z-index: var(--z-toast);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		pointer-events: none;
	}

	.toast-stack_top-right {
		top: var(--space-md);
		right: var(--space-md);
	}

	.toast-stack_top-center {
		top: var(--space-md);
		left: 50%;
		transform: translateX(-50%);
	}

	.toast-stack_bottom-right {
		bottom: var(--space-md);
		right: var(--space-md);
	}

	.toast-stack_bottom-center {
		bottom: var(--space-md);
		left: 50%;
		transform: translateX(-50%);
	}

	.toast {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: min(360px, calc(100vw - 2rem));
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-left: 3px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		box-shadow: var(--shadow-toast);
		pointer-events: auto;
	}

	.toast_success {
		border-left-color: var(--color-success);
	}

	.toast_error {
		border-left-color: var(--color-danger);
	}

	.toast_warning {
		border-left-color: var(--color-warning);
	}

	.toast_info {
		border-left-color: var(--color-info);
	}

	.toast__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-sm);
		flex-shrink: 0;
	}

	.toast__icon_success {
		color: var(--color-success);
	}

	.toast__icon_error {
		color: var(--color-danger);
	}

	.toast__icon_warning {
		color: var(--color-warning);
	}

	.toast__icon_info {
		color: var(--color-info);
	}

	.toast__content {
		flex: 1;
		min-width: 0;
	}

	.toast__content strong {
		display: block;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
	}

	.toast__content span {
		display: block;
		font-size: var(--font-size-2xs);
		color: var(--color-text-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.toast__close {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xs);
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
	}

	.toast__close:hover {
		color: var(--color-text);
	}
</style>
