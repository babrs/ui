<script>
	import Modal from '../Modal/index.js';
	import Button from '../Button/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {boolean} open - Показывать окно
	 * @property {string} message - Текст вопроса или уведомления
	 * @property {string} [title] - Подпись окна для вспомогательных технологий
	 * @property {string} [confirmText] - Текст кнопки подтверждения
	 * @property {string} [cancelText] - Текст кнопки отмены
	 * @property {boolean} [danger] - Подтверждение необратимого действия
	 * @property {boolean} [alertOnly] - Показать только кнопку подтверждения
	 * @property {string | null} [checkboxLabel] - Подпись флажка; без подписи флажка нет
	 * @property {boolean} [checkboxDefault] - Исходное состояние флажка
	 * @property {(detail: { ok: boolean, checked: boolean }) => void} onresolve - Итог диалога
	 */

	/** @type {Props} */
	let {
		open,
		message,
		title,
		confirmText = 'ОК',
		cancelText = 'Отмена',
		danger = false,
		alertOnly = false,
		checkboxLabel = null,
		checkboxDefault = true,
		onresolve
	} = $props();

	let checked = $state(true);

	$effect(() => {
		if (open) checked = checkboxDefault;
	});
</script>

{#if open}
	<Modal label={title ?? message} onclose={() => onresolve({ ok: false, checked })}>
		<div class="confirm">
			<p class="confirm__message">{message}</p>
			{#if checkboxLabel}
				<label class="confirm__check">
					<input type="checkbox" bind:checked />
					<span>{checkboxLabel}</span>
				</label>
			{/if}
			<div class="confirm__actions">
				{#if !alertOnly}
					<Button variant="secondary" onclick={() => onresolve({ ok: false, checked })}>{cancelText}</Button>
				{/if}
				<Button variant={danger ? 'danger' : 'primary'} onclick={() => onresolve({ ok: true, checked })}>{confirmText}</Button>
			</div>
		</div>
	</Modal>
{/if}

<style>
	.confirm {
		display: grid;
		gap: var(--space-lg);
		padding: var(--space-xl) var(--space-lg) var(--space-lg);
		text-align: center;
	}

	.confirm__message {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-medium);
		line-height: 1.4;
		white-space: pre-wrap;
	}

	.confirm__check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		min-height: 44px;
		cursor: pointer;
	}

	.confirm__check input {
		width: 20px;
		height: 20px;
		accent-color: var(--color-primary);
	}

	.confirm__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-sm);
	}
</style>
