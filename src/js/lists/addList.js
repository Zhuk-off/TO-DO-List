import icon_drag from '../../assets/img/icons/icon_drag.svg';
import { storage } from '../storage/storage';
import { delTasks } from '../task/delAllElement';
import { getListsBlockElement } from '../task/getElement';
import { saveActiveList } from './saveActiveList';
import { setActiveListName } from './setActive';
import { updateCounterTask } from './updaterDetails';

export function addList(litsName) {
  const newList = document.createElement('div');
  newList.classList.add('lists-block__item');
  newList.innerHTML = `<div class="lists-block__icon"><img src=${icon_drag} alt=""
      class="lists-block__icon-img"/>  </div>  <div class="lists-block__list-title"> 
      <span>${litsName}</span></div>
      <div class="lists-block__count-undone-task"><span>0</span></div></div>`;
  const listBlock = getListsBlockElement();
  listBlock.append(newList);
  updateCounterTask(litsName);
  return newList;
}

export function addListByClick(event) {
  const newList = document.createElement('div');
  newList.classList.add('lists-block__item');
  newList.innerHTML = `<div class="lists-block__icon"><img src=${icon_drag} alt=""
      class="lists-block__icon-img"/>  </div>  <div class="lists-block__list-title"> 
      <span><input class="lists-block__list-text" type="text" value=""></span></div>
      `;
  const listBlock = getListsBlockElement();
  listBlock.append(newList);

  let input = newList.querySelector('.lists-block__list-text');
  input.focus();
  input.addEventListener('blur', updateListsBlock);
  input.addEventListener('keyup', pressEnter);
  // input.addEventListener('blur', updateListsBlock, { once: true });
  // input.addEventListener('keyup', pressEnter, { once: true });
}

function updateListsBlock() {
  const listBlock = getListsBlockElement();
  let input = listBlock.querySelector('.lists-block__list-text');

  input.removeEventListener('blur', updateListsBlock);
  input.removeEventListener('keyup', pressEnter);

  const listName = input.value;

  let tasks = [];
  storage.setValue(listName, tasks);
  storage.save();

  listBlock.lastChild.remove();
  addList(listName);
  setActiveListName(listName);
  delTasks();
}

function pressEnter(event) {
  if (event.code === 'Enter') {
    updateListsBlock();
  }
}
