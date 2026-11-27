<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [src] - Адрес изображения
	 * @property {string} [alt] - Альтернативный текст
	 * @property {string} [name] - Имя: из него берутся инициалы для заглушки
	 * @property {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} [size] - Размер
	 * @property {'circle' | 'square'} [shape] - Форма
	 * @property {'online' | 'offline' | 'busy' | null} [status] - Индикатор статуса
	 */

	/** @type {Props} */
	let { src, alt, name = '', size = 'md', shape = 'circle', status = null } = $props();

	const initials = $derived(
		name
			.trim()
			.split(/\s+/)
			.slice(0, 2)
			.map((word) => word.charAt(0).toUpperCase())
			.join('')
	);

	let failed = $state(false);
	const showImage = $derived(Boolean(src) && !failed);
</script>

<span class="avatar avatar_{size}" class:avatar_square={shape === 'square'}>
	{#if showImage}
		<img {src} {alt} onerror={() => (failed = true)} />
	{:else}
		<span class="avatar__fallback" aria-hidden={alt ? undefined : 'true'} role={alt ? 'img' : undefined} aria-label={alt}>
			{initials || '·'}
		</span>
	{/if}
	{#if status}
		<span class="avatar__status avatar__status_{status}" aria-label={status}></span>
	{/if}
</span>

<style>
	.avatar {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		width: 40px;
		height: 40px;
		flex-shrink: 0;
	}

	.avatar img,
	.avatar__fallback {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatar__fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-weight: var(--font-weight-semibold);
		font-size: 0.8125rem;
		letter-spacing: 0.02em;
	}

	.avatar_xs {
		width: 24px;
		height: 24px;
	}

	.avatar_xs .avatar__fallback {
		font-size: 0.5625rem;
	}

	.avatar_sm {
		width: 32px;
		height: 32px;
	}

	.avatar_sm .avatar__fallback {
		font-size: 0.6875rem;
	}

	.avatar_md {
		width: 40px;
		height: 40px;
	}

	.avatar_lg {
		width: 56px;
		height: 56px;
	}

	.avatar_lg .avatar__fallback {
		font-size: 1rem;
	}

	.avatar_xl {
		width: 80px;
		height: 80px;
	}

	.avatar_xl .avatar__fallback {
		font-size: 1.375rem;
	}

	.avatar_2xl {
		width: 96px;
		height: 96px;
	}

	.avatar_2xl .avatar__fallback {
		font-size: 1.625rem;
	}

	.avatar_square img,
	.avatar_square .avatar__fallback {
		border-radius: var(--radius-md);
	}

	.avatar__status {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 25%;
		height: 25%;
		min-width: 10px;
		min-height: 10px;
		border-radius: 50%;
		border: 2px solid var(--color-bg);
		transform: translate(2px, 2px);
	}

	.avatar__status_online {
		background: var(--color-success);
	}

	.avatar__status_offline {
		background: var(--color-text-muted);
	}

	.avatar__status_busy {
		background: var(--color-danger);
	}
</style>
