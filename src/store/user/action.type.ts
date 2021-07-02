import { getNamespace } from '@/utils/store-helper'

export const USER_NAMESPACE = 'UserModule'
export const LOGIN = 'login'
export const SET_TOKEN = 'setToken'
export const RESET_TOKEN = 'resetToken'
export const SET_ROLES = 'setRoles'
export const SET_NAME = 'setName'
export const SET_AVATAR = 'setAvatar'
export const SET_INTRODUCTION = 'setIntroduction'
export const SET_ERROR = 'setError'
export const RESET_ERROR = 'resetError'
export const GET_USER_INFO = 'getUserInfo'

export const userAction = getNamespace(USER_NAMESPACE)
