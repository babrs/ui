<script>
	import { setContext } from 'svelte';
	import { BUTTON_GROUP } from './context.js';

	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Доступное имя группы
	 * @property {boolean} [attached] - Склеить кнопки в один блок (по умолчанию)
	 * @property {'primary' | 'outline'} [variant] - Единый вариант всех кнопок группы; без него каждая кнопка использует свой
	 * @property {boolean} [grow] - Растянуть группу на всю ширину, кнопки делят место поровну
	 * @property {import('svelte').Snippet} children - Кнопки группы
	 */

	/** @type {Props} */
	let { label, attached = true, grow = false, variant, children } = $props();

	setContext(BUTTON_GROUP, {
		get variant() {
			return variant;
		}
	});
</script>

<div
	class="button-group"
	class:button-group_attached={attached}
	class:button-group_grow={grow}
	role="group"
	aria-label={label}
>
	{@render children?.()}
</div>

<style>
	.button-group {
		display: inline-flex;
		max-width: 100%;
	}

	.button-group_grow {
		display: flex;
		width: 100%;
	}

	.button-group_grow :global(.button) {
		flex: 1;
	}

	/* Склейка: общие границы, скругления только по краям блока */
	.button-group_attached :global(.button) {
		border-radius: 0;
		position: relative;
	}

	.button-group_attached :global(.button:first-child) {
		border-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	.button-group_attached :global(.button:last-child) {
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	.button-group_attached :global(.button + .button) {
		margin-left: -2px;
	}

	.button-group_attached :global(.button:focus-visible),
	.button-group_attached :global(.button:hover) {
		z-index: 1;
	}

	/* Залитые кнопки в склейке: границы сливаются, разделитель не нужен */
	.button-group_attached :global(.button_primary + .button_primary),
	.button-group_attached :global(.button_success + .button_success),
	.button-group_attached :global(.button_danger + .button_danger) {
		border-left-color: color-mix(in srgb, #fff 22%, transparent);
	}

	.button-group_grow :global(.button) {
		min-width: 0;
	}
</style>
