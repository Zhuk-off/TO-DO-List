'use strict';

// Функции -----------------------------------
// Функция: тестовая на элементе + Add task
function addTask(event) {
  console.log('addTask');
  console.log(task);
}
// Функция: Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Task(задача внутри которой был клик)
function getElementTask(target) {
  if (target.classList.contains('taskList__task')) {
    return target;
  } else {
    for (let i = 0; i < 10; i++) {
      if (target.parentElement !== null) {
        if (target.parentElement.classList.contains('taskList__task')) {
          return target.parentElement;
        }
      } else {
        console.log(target.parentElement.classList.includes('taskList__task'));
        return null;
      }
      target = target.parentElement;
    }
  }
}

// Функция: Меняет статус задачи выполнено-не выполнено
function changeStatusTask(task) {
  if (task != null) {
    let spanCheckBoxTask = task.children[0].children[0];
    task.classList.contains('_done')
      ? spanCheckBoxTask.removeAttribute('checked')
      : spanCheckBoxTask.setAttribute('checked', '');
    task.classList.toggle('_done');
    task.children[0].classList.toggle('_done');
    task.children[1].classList.toggle('_done');
    task.children[2].classList.toggle('_done');
    task.children[2].children[0].classList.toggle('_done');
  }
}

// Функция при клике на задачу получает элемент, меняет его состояние
function taskClick(event) {
  let target = event.target;
  let taskElement = getElementTask(target);
  changeStatusTask(taskElement);
  // getAllTasks();
}

// Функция: собирает данные из списка задач. Выход: архив с объектами задач
function getAllTasks() {
  const taskList = document.querySelectorAll('.taskList__task');
  let tasksArray = [];
  for (let i = 0; i < taskList.length; i++) {
    let taskObject = {};
    const taskHTML = taskList[i];
    const taskText = taskHTML.querySelector('.taskList__taskText');
    const taskCheckbox = taskHTML.querySelector('.taskList__checkbox>input');
    const taskNotes = taskHTML.querySelector('.taskList__notes');
    if (taskCheckbox.outerHTML.includes('checked=""', 0)) {
      taskObject.done = 1;
    } else {
      taskObject.done = 0;
    }
    taskObject.textTask = taskText.innerHTML;
    tasksArray.push(taskObject);
  }
  console.log(tasksArray);
  return tasksArray;
}
// -----------------------------------------------------

// Событие клик на задачу выполнено-не выполнено
// let ball;
let taskListBlock = document.querySelector('.taskList');
taskListBlock.addEventListener('onmousedown', dragDrop);
// taskListBlock.addEventListener('click', taskClick);
// getAllTasks();

// -----------------------------------------------------
// Событие Drag&drop

function dragDrop(event) {
  let target = event.target;
  let taskElement = getElementTask(target);
  // document.removeEventListener('mousemove', onMouseMove);
  // ball = taskElement;
}

