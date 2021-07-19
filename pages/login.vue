<template>
  <main>
    <h1>Авторизация</h1>
    <div class="form">
      <div v-for="element in form" :key="element.name" class="form-element">
        <label :for="element.name">{{ element.label }}</label>
        <input type="text" v-model="loginData[element.name]" :id="element.name" />
      </div>

      <button @click="login">Войти</button>

      <p v-if="loginError">{{ loginError }}</p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loginData: {},
      loginError: "",
      form: [
        { name: "user", label: "Пользатель" },
        { name: "password", label: "Пароль" },
      ],
    };
  },
  methods: {
    async login() {
      try {
        // Отправляем данные формы на проверку.
        await this.$axios.post("/api/auth/login", this.loginData);

        // При успешной проверке записываем в стор isAuth = true.
        await this.$store.dispatch("checkAuth");

        // Редирект на главную страницу.
        this.$router.push("/");
      } catch (err) {
        // В случае ошибки выводим текст под формой.
        this.loginError = err.response.data.message;
      }
    },
  },
};
</script>
