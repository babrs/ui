<script>
	import '$lib/css/index.css';
	import { base } from '$app/paths';
	import AppHeader from './__components/AppHeader/index.js';
	import AppFooter from './__components/AppFooter/index.js';

	let { children } = $props();
</script>

<svelte:head>
	<title>Babrs UI — компоненты и стили</title>
	<meta name="description" content="Babrs UI: атомарные компоненты Svelte 5, дизайн-токены и CSS для проектов экосистемы Babrs." />
	<link rel="icon" href="{base}/favicon.svg" type="image/svg+xml" />
</svelte:head>

<AppHeader
	brand="Babrs UI"
	tagline="компоненты и стили"
	homeHref="{base}/"
	navItems={[
		{ href: `${base}/#components`, label: 'Компоненты' },
		{ href: `${base}/#styles`, label: 'Стили' },
		{ href: 'https://github.com/Babrs/ui', label: 'GitHub' }
	]}
/>

<main>
	{@render children()}
</main>

<AppFooter
	title="Babrs UI"
	tagline="Библиотека для сайтов и игр экосистемы Babrs"
	links={[
		{ href: 'https://github.com/Babrs/ui', label: 'Исходный код', external: true },
		{ href: 'https://babrs.github.io/games/', label: 'Игры Babrs' }
	]}
	note="Svelte 5, чистый JavaScript, нативный CSS"
/>
