/**
 * Тема оформления: светлая, тёмная или системная.
 * Пишет атрибут data-theme на <html> и запоминает выбор в localStorage.
 */

/** @typedef {'light' | 'dark' | 'system'} ThemeMode */

const STORAGE_KEY = 'babrs-ui-theme';

class ThemeStore {
	/** @type {ThemeMode} */
	mode = $state('system');

	/** @type {'light' | 'dark'} */
	resolved = $state('light');

	initialized = $state(false);

	/** Восстанавливает тему из localStorage. Вызывать в onMount. */
	init() {
		if (typeof window === 'undefined' || this.initialized) return;
		this.initialized = true;

		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved === 'light' || saved === 'dark' || saved === 'system') this.mode = saved;

		this.apply();
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			if (this.mode === 'system') this.apply();
		});
	}

	/** @param {ThemeMode} mode */
	set(mode) {
		this.mode = mode;
		if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, mode);
		this.apply();
	}

	toggle() {
		this.set(this.resolved === 'dark' ? 'light' : 'dark');
	}

	apply() {
		if (typeof window === 'undefined') return;

		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const next = this.mode === 'system' ? (prefersDark ? 'dark' : 'light') : this.mode;

		this.resolved = next;
		document.documentElement.dataset.theme = next;
	}
}

export const theme = new ThemeStore();
