import { getNamespace } from '@/utils/store-helper'

export const COURSE_NAMESPACE = 'CourseModule'
export const CREATE_COURSE = 'createCourse'
export const UPDATE_COURSE = 'updateCourse'
export const GET_COURSE = 'getCourse'
export const GET_COURSE_TEACHERS = 'getCourseTeachers'
export const GET_COURSE_STUDENTS = 'getCourseStudents'
export const SET_COURSE = 'setCourse'
export const SET_COURSES = 'setCourses'
export const SET_TEACHERS = 'setTeachers'
export const SET_STUDENTS = 'setStudents'
export const GET_COURSES = 'getCourses'
export const SET_ERROR = 'setError'
export const RESET_ERROR = 'resetError'

export const courseAction = getNamespace(COURSE_NAMESPACE)
