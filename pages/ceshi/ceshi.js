let col1H = 0;
let col2H = 0;

Page({

  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },

  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        this.loadImages();
      }
    })
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度
    let images = this.data.images;
    let imageObj = null;
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }
    imageObj.height = imgHeight;
    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };
    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }
    this.setData(data);
  },

  loadImages: function () {
    let images = [
      { pic: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564398737924&di=fccfb124e59716b15062cbaa51d429e4&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe6c85fcb31345b5e028b7feb8587477146bc0c7f1c247-ivQ2lb_fw658", height: 0 },
      { pic: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564398759723&di=96ce9799af43d595febc6c944d6d363d&imgtype=0&src=http%3A%2F%2Fpic33.nipic.com%2F20130924%2F9822353_015119969000_2.jpg", height: 0 },
      { pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2078043979,184815851&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1487351610,315303232&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3473128871,1574804327&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3349546634,3754791255&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4211603615,2895194094&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=566195068,3011670234&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3375757935,840547509&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1189049432,2006081149&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2469508207,3741045434&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4145500290,1381678520&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3318353221,4012380003&fm=26&gp=0.jpg", height: 0 },
      { pic: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3317353081,1953454367&fm=26&gp=0.jpg", height: 0 }
    ];
    let baseId = "img-" + (+new Date());
    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }
    this.setData({
      loadingCount: images.length,
      images: images
    });
  }

})