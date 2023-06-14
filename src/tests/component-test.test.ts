import { shallowMount } from "@vue/test-utils";
import Test from "../components/Test.vue";
import { assert, describe, it } from "vitest";

describe("addSelection", () => {
  it("I", () => {
    // render the component
    const wrapper = shallowMount(Test as any, {
      propsData: {
        HTMLContent: `<div></div>`,
      },
    });

    assert.equal(wrapper.props().HTMLContent, "<div></div>");
  });
});
