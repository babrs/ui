<script>
	import Icon from '../Icon/index.js';
	import { theme } from '../../../js/theme/index.js';

	/**
	 * @typedef {Object} Props
	 * @property {string} [label] - Доступное имя переключателя
	 */

	/** @type {Props} */
	let { label = 'Переключить тему' } = $props();

	$effect(() => {
		theme.init();
	});
</script>

<button
	class="theme-toggle"
	type="button"
	role="switch"
	aria-checked={theme.resolved === 'dark'}
	aria-label={label}
	onclick={() => theme.toggle()}
>
	<span class="theme-toggle__knob">
		<span class="theme-toggle__icon theme-toggle__icon_sun"><Icon name="sun" size={12} /></span>
		<span class="theme-toggle__icon theme-toggle__icon_moon"><Icon name="moon" size={12} /></span>
	</span>
</button>

<style>
	.theme-toggle {
		position: relative;
		width: 52px;
		height: 28px;
		padding: 0;
		border: 2px solid var(--color-border);
		border-radius: 20px;
		background: var(--color-bg-alt);
		cursor: pointer;
		transition: border-color var(--duration-slow) var(--easing-standard);
	}

	.theme-toggle:hover {
		border-color: var(--color-primary);
	}

	.theme-toggle__knob {
		position: absolute;
		top: 2px;
		left: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--color-primary);
		color: var(--color-on-primary);
		transition: transform var(--duration-slow) var(--easing-standard);
	}

	:global([data-theme='dark']) .theme-toggle__knob {
		transform: translateX(24px);
	}

	.theme-toggle__icon {
		position: absolute;
		display: flex;
		transition: opacity var(--duration-base) var(--easing-standard);
	}

	.theme-toggle__icon_sun {
		opacity: 1;
	}

	.theme-toggle__icon_moon {
		opacity: 0;
	}

	:global([data-theme='dark']) .theme-toggle__icon_sun {
		opacity: 0;
	}

	:global([data-theme='dark']) .theme-toggle__icon_moon {
		opacity: 1;
	}
</style>
