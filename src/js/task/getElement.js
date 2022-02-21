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

// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Checkbox(checkbox внутри которой был клик)
function getElementMove(target) {
  let elementMove = target.closest('.task-list__move-block');
  return elementMove;
}

function getElementBySelector(selector) {
  let taskListBlock = document.querySelector(selector);
  return taskListBlock;
}

function getElementAddTaskBlock(selector = '.task-block__add-task') {
  return getElementBySelector(selector);
}

function getElementTaskListBlock(selector = '.task-list') {
  return getElementBySelector(selector);
}

export {
  getElementTask,
  getElementCheckbox,
  getElementDelete,
  getElementMove,
  getElementAddTaskBlock,
  getElementTaskListBlock,
};
