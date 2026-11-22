<script>
	/**
	 * @typedef {Object} Props
	 * @property {Array<{ id?: string | number }>} items - Элементы сетки
	 * @property {string} label - Название сетки для вспомогательных технологий
	 * @property {(index: number) => void} [onopen] - Вызывается при выборе элемента
	 * @property {import('svelte').Snippet<[any, number]>} item - Сниппет оформления элемента
	 */

	/** @type {Props} */
	let { items = [], label, onopen, item } = $props();
</script>

<ul class="card-grid" aria-label={label}>
	{#each items as entry, index (entry.id ?? index)}
		<li class="card-grid__item">
			<button class="card-grid__button" type="button" onclick={() => onopen?.(index)}>
				{@render item(entry, index)}
			</button>
		</li>
	{/each}
</ul>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
		gap: var(--space-lg);
		list-style: none;
	}

	.card-grid__item {
		display: flex;
	}

	.card-grid__button {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		border-radius: var(--radius-lg);
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: transform var(--duration-base) var(--easing-standard);
	}

	.card-grid__button:hover {
		transform: translateY(-3px);
	}

	@media (prefers-reduced-motion: reduce) {
		.card-grid__button,
		.card-grid__button:hover {
			transition: none;
			transform: none;
		}
	}
</style>
