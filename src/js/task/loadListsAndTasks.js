import { delLists, delTasks } from './delAllElement.js';
import { createLists, createTasks } from './createTaskList.js';
import { storage } from '../storage/storage.js';

export function loadListsAndTasks() {
  storage.load();
  delLists();
  createLists();
  createTasks();
}
