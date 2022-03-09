import { updateTaskList } from '../task/updateTaskList';
import { loadTaskList } from './loadTaskList';
import { saveActiveList } from './saveActiveList';

export function setActive(event) {
  let list = event.target.closest('.lists-block__item');
  if (list) {
    let listsBlockElement = list.closest('.lists-block');
    let allList = Array.from(listsBlockElement.children);
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
    loadTaskList(listName);
  } else {
    return event;
  }
}

export function setActiveListName(listName) {
  let listsBlockElement = document.querySelector('.lists-block');
  let allList = Array.from(listsBlockElement.children);

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
}
