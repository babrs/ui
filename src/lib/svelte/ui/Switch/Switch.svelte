<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Подпись переключателя
	 * @property {string} [id] - Идентификатор
	 * @property {boolean} [checked] - Состояние (двусторонняя связь)
	 * @property {boolean} [disabled] - Недоступен
	 * @property {string} [name] - Имя поля
	 * @property {string} [ariaLabel] - Доступное имя без видимой подписи
	 */

	const uid = $props.id();

	/** @type {Props} */
	let { label, id = uid, checked = $bindable(false), disabled = false, name, ariaLabel, ...rest } = $props();
</script>

<label class="switch" for={id}>
	<input
		{id}
		type="checkbox"
		role="switch"
		{name}
		{disabled}
		bind:checked
		aria-label={label ? undefined : ariaLabel}
		{...rest}
	/>
	<span class="switch__track" aria-hidden="true"></span>
	{#if label}<span>{label}</span>{/if}
</label>
