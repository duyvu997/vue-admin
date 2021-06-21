import {
  VuexModule,
  Module,
  Action,
  getModule
} from 'vuex-module-decorators'
import { createCourse, getCourses } from '@/api/course'
import { getToken } from '@/utils/cookies'
import store from '@/store'

export interface ICourseState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'course' })
class Course extends VuexModule implements ICourseState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []

  @Action
  public async createCourse(courseTobeCreated: any) {
    return await createCourse(courseTobeCreated)
  }

  @Action
  public async getCourse() {
    return await getCourses()
  }
}

export const CourseModule = getModule(Course)
