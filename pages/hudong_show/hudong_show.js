// pages/hudong_show/hudong_show.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    strat:"block",
    userid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '数据加载中...', });
    this.setData({ spid: options.id, userid: options.uid});
    this.jingxuan_yj(options.id);
    this.pinlun_list(options.id, options.uid);
    this.xiangtui();//相关推荐
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
   * 游客互动详情
   */
  jingxuan_yj(id) {
    var that = this;
    var data = { act: "get_article", id: id };
    that.request_demo(that, data, "article_lists");
  },
  /**
   * 相关推荐
   */
  xiangtui(){
    var data = { act: "article_list", class_id: "001003", recommend:1,page:1,zise:4};
    this.request_demo(this, data, "xiangtui");
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
          { var cont = bao.data.content; that.setData({ article_lists: bao.data, xcx_content: cont.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:10px;margin-bottom:10px" ') }); wx.hideLoading() }
          if (name == "comment_list"){
            that.setData({ headimg_tx: bao.data, count: bao.count})
          }
          if (name == "xiangtui")//精选游记
          {
            for (var i = 0; i < bao.data.length; i++) {
              bao.data[i].title = bao.data[i].title.substring(0, 7);
              bao.data[i].brief = bao.data[i].brief.substring(0, 5);
            }
            that.setData({ xiangtui: bao.data }); 
          }
        }
      }
    })
  },
  /**
   * 评论列表
   */
  pinlun_list(id,uid){
    var data = { act: "comment_list", type: 6, itemid: id, uid: uid ,page:0,size:4 };
    this.request_demo(this, data, "comment_list");
  },
  /**
   * 更多评论
   */
  genduo_pl(){
    var data = { act: "comment_list", type: 6, itemid: this.data.spid, uid: this.data.userid };
    this.request_demo(this, data, "comment_list");
    this.setData({strat:"none"})
  },
  // 轮播数字
  swiperChange: function (e) {
    var that = this;
    that.setData({
      current: e.detail.current
    })
  }, 
  imgHeight(e){
    var swiperH = app.zishiyinHight(e);
    this.setData({ Height: swiperH })
  }
})