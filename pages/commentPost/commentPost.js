var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  data: {
    typeId: 0,
    valueId: 0,
    content: ''
  },
  onLoad: function (options) {

    var that = this;
    that.setData({
      typeId: parseInt(options.typeId),
      valueId: parseInt(options.valueId)
    });

  },
  onClose() {
    wx.navigateBack({
      delta: 1
    });
  },
  onPost() {
    let that = this;

    if (!this.data.content) {
      util.showErrorToast('请填写评论')
      return false;
    }


    util.request(api.CommentPost, {
      typeId: that.data.typeId,
      valueId: that.data.valueId,
      content: that.data.content
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: '评论成功',
          complete: function(){
            wx.navigateBack({
              delta: 1
            });
          }
        })
      }
      console.log(res)
    });
  },
  bindInpuntValue(event){

    let value = event.detail.value;

    //判断是否超过140个字符
    if (value && value.length > 140) {
      return false;
    }

    this.setData({
      content: event.detail.value,
    })
    console.log(event.detail)
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