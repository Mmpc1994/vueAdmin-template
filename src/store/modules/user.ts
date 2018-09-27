import { Commit } from 'vuex';

interface State {
  userToken: string
}


const state: State = {
  userToken: '',
}


const user = {
  state,

  mutations: {
    SET_USER_TOKEN(state: State, token: string) {
      state.userToken = token;
      localStorage.setItem('USER_TOKEN', token);
    },
  },

  actions: {}
}

export default user
