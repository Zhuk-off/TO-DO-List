'use strict';
import '@babel/polyfill';
import { dragDrop } from './dragDrop/dragDrop.js';
import { addTask } from './task/addTask.js';
import {
  getElementTaskListBlock,
  getElementAddTaskBlock,
  getElementTask,
} from './task/getElement.js';
import { taskClick } from './task/taskClick.js';
import { updateTaskList } from './task/updateTaskList.js';
import { beforeUnLoad } from './beforeUnLoad/beforeUnLoad.js';
// import '../styles/generalStyles/css/style.css';
// import Icon from '../assets/img/bg.jpg';
import html from '../index.html';
import '../styles/generalStyles/scss/style.scss';
import { changeHeightBlock } from './changeHeightBlock.js';
import { setActive, setActiveListName } from './lists/setActive.js';
import { getCurrentList, getNameCurrentList } from './lists/getCurrentList.js';

let taskListBlock = getElementTaskListBlock();
let listBlock = getElementTaskListBlock('.lists-block');
let addTaskBlock = getElementAddTaskBlock();
let addListBlock = getElementAddTaskBlock('.add-list__link');

listBlock.addEventListener('click', setActive);

addTaskBlock.addEventListener('click', addTask);
taskListBlock.addEventListener('mousedown', dragDrop);
taskListBlock.addEventListener('click', taskClick);
taskListBlock.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    addTask();
  }
});
window.addEventListener('beforeunload', beforeUnLoad);

// let listsBlockElement = document.querySelector('.lists-block');
// console.log(listsBlockElement);
// console.log(taskListBlock);
updateTaskList(taskListBlock);

// setActiveListName('Не важные дела');
// getNameCurrentList();
