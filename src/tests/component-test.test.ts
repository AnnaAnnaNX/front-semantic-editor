import { shallowMount } from "@vue/test-utils";
import HelloWorld from "../components/HelloWorld.vue";
import { assert, describe, it } from "vitest";

describe("addSelection", () => {
  it("I", () => {
    // render the component
    const wrapper = shallowMount(HelloWorld as any, {
      propsData: {
        HTMLContent: `<div></div>`,
      },
    });
    // wrapper.vm.;

    assert.equal(wrapper.props().HTMLContent, "<div></div>");
    assert.equal(wrapper.vm.q1, 2);
  });
});
