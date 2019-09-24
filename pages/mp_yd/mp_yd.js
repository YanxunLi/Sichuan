// pages/mp_yd/mp_yd.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_lan: [
      { name: "推荐" },
      { name: "名胜古迹" },
      { name: "动植物园" },
      { name: "自然风光" },
      { name: "游乐场管" },
    ],//tab数据
    yangs: ["la_act"],//tab初始化
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  onLoad(){
    wx.showLoading({title: '数据加载中...',})
    this.yuding();
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
  /**
* 门票预订
*/
  yuding() {
    var data = { act: "ticket_list"};
    this.request_demo(this, data, "yuding");
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
          if (name == "yuding")//门票预订
          {
            var shujus = app.fenge(bao); //分割字符串
            that.setData({ yuding: shujus.data });
          }
          wx.hideLoading();
        }
      }
    })
  },
})