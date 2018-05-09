import { Commit } from 'vuex';
const Cookies = require('js-cookie');

interface Sidebar {
  opened: boolean
}

interface State {
  sidebar: Sidebar,
  journalType: string
}

const sidebar: Sidebar = {
  opened: !+Cookies.get('sidebarStatus')
}

const state: State = {
  sidebar,
  journalType: '日报'
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
    },
    SET_JOURNAL_TYPE: (state: State, type: string)=> {
      state.journalType = type;
    }
  },
  actions: {
    ToggleSideBar: (context: {commit: Commit, state: State}) => {
      context.commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
