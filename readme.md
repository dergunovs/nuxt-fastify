# Nuxt-Fastify

Базовый шаблон Nuxt проекта с Fastify в качестве backend.
Бонус: используется авторизация на сессиях и защита маршрутов с помощью декораторов Fastify.

## Используемые технологии

Nuxt.js, Fastify, Mongoose.js, MongoDB.

## Установка

Рекомендуемая среда разработки - VS Code + Prettier.

Предварительно установите Node.js (https://nodejs.org/en/) и MongoDB (https://www.mongodb.com/try/download/community).

Затем в консоли пропишите:

```sh
npm install
```

## Настройка глобальных переменных

В корневой папке проекта создайте файл ".env". В нём укажите:

- `BASE_URL`: домен вашего сайта
- `PORT: порт`, на котором будет работать приложение
- `DATABASE`: название базы MongoDB, с которой будет работать приложение
- `USER`: имя пользователя для авторизации
- `PASSWORD`: пароль для авторизации
- `SECRET`: секретное слово для генерации cookie в сессиях (от 32 символов)
- `SECURE_COOKIE`: включение безопасных cookie (требуется https протокол)
- `LOG`: включаем/отключаем вывод лога Fastify

Например, для разработки:

```ini
BASE_URL=http://localhost:3000
PORT=3000
DATABASE=test
USER=1
PASSWORD=2
SECRET=rehg08fdh08enyeyhneJG34534534hrt0tyh
SECURE_COOKIE=false
LOG=true
```

Для production:

```ini
BASE_URL=https://site.ru
PORT=3000
DATABASE=test
USER=username
PASSWORD=eherthb0uhg
SECRET=775hgun5gh54ghu5gu9her9hgerhr9h7r9h7
SECURE_COOKIE=true
LOG=true
```

### Запуск в режиме разработки

```sh
npm run dev
```

### Запуск в продакшене

```sh
npm run build
npm start
```
