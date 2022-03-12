import { storage } from '../storage/storage';
import { getAllTasks } from '../task/getAllTasks';

export function saveActiveList() {
  const tasks = getAllTasks();
  storage.setValueCurrentList(tasks);
  // storage.save();
}
