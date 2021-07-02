import { Commit } from 'vuex'
import { GET_USER_INFO, LOGIN, SET_AVATAR, SET_ERROR, SET_INTRODUCTION, SET_NAME, SET_ROLES, SET_TOKEN } from './action.type'
import userApiClient from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'

interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

const state: IUserState = {
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: []
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
      commit(SET_TOKEN, data.data.jwtToken)
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
      'data:image/jpeg;base64,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'
    const introduction = ''
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    commit(SET_ROLES, roles)
    commit(SET_NAME, name)
    commit(SET_AVATAR, avatar)
    commit(SET_INTRODUCTION, introduction)
  }
}
const mutations = {
  SET_TOKEN(state: IUserState, token: string) {
    state.token = token
  },

  SET_NAME(state: IUserState, name: string) {
    state.name = name
  },

  SET_AVATAR(state: IUserState, avatar: string) {
    state.avatar = avatar
  },

  SET_INTRODUCTION(state: IUserState, introduction: string) {
    state.introduction = introduction
  },

  SET_ROLES(state: IUserState, roles: string[]) {
    state.roles = roles
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
