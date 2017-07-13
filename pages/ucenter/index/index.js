var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
    const token = wx.getStorageSync('token');
    if (!token) {
      // wx.redirectTo({
      //   url: '/pages/auth/login/login'
      // })
      this.setData({
        userInfo: {
          nickname: '去登录',
          username: '',
          avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
        }
      });
      return false;
    }
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})