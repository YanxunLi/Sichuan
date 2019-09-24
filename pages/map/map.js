// pages/map/map.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
    ],
  },
  //给点击的日期设置一个背景颜色
  dayClick: function (event) {
    console.log("日历",event);
    let clickDay = event.detail.day;
    let changeBgColor = `dayStyle[0].color`;
    let changeBg = `dayStyle[0].background`;
    let changeDay = `dayStyle[1].day`;
    let changeEndBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "rgba(255,255,255,0)",
      [changeBgColor]: "black",
      [changeEndBg]: "#AAD4F5"
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 22.5542080000,//要去的纬度-地址
          longitude: 113.8878770000,//要去的经度-地址
          name: "宝安中心A地铁口",
          address: '宝安中心A地铁口'
        })
      }
    })
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     wx.openLocation({
    //       latitude,
    //       longitude,
    //       scale: 18
    //     })
    //   }
    // })
    //es6语法
    const wechat = '1349571206zmy';
    console.log(`我们党的打算 ${wechat} `);
    const ays={a:1,b:2};
    const busa = { c: 1, d: 2 };
    const youer=Object.assign({},ays,busa);
    console.log(youer);
    // 弹出框
    app.showmodal("标题","你好，小哥哥");
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {

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
  onShareAppMessage: function (e) {
     return{
       title:"小猫咪",
       path:"pages/index/index"
     }
  },
})