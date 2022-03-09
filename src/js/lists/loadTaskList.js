import { getTasksArrayFromLocalStorage } from '../localStorage/recordingInLocalStorage';
import { createTaskList } from '../task/createTaskList';
import { delAllTasksElement } from '../task/delAllTasksElement';
import { getElementTaskListBlock } from '../task/getElement';

export function loadTaskList(listName) {
  const taskListBlock = getElementTaskListBlock();
  delAllTasksElement(taskListBlock);
  //   console.log('loadTaskList listName', listName);
  const tasksArray = getTasksArrayFromLocalStorage(listName);
  //   console.log('loadTaskList tasksArray', tasksArray);
  createTaskList(tasksArray);
}
