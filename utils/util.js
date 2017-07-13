function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封闭微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject){
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-You-Token': wx.getStorageSync('token')
      },
      success: function(res) {
        console.log("success" );
        
        if(res.statusCode == 200){
          //处理未登录
          if(res.data.errno == 401){
            
            console.log('快去登录');
          }else{
            resolve(res.data);
          }
        }else{
          reject(res.errMsg);
        }
        
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

function redirect(url){

  //判断页面是否需要登录

  wx.redirectTo({
    url: '/pages/auth/login/login'
  });
  return false;

  wx.redirectTo({
    url: url
  });
}

function showErrorToast(msg){
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

module.exports = {
  formatTime: formatTime,
  request: request,
  redirect: redirect,
  showErrorToast: showErrorToast
}


