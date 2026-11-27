<script>
	/**
	 * @typedef {Object} LinkItem
	 * @property {string} href - Ссылка
	 * @property {string} label - Текст
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} title - Название
	 * @property {string} [tagline] - Подзаголовок
	 * @property {Array<LinkItem>} [links] - Ссылки
	 */

	/** @type {Props} */
	let { title, tagline, links = [] } = $props();
</script>

<footer class="site-footer">
	<div class="site-footer__inner container">
		<div>
			<p class="site-footer__title">{title}</p>
			{#if tagline}<p class="site-footer__tagline">{tagline}</p>{/if}
		</div>

		<nav class="site-footer__links" aria-label="Ссылки в подвале">
			{#each links as link (link.href)}
				<a href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<p class="site-footer__note">Svelte 5 · открытый код</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: var(--space-2xl);
		padding: var(--space-xl) 0;
		border-top: 1px solid var(--color-border);
		background: var(--color-bg-alt);
	}

	.site-footer__inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.site-footer__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
	}

	.site-footer__tagline,
	.site-footer__note {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.site-footer__links {
		display: flex;
		gap: var(--space-lg);
	}

	.site-footer__links a {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		text-decoration: none;
	}

	.site-footer__links a:hover {
		color: var(--color-primary);
	}
</style>
