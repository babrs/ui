<script>
	/**
	 * @typedef {Object} Props
	 * @property {'neutral' | 'primary' | 'success' | 'info' | 'danger'} [tone] - Цветовой тон бейджа
	 * @property {import('svelte').Snippet} children - Текст бейджа
	 */

	/** @type {Props} */
	let { tone = 'neutral', children } = $props();
</script>

<span class="badge badge_{tone}">{@render children?.()}</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		min-height: 28px;
		padding: 0 var(--space-sm);
		border-radius: var(--radius-pill);
		background: var(--color-bg-alt);
		color: var(--color-text);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
		white-space: nowrap;
	}

	.badge_primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.badge_success {
		background: var(--color-success);
		color: var(--color-on-primary);
	}

	.badge_info {
		background: var(--color-info);
		color: var(--color-on-primary);
	}

	.badge_danger {
		background: var(--color-danger);
		color: var(--color-on-primary);
	}
</style>
