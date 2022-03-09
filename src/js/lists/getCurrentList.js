export function getCurrentList() {
  const listsBlockElement = document.querySelector('.lists-block');
  const allList = Array.from(listsBlockElement.children);
  const currentList = allList.find((item) =>
    item.classList.contains('_active')
  );
  // console.log('getNameCurrentList - currentList', currentList);
  return currentList;
}
export function getNameCurrentList() {
  const currentList = getCurrentList();
  const titleElement = currentList.querySelector(
    '.lists-block__list-title > span'
  );
  const title = titleElement.innerHTML;
  // console.log('getNameCurrentList - title', title);
  return title;
}
