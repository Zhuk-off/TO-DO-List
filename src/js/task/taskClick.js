// Функция при клике на задачу получает элемент, меняет его состояние
import { changeStatusTask } from './changeStatusTask.js';
import {
  getElementTask,
  getElementCheckbox,
  getElementDelete,
} from './getElement.js';
import { getAllTasks } from './getAllTasks.js';
export function taskClick(event) {
  let target = event.target;
  // let taskElement = getElementTask(target);
  let taskElement = getElementTask(target);
  let isTaskCheckboxElement = getElementCheckbox(target);
  let isTaskDeleteElement = getElementDelete(target);
  if (taskElement == null) {
    return;
  }
  if (isTaskDeleteElement != null) {
    taskElement.remove();
    // return;
  }
  if (isTaskCheckboxElement != null) {
    changeStatusTask(taskElement);
    // return;
  }
  getAllTasks();
}
