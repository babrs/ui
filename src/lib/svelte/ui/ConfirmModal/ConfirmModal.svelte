<script>
	import Modal from '../Modal/index.js';
	import Button from '../Button/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {boolean} open - Показывать окно
	 * @property {string} message - Текст вопроса или уведомления
	 * @property {string} [confirmText] - Текст кнопки подтверждения
	 * @property {string} [cancelText] - Текст кнопки отмены
	 * @property {boolean} [danger] - Подтверждение необратимого действия
	 * @property {boolean} [alertOnly] - Показать только кнопку подтверждения
	 * @property {(detail: { ok: boolean }) => void} onresolve - Итог диалога
	 */

	/** @type {Props} */
	let { open, message, confirmText = 'ОК', cancelText = 'Отмена', danger = false, alertOnly = false, onresolve } = $props();
</script>

{#if open}
	<Modal label={message} onclose={() => onresolve({ ok: false })}>
		<div class="confirm">
			<p class="confirm__message">{message}</p>
			<div class="confirm__actions">
				{#if !alertOnly}
					<Button variant="secondary" onclick={() => onresolve({ ok: false })}>{cancelText}</Button>
				{/if}
				<Button variant={danger ? 'danger' : 'primary'} onclick={() => onresolve({ ok: true })}>{confirmText}</Button>
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

	.confirm__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-sm);
	}
</style>
