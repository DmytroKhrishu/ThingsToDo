export function normalTimeString(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedTime = hours + ':' + minutes;
  return formattedTime;
}
