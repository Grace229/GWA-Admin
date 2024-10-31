import { Log, Web, Constants, Util } from '/src/util'
import store from '/src/store'
// import jwt from 'jsonwebtoken';

const state = {
  apiToken: null,
  refreshToken: null,
  userId: '',
  email: '',
  roles: [],
  fullName: '',
  entryUrl: '',
  loggedIn: false,
  phoneNumber: '',
  photo: '',
  isEmailVerified: false,
  deviceToken: null,
  State: '',
  address: '',
  googleId: '',
  secretToken: null,
  password: '',
  status: '',
  statusReason: '',
  isDeleted: false,
  isSuperAdmin: false,
  subscriptions: [],
  activityLogs: [],
}

const getters = {
  secretToken(state) {
    return state.secretToken
  },
  photo(state) {
    return state.photo
  },
  State(state) {
    return state.State
  },
  isEmailVerified(state) {
    return state.isPhoneNumberVerified
  },

  isSuperAdmin(state) {
    return state.isSuperAdmin
  },

  phoneNumber(state) {
    return state.phoneNumber
  },
  fullName(state) {
    return state.fullName
  },

  apiToken(state) {
    return state.apiToken
  },

  deviceToken(state) {
    return state.deviceToken
  },

  userId(state) {
    return state.userId
  },

  email(state) {
    return state.email
  },
  loggedIn(state) {
    return !!state.apiToken && state.loggedIn
  },

  roles(state) {
    return state.roles
  },

  address(state) {
    return state.address
  },

  entryUrl(state) {
    return state.entryUrl
  },

  googleId(state) {
    return state.googleId
  },
}

const mutations = {
  secretToken(state, secretToken) {
    state.secretToken = secretToken
  },
  photo(state, photo) {
    state.photo = photo
  },
  State(state, State) {
    state.State = State
  },
  isEmailVerified(state, isEmailVerified) {
    state.isEmailVerified = isEmailVerified
  },

  phoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber
  },

  fullName(state, fullName) {
    state.fullName = fullName
  },

  apiToken(state, token) {
    state.loggedIn = true
    state.apiToken = token
  },
  deviceToken(state, deviceToken) {
    state.deviceToken = deviceToken
  },

  userId(state, userId) {
    state.userId = userId
  },

  email(state, email) {
    state.email = email
  },

  roles(state, roles) {
    state.roles = roles
  },

  entryUrl(state, entryUrl) {
    state.entryUrl = entryUrl
  },
  isSuperAdmin(state, isSuperAdmin) {
    state.isSuperAdmin = isSuperAdmin
  },

  googleId(state, googleId) {
    state.googleId = googleId
  },
  
  address(state, address) {
    state.address = address
  },
  logout(state) {
    state.apiToken = null
    state.deviceToken = null
    state.loggedIn = false
    state.roles = []
    state.googleId = null
    state.secretToken = null
    state.userId = ''
    state.email = ''
    state.phoneCode = ''
    state.isSuperAdmin = false
    state.fullName = ''
    state.entryUrl = ''
    state.phoneNumber = ''
    state.photo = ''
    state.isEmailVerified = false
  },
}

const actions = {
  logout({ commit }) {
    commit('logout')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
