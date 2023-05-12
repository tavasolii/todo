export default {
  namespaced: true,
  state: {
    token: window.localStorage.token ? window.localStorage.token : 'sssssssssssss',
    user: window.localStorage.user ? JSON.parse(window.localStorage.user) : {},
    adminDevices: window.localStorage.adminDevices ? JSON.parse(window.localStorage.adminDevices) : [],
    permissions: window.localStorage.permissions ? JSON.stringify(window.localStorage.permissions) : [],
    notifications: {},
    showNotification: false,
  },
  mutations: {
    storeToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    storeUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    storeAdminDevices(state, adminDevices) {
      state.adminDevices = adminDevices
      localStorage.setItem('adminDevices', JSON.stringify(adminDevices))
    },

    storePermissions(state, permissions) {
      state.permissions = permissions
      localStorage.setItem('permissions', JSON.stringify(permissions))
    },

    logout(state) {
      state.token = ''
      state.user = {}
      state.permissions = []
      state.adminDevices = []
      localStorage.clear()
      window.location.href = '/login'
    },
    storeNotifications(state, notifications) {
      state.notifications = notifications
      state.showNotification = !!(notifications.auths > 0 || notifications.tickets > 0)
    },
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getPermissions(state) {
      return state.permissions
    },
    getUser(state) {
      return state.user
    },
    getNotifications(state) {
      return state.notifications
    },
    getAdminDevices(state) {
      return state.adminDevices
    },
  },
}
