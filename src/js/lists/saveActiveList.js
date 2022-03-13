import { storage } from '../storage/storage';
import { getAllTasks } from '../task/getAllTasks';
import { updateCounterTask } from './updaterDetails';

export function saveActiveList() {
  const tasks = getAllTasks();
  storage.setValueCurrentList(tasks);
  updateCounterTask(storage.getListNameCurrent());
  // storage.save();
}
