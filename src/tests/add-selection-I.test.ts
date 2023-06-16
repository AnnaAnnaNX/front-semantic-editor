import { shallowMount } from "@vue/test-utils";
import HelloWorld from "../components/HelloWorld.vue";
import { assert, describe, it } from "vitest";

describe("addSelection", () => {
  it("I", async () => {
    // render the component
    const wrapper = shallowMount(HelloWorld as any, {
      propsData: {
        HTMLContent: `
          <div class="content">
            <div>
              <span class="all">one two three</span>
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
    `;

    // await wrapper.vm.$nextTick();
    // await wrapper.vm.$nextTick();
    // await wrapper.vm.$nextTick();

    // create seection
    const range = new Range();
    console.log('wrapper.find("div")');
    console.log(wrapper.find("span").text());
    range.setStart(wrapper.find("span").element.firstChild as Node, 4);
    range.setEnd(wrapper.find("span").element.firstChild as Node, 10);
    document.getSelection()?.addRange(range);
    // wrapper.find(".content").element.getSelection().addRange(range);

    await wrapper.vm.$nextTick();

    // get HTML for .content tag
    const newHTML = wrapper.find(".content").text();
    console.log(newHTML);

    assert.equal(wrapper.props().HTMLContent, newHTML);
  });
});
