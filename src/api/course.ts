import request from '@/utils/request'

const createCourse = (data: any) =>
  request({
    url: '/courses-management/courses',
    method: 'post',
    data
  })

const getCourses = () =>
  request({
    url: '/courses-management/courses',
    method: 'get'
  })

const getCourseById = (courseId: string) =>
  request({
    url: `/courses-management/courses/${courseId}`,
    method: 'get'
  })

export default {
  getCourses,
  createCourse,
  getCourseById
}
