export const state = () => ({
  // По-умолчанию пользователь не авторизован.
  isAuth: false,
});

export const actions = {
  // При первоначальной загрузке сайта или при полной перезагрузке страницы проверяем текущий статус авторизации.
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch("checkAuth");
  },

  // Сам коммит проверки. При логине и логауте через dispatch происходит обновление этого статуса.
  async checkAuth({ commit }) {
    const isAuth = await this.$axios.$get("/api/auth/check");
    commit("setAuth", isAuth);
  },
};

export const mutations = {
  // Установка статуса авторизации исходя из данных, которые возвращает бэкенд при коммите.
  setAuth(state, message) {
    state.isAuth = message;
  },
};
