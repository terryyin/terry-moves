export type BoundingClientRectOf = { (element: HTMLElement): DOMRect; }

type ElementMatcher = (elm: HTMLElement) => boolean

interface BoundingClientRectStubberMethods {
  stub(rect: DOMRect, matcher: ElementMatcher): void;
}

type BoundingClientRectStubber = BoundingClientRectOf & BoundingClientRectStubberMethods;

export const stubBoundingClientRect = (): BoundingClientRectStubber => {
  const stubs: {rect: DOMRect, matcher: ElementMatcher}[] = [];

  const mainFunction = (element: HTMLElement): DOMRect => { 
    const result = stubs.find(({matcher}) => matcher(element))?.rect;
    if(!result) throw new Error("No stub found for element");

    return result;
  }

  (mainFunction as BoundingClientRectStubber).stub = (rect: DOMRect, matcher: ElementMatcher) => {
    stubs.push({rect, matcher})
  };

  return mainFunction as BoundingClientRectStubber;
};