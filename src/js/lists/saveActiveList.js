import { saveTasksArrayInLocalStorage } from '../localStorage/recordingInLocalStorage';
import { getAllTasks } from '../task/getAllTasks';
import { getNameCurrentList } from './getCurrentList';
import { updateCounterTask } from './updateCounterTask';

export function saveActiveList() {
  let tasksArray = getAllTasks();
  let listName = getNameCurrentList();
  saveTasksArrayInLocalStorage(tasksArray);
  updateCounterTask(listName, tasksArray.length);
}
