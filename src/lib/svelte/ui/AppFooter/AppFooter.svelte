<script>
	/**
	 * @typedef {Object} LinkItem
	 * @property {string} href - Адрес ссылки
	 * @property {string} label - Текст ссылки
	 * @property {boolean} [external] - Открывать в новой вкладке
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} title - Название проекта
	 * @property {string} [tagline] - Короткое описание
	 * @property {LinkItem[]} [links] - Ссылки подвала
	 * @property {string} [note] - Строка внизу: авторство или юридическая информация
	 */

	/** @type {Props} */
	let { title, tagline = '', links = [], note = '' } = $props();
</script>

<footer class="app-footer">
	<div class="container app-footer__inner">
		<p class="app-footer__title">{title}</p>
		{#if tagline}<p class="app-footer__tagline">{tagline}</p>{/if}
		{#if links.length}
			<ul class="app-footer__links">
				{#each links as link (link.href)}
					<li>
						<a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
		{#if note}<p class="app-footer__note">{note}</p>{/if}
	</div>
</footer>

<style>
	.app-footer {
		margin-top: auto;
		padding-block: var(--space-xl);
		border-top: 1px solid var(--color-border);
		background: var(--color-bg-alt);
	}

	.app-footer__inner {
		display: grid;
		gap: var(--space-sm);
		justify-items: center;
		text-align: center;
	}

	.app-footer__title {
		font-family: var(--font-display);
		font-weight: var(--font-weight-black);
	}

	.app-footer__tagline,
	.app-footer__note {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	.app-footer__links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-md);
		list-style: none;
	}

	.app-footer__links a {
		font-weight: var(--font-weight-medium);
	}
</style>
