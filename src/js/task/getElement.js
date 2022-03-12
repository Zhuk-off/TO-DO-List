// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Task(задача внутри которой был клик)
function getElementTask(target) {
  let ElementTask = target.closest('.task-list__task');
  return ElementTask;
}
// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Checkbox(checkbox внутри которой был клик)
function getElementCheckbox(target) {
  let ElementCheckbox = target.closest('.task-list__checkbox');
  return ElementCheckbox;
}
// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Checkbox(checkbox внутри которой был клик)
function getElementDelete(target) {
  let elementDelete = target.closest('.task-list__del-notes');
  return elementDelete;
}

function getElementInput(target) {
  let elementInput = target.closest('.task-list__task-text>input');
  return elementInput;
}

// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Checkbox(checkbox внутри которой был клик)
function getElementMove(target) {
  let elementMove = target.closest('.task-list__move-block');
  return elementMove;
}

function getElementBySelector(selector) {
  let taskListBlock = document.querySelector(selector);
  return taskListBlock;
}

function getAddTaskElement() {
  const selector = '.task-block__add-task';
  return getElementBySelector(selector);
}

function getAddListElement() {
  const selector = '.add-list__link';
  return getElementBySelector(selector);
}

function getTasksBlockElement() {
  const selector = '.task-list';
  return getElementBySelector(selector);
}
function getListsBlockElement() {
  const selector = '.lists-block';
  return getElementBySelector(selector);
}

export {
  getElementTask,
  getElementCheckbox,
  getElementDelete,
  getElementMove,
  getAddTaskElement,
  getTasksBlockElement,
  getListsBlockElement,
  getAddListElement,
  getElementInput,
};
