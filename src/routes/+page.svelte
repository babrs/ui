<script>
	import { base } from '$app/paths';
	import {
		Accordion,
		Alert,
		Badge,
		Button,
		ButtonGroup,
		Card,
		Chat,
		ChatBubble,
		Checkbox,
		ConfirmModal,
		Dropdown,
		GalleryModal,
		Icon,
		Input,
		Modal,
		ProductCard,
		ProfileCard,
		Radio,
		Select,
		Stepper,
		Switch,
		Tabs,
		Textarea,
		Tooltip,
		toast
	} from '$lib/index.js';

	const trips = [
		{ id: 'maldives', eyebrow: 'Пляжный отдых', title: '7 дней на Мальдивах', description: 'Бунгало над водой, снорклинг и закаты', price: '₽ 118 000', oldPrice: '₽ 149 000', image: `${base}/demo/01.svg`, badge: 'Хит' },
		{ id: 'alps', eyebrow: 'Горный туризм', title: '5 дней в Альпах', description: 'Маршруты по хребтам с гидом', price: '₽ 82 000', image: `${base}/demo/02.svg` },
		{ id: 'japan', eyebrow: 'Экскурсионный тур', title: '10 дней по Японии', description: 'Токио, Киото, Осака весной', price: '₽ 196 000', image: `${base}/demo/03.svg` },
		{ id: 'safari', eyebrow: 'Сафари', title: '6 дней в Кении', description: 'Национальные парки и ночные выезды', price: '₽ 173 000', image: `${base}/demo/04.svg` }
	];

	const people = [
		{ id: 'anna', name: 'Анна Петрова', role: 'Путешественник', stats: [{ value: '127', label: 'поездок' }, { value: '48', label: 'стран' }] },
		{ id: 'mikhail', name: 'Михаил Козлов', role: 'Фотограф', stats: [{ value: '89', label: 'поездок' }, { value: '32', label: 'страны' }] },
		{ id: 'elena', name: 'Елена Смирнова', role: 'Блогер', stats: [{ value: '203', label: 'поездки' }, { value: '56', label: 'стран' }] }
	];

	const accordionItems = [
		{ id: 'ai', title: 'Как работает AI-планировщик?', body: 'Анализирует предпочтения, бюджет и время поездки, учитывает сезонность и отзывы.' },
		{ id: 'edit', title: 'Можно ли изменить маршрут?', body: 'Да: добавляйте и удаляйте места, меняйте порядок и время пребывания.' },
		{ id: 'pay', title: 'Какие способы оплаты принимаются?', body: 'Карты Visa, MasterCard, МИР, электронные кошельки и оплата через Apple Pay.' },
		{ id: 'app', title: 'Есть ли мобильное приложение?', body: 'Приложения доступны для iOS и Android.' }
	];

	const tabItems = [
		{ id: 'overview', label: 'Обзор' },
		{ id: 'route', label: 'Маршрут' },
		{ id: 'budget', label: 'Бюджет' },
		{ id: 'photos', label: 'Фото' }
	];

	const palette = [
		{ name: 'primary', token: '--color-primary' },
		{ name: 'primary-light', token: '--color-primary-light' },
		{ name: 'success', token: '--color-success' },
		{ name: 'warning', token: '--color-warning' },
		{ name: 'info', token: '--color-info' },
		{ name: 'danger', token: '--color-danger' },
		{ name: 'bg', token: '--color-bg' },
		{ name: 'bg-alt', token: '--color-bg-alt' },
		{ name: 'border', token: '--color-border' },
		{ name: 'text', token: '--color-text' }
	];

	let confirmOpen = $state(false);
	let formOpen = $state(false);
	let infoOpen = $state(false);
	let galleryOpen = $state(false);
	let galleryIndex = $state(0);

	let name = $state('');
	let email = $state('почта-без-собаки');
	let phone = $state('+7 914 000-00-00');
	let direction = $state('');
	let notes = $state('');
	let agreed = $state(true);
	let notifications = $state(true);
	let personType = $state('personal');
	let guests = $state(6);
	let activeTab = $state('overview');
	let openAccordion = $state('ai');

	const galleryItems = trips.map((trip) => ({ src: trip.image, alt: trip.title }));

	function showToast(type) {
		const copy = {
			success: ['Бронирование подтверждено', 'Письмо с деталями отправлено'],
			error: ['Не удалось сохранить', 'Проверьте соединение и повторите'],
			warning: ['Бюджет близок к лимиту', 'Осталось 8% от запланированного'],
			info: ['Маршрут оптимизирован', 'Найдено более удобное время выезда']
		};
		const [title, message] = copy[type];
		toast.show({ type, title, message });
	}
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
</svelte:head>

