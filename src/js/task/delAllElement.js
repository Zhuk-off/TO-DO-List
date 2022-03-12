import { getListsBlockElement, getTasksBlockElement } from './getElement';

function delElements(taskListBlock) {
  const numberTasks = taskListBlock.children.length;
  for (let i = 0; i < numberTasks; i++) {
    taskListBlock.firstElementChild.remove();
  }
}

export function delTasks() {
  const taskBlock = getTasksBlockElement();
  delElements(taskBlock);
}

export function delLists() {
  const listBlock = getListsBlockElement();
  delElements(listBlock);
}
