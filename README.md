# Babrs UI

Библиотека атомарных компонентов Svelte 5, дизайн-токенов и CSS для проектов экосистемы Babrs. Витрина публикуется на GitHub Pages: https://babrs.github.io/ui/

## Подключение

```sh
npm install github:Babrs/ui
```

```js
import { Button, Modal, GalleryModal } from 'babrs-ui';
import 'babrs-ui/styles';
```

Для сайтов без сборки подключите стили напрямую:

```html
<link rel="stylesheet" href="https://babrs.github.io/ui/styles/index.css" />
```

Плоские файлы для быстрого подключения: `styles/tokens.css`, `styles/reset.css`, `styles/global.css`.

## Структура

| Путь | Содержимое |
| :--- | :--- |
| `src/lib/svelte/ui/<Имя>/` | компонент, `index.js`, `<Имя>.schema.json` |
| `src/lib/svelte/attachments/<имя>/` | DOM-attachments: `pullDirection`, `stickyDock` |
| `src/lib/js/<имя>/` | чистые утилиты: `shuffle` |
| `src/lib/css/<категория>/<имя>/` | токены, тема, сброс, глобальные стили |
| `src/routes/` | витрина компонентов |

Правила структуры и схем: см. `.ai/architecture/06-atomic-standard.md` и `07-schema-specs.md`.

## Команды

```sh
npm install        # установка и сборка dist (prepare)
npm run dev        # витрина в режиме разработки
npm run build      # статическая витрина в build/
npm run package    # библиотека в dist/
```

## Публикация

Workflow `.github/workflows/gh-pages.yml` собирает витрину, копирует CSS в `styles/`, пушит результат в ветку `gh-pages` и отправляет `repository_dispatch` (`ui-updated`) в `Babrs/games`.
