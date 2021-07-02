import { Commit } from 'vuex'
import {
  CREATE_COURSE,
  GET_COURSE,
  GET_COURSES,
  SET_COURSE,
  SET_COURSES
} from './action.type'
import courseApiClient from '@/api/course'

interface ICourseState {
  courses: object[]
}

const state: ICourseState = {
  courses: []
}

const getters = {
  courses(state: ICourseState) {
    return state.courses
  }
}

const actions = {
  async [CREATE_COURSE](
    { commit }: { commit: Commit },
    courseTobeCreated: any
  ) {
    return await courseApiClient.createCourse(courseTobeCreated)
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
