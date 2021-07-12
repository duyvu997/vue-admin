import { Commit } from 'vuex'
import {
  CREATE_COURSE,
  GET_COURSE,
  GET_COURSES,
  SET_COURSE,
  SET_COURSES,
  UPDATE_COURSE
} from './action.type'
import courseApiClient from '@/api/course'

interface ICourseState {
  courses: object[]
  course: object
}

const state: ICourseState = {
  courses: [],
  course: {}
}

const getters = {
  courses(state: ICourseState) {
    return state.courses
  },
  course(state: ICourseState) {
    return state.course
  }
}

const actions = {
  async [CREATE_COURSE](
    { commit }: { commit: Commit },
    courseTobeCreated: any
  ) {
    return await courseApiClient.createCourse(courseTobeCreated)
  },

  async [UPDATE_COURSE](
    { commit }: { commit: Commit },
    data: { courseId: string, courseTobeUpdated: any }
  ) {
    console.log(data.courseId, 22222)
    
    return await courseApiClient.updateCourseById(data.courseId, data.courseTobeUpdated)
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
  }
}
const mutations = {
  [SET_COURSES](state: ICourseState, courses: any) {
    state.courses = courses
  },
  [SET_COURSE](state: ICourseState, course: any) {
    state.course = course
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
