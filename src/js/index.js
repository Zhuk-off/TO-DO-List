'use strict';
import '@babel/polyfill';
import { dragDrop } from './dragDrop/dragDrop.js';
import { addTask, addTaskEvent } from './task/addTask.js';
import {
  getElementTaskListBlock,
  getElementAddTaskBlock,
  getElementTask,
  getTasksBlockElement,
  getListsBlockElement,
  getAddListElement,
  getAddTaskElement,
} from './task/getElement.js';
import { taskClick } from './task/taskClick.js';
import { loadListsAndTasks, updateTaskList } from './task/loadListsAndTasks.js';
import { beforeUnLoad } from './beforeUnLoad/beforeUnLoad.js';
// import '../styles/generalStyles/css/style.css';
// import Icon from '../assets/img/bg.jpg';
import html from '../index.html';
import '../styles/generalStyles/scss/style.scss';
import { changeHeightBlock } from './changeHeightBlock.js';
import { setActive, setActiveListName } from './lists/setActive.js';
import { getCurrentList, getNameCurrentList } from './lists/getCurrentList.js';
// import { getTasksFromList, saveOrdertLists } from './lists/listsObject.js';
import { addListByClick } from './lists/addList.js';
import { storage } from './storage/storage.js';

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
