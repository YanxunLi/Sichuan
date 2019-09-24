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
       this.yuding();//门票预订
       this.jiudian();//酒店预订
       this.luxian_yd();//路线预订
       this.zuche();//租车预订
       this.techan();//特产预订
       wx.showLoading({title: '数据加载中...', })
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
  *用户信息 
  */
  userin() {
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
    setInterval(() => { this.userin(); }, 1000);//用户信息
    var show = user_qx.getPromission();//调用授权方法
    this.setData({ show: show });
  },
  /**
* 门票预订
*/
  yuding() {
    var data = { act: "ticket_list", recommend: 1, page: 2, size: 4};
    this.request_demo(this, data, "yuding");
  },
  /**
   * 酒店预订
   */
  jiudian(){
    var data = { act: "hotel_list", recommend: 1, page: 1, size: 1 };
    this.request_demo(this, data, "jiudian");
  },
  /**
   * 路线预订
   */
  luxian_yd(){
    var data = { act: "line_list", recommend: 1, page: 1, size: 1 };
    this.request_demo(this, data, "luxian_yd");
  },
  /**
   * 租车预订
   */
  zuche(){
    var data = { act: "rent_list",recommend: 1,page:1,size:1 };
    this.request_demo(this, data, "zuche");
  },
  /**
   * 特产预订
   */
  techan(){
    var data = { act: "goods_list", class_id: "001001", tag: 1, paixu:"new", page: 1, size: 1 };
    this.request_demo(this, data, "techan");
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
          if (name == "jiudian") {
            var shujus=app.fenge(bao); //分割字符串
             that.setData({ jiudian: shujus.data});
            }
          if (name == "luxian_yd") {
            var shujus = app.fenge(bao); //分割字符串
            that.setData({ luxian_yd: shujus.data });
          }  
          if (name == "zuche") {
            that.setData({ zuche: bao.data });
            wx.hideLoading();
          }  
        }
      }
    })
  },
})