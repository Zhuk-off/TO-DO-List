'use strict';
import icon_drag from '../../assets/img/icons/icon_drag.svg';
import icon_del from '../../assets/img/icons/icon_del.png';
import { changeHeightBlock } from '../changeHeightBlock';
import { getTasksBlockElement } from './getElement';
import { storage } from '../storage/storage';
import { getAllTasks } from './getAllTasks';

export function addTask() {
  const newTask = document.createElement('div');
  newTask.classList.add('task-list__task');
  newTask.innerHTML = `<span class="task-list__move-block"><img src=${icon_drag} class="task-list__move-block"></img></span>
    <span class="task-list__checkbox">
      <input type="checkbox" name="task" id="" />
    </span>
    <span class="task-list__task-text"><input class="task-list__task-text" type="text" value=""></span>
  <span class="task-list__management"><img src=${icon_del} class="task-list__del-notes"></img>
  </span>`;
  const taskBlock = getTasksBlockElement();
  taskBlock.append(newTask);
  const input = newTask.querySelector('.task-list__task-text>input');
  input.focus();
  changeHeightBlock();

  return input;
}

export function addTaskEvent() {
  let input = addTask();
  input.addEventListener('blur', saveTask, { once: true });
}

function saveTask() {
  storage.setValueCurrentList(getAllTasks());
}
