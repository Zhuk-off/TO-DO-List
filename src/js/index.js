'use strict';
import '@babel/polyfill';
import { dragDrop } from './dragDrop/dragDrop.js';
import { addTaskEvent } from './task/addTask.js';
import {
  getTasksBlockElement,
  getListsBlockElement,
  getAddListElement,
  getAddTaskElement,
} from './task/getElement.js';
import { taskClick } from './task/taskClick.js';
import { loadListsAndTasks, updateTaskList } from './task/loadListsAndTasks.js';
import { beforeUnLoad } from './beforeUnLoad/beforeUnLoad.js';
import '../styles/generalStyles/scss/style.scss';
import { setActive, setActiveListName } from './lists/setActive.js';
import { addListByClick } from './lists/addList.js';

// localStorage.clear();
const taskBlock = getTasksBlockElement();
const listBlock = getListsBlockElement();
const addToTaskBlock = getAddTaskElement();
const addToListBlock = getAddListElement();

listBlock.addEventListener('click', setActive);

addToTaskBlock.addEventListener('click', addTaskEvent);
addToListBlock.addEventListener('click', addListByClick);

taskBlock.addEventListener('click', taskClick);
taskBlock.addEventListener('mousedown', dragDrop);
taskBlock.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    addTaskEvent();
  }
});
window.addEventListener('beforeunload', beforeUnLoad);
loadListsAndTasks();
