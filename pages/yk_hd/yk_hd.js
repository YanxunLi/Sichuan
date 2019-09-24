var app = getApp();
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
    wx.showLoading({ title: '数据加载中...', })
    this.jingxuan_yj();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 精选游记
   */
  jingxuan_yj() {
    var that = this;
    var data = { act: "article_list", class_id: "001003" };
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
            for (var i = 0; i < bao.data.length;i++){
              bao.data[i].title = bao.data[i].title.substring(0,7);
              bao.data[i].brief = bao.data[i].brief.substring(0, 5);
            }
             that.setData({ article_lists: bao.data }); wx.hideLoading() }
        }
      }
    })
  },
})