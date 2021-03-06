import { getTitleListElement } from '../task/getElement';

export function getCurrentList() {
  const listsBlockElement = document.querySelector('.lists-block');
  const allList = Array.from(listsBlockElement.children);
  const currentList = allList.find((item) =>
    item.classList.contains('_active')
  );
  return currentList;
}
export function getNameCurrentList() {
  const currentList = getCurrentList();
  if (currentList != undefined) {
    const titleElement = currentList.querySelector(
      '.lists-block__list-title > span'
    );
    const title = titleElement.innerHTML;
    return title;
  } else {
    return null;
  }
}

export function getList(listName) {
  const listsBlockElement = document.querySelector('.lists-block');
  const allList = Array.from(listsBlockElement.children);
  const list = allList.find(function (item) {
    let title = item.querySelector('.lists-block__list-title > span');
    title = title.innerHTML;
    if (title === listName) {
      return item;
    }
  });
  return list;
}
