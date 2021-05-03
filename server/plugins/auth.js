"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  // Подключаем плагин для управления cookies.
  fastify.register(require("fastify-cookie"));

  // Подключаем плагин для управления сессиями.
  // Прописываем настройки сессий: имя cookie, secret слово для шифрования, защищённость cookie и срок её действия.
  fastify.register(require("fastify-session"), {
    cookieName: "sessionId",
    secret: process.env.SECRET,
    cookie: { secure: process.env.SECURE_COOKIE },
    maxAge: 3600 * 8,
  });

  // Декоратор для проверки авторизации в маршрутах.
  fastify.decorate("checkAuth", async function (request, reply) {
    if (request.session.isAuth !== true) {
      reply.send({ message: "Нужна авторизация" }).code(403);
    }
  });
});
