//app.js
App({
  globalData: {
    userInfo: null,
    url: "https://lyxcx.zwon.net/api.php",//接口地址
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //检查登录态是否过期。
    wx.checkSession({
      success(res) {
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  /**
   * 导航  113.926997,22.686745 ,,
   */
  daohang(latitude, longitude, address){
      // wx.openLocation({     
      //   latitude: latitude,
      //   longitude: longitude,
      //   name: address,
      //   address: address,
      //   scale: 28
      // })
    
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: latitude,//要去的纬度-地址
          longitude: longitude,//要去的经度-地址
          name: address,
          address: address
        })
      }
    })
  },
  /**
   * 封装弹出框
   */
  showmodal(title,content){
    wx.showModal({
      title: title,
      content: content,
      success: this.methodse.bind(this)
    })
  },
  methodse(data) {
    console.log("data", data);
  },
  /**
   * 分割关键字
   */
  fenge(bao){
    //分割字符串
    for (var i = 0, len = bao.data.length; i < len; i++) {
      var str = bao.data[i].keyword;
      if (str) {
        var strname = str.split(",");
        var zu = [];
        for (var j = 0; j < strname.length; j++) { zu[j] = strname[j]; }
        bao.data[i].keyword = zu;
      }
    }
    return bao;
  },
  /**
   * 获取用户信息
   */
  userinfo(){
    return wx.getStorageSync("user");
  },
  /**
   * 设置轮播图的自适应高度
   */
  zishiyinHight(e){
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px"
    return swiperH;
  }
})