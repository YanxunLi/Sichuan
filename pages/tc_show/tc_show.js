// pages/tc_show/tc_show.js
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.spshow(options.id);
      wx.showLoading({title: '数据加载中...',})
  },
  /**
* 商品详情
*/
  spshow(ids) {
    var that = this;
    var data = { act: "get_goods", id: ids };
    that.request_demo(that, data, "spshow");
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {
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
          var cont = bao.data.content;
          that.setData({ spshow: bao.data, xcx_content: cont.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:5px; padding-bottom:5px;" ') });
          wx.hideLoading();
        }
      }
    })
  },
  // 轮播数字
  swiperChange: function (e) {
    var that = this;
      that.setData({
        current: e.detail.current
      })
  }, 
  /**
* 设置轮播图的自适应高度
*/
  imgHeight: function (e) {
    var swiperH = app.zishiyinHight(e);
    this.setData({ Height: swiperH })
  },
})