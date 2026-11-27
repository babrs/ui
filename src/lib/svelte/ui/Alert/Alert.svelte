<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {'info' | 'success' | 'warning' | 'error'} [type] - Тип уведомления
	 * @property {string} [title] - Заголовок
	 * @property {string} [text] - Текст сообщения
	 * @property {boolean} [dismissible] - Показывать кнопку закрытия
	 * @property {() => void} [onclose] - Закрытие уведомления
	 * @property {import('svelte').Snippet} [children] - Содержимое вместо текста
	 */

	/** @type {Props} */
	let { type = 'info', title, text, dismissible = false, onclose, children } = $props();

	const ICON_BY_TYPE = {
		info: 'info',
		success: 'check-circle',
		warning: 'alert-triangle',
		error: 'x-circle'
	};

	const icon = $derived(ICON_BY_TYPE[type] ?? 'info');
</script>

<div class="alert alert_{type}" role={type === 'error' ? 'alert' : 'status'}>
	<span class="alert__icon" aria-hidden="true">
		<Icon name={icon} size={24} />
	</span>

	<div class="alert__content">
		{#if title}<h4>{title}</h4>{/if}
		{#if children}
			{@render children()}
		{:else if text}
			<p>{text}</p>
		{/if}
	</div>

	{#if dismissible}
		<button class="alert__close" type="button" aria-label="Закрыть уведомление" onclick={onclose}>
			<Icon name="x" size={16} />
		</button>
	{/if}
</div>

<style>
	.alert {
		display: flex;
		align-items: flex-start;
		gap: var(--space-md);
		padding: var(--space-md);
		border: 1px solid;
		border-radius: var(--radius-md);
	}

	.alert__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-md);
		flex-shrink: 0;
	}

	.alert__content {
		flex: 1;
		min-width: 0;
	}

	.alert__content :global(h4) {
		margin: 0 0 0.25rem;
		font-family: var(--font-primary);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0;
	}

	.alert__content :global(p) {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.alert__close {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xs);
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		transition: color var(--duration-fast) var(--easing-standard);
	}

	.alert__close:hover {
		color: var(--color-text);
	}

	.alert_info {
		background: var(--color-info-soft);
		border-color: var(--color-info-line);
	}

	.alert_info .alert__icon {
		background: color-mix(in srgb, var(--color-info) 15%, transparent);
		color: var(--color-info);
	}

	.alert_info :global(h4) {
		color: var(--color-info);
	}

	.alert_success {
		background: var(--color-success-soft);
		border-color: var(--color-success-line);
	}

	.alert_success .alert__icon {
		background: color-mix(in srgb, var(--color-success) 15%, transparent);
		color: var(--color-success);
	}

	.alert_success :global(h4) {
		color: var(--color-success);
	}

	.alert_warning {
		background: var(--color-warning-soft);
		border-color: var(--color-warning-line);
	}

	.alert_warning .alert__icon {
		background: color-mix(in srgb, var(--color-warning) 15%, transparent);
		color: var(--color-warning);
	}

	.alert_warning :global(h4) {
		color: var(--color-warning);
	}

	.alert_error {
		background: var(--color-danger-soft);
		border-color: var(--color-danger-line);
	}

	.alert_error .alert__icon {
		background: color-mix(in srgb, var(--color-danger) 15%, transparent);
		color: var(--color-danger);
	}

	.alert_error :global(h4) {
		color: var(--color-danger);
	}
</style>
