import { assert, describe, it } from "vitest";
import { fragmentFromString, selectDivs } from "../helpers/selection";
import { checkExistenceElement, checkExistenceSpanElement } from "./utils";

describe("selectDiv", () => {
  it("III", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three </span>
        </div>
        <div>
          <span class="main">for five six seven</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="all">one two </span><span class="new">three </span>
        </div>
        <div>
          <span class="new">for five </span><span class="main">six seven</span>
        </div>
      </div>`;
    const fragment = fragmentFromString(stringHTML);

    const rootElement = fragment.querySelector(".content");
    if (!rootElement) throw new Error("empty div");
    if (!(rootElement instanceof HTMLDivElement))
      throw new Error("rootElement not HTMLDivElement");
    const startSpanElement = fragment.querySelector("span.all");
    checkExistenceSpanElement(startSpanElement);
    const endSpanElement = fragment.querySelector("span.main");
    checkExistenceSpanElement(endSpanElement);

    selectDivs(
      rootElement,
      startSpanElement as HTMLSpanElement,
      8,
      endSpanElement as HTMLSpanElement,
      9,
      "new"
    );

    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;
    assert.equal(realOutputHTML, outputHTML);
  });

  it("III - elements before and after selection", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="any">12345 6789 </span>
        </div>
        <div>
          <span class="all">one two three </span>
        </div>
        <div>
          <span class="main">for five six seven</span>
        </div>
        <div>
          <span class="another">6789 12345 </span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="any">12345 6789 </span>
        </div>
        <div>
          <span class="all">one two </span><span class="new">three </span>
        </div>
        <div>
          <span class="new">for five </span><span class="main">six seven</span>
        </div>
        <div>
          <span class="another">6789 12345 </span>
        </div>
      </div>`;
    const fragment = fragmentFromString(stringHTML);

    const rootElement = fragment.querySelector(".content");
    if (!rootElement) throw new Error("empty div");
    if (!(rootElement instanceof HTMLDivElement))
      throw new Error("rootElement not HTMLDivElement");
    const startSpanElement = fragment.querySelector("span.all");
    checkExistenceSpanElement(startSpanElement);
    const endSpanElement = fragment.querySelector("span.main");
    checkExistenceSpanElement(endSpanElement);

    selectDivs(
      rootElement,
      startSpanElement as HTMLSpanElement,
      8,
      endSpanElement as HTMLSpanElement,
      9,
      "new"
    );

    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;
    assert.equal(realOutputHTML, outputHTML);
  });

  it("III - some span in divs", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three </span><span class="any">12345 6789 </span>
        </div>
        <div>
        
          <span class="another">6789 12345 </span><span class="main">for five six seven</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="all">one two </span><span class="new">three 12345 6789 </span>
        </div>
        <div>
        
          <span class="new">6789 12345 for five </span><span class="main">six seven</span>
        </div>
      </div>`;
    const fragment = fragmentFromString(stringHTML);

    const rootElement = fragment.querySelector(".content");
    if (!rootElement) throw new Error("empty div");
    if (!(rootElement instanceof HTMLDivElement))
      throw new Error("rootElement not HTMLDivElement");
    const startSpanElement = fragment.querySelector("span.all");
    checkExistenceSpanElement(startSpanElement);
    const endSpanElement = fragment.querySelector("span.main");
    checkExistenceSpanElement(endSpanElement);

    selectDivs(
      rootElement,
      startSpanElement as HTMLSpanElement,
      8,
      endSpanElement as HTMLSpanElement,
      9,
      "new"
    );

    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;
    assert.equal(realOutputHTML, outputHTML);
  });

  it("III - exist middle divs", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three </span>
        </div>
        <div>
          <span class="middle">12345 6789 </span>
          <span class="middle1">6789 12345 </span>
        </div>
        <div>
          <span class="main">for five six seven</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="all">one two </span><span class="new">three </span>
        </div>
        <div>
          
          <span class="new">12345 6789 6789 12345 </span>
        </div>
        <div>
          <span class="new">for five </span><span class="main">six seven</span>
        </div>
      </div>`;
    const fragment = fragmentFromString(stringHTML);

    const rootElement = fragment.querySelector(".content");
    if (!rootElement) throw new Error("empty div");
    if (!(rootElement instanceof HTMLDivElement))
      throw new Error("rootElement not HTMLDivElement");
    const startSpanElement = fragment.querySelector("span.all");
    checkExistenceSpanElement(startSpanElement);
    const endSpanElement = fragment.querySelector("span.main");
    checkExistenceSpanElement(endSpanElement);

    selectDivs(
      rootElement,
      startSpanElement as HTMLSpanElement,
      8,
      endSpanElement as HTMLSpanElement,
      9,
      "new"
    );

    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;
    assert.equal(realOutputHTML, outputHTML);
  });

  it("III - some divs in middle", async () => {
    // create structure HTML
    const stringHTML = `
      <div class="content">
        <div>
          <span class="all">one two three </span>
        </div>
        <div>
          <span class="middle">12345 6789 </span>
          <span class="middle1">12345 6789 </span>
        </div>
        <div>
          <span class="middle">12345 6789 </span>
          <span class="middle1">12345 6789 </span>
        </div>
        <div>
          <span class="main">for five six seven</span>
        </div>
      </div>
    `;
    const outputHTML = `<div class="content">
        <div>
          <span class="all">one two </span><span class="new">three </span>
        </div>
        <div>
          
          <span class="new">12345 6789 12345 6789 </span>
        </div>
        <div>
          
          <span class="new">12345 6789 12345 6789 </span>
        </div>
        <div>
          <span class="new">for five </span><span class="main">six seven</span>
        </div>
      </div>`;
    const fragment = fragmentFromString(stringHTML);

    const rootElement = fragment.querySelector(".content");
    if (!rootElement) throw new Error("empty div");
    if (!(rootElement instanceof HTMLDivElement))
      throw new Error("rootElement not HTMLDivElement");
    const startSpanElement = fragment.querySelector("span.all");
    checkExistenceSpanElement(startSpanElement);
    const endSpanElement = fragment.querySelector("span.main");
    checkExistenceSpanElement(endSpanElement);

    selectDivs(
      rootElement,
      startSpanElement as HTMLSpanElement,
      8,
      endSpanElement as HTMLSpanElement,
      9,
      "new"
    );

    const realOutputHTML = fragment.querySelector(".content")?.outerHTML;
    assert.equal(realOutputHTML, outputHTML);
  });

});
