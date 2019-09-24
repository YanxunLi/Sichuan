// pages/tc_gm/tc_gm.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ztai: 'none',//隐藏没有更多
    contmshu: "block",//显示加载动画

    strey: true,//及下面全是懒加载参数
    strsyo: 1,//第一页
    next:true,//默认向下
    minindex:' ',//检索
    minindexss: ' ',//检索
    strclassname: '',//检索
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title: '数据加载中...', })
    this.techan();
  },
  /**
 * 特产预订
 */
  techan() {
    var data = { act: "goods_list", class_id: "001001",page: 1, size: 8};
    this.request_demo(this, data, "techan");
  },
  /**
 * 特产预订懒加载
 */
  lanjia(page) {
    var data = { act: "goods_list", class_id: "001001", page: page, size: 8};
    this.request_demo(this, data, "lanjia");
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {

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
        if (bao.code == "0000"&&bao.data!=null) {
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
          if (name == "lanjia" && that.data.shuzuer.length + that.data.shuzuyi.length< parseInt(bao.count)) {
            var shuzuyis = that.data.shuzuyi;
            var shuzuers = that.data.shuzuer;
            for (var i = 0; i < shuzuyi.length; i++) { shuzuyis.push(shuzuyi[i]); }
            for (var i = 0; i < shuzuer.length; i++) { shuzuers.push(shuzuer[i]); }
            that.setData({ shuzuer: shuzuers, shuzuyis: shuzuyi, strey: true, erztai: "none" }); wx.hideLoading();
            lazyImg(that, shuzuers, 'shuzuer', '../images/jzt.png');
            lazyImg(that, shuzuyis, 'shuzuyi', '../images/jzt.png');
          }else{
            that.setData({ shuzuer: shuzuer, shuzuyi: shuzuyi, erztai: "none"}); wx.hideLoading();
            lazyImg(that, that.data.shuzuer, 'shuzuer', '../images/jzt.png');
            lazyImg(that, that.data.shuzuyi, 'shuzuyi', '../images/jzt.png');
          }
          if (that.data.shuzuer.length + that.data.shuzuyi.length >= parseInt(bao.count)) {
            that.setData({ contmshu: "none", ztai: "block", erztai: "none"}); //暂无更多数据
          }
        }
      }
    }),
    fail=>{
      wx.showToast({ title: '请求超时',icon:"none"})
    }
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
        if (lazy_name =="shuzuyi"){
          var poys = _that.data.strclassname;
          var minindexs = _that.data.minindex;
          if (minindexs.indexOf(i) == -1) {
            minindexs += "-" + i + "-";
            methoy(ret, data, poys, len, i, _that);
            _that.setData({ [lazy_name]: data, loadIcon: loading_icon, minindex: minindexs })
          }
        }else if (lazy_name == "shuzuer"){
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
const methoy = (ret, data, poys, len, i, _that)=>{
      ret.intersectionRatio > 0 ? data[i].show = true : '';
      if (len == i + 1 && _that.data.strey && poys.indexOf("" + len + "") == -1) {
        poys += "-" + len + "-";
        _that.setData({ strsyo: _that.data.strsyo + 1, strey: false, strclassname: poys, erztai: "block" })
        _that.lanjia(_that.data.strsyo);//精选路线懒加载
      }
}