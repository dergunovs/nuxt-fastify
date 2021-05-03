"use strict";

const fp = require("fastify-plugin");

// Подключаем плагин для передачи всех маршрутов в функцию Nuxt.render
module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-nuxtjs")).after(() => {
    fastify.nuxt("*");
  });
});
