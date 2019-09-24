//index.js
//获取引用实例
const user_qx = require("../../utils/shouquan.js");
const app = getApp()
Page({
  data: {
    show:"none",//授权弹出框
    sliders:'',//首页轮播
    dj_reimens: '',//当季热门数据
    index: 0,//当季热门轮播下标
    tet: [],//当季热门标题数组
    dres: [],//当季热门描述数组
    remenjingqus:'',//热门景区
    article_lists:'',//精选游记
    line_lists: '',//精选路线
    count:'',//总条数
    ztai:'none',//隐藏没有更多
    contmshu:"block",//显示加载动画
    strsyo: 1,//第一页
    strey:true,
    minindex: ' ',//检索
    strclassname:' ',//检索
  },
  onLoad: function (){
    this.slider();//首页广告位
    this.dj_reimen();//当季热门
    this.remenjingqu();//热门景区
    this.jingxuan_yj();//精选游记
    this.jingxuan_lx();//精选路线
  },
  /**
   * 上拉刷新
   */
  onPullDownRefresh() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.setData({ minindex: '', strclassname: '', strey: true, strsyo: 1, line_lists: '', ztai: 'none', contmshu:'block'});
    this.jingxuan_lx();//精选路线
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
  /**
   * 页面显示执行
   */
  onShow() {
    this.userin();
  },
  /**
   * 首页广告位
   */
  slider(){
    var data = { act: "ad_list", class_id:"449,450,451,452,453"};
    this.request_demo(this, data, "slider"); 
  },
  /**
   * 当季热门
   */
  dj_reimen(){
    var data = { act: "ticket_list", paixu: "new", recommend:1,page:1,size:3 };
    this.request_demo(this, data, "dj_reimens"); 
  },
  /**
   * 热门景区
   */
  remenjingqu(){
    var that = this;
    var data = { act: "ticket_list", recommend: 1, page: 1, size: 6 };
    that.request_demo(that, data,"remenjingqus");
  },
  /**
   * 精选游记
   */
  jingxuan_yj(){
    var that = this;
    var data = { act: "article_list", class_id: "001005", recommend: 1, page: 1,size:6 };
    that.request_demo(that, data, "article_lists");
  },
  /**
 * 精选路线
 */
  jingxuan_lx() {
    var that = this;
    var data = { act: "line_list", page: 1, size: 3};
    that.request_demo(that, data, "line_lists");
  },
  /**
   * 精选路线懒加载
   */
  lanjia(page){
    var that = this;
    var data = { act: "line_list", page: page, size: 3};
    that.request_demo(that, data, "lanjia", page);
  },
  /**
   * request封装
   */
  request_demo(that, data, name, page){
    wx.request({
      url: app.globalData.url,
      data: data,
      success: res => {
        var bao = res.data;
        if (bao.code == "0000") {
          if (name == "slider") { that.setData({ sliders: bao.data });}
          if (name =="dj_reimens"){
            var title = that.data.tet;
            var contents = that.data.dres;
            for (var i = 0; i < bao.data.length; i++) {
              title[i] = bao.data[i].title;
              contents[i] = bao.data[i].content;
            }
            that.setData({ dj_reimens: bao.data, tet: title, dres: contents });
          }
          if (name == "remenjingqus")//热门景区
            {that.setData({ remenjingqus: bao.data });}
          if (name == "article_lists")//精选游记
            {that.setData({ article_lists: bao.data });}
          if (name == "line_lists")//精选路线
          { that.setData({ line_lists: bao.data }); lazyImg(that, bao.data, 'line_lists', '../images/jzt.png'); wx.hideNavigationBarLoading(); wx.stopPullDownRefresh();}
          if (name == "lanjia" && that.data.line_lists.length<parseInt(bao.count)){
            //精选路线懒加载
            var line_listse = that.data.line_lists;
            for (var i = 0; i < bao.data.length;i++){line_listse.push(bao.data[i]);}
            that.setData({ line_lists: line_listse, strey: true, count: bao.count, erztai:"none"}); 
            lazyImg(that, that.data.line_lists, 'line_lists', '../images/jzt.png');
          }
          if (that.data.line_lists.length >= parseInt(that.data.count)){
            that.setData({ contmshu: "none", ztai: "block", erztai: "none"}); //暂无更多数据
          }  
      }
      }
    })
  },
  /**
   * 轮播改变事件
   */
  gai_bian(data){
    this.setData({ index: data.detail.current}); 
  },
  /**
   * 获取用户基本信息
   */
  getPromissions: function () {
    var show=user_qx.getPromission();//调用授权方法
    setInterval(() => { this.userin(); }, 1000);//用户信息
    this.setData({ show: show});
  },
/**
* 设置轮播图的自适应高度
*/
  imgHeight(e){
    var swiperH= app.zishiyinHight(e);
    this.setData({Height: swiperH})},
  imgHeights(e) {
    var swiperH = app.zishiyinHight(e);
    this.setData({ Heights: swiperH })
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
      var poys = _that.data.strclassname;
      var minindexs = _that.data.minindex;
      if (minindexs.indexOf(i) == -1) {
       //console.log(ret.intersectionRatio);
        ret.intersectionRatio > 0 ? data[i].show = true : '';
        minindexs += "-" + i + "-";
      // console.log("len" + len + "strey" + _that.data.strey +"");
          if (len == i + 1 && _that.data.strey && poys.indexOf(""+len+"")== -1) {
            poys += "-" + len + "-";
            _that.setData({ strsyo: _that.data.strsyo + 1, strey: false, strclassname: poys, erztai:"block" }) 
            _that.lanjia(_that.data.strsyo);//精选路线懒加载
          }
        _that.setData({ [lazy_name]: data, loadIcon: loading_icon, minindex: minindexs})
      }
    })
  }
}