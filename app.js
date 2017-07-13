var util = require('./utils/util.js');
var api = require('./config/api.js');

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that = this;
    that.login();
  
  },
  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (infoRes) {
            console.log(res);
            util.request(api.AuthLogin, { code: res.code , userInfo: infoRes.userInfo}, 'POST')
              .then(function (res) {
                wx.setStorageSync('token', res.data.token);
                wx.setStorageSync('userInfo', res.data.userInfo);
                that.globalData.userInfo = res.data.userInfo;
            });
          }
        });
        
      },
      fail: function (res) {

      }
    });
  },
  globalData: {
    userInfo: {
      nickname: '去登录',
      username: '',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    }
  }
})