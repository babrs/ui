<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {'success' | 'error' | 'warning' | 'info'} [type] - Тип уведомления
	 * @property {string} [title] - Заголовок
	 * @property {string} [message] - Текст
	 * @property {() => void} [onclose] - Закрытие
	 */

	/** @type {Props} */
	let { type = 'info', title, message, onclose } = $props();

	const ICON_BY_TYPE = {
		success: 'check-circle',
		error: 'x-circle',
		warning: 'alert-triangle',
		info: 'info'
	};

	const icon = $derived(ICON_BY_TYPE[type] ?? 'info');
</script>

<div class="toast toast_enter" role={type === 'error' ? 'alert' : 'status'}>
	<span class="toast__icon toast__icon_{type}" aria-hidden="true">
		<Icon name={icon} size={28} />
	</span>

	<div class="toast__content">
		{#if title}<strong>{title}</strong>{/if}
		{#if message}<span>{message}</span>{/if}
	</div>

	<button class="toast__close" type="button" aria-label="Закрыть уведомление" onclick={onclose}>
		<Icon name="x" size={16} />
	</button>
</div>

<style>
	.toast {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		width: min(360px, calc(100vw - 2rem));
		padding: 0.875rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		box-shadow: var(--shadow-toast);
	}

	.toast_enter {
		animation: toast-in var(--duration-slow) var(--easing-standard) forwards;
	}

	.toast__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 10px;
		flex-shrink: 0;
	}

	.toast__icon_success {
		background: var(--color-success-soft);
		color: var(--color-success);
	}

	.toast__icon_error {
		background: var(--color-danger-soft);
		color: var(--color-danger);
	}

	.toast__icon_warning {
		background: var(--color-warning-soft);
		color: var(--color-warning);
	}

	.toast__icon_info {
		background: var(--color-info-soft);
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

	@keyframes toast-in {
		from {
			transform: translateX(100%);
			opacity: 0;
		}

		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.toast_enter {
			animation: none;
		}
	}
</style>
