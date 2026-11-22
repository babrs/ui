<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [backgroundImage] - Адрес фонового изображения
	 * @property {string} title - Заголовок баннера
	 * @property {string} [titleImage] - Изображение вместо видимого заголовка
	 * @property {string} [titleAlt] - Альтернативный текст изображения заголовка
	 * @property {import('svelte').Snippet} [children] - Дополнительное содержимое под заголовком
	 */

	/** @type {Props} */
	let { backgroundImage = '', title, titleImage = '', titleAlt = '', children } = $props();
</script>

<section class="hero" aria-labelledby="hero-title" style:background-image={backgroundImage ? `url(${backgroundImage})` : undefined}>
	<div class="hero__overlay"></div>
	<div class="hero__content">
		{#if titleImage}
			<img class="hero__image" src={titleImage} alt={titleAlt} />
		{/if}
		<h1 id="hero-title" class="hero__title" class:u-visually-hidden={Boolean(titleImage)}>{title}</h1>
		{@render children?.()}
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		min-height: min(70vh, 640px);
		background: var(--color-bg-alt) center / cover no-repeat;
		isolation: isolate;
	}

	.hero__overlay {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(180deg, rgb(30 36 48 / 0.1), rgb(30 36 48 / 0.45));
	}

	.hero__content {
		display: grid;
		align-content: center;
		justify-items: center;
		gap: var(--space-lg);
		padding: var(--space-xl) var(--space-md);
		text-align: center;
	}

	.hero__image {
		width: min(90vw, 560px);
		height: auto;
	}

	.hero__title {
		max-width: 18ch;
		color: #ffffff;
		font-family: var(--font-display);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-black);
		line-height: 1.02;
		text-shadow: 0 18px 48px rgb(0 0 0 / 0.38);
	}
</style>
