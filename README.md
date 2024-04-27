=== шаблон readme проекта ===

# Описание шаблона

Шаблон реализует подход feature-sliced. Более подробно про feature-sliced можно узнать из [документации](https://feature-sliced.design/)

Шаблон включает в себя следующие библиотеки

- date - библиотека для работы с датами
- logger - логирование в консоль
- request - http-клиент на основе axios
- store - библиотека облегчающая взаимодействие с redux
- store-error - redux-библиотека для работы с ошибками
- store-filter - redux-библиотека для работы с фильтрами
- store-loader - redux-библиотека для лоадеров
- store-router - redux-библиотека для роутинга
- strings - библиотека для работы со строками
- trouble - библиотека для обработки исключений
- use-it - библиотека хуков

## Работа с лоадерами

```javascript
// config.ts
/**
 * Конфигурация модели
 */
export const config = {
  modelName: 'user',
  loaders: {
    loadUser: 'load-user',
  },
} as const;

// sagas.ts
import { SagaIterator } from 'redux-saga';
import { all, call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { composeSaga } from '@shared/lib/store';
import { loader } from '@shared/lib/store-loader';

import { config } from '../config';

/**
 * Загрузка информации о пользователе
 *
 * @returns {void}
 */
function* loadUserSaga(): SagaIterator {
  const {
    data: user,
  }: SagaReturnType<typeof userApi.getApiV1User> = yield call([
    userApi,
    userApi.getApiV1User,
  ]);

  yield put(actions.setUser(user));
}

/**
 * Вотчер
 * @returns {void}
 */
function* watcher(): SagaIterator {
  yield all([
    takeEvery(
      actions.loadUser,
      composeSaga(loadUserSaga, [loader(config.loaders.loadUser)]),
    ),
  ]);
}
```

## Обработка исключений

Добавляем обработку исключений. В примере ниже исключение будет обработано глобальным обработчиком

```javascript
import { errorHandler } from '@shared/lib/store-error';
...
...
/**
 * Вотчер
 * @returns {void}
 */
function* watcher(): SagaIterator {
  yield all([
    takeEvery(
      actions.loadUser,
      composeSaga(loadUserSaga, [errorHandler(), loader(config.loaders.loadUser)]),
    ),
  ]);
}
```

Следующий пример показывает, как можно обработать исключения FailedStatusError и FailedRoleError на текущем слое приложения, а все остальные исключения вышлежащим слоем или глобальным обработчиком:

```javascript
import { createTrouble } from '@shared/lib/trouble';
import { errorHandler } from '@shared/lib/store-error';
import { createTrouble } from '@shared/lib/trouble';

class FailedStatusError extends Error {
  constructor() {
    super();
    this.name = 'FailedStatusError';
    this.message = 'FailedStatusError';

    Object.setPrototypeOf(this, FailedStatusError.prototype);
  }
}

class FailedRoleError extends Error {
  constructor() {
    super();
    this.name = 'FailedRoleError';
    this.message = 'FailedRoleError';

    Object.setPrototypeOf(this, FailedRoleError.prototype);
  }
}

const moduleTouble = createTrouble().on(
  (error: Error) => error instanceof FailedStatusError ,
  function* saga(error: FailedStatusError) {
    console.log(error);
    // выполнить любой код
    yield put(...)
  }
).on(
  (error: Error) => error instanceof FailedRoleError,
  function* saga(error: FailedRoleError) {
    // выполнить любой код
    yield put(...)
  }
);

/**
 * Загрузка информации о пользователе
 *
 * @returns {void}
 */
function* loadUserSaga(): SagaIterator {
  const {
    data: user,
  }: SagaReturnType<typeof userApi.getApiV1User> = yield call([
    userApi,
    userApi.getApiV1User,
  ]);

  if (user.status === 'Failed') {
    throw new FailedStatusError();
  }

  if (user.role !== 'Admin') {
    throw new FailedRoleError();
  }

  yield put(actions.setUser(user));
}

/**
 * Вотчер
 * @returns {void}
 */
function* watcher(): SagaIterator {
  yield all([
    takeEvery(
      actions.loadUser,
      composeSaga(loadUserSaga, [
        errorHandler(moduleTouble),
        loader(config.loaders.loadUser),
      ]),
    ),
  ]);
}
```

## Композиция саг

Комозиция саг позволяет вынести часто используемые инфраструктурные паттерны за пределы саги. И сосредоточится на реализации бизнес функциональности внутри саги.

Например:

- мы не хотим каждый раз писать внутри саги запуск и остановку лоадера
- мы не хотим писать try...catch и запускать обработчик ошибок
- мы хотим обернуть нашу сагу в try...catch и сделать ее безопасной
- и т.д

Для этого можно воспользоваться функцией **composeSaga**. В шаблоне реализовоно несколько компазиторов для саг:

- **loader** - оборачивает сагу в **try...finally**, запускает и останавливает **loader**
- **errorHandler** - композитор для обработки исключений на любом уровне приложения
- **safe** - оборачивает сагу в **try...catch** и делает ее безопасной
- **passActionPayload** - преобразует первый параметр саги из простого аргумента в payload экшена

## Описание библиотеки trouble

Библиотека trouble поможет сформировать flow для обработки исключений.
Библиотека содержит следующие методы:

```javascript
export type Trouble = {
  /** Зарегистрировать действие, которое будет выполняться, если Matcher обнаружит ошибку */
  on: (matcher: TroubleMatcher, action: TroubleAction) => Trouble,

  /** Зарегистрировать действие, которое будет выполняться только в том случае, если никакое другое действие не выполнится */
  otherwise: (action: TroubleAction) => Trouble,

  /** Зарегистрировать действие, которое будет выполняться всегда и после всех остальных действий. Работает как finally. */
  always: (action: TroubleAction) => Trouble,

  /** Очистить все зарегистрированные действия */
  clear: () => Trouble,

  /** Получить разделенные по типам действия для ошибки Error */
  getSplittedActions(error: Error): TroubleSplittedActions,

  /** Получить все действия для ошибки Error */
  getActions(error: Error): TroubleAction[],
};
```

Так же есть возможность комбинировать обработку ошибок от нескольких экземпляров **Trouble**. Для этого можно воспользоваться функцией **combineTroubleActions**

## Библиотека хуков use-it

Библиотека содержит в себе часто используемые хуки

- useActions - Хук привязывает dispatch к экшенам
- useApi - Хук для использования методов апи в компонентах
- useApiLazy - Хук для использования методов апи в компонентах
- useCollapse - Хук для работы с компонентом Collapse
- useIsEllipsis - Хук проверяет блок на ellipsis
- useMounted - Хук для проверки монтирован компонент или нет
- useOverlay - Хук, предоставляющий методы для работы с L.LightBox.Overlay
- useSwitch - Хук для работы с переключателями
- useToggle - Хук для работы с булевыми значениями
- useUnmount - Хук размонтирования

# Проект

Репозиторий проекта: [GitLab](http://git.esphere.local/edo2/frontend)

- [Описание](#описание)
- [Технологии проекта](#технологии-проекта)
- [Кодстайл](#кодстайл)
- [Разработка](#разработка)
- [Структура проекта](#структура-проекта)
- [Версионирование](#версионирование)
- [Работа с гитом](#работа-с-гитом)
- [Контакты](#контакты)

### Описание

=== Описание проекта

### Технологии проекта

- [React](https://ru.reactjs.org/)
- [Redux](https://redux.js.org/)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- [Redux-saga](https://redux-saga.js.org/)
- [React-router-dom](https://reactrouter.com/web/guides/quick-start)
- [connected-react-router](https://github.com/supasate/connected-react-router/)
- [history](https://github.com/ReactTraining/history)
- [Ramda](https://ramdajs.com/)
- [Moment](https://momentjs.com/)
- [Jest](https://jestjs.io/)
- CSS ([styles-esphere](https://ui-dev.esphere.ru/#/uikit/guide/programmer))
- [Leda3.x](https://leda.esphere.ru/)

### Кодстайл

За основу взят [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-).

Дополнения и уточнения смотрите в [confluence](https://confluence.esphere.ru/pages/viewpage.action?pageId=103693109).

### Разработка

- [Запуск проекта](#Запуск-проекта)
- [Стенды](#Стенды)
- [NPM скрипты](#npm-скрипты)
- [Swagger](#swagger)

### Запуск проекта

```javascript
npm i
```

```javascript
npm start
```

```javascript
http://localhost:3000/#/
```

=== опишите здесь дальнейшие шаги для запуска проекта (копирование кук, и т.п.)

### Стенды

Проект доступен на стендах:

| Тип стенда              | Ссылка на стенд          |
| :---------------------- | ------------------------ |
| Стенд для разработчиков | https://dev.esphere.ru/  |
| Тестовый                | https://tst.esphere.ru/  |
| ИФТ                     | https://ift.esphere.ru/  |
| ПСИ                     | https://psi.esphere.ru/  |
| ПРОМ                    | https://prom.esphere.ru/ |

### NPM скрипты

| Скрипт        | Описание                                                                                            |
| :------------ | --------------------------------------------------------------------------------------------------- |
| npm run start | запуск проекта на http://localhost:3000/#/                                                          |
| npm run build | сборка проекта с настройками для прода, не будет выполнено, если не пройдёт проверка `npm run lint` |
| npm run lint  | проверка кода проекта на ошибки eslint                                                              |
| npm run test  | запуск тестов                                                                                       |

### Swagger

=== Здесь ссылка на swagger

### Структура проекта

```
.
├── src                                                 : source code
│   ├── shared                                            : ОБЩИЕ ИНФРАСТРУКТУРНЫЕ ЭЛЕМЕНТЫ ПРИЛОЖЕНИЯ
│   │   ├── api                                             : логика взаимодействия с API
│   │   ├── config                                          : конфигурации приложения и его окружения общие компоненты
│   │   ├── hooks                                           : общие хуки
│   │   ├── messages                                        : папка с ui-текстовками
│   │   ├── styles                                          : папка со стилями приложения
│   │   ├── lib                                             : общие библиотеки приложения
│   │   └── ui                                              : общие компоненты
│   ├── entities                                          : Бизнес-сущности
│   │   ├──                                                 :
│   │   ├──
│   │   └──
│   ├── features                                          : МОДУЛИ Проекта
│   │   ├── documents                                        :
│   │   ├──
│   │   └──
│   ├── widgets                                           : ВИДЖЕТЫ
│   │   └── main                                             :
│   ├── pages                                             : КОМПОНЕНТЫ СТРАНИЦ
│   │   ├── home                                             :
│   │   └── index.js                                         : экспорт страниц
│   ├── processes                                         : БИЗНЕС-ПРОЦЕССЫ ПРИЛОЖЕНИЯ
│   │   └── init                                            : инициализация приложения
│   ├── app                                               : СЛОЙ приложения
│   │   ├── store                                             : НАСТРОЙКИ REDUX
│   │   └── ui                                                :
│   └── index.jsx                                         : точка входа в приложение
├── webpack                                             : настройка webpack приложения
│   ├── app                                               : папка с настройками webpack для приложения
│   │   ├── develop.js                                      : файл с настройками webpack для dev-окружения
│   │   └── production.js                                   : файл с настройками webpack для production-окружения
│   ├── config                                            : папка с настройками webpack-приложения
│   │   ├── dev-server                                      : папка с настройками webpack-dev-server
│   │   │   ├── index.js                                    : общие настройки webpack-dev-server
│   │   │   └── proxy.js                                    : настройки proxy для webpack-dev-server
│   │   ├── index.js                                        : файл с методом получения общих настроек по ключу
│   │   ├── paths.js		                                    : файл с настройками путей webpack-приложения
│   │   └── settings.js                                     : файл с общими настройками приложения (title, названия приложения в шапке и пр.)
│   └── common.js                                         : общие настройки webpack
├── .editorconfig                                       : файл с настройками плагина EditorConfig
├── .eslintignore                                       : файл с настройками игнорирования файлов eslint
├── .eslintrc                                           : файл с настройками eslint
├── .gitattributes                                      : файл с настройками git
├── .gitignore                                          : файл с настройками игнорирования файлов git
├── .huskyrc                                            : файл с настройками husky
├── .lintstagedrc                                       : файл с настройками lint-staged
├── .prettierignore                                     : файл с настройками игнорирования файлов prettier
├── .prettierrc                                         : файл с настройками prettier
├── babel.config.js                                     : файл с настройками Babel
├── CHANGELOG.md                                        : файл с описанием изменений внесенных по спринтам
├── jest.config.js                                      : файл с настройками Jest
├── package.json                                        : файл с описанием зависимостей проекта и скриптами запуска
└── README.md                                           : файл с описанием проекта
```

### Версионирование

Версии проекта следуют за нумерацией спринтов и релизами.

Например: `0.1.2`.

0 - номер основной версии

1 - номер спринта

2 - номер патча

### Ведение Changelog'а

Для ведения журнала изменений используется утилита change-gen, в первую очередь необходимо настроить ее
под ваш проект. Более подробно можно узнать на странице в [confluence](https://confluence.esphere.ru/pages/viewpage.action?pageId=153275826)

### Работа с гитом

В проекте используется [Gitflow](https://confluence.esphere.ru/display/Frontend/Git+Flow)

Ветка для выкладки на тестовый стенд: `master`

Ветка для выкладки на предпромышленный стенд: `master`

Ветка для выкладки на промышленный стенд: `master`

### Названия веток

**Названия feature-веток** формируются из названия `feature/FEND-****`, где `****` id задачи в jira.

Например: `feature/FEND-500`

**Название bugfix-веток** Формируется из названия `bugfix/FEND-****`, где `****` id задачи в jira.

Например: `bugfix/FEND-501`

**Название chore-веток** Формируется из названия `chore/FEND-****`, где `****` id задачи в jira.

Например: `chore/FEND-502`

**Название docs-веток** Формируется из названия `docs/FEND-****`, где `****` id задачи в jira.

Например: `docs/FEND-503`

**Названия релизных веток** формируются из `release/{major}.{minor}.{patch}` которая готовится к релизу.

Например: `release/0.3.0` - релизная ветка третьего спринта.

### Формирование сообщений в коммитах

Сообщение в коммите начинается с кода задачи, например: `[FEND-500]: Добавлен модуль авторизации`.

### Нейминг для MR

#### **feature ветки**

- Добавляем новый функционал: `[FEND-505]: Добавлена возможность просмотра документов`
- Обновляем старый функционал: `[FEND-506]: Обновлена статусная модель документов`

#### **bugfix ветки**

- Исправляем баг: `[FEND-507]: Исправлена ошибка скрипта`

#### **chore ветки**

- Обновили пакет: `[FEND-508]: Обновлена библиотека "korus-ui"`
- Если нет задачи: `[NO-TASK]: Обновлена библиотека "korus-ui"`

#### **docs ветки**

- Обновлен changelog: `[FEND-509]: Обновлен changelog`

### Влитие MR'ов

При влитии своей ветки в `develop` необходимо сквошить коммиты

### Контакты

- Имя Фамилия (mail@esphere.ru)
