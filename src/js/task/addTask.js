'use strict';
import icon_drag from '../../assets/img/icons/icon_drag.svg';
import icon_del from '../../assets/img/icons/icon_del.png';
import { changeHeightBlock } from '../changeHeightBlock';

// Функция: добавить новую задачу 'Add task'
export function addTask(event) {
  const newTask = document.createElement('div');
  newTask.classList.add('task-list__task');
  newTask.innerHTML = `<span class="task-list__move-block"><img src=${icon_drag} class="task-list__move-block"></img></span>
    <span class="task-list__checkbox">
      <input type="checkbox" name="task" id="" />
    </span>
    <span class="task-list__task-text"><input class="task-list__task-text" type="text" value=""></span>
  <span class="task-list__management"><img src=${icon_del} class="task-list__del-notes"></img>
  </span>`;
  const taskList = document.querySelector('.task-list');
  taskList.append(newTask);
  const input = newTask.querySelector('.task-list__task-text>input');
  input.focus();
  const taskListBlock = document.querySelector('.task-list');
  changeHeightBlock();
  return newTask;
}
