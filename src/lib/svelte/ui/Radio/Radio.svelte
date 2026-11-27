<script>
	/**
	 * @typedef {Object} Option
	 * @property {string} value - Значение
	 * @property {string} label - Подпись
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Легенда группы
	 * @property {string} name - Имя группы
	 * @property {string} [value] - Выбранное значение (двусторонняя связь)
	 * @property {Array<Option>} [options] - Варианты
	 * @property {boolean} [horizontal] - Расположить в строку
	 * @property {boolean} [disabled] - Недоступна
	 */

	const uid = $props.id();

	/** @type {Props} */
	let { label, name = uid, value = $bindable(''), options = [], horizontal = false, disabled = false } = $props();
</script>

<fieldset class="radio-group" class:radio-group_horizontal={horizontal} {name}>
	{#if label}<legend class="radio-group__legend">{label}</legend>{/if}
	{#each options as option (option.value)}
		<label class="check">
			<input type="radio" {name} value={option.value} {disabled} bind:group={value} />
			<span>{option.label}</span>
		</label>
	{/each}
</fieldset>
