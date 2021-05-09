<template>
  <header>
    <div>Шаблон Nuxt-Fastify</div>
    <nav>
      <nuxt-link to="/">Главная</nuxt-link>
      <nuxt-link to="/page">Список страниц</nuxt-link>
      <nuxt-link to="/login" v-if="!isAuth">Войти</nuxt-link>
      <nuxt-link to="/page/create" v-if="isAuth">Создать страницу</nuxt-link>
      <button @click="logout" v-if="isAuth">Выйти</button>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    // Управляем показом некоторых пунктов меню исходя из состояния авторизации.
    isAuth() {
      return this.$store.state.isAuth;
    },
  },
  methods: {
    // Запускаем процесс логаута с обновлением значения в сторе и редиректом на главную страницу.
    async logout() {
      try {
        await this.$axios.delete("/api/auth/logout");
        await this.$store.dispatch("checkAuth");
        this.$router.push("/");
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
};
</script>
