/**
 * Хранилище тост-уведомлений.
 * Работает на рунах Svelte 5: `toast.items` реактивен в шаблонах.
 */

/** @typedef {'success' | 'error' | 'warning' | 'info'} ToastType */

/** @typedef {Object} ToastItem
 * @property {string} id
 * @property {ToastType} type
 * @property {string} [title]
 * @property {string} [message]
 * @property {number} duration
 */

let counter = 0;
/** @type {Map<string, ReturnType<typeof setTimeout>>} */
const timers = new Map();

class ToastStore {
	/** @type {ToastItem[]} */
	items = $state([]);

	/**
	 * Показать уведомление.
	 * @param {{ type?: ToastType, title?: string, message?: string, duration?: number }} options
	 * @returns {string} идентификатор уведомления
	 */
	show({ type = 'info', title, message, duration = 5000 }) {
		const id = `toast-${++counter}`;
		this.items = [...this.items, { id, type, title, message, duration }];

		if (typeof window !== 'undefined' && duration > 0) {
			timers.set(
				id,
				setTimeout(() => this.dismiss(id), duration)
			);
		}

		return id;
	}

	/**
	 * @param {string} id
	 */
	dismiss(id) {
		const timer = timers.get(id);
		if (timer) {
			clearTimeout(timer);
			timers.delete(id);
		}
		this.items = this.items.filter((item) => item.id !== id);
	}

	clear() {
		for (const timer of timers.values()) clearTimeout(timer);
		timers.clear();
		this.items = [];
	}

	/**
	 * @param {string} title
	 * @param {string} [message]
	 * @param {number} [duration]
	 */
	success(title, message, duration = 5000) {
		return this.show({ type: 'success', title, message, duration });
	}

	/**
	 * @param {string} title
	 * @param {string} [message]
	 * @param {number} [duration]
	 */
	error(title, message, duration = 6000) {
		return this.show({ type: 'error', title, message, duration });
	}

	/**
	 * @param {string} title
	 * @param {string} [message]
	 * @param {number} [duration]
	 */
	warning(title, message, duration = 5000) {
		return this.show({ type: 'warning', title, message, duration });
	}

	/**
	 * @param {string} title
	 * @param {string} [message]
	 * @param {number} [duration]
	 */
	info(title, message, duration = 5000) {
		return this.show({ type: 'info', title, message, duration });
	}
}

export const toast = new ToastStore();
