'use strict';
import { dragDrop } from './dragDrop/dragDrop.js';
import { addTask } from './task/addTask.js';
import {
  getElementTaskListBlock,
  getElementAddTaskBlock,
} from './task/getElement.js';
import { taskClick } from './task/taskClick.js';
import { updateTaskList } from './task/updateTaskList.js';
import { beforeUnLoad } from './beforeUnLoad/beforeUnLoad.js';

let taskListBlock = getElementTaskListBlock();
let addTaskBlock = getElementAddTaskBlock();
addTaskBlock.addEventListener('click', addTask);
taskListBlock.addEventListener('mousedown', dragDrop);
taskListBlock.addEventListener('click', taskClick);
taskListBlock.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    addTask();
  }
});
window.addEventListener('beforeunload', beforeUnLoad);
updateTaskList(taskListBlock);
