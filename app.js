//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // this.getUserInfo();
    this.getCodeInfo();
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getCodeInfo: function(cb){
    // const db = wx.cloud.database();
    // const codes = db.collection('codes');
    var that = this
    if (this.globalData.codeInfo) {
      typeof cb == "function" && cb(this.globalData.codeInfo)
    } else {
      try {
        var value = wx.getStorageSync('code')
        if (value) {
          that.globalData.codeInfo = value;
        }
      } catch (e) {
        // Do something when catch error
      }
    }
  },
  globalData:{
    userInfo: null,
    codeInfo: null
  }
})