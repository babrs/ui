<script>
	import Avatar from '../Avatar/index.js';

	/**
	 * @typedef {Object} Stat
	 * @property {string} value - Значение
	 * @property {string} label - Подпись
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} name - Имя
	 * @property {string} [role] - Роль или профессия
	 * @property {string} [avatar] - Адрес аватара
	 * @property {Array<Stat>} [stats] - Показатели
	 * @property {import('svelte').Snippet} [action] - Кнопка действия
	 */

	/** @type {Props} */
	let { name, role, avatar, stats = [], action } = $props();
</script>

<article class="profile-card">
	<span class="profile-card__avatar">
		<Avatar {avatar} {name} size="xl" alt={name} />
	</span>

	<h3 class="profile-card__name">{name}</h3>
	{#if role}<p class="profile-card__role">{role}</p>{/if}

	{#if stats.length}
		<dl class="profile-card__stats">
			{#each stats as stat (stat.label)}
				<div class="profile-card__stat">
					<dt>{stat.label}</dt>
					<dd>{stat.value}</dd>
				</div>
			{/each}
		</dl>
	{/if}

	{#if action}
		<div class="profile-card__action">{@render action()}</div>
	{/if}
</article>

<style>
	.profile-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-xl) var(--space-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-card);
		background: var(--color-surface);
		text-align: center;
	}

	[data-theme='dark'] .profile-card {
		background: var(--color-bg-alt);
	}

	.profile-card__avatar {
		margin-bottom: var(--space-md);
	}

	.profile-card__name {
		margin: 0 0 0.25rem;
		font-size: var(--font-size-lg);
		letter-spacing: var(--tracking-display);
	}

	.profile-card__role {
		margin: 0 0 var(--space-md);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.profile-card__stats {
		display: flex;
		justify-content: center;
		gap: var(--space-xl);
		margin: 0 0 var(--space-lg);
	}

	.profile-card__stat {
		display: flex;
		flex-direction: column-reverse;
		gap: 0.125rem;
	}

	.profile-card__stat dd {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
	}

	.profile-card__stat dt {
		font-size: var(--font-size-2xs);
		color: var(--color-text-muted);
	}

	.profile-card__action {
		width: 100%;
	}
</style>
