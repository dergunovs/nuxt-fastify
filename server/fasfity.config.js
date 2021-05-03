"use strict";

// Подключаем модули для автоматической загрузки плагинов и маршрутов.
const AutoLoad = require("fastify-autoload");
const path = require("path");

// Подключаем Mongoose и делаем коннект к базе данных.
// Прописываем стандартные настройки Mongoose.
const mongoose = require("mongoose");
mongoose.Schema.Types.Boolean.convertToFalse.add("");
mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Автоматические подключение плагинов из папки plugins.
module.exports = async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // Автоматические подключение маршрутов из папки routes.
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
