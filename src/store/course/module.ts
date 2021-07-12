import { Commit } from 'vuex'
import {
  CREATE_COURSE,
  GET_COURSE,
  GET_COURSES,
  GET_COURSE_STUDENTS,
  GET_COURSE_TEACHERS,
  RESET_ERROR,
  SET_COURSE,
  SET_COURSES,
  SET_STUDENTS,
  SET_TEACHERS,
  UPDATE_COURSE
} from './action.type'
import courseApiClient from '@/api/course'

interface ICourseState {
  courses: object[]
  course: object
  teachersOfCourse: []
  studentsOfCourse: []
  error: any
}

const state: ICourseState = {
  courses: [],
  course: {},
  teachersOfCourse: [],
  studentsOfCourse: [],
  error: ''
}

const getters = {
  courses(state: ICourseState) {
    return state.courses
  },
  course(state: ICourseState) {
    return state.course
  },
  teachersOfCourse(state: ICourseState) {
    return state.teachersOfCourse
  },
  studentsOfCourse(state: ICourseState) {
    return state.studentsOfCourse
  }
}

const actions = {
  async [CREATE_COURSE](
    { commit }: { commit: Commit },
    courseTobeCreated: any
  ) {
    const response = await courseApiClient.createCourse(courseTobeCreated)
    commit(RESET_ERROR)
    return response
  },

  async [UPDATE_COURSE](
    { commit }: { commit: Commit },
    data: { courseId: string; courseTobeUpdated: any }
  ) {
    const response = await courseApiClient.updateCourseById(
      data.courseId,
      data.courseTobeUpdated
    )
    commit(RESET_ERROR)
    return response
  },

  async [GET_COURSES]({ commit }: { commit: Commit }) {
    const courses = await courseApiClient.getCourses()
    commit(SET_COURSES, courses)
    return courses
  },

  async [GET_COURSE]({ commit }: { commit: Commit }, courseId: string) {
    const course = await courseApiClient.getCourseById(courseId)
    commit(SET_COURSE, course)
    return course
  },

  async [GET_COURSE_TEACHERS](
    { commit }: { commit: Commit },
    courseId: string
  ) {
    const { data = [] } = await courseApiClient.getCourseTeachersById(courseId)
    commit(SET_TEACHERS, data)
    return data
  },

  async [GET_COURSE_STUDENTS](
    { commit }: { commit: Commit },
    courseId: string
  ) {
    const { data = [] } = await courseApiClient.getCourseStudentsById(courseId)
    let approvalStudents: any[] = []
    data.forEach((ele: { tagName: string; result: any[] }) => {
      if (ele.tagName === 'APPROVAL') {
        approvalStudents = ele.result
      }
    })
    commit(SET_STUDENTS, approvalStudents)
    return data
  }
}
const mutations = {
  [SET_COURSES](state: ICourseState, courses: any) {
    state.courses = courses
  },
  [SET_TEACHERS](state: ICourseState, teachers: any) {
    state.teachersOfCourse = teachers
  },
  [SET_STUDENTS](state: ICourseState, students: any) {
    state.studentsOfCourse = students
  },
  [SET_COURSE](state: ICourseState, course: any) {
    state.course = course
  },
  [RESET_ERROR](state: ICourseState) {
    state.error = ''
  }
}

const CourseModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default CourseModule
