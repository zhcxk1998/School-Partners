module.exports=function generateTime() {
  let hour = new Date().getHours(),
      minute = new Date().getMinutes();
  hour = (hour == 0) ? '00' : hour;
  minute = (minute < 10) ? '0' + minute : minute;
  return hour + ':' + minute;
};