import { getTasksArrayFromLocalStorage } from '../localStorage/recordingInLocalStorage.js';
import { delAllTasksElement } from './delAllTasksElement.js';
import { createTaskList } from './createTaskList.js';

export function updateTaskList(taskListBlock) {
  delAllTasksElement(taskListBlock);
  const tasksArray = getTasksArrayFromLocalStorage();
  createTaskList(tasksArray);
}
