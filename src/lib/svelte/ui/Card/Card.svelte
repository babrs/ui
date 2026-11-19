<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [elevated] - Усиленная тень для акцента
	 * @property {import('svelte').Snippet} children - Содержимое карточки
	 */

	/** @type {Props} */
	let { elevated = false, children } = $props();
</script>

<div class="card" class:card_elevated={elevated}>
	{@render children?.()}
</div>

<style>
	.card {
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: var(--shadow-sm);
	}

	.card_elevated {
		box-shadow: var(--shadow-md);
	}
</style>
