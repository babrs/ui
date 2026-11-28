<script>
	import { base } from '$app/paths';
	import { Button, Dropdown, Icon, ThemeToggle } from '$lib/index.js';

	/**
	 * @typedef {Object} NavItem
	 * @property {string} href - Ссылка
	 * @property {string} label - Текст
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} brand - Название продукта
	 * @property {string} [tagline] - Подзаголовок
	 * @property {string} homeHref - Ссылка на главную
	 * @property {Array<NavItem>} [navItems] - Пункты меню
	 */

	/** @type {Props} */
	let { brand = 'Babrs UI', tagline, homeHref = '/', navItems = [], ...rest } = $props();

	let menuOpen = $state(false);

	const menuItems = $derived([
		{ id: 'profile', label: 'Профиль', icon: 'user' },
		{ id: 'settings', label: 'Настройки', icon: 'settings' },
		{ id: 'divider', divider: true },
		{ id: 'logout', label: 'Выйти', icon: 'logout', danger: true }
	]);
</script>

<header class="site-header" {...rest}>
	<div class="site-header__inner container">
		<a class="logo" href={homeHref}>
			<span class="logo__mark" aria-hidden="true"><Icon name="sparkles" size={20} /></span>
			<span class="logo__text">
				{brand}
				{#if tagline}<small>{tagline}</small>{/if}
			</span>
		</a>

		<nav class="site-nav" class:site-nav_open={menuOpen} aria-label="Основная навигация">
			{#each navItems as item (item.href)}
				<a class="site-nav__link" href={item.href} onclick={() => (menuOpen = false)}>{item.label}</a>
			{/each}
		</nav>

		<div class="site-header__actions">
			<ThemeToggle />

			<Dropdown items={menuItems} align="end" label="Меню профиля">
				{#snippet trigger()}
					<span class="profile-trigger">
						<span class="profile-trigger__avatar">AD</span>
						<span>Админ</span>
						<Icon name="chevron-down" size={16} />
					</span>
				{/snippet}
			</Dropdown>

			<button
				class="site-header__burger"
				type="button"
				aria-label="Меню"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon name={menuOpen ? 'x' : 'menu'} size={22} />
			</button>
		</div>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: var(--z-header);
		border-bottom: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-bg) 90%, transparent);
		backdrop-filter: blur(12px);
	}

	.site-header__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		height: 72px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-text);
		text-decoration: none;
	}

	.logo__mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-md);
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.logo__text {
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: var(--font-weight-bold);
		letter-spacing: var(--tracking-display);
		line-height: 1.1;
	}

	.logo__text small {
		font-family: var(--font-primary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-regular);
		color: var(--color-text-muted);
		letter-spacing: 0;
	}

	.site-nav {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
	}

	.site-nav__link {
		position: relative;
		padding: 0.25rem 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		text-decoration: none;
		transition: color var(--duration-fast) var(--easing-standard);
	}

	.site-nav__link:hover {
		color: var(--color-text);
	}

	.site-nav__link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--color-primary);
		transition: width var(--duration-slow) var(--easing-standard);
	}

	.site-nav__link:hover::after {
		width: 100%;
	}

	.site-header__actions {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	.profile-trigger {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.profile-trigger__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
	}

	.site-header__burger {
		display: none;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--color-text);
		cursor: pointer;
	}

	@media (max-width: 860px) {
		.site-nav {
			position: absolute;
			top: 72px;
			left: 0;
			right: 0;
			display: none;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-md);
			padding: var(--space-lg);
			border-bottom: 1px solid var(--color-border);
			background: var(--color-surface);
		}

		.site-nav_open {
			display: flex;
		}

		.site-header__burger {
			display: flex;
		}

		:global(.profile-trigger > span:not(.profile-trigger__avatar)) {
			display: none;
		}
	}
</style>
