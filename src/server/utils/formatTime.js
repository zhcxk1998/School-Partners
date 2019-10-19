module.exports = function formatTime(timeStamp) {
  const time = new Date(Number(timeStamp))
  return time.getHours().toString().padStart(2, "0") + ':' + time.getMinutes().toString().padStart(2, "0")
}