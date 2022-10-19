import { SET_AUTH, INC_ATTEMPTS } from "../mutations";
import router from "../../router";
import dummyUsers from "@/assets/dummy_auth";

const auth = {
  namespaced: true,

  state: () => ({
    authenticated: false,
    authAttempts: 0,
  }),

  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },

    authAttempts(state) {
      return state.authAttempts;
    },
  },

  mutations: {
    [SET_AUTH](state, value) {
      state.authenticated = value;
    },

    [INC_ATTEMPTS](state) {
      state.authAttempts++;
    },
  },

  actions: {
    // making this an action as it would be async in a real app
    // the mutation would be commited after the response from the server is received
    checkAuth({ commit }, { email, password }) {
      commit(INC_ATTEMPTS);
      dummyUsers.forEach((u) => {
        if (u.email === email && u.password === password) {
          commit(SET_AUTH, true);
          router.push({ path: "/index" });
        }
      });
    },
  },
};

export default auth;
