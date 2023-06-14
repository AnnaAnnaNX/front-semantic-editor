import { shallowMount } from "@vue/test-utils";
import Test from "../components/Test.vue";
import { assert, describe, it } from "vitest";

describe("addSelection", () => {
  it("I", () => {
    // render the component
    const wrapper = shallowMount(Test as any, {
      propsData: {
        HTMLContent: `
          <div class="content">
            <div>
              <span class="all""">one two three</span>
            </div>
          </div>
        `,
      },
    });
    const outputHTML = `
          <div class="content">
            <div>
              <span class="all">one </span>
              <span class="new">two </span>
              <span class="all">three</span>
            </div>
          </div>
        `,


    assert.equal(wrapper.props().HTMLContent, "<div></div>");
  });
});
