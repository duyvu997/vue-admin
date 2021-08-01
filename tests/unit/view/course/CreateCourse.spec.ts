import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import CreateCourse from '@/views/courses/CreateCourse.vue'
import sinon from 'sinon'
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)

const routes = [
  {
    path: '/courses',
    children: [
      {
        path: 'create'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const wrapper = mount(CreateCourse, {
  localVue,
  router
})

describe.only('CreateCourse.vue', () => {
  beforeEach(async () => {
    router.push('/courses/create')
    await wrapper.vm.$nextTick()
  })
  it('snapshot testing', async () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('create button trigger', async () => {
    const onSubmit = sinon.stub()
    const button = wrapper.find('.el-button--primary')
    await button.trigger('click')
    console.log(button.html())
    expect(onSubmit.called).toBe(true)
  })
})
