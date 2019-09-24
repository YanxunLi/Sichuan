// pages/jd_yd/jd_yd.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title: '数据加载中...',})
    this.jiudian();
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
  * 酒店预订
  */
  jiudian() {
    var data = { act: "hotel_list"};
    this.request_demo(this, data, "jiudian");
  },
  /**
* request封装
*/
  request_demo(that, data, name) {
    wx.request({
      url: app.globalData.url,
      data: data,
      success: res => {
        var bao = res.data;
        if (bao.code == "0000") {
          if (name == "jiudian") {
            var shujus = app.fenge(bao); //分割字符串
            that.setData({ jiudian: shujus.data });
            wx.hideLoading();
          }
        }
      }
    })
  },
})