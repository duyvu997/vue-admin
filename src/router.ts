import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue'),
    meta: { 
      title: 'Orange Juice Admin', 
      hidden: true 
    }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
          title: 'Trang chủ',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/courses',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/courses/CourseList.vue'),
        meta: {
          title: 'Khóa học',
          icon: 'table'
        }
      },
      {
        path: 'create',
        component: () => import('@/views/courses/CreateCourse.vue'),
        meta: {
          title: 'Create Course',
          hidden: true
        }
      },
      {
        path: 'edit/:courseId',
        component: () => import('@/views/courses/UpdateCourse.vue'),
        meta: {
          title: 'Update Course',
          hidden: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: routes
})
