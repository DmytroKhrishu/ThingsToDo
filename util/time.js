export function normalTimeString(time) {
  // const hours = time.getHours();
  // const minutes = time.getMinutes();
  // const formattedTime = hours + ':' + minutes;
  const formattedTime = time.toTimeString();
  return formattedTime;
}
