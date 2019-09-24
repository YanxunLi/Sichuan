//获取引用实例
const user_qx = require("../../utils/shouquan.js");
const app = getApp()
Page({
  data: {
    tab_lan: [
      { name: "推荐"},
      { name: "文娱四川" },
      { name: "休闲购物" },
      { name: "美食广场" },
      ],//tab数据 
    yangs: ["la_act"],//tab初始化
    show: "none",//授权弹出框

    strey: true,//及下面全是懒加载参数
    strsyo: 1,//第一页
    next: true,//默认向下
    minindex: ' ',//检索
    minindexss: ' ',//检索
    strclassname: '',//检索
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

  },
  /**
   * tab切换效果
   */
  tab_lan:function(el){
    var data_shuju = el.currentTarget.dataset.bao;
    var clasname = this.data.tab_lan;
    for (var i = 0; i < clasname.length; i++) { 
        if (data_shuju == i) { clasname[i] = "la_act"; }else{
          clasname[i] = "";
        }
      }
    this.setData({ yangs: clasname });
  },
  onLoad: function () {
    wx.showLoading({ title: '数据加载中...', })
    this.techan();
  },
  /**
     *用户信息 
     */
  userin() {
    var you = app.userinfo();
    you ? this.setData({ show: "none" }) : this.setData({ show: "block" });
  },
  onShow(){
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
* 特产预订
*/
  techan() {
    var data = { act: "instit_list", page: 1, size: 8, recommend:1 };
    this.request_demo(this, data, "techan");
  },
  /**
 * 特产预订懒加载
 */
  lanjia(page) {
    var data = { act: "instit_list", page: page, size: 8, recommend: 1 };
    this.request_demo(this, data, "lanjia");
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
        if (bao.code == "0000" && bao.data != null) {
          var shuzuer = [], shuzuyi = [];
          var numa = 0, numb = 0;
          for (var i = 0; i < bao.data.length; i++) {
            if (i % 2 == 0) {
              shuzuer[numa] = bao.data[i];
              numa++;
            } else {
              shuzuyi[numb] = bao.data[i];
              numb++;
            }
          }
          if (name == "lanjia" && that.data.shuzuer.length + that.data.shuzuyi.length < parseInt(bao.count)) {
            var shuzuyis = that.data.shuzuyi;
            var shuzuers = that.data.shuzuer;
            for (var i = 0; i < shuzuyi.length; i++) { shuzuyis.push(shuzuyi[i]); }
            for (var i = 0; i < shuzuer.length; i++) { shuzuers.push(shuzuer[i]); }
            that.setData({ shuzuer: shuzuers, shuzuyis: shuzuyi, strey: true }); wx.hideLoading();
            lazyImg(that, shuzuers, 'shuzuer', '../images/jzt.png');
            lazyImg(that, shuzuyis, 'shuzuyi', '../images/jzt.png');
          } else {
            that.setData({ shuzuer: shuzuer, shuzuyi: shuzuyi }); wx.hideLoading();
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
      if (lazy_name == "shuzuyi") {
        var poys = _that.data.strclassname;
        var minindexs = _that.data.minindex;
        if (minindexs.indexOf(i) == -1) {
          minindexs += "-" + i + "-";
          methoy(ret, data, poys, len, i, _that);
          _that.setData({ [lazy_name]: data, loadIcon: loading_icon, minindex: minindexs })
        }
      } else if (lazy_name == "shuzuer") {
        var poys = _that.data.strclassname;
        var minindexss = _that.data.minindexss;
        if (minindexss.indexOf(i) == -1) {
          minindexss += "-" + i + "-";
          methoy(ret, data, poys, len, i, _that);
          _that.setData({ [lazy_name]: data, loadIcon: loading_icon, minindexss: minindexss })
        }
      }
    })

  }
}
/**
 * 方法
 */
const methoy = (ret, data, poys, len, i, _that) => {
  ret.intersectionRatio > 0 ? data[i].show = true : '';
  if (len == i + 1 && _that.data.strey && poys.indexOf("" + len + "") == -1) {
    poys += "-" + len + "-";
    _that.setData({ strsyo: _that.data.strsyo + 1, strey: false, strclassname: poys })
    _that.lanjia(_that.data.strsyo);//精选路线懒加载
  }
}