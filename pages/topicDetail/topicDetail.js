var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  data: {
    id: 0,
    topic: {},
    topicList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;
    that.setData({
      id: parseInt(options.id)
    });

    util.request(api.TopicDetail, { id: that.data.id}).then(function (res) {
      if (res.errno === 0) {

        that.setData({
          topic: res.data,
        });

        WxParse.wxParse('topicDetail', 'html', res.data.content, that);
      }
    });

    util.request(api.TopicRelated, { id: that.data.id}).then(function (res) {
      if (res.errno === 0) {

        that.setData({
          topicList: res.data
        });
      }
    });

  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})