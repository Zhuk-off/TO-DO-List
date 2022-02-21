function saveTasksArrayInLocalStorage(tasksArray) {
  let tasksArrayJson = JSON.stringify(tasksArray);
  localStorage.setItem('listToday', tasksArrayJson);
}

function getTasksArrayFromLocalStorage() {
  try {
    const tasksArrayJson = localStorage.getItem('listToday');
    const tasksArray = JSON.parse(tasksArrayJson);
    return tasksArray;
  } catch (error) {
    tasksArray = [];
    console.log('localStorage.getItem("listToday") not found', error);
    return tasksArray;
  }
}

export { saveTasksArrayInLocalStorage, getTasksArrayFromLocalStorage };
