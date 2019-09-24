// pages/jp_lx/jp_lx.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_lan:[],//tab数据
    yangs: ["la_act"],//tab初始化
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
 * tab切换效果
 */
  tab_lan: function (el) {
    wx.showLoading({title: '数据加载中...', })
    var data_shuju = el.currentTarget.dataset.bao;
    var name = el.currentTarget.dataset.name;
    this.jnping(name);//精品路线
    var clasname = this.data.tab_lan;
    for (var i = 0; i < clasname.length; i++) {
      data_shuju == i ? clasname[i] = "la_act" : clasname[i] = "";
    }
    this.setData({ yangs: clasname });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '数据加载中...', });
    this.jnping();//精品路线
    fenclass(this)//分类
  },
  /**
 * 精品路线
 */
  jnping(name) {
    var that = this;
    var data = { act: "line_list", line_type:name};
    that.request_demo(that, data, "line_lists");
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
          if (bao.data==null) { wx.showToast({ title: '暂无数据!', icon: "none" }); return false;}
            if (name == "line_lists")//精选游记
            {
                var shujus = app.fenge(bao); that.setData({ line_lists: shujus.data });
                wx.hideLoading();
            }
            if (name == "get_datas") {
              that.setData({ tab_lan: bao.data })
            }
        }else{
          wx.showToast({title: '数据跑丢了',icon:"none"});
        }
      }
    })
  },
})
/**
 * 分类
 */
const fenclass=(that)=>{
  var data = { act: "get_data", item:"line_class"};
  that.request_demo(that, data, "get_datas");
}