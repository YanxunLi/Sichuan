// pages/gengduo_img/gengduo_img.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju:'',
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title: '数据加载中...',})
    wx.getStorage({ key: "imgs", success: res => { 
      var imges = this.data.images;
      for (var i = 0; i < res.data.length;i++){ imges[i] = res.data[i].img;}
      this.setData({ shuju: res.data, images: imges});wx.hideLoading();}});
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
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //打开预览时要显示图片的地址。
      urls: images,  //需要预览的图片的地址数组。   
    })
  },
})