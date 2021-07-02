// import {
//   VuexModule,
//   Module,
//   Action,
//   Mutation,
//   getModule
// } from 'vuex-module-decorators'
// import  from '@/api/users'
// import { getToken, setToken, removeToken } from '@/utils/cookies'
// import store from '@/store'

// export interface IUserState {
//   token: string
//   name: string
//   avatar: string
//   introduction: string
//   roles: string[]
// }

// @Module({ dynamic: true, store, name: 'user' })
// class User extends VuexModule implements IUserState {
//   public token = getToken() || ''
//   public name = ''
//   public avatar = ''
//   public introduction = ''
//   public roles: string[] = []

//   @Mutation
//   private SET_TOKEN(token: string) {
//     this.token = token
//   }

//   @Mutation
//   private SET_NAME(name: string) {
//     this.name = name
//   }

//   @Mutation
//   private SET_AVATAR(avatar: string) {
//     this.avatar = avatar
//   }

//   @Mutation
//   private SET_INTRODUCTION(introduction: string) {
//     this.introduction = introduction
//   }

//   @Mutation
//   private SET_ROLES(roles: string[]) {
//     this.roles = roles
//   }

//   @Action
//   public async Login(userInfo: { username: string; password: string }) {
//     let { username, password } = userInfo
//     username = username.trim()
//     const { data } = await login({ username, password })
//     setToken(data.jwtToken)
//     this.SET_TOKEN(data.jwtToken)
//   }

//   @Action
//   public ResetToken() {
//     removeToken()
//     this.SET_TOKEN('')
//     this.SET_ROLES([])
//   }

//   @Action
//   public async GetUserInfo() {
//     if (this.token === '') {
//       throw Error('GetUserInfo: token is undefined!')
//     }
//     const roles = ['admin']
//     const name = 'vnduy'
//     const avatar = 'https://ds055uzetaobb.cloudfront.net/brioche/chapter/science_essentials-GkPf0c.png?width=254'
//     const introduction = ''
//     if (!roles || roles.length <= 0) {
//       throw Error('GetUserInfo: roles must be a non-null array!')
//     }
//     this.SET_ROLES(roles)
//     this.SET_NAME(name)
//     this.SET_AVATAR(avatar)
//     this.SET_INTRODUCTION(introduction)
//   }

//   @Action
//   public async LogOut() {
//     if (this.token === '') {
//       throw Error('LogOut: token is undefined!')
//     }
//     await logout()
//     removeToken()
//     this.SET_TOKEN('')
//     this.SET_ROLES([])
//   }
// }

// export const UserModule = getModule(User)
