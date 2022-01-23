'use strict';

// Нажитие на  + Add task
const task = document.querySelector('.taskBlock__linkAddTask');
task.addEventListener('click', addTask);
// Функция на  + Add task
function addTask(event) {
  console.log('addTask');
  console.log(task);
}

// Вход: элемент на который кликнули в taskBlock. Выход: родительский элемент Task(задача внутри которой был клик)
function getElementTask(target) {
  if (
    target.className == 'taskList__task' ||
    target.className == 'taskList__task _done'
  ) {
    return target;
  } else {
    for (let i = 0; i < 10; i++) {
      if (target.parentElement !== null) {
        if (
          target.parentElement.classList == 'taskList__task' ||
          target.parentElement.classList == 'taskList__task _done'
        ) {
          return target.parentElement;
        }
      } else {
        return null;
      }
      target = target.parentElement;
    }
  }
}

// Меняет статус задачи выполнено-не выполнено
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

let taskBlock = document.querySelector('.taskBlock');
taskBlock.addEventListener('click', taskClick);

function taskClick(event) {
  let target = event.target;
  let taskElement = getElementTask(target);
  changeStatusTask(taskElement);
}
// let taskObject = {};
// taskObject.done = 0;
// console.log(taskObject);
getAllTasks();

// собирает данные из списка задач. Выход: архив с объектами задач
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
  // console.log(tasksArray);
  return tasksArray;
}

// // собирает данные из списка задач
// function getAllTasks() {
//   const taskList = document.querySelectorAll('.taskList__task');
//   // console.log(taskList.length);
//   for (let i = 0; i < taskList.length; i++) {
//     const task = taskList[i];
//     const taskText = task.querySelector('.taskList__taskText');
//     const taskCheckbox = task.querySelector('.taskList__checkbox>input');
//     const taskNotes = task.querySelector('.taskList__notes');
//     //   taskText.innerHTML = 'Живи, а работай в свободное время!';
//     console.log(taskCheckbox.outerHTML);
//     if (taskCheckbox.outerHTML.includes('checked=""', 0)) {
//       console.log('выполнено');
//       taskCheckbox.removeAttribute('checked');
//       taskText.classList.remove('_done');
//       // taskText.classList.toggle('_done');
//     } else {
//       console.log('не выполнено');
//       taskCheckbox.setAttribute('checked', '');
//       taskText.classList.toggle('_done');
//     }
//     console.log(taskText.innerHTML);
//   }
// }
