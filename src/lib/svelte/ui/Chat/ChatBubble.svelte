<script>
	/**
	 * @typedef {Object} Props
	 * @property {'ai' | 'user'} [author] - Автор сообщения
	 * @property {string} [name] - Подпись автора
	 * @property {import('svelte').Snippet} children - Текст сообщения
	 */

	/** @type {Props} */
	let { author = 'ai', name, children } = $props();
</script>

<div class="message message_{author}">
	<span class="message__avatar" class:message__avatar_ai={author === 'ai'}>
		{name ?? (author === 'ai' ? 'AI' : 'Я')}
	</span>
	<div class="message__bubble">
		{@render children?.()}
	</div>
</div>

<style>
	.message {
		display: flex;
		gap: 0.75rem;
		max-width: 85%;
	}

	.message_user {
		align-self: flex-end;
		flex-direction: row-reverse;
	}

	.message__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--color-bg-alt);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		flex-shrink: 0;
	}

	[data-theme='dark'] .message__avatar {
		background: var(--color-surface);
	}

	.message__avatar_ai {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.message__bubble {
		padding: 0.75rem var(--space-md);
		border-radius: var(--radius-card);
		font-size: var(--font-size-base);
		line-height: 1.45;
		color: var(--color-text);
	}

	.message_ai .message__bubble {
		background: var(--color-bg-alt);
		border-top-left-radius: var(--radius-xs);
	}

	[data-theme='dark'] .message_ai .message__bubble {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
	}

	.message_user .message__bubble {
		background: var(--color-primary);
		color: var(--color-on-primary);
		border-top-right-radius: var(--radius-xs);
	}
</style>
