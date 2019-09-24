//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },

  getPromission: function () {
    var loginStatus = true;
    if (loginStatus) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              withCredentials: false,
              success: function (data) {
                console.log("用户信息",data);
                //跳转登录界面
                wx.switchTab({
                  url: '../index/index',
                })
                console.info("1成功获取用户返回数据", data);
              },
              fail: function () {
                console.info("1授权失败返回数据");
                loginStatus = false;
              }
            });
          }
        },
        fail: function () {
          console.info("登录失败返回数据");
        }
      });
    }
  },
})
