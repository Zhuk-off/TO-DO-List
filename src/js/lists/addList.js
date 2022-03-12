import icon_drag from '../../assets/img/icons/icon_drag.svg';
import { storage } from '../storage/storage';
import { getListsBlockElement } from '../task/getElement';
import { saveActiveList } from './saveActiveList';
import { setActiveListName } from './setActive';

export function addList(litsName, counterTask) {
  const newList = document.createElement('div');
  newList.classList.add('lists-block__item');
  newList.innerHTML = `<div class="lists-block__icon"><img src=${icon_drag} alt=""
      class="lists-block__icon-img"/>  </div>  <div class="lists-block__list-title"> 
      <span>${litsName}</span></div>
      <div class="lists-block__count-undone-task"><span>${counterTask}</span></div></div>`;
  const listBlock = getListsBlockElement();
  listBlock.append(newList);
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
  listBlock.lastChild.remove();
  addList(listName, 0);
  setActiveListName(listName);
  let tasks = [];
  storage.setValue(listName, tasks);
  storage.save();
}

function pressEnter(event) {
  if (event.code === 'Enter') {
    updateListsBlock();
  }
}
