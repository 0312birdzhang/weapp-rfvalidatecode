// pages/main/index.js
var QR = require("../../utils/qrcode.js");
var Util = require("../../utils/util.js");

Page({
  data:{
    canvasHidden: true,
    imagePath:'',
    maskHidden: true,
    isInited: Util.getCode()
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    if (this.data.isInited){
      //console.log("inited!")
      this.createQrCode("mycanvas",size.w,size.h);
    }else{
      //console.log("init run")
    }

  },
  onReady:function(){
    
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize:function(){
    var size={};
    try {
        var res = wx.getSystemInfoSync();
        var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth/scale;
        var height = width;//canvas画布为正方形
        size.w = width;
        size.h = height;
      } catch (e) {
        // Do something when catch error
        //console.log("获取设备信息失败"+e);
      } 
    return size;
  } ,
  createQrCode:function(canvasId,cavW,cavH){
    //调用插件中的draw方法，绘制二维码图片
    var text = Util.getCode();
    QR.qrApi.draw(text, canvasId, cavW, cavH);
    var that = this;
    //二维码生成之后调用canvasToTempImage();延迟3s，否则获取图片路径为空
    var st = setTimeout(function () {
      wx.hideToast();
      that.canvasToTempImage();
      clearTimeout(st);
    }, 3000);
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          // //console.log(tempFilePath);
          that.setData({
              imagePath: tempFilePath,
              canvasHidden: false
          });
      },
      fail: function (res) {
          //console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    //console.log("");
    // var img = this.data.imagePath
    // wx.previewImage({
    //   current: img, // 当前显示图片的http链接
    //   urls: [img] // 需要预览的图片http链接列表
    // })
  },
  recognizeCode: function () {
    var that = this;
    wx.scanCode({
      onlyFromCamera: false,
      success: function (res) {
        wx.showToast({
          title: '识别中...',
          icon: 'loading',
          duration: 2000
        });
        // success
        //console.log(res);
        if(Util.setCode(res.result)){
          that.setData({
            isInited: true
          })
          that.formSubmit();
        }else{
          wx.showToast({
            title: '必须为楼小二的二维码！',
            icon: 'loading',
            duration: 2000
          });
        }
        
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '请选择正确的二维码!',
          icon: 'loading',
          duration: 2000
        });
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  formSubmit: function(e) {
    var that = this;
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 2000
    });
    that.setData({
      maskHidden:false,
    });
    
    var st = setTimeout(function(){
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode("mycanvas",size.w,size.h);
      that.setData({
        maskHidden:true
      });
      clearTimeout(st);
    },2000)
    
  }

})