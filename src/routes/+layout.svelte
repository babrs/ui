<script>
	import '$lib/css/index.css';
	import { base } from '$app/paths';
	import { ToastStack } from '$lib/index.js';
	import AppHeader from './__components/AppHeader/index.js';
	import AppFooter from './__components/AppFooter/index.js';

	let { children } = $props();

	const navItems = [
		{ href: '#alerts', label: 'Алерты' },
		{ href: '#typography', label: 'Типографика' },
		{ href: '#buttons', label: 'Кнопки' },
		{ href: '#forms', label: 'Формы' },
		{ href: '#cards', label: 'Карточки' },
		{ href: '#interactive', label: 'Интерактив' }
	];
</script>

<svelte:head>
	<title>Babrs UI — киты интерфейса</title>
	<meta
		name="description"
		content="Babrs UI: библиотека атомарных Svelte 5 компонентов, дизайн-токенов и CSS для проектов Babrs."
	/>
	<link rel="icon" href="{base}/favicon.svg" type="image/svg+xml" />
</svelte:head>

<AppHeader brand="Babrs UI" tagline="единый кит организации" homeHref="{base}/" {navItems} />

<main>
	{@render children()}
</main>

<AppFooter
	title="Babrs UI"
	tagline="атомарные компоненты Svelte 5"
	links={[
		{ href: `${base}/`, label: 'Каталог' },
		{ href: 'https://github.com/Babrs/ui', label: 'GitHub' }
	]}
/>

<ToastStack />
