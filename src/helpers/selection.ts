// mutable

import { HTMLElement } from "happy-dom";

export const fragmentFromString = (stringHTML: string): DocumentFragment => {
  return document.createRange().createContextualFragment(stringHTML);
};
// вариант разбиения одного span
const createSpan = (content: string, className: string) => {
  const spanElement = document.createElement("span");
  spanElement.textContent = content;
  spanElement.className = className;
  return spanElement;
};
export const selectSpan = (
  spanElement: HTMLSpanElement,
  startIndex: number,
  endIndex: number,
  newModeClass: string
) => {
  if (startIndex === endIndex) {
    console.log("startIndex === endIndex");
    return;
  }
  const content = spanElement.textContent || "";
  if (startIndex > endIndex || endIndex > content.length) {
    console.log("startIndex > endIndex || endIndex >= content.length");
    return;
  }
  const previousClass = spanElement.className;
  const texts = [
    content.slice(0, startIndex),
    content.slice(startIndex, endIndex),
    content.slice(endIndex),
  ];
  const nodesFragment = document.createDocumentFragment();
  if (texts[0].length) {
    nodesFragment.appendChild(createSpan(texts[0], previousClass));
  }
  nodesFragment.appendChild(createSpan(texts[1], newModeClass));
  if (texts[2].length) {
    nodesFragment.appendChild(createSpan(texts[2], previousClass));
  }
  // const content1 = nodesFragment.textContent;
  // console.log(content1);
  // spanElement.parentNode?.replaceChild(nodesFragment, spanElement); // standard
  spanElement.replaceWith(nodesFragment);
};

const divideText = (text: string, index: number) => {
  const rightPartText = text.slice(0, index);
  const leftPartText = text.slice(index);
  return [rightPartText, leftPartText];
};
export const selectDiv = (
  divElement: HTMLDivElement,
  startSpanElement: HTMLSpanElement,
  startIndex: number,
  endSpanElement: HTMLSpanElement,
  endIndex: number,
  newModeClass: string
) => {
  if (startSpanElement === endSpanElement) {
    selectSpan(startSpanElement, startIndex, endIndex, newModeClass);
    return;
  }
  let middleSpanContent = "";
  let el: HTMLSpanElement = startSpanElement;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (el === startSpanElement) {
      if (!startSpanElement.textContent) {
        throw new Error();
      }
      const [rightPartText, leftPartText] = divideText(
        startSpanElement.textContent,
        startIndex
      );
      startSpanElement.textContent = rightPartText;
      middleSpanContent = leftPartText;
    } else if (el !== endSpanElement) {
      middleSpanContent += el.textContent;
      el.remove();
      // divElement.removeChild(el);
    } else {
      if (!endSpanElement.textContent) {
        throw new Error();
      }
      const [rightPartText, leftPartText] = divideText(
        endSpanElement.textContent,
        endIndex
      );
      middleSpanContent += rightPartText;
      const unionMiddleSpan = createSpan(middleSpanContent, newModeClass);
      divElement.insertBefore(unionMiddleSpan, endSpanElement);
      if (leftPartText.length) {
        endSpanElement.textContent = leftPartText;
      } else {
        endSpanElement.remove();
      }
      break;
    }
    const nextElement = startSpanElement.nextElementSibling;
    if (!nextElement || !(nextElement instanceof HTMLSpanElement)) {
      throw new Error("not sibling or sibling is not a span");
    }
    el = nextElement;
  }
  if (!startSpanElement?.textContent.length) {
    startSpanElement.remove();
  }
};
const getFirstSpanInDiv = (div: HTMLDivElement): [HTMLSpanElement, number] => {
  const span = div.firstElementChild;
  if (!span) {
    throw new Error("not child in div");
  }
  if (!(span instanceof HTMLSpanElement)) {
    throw new Error("first child in div is not a span");
  }
  return [span, 0];
};

const getLastSpanInDiv = (div: HTMLDivElement): [HTMLSpanElement, number] => {
  const span = div.lastElementChild;
  if (!span) {
    throw new Error("not child in div");
  }
  if (!(span instanceof HTMLSpanElement)) {
    throw new Error("last child in div is not a span");
  }
  const text = span?.textContent;
  if (text === null) {
    throw new Error("textContent in span equal null");
  }
  return [span, text.length];
};

export const selectDivs = (
  contentElement: HTMLDivElement,
  startSpanElement: HTMLSpanElement,
  startIndex: number,
  endSpanElement: HTMLSpanElement,
  endIndex: number,
  newModeClass: string
) => {
  const startDiv = startSpanElement.parentNode;
  if (!startDiv) {
    throw new Error("empty element");
  }
  if (!(startDiv instanceof HTMLDivElement)) {
    throw new Error("el not type HTMLDivElement");
  }
  // checkExistanceElement(startDiv, HTMLDivElement);
  const endDiv = endSpanElement.parentNode;
  // if (!endDiv) {
  //   throw new Error("empty element");
  // }
  if (!(endDiv instanceof HTMLDivElement)) {
    throw new Error("el not type HTMLDivElement");
  }
  // checkExistanceElement(endDiv, HTMLDivElement);
  if (startDiv === endDiv) {
    selectDiv(
      startDiv,
      startSpanElement,
      startIndex,
      endSpanElement,
      endIndex,
      newModeClass
    );
    return;
  }
  let el = startDiv;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (el === startDiv) {
      const [lastSpanInDiv, lastIndexInSpan] = getLastSpanInDiv(el);
      selectDiv(
        el,
        startSpanElement,
        startIndex,
        lastSpanInDiv,
        lastIndexInSpan,
        newModeClass
      );
    } else if (el !== endDiv) {
      const [firstSpanInDiv, firstIndexInSpan] = getFirstSpanInDiv(el);
      const [lastSpanInDiv, lastIndexInSpan] = getLastSpanInDiv(el);
      selectDiv(
        el,
        firstSpanInDiv,
        firstIndexInSpan,
        lastSpanInDiv,
        lastIndexInSpan,
        newModeClass
      );
    } else {
      const [firstSpanInDiv, firstIndexInSpan] = getFirstSpanInDiv(el);
      selectDiv(
        el,
        firstSpanInDiv,
        firstIndexInSpan,
        endSpanElement,
        endIndex,
        newModeClass
      );
      break;
    }
    const nextElement = el.nextElementSibling;
    if (!nextElement || !(nextElement instanceof HTMLDivElement)) {
      throw new Error("not sibling or sibling is not a div");
    }
    el = nextElement;
  }
};
