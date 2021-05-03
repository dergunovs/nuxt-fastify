"use strict";

// Подключаем модель Page.
const Page = require("../../../model/page.js");

module.exports = async function (fastify, opts) {
  //Вывод всех динамических страниц сайта.
  fastify.get("/", async function (request, reply) {
    try {
      // Выбираем только нужны поля, чтобы в запросе не передавались лишние данные.
      const pages = await Page.find().select("h1 url -_id").sort("h1").lean();
      reply.code(200).send(pages);
    } catch (e) {
      // Если возникает проблема, то возвращаем ошибку сервера.
      reply.code(500).send(e);
    }
  });

  // Получаем контент конкретной страницы.
  fastify.get("/:url", async function (request, reply) {
    try {
      // Ищем страницу с запрашиваемым URL.
      const page = await Page.findOne({ url: request.params.url }).select("-_id").lean();
      if (page) {
        reply.code(200).send(page);
      } else {
        // Если страница с запрашиваемым URL не найдена, то возвращаем 404 код ответа сервера.
        reply.code(404).send();
      }
    } catch (e) {
      // Если возникает прочая проблема, то возвращаем ошибку сервера с 500 кодом.
      reply.code(500).send(e);
    }
  });

  // В нижних 3 маршрутах используется декоратор для проверки авторизации.
  // Нужно быть авторизированным, чтобы публиковать, изменять и удалять страницы.
  fastify.post("/", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Получаем данных из секции body в запросе. Создаём новую страницу на их основе.
      const page = new Page(request.body);
      await page.save();
      reply.code(200).send({ message: "Страница создана" });
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.patch("/:url", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Находим страницу с запрашиваемым URL и обновляем её данные.
      const page = await Page.findOneAndUpdate({ url: request.params.url }, request.body, {
        new: true,
      });
      reply.code(200).send(page);
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.delete("/:url", { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      // Находим страницу с запрашиваемым URL и удаляем её.
      await Page.findOneAndDelete({ url: request.params.url });
      reply.code(200).send({ message: "Страница удалена" });
    } catch (e) {
      reply.code(500).send(e);
    }
  });
};
