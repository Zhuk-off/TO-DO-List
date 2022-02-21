export function changeStatusTask(task) {
  if (task != null) {
    let spanCheckBoxTask = task.children[1].children[0];
    task.classList.contains('_done')
      ? spanCheckBoxTask.removeAttribute('checked')
      : spanCheckBoxTask.setAttribute('checked', '');
    task.classList.toggle('_done');
    task.children[0].classList.toggle('_done');
    task.children[1].classList.toggle('_done');
    task.children[2].classList.toggle('_done');
    task.children[2].children[0].classList.toggle('_done');
  } else {
    console.log('changeStatusTask(null)');
  }
}
