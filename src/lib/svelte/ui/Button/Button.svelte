<script>
	import { getContext } from 'svelte';
	import { BUTTON_GROUP } from '../ButtonGroup/context.js';

	/**
	 * @typedef {Object} Props
	 * @property {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'} [variant] - Визуальный вариант
	 * @property {'sm' | 'md' | 'lg' | 'xl'} [size] - Размер
	 * @property {string} [href] - Адрес: если задан, рендерится ссылка
	 * @property {string} [target] - Окно для ссылки, например _blank
	 * @property {string} [rel] - Атрибут rel ссылки
	 * @property {'button' | 'submit' | 'reset'} [type] - Тип кнопки для формы
	 * @property {boolean} [disabled] - Недоступна для нажатия
	 * @property {boolean} [loading] - Показывает спиннер и блокирует нажатие
	 * @property {boolean} [iconOnly] - Квадратная кнопка только под иконку
	 * @property {boolean} [block] - Растянуть на всю ширину контейнера
	 * @property {string} [label] - Доступное имя для кнопки-иконки
	 * @property {(event: MouseEvent) => void} [onclick] - Обработчик нажатия
	 * @property {import('svelte').Snippet} children - Содержимое кнопки
	 */

	/** @type {Props} */
	let {
		variant = 'primary',
		size = 'md',
		href,
		target,
		rel,
		type = 'button',
		disabled = false,
		loading = false,
		iconOnly = false,
		block = false,
		label,
		onclick,
		children
	} = $props();

	/** Вариант, заданный ButtonGroup (если группа его задаёт), перекрывает свой. */
	const group = getContext(BUTTON_GROUP);
	const resolvedVariant = $derived(group?.variant ?? variant);

	const classes = $derived(
		[
			'button',
			`button_${resolvedVariant}`,
			`button_${size}`,
			iconOnly ? 'button_icon' : '',
			block ? 'button_block' : '',
			loading ? 'button_loading' : ''
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#if href}
	<a
		class={classes}
		{ href}
		{target}
		{rel}
		aria-label={label}
		aria-disabled={disabled || loading}
		tabindex={disabled || loading ? -1 : undefined}
		onclick={disabled || loading ? undefined : onclick}
	>
		{@render children?.()}
	</a>
{:else}
	<button class={classes} {type} disabled={disabled || loading} aria-busy={loading} aria-label={label} {onclick}>
		{@render children?.()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		padding: 0.375rem 1rem;
		border: 2px solid transparent;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--color-text);
		font-family: inherit;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		line-height: 1.2;
		text-align: center;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--easing-standard),
			border-color var(--duration-fast) var(--easing-standard),
			color var(--duration-fast) var(--easing-standard),
			opacity var(--duration-fast) var(--easing-standard);
	}

	.button:disabled,
	.button[aria-disabled='true'] {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Варианты */
	.button_primary {
		border-color: var(--color-primary);
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.button_primary:hover {
		border-color: var(--color-primary-strong);
		background: var(--color-primary-strong);
	}

	.button_secondary {
		border-color: var(--color-text);
		background: var(--color-text);
		color: var(--color-bg);
	}

	.button_secondary:hover {
		opacity: 0.85;
	}

	.button_outline {
		border-color: var(--color-border);
		background: transparent;
		color: var(--color-text);
	}

	.button_outline:hover {
		border-color: var(--color-primary);
		background: var(--color-primary-glow);
		color: var(--color-primary-strong);
	}

	.button_ghost {
		border-color: transparent;
		background: transparent;
		color: var(--color-text);
	}

	.button_ghost:hover {
		background: var(--color-primary-glow);
		color: var(--color-primary-strong);
	}

	.button_danger {
		border-color: var(--color-danger);
		background: var(--color-danger);
		color: var(--color-on-danger);
	}

	.button_danger:hover {
		opacity: 0.9;
	}

	.button_success {
		border-color: var(--color-success);
		background: var(--color-success);
		color: var(--color-on-success);
	}

	.button_success:hover {
		opacity: 0.9;
	}

	/* Размеры */
	.button_sm {
		padding: 0.25rem 0.75rem;
		font-size: var(--font-size-sm);
	}

	.button_lg {
		padding: 0.5rem 1.25rem;
		font-size: var(--font-size-md);
	}

	.button_xl {
		padding: 0.625rem 1.5rem;
		font-size: var(--font-size-lg);
	}

	/* Модификаторы */
	.button_icon {
		width: 2.5rem;
		height: 2.25rem;
		padding: 0;
	}

	.button_icon.button_sm {
		width: 2rem;
		height: 1.75rem;
	}

	.button_icon.button_lg {
		width: 3rem;
		height: 2.5rem;
	}

	.button_icon.button_xl {
		width: 3.5rem;
		height: 3rem;
	}

	.button_block {
		width: 100%;
	}

	/* Загрузка */
	.button_loading {
		position: relative;
		color: transparent !important;
	}

	.button_loading::after {
		content: '';
		position: absolute;
		width: 18px;
		height: 18px;
		border: 2px solid transparent;
		border-top-color: var(--color-text);
		border-radius: 50%;
		animation: button-spin 0.8s linear infinite;
	}

	.button_primary.button_loading::after,
	.button_secondary.button_loading::after,
	.button_danger.button_loading::after,
	.button_success.button_loading::after {
		border-top-color: currentColor;
	}

	.button_primary.button_loading::after,
	.button_secondary.button_loading::after,
	.button_success.button_loading::after,
	.button_danger.button_loading::after {
		border-top-color: currentColor;
	}

	.button_secondary.button_loading::after {
		border-top-color: var(--color-bg);
	}

	@keyframes button-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
	}
</style>
