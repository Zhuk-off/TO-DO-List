import { storage } from '../storage/storage';
import { createTasks } from '../task/createTaskList';
import { delTasks } from '../task/delAllElement';

export function loadTasksCurrent() {
  delTasks();
  createTasks();
  storage.save();
}
