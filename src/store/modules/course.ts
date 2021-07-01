import {
  VuexModule,
  Module,
  Action,
  getModule,
  Mutation
} from 'vuex-module-decorators'
import courseApiClient from '@/api/course'
import { getToken } from '@/utils/cookies'
import store from '@/store'

export interface ICourseState {
  courses: object[]
}

@Module({ dynamic: true, store, name: 'course' })
class Course extends VuexModule implements ICourseState {
  public courses = []

  @Mutation
  private SET_COURSE(courses: any) {
    this.courses = courses
  }

  @Action
  public async createCourse(courseTobeCreated: any) {
    return await courseApiClient.createCourse(courseTobeCreated)
  }

  @Action
  public async getCourses() {
    const courses = await courseApiClient.getCourses()
    this.SET_COURSE(courses)
    return courses
  }

  @Action
  public async getCourseById(courseId: string) {
    const course = await courseApiClient.getCourseById(courseId)
    this.SET_COURSE(course)
    return course
  }
}

export const CourseModule = getModule(Course)
