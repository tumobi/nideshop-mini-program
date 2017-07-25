var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(app.globalData)
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  goLogin(){
    user.loginByWeixin().then(res => {
      this.setData({
        userInfo: res.data.userInfo
      });
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
    }).catch((err) => {
      console.log(err)
    });
  },
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})