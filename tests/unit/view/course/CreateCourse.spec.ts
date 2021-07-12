import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import CreateCourse from "@/views/courses/CreateCourse.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(ElementUI);

const routes = [
  {
    path: "/courses",
    children: [
      {
        path: "create"
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

const wrapper = mount(CreateCourse, {
  localVue,
  router
});

describe("CreateCourse.vue", () => {
  it("snapshot testing", async () => {
    router.push("/courses/create");
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot() 
 });
});
