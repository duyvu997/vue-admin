import request from '@/utils/request'

export const createCourse = (data: any) =>
  request({
    url: '/courses-management/courses',
    method: 'post',
    data
  })

export const getCourses = () =>
  request({
    url: '/courses-management/courses',
    method: 'get'
  })
