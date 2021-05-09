"use strict";

module.exports = async function (fastify, opts) {
  // Маршрут для авторизации пользователя. У нас единственный пользователь, данные которого хранятся в файле .env.
  fastify.post("/login", async (request, reply) => {
    if (request.body.user !== process.env.USER || request.body.password !== process.env.PASSWORD) {
      // Если данные пользователя не совпадают, то возвращаем 403 ответ сервера.
      return reply.code(403).send({ message: "Неправильные логин или пароль" });
    }
    // При успешной авторизации создаётся сессия с параметром isAuth.
    request.session.isAuth = true;
    reply.code(200).send({ message: "Добро пожаловать" });
  });

  // Проверка авторизации при первоначальной загрузке или жёсткой перезагрузке страницы (F5).
  fastify.get("/check", async function (request, reply) {
    reply.code(200).send(request.session.isAuth);
  });

  // Уничтожение сессии при логауте.
  fastify.delete("/logout", (request, reply) => {
    request.destroySession((err) => {
      if (err) {
        reply.code(200).send({ message: "Сессии не существует" });
      } else {
        reply.code(200).clearCookie("sessionId").send();
      }
    });
  });
};
