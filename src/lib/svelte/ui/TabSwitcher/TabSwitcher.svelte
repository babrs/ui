<script>
	import stickyDock from '../../attachments/stickyDock/index.js';

	/**
	 * @typedef {Object} TabItem
	 * @property {string} id - Идентификатор вкладки
	 * @property {string} href - Адрес вкладки
	 * @property {string} label - Подпись вкладки
	 */

	/**
	 * @typedef {Object} Props
	 * @property {TabItem[]} items - Вкладки переключателя
	 * @property {string} active - id активной вкладки
	 * @property {string} label - Название навигации для вспомогательных технологий
	 * @property {boolean} [sticky] - Липкое поведение при прокрутке
	 */

	/** @type {Props} */
	let { items, active, label, sticky = true } = $props();
</script>

<section class="tabs-wrap" aria-label={label} {@attach sticky ? stickyDock({ offset: 16 }) : () => {}}>
	<div class="container">
		<nav class="tabs">
			{#each items as tab (tab.id)}
				<a class="tabs__link" class:tabs__link_active={tab.id === active} href={tab.href} aria-current={tab.id === active ? 'page' : undefined}>
					{tab.label}
				</a>
			{/each}
		</nav>
	</div>
</section>

<style>
	.tabs-wrap {
		position: relative;
		z-index: 10;
		padding-block: var(--space-md);
	}

	.tabs {
		display: flex;
		width: fit-content;
		max-width: 100%;
		margin-inline: auto;
		padding: 0.35rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-pill);
		background: color-mix(in srgb, var(--color-surface) 80%, transparent);
		box-shadow: var(--shadow-md);
		backdrop-filter: blur(16px);
	}

	.tabs__link {
		display: inline-flex;
		min-width: 132px;
		min-height: 42px;
		align-items: center;
		justify-content: center;
		padding: 0 var(--space-lg);
		border-radius: var(--radius-pill);
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
		white-space: nowrap;
		transition:
			color var(--duration-fast),
			background-color var(--duration-fast);
	}

	.tabs__link:hover {
		background: var(--color-bg-alt);
		color: var(--color-text);
	}

	.tabs__link_active,
	.tabs__link_active:hover {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	@media (max-width: 520px) {
		.tabs {
			width: 100%;
		}

		.tabs__link {
			flex: 1;
			min-width: 0;
			padding: 0 var(--space-sm);
		}
	}
</style>
