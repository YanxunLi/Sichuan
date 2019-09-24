// pages/zuche_fuwu/zuche_fuwu.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      strat:"block"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title: '数据加载中...',})
    var id=options.id;
    this.ceshow(id);
  },
  /**
 * 租车
 */
  ceshow(ids) {
    var that = this;
    var data = { act: "get_rent", id: ids};
    that.request_demo(that, data, "ceshow");
  },
  /**
   * 拨打电话
   */
  bodadianhua(){
      wx.makePhoneCall({phoneNumber: '18382991283', })
  },
  /**
   * 展开更多车型
   */
  zankai(){
    this.setData({
      strat:"none"
    })
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
          that.setData({ zuceh: bao.data});
          wx.hideLoading();
        }
      }
    })
  },
})