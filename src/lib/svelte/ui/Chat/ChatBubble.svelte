<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {'ai' | 'user'} [role] - Чья реплика: ассистента (слева) или пользователя (справа)
	 * @property {string} [name] - Подпись аватара пользователя, по умолчанию «Вы»
	 * @property {import('svelte').Snippet} [children] - Текст сообщения
	 */

	/** @type {Props} */
	let { role = 'ai', name = 'Вы', children } = $props();
</script>

<div class="chat-message chat-message_{role}">
	<span class="chat-message__avatar" aria-hidden="true">
		{#if role === 'ai'}
			<Icon name="sparkles" size={16} />
		{:else}
			{name}
		{/if}
	</span>
	<div class="chat-message__bubble">
		{@render children?.()}
	</div>
</div>

<style>
	.chat-message {
		display: flex;
		align-items: flex-end;
		gap: 0.75rem;
		max-width: 85%;
	}

	.chat-message_user {
		align-self: flex-end;
		flex-direction: row-reverse;
	}

	.chat-message__avatar {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--color-bg-alt);
		color: var(--color-text);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
	}

	.chat-message_ai .chat-message__avatar {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.chat-message__bubble {
		padding: 0.75rem 1rem;
		border-radius: var(--radius-lg);
		font-size: var(--font-size-sm);
		line-height: 1.4;
	}

	.chat-message_ai .chat-message__bubble {
		border-top-left-radius: 4px;
		background: var(--color-bg-alt);
		color: var(--color-text);
	}

	.chat-message_user .chat-message__bubble {
		border-top-right-radius: 4px;
		background: var(--color-primary);
		color: var(--color-on-primary);
	}
</style>
