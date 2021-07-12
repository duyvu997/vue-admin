import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import NotFound from "@/views/404.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(ElementUI);

const routes = [
  {
    path: "/404",
  }
];

const router = new VueRouter({
  routes
});

const wrapper = mount(NotFound, {
  localVue,
  router
});

describe("NotFound.vue", () => {
  it("snapshot testing", async () => {
    router.push("/404");
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot() 
 });
});
