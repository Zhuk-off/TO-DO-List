'use strict';
import {
  getElementTask,
  getElementMove,
  getElementTaskListBlock,
} from '../task/getElement.js';

export function dragDrop(event) {
  let taskListBlock = getElementTaskListBlock();
  let target = event.target;
  let taskElement = getElementTask(target);
  let isTaskMoveElement = getElementMove(target);
  if (isTaskMoveElement == null || taskElement == null) {
    return;
  }

  let coordsItemX = event.clientX - taskElement.getBoundingClientRect().left;
  let coordsItemY = event.clientY - taskElement.getBoundingClientRect().top;

  let taskElementSizes = {
    width: taskElement.offsetWidth,
    height: taskElement.offsetHeight,
  };

  let taskListBlockSizes = {
    left: taskListBlock.getBoundingClientRect().left + scrollX,
    top: taskListBlock.getBoundingClientRect().top + scrollY,
    right:
      taskListBlock.getBoundingClientRect().left +
      scrollX +
      taskListBlock.offsetWidth,
    bottom:
      taskListBlock.getBoundingClientRect().top +
      scrollY +
      taskListBlock.offsetHeight,
  };

  taskElement.style.position = 'absolute';
  taskElement.style.zIndex = 1000;
  taskElement.style.border = '1px solid #c6c6c6';
  taskElement.style.opacity = 0.75;
  document.body.append(taskElement);

  moveTaskElement(event.pageX, event.pageY);

  function moveTaskElement(pageX, pageY) {
    let currentX = pageX - coordsItemX;
    let currentY = pageY - coordsItemY;

    if (
      currentX + taskElementSizes.width <= taskListBlockSizes.right &&
      currentX >= taskListBlockSizes.left
    ) {
      taskElement.style.left = `${currentX}px`;
    } else {
      if (currentX + taskElementSizes.width > taskListBlockSizes.right) {
        taskElement.style.left = `${
          taskListBlockSizes.right - taskElementSizes.width
        }px`;
      }
      if (currentX < taskListBlockSizes.left) {
        taskElement.style.left = `${taskListBlockSizes.left}px`;
      }
    }
    if (
      currentY + taskElementSizes.height <= taskListBlockSizes.bottom &&
      currentY >= taskListBlockSizes.top
    ) {
      taskElement.style.top = `${currentY}px`;
    } else {
      if (currentY + taskElementSizes.height > taskListBlockSizes.bottom) {
        taskElement.style.top = `${
          taskListBlockSizes.bottom - taskElementSizes.height
        }px`;
      }
      if (currentY < taskListBlockSizes.top) {
        taskElement.style.top = `${taskListBlockSizes.top}px`;
      }
    }
  }

  let currentDroppable = null;

  function onDragTaskElement(event) {
    moveTaskElement(event.pageX, event.pageY);

    taskElement.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    taskElement.hidden = false;

    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest('.task-list__task');

    if (!droppableBelow) return; //если clientX/clientY за пределами блока, то выдает null - игнорирует

    // вычисления, для выбора подсветки droppableBelow исходя из пложения taskelement
    let pasteUpOrDown;
    let сoordinatesOfTheCursor = event.clientY;
    let positionCenterElemBelow =
      (droppableBelow.getBoundingClientRect().bottom -
        droppableBelow.getBoundingClientRect().top) /
        2 +
      droppableBelow.getBoundingClientRect().top;

    сoordinatesOfTheCursor >= positionCenterElemBelow
      ? (pasteUpOrDown = 'pasteDown')
      : (pasteUpOrDown = 'pasteUp');

    // console.log(pasteUpOrDown);

    if (pasteUpOrDown == 'pasteDown') {
      if (!droppableBelow.classList.contains('_under-down-drop-element')) {
        droppableBelow.classList.remove('_under-up-drop-element');
        droppableBelow.classList.add('_under-down-drop-element');
      }
    }
    if (pasteUpOrDown == 'pasteUp') {
      if (!droppableBelow.classList.contains('_under-up-drop-element')) {
        droppableBelow.classList.remove('_under-down-drop-element');
        droppableBelow.classList.add('_under-up-drop-element');
      }
    }

    if (currentDroppable !== droppableBelow) {
      if (currentDroppable) {
        cleanStyleDroppableBelow(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        cleanStyleDroppableBelow(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onDragTaskElement);

  document.addEventListener('mouseup', mouseUp, { once: true });

  function mouseUp() {
    document.removeEventListener('mousemove', onDragTaskElement);

    taskElement.removeAttribute('style');
    const underUpDropElement = document.querySelector(
      '._under-up-drop-element'
    );
    const underDownDropElement = document.querySelector(
      '._under-down-drop-element'
    );
    if (underDownDropElement == null && underUpDropElement == null) {
      taskListBlock.append(taskElement);
    }

    if (underDownDropElement != null) {
      underDownDropElement.after(taskElement);
    }

    if (underUpDropElement != null) {
      underUpDropElement.before(taskElement);
    }

    cleanStyleDroppableBelow(currentDroppable);
  }

  function cleanStyleDroppableBelow(elem) {
    if (elem == null) {
      return;
    }
    elem.classList.remove('_under-up-drop-element');
    elem.classList.remove('_under-down-drop-element');
  }

  taskElement.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });
}
