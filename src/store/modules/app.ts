import { Commit } from 'vuex';
const Cookies = require('js-cookie');

interface Sidebar {
  opened: boolean
}

interface State {
  sidebar: Sidebar
}

const sidebar: Sidebar = {
  opened: !+Cookies.get('sidebarStatus')
}

const state: State = {
  sidebar
}

const app = {
  state,
  mutations: {
    TOGGLE_SIDEBAR: (state: State) => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    ToggleSideBar: (context: {commit: Commit, state: State}) => {
      context.commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
