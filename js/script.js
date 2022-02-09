'use strict';

// Функции -----------------------------------
// Функция: добавить новую задачу 'Add task'
function addTask(event) {
  const newTask = document.createElement('div');
  newTask.classList.add('taskList__task');
  newTask.innerHTML = `<span class="taskList__moveBlock"><img src="/img/icons/icon_drag.svg" class="taskList__moveBlock"></img></span>
  <span class="taskList__checkbox">
    <input type="checkbox" name="task" id="" />
  </span>
  <span class="taskList__taskText"><input class="taskList__taskText" type="text" value=""></span>
<span class="taskList__management"><img src="/img/icons/icon_del.png" class="taskList__delNotes"></img>
</span>`;
  const taskList = document.querySelector('.taskList');
  taskList.append(newTask);
  const input = newTask.querySelector('.taskList__taskText>input');
  input.focus();
  taskListBlock = document.querySelector('.taskList');
  return newTask;
}

// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Task(задача внутри которой был клик)
function getElementTask(target) {
  let ElementTask = target.closest('.taskList__task');
  return ElementTask;
}
// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Checkbox(checkbox внутри которой был клик)
function getElementCheckbox(target) {
  let ElementCheckbox = target.closest('.taskList__checkbox');
  return ElementCheckbox;
}
// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Checkbox(checkbox внутри которой был клик)
function getElementDelete(target) {
  let elementDelete = target.closest('.taskList__delNotes');
  return elementDelete;
}

// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Checkbox(checkbox внутри которой был клик)
function getElementMove(target) {
  let elementMove = target.closest('.taskList__moveBlock');
  return elementMove;
}

// Функция: Меняет статус задачи выполнено-не выполнено
function changeStatusTask(task) {
  if (task != null) {
    let spanCheckBoxTask = task.children[1].children[0];
    task.classList.contains('_done')
      ? spanCheckBoxTask.removeAttribute('checked')
      : spanCheckBoxTask.setAttribute('checked', '');
    task.classList.toggle('_done');
    task.children[0].classList.toggle('_done');
    task.children[1].classList.toggle('_done');
    task.children[2].classList.toggle('_done');
    task.children[2].children[0].classList.toggle('_done');
  } else {
    console.log('changeStatusTask(null)');
  }
}

// Функция при клике на задачу получает элемент, меняет его состояние
function taskClick(event) {
  let target = event.target;
  let taskElement = getElementTask(target);
  let isTaskCheckboxElement = getElementCheckbox(target);
  let isTaskDeleteElement = getElementDelete(target);
  if (taskElement == null) {
    return;
  }
  if (isTaskDeleteElement != null) {
    taskElement.remove();
    // return;
  }
  if (isTaskCheckboxElement != null) {
    changeStatusTask(taskElement);
    // return;
  }
  getAllTasks();
}

