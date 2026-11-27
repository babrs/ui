<script>
	import Icon from '../Icon/index.js';

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

	/** @param {number} next */
	function set(next) {
		const clamped = Math.min(max, Math.max(min, next));
		if (clamped === value) return;
		value = clamped;
		onchange?.(clamped);
	}
</script>

<div class="stepper" role="group" aria-label={label}>
	<button
		class="stepper__button"
		type="button"
		aria-label="Уменьшить"
		disabled={value <= min}
		onclick={() => set(value - step)}
	>
		<Icon name="minus" size={18} />
	</button>

	<output class="stepper__value" aria-live="polite">{value}</output>

	<button
		class="stepper__button"
		type="button"
		aria-label="Увеличить"
		disabled={value >= max}
		onclick={() => set(value + step)}
	>
		<Icon name="plus" size={18} />
	</button>
</div>

<style>
	.stepper {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-xs);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-pill);
		background: var(--color-surface);
	}

	.stepper__button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: var(--color-bg-alt);
		color: var(--color-text);
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--easing-standard),
			color var(--duration-fast) var(--easing-standard);
	}

	.stepper__button:hover:not(:disabled) {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.stepper__button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.stepper__value {
		min-width: 2.5ch;
		font-family: var(--font-display);
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-semibold);
		text-align: center;
		color: var(--color-text);
	}
</style>
