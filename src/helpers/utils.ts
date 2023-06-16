export const checkExistenceElement = (el: any, type: any) => {
  if (!el) {
    throw new Error("empty element");
  }
  if (!(el instanceof type)) {
    throw new Error(`el not type ${type}`);
  }
};

export const checkExistenceSpanElement = (
  el: Element | null
): HTMLSpanElement => {
  if (!el) throw new Error("empty span");
  if (!(el instanceof HTMLSpanElement))
    throw new Error("span not HTMLSpanElement");
  return el;
};
