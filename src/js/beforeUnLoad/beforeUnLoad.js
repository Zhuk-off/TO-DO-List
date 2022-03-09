import { saveActiveList } from '../lists/saveActiveList';

export function beforeUnLoad() {
  saveActiveList();
}
