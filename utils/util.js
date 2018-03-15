function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function toThousands(num) {
    return (num || "").replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

function getCode(){
  var app = getApp();
  var renFengCode = "";
  var phoneNum = "";
  var idNum = "";
  if (app.globalData.codeInfo) {
    renFengCode = app.globalData.codeInfo.renFengCode;
    phoneNum = app.globalData.codeInfo.phoneNum;
    idNum = app.globalData.codeInfo.idNum;
    return idNum + "|" + phoneNum + "|" + new Date().getTime() + "|" + renFengCode;
  }else{
    return null;
  }
}

function setCode(code){
  var app = getApp();
  var c = code.split("|");
  if(c.length == 4){
    var renFengCode = c[3];
    var phoneNum = c[1];
    var idNum = c[0];
    app.globalData.codeInfo = {
      renFengCode: renFengCode,
      phoneNum: phoneNum,
      idNum: idNum
    }
    wx.setStorageSync("code",app.globalData.codeInfo);
    return true;
  }else{
    return false;
  }
}

module.exports = {
  formatTime: formatTime,
  toThousands:toThousands,
  getCode: getCode,
  setCode: setCode
}
