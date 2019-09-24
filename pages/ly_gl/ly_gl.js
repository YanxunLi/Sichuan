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
    wx.showLoading({ title: '数据加载中...',})
    this.jingxuan_yj();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
   * 精选游记
   */
  jingxuan_yj() {
    var that = this;
    var data = { act: "article_list", class_id: "001001" };
    that.request_demo(that, data, "article_lists");
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
          if (name == "article_lists")//精选游记
          { 
            var shujus = app.fenge(bao); //分割字符串
            that.setData({ article_lists: shujus.data }); wx.hideLoading();
          }
        }
      }
    })
  },
})