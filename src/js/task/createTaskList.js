import { changeStatusTask } from './changeStatusTask.js';
import { addTask } from './addTask.js';
import { changeHeightBlock } from '../changeHeightBlock.js';
import { addList } from '../lists/addList.js';
import { setActiveListName } from '../lists/setActive.js';
import { getTasksBlockElement } from './getElement.js';
import { storage } from '../storage/storage.js';

export function createTasks() {
  let allTasks = storage.getValueCurrentList();
  if (allTasks != undefined) {
    allTasks.forEach((task) => {
      addTask();
      const taskBlock = getTasksBlockElement();
      const newTask = taskBlock.lastChild;
      const textTask = newTask.querySelector('.task-list__task-text>input');
      textTask.setAttribute('value', task.textTask);
      if (task.done) {
        changeStatusTask(newTask);
      }
      textTask.blur();
      changeHeightBlock();
    });
  }
}

export function createLists() {
  const lists = storage.getStorage();
  const listNameCurrent = storage.getListNameCurrent();
  if (lists.size != 0) {
    lists.forEach((value, key, lists) => {
      const tasks = value;
      const litsName = key;
      const counterTask = tasks.length;
      addList(litsName, counterTask);
      if (listNameCurrent === litsName) {
        setActiveListName(litsName);
      }
    });
  }
}
