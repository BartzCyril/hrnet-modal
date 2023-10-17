/**
 * Retrieves all children of an element.
 *
 * @param {Element} element - The element from which to retrieve children.
 * @param {Element[]} allElements - An array where all retrieved elements will be stored.
 * @returns {void}
 */
export const getAllChildren = (element: Element, allElements: Element[]) => {

    allElements.push(element);

    const children = element?.children;

    for (let i = 0; i < children?.length; i++) {
        getAllChildren(children[i], allElements);
    }
}