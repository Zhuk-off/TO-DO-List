export function delAllTasksElement(taskListBlock) {
  const numberTasks = taskListBlock.children.length;
  for (let i = 0; i < numberTasks; i++) {
    taskListBlock.firstElementChild.remove();
  }
}
