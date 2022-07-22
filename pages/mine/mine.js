// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo:false,
    userhead:"https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c",
    username:"点击登录/注册"
  },
  // 获取微信头像和昵称，跳转登录
  getUserProfile: function () {
    var that = this
    wx.getUserProfile({
      desc: '获取您的微信头像',
      success: function(res) {
        var userInfo = res.userInfo
        that.setData({
          userhead : userInfo.avatarUrl,
          // username : app.globalData.career_name,
          hasUserInfo: true,
        })
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  // 获取了头像却未登录,可前往登录
  bindtologin: function () {
    var islogin = app.globalData.islogin
    if(islogin == false){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '退出登录',
        content: '是否退出登录',
        success (res) {
          if (res.confirm) {
    //         userInfo: null,
    // token:null,
    // islogin: false,
    // career: null,
    // career_name:"点击登录/注册",
    // id: null
            app.globalData.userInfo=null
            app.globalData.token=null
            app.globalData.islogin=false
            app.globalData.career=null
            app.globalData.career_name="点击登录/注册"
            app.globalData.id=null
            wx.navigateTo({
              url: '/pages/login/login',
            })
            console.log('用户点击确定')
          }
        }
      })
    }
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
      username:app.globalData.career_name
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