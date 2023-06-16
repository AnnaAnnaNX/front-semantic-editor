import { assert, describe, it } from "vitest";
import { fragmentFromString, selectDiv } from "../helpers/selection";

describe("selectDiv", () => {
  it("II", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three </span>
          <span class="main">for five six seven</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="all">one two </span>
          <span class="new">three for five </span><span class="main">six seven</span>
        </div>
      </div>`;
    // create fragment
    const fragment = fragmentFromString(stringHTML);

    // call function

    const divElement = fragment.querySelector(".content div");
    if (!divElement) throw new Error("empty div");
    if (!(divElement instanceof HTMLDivElement))
      throw new Error("span not HTMLDivElement");
    const startSpanElement = fragment.querySelector("span.all");
    if (!startSpanElement) throw new Error("empty span");
    if (!(startSpanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    const endSpanElement = fragment.querySelector("span.main");
    if (!endSpanElement) throw new Error("empty span");
    if (!(endSpanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    selectDiv(divElement, startSpanElement, 8, endSpanElement, 9, "new");

    // get HTML from fragment
    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;

    // compare
    assert.equal(realOutputHTML, outputHTML);
  });

  it("II - elements before and after selection", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="any">12345 6789 </span>
          <span class="all">one two three </span>
          <span class="main">for five six seven</span>
          <span class="another">6789 12345 </span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="any">12345 6789 </span>
          <span class="all">one two </span>
          <span class="new">three for five </span><span class="main">six seven</span>
          <span class="another">6789 12345 </span>
        </div>
      </div>`;
    // create fragment
    const fragment = fragmentFromString(stringHTML);

    // call function

    const divElement = fragment.querySelector(".content div");
    if (!divElement) throw new Error("empty div");
    if (!(divElement instanceof HTMLDivElement))
      throw new Error("span not HTMLDivElement");
    const startSpanElement = fragment.querySelector("span.all");
    if (!startSpanElement) throw new Error("empty span");
    if (!(startSpanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    const endSpanElement = fragment.querySelector("span.main");
    if (!endSpanElement) throw new Error("empty span");
    if (!(endSpanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    selectDiv(divElement, startSpanElement, 8, endSpanElement, 9, "new");

    // get HTML from fragment
    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;

    // compare
    assert.equal(realOutputHTML, outputHTML);
  });

  it("II - exist middle spans", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three </span>
          <span class="middle">12345 6789 </span>
          <span class="main">for five six seven</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="all">one two </span>
          
          <span class="new">three 12345 6789 for five </span><span class="main">six seven</span>
        </div>
      </div>`;
    // create fragment
    const fragment = fragmentFromString(stringHTML);

    // call function

    const divElement = fragment.querySelector(".content div");
    if (!divElement) throw new Error("empty div");
    if (!(divElement instanceof HTMLDivElement))
      throw new Error("span not HTMLDivElement");
    const startSpanElement = fragment.querySelector("span.all");
    if (!startSpanElement) throw new Error("empty span");
    if (!(startSpanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    const endSpanElement = fragment.querySelector("span.main");
    if (!endSpanElement) throw new Error("empty span");
    if (!(endSpanElement instanceof HTMLSpanElement))
      throw new Error("span not HTMLSpanElement");
    selectDiv(divElement, startSpanElement, 8, endSpanElement, 9, "new");

    // get HTML from fragment
    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;

    // compare
    assert.equal(realOutputHTML, outputHTML);
  });
});
