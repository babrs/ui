<script>
	/**
	 * @typedef {Object} TabItem
	 * @property {string} id - Идентификатор вкладки
	 * @property {string} href - Адрес вкладки
	 * @property {string} label - Подпись вкладки
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Array<TabItem>} items - Вкладки переключателя
	 * @property {string} active - id активной вкладки
	 * @property {string} label - Название навигации для вспомогательных технологий
	 * @property {boolean} [sticky] - Липкое поведение при прокрутке
	 */

	/** @type {Props} */
	let { items = [], active, label, sticky = true } = $props();
</script>

<nav class="tab-switcher" class:tab-switcher_sticky={sticky} aria-label={label}>
	{#each items as item (item.id)}
		<a
			class="tab-switcher__link"
			class:tab-switcher__link_active={item.id === active}
			href={item.href}
			aria-current={item.id === active ? 'page' : undefined}
		>
			{item.label}
		</a>
	{/each}
</nav>

<style>
	.tab-switcher {
		display: flex;
		gap: var(--space-xs);
		padding: var(--space-xs);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-pill);
		background: var(--color-bg-alt);
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tab-switcher::-webkit-scrollbar {
		display: none;
	}

	.tab-switcher_sticky {
		position: sticky;
		top: calc(var(--header-height) + var(--space-sm));
		z-index: 5;
	}

	.tab-switcher__link {
		flex: 1;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-pill);
		color: var(--color-text-muted);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		text-align: center;
		text-decoration: none;
		white-space: nowrap;
		transition:
			background-color var(--duration-fast) var(--easing-standard),
			color var(--duration-fast) var(--easing-standard);
	}

	.tab-switcher__link:hover {
		color: var(--color-text);
		text-decoration: none;
	}

	.tab-switcher__link_active {
		background: var(--color-surface);
		color: var(--color-primary-strong);
		box-shadow: var(--shadow-sm);
	}
</style>
