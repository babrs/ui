<script>
	/**
	 * @typedef {Object} NavItem
	 * @property {string} href - Адрес ссылки
	 * @property {string} label - Текст ссылки
	 * @property {boolean} [current] - Текущая страница
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} brand - Название проекта
	 * @property {string} [tagline] - Подпись под названием
	 * @property {string} [homeHref] - Адрес логотипа
	 * @property {NavItem[]} [navItems] - Пункты навигации
	 * @property {boolean} [hideOnScroll] - Прятать шапку при прокрутке вниз
	 */

	/** @type {Props} */
	let { brand, tagline = '', homeHref = '/', navItems = [], hideOnScroll = true } = $props();

	let hidden = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		let lastScrollY = window.scrollY;
		let ticking = false;

		function update() {
			const current = window.scrollY;
			const delta = current - lastScrollY;

			scrolled = current > 8;

			if (Math.abs(delta) > 8) {
				hidden = hideOnScroll && current > 120 && delta > 0;
				lastScrollY = current;
			}

			ticking = false;
		}

		function handleScroll() {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header class="app-header" class:app-header_hidden={hidden} class:app-header_scrolled={scrolled}>
	<div class="container app-header__inner">
		<a class="app-header__brand" href={homeHref}>
			<span class="app-header__mark" aria-hidden="true"></span>
			<span class="app-header__text">
				<strong>{brand}</strong>
				{#if tagline}<small>{tagline}</small>{/if}
			</span>
		</a>

		{#if navItems.length}
			<nav class="app-header__nav" aria-label="Основная навигация">
				{#each navItems as link (link.href)}
					<a href={link.href} aria-current={link.current ? 'page' : undefined}>{link.label}</a>
				{/each}
			</nav>
		{/if}
	</div>
</header>

<style>
	.app-header {
		position: sticky;
		top: 0;
		z-index: var(--z-header);
		height: var(--header-height);
		border-bottom: 1px solid transparent;
		background: color-mix(in srgb, var(--color-bg) 86%, transparent);
		backdrop-filter: blur(14px);
		transition:
			transform var(--duration-base) var(--easing-standard),
			border-color var(--duration-base) var(--easing-standard);
	}

	.app-header_scrolled {
		border-color: var(--color-border);
	}

	.app-header_hidden {
		transform: translateY(-100%);
	}

	.app-header__inner {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.app-header__brand {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		text-decoration: none;
	}

	.app-header__mark {
		width: 28px;
		height: 28px;
		border-radius: var(--radius-sm);
		background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
	}

	.app-header__text {
		display: grid;
		line-height: 1.1;
	}

	.app-header__text small {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	.app-header__nav {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.app-header__nav a {
		display: inline-flex;
		min-height: 40px;
		align-items: center;
		padding: 0 var(--space-md);
		border-radius: var(--radius-pill);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
	}

	.app-header__nav a[aria-current='page'] {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.app-header__nav a:hover {
		background: var(--color-bg-alt);
	}

	@media (max-width: 520px) {
		.app-header__nav a {
			padding: 0 var(--space-sm);
		}
	}
</style>
