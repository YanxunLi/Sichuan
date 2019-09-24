// pages/mp_yd/mp_yd.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_lan: [
      { name: "全部" },
      { name: "一日游" },
      { name: "两日游" },
      { name: "主题游" },
      { name: "节庆游" },
    ],//tab数据
    yangs: ["la_act"],//tab初始化
  },
  /**
* tab切换效果
*/
  tab_lan: function (el) {
    var data_shuju = el.currentTarget.dataset.bao;
    var clasname = this.data.tab_lan;
    for (var i = 0; i < clasname.length; i++) {
      if (data_shuju == i) { clasname[i] = "la_act"; } else {
        clasname[i] = "";
      }
    }
    this.setData({ yangs: clasname });
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '数据加载中...', })
    this.luxian_yd();
  },
  /**
 * 路线预订
 */
  luxian_yd() {
    var data = { act: "line_list"};
    this.request_demo(this, data, "luxian_yd");
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
          if (name == "luxian_yd") {
            var shujus = app.fenge(bao); //分割字符串
            that.setData({ luxian_yd: shujus.data });
            wx.hideLoading();
          }
        }
      }
    })
  },
})