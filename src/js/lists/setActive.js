import { storage } from '../storage/storage';
import { getListsBlockElement } from '../task/getElement';
import { loadTasksCurrent } from './loadTaskList';
import { saveActiveList } from './saveActiveList';
import { updateTitleNameList } from './updaterDetails';

export function setActive(event) {
  let list = event.target.closest('.lists-block__item');
  if (list) {
    let listBlock = list.closest('.lists-block');
    let allList = Array.from(listBlock.children);
    saveActiveList();

    allList.forEach((element) => {
      element.classList.remove('_active');
      let childElements = Array.from(element.children);
      childElements.forEach((element) => {
        element.classList.remove('_active');
      });
    });

    list.classList.add('_active');
    let listElements = Array.from(list.children);
    listElements.forEach((element) => {
      element.classList.add('_active');
    });

    let listName = list.querySelector(
      '.lists-block__list-title > span'
    ).innerHTML;

    storage.setListNameCurrent(listName);
    updateTitleNameList();

    loadTasksCurrent();
  } else {
    return event;
  }
}

export function setActiveListName(listName) {
  const listBlock = getListsBlockElement();
  const allList = Array.from(listBlock.children);

  allList.forEach((element) => {
    element.classList.remove('_active');
    let childElements = Array.from(element.children);
    childElements.forEach((element) => {
      element.classList.remove('_active');
    });
  });

  let list = allList.find((element) => {
    if (
      element.querySelector('.lists-block__list-title > span').innerHTML ===
      listName
    ) {
      return element;
    }
  });

  list.classList.add('_active');
  let listElements = Array.from(list.children);
  listElements.forEach((element) => {
    element.classList.add('_active');
  });
  storage.setListNameCurrent(listName);
  updateTitleNameList();
}
