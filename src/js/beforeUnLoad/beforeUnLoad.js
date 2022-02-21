import { getAllTasks } from '../task/getAllTasks.js';

export function beforeUnLoad() {
  localStorage.clear();
  getAllTasks();
}
