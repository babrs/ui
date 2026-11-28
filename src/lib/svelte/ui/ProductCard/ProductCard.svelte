<script>
	import Badge from '../Badge/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {string} [image] - Адрес изображения
	 * @property {string} [imageAlt] - Альтернативный текст изображения
	 * @property {string} [eyebrow] - Надзаголовок: категория или тип
	 * @property {string} title - Название
	 * @property {string} [description] - Короткое описание
	 * @property {string} [price] - Цена
	 * @property {string} [oldPrice] - Старая цена
	 * @property {string} [badge] - Бейдж на изображении
	 * @property {'primary' | 'success' | 'warning' | 'info' | 'danger' | 'neutral'} [badgeTone] - Тон бейджа
	 * @property {string} [href] - Ссылка карточки
	 * @property {import('svelte').Snippet} [action] - Кнопка или ссылка в подвале карточки
	 */

	/** @type {Props} */
	let {
		image,
		imageAlt = '',
		eyebrow,
		title,
		description,
		price,
		oldPrice,
		badge,
		badgeTone = 'primary',
		href,
		action
	} = $props();
</script>

<article class="product-card">
	{#if image}
		<div class="product-card__media">
			<img src={image} alt={imageAlt} loading="lazy" />
			{#if badge}
				<span class="product-card__badge"><Badge tone={badgeTone} size="sm">{badge}</Badge></span>
			{/if}
		</div>
	{/if}

	<div class="product-card__body">
		{#if eyebrow}<span class="product-card__eyebrow">{eyebrow}</span>{/if}
		<h3 class="product-card__title">
			{#if href}<a {href}>{title}</a>{:else}{title}{/if}
		</h3>
		{#if description}<p class="product-card__desc">{description}</p>{/if}

		{#if price}
			<p class="product-card__price">
				{price}
				{#if oldPrice}<small>{oldPrice}</small>{/if}
			</p>
		{/if}

		{#if action}
			<div class="product-card__action">{@render action()}</div>
		{/if}
	</div>
</article>

<style>
	.product-card {
		position: relative;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-card);
		background: var(--color-surface);
		overflow: hidden;
		transition:
			border-color var(--duration-slow) var(--easing-standard),
			box-shadow var(--duration-slow) var(--easing-standard);
	}

	[data-theme='dark'] .product-card {
		background: var(--color-bg-alt);
	}

	.product-card:hover {
		border-color: var(--color-primary-strong);
		box-shadow: var(--shadow-md);
	}

	.product-card__media {
		position: relative;
		height: 180px;
		background: var(--color-bg-alt);
	}

	.product-card__media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.product-card__badge {
		position: absolute;
		top: var(--space-sm);
		left: var(--space-sm);
	}

	.product-card__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 0.25rem;
		padding: var(--space-md);
	}

	.product-card__eyebrow {
		font-family: var(--font-display);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-caps);
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.product-card__title {
		margin: 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0;
		line-height: 1.3;
	}

	.product-card__title a {
		color: inherit;
		text-decoration: none;
	}

	.product-card__title a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.product-card__desc {
		margin: 0 0 var(--space-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.product-card__price {
		margin: auto 0 0;
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: var(--font-weight-bold);
		color: var(--color-primary-strong);
	}

	.product-card__price small {
		margin-left: var(--space-sm);
		font-family: var(--font-primary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-regular);
		color: var(--color-text-muted);
		text-decoration: line-through;
	}

	.product-card__action {
		margin-top: var(--space-md);
	}
</style>
