import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)

const routes = [
  {
    path: '/',
    children: [{
      path: 'dashboard'
    }]
  },
  {
    path: '/menu',
    children: [{
      path: 'menu1',
      meta: { title: 'menu1' },
      children: [{
        path: 'menu1-1',
        meta: { title: 'menu1-1' }
      },
      {
        path: 'menu1-2',
        redirect: 'noredirect',
        meta: { title: 'menu1-2' },
        children: [{
          path: 'menu1-2-1',
          meta: { title: 'menu1-2-1' }
        },
        {
          path: 'menu1-2-2'
        }]
      }]
    }]
  }]

const router = new VueRouter({
  routes
})

const wrapper = mount(Breadcrumb, {
  localVue,
  router
})

describe('Breadcrumb.vue', () => {
  it('dashboard', async() => {
    router.push('/dashboard')
    await wrapper.vm.$nextTick()
    const len = wrapper.findAll('.el-breadcrumb__item').length
    expect(len).toBe(0)
  })
})
