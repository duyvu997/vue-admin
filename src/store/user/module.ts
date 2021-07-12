import { Commit } from 'vuex'
import {
  GET_USER_INFO,
  LOGIN,
  LOGOUT,
  RESET_ERROR,
  RESET_TOKEN,
  SET_AVATAR,
  SET_ERROR,
  SET_INTRODUCTION,
  SET_NAME,
  SET_ROLES,
  SET_TOKEN
} from './action.type'
import userApiClient from '@/api/users'
import { setToken, removeToken } from '@/utils/cookies'

interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[],
  error: any
}

const state: IUserState = {
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  error: ''
}
const getters = {
  token(state: IUserState) {
    return state.token
  },
  name(state: IUserState) {
    return state.name
  },
  avatar(state: IUserState) {
    return state.avatar
  },
  introduction(state: IUserState) {
    return state.introduction
  },
  roles(state: IUserState) {
    return state.roles
  }
}
const actions = {
  async [LOGIN](
    { commit }: { commit: Commit },
    userInfo: { username: string; password: string }
  ) {
    try {
      let { username, password } = userInfo
      username = username.trim()
      const { data } = await userApiClient.login({ username, password })
      setToken(data.jwtToken)
      commit(SET_TOKEN, data.jwtToken)
    } catch (error) {
      commit(SET_ERROR, error.response)
    }
  },

  async [GET_USER_INFO]({ commit }: { commit: Commit }) {
    if (state.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const roles = ['admin']
    const name = 'vnduy'
    const avatar =
      'https://i.picsum.photos/id/787/536/354.jpg?hmac=APK6IGer-u0j2OFGpYg7FUGww7EdD4p8KpcpnQFqh2k'
    const introduction = ''
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    commit(SET_ROLES, roles)
    commit(SET_NAME, name)
    commit(SET_AVATAR, avatar)
    commit(SET_INTRODUCTION, introduction)
  },

  [RESET_TOKEN]({ commit }: { commit: Commit }) {
    removeToken()
    commit(SET_TOKEN, '')
    commit(SET_ROLES, [])
  },

  async [LOGOUT]({ commit }: { commit: Commit }) {
    if (state.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    // await userApiClient.logout() wait when api logout implement
    removeToken()
    commit(SET_TOKEN, '')
    commit(SET_ROLES, [])
  }
}

const mutations = {
  [SET_TOKEN](state: IUserState, token: string) {
    state.token = token
  },

  [SET_NAME](state: IUserState, name: string) {
    state.name = name
  },

  [SET_AVATAR](state: IUserState, avatar: string) {
    state.avatar = avatar
  },

  [SET_INTRODUCTION](state: IUserState, introduction: string) {
    state.introduction = introduction
  },

  [SET_ROLES](state: IUserState, roles: string[]) {
    state.roles = roles
  },

  [RESET_ERROR](state: IUserState) {
    state.error = ''
  }
}

const UserModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default UserModule
