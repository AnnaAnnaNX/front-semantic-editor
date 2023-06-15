import { assert, describe, it } from "vitest";
import { fragmentFromString, divideSpan } from "../helpers/selection";

describe("divideSpan", () => {
  it("fragmentFromString", () => {
    const stringHTML = "<div>test</div>";
    const fragment = fragmentFromString(stringHTML);
    const text = fragment.textContent;
    assert.equal(text, "test");
  });

  it("I", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three</span>
        </div>
      </div>
    `;
    const outputHTML = `
      <div class="content">
        <div>
          <span class="all">one </span>
          <span class="new">two </span>
          <span class="all">three</span>
        </div>
      </div>
    `;
    // create fragment
    const fragment = fragmentFromString(stringHTML);

    // call function
    const textNodeInSpan = fragment.querySelector("span")?.firstChild;
    if (!textNodeInSpan) throw new Error("empty span");
    if (!(textNodeInSpan instanceof Text)) throw new Error("empty span");
    divideSpan(textNodeInSpan, 4, textNodeInSpan, 10, "new");

    // get HTML from fragment
    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;

    // compare
    assert.equal(realOutputHTML, outputHTML);
  });
});
