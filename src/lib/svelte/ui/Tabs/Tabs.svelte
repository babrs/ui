<script>
	/**
	 * @typedef {Object} TabItem
	 * @property {string} id - Идентификатор вкладки
	 * @property {string} label - Подпись вкладки
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Array<TabItem>} items - Вкладки
	 * @property {string} [active] - id активной вкладки (двусторонняя связь)
	 * @property {string} [label] - Доступное имя списка вкладок
	 * @property {import('svelte').Snippet<[string]>} [panel] - Содержимое активной вкладки
	 * @property {import('svelte').Snippet} [children] - Содержимое, если панель не задана
	 */

	/** @type {Props} */
	let { items = [], active = $bindable(items[0]?.id ?? ''), label = 'Вкладки', panel, children } = $props();

	/** @type {HTMLElement | undefined} */
	let list = $state();

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		const currentIndex = items.findIndex((tab) => tab.id === active);
		if (currentIndex < 0) return;

		/** @type {Record<string, number>} */
		const moves = { ArrowRight: currentIndex + 1, ArrowLeft: currentIndex - 1, Home: 0, End: items.length - 1 };
		if (!(event.key in moves)) return;

		event.preventDefault();
		const next = (moves[event.key] + items.length) % items.length;
		active = items[next].id;
		list?.querySelectorAll('[role="tab"]')[next]?.focus();
	}
</script>

<div class="tabs">
	<div class="tabs__list" role="tablist" aria-label={label} bind:this={list} onkeydown={handleKeydown}>
		{#each items as tab (tab.id)}
			<button
				type="button"
				role="tab"
				id="tab-{tab.id}"
				class="tabs__tab"
				class:tabs__tab_active={tab.id === active}
				aria-selected={tab.id === active}
				aria-controls="panel-{tab.id}"
				tabindex={tab.id === active ? 0 : -1}
				onclick={() => (active = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<div class="tabs__panel" role="tabpanel" id="panel-{active}" aria-labelledby="tab-{active}" tabindex="0">
		{#if panel}
			{@render panel(active)}
		{:else}
			{@render children?.()}
		{/if}
	</div>
</div>

<style>
	.tabs {
		border-bottom: 2px solid var(--color-border);
	}

	.tabs__list {
		display: flex;
		gap: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tabs__list::-webkit-scrollbar {
		display: none;
	}

	.tabs__tab {
		padding: 0.875rem 1.25rem;
		border: none;
		border-bottom: 2px solid transparent;
		border-radius: 0;
		margin-bottom: -2px;
		background: transparent;
		color: var(--color-text-muted);
		font-family: inherit;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		cursor: pointer;
		transition:
			color var(--duration-fast) var(--easing-standard),
			border-color var(--duration-fast) var(--easing-standard);
	}

	.tabs__tab:hover {
		color: var(--color-text);
	}

	.tabs__tab_active {
		color: var(--color-primary);
		border-bottom-color: var(--color-primary);
	}

	.tabs__panel {
		padding: var(--space-lg) 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-base);
	}

	.tabs__panel:focus-visible {
		outline-offset: 4px;
	}
</style>
