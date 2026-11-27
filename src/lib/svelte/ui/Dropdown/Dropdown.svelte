<script>
	import Icon from '../Icon/index.js';

	/**
	 * @typedef {Object} MenuItem
	 * @property {string} id - Идентификатор
	 * @property {string} [label] - Текст пункта
	 * @property {string} [icon] - Имя иконки
	 * @property {() => void} [onSelect] - Действие при выборе
	 * @property {boolean} [danger] - Опасное действие
	 * @property {boolean} [divider] - Разделитель вместо пункта
	 */

	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} trigger - Содержимое кнопки-триггера
	 * @property {Array<MenuItem>} [items] - Пункты меню
	 * @property {'start' | 'end'} [align] - Выравнивание меню по триггеру
	 * @property {string} [label] - Доступное имя меню
	 */

	/** @type {Props} */
	let { trigger, items = [], align = 'start', label = 'Меню' } = $props();

	const id = $props.id();

	/** @type {HTMLElement | undefined} */
	let triggerEl = $state();
	/** @type {HTMLElement | undefined} */
	let menuEl = $state();

	function position() {
		if (!triggerEl || !menuEl) return;

		const rect = triggerEl.getBoundingClientRect();
		const width = menuEl.offsetWidth || 200;
		const rawLeft = align === 'end' ? rect.right - width : rect.left;
		const left = Math.max(8, Math.min(rawLeft, window.innerWidth - width - 8));

		menuEl.style.top = `${rect.bottom + 8}px`;
		menuEl.style.left = `${left}px`;
	}

	/** @param {ToggleEvent} event */
	function handleToggle(event) {
		if (event.newState === 'open') position();
	}

	/** @param {MenuItem} entry */
	function select(entry) {
		entry.onSelect?.();
		menuEl?.hidePopover();
	}
</script>

<button
	bind:this={triggerEl}
	class="dropdown__trigger"
	type="button"
	popovertarget={id}
	aria-haspopup="menu"
	aria-label={label}
>
	{@render trigger()}
</button>

<div bind:this={menuEl} {id} popover="auto" class="dropdown__menu" role="menu" aria-label={label} ontoggle={handleToggle}>
	{#each items as entry (entry.id)}
		{#if entry.divider}
			<hr class="dropdown__divider" />
		{:else}
			<button
				type="button"
				role="menuitem"
				class="dropdown__item"
				class:dropdown__item_danger={entry.danger}
				onclick={() => select(entry)}
			>
				{#if entry.icon}<Icon name={entry.icon} size={18} />{/if}
				<span>{entry.label}</span>
			</button>
		{/if}
	{/each}
</div>

<style>
	.dropdown__trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-bg-alt);
		color: var(--color-text);
		font-family: inherit;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: border-color var(--duration-fast) var(--easing-standard);
	}

	.dropdown__trigger:hover {
		border-color: var(--color-primary);
	}

	.dropdown__menu {
		position: fixed;
		inset: auto;
		margin: 0;
		min-width: 200px;
		padding: 0.5rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		box-shadow: var(--shadow-pop);
		color: var(--color-text);
	}

	.dropdown__menu:not(:popover-open) {
		display: none;
	}

	.dropdown__item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.75rem 1rem;
		border: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: var(--font-size-base);
		text-align: left;
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--easing-standard),
			color var(--duration-fast) var(--easing-standard);
	}

	.dropdown__item:hover {
		background: var(--color-primary-soft);
		color: var(--color-primary);
	}

	.dropdown__item :global(svg) {
		color: var(--color-text-muted);
	}

	.dropdown__item:hover :global(svg) {
		color: var(--color-primary);
	}

	.dropdown__item_danger:hover {
		background: var(--color-danger-soft);
		color: var(--color-danger);
	}

	.dropdown__divider {
		height: 1px;
		margin: 0.5rem 0;
		border: none;
		background: var(--color-border);
	}
</style>
