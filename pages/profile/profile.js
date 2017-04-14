//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello!',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changeHello: function(e) {
    var that = this
    app.getUserInfo(function(userInfo){
      that.setData({
        motto: 'Hello ' + userInfo.nickName
      })
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
