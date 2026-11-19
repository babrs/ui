<script>
	/**
	 * @typedef {Object} Props
	 * @property {number} value - Текущее значение (двусторонняя связь)
	 * @property {number} [min] - Минимальное значение
	 * @property {number} [max] - Максимальное значение
	 * @property {number} [step] - Шаг изменения
	 * @property {string} label - Название счётчика для вспомогательных технологий
	 * @property {(value: number) => void} [onchange] - Вызывается после изменения
	 */

	/** @type {Props} */
	let { value = $bindable(1), min = 1, max = 20, step = 1, label, onchange } = $props();

	/** @param {number} direction */
	function change(direction) {
		const next = Math.min(max, Math.max(min, value + direction * step));
		if (next === value) return;
		value = next;
		onchange?.(next);
	}
</script>

<div class="stepper" role="group" aria-label={label}>
	<button class="stepper__button" type="button" aria-label="Уменьшить" disabled={value <= min} onclick={() => change(-1)}>−</button>
	<output class="stepper__value" aria-live="polite">{value}</output>
	<button class="stepper__button" type="button" aria-label="Увеличить" disabled={value >= max} onclick={() => change(1)}>+</button>
</div>

<style>
	.stepper {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.stepper__button {
		display: grid;
		width: 44px;
		height: 44px;
		place-items: center;
		border: 0;
		border-radius: var(--radius-md);
		background: var(--color-bg-alt);
		color: var(--color-text);
		font-size: 1.375rem;
		font-weight: var(--font-weight-bold);
		line-height: 1;
		cursor: pointer;
	}

	.stepper__button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.stepper__value {
		min-width: 3ch;
		text-align: center;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		font-variant-numeric: tabular-nums;
	}
</style>
