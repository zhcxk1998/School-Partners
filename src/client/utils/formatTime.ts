export default function formatTime(timeStamp: string) {
  const time = new Date(Number(timeStamp))
  return time.getHours() + ':' + time.getMinutes()
}