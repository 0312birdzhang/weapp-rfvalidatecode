// const db = wx.cloud.database();
// const codes = db.collection('codes');


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
  const localcodeInfo = wx.getStorageSync("code");
  if (!app.globalData.codeInfo && localcodeInfo) {
    app.globalData.codeInfo = localcodeInfo;
    
  }
  if(!app.globalData.codeInfo){
    return null;
  }else{
    renFengCode = app.globalData.codeInfo.renFengCode;
    phoneNum = app.globalData.codeInfo.phoneNum;
    idNum = app.globalData.codeInfo.idNum;
    return idNum + "|" + phoneNum + "|" + new Date().getTime() + "|" + renFengCode;
    
  }
  // else if(!localcodeInfo){
  //   //从云端获取
  //   codes.doc(app.globalData.userInfo.openId).get({
  //     success: function (res) {
  //       // res.data 包含该记录的数据
  //       console.log(res.data)
  //       app.globalData.codeInfo = res.data;
  //     }
  //   })
  // }  
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
    //保存到云数据库
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
