<template>
  <main>
    <h1>Авторизация</h1>
    <div class="form">
      <div class="form-element">
        <label for="user">Пользатель</label>
        <input type="text" v-model="user" id="user" />
      </div>
      <div class="form-element">
        <label for="password">Пароль</label>
        <input type="password" v-model="password" id="password" />
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
      user: "",
      password: "",
      loginError: "",
    };
  },
  methods: {
    async login() {
      try {
        // Берём данные из полей формы.
        let formData = {
          user: this.user,
          password: this.password,
        };

        // Отправляем их на проверку.
        await this.$axios.post("/api/auth/login", formData);

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
