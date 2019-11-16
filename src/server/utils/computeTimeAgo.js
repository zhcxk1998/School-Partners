module.exports = function computeTimeAgo(publishTime) {
  const now = new Date().getTime()
  return Math.floor((now - Number(publishTime)) / 86400000)
};