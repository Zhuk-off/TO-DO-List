// Функция при клике на задачу получает элемент, меняет его состояние
import { changeStatusTask } from './changeStatusTask.js';
import {
  getElementTask,
  getElementCheckbox,
  getElementDelete,
  getElementInput,
} from './getElement.js';
import { changeHeightBlock } from '../changeHeightBlock.js';
import { saveActiveList } from '../lists/saveActiveList.js';
import { storage } from '../storage/storage.js';
import { getAllTasks } from './getAllTasks.js';
import { updateCounterTask } from '../lists/updaterDetails.js';

export function taskClick(event) {
  let target = event.target;
  let taskElement = getElementTask(target);
  let isTaskCheckboxElement = getElementCheckbox(target);
  let isTaskDeleteElement = getElementDelete(target);
  let isTaskInputElement = getElementInput(target);
  if (taskElement == null) {
    return;
  }
  if (isTaskDeleteElement != null) {
    taskElement.remove();
    changeHeightBlock();
    // updateCounterTask(storage.getListNameCurrent());
    // return;
  }
  if (isTaskCheckboxElement != null) {
    changeStatusTask(taskElement);
    // updateCounterTask(storage.getListNameCurrent());
    // return;
  }

  if (isTaskInputElement != null) {
    const input = taskElement.querySelector('.task-list__task-text>input');
    input.focus();
    input.addEventListener('blur', saveTask, { once: true });
  }

  saveActiveList();
}

function saveTask() {
  storage.setValueCurrentList(getAllTasks());
  updateCounterTask(storage.getListNameCurrent());
}
