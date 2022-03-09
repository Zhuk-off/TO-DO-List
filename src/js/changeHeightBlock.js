export function changeHeightBlock(className) {
  const littleBlock = document.querySelector('.task-list');
  const bigBlock = document.querySelector('.task-block');
  const taskBlockHeader = document.querySelector('.task-block__header');
  let container = document.getElementById('container');

  const heightLittleblock = littleBlock.offsetHeight;
  const heightBigBlock = bigBlock.offsetHeight;
  const heightTaskBlockHeader = taskBlockHeader.offsetHeight;
  const heightLittleblockAndHeightTaskBlockHeader =
    heightLittleblock + heightTaskBlockHeader;

  // console.log('heightLittleblock', heightLittleblock);
  // console.log('heightBigBlock', heightBigBlock);
  // console.log('heightTaskBlockHeader', heightTaskBlockHeader);

  if (heightLittleblockAndHeightTaskBlockHeader >= heightBigBlock) {
    container.style.height = `${heightLittleblock + heightTaskBlockHeader}px`;
  }
  if (
    heightBigBlock >= 600 &&
    heightBigBlock > heightLittleblockAndHeightTaskBlockHeader &&
    heightLittleblockAndHeightTaskBlockHeader >= 600
  ) {
    // console.log('heightBigBlock==', heightBigBlock);
    // console.log(
    //   'heightLittleblockAndHeightTaskBlockHeader==',
    //   heightLittleblockAndHeightTaskBlockHeader
    // );
    container.style.height = `${heightLittleblockAndHeightTaskBlockHeader}px`;
  }
}
