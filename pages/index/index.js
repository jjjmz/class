// pages/demo/demo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:app.globalData.islogin,
    career:app.globalData.career,
    majorCon:[
      {url:'/pages/vocabulary/vocabulary',
      pic:'/images/kb.png',
      text:'课程查询'},
      {url:'/pages/face/face',
      pic:'/images/xs.png',
      text:'人脸录入'},
      {url:'/pages/signin/signin',
      pic:'/images/kjs.png',
      text:'开启签到'},
      {url:'/pages/mask/mask',
      pic:'/images/mask.png',
      text:'口罩检测'},
    ]
  },
  gotologin: function () {
    wx.showToast({
      title: '请前往登录',
      icon: 'none',
      duration: 1500
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      islogin:app.globalData.islogin,
      career:app.globalData.career,
    })
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

  }
})