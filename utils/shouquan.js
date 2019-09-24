/**
 * 小程序获取权限
 */
function getPromission() {
  var loginStatus = true;
  if (loginStatus) {
    wx.login({
      success: res=>{
        if (res.code) {
          wx.getUserInfo({
            withCredentials: false,
            success: function (data) {
              wx.setStorageSync("user", data.userInfo);
              console.log("index测试", wx.getStorageSync("user"));
            },
            fail: function () {
              console.info("1授权失败返回数据");
              loginStatus = false;
            }
          });
        }
      },
      fail: function () {
        console.info("登录失败返回数据");
      }
    });
  }
  return "none"
}
module.exports = {
  getPromission: getPromission,
}  