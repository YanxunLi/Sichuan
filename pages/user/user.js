//获取引用实例
const user_qx = require("../../utils/shouquan.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "none",//授权弹出框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   *用户信息 
   */
  userin(){
    this.setData({ userinfo: wx.getStorageSync("user")});
    var you = app.userinfo();
    you ? this.setData({ show: "none" }) : this.setData({ show: "block" });
  },
  onShow() {
    this.userin();//用户信息
  },
  /**
 * 获取用户基本信息
 */
  getPromissions: function () {
    var show = user_qx.getPromission();//调用授权方法
    setInterval(() => { this.userin();},1000);//用户信息
    this.setData({ show: show });
  },
})