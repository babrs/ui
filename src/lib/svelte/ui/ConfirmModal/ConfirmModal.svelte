<script>
	import Modal from '../Modal/index.js';
	import Button from '../Button/index.js';
	import Checkbox from '../Checkbox/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {boolean} open - Показывать окно (двусторонняя связь)
	 * @property {string} message - Текст вопроса или уведомления
	 * @property {string} [title] - Заголовок окна
	 * @property {string} [confirmText] - Текст кнопки подтверждения
	 * @property {string} [cancelText] - Текст кнопки отмены
	 * @property {boolean} [danger] - Подтверждение необратимого действия
	 * @property {boolean} [alertOnly] - Показать только кнопку подтверждения
	 * @property {string | null} [checkboxLabel] - Подпись флажка; без подписи флажка нет
	 * @property {boolean} [checkboxDefault] - Исходное состояние флажка
	 * @property {(detail: { ok: boolean, checked: boolean }) => void} [onresolve] - Итог диалога
	 */

	/** @type {Props} */
	let {
		open = $bindable(false),
		message,
		title,
		confirmText = 'ОК',
		cancelText = 'Отмена',
		danger = false,
		alertOnly = false,
		checkboxLabel = null,
		checkboxDefault = false,
		onresolve
	} = $props();

	let checked = $state(checkboxDefault);

	/** @param {boolean} ok */
	function resolve(ok) {
		onresolve?.({ ok, checked });
		open = false;
	}
</script>

<Modal bind:open size="sm" {title} hideClose onclose={() => resolve(false)}>
	<p class="confirm__message">{message}</p>

	{#if checkboxLabel}
		<div class="confirm__checkbox">
			<Checkbox bind:checked label={checkboxLabel} />
		</div>
	{/if}

	{#snippet footer()}
		{#if !alertOnly}
			<Button variant="ghost" onclick={() => resolve(false)}>{cancelText}</Button>
		{/if}
		<Button variant={danger ? 'danger' : 'primary'} onclick={() => resolve(true)}>{confirmText}</Button>
	{/snippet}
</Modal>

<style>
	.confirm__message {
		margin: 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		color: var(--color-text-muted);
	}

	.confirm__checkbox {
		margin-top: var(--space-md);
	}
</style>
