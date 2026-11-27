<script>
	import { ICONS } from './icons.js';

	/**
	 * @typedef {Object} Props
	 * @property {string} name - Имя иконки из набора
	 * @property {number} [size] - Размер в пикселях
	 * @property {number} [stroke] - Толщина обводки
	 * @property {string} [label] - Доступное имя; без него иконка декоративная
	 */

	/** @type {Props} */
	let { name, size = 20, stroke = 2, label, ...rest } = $props();

	const paths = $derived(ICONS[name] ?? []);
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	focusable="false"
	{...rest}
>
	{#each paths as d}
		<path {d} />
	{/each}
</svg>

<style>
	svg {
		flex-shrink: 0;
		display: block;
	}
</style>
