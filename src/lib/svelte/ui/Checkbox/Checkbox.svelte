<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Подпись флажка
	 * @property {string} [id] - Идентификатор
	 * @property {boolean} [checked] - Состояние (двусторонняя связь)
	 * @property {boolean} [disabled] - Недоступен
	 * @property {string} [name] - Имя поля
	 * @property {string} [value] - Значение поля
	 * @property {import('svelte').Snippet} [children] - Разметка подписи вместо текста
	 */

	const uid = $props.id();

	/** @type {Props} */
	let { label, id = uid, checked = $bindable(false), disabled = false, name, value, children, ...rest } = $props();
</script>

<label class="check" class:check_inline_disabled={disabled} for={id}>
	<input {id} type="checkbox" {name} {value} {disabled} bind:checked {...rest} />
	{#if children}
		<span>{@render children()}</span>
	{:else if label}
		<span>{label}</span>
	{/if}
</label>
