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
  
const updateCourseById = (courseId: string, courseTobeUpdated: any) =>
  request({
    url: `/courses-management/courses/${courseId}`,
    method: 'put',
    data: courseTobeUpdated 
  })

export default {
  getCourses,
  createCourse,
  getCourseById,
  updateCourseById
}
