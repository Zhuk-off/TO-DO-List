import { changeStatusTask } from './changeStatusTask.js';
import { addTask } from './addTask.js';

export function createTaskList(tasksArray) {
  console.log(tasksArray);
  tasksArray.forEach((task) => {
    console.log(task.done, task.textTask);
    addTask();
    const taskList = document.querySelector('.task-list');
    const newTask = taskList.lastChild;
    const textTask = newTask.querySelector('.task-list__task-text>input');
    const checkTask = newTask.querySelector('.task-list__checkbox>input');
    console.log(newTask, textTask, checkTask);
    // textTask.value('task.textTask');
    // console.log(textTask.setAttribute(value, task.textTask));
    // textTask.setAttribute(value, task.textTask);
    textTask.setAttribute('value', task.textTask);
    if (task.done) {
      changeStatusTask(newTask);
    }
    textTask.blur();
  });
}
