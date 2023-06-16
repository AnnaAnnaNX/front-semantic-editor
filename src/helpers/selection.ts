// mutable

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

const divideTest = (text: string, index: number) => {
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
      const [rightPartText, leftPartText] = divideTest(
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
      const [rightPartText, leftPartText] = divideTest(
        endSpanElement.textContent,
        endIndex
      );
      middleSpanContent += rightPartText;
      const unionMiddleSpan = createSpan(middleSpanContent, newModeClass);
      divElement.insertBefore(unionMiddleSpan, endSpanElement);
      endSpanElement.textContent = leftPartText;
      break;
    }
    const nextElement = startSpanElement.nextElementSibling;
    if (!nextElement || !(nextElement instanceof HTMLSpanElement)) {
      throw new Error("not sibling or sibling is not a span");
    }
    el = nextElement;
  }
};
export const selectDivs = () => {};
