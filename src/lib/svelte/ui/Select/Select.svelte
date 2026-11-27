<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Option
	 * @property {string} value - Значение
	 * @property {string} label - Подпись
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Подпись поля
	 * @property {string} [id] - Идентификатор поля
	 * @property {string} [value] - Выбранное значение (двусторонняя связь)
	 * @property {Array<Option>} [options] - Варианты выбора
	 * @property {string} [placeholder] - Пункт-заглушка
	 * @property {string} [name] - Имя поля в форме
	 * @property {string} [hint] - Подсказка под полем
	 * @property {string} [error] - Текст ошибки
	 * @property {boolean} [disabled] - Недоступно для выбора
	 * @property {boolean} [required] - Обязательное поле
	 */

	const uid = $props.id();

	/** @type {Props} */
	let {
		label,
		id = uid,
		value = $bindable(''),
		options = [],
		placeholder,
		name,
		hint,
		error,
		disabled = false,
		required = false,
		...rest
	} = $props();
</script>

<div class="field">
	{#if label}
		<label class="field__label" class:field__label_required={required} for={id}>{label}</label>
	{/if}

	<div class="field__control">
		<select
			{id}
			class="field__select"
			class:field__select_error={Boolean(error)}
			{name}
			{disabled}
			{required}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
			{...rest}
		>
			{#if placeholder}
				<option value="" disabled>{placeholder}</option>
			{/if}
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<Icon class="field__select-icon" name="chevron-down" size={18} />
	</div>

	{#if error}
		<p class="field__error" id="{id}-error">{error}</p>
	{:else if hint}
		<p class="field__hint" id="{id}-hint">{hint}</p>
	{/if}
</div>
