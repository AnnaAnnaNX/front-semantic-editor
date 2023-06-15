// mutable

export const fragmentFromString = (stringHTML: string): DocumentFragment => {
  return document.createRange().createContextualFragment(stringHTML);
};
export const divideSpan = (
  startElement: Text,
  startIndex: number,
  endElement: Text,
  endIndex: number,
  newModeClass: string
) => {};
export const divideDiv = () => {};
export const divideDivs = () => {};
