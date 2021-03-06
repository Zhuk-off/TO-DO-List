import { getNameCurrentList } from '../lists/getList.js';
// import { saveTasksArrayInLocalStorage } from '../localStorage/recordingInLocalStorage.js';

export function getAllTasks() {
  const taskList = document.querySelectorAll('.task-list__task');
  let tasksArray = [];
  for (const task of taskList) {
    let taskObject = {};
    const taskHTML = task;
    const taskTextElement = taskHTML.querySelector(
      '.task-list__task-text>input'
    );
    const taskText = taskTextElement.value;
    const taskCheckbox = taskHTML.querySelector('.task-list__checkbox>input');
    if (taskCheckbox.hasAttribute('checked')) {
      taskObject.done = 1;
    } else {
      taskObject.done = 0;
    }
    taskObject.textTask = taskText;
    taskObject.listName = getNameCurrentList();
    tasksArray.push(taskObject);
  }
  return tasksArray;
}
