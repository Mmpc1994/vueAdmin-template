

const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userToken: (state) => {
    let middle;
    if (state.user.userToken) {
      return state.user.userToken
    } else if (middle = localStorage.getItem('USER_TOKEN')) {
      return middle
    }
  },
}
export default getters