// потенциальная цель переноса, над которой мы пролетаем прямо сейчас
let currentDroppable = null;
let pasteUpOrDown;
ball.onmousedown = function onmouseDown(event) {
  // (1) отследить нажатие

  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  // (2) подготовить к перемещению:
  // разместить поверх остального содержимого и в абсолютных координатах
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // переместим в body, чтобы мяч был точно не внутри position:relative
  const taskListTest = document.querySelector('.taskList');

  // document.body.append(ball);
  taskListTest.append(ball);
  // и установим абсолютно спозиционированный мяч под курсор

  moveAt(event.pageX, event.pageY);

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
    // console.log(taskListTest.getBoundingClientRect());
    // console.log(taskListTest.offsetTop);
    console.log(document.documentElement.clientWidth);
    console.log(`высота окна ${document.documentElement.clientHeight}`);
    console.log(`ширина окна ${document.documentElement.clientWidth}`);
    console.log(`pageX  ${pageX}`);
    console.log(`pageY  ${pageY}`);
    if (
      pageX < 0 ||
      pageY < 0 ||
      pageX > document.documentElement.clientWidth ||
      pageY > document.documentElement.clientHeight
    ) {
      console.log(`pageY or pageX < 0`);
      // onmouseupFn();
      onmouseout();
      return;
    }
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    ball.hidden = true; // (*) прячем переносимый элемент
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY); // elemBelow - элемент под мячом (возможная цель переноса)
    ball.hidden = false;

    if (!elemBelow) return; // если clientX/clientY за пределами окна, то выдает null - игнорирует
    let elemBelowParent = elemBelow.closest('.taskList__task');

    if (!elemBelowParent) return; //если clientX/clientY за пределами блока, то выдает null - игнорирует

    // console.log(`top ${elemBelowParent.getBoundingClientRect().top}`);
    // console.log(`bottom ${elemBelowParent.getBoundingClientRect().bottom}`);
    // console.log(`elemBelow ${elemBelowParent.tagName}`);
    // console.log(`координаты по Y ${event.clientY}`);
    let сoordinatesOfTheCursor = event.clientY;
    let positionCenterElemBelow =
      (elemBelowParent.getBoundingClientRect().bottom -
        elemBelowParent.getBoundingClientRect().top) /
        2 +
      elemBelowParent.getBoundingClientRect().top;
    // console.log(`предельные координаты по Y ${positionCenterElemBelow}`);
    // событие mousemove может произойти и когда указатель за пределами окна
    // (мяч перетащили за пределы экрана)

    // потенциальные цели переноса помечены классом droppable (может быть и другая логика)
    let droppableBelow = elemBelow.closest('.taskList__task');

    сoordinatesOfTheCursor >= positionCenterElemBelow
      ? (pasteUpOrDown = 'pasteDown')
      : (pasteUpOrDown = 'pasteUp');
    console.log(pasteUpOrDown);
    console.log(elemBelowParent);

    if (pasteUpOrDown == 'pasteDown') {
      elemBelowParent.classList.remove('_underUpDropElement');
      elemBelowParent.classList.add('_underDownDropElement');
    }
    if (pasteUpOrDown == 'pasteUp') {
      elemBelowParent.classList.remove('_underDownDropElement');
      elemBelowParent.classList.add('_underUpDropElement');
    }

    if (currentDroppable != droppableBelow) {
      // мы либо залетаем на цель, либо улетаем из неё
      // внимание: оба значения могут быть null
      //   currentDroppable=null,
      //     если мы были не над droppable до этого события (например, над пустым пространством)
      //   droppableBelow=null,
      //     если мы не над droppable именно сейчас, во время этого события

      if (currentDroppable) {
        // elemBelow.classList.remove('_underDownDropElement');
        // elemBelow.classList.remove('_underUpDropElement');
        // null если мы были не над droppable до этого события
        // (например, над пустым пространством)
        // логика обработки процесса "вылета" из droppable (удаляем подсветку)
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;

      if (currentDroppable) {
        // логика обработки процесса, когда мы "влетаем" в элемент droppable
        enterDroppable(currentDroppable);
      }
    }
  }

  ball.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
    ball.removeAttribute('style'); // удаляем стили, с помщью которых div висел над элементами
    const taskList = document.querySelector('.taskList');
    const underUpDropElement = document.querySelector('._underUpDropElement');
    const underDownDropElement = document.querySelector(
      '._underDownDropElement'
    );
    if (underDownDropElement == null && underUpDropElement == null) {
      taskList.append(ball);
    }

    if (underDownDropElement != null) {
      underDownDropElement.after(ball);
    }

    if (underUpDropElement != null) {
      underUpDropElement.before(ball);
    }

    leaveDroppable(currentDroppable);
  };
  // (3) перемещать по экрану
  document.addEventListener('mousemove', onMouseMove);

  // (4) положить мяч, удалить более ненужные обработчики событий

  function enterDroppable(elem) {}

  function leaveDroppable(elem) {
    elem.classList.remove('_underUpDropElement');
    elem.classList.remove('_underDownDropElement');
  }

  // отключаеп браузерный Drag’n’Drop
  ball.ondragstart = function () {
    return false;
  };

  function onmouseout() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
    ball.removeAttribute('style'); // удаляем стили, с помщью которых div висел над элементами
    const taskList = document.querySelector('.taskList');
    taskList.append(ball);
    leaveDroppable(currentDroppable);
  }
};
