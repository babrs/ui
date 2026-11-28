<script>
	import Avatar from '../Avatar/index.js';
	import ChatBubble from './ChatBubble.svelte';
	import Button from '../Button/index.js';
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {string} [title] - Имя собеседника в шапке
	 * @property {string} [status] - Статус собеседника, например «Онлайн»
	 * @property {string} [avatar] - Адрес аватара; без него показывается иконка
	 * @property {number} [height] - Высота области сообщений в пикселях
	 * @property {string} [placeholder] - Подсказка в поле ввода
	 * @property {string} [value] - Текст поля ввода (двусторонняя связь)
	 * @property {boolean} [typing] - Показывать индикатор набора
	 * @property {Array<string>} [quickActions] - Быстрые подсказки под полем ввода
	 * @property {(text: string) => void} [onsend] - Отправка сообщения
	 * @property {(text: string) => void} [onquick] - Нажатие на быструю подсказку
	 * @property {import('svelte').Snippet} [children] - Сообщения (ChatBubble)
	 * @property {import('svelte').Snippet} [footer] - Своя панель ввода вместо стандартной
	 */

	/** @type {Props} */
	let {
		title = 'Ассистент',
		status,
		avatar,
		height = 320,
		placeholder = 'Напишите сообщение…',
		value = $bindable(''),
		typing = false,
		quickActions = [],
		onsend,
		onquick,
		children,
		footer
	} = $props();

	/** @type {HTMLDivElement | undefined} */
	let messages = $state();

	$effect(() => {
		// держим ленту прокрученной к последнему сообщению
		if (!messages) return;
		messages.scrollTop = messages.scrollHeight;
	});

	function send() {
		const text = value.trim();
		if (!text) return;
		onsend?.(text);
		value = '';
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return;
		event.preventDefault();
		send();
	}

	/** @param {number} delta */
	export function scroll(delta) {
		messages?.scrollBy({ top: delta, behavior: 'smooth' });
	}
</script>

<section class="chat" aria-label={title}>
	<header class="chat__header">
		<span class="chat__avatar" aria-hidden="true">
			{#if avatar}
				<Avatar src={avatar} name={title} size="md" alt={title} />
			{:else}
				<Icon name="sparkles" size={20} />
			{/if}
		</span>

		<div class="chat__identity">
			<strong class="chat__title">{title}</strong>
			{#if status}
				<span class="chat__status">{status}</span>
			{/if}
		</div>
	</header>

	<div class="chat__messages" bind:this={messages} style:height="{height}px" role="log" aria-live="polite">
		{@render children?.()}

		{#if typing}
			<ChatBubble role="ai">
				<span class="chat__typing" aria-label="Собеседник печатает">
					<span></span>
					<span></span>
					<span></span>
				</span>
			</ChatBubble>
		{/if}
	</div>

	<footer class="chat__footer">
		{#if footer}
			{@render footer()}
		{:else}
			{#if quickActions.length}
				<div class="chat__quick">
					{#each quickActions as action (action)}
						<button class="chat__chip" type="button" onclick={() => onquick?.(action)}>{action}</button>
					{/each}
				</div>
			{/if}

			<div class="chat__composer">
				<textarea
					class="chat__input"
					rows="1"
					{placeholder}
					bind:value
					onkeydown={handleKeydown}
					aria-label={placeholder}
				></textarea>
				<Button variant="primary" iconOnly label="Отправить" disabled={!value.trim()} onclick={send}>
					<Icon name="send" size={18} />
				</Button>
			</div>
		{/if}
	</footer>
</section>

<style>
	.chat {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 640px;
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-card);
		background: var(--color-surface);
		box-shadow: var(--shadow-sm);
		color: var(--color-text);
	}

	.chat__header {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.chat__avatar {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--color-primary);
		color: var(--color-on-primary);
		overflow: hidden;
	}

	.chat__identity {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.chat__title {
		font-size: 0.9375rem;
		font-family: var(--font-display);
	}

	.chat__status {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: var(--font-size-xs);
		color: var(--color-success);
	}

	.chat__status::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
	}

	.chat__messages {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		overflow-y: auto;
		overscroll-behavior: contain;
	}

	.chat__footer {
		padding: 1rem 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	.chat__composer {
		display: flex;
		align-items: flex-end;
		gap: 0.75rem;
	}

	.chat__input {
		flex: 1;
		min-width: 0;
		max-height: 8rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-field);
		background: var(--color-bg);
		color: var(--color-text);
		font: inherit;
		font-size: var(--font-size-sm);
		line-height: 1.4;
		resize: none;
		field-sizing: content;
	}

	.chat__input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.chat__quick {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.chat__chip {
		padding: 0.25rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-pill);
		background: var(--color-surface);
		color: var(--color-text);
		font: inherit;
		font-size: var(--font-size-xs);
		cursor: pointer;
		transition:
			border-color var(--duration-fast) var(--easing-standard),
			color var(--duration-fast) var(--easing-standard);
	}

	.chat__chip:hover {
		border-color: var(--color-primary);
		color: var(--color-primary-strong);
	}

	.chat__typing {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 0.25rem 0.125rem;
	}

	.chat__typing span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-text-muted);
		animation: chat-typing 1.4s infinite ease-in-out both;
	}

	.chat__typing span:nth-child(2) {
		animation-delay: -0.16s;
	}

	.chat__typing span:nth-child(3) {
		animation-delay: -0.32s;
	}

	@keyframes chat-typing {
		0%,
		80%,
		100% {
			transform: scale(0.6);
			opacity: 0.5;
		}
		40% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.chat__typing span {
			animation: none;
		}
	}
</style>
