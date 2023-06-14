import { shallowMount } from "@vue/test-utils";
import GuessAge from "../components/GuessAge.vue";
import { assert, describe } from "vitest";
// import { expect, test } from "vitest";
const wrapper = shallowMount(GuessAge, {
  propsData: {
    title: "Guess User Age App",
  },
});

describe("addSelection", () => {
  it("testing GuessAge component props", async () => {
    assert.equal(wrapper.props().title, "Guess User Age App");
  });

  it("has a button", () => {
    assert.equal(wrapper.find("button").exists(), true);
  });

  it("Button clicked", async () => {
    const ac = await wrapper.get("button").trigger("click");
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled
    assert.equal(wrapper.vm.search, "");
  });
});
