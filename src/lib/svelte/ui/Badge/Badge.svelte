<script>
	/**
	 * @typedef {Object} Props
	 * @property {'neutral' | 'primary' | 'success' | 'warning' | 'info' | 'danger'} [tone] - Цветовой тон
	 * @property {'sm' | 'md'} [size] - Размер
	 * @property {boolean} [dot] - Точка-индикатор перед текстом
	 * @property {import('svelte').Snippet} [children] - Текст бейджа
	 * @property {string} [label] - Текст, если не используется снippet
	 */

	/** @type {Props} */
	let { tone = 'neutral', size = 'md', dot = false, children, label } = $props();
</script>

<span class="badge badge_{tone} badge_{size}">
	{#if dot}<span class="badge__dot" aria-hidden="true"></span>{/if}
	{#if children}{@render children()}{:else}{label}{/if}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		border-radius: var(--radius-pill);
		font-weight: var(--font-weight-semibold);
		white-space: nowrap;
		line-height: 1;
	}

	.badge_md {
		min-height: 28px;
		padding: 0 var(--space-sm);
		font-size: var(--font-size-sm);
	}

	.badge_sm {
		min-height: 22px;
		padding: 0 0.5rem;
		font-size: var(--font-size-2xs);
	}

	.badge__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
	}

	.badge_neutral {
		background: var(--color-bg-alt);
		color: var(--color-text-muted);
	}

	.badge_primary {
		background: var(--color-primary-soft);
		color: var(--color-primary-strong);
	}

	.badge_success {
		background: var(--color-success-soft);
		color: var(--color-success-strong);
	}

	.badge_warning {
		background: var(--color-warning-soft);
		color: var(--color-warning-strong);
	}

	.badge_info {
		background: var(--color-info-soft);
		color: var(--color-info-strong);
	}

	.badge_danger {
		background: var(--color-danger-soft);
		color: var(--color-danger-strong);
	}
</style>
