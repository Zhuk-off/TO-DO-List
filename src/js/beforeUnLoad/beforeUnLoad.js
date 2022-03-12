import { saveActiveList } from '../lists/saveActiveList';
import { storage } from '../storage/storage';

export function beforeUnLoad() {
  storage.save();
  // saveActiveList();
}
