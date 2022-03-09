import { changeStatusTask } from './changeStatusTask.js';
import { addTask } from './addTask.js';
import { changeHeightBlock } from '../changeHeightBlock.js';

export function createTaskList(tasksArray) {
  if (tasksArray) {
    tasksArray.forEach((task) => {
      addTask();
      const taskList = document.querySelector('.task-list');
      const newTask = taskList.lastChild;
      const textTask = newTask.querySelector('.task-list__task-text>input');
      const checkTask = newTask.querySelector('.task-list__checkbox>input');
      textTask.setAttribute('value', task.textTask);
      if (task.done) {
        changeStatusTask(newTask);
      }
      textTask.blur();
      changeHeightBlock();
    });
  }
}
