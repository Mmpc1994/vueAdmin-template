import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Commit } from 'vuex';

interface State {
  token: string;
  name: string;
  avatar: string;
  roles: string[]
}

interface UserInfo {
  username: string;
  password: string;
}

const state: State = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}


const user = {
  state,

  mutations: {
    SET_TOKEN: (state: State, token: string) => {
      state.token = token
    },
    SET_NAME: (state: State, name: string) => {
      state.name = name
    },
    SET_AVATAR: (state: State, avatar: string) => {
      state.avatar = avatar
    },
    SET_ROLES: (state: State, roles: string[]) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login(context: {commit: Commit, state: State}, userInfo: UserInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then((response: any) => {
          const data = response.data
          setToken(data.token)
          context.commit('SET_TOKEN', data.token)
          resolve()
        }).catch((error: Error) => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo(context: {commit: Commit, state: State}) {
      return new Promise((resolve, reject) => {
        getInfo(context.state.token).then((response: any) => {
          const data = response.data
          context.commit('SET_ROLES', data.roles)
          context.commit('SET_NAME', data.name)
          context.commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch((error: Error) => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut(context: {commit: Commit, state: State}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          context.commit('SET_TOKEN', '')
          context.commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch((error: Error) => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut(context: {commit: Commit, state: State}) {
      return new Promise(resolve => {
        context.commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
