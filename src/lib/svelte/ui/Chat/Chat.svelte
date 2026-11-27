<script>
	import Avatar from '../Avatar/index.js';
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {string} [title] - Заголовок чата
	 * @property {string} [status] - Статус собеседника
	 * @property {string} [avatar] - Адрес аватара
	 * @property {number} [height] - Высота области сообщений
	 * @property {import('svelte').Snippet} children - Сообщения
	 * @property {import('svelte').Snippet} [footer] - Панель ввода
	 */

	/** @type {Props} */
	let { title = 'Ассистент', status, avatar, height = 320, children, footer } = $props();
</script>

<section class="chat" aria-label={title}>
	<header class="chat__header">
		<span class="chat__avatar">
			{#if avatar}
				<Avatar src={avatar} name={title} size="md" alt={title} />
			{:else}
				<Icon name="sparkles" size={20} />
			{/if}
		</span>

		<div class="chat__identity">
			<h4 class="chat__title">{title}</h4>
			{#if status}
				<span class="chat__status">{status}</span>
			{/if}
		</div>
	</header>

	<div class="chat__messages" style:height="{height}px">
		{@render children?.()}
	</div>

	{#if footer}
		<footer class="chat__footer">
			{@render footer()}
		</footer>
	{/if}
</section>

<style>
	.chat {
		display: flex;
		flex-direction: column;
		max-width: 640px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-card);
		background: var(--color-surface);
		box-shadow: var(--shadow-sm);
		overflow: hidden;
	}

	[data-theme='dark'] .chat {
		background: var(--color-bg-alt);
	}

	.chat__header {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-md) var(--space-lg);
		border-bottom: 1px solid var(--color-border);
	}

	.chat__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--color-primary);
		color: var(--color-on-primary);
		flex-shrink: 0;
	}

	.chat__title {
		margin: 0;
		font-size: var(--font-size-md);
		letter-spacing: 0;
	}

	.chat__status {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: var(--font-size-2xs);
		color: var(--color-success);
	}

	.chat__status::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-success);
	}

	.chat__messages {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		overflow-y: auto;
	}

	.chat__footer {
		padding: var(--space-md) var(--space-lg);
		border-top: 1px solid var(--color-border);
	}
</style>
