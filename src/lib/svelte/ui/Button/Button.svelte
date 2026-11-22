<script>
	/**
	 * @typedef {Object} Props
	 * @property {'primary' | 'secondary' | 'ghost' | 'danger'} [variant] - Визуальный вариант кнопки
	 * @property {'md' | 'lg'} [size] - Размер кнопки
	 * @property {string} [href] - Адрес: если задан, кнопка рендерится ссылкой
	 * @property {string} [target] - Окно для ссылки, например _blank
	 * @property {string} [rel] - Атрибут rel ссылки
	 * @property {'button' | 'submit' | 'reset'} [type] - Тип кнопки для формы
	 * @property {boolean} [disabled] - Недоступна для нажатия
	 * @property {(event: MouseEvent) => void} [onclick] - Обработчик нажатия
	 * @property {import('svelte').Snippet} children - Содержимое кнопки
	 */

	/** @type {Props} */
	let { variant = 'primary', size = 'md', href, target, rel, type = 'button', disabled = false, onclick, children } = $props();
</script>

{#if href}
	<a class="button button_{variant} button_{size}" class:button_disabled={disabled} {href} {target} {rel} aria-disabled={disabled} {onclick}>
		{@render children?.()}
	</a>
{:else}
	<button class="button button_{variant} button_{size}" {type} {disabled} {onclick}>
		{@render children?.()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		min-height: 44px;
		padding: 0 var(--space-lg);
		border: 2px solid transparent;
		border-radius: var(--radius-pill);
		font-family: inherit;
		font-weight: var(--font-weight-bold);
		line-height: 1;
		text-decoration: none;
		cursor: pointer;
		transition:
			transform var(--duration-fast) var(--easing-standard),
			background-color var(--duration-fast) var(--easing-standard);
	}

	.button:hover:not(:disabled) {
		transform: translateY(-1px);
	}

	.button:active:not(:disabled) {
		transform: translateY(0);
	}

	.button:disabled,
	.button_disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.button_primary {
		background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
		box-shadow: 0 12px 28px var(--color-primary-glow);
		color: var(--color-on-primary);
	}

	.button_primary:hover:not(:disabled) {
		box-shadow: 0 18px 36px var(--color-primary-glow);
	}

	.button_secondary {
		border-color: var(--color-primary);
		background: var(--color-surface);
		color: var(--color-text);
	}

	.button_ghost {
		background: transparent;
		color: var(--color-text);
	}

	.button_danger {
		background: var(--color-danger);
		color: var(--color-on-primary);
	}

	.button_md {
		font-size: var(--font-size-md);
	}

	.button_lg {
		min-height: 56px;
		padding: 0 var(--space-xl);
		font-size: var(--font-size-lg);
	}

	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
	}
</style>