// Функция Drag & Drop
function dragDrop(event) {
  let target = event.target;
  let taskElement = getElementTask(target);
  let isTaskMoveElement = getElementMove(target);
  if (isTaskMoveElement == null || taskElement == null) {
    return;
  }

  let coordsItemX = event.clientX - taskElement.getBoundingClientRect().left;
  let coordsItemY = event.clientY - taskElement.getBoundingClientRect().top;

  let taskElementSizes = {
    width: taskElement.offsetWidth,
    height: taskElement.offsetHeight,
  };

  let taskListBlockSizes = {
    left: taskListBlock.getBoundingClientRect().left + scrollX,
    top: taskListBlock.getBoundingClientRect().top + scrollY,
    right:
      taskListBlock.getBoundingClientRect().left +
      scrollX +
      taskListBlock.offsetWidth,
    bottom:
      taskListBlock.getBoundingClientRect().top +
      scrollY +
      taskListBlock.offsetHeight,
  };

  taskElement.style.position = 'absolute';
  taskElement.style.zIndex = 1000;
  taskElement.style.border = '1px solid #c6c6c6';
  taskElement.style.opacity = 0.75;
  document.body.append(taskElement);

  moveTaskElement(event.pageX, event.pageY);

  function moveTaskElement(pageX, pageY) {
    let currentX = pageX - coordsItemX;
    let currentY = pageY - coordsItemY;

    if (
      currentX + taskElementSizes.width <= taskListBlockSizes.right &&
      currentX >= taskListBlockSizes.left
    ) {
      taskElement.style.left = `${currentX}px`;
    } else {
      if (currentX + taskElementSizes.width > taskListBlockSizes.right) {
        taskElement.style.left = `${
          taskListBlockSizes.right - taskElementSizes.width
        }px`;
      }
      if (currentX < taskListBlockSizes.left) {
        taskElement.style.left = `${taskListBlockSizes.left}px`;
      }
    }
    if (
      currentY + taskElementSizes.height <= taskListBlockSizes.bottom &&
      currentY >= taskListBlockSizes.top
    ) {
      taskElement.style.top = `${currentY}px`;
    } else {
      if (currentY + taskElementSizes.height > taskListBlockSizes.bottom) {
        taskElement.style.top = `${
          taskListBlockSizes.bottom - taskElementSizes.height
        }px`;
      }
      if (currentY < taskListBlockSizes.top) {
        taskElement.style.top = `${taskListBlockSizes.top}px`;
      }
    }
  }

  let currentDroppable = null;

  function onDragTaskElement(event) {
    moveTaskElement(event.pageX, event.pageY);

    taskElement.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    taskElement.hidden = false;

    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest('.taskList__task');

    if (!droppableBelow) return; //если clientX/clientY за пределами блока, то выдает null - игнорирует

    // вычисления, для выбора подсветки droppableBelow исходя из пложения taskelement
    let pasteUpOrDown;
    let сoordinatesOfTheCursor = event.clientY;
    let positionCenterElemBelow =
      (droppableBelow.getBoundingClientRect().bottom -
        droppableBelow.getBoundingClientRect().top) /
        2 +
      droppableBelow.getBoundingClientRect().top;

    сoordinatesOfTheCursor >= positionCenterElemBelow
      ? (pasteUpOrDown = 'pasteDown')
      : (pasteUpOrDown = 'pasteUp');

    console.log(pasteUpOrDown);

    if (pasteUpOrDown == 'pasteDown') {
      if (!droppableBelow.classList.contains('_underDownDropElement')) {
        droppableBelow.classList.remove('_underUpDropElement');
        droppableBelow.classList.add('_underDownDropElement');
      }
    }
    if (pasteUpOrDown == 'pasteUp') {
      if (!droppableBelow.classList.contains('_underUpDropElement')) {
        droppableBelow.classList.remove('_underDownDropElement');
        droppableBelow.classList.add('_underUpDropElement');
      }
    }

    if (currentDroppable !== droppableBelow) {
      if (currentDroppable) {
        cleanStyleDroppableBelow(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        cleanStyleDroppableBelow(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onDragTaskElement);

  document.addEventListener('mouseup', mouseUp, { once: true });

  function mouseUp() {
    document.removeEventListener('mousemove', onDragTaskElement);

    taskElement.removeAttribute('style');
    const underUpDropElement = document.querySelector('._underUpDropElement');
    const underDownDropElement = document.querySelector(
      '._underDownDropElement'
    );
    if (underDownDropElement == null && underUpDropElement == null) {
      taskListBlock.append(taskElement);
    }

    if (underDownDropElement != null) {
      underDownDropElement.after(taskElement);
    }

    if (underUpDropElement != null) {
      underUpDropElement.before(taskElement);
    }

    cleanStyleDroppableBelow(currentDroppable);
  }

  function cleanStyleDroppableBelow(elem) {
    if (elem == null) {
      return;
    }
    elem.classList.remove('_underUpDropElement');
    elem.classList.remove('_underDownDropElement');
  }

  taskElement.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });
}

// Функция: собирает данные из списка задач. Выход: архив с объектами задач
function getAllTasks() {
  const taskList = document.querySelectorAll('.taskList__task');
  let tasksArray = [];
  for (let i = 0; i < taskList.length; i++) {
    let taskObject = {};
    const taskHTML = taskList[i];
    const taskTextElement = taskHTML.querySelector('.taskList__taskText>input');
    const taskText = taskTextElement.value;
    const taskCheckbox = taskHTML.querySelector('.taskList__checkbox>input');
    // if (taskCheckbox.outerHTML.includes('checked=""', 0)) {
    if (taskCheckbox.hasAttribute('checked')) {
      taskObject.done = 1;
    } else {
      taskObject.done = 0;
    }
    taskObject.textTask = taskText;
    tasksArray.push(taskObject);
  }
  saveTasksArrayInLocalStorage(tasksArray);
  console.log(tasksArray);
  return tasksArray;
}

function saveTasksArrayInLocalStorage(tasksArray) {
  let tasksArrayJson = JSON.stringify(tasksArray);
  localStorage.setItem('listToday', tasksArrayJson);
}

function getTasksArrayFromLocalStorage() {
  const tasksArrayJson = localStorage.getItem('listToday');
  const tasksArray = JSON.parse(tasksArrayJson);
  return tasksArray;
}

function delAllTasksElement(taskListBlock) {
  // console.log(
  //   taskListBlock,
  //   taskListBlock.firstElementChild,
  //   taskListBlock.children.length
  // );
  const numberTasks = taskListBlock.children.length;
  for (let i = 0; i < numberTasks; i++) {
    taskListBlock.firstElementChild.remove();
  }
}

function createTaskList(tasksArray) {
  console.log(tasksArray);
  tasksArray.forEach((task) => {
    console.log(task.done, task.textTask);
    addTask();
    const taskList = document.querySelector('.taskList');
    const newTask = taskList.lastChild;
    const textTask = newTask.querySelector('.taskList__taskText>input');
    const checkTask = newTask.querySelector('.taskList__checkbox>input');
    console.log(newTask, textTask, checkTask);
    // textTask.value('task.textTask');
    // console.log(textTask.setAttribute(value, task.textTask));
    // textTask.setAttribute(value, task.textTask);
    textTask.setAttribute('value', task.textTask);
    if (task.done) {
      changeStatusTask(newTask);
    }
    textTask.blur();
  });
}

function updateTaskList(taskListBlock) {
  delAllTasksElement(taskListBlock);
  const tasksArray = getTasksArrayFromLocalStorage();
  createTaskList(tasksArray);
}

function beforeUnLoad() {
  localStorage.clear();
  getAllTasks();
}
// -----------------------------------------------------

// Событие клик на задачу выполнено-не выполнено
let taskListBlock = document.querySelector('.taskList');
let addTaskBlock = document.querySelector('.taskBlock__addTask');
// console.log(taskListBlock);
// console.log(`querySelector ${taskListBlock}`);
addTaskBlock.addEventListener('click', addTask);
// console.log(`afdter addTask ${taskListBlock}`);
taskListBlock.addEventListener('mousedown', dragDrop);
taskListBlock.addEventListener('click', taskClick);
taskListBlock.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    addTask();
  }
});
window.addEventListener('beforeunload', beforeUnLoad);
// let tasksArray = getAllTasks();
// let tasksArrayJson = JSON.stringify(tasksArray);
// localStorage.setItem('listToday', tasksArrayJson);
// console.log(getTasksArrayFromLocalStorage());
updateTaskList(taskListBlock);
// console.log(getAllTasks());
