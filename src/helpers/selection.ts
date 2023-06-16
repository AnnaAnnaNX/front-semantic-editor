// mutable

export const fragmentFromString = (stringHTML: string): DocumentFragment => {
  return document.createRange().createContextualFragment(stringHTML);
};
// вариант разбиения одного span


const createSpan = (content, className) => {
  const spanElement = document.createElement("span");
  spanElement.textContent = content;
  spanElement.className = className;
  return spanElement;
}
export const divideSpan = (
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
export const divideDiv = () => {};
export const divideDivs = () => {};
