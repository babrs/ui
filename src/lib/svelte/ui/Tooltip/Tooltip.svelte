<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} text - Текст подсказки
	 * @property {'top' | 'bottom'} [placement] - Положение относительно элемента
	 * @property {import('svelte').Snippet} children - Элемент, к которому привязана подсказка
	 */

	/** @type {Props} */
	let { text, placement = 'top', children } = $props();
</script>

<span class="tooltip tooltip_{placement}">
	{@render children()}
	<span class="tooltip__bubble" role="tooltip">{text}</span>
</span>

<style>
	.tooltip {
		position: relative;
		display: inline-flex;
	}

	.tooltip__bubble {
		position: absolute;
		left: 50%;
		z-index: var(--z-popover);
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-sm);
		background: var(--color-text);
		color: var(--color-bg);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
		opacity: 0;
		pointer-events: none;
		transform: translateX(-50%) translateY(2px);
		transition:
			opacity var(--duration-fast) var(--easing-standard),
			transform var(--duration-fast) var(--easing-standard);
	}

	.tooltip_top .tooltip__bubble {
		bottom: calc(100% + 8px);
	}

	.tooltip_bottom .tooltip__bubble {
		top: calc(100% + 8px);
	}

	.tooltip:hover .tooltip__bubble,
	.tooltip:focus-within .tooltip__bubble {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}
</style>
