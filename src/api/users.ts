import request from '@/utils/request'

const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export default {
  login,
  logout,
  getUserInfo
}
