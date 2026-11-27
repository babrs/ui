<script>
	/**
	 * @typedef {Object} Props
	 * @property {'none' | 'sm' | 'md' | 'lg'} [padding] - Внутренние отступы
	 * @property {boolean} [elevated] - Тень и подсветка при наведении
	 * @property {boolean} [interactive] - Карточка-ссылка или кнопка
	 * @property {string} [href] - Адрес, если карточка ведёт на страницу
	 * @property {import('svelte').Snippet} [media] - Медиа-блок над содержимым
	 * @property {import('svelte').Snippet} children - Содержимое карточки
	 */

	/** @type {Props} */
	let { padding = 'md', elevated = false, interactive = false, href, media, children } = $props();

	const classes = $derived(
		['card', `card_pad_${padding}`, elevated ? 'card_elevated' : '', interactive ? 'card_interactive' : '']
			.filter(Boolean)
			.join(' ')
	);
</script>

{#if href}
	<a class={classes} {href}>
		{#if media}<div class="card__media">{@render media()}</div>{/if}
		<div class="card__body">{@render children?.()}</div>
	</a>
{:else}
	<div class={classes}>
		{#if media}<div class="card__media">{@render media()}</div>{/if}
		<div class="card__body">{@render children?.()}</div>
	</div>
{/if}

<style>
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-card);
		background: var(--color-surface);
		color: var(--color-text);
		overflow: hidden;
		text-decoration: none;
		transition:
			border-color var(--duration-slow) var(--easing-standard),
			box-shadow var(--duration-slow) var(--easing-standard),
			transform var(--duration-slow) var(--easing-standard);
	}

	[data-theme='dark'] .card {
		background: var(--color-bg-alt);
	}

	.card_pad_none .card__body {
		padding: 0;
	}

	.card_pad_sm .card__body {
		padding: var(--space-sm);
	}

	.card_pad_md .card__body {
		padding: var(--space-lg);
	}

	.card_pad_lg .card__body {
		padding: var(--space-xl);
	}

	.card__media {
		display: flex;
		overflow: hidden;
	}

	.card__media :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card_elevated {
		box-shadow: var(--shadow-sm);
	}

	.card_elevated:hover {
		border-color: var(--color-primary);
		box-shadow: var(--shadow-md);
	}

	.card_interactive {
		cursor: pointer;
	}

	.card_interactive:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.card_interactive:focus-visible {
		outline-offset: 4px;
	}

	@media (prefers-reduced-motion: reduce) {
		.card_interactive:hover {
			transform: none;
		}
	}
</style>
