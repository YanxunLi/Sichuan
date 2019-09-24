// pages/md_d/md_d.js
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
    wx.showLoading({title: '数据加载中...',});
    this.remenjingqu();
  },

  /**
 * 热门景区
 */
  remenjingqu() {
    var that = this;
    var data = { act: "ticket_list"};
    that.request_demo(that, data, "remenjingqus");
  },
  /**
 * request封装
 */
  request_demo(that, data, name, page) {
    wx.request({
      url: app.globalData.url,
      data: data,
      success: res => {
        var bao = res.data;
        if (bao.code == "0000") {
          if (name == "remenjingqus")//热门景区
          { 
            var shujus = app.fenge(bao); //分割字符串
            that.setData({ remenjingqus: shujus.data });
           }
        }
        wx.hideLoading();
      }
    })
  },
})