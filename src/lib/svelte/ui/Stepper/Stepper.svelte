<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {number} [value] - Текущее значение (двусторонняя связь)
	 * @property {number} [min] - Минимальное значение
	 * @property {number} [max] - Максимальное значение
	 * @property {number} [step] - Шаг изменения
	 * @property {number | string} [width] - Ширина контролла: число (px) или любое CSS-значение
	 * @property {string} [label] - Название счётчика для вспомогательных технологий
	 * @property {(value: number) => void} [onchange] - Вызывается после изменения
	 */

	/** @type {Props} */
	let {
		value = $bindable(1),
		min = 1,
		max = 20,
		step = 1,
		width = '10rem',
		label,
		onchange
	} = $props();

	/** Черновик ручного ввода: живёт, пока поле в фокусе. */
	let draft = $state('');
	let editing = $state(false);

	const shown = $derived(editing ? draft : String(value));

	const style = $derived(
		`--stepper-width: ${typeof width === 'number' ? `${width}px` : width}`
	);

	/**
	 * Приводит ввод к числу внутри границ.
	 * @param {string} raw
	 */
	function normalize(raw) {
		const parsed = Number.parseFloat(raw.replace(',', '.').replace(/[^\d.-]/g, ''));
		if (!Number.isFinite(parsed)) return value;
		const clamped = Math.min(max, Math.max(min, Math.round(parsed)));
		return clamped;
	}

	/** @param {number} next */
	function commit(next) {
		if (next === value) return;
		value = next;
		onchange?.(next);
	}

	/** @param {string} raw */
	function commitDraft(raw) {
		const next = normalize(raw);
		draft = String(next);
		editing = false;
		commit(next);
	}

	function startEditing() {
		editing = true;
		draft = String(value);
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			commitDraft(draft);
			/** @type {HTMLInputElement} */ (event.currentTarget).blur();
			return;
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			draft = String(value);
			editing = false;
			/** @type {HTMLInputElement} */ (event.currentTarget).blur();
			return;
		}

		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();
			const delta = event.key === 'ArrowUp' ? step : -step;
			const next = Math.min(max, Math.max(min, value + delta));
			draft = String(next);
			commit(next);
		}
	}
</script>

<div class="stepper" role="group" aria-label={label} {style}>
	<button
		class="stepper__button"
		type="button"
		aria-label="Уменьшить"
		disabled={value <= min}
		onclick={() => commit(Math.max(min, value - step))}
	>
		<Icon name="minus" size={18} />
	</button>

	<input
		class="stepper__input"
		type="text"
		inputmode="numeric"
		autocomplete="off"
		role="spinbutton"
		aria-valuenow={value}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-label={label}
		value={shown}
		onfocus={startEditing}
		oninput={(event) => (draft = event.currentTarget.value)}
		onblur={() => commitDraft(draft)}
		onkeydown={handleKeydown}
	/>

	<button
		class="stepper__button"
		type="button"
		aria-label="Увеличить"
		disabled={value >= max}
		onclick={() => commit(Math.min(max, value + step))}
	>
		<Icon name="plus" size={18} />
	</button>
</div>

<style>
	.stepper {
		display: flex;
		align-items: stretch;
		width: var(--stepper-width, 10rem);
		max-width: 100%;
		height: 2.25rem;
		box-sizing: border-box;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-field);
		background: var(--color-surface);
		overflow: hidden;
		transition: border-color var(--duration-fast) var(--easing-standard);
	}

	.stepper:focus-within {
		border-color: var(--color-primary);
	}

	.stepper__button {
		display: flex;
		flex: 0 0 2.5rem;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--easing-standard),
			color var(--duration-fast) var(--easing-standard);
	}

	.stepper__button:hover:not(:disabled) {
		background: var(--color-primary-soft);
		color: var(--color-primary-strong);
	}

	.stepper__button:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.stepper__input {
		flex: 1 1 auto;
		width: 100%;
		min-width: 0;
		margin: 0;
		padding: 0 var(--space-xs);
		border: none;
		border-inline: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text);
		font-family: var(--font-display);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		text-align: center;
		-moz-appearance: textfield;
	}

	.stepper__input:focus {
		outline: none;
		background: var(--color-primary-soft);
	}

	.stepper__input::-webkit-outer-spin-button,
	.stepper__input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
