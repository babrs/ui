<script>
	import Toast from './Toast.svelte';
	import { toast } from '../../../js/toast/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {import('../../../js/toast/toast.svelte.js').ToastItem[]} [items] - Свой список уведомлений
	 * @property {'top-right' | 'top-center' | 'bottom-right'} [position] - Позиция на экране
	 * @property {(id: string) => void} [ondismiss] - Обработчик закрытия
	 */

	/** @type {Props} */
	let { items, position = 'top-right', ondismiss } = $props();

	const list = $derived(items ?? toast.items);

	/** @param {string} id */
	function dismiss(id) {
		if (ondismiss) ondismiss(id);
		else toast.dismiss(id);
	}
</script>

<div class="toast-stack toast-stack_{position}" aria-live="polite" aria-atomic="false">
	{#each list as item (item.id)}
		<Toast type={item.type} title={item.title} message={item.message} onclose={() => dismiss(item.id)} />
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

	.toast-stack > :global(*) {
		pointer-events: auto;
	}

	.toast-stack_top-right {
		top: var(--space-lg);
		right: var(--space-lg);
	}

	.toast-stack_top-center {
		top: var(--space-lg);
		left: 50%;
		transform: translateX(-50%);
	}

	.toast-stack_bottom-right {
		bottom: var(--space-lg);
		right: var(--space-lg);
		flex-direction: column-reverse;
	}
</style>