<section class="hero">
	<div class="container hero__inner">
		<span class="eyebrow">Babrs UI · версия 0.6</span>
		<h1 class="hero__title">Кит интерфейса, на котором говорят проекты Babrs</h1>
		<p class="lead hero__lead">
			Атомарные компоненты Svelte 5 на общей палитре: тёплый песочный фон, терракотовый акцент,
			DM Sans в тексте и Unbounded в заголовках.
		</p>
		<div class="hero__actions">
			<Button size="lg" href="#buttons">Смотреть компоненты</Button>
			<Button size="lg" variant="outline" href="#typography">Типографика</Button>
		</div>
	</div>
</section>

<div class="container">
	<!-- Алерты -->
	<section class="section" id="alerts" aria-labelledby="alerts-title">
		<h2 id="alerts-title">Алерты и уведомления</h2>
		<p class="section__lead">Четыре статуса, один ритм. Иконка, заголовок и текст собираются из пропсов.</p>

		<div class="stack">
			<Alert type="info" title="Информация" text="Ваш маршрут был автоматически оптимизирован для лучшего времени поездки." />
			<Alert type="success" title="Успешно" text="Бронирование подтверждено. Проверьте email для получения деталей." />
			<Alert type="warning" title="Внимание" text="До окончания бесплатного изменения брони осталось два дня." />
			<Alert type="error" title="Ошибка" text="Платёж не прошёл. Проверьте данные карты и попробуйте снова." />
		</div>

		<h3 class="demo-title">Тост-уведомления</h3>
		<div class="demo-row">
			<Button variant="success" size="sm" onclick={() => showToast('success')}>Тост успеха</Button>
			<Button variant="danger" size="sm" onclick={() => showToast('error')}>Тост ошибки</Button>
			<Button variant="outline" size="sm" onclick={() => showToast('warning')}>Тост предупреждения</Button>
			<Button variant="ghost" size="sm" onclick={() => showToast('info')}>Тост информации</Button>
		</div>
	</section>

	<hr class="divider" />

	<!-- Типографика -->
	<section class="section" id="typography" aria-labelledby="typography-title">
		<h2 id="typography-title">Типографика</h2>
		<p class="section__lead">
			Unbounded для заголовков и DM Sans для текста. Ссылки выделены акцентным цветом и подчёркиванием.
		</p>

		<div class="grid grid-2">
			<Card>
				<span class="demo-caption">Заголовки</span>
				<h1 class="demo-h1">Исследуй мир</h1>
				<h2 class="demo-h2">Умное планирование</h2>
				<h3>AI планировщик</h3>
				<h4>Тип путешествия</h4>
			</Card>

			<Card>
				<span class="demo-caption">Текст и ссылки</span>
				<p class="lead">
					Спланируйте <a href="#typography">идеальное путешествие</a> с AI-рекомендациями, адаптированными
					под ваши предпочтения.
				</p>
				<p>
					Открывайте <a href="#typography">удивительные места</a>, создавайте детальные маршруты и следите
					за бюджетом в одном месте.
				</p>
				<p class="muted">
					Присоединяйтесь к более чем <strong>50 000 путешественников</strong>, которые доверяют Babrs.
				</p>
			</Card>
		</div>

		<h3 class="demo-title">Палитра</h3>
		<div class="palette">
			{#each palette as swatch (swatch.token)}
				<div class="palette__item">
					<span class="palette__chip" style:background={`var(${swatch.token})`}></span>
					<span class="palette__name">{swatch.name}</span>
					<code>{swatch.token}</code>
				</div>
			{/each}
		</div>
	</section>

	<hr class="divider" />

	<!-- Кнопки -->
	<section class="section" id="buttons" aria-labelledby="buttons-title">
		<h2 id="buttons-title">Кнопки</h2>
		<p class="section__lead">Шесть вариантов, четыре размера, состояния загрузки и отключения, группы и модальные окна.</p>

		<h3 class="demo-title">Варианты</h3>
		<div class="demo-row">
			<Button>Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="success">Success</Button>
		</div>

		<h3 class="demo-title">Размеры</h3>
		<div class="demo-row demo-row_end">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
			<Button size="xl">Extra Large</Button>
		</div>

		<h3 class="demo-title">С иконками</h3>
		<div class="demo-row">
			<Button><Icon name="plus" size={18} />Создать</Button>
			<Button variant="outline"><Icon name="download" size={18} />Скачать</Button>
			<Button variant="ghost" iconOnly label="Удалить"><Icon name="trash" size={18} /></Button>
			<Button variant="outline" iconOnly label="Настроить"><Icon name="settings" size={18} /></Button>
		</div>

		<h3 class="demo-title">Состояния</h3>
		<div class="demo-row">
			<Button disabled>Отключена</Button>
			<Button loading>Загрузка</Button>
			<Button variant="outline" loading>Сохраняем</Button>
		</div>

		<h3 class="demo-title">Группы кнопок</h3>
		<ButtonGroup label="Период">
			<Button variant="outline" size="sm">День</Button>
			<Button variant="outline" size="sm">Неделя</Button>
			<Button variant="outline" size="sm">Месяц</Button>
		</ButtonGroup>

		<h3 class="demo-title">Модальные окна</h3>
		<div class="demo-row">
			<Button variant="danger" onclick={() => (confirmOpen = true)}>Подтверждение</Button>
			<Button onclick={() => (formOpen = true)}>Форма создания</Button>
			<Button variant="outline" onclick={() => (infoOpen = true)}>Информационное</Button>
		</div>
	</section>

	<hr class="divider" />

	<!-- Формы -->
	<section class="section" id="forms" aria-labelledby="forms-title">
		<h2 id="forms-title">Формы</h2>
		<p class="section__lead">Поля с подсказками и состояниями валидации, селекты, флажки, переключатели и радио.</p>

		<div class="grid grid-2">
			<div class="stack">
				<Input label="Обычное поле" placeholder="Название путешествия" bind:value={name} />
				<Input
					label="С ошибкой"
					error="Это поле обязательно для заполнения"
					bind:value={email}
				/>
				<Input label="Успешная валидация" success="Email подтверждён" bind:value={phone} disabled />
				<Select
					label="Тип путешествия"
					placeholder="Выберите тип"
					bind:value={direction}
					options={[
						{ value: 'beach', label: 'Пляжный отдых' },
						{ value: 'mountains', label: 'Горный туризм' },
						{ value: 'excursion', label: 'Экскурсии' }
					]}
				/>
				<Textarea label="Заметки" placeholder="Что важно учесть в поездке" bind:value={notes} />
			</div>

			<div class="stack">
				<Checkbox label="Получать уведомления" bind:checked={agreed} />
				<Checkbox label="Отключённый чекбокс" checked={false} disabled />
				<Switch label="Тёмная тема" bind:checked={notifications} />
				<Radio
					label="Тип путешествия"
					name="person"
					bind:value={personType}
					options={[
						{ value: 'personal', label: 'Один человек' },
						{ value: 'company', label: 'Компания' }
					]}
				/>
				<div class="stepper-demo">
					<span class="field__label">Гостей</span>
					<Stepper label="Количество гостей" bind:value={guests} min={2} max={12} />
				</div>
			</div>
		</div>
	</section>

	<hr class="divider" />

	<!-- Табы и аккордеон -->
	<section class="section" id="tabs" aria-labelledby="tabs-title">
		<h2 id="tabs-title">Табы и аккордеон</h2>
		<p class="section__lead">Табы переключаются клавишами и связаны с панелью через ARIA. Аккордеон собран на нативных details.</p>

		<Tabs items={tabItems} bind:active={activeTab}>
			{#snippet panel(id)}
				{#if id === 'overview'}
					Общая информация о поездке: ключевые детали и статистика.
				{:else if id === 'route'}
					Детальный маршрут с временем, местами и активностями.
				{:else if id === 'budget'}
					Расходы в реальном времени, лимиты и уведомления при приближении к порогу.
				{:else}
					Галерея фотографий: загружайте, организуйте и делитесь снимками.
				{/if}
			{/snippet}
		</Tabs>

		<h3 class="demo-title">Аккордеон</h3>
		<Accordion items={accordionItems} bind:open={openAccordion} />
	</section>

	<hr class="divider" />

	<!-- Карточки -->
	<section class="section" id="cards" aria-labelledby="cards-title">
		<h2 id="cards-title">Карточки</h2>
		<p class="section__lead">Карточки товаров и профилей держат общий радиус и границу.</p>

		<div class="grid grid-4">
			{#each trips as trip (trip.id)}
				<ProductCard
					image={trip.image}
					imageAlt={trip.title}
					eyebrow={trip.eyebrow}
					title={trip.title}
					description={trip.description}
					price={trip.price}
					oldPrice={trip.oldPrice}
					badge={trip.badge}
					href="#cards"
				/>
			{/each}
		</div>

		<h3 class="demo-title">Карточки профилей</h3>
		<div class="grid grid-3">
			{#each people as person (person.id)}
				<ProfileCard name={person.name} role={person.role} stats={person.stats}>
					{#snippet action()}
						<Button variant="outline" size="sm" block>Подписаться</Button>
					{/snippet}
				</ProfileCard>
			{/each}
		</div>

		<h3 class="demo-title">Галерея</h3>
		<p class="muted">Кликните на изображение — откроется лайтбокс на нативном <code>&lt;dialog&gt;</code>.</p>
		<div class="gallery">
			{#each trips as trip, index (trip.id)}
				<button class="gallery__item" type="button" onclick={() => { galleryIndex = index; galleryOpen = true; }}>
					<img src={trip.image} alt={trip.title} loading="lazy" />
				</button>
			{/each}
		</div>
	</section>

	<hr class="divider" />

	<!-- Интерактив -->
	<section class="section" id="interactive" aria-labelledby="interactive-title">
		<h2 id="interactive-title">Интерактив</h2>
		<p class="section__lead">Меню на нативном Popover API, подсказки и чат-ассистент.</p>

		<div class="demo-row">
			<Dropdown
				align="start"
				label="Действия"
				items={[
					{ id: 'create', label: 'Создать', icon: 'plus' },
					{ id: 'edit', label: 'Редактировать', icon: 'edit' },
					{ id: 'copy', label: 'Дублировать', icon: 'copy' },
					{ id: 'div', divider: true },
					{ id: 'delete', label: 'Удалить', icon: 'trash', danger: true }
				]}
			>
				{#snippet trigger()}
					Действия
					<Icon name="chevron-down" size={16} />
				{/snippet}
			</Dropdown>

			<Dropdown
				label="Сортировка"
				items={[
					{ id: 'date', label: 'По дате', icon: 'calendar' },
					{ id: 'name', label: 'По названию', icon: 'sort' },
					{ id: 'price', label: 'По цене', icon: 'wallet' },
					{ id: 'rate', label: 'По рейтингу', icon: 'star' }
				]}
			>
				{#snippet trigger()}
					Сортировка
					<Icon name="sort" size={16} />
				{/snippet}
			</Dropdown>

			<Tooltip text="Это всплывающая подсказка">
				<Button variant="ghost">С подсказкой</Button>
			</Tooltip>
		</div>

		<h3 class="demo-title">AI Чат-ассистент</h3>
		<Chat title="Babrs AI" status="Онлайн" height={300}>
			<ChatBubble author="ai">
				Привет! Я ассистент Babrs. Куда вы хотите отправиться?
			</ChatBubble>
			<ChatBubble author="user">Хочу посетить Байкал зимой. Сколько стоит?</ChatBubble>
			<ChatBubble author="ai">
				Зимний тур на Байкал — от 62 000 ₽ на человека. В стоимость входят проживание, трансфер и ледовые экскурсии.
			</ChatBubble>

			{#snippet footer()}
				<div class="chat-input">
					<Input placeholder="Напишите сообщение" aria-label="Сообщение" />
					<Button iconOnly label="Отправить"><Icon name="send" size={18} /></Button>
				</div>
			{/snippet}
		</Chat>
	</section>
</div>

<ConfirmModal
	bind:open={confirmOpen}
	title="Удалить маршрут?"
	message="Вы уверены, что хотите удалить этот маршрут? Это действие нельзя отменить."
	confirmText="Удалить"
	cancelText="Отмена"
	danger
	onresolve={(detail) => detail.ok && toast.success('Маршрут удалён', 'Действие можно отменить 30 дней')}
/>

<Modal bind:open={formOpen} title="Новое путешествие" description="Заполните основные параметры поездки." size="lg">
	<div class="modal-form">
		<Input label="Название" placeholder="Например, Байкал в феврале" />
		<Input label="Направление" placeholder="Иркутск → Ольхон" />
		<Select
			label="Тип путешествия"
			placeholder="Выберите тип"
			options={[
				{ value: 'beach', label: 'Пляжный отдых' },
				{ value: 'mountains', label: 'Горный туризм' },
				{ value: 'excursion', label: 'Экскурсионный тур' },
				{ value: 'safari', label: 'Сафари' }
			]}
		/>
		<Textarea label="Заметки" rows={3} placeholder="Пожелания и ограничения" />
	</div>

	{#snippet footer()}
		<Button variant="ghost" onclick={() => (formOpen = false)}>Отмена</Button>
		<Button onclick={() => { formOpen = false; toast.success('Путешествие создано', 'Черновик сохранён'); }}>Создать</Button>
	{/snippet}
</Modal>

<Modal bind:open={infoOpen} title="О Babrs UI" size="sm">
	<p>
		Единый кит интерфейса организации: токены, типографика и компоненты, из которых собираются
		сайты и игры.
	</p>
	<p class="muted">Версия 0.6.0 · Svelte 5 · открытый код</p>

	{#snippet footer()}
		<Button variant="ghost" onclick={() => (infoOpen = false)}>Закрыть</Button>
	{/snippet}
</Modal>

{#if galleryOpen}
	<GalleryModal bind:index={galleryIndex} items={galleryItems} onclose={() => (galleryOpen = false)} />
{/if}

<style>
	.hero {
		padding-block: clamp(3rem, 8vw, 6rem);
		border-bottom: 1px solid var(--color-border);
		background:
			radial-gradient(circle at 15% 0%, var(--color-primary-glow), transparent 55%),
			var(--color-bg);
	}

	.hero__inner {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		max-width: 820px;
	}

	.hero__title {
		max-width: 18ch;
		margin: 0;
	}

	.hero__lead {
		max-width: 60ch;
		margin: 0;
	}

	.hero__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
		margin-top: var(--space-sm);
	}

	.section__lead {
		margin-bottom: var(--space-lg);
	}

	.demo-title {
		margin: var(--space-xl) 0 var(--space-md);
		font-size: var(--font-size-h5);
	}

	.demo-caption {
		display: block;
		margin-bottom: var(--space-md);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-caps);
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.demo-h1 {
		font-size: var(--font-size-h1);
		margin-bottom: 0.35em;
	}

	.demo-h2 {
		font-size: var(--font-size-h2);
		margin-bottom: 0.35em;
	}

	.demo-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-md);
	}

	.demo-row_end {
		align-items: flex-end;
	}

	.palette {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: var(--space-md);
	}

	.palette__item {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.palette__chip {
		height: 56px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.palette__name {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}

	.palette__item code {
		font-size: var(--font-size-2xs);
		color: var(--color-text-muted);
		background: transparent;
		padding: 0;
	}

	.stepper-demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: var(--space-sm);
		margin-top: var(--space-md);
	}

	.gallery__item {
		padding: 0;
		border: none;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: none;
		cursor: pointer;
		aspect-ratio: 1;
	}

	.gallery__item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-slow) var(--easing-standard);
	}

	.gallery__item:hover img {
		transform: scale(1.05);
	}

	.chat-input {
		display: flex;
		align-items: flex-end;
		gap: 0.75rem;
	}

	.chat-input :global(.field) {
		flex: 1;
	}

	.modal-form {
		display: grid;
		gap: var(--space-md);
	}
</style>
