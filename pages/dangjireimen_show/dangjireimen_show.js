// pages/dangjireimen_show/dangjireimen_show.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju:""//详情数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '数据加载..' }); this.jingqu(options.id);//详情数据
  },
  jingqu(ids){
    var data = { act: "get_ticket", id: ids};
    this.request_demo(this, data);
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
          var cont = bao.data.content;
          that.setData({ address: bao.data.address, map: bao.data.map,shuju: bao.data, xcx_content: cont.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:5px;padding-bottom:5px;" ')}); wx.hideLoading(); wx.setStorageSync('imgs', bao.data.pics);} 
      }
    })
  },
  //没有图片执行
  noimg(){
    wx.showToast({ title: '暂无更多图片', icon:"none"});
  },
  //导航定位
  dizhinav(){
    var map=this.data.map;
    var los=map.split(",");
    var latitude = parseFloat(los[1]);
    var longitude = parseFloat(los[0]);
    var address = this.data.address;
    app.daohang(latitude, longitude, address);
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

  }
})