<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Подпись поля
	 * @property {string} [id] - Идентификатор поля
	 * @property {string} [value] - Значение (двусторонняя связь)
	 * @property {string} [type] - Тип поля
	 * @property {string} [name] - Имя поля в форме
	 * @property {string} [placeholder] - Плейсхолдер
	 * @property {string} [hint] - Подсказка под полем
	 * @property {string} [error] - Текст ошибки
	 * @property {string} [success] - Текст успешной валидации
	 * @property {boolean} [disabled] - Недоступно для ввода
	 * @property {boolean} [required] - Обязательное поле
	 * @property {string} [autocomplete] - Подсказка автозаполнения
	 * @property {(event: Event) => void} [oninput] - Обработчик ввода
	 */

	const uid = $props.id();

	/** @type {Props} */
	let {
		label,
		id = uid,
		value = $bindable(''),
		type = 'text',
		name,
		placeholder,
		hint,
		error,
		success,
		disabled = false,
		required = false,
		autocomplete,
		oninput,
		...rest
	} = $props();

	const describedBy = $derived(error ? `${id}-error` : hint ? `${id}-hint` : undefined);
</script>

<div class="field">
	{#if label}
		<label class="field__label" class:field__label_required={required} for={id}>{label}</label>
	{/if}

	<div class="field__control">
		<input
			{id}
			class="field__input"
			class:field__input_error={Boolean(error)}
			class:field__input_success={Boolean(success) && !error}
			{type}
			{name}
			{placeholder}
			{disabled}
			{required}
			{autocomplete}
			bind:value
			{oninput}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedBy}
			{...rest}
		/>
	</div>

	{#if error}
		<p class="field__error" id="{id}-error">
			<Icon name="alert" size={14} />
			{error}
		</p>
	{:else if success}
		<p class="field__success">
			<Icon name="check-circle" size={14} />
			{success}
		</p>
	{:else if hint}
		<p class="field__hint" id="{id}-hint">{hint}</p>
	{/if}
</div>
