import { getTasksArrayFromLocalStorage } from '../localStorage/recordingInLocalStorage.js';
import { delAllTasksElement } from './delAllTasksElement.js';
import { createTaskList } from './createTaskList.js';
import { getElementTaskListBlock } from './getElement.js';

export function updateTaskList(taskListBlock = getElementTaskListBlock()) {
  delAllTasksElement(taskListBlock);
  const tasksArray = getTasksArrayFromLocalStorage();
  // console.log(tasksArray);
  createTaskList(tasksArray);
}
