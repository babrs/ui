<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Доступное имя группы
	 * @property {import('svelte').Snippet} children - Кнопки группы
	 */

	/** @type {Props} */
	let { label, children } = $props();
</script>

<div class="button-group" role="group" aria-label={label}>
	{@render children?.()}
</div>

<style>
	.button-group {
		display: inline-flex;
	}

	.button-group :global(.button) {
		border-radius: 0;
		position: relative;
	}

	.button-group :global(.button:first-child) {
		border-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	.button-group :global(.button:last-child) {
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	.button-group :global(.button + .button) {
		margin-left: -2px;
	}

	.button-group :global(.button:hover) {
		z-index: 1;
	}
</style>
