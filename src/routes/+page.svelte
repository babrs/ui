<script>
	import { base } from '$app/paths';
	import { Button, Badge, Card, CardGrid, ConfirmModal, GalleryModal, HeroBanner, Stepper, TabSwitcher } from '$lib/index.js';

	const samples = [
		{ id: 'buttons', title: 'Кнопки', text: 'Варианты primary, secondary, ghost и danger, размеры md и lg.' },
		{ id: 'cards', title: 'Карточки', text: 'Поверхность с границей и скруглением. Сетка открывает элемент в галерее.' },
		{ id: 'modals', title: 'Окна', text: 'Modal закрывается по Escape и по фону. GalleryModal листается стрелками и свайпом.' },
		{ id: 'forms', title: 'Счётчик', text: 'Stepper связан через bind:value и не выходит за min и max.' }
	];

	let openIndex = $state(null);
	let confirmOpen = $state(false);
	let count = $state(3);
	let resetCount = $state(0);
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
</svelte:head>

<HeroBanner title="Babrs UI" backgroundImage="">
	<p class="hero-lead">Атомарные компоненты Svelte 5, дизайн-токены и CSS. Каждый компонент лежит в своей папке с контрактом `.schema.json`.</p>
</HeroBanner>

<section class="section container" id="components" aria-labelledby="components-title">
	<h2 class="section__title" id="components-title">Компоненты</h2>
	<p class="section__lead">Кнопки, бейджи, карточки, галерея и окна. Всё, что нужно сайтам и играм Babrs.</p>

	<div class="demo-row">
		<Button>Основная</Button>
		<Button variant="secondary">Вторичная</Button>
		<Button variant="ghost">Прозрачная</Button>
		<Button variant="danger">Опасная</Button>
		<Button size="lg" href="{base}/#styles">Ссылка-кнопка</Button>
	</div>

	<div class="demo-row">
		<Badge>Нейтральный</Badge>
		<Badge tone="primary">Акцент</Badge>
		<Badge tone="success">Успех</Badge>
		<Badge tone="info">Инфо</Badge>
		<Badge tone="danger">Ошибка</Badge>
	</div>

	<CardGrid items={samples} label="Примеры компонентов" onopen={(index) => (openIndex = index)}>
		{#snippet item(entry)}
			<Card elevated>
				<div class="sample">
					<h3>{entry.title}</h3>
					<p>{entry.text}</p>
				</div>
			</Card>
		{/snippet}
	</CardGrid>

	<div class="demo-row">
		<Stepper bind:value={count} min={0} max={10} label="Счётчик игроков" />
		<Button variant="secondary" onclick={() => (confirmOpen = true)}>Сбросить счётчик</Button>
	</div>

	<TabSwitcher
		label="Разделы витрины"
		active="components"
		items={[
			{ id: 'components', href: `${base}/#components`, label: 'Компоненты' },
			{ id: 'styles', href: `${base}/#styles`, label: 'Стили' }
		]}
	/>
</section>

<section class="section container" id="styles" aria-labelledby="styles-title">
	<h2 class="section__title" id="styles-title">Токены</h2>
	<p class="section__lead">Цвета, отступы и радиусы читаются из CSS-переменных. Тёмная тема включается через `data-theme="dark"`.</p>

	<div class="swatches">
		<div class="swatch" style="background: var(--color-primary)"><span>primary</span></div>
		<div class="swatch" style="background: var(--color-accent)"><span>accent</span></div>
		<div class="swatch" style="background: var(--color-success)"><span>success</span></div>
		<div class="swatch" style="background: var(--color-info)"><span>info</span></div>
		<div class="swatch" style="background: var(--color-danger)"><span>danger</span></div>
		<div class="swatch" style="background: var(--color-bg-alt)"><span>bg-alt</span></div>
	</div>
</section>

{#if openIndex !== null}
	<GalleryModal items={samples} index={openIndex} labelledby="gallery-title" onchange={(next) => (openIndex = next)} onclose={() => (openIndex = null)}>
		{#snippet item(entry)}
			<div class="sample sample_large">
				<h2 id="gallery-title">{entry.title}</h2>
				<p>{entry.text}</p>
			</div>
		{/snippet}
	</GalleryModal>
{/if}

<ConfirmModal
	open={confirmOpen}
	message="Сбросить счётчик до нуля?"
	confirmText="Сбросить"
	cancelText="Отмена"
	danger
	onresolve={({ ok }) => {
		confirmOpen = false;
		if (ok) count = resetCount;
	}}
/>

<style>
	.hero-lead {
		max-width: 56ch;
		margin-inline: auto;
		font-size: var(--font-size-lg);
	}

	.section {
		display: grid;
		gap: var(--space-lg);
	}

	.demo-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-md);
	}

	.sample {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-lg);
	}

	.sample h3 {
		font-size: var(--font-size-lg);
	}

	.sample p {
		color: var(--color-text-muted);
	}

	.sample_large {
		padding: var(--space-xl) var(--space-lg) var(--space-lg);
	}

	.swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: var(--space-md);
	}

	.swatch {
		display: grid;
		min-height: 96px;
		align-items: end;
		padding: var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.swatch span {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
	}
</style>
