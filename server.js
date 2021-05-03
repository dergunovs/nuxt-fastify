"use strict";

require("dotenv").config();

const Fastify = require("fastify");

// Управляем логами.
const app = Fastify({ logger: process.env.LOG });

// Подключаем настройки Fastify.
const appService = require("./server/fasfity.config.js");
app.register(appService);

// Запускаем Fastify.
app.listen(process.env.PORT, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
