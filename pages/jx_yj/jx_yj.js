// pages/jx_yj/jx_yj.js
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
/**
 * 精选游记
 */
  jingxuan_yj() {
    var that = this;
    var data = { act: "article_list", class_id: "001005" };
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
          if (name == "article_lists"){
          var shuzuer=[],shuzuyi=[];
          var numa=0,numb=0;
            for (var i = 0; i < bao.data.length;i++){
              bao.data[i].title = bao.data[i].title.substring(0, 6);
              bao.data[i].brief = bao.data[i].brief.substring(0,6);
              if(i%2==0){
                shuzuer[numa]=bao.data[i];
                numa++;
              }else{
                shuzuyi[numb]=bao.data[i];
                numb++;
              }
            }
            that.setData({ shuzuer: shuzuer, shuzuyi: shuzuyi});wx.hideLoading();
            lazyImg(that, that.data.shuzuer, 'shuzuer', '../images/jzt.png');
            lazyImg(that, that.data.shuzuyi, 'shuzuyi', '../images/jzt.png');
         }
        }
      }
    })
  },
})
/**
 * 数据名必须为:lazyData或其它名(与数据以及页面相同)
 *
 * 模拟数据：lazyData
 * 传输数据：_that,data(this,lazyData,lazy_name,loading_icon)
 */
const lazyImg = (_that, data, lazy_name, loading_icon) => {
  for (let i = 0, len = data.length; i < len; i++) {
    wx.createIntersectionObserver().relativeToViewport({
      bottom: 20
    }).observe('.item-' + i, (ret) => {
      ret.intersectionRatio > 0 ? data[i].show = true : '';
      if (len == i + 1 && _that.data.strey) {
        _that.setData({ strsyo: _that.data.strsyo + 1, strey: false, })
        _that.lanjia(_that.data.strsyo);//精选路线懒加载
      }
      _that.setData({ [lazy_name]: data, loadIcon: loading_icon })
    })
  }
}