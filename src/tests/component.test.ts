import { shallowMount } from "@vue/test-utils";
import HelloWorld from "../components/HelloWorld.vue";
import { assert, describe, it } from "vitest";

describe("addSelection", () => {
  it("I", () => {
    // render the component
    // const wrapper = shallowMount(HelloWorld as any, {
    const wrapper = mount(HelloWorld as any, {
      // propsData: {
      //   HTMLContent: `<div></div>`,
      // },
    });

    // assert.equal(wrapper.props().HTMLContent, "<q></q>");
  });
});
