import { setActiveListName } from '../lists/setActive';
import { getNameCurrentList } from '../lists/getCurrentList';

function saveTasksArrayInLocalStorage(tasksArray) {
  const listName = getNameCurrentList();
  // console.log('saveTasksArrayInLocalStorage - listName', listName);
  let tasksArrayJson = JSON.stringify(tasksArray);
  // console.log('tasksArrayJson', tasksArrayJson);

  localStorage.setItem(listName, tasksArrayJson);

  localStorage.removeItem('listNameCurrent');
  localStorage.setItem('listNameCurrent', listName);
  // console.log('listName in saveTasksArrayInLocalStorage', listName);
}

function getTasksArrayFromLocalStorage(listName) {
  try {
    // console.log('входной параметр listName', listName);
    if (listName === undefined) {
      listName = localStorage.getItem('listNameCurrent');

      // console.log('listName in getTasksArrayFromLocalStorage', listName);
      // listName = 'Список задач №1';
      const tasksArrayJson = localStorage.getItem(listName);
      const tasksArray = JSON.parse(tasksArrayJson);
      setActiveListName(listName);
      // console.log('tasksArray get = und', tasksArray);

      return tasksArray;
    } else {
      // if (!listName) {
      //   console.log('listName ==null', listName);
      //   let listsBlockElement = document.querySelector('.lists-block');
      //   listName = listsBlockElement.firstChild.querySelector(
      //     '.lists-block__list-title > span'
      //   ).innerHTML;
      //   console.log('listName new', listName);
      // }
      // console.log('listName in getTasksArrayFromLocalStorage', listName);
      // listName = 'Список задач №1';
      const tasksArrayJson = localStorage.getItem(listName);
      const tasksArray = JSON.parse(tasksArrayJson);
      setActiveListName(listName);
      // console.log('tasksArray get =', tasksArray);
      return tasksArray;
    }
  } catch (error) {
    let tasksArray = [];
    console.log('localStorage.getItem("listToday") not found', error);
    return tasksArray;
  }
}

export { saveTasksArrayInLocalStorage, getTasksArrayFromLocalStorage };
