import { storage } from '../storage/storage';
import { getTitleListElement } from '../task/getElement';
import { getList } from './getList';

export function updateCounterTask(listName) {
  const list = getList(listName);
  let counterElement = list.querySelector(
    '.lists-block__count-undone-task>span'
  );
  const undoneTask = storage.getUndoneTaskInList(listName);
  counterElement.innerHTML = undoneTask;
}

export function updateTitleNameList() {
  const titleElement = getTitleListElement();
  const title = storage.getListNameCurrent();
  titleElement.innerHTML = title;
}
