<script>
	/**
	 * @typedef {Object} TabItem
	 * @property {string} id - Идентификатор вкладки
	 * @property {string} label - Подпись вкладки
	 * @property {string} [count] - Счётчик или метка справа от подписи
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Array<TabItem>} items - Вкладки
	 * @property {string} [active] - id активной вкладки (двусторонняя связь)
	 * @property {string} [label] - Доступное имя списка вкладок
	 * @property {'underline' | 'pill'} [variant] - Оформление: подчёркивание или заливка
	 * @property {import('svelte').Snippet<[string]>} [panel] - Содержимое активной вкладки
	 * @property {import('svelte').Snippet} [children] - Содержимое, если панель не задана
	 */

	/** @type {Props} */
	let {
		items = [],
		active = $bindable(items[0]?.id ?? ''),
		label = 'Вкладки',
		variant = 'underline',
		panel,
		children
	} = $props();

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

<div class="tabs tabs_{variant}">
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
				<span class="tabs__label">{tab.label}</span>
				{#if tab.count}
					<span class="tabs__count">{tab.count}</span>
				{/if}
				<span class="tabs__indicator" aria-hidden="true"></span>
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
		position: relative;
	}

	.tabs_underline .tabs__list {
		box-shadow: inset 0 -2px 0 var(--color-border);
	}

	.tabs__list {
		display: flex;
		gap: var(--space-2xs);
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tabs__list::-webkit-scrollbar {
		display: none;
	}

	.tabs__tab {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		padding: 0.75rem 1.125rem;
		border: none;
		border-radius: 0;
		background: transparent;
		color: var(--color-text-muted);
		font-family: inherit;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		cursor: pointer;
		transition:
			color var(--duration-fast) var(--easing-standard),
			background-color var(--duration-fast) var(--easing-standard);
	}

	.tabs_underline .tabs__tab {
		border-radius: var(--radius-sm) var(--radius-sm) 0 0;
	}

	.tabs__tab:hover {
		color: var(--color-text);
		background: color-mix(in srgb, var(--color-primary) 8%, transparent);
	}

	.tabs__tab_active,
	.tabs__tab_active:hover {
		color: var(--color-primary-strong);
		font-weight: var(--font-weight-semibold);
	}

	.tabs__tab_active {
		background: transparent;
	}

	.tabs__count {
		padding: 0.0625rem 0.4375rem;
		border-radius: var(--radius-pill);
		background: var(--color-bg-alt);
		color: var(--color-text-muted);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
	}

	.tabs__tab_active .tabs__count {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.tabs__indicator {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 3px;
		border-radius: var(--radius-pill) var(--radius-pill) 0 0;
		background: var(--color-primary);
		opacity: 0;
		transition: opacity var(--duration-fast) var(--easing-standard);
	}

	.tabs__tab_active .tabs__indicator {
		opacity: 1;
	}

	/* Вариант «пилюля» */
	.tabs_pill .tabs__list {
		gap: var(--space-2xs);
		padding: var(--space-2xs);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-pill);
		background: var(--color-bg-alt);
		align-self: flex-start;
	}

	.tabs_pill .tabs__tab {
		border-radius: var(--radius-pill);
		padding: 0.5rem 1rem;
	}

	.tabs_pill .tabs__tab_active,
	.tabs_pill .tabs__tab_active:hover {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.tabs_pill .tabs__tab_active .tabs__count {
		background: var(--color-on-primary);
		color: var(--color-primary-strong);
	}

	.tabs_pill .tabs__indicator {
		display: none;
	}

	.tabs__panel {
		padding: var(--space-lg) 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-base);
	}

	.tabs__panel:focus-visible {
		outline-offset: 4px;
	}

	@media (prefers-reduced-motion: reduce) {
		.tabs__indicator {
			transition: none;
		}
	}
</style>
