/**
 * Let the browser start downloading a file
 * @param {string} src - link to the file
 */
export function download(src: string) {
  const FRAME_ID = 'DOWNLOAD_FRAME';
  const frame = document.getElementById(FRAME_ID);

  if (frame) {
    frame.parentNode && frame.parentNode.removeChild(frame);
  }

  const newFrame = document.createElement('iframe');

  newFrame.id = FRAME_ID;
  newFrame.src = src;
  newFrame.style.display = 'none';

  document.body.appendChild(newFrame);
}