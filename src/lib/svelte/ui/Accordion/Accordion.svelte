<script>
	/**
	 * @typedef {Object} AccordionItem
	 * @property {string} id - Идентификатор пункта
	 * @property {string} title - Вопрос или заголовок
	 * @property {string} [body] - Текст ответа
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Array<AccordionItem>} items - Пункты аккордеона
	 * @property {boolean} [allowMultiple] - Разрешить несколько открытых пунктов
	 * @property {string | null} [open] - id открытого пункта (двусторонняя связь)
	 * @property {import('svelte').Snippet<[AccordionItem]>} [item] - Разметка содержимого пункта
	 */

	/** @type {Props} */
	let { items = [], allowMultiple = false, open = $bindable(null), item } = $props();

	/** @type {Record<string, boolean>} */
	let opened = $state({});

	const isOpen = (id) => (allowMultiple ? Boolean(opened[id]) : open === id);

	/**
	 * @param {Event} event
	 * @param {string} id
	 */
	function handleToggle(event, id) {
		const details = /** @type {HTMLDetailsElement} */ (event.currentTarget);
		if (details.open) {
			if (allowMultiple) opened = { ...opened, [id]: true };
			else open = id;
		} else if (allowMultiple) {
			opened = { ...opened, [id]: false };
		} else if (open === id) {
			open = null;
		}
	}
</script>

<div class="accordion">
	{#each items as entry (entry.id)}
		<details class="accordion__item" open={isOpen(entry.id)} ontoggle={(event) => handleToggle(event, entry.id)}>
			<summary class="accordion__summary">{entry.title}</summary>
			{#if item}
				{@render item(entry)}
			{:else}
				<div class="accordion__body">{entry.body}</div>
			{/if}
		</details>
	{/each}
</div>

<style>
	.accordion {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--color-surface);
	}

	.accordion__item + .accordion__item {
		border-top: 1px solid var(--color-border);
	}

	.accordion__summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md) 1.25rem;
		color: var(--color-text);
		font-size: 0.9375rem;
		font-weight: var(--font-weight-medium);
		list-style: none;
		cursor: pointer;
		transition: background-color var(--duration-fast) var(--easing-standard);
	}

	.accordion__summary::-webkit-details-marker {
		display: none;
	}

	.accordion__summary:hover {
		background: var(--color-bg-alt);
	}

	.accordion__summary::after {
		content: '';
		width: 8px;
		height: 8px;
		border-right: 2px solid var(--color-text-muted);
		border-bottom: 2px solid var(--color-text-muted);
		transform: rotate(-45deg);
		transition: transform var(--duration-slow) var(--easing-standard);
		flex-shrink: 0;
	}

	details[open] > .accordion__summary::after {
		transform: rotate(45deg);
	}

	.accordion__body {
		padding: 0 1.25rem var(--space-md);
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		color: var(--color-text-muted);
	}
</style>
