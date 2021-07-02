import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from '@/store/user/module'

Vue.use(Vuex)

interface RootState {}

const state: RootState = {}

export default new Vuex.Store({
  state,
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    UserModule
  }
})
