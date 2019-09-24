// pages/zc_fw/zc_fw.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title: '数据加载中...', })
    this.zuche();
  },
  /**
 * 租车预订
 */
  zuche() {
    var data = { act: "rent_list" };
    this.request_demo(this, data, "zuche");
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
          if (name == "zuche") {
            that.setData({ zuche: bao.data });
          }
          wx.hideLoading();
        }
      }
    })
  },
})