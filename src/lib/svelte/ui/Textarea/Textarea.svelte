<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Подпись поля
	 * @property {string} [id] - Идентификатор поля
	 * @property {string} [value] - Значение (двусторонняя связь)
	 * @property {string} [name] - Имя поля в форме
	 * @property {string} [placeholder] - Плейсхолдер
	 * @property {number} [rows] - Число строк
	 * @property {string} [hint] - Подсказка под полем
	 * @property {string} [error] - Текст ошибки
	 * @property {boolean} [disabled] - Недоступно для ввода
	 * @property {boolean} [required] - Обязательное поле
	 * @property {number} [maxlength] - Ограничение длины
	 */

	const uid = $props.id();

	/** @type {Props} */
	let {
		label,
		id = uid,
		value = $bindable(''),
		name,
		placeholder,
		rows = 3,
		hint,
		error,
		disabled = false,
		required = false,
		maxlength,
		...rest
	} = $props();
</script>

<div class="field">
	{#if label}
		<label class="field__label" class:field__label_required={required} for={id}>{label}</label>
	{/if}

	<textarea
		{id}
		class="field__textarea"
		class:field__textarea_error={Boolean(error)}
		{name}
		{placeholder}
		{rows}
		{disabled}
		{required}
		{maxlength}
		bind:value
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
		{...rest}
	></textarea>

	{#if error}
		<p class="field__error" id="{id}-error">{error}</p>
	{:else if hint}
		<p class="field__hint" id="{id}-hint">{hint}</p>
	{/if}
</div>
