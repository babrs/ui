<script module>
	/**
	 * @typedef {Object} ConfirmOptions
	 * @property {string} message - Текст вопроса или уведомления
	 * @property {string} [title] - Заголовок окна
	 * @property {string} [confirmText] - Текст кнопки подтверждения
	 * @property {string} [cancelText] - Текст кнопки отмены
	 * @property {boolean} [danger] - Подтверждение необратимого действия
	 * @property {boolean} [alertOnly] - Показать только кнопку подтверждения
	 * @property {string | null} [checkboxLabel] - Подпись флажка; без подписи флажка нет
	 * @property {boolean} [checkboxDefault] - Исходное состояние флажка
	 */

	/**
	 * @typedef {{ ok: boolean, checked: boolean }} ConfirmResult
	 */

	/**
	 * Стор одного экземпляра ConfirmModal: открыто ли окно, опции и незавершённый промис.
	 */
	export function createConfirmStore() {
		let open = $state(false);
		/** @type {ConfirmOptions} */
		let options = $state({ message: '' });
		let checked = $state(false);

		/** @type {((result: ConfirmResult) => void) | null} */
		let resolver = null;

		/** Закрывает окно и отдаёт результат ожидающему вызову. @param {boolean} ok */
		function resolve(ok) {
			const done = resolver;
			resolver = null;
			open = false;
			done?.({ ok, checked });
		}

		/**
		 * Показывает окно и ждёт ответа пользователя.
		 * @param {ConfirmOptions} next
		 * @returns {Promise<ConfirmResult>}
		 */
		function ask(next) {
			resolve(false);
			options = next;
			checked = next.checkboxDefault ?? false;
			open = true;
			return new Promise((done) => {
				resolver = done;
			});
		}

		return {
			get open() {
				return open;
			},
			get options() {
				return options;
			},
			get checked() {
				return checked;
			},
			set checked(value) {
				checked = value;
			},
			ask,
			resolve
		};
	}

	/** Смонтированный экземпляр. В приложении ConfirmModal ставится один раз — в лейауте. */
	/** @type {ReturnType<typeof createConfirmStore> | null} */
	let active = null;

	/**
	 * Связывает стор с публичным API. Возвращает функцию отвязки.
	 * @param {ReturnType<typeof createConfirmStore>} store
	 */
	export function bindConfirmStore(store) {
		active = store;
		return () => {
			if (active === store) active = null;
		};
	}

	/**
	 * Публичный API: `const { ok } = await confirmDialog({ message: 'Удалить?', danger: true })`.
	 * @param {ConfirmOptions} options
	 * @returns {Promise<ConfirmResult>}
	 */
	export function confirmDialog(options) {
		return active ? active.ask(options) : Promise.resolve({ ok: false, checked: false });
	}
</script>

<script>
	import Modal from '../Modal/index.js';
	import Button from '../Button/index.js';
	import Checkbox from '../Checkbox/index.js';

	const store = createConfirmStore();

	$effect(() => bindConfirmStore(store));
</script>

<Modal
	open={store.open}
	size="sm"
	title={store.options.title}
	hideClose
	onclose={() => store.resolve(false)}
>
	<p class="confirm__message">{store.options.message}</p>

	{#if store.options.checkboxLabel}
		<div class="confirm__checkbox">
			<Checkbox bind:checked={store.checked} label={store.options.checkboxLabel} />
		</div>
	{/if}

	{#snippet footer()}
		{#if !store.options.alertOnly}
			<Button variant="ghost" onclick={() => store.resolve(false)}>{store.options.cancelText ?? 'Отмена'}</Button>
		{/if}
		<Button variant={store.options.danger ? 'danger' : 'primary'} onclick={() => store.resolve(true)}>
			{store.options.confirmText ?? 'ОК'}
		</Button>
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
