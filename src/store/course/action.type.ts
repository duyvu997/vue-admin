import { getNamespace } from '@/utils/store-helper'

export const COURSE_NAMESPACE = 'CourseModule'
export const CREATE_COURSE = 'createCourse'
export const GET_COURSE = 'getCourse'
export const SET_COURSE = 'setCourse'
export const SET_COURSES = 'setCourses'
export const GET_COURSES = 'getCourses'
export const SET_ERROR = 'setError'
export const RESET_ERROR = 'resetError'

export const courseAction = getNamespace(COURSE_NAMESPACE)
