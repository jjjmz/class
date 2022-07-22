// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:['老师','学生'],
    item:'学生'
  },
  radiochange:function(e){
    this.setData({
      item:e.detail.value
    })
  },
  formSubmit: function(e){
    // 表单数据不能为空
    if (e.detail.value.spassword == ''){
      wx.showToast({
        title: '密码不能空！',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    }else if(e.detail.value.sid == ''){
      wx.showToast({
        title: '学号不能空！',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    }else {
      if(this.data.item=='学生'){
        //发起网络请求
        wx.request({
          method:'POST',
          url: 'http://39.106.43.42:8080/api/student/login',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            // "authorization":"bearer"+wx.getStorageSync('token')
          },
          data: {
            id: e.detail.value.sid,
            password: e.detail.value.spassword
          },
          //成功获取数据
          success: function (res) {
            console.log(e);
            console.log(res);
            if(res.data.code == "1002"){
              console.log("失败");
              wx.showToast({
                    title: "登录失败,请重试",
                    icon: 'none',
                    duration: 1500
              }),setTimeout(function(){
                      wx.hideToast()
                },2000)
            }else{
              // 存全局变量
              app.globalData.id = res.data.data.id
              app.globalData.career_name = res.data.data.name
              app.globalData.career="学生"
              app.globalData.token=res.data.data.token
              app.globalData.islogin=true
              wx.setStorage({
                key:"token",
                data:res.data.data.token
              })
              console.log(app.globalData.id);
              console.log("学生登录成功");
              // 提示
              wx.showToast({
                title: '登录成功',
                icon: 'none',
                duration: 1500
              }),setTimeout(function(){
                  wx.hideToast()
                },2000)
              //返回mine
              wx.navigateBack({
                delta: 0,
              })
            }          
          },
          fail: function (res) {
                wx.showToast({
                  title: '请求失败',
                  icon: 'none',
                  duration: 1500
                }),setTimeout(function(){
                    wx.hideToast()
                  },2000)
          }
        })
      }else{
        //发起网络请求
        wx.request({
            url: 'http://39.106.43.42:8080/api/teacher/login',
            data: {
              id: e.detail.value.sid,
              password: e.detail.value.spassword
            },
            method:"POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              // "authorization":"bearer"+wx.getStorageSync('token')
            },
            success: function (res) {
              if(res.data.code == "1002"){
                wx.showToast({
                  title: "登录失败,请重试",
                  icon: 'none',
                  duration: 1500
                }),setTimeout(function(){
                    wx.hideToast()
                  },2000)
              }else{
                // 存全局变量
                app.globalData.id = res.data.data.id
                app.globalData.career_name = res.data.data.name
                app.globalData.career="老师"
                app.globalData.token=res.data.data.token
                app.globalData.islogin=true
                wx.setStorage({
                  key:"token",
                  data:res.data.data.token
                })
                // 提示
                console.log("老师登录成功");
                wx.showToast({
                  title: '登录成功',
                  icon: 'none',
                  duration: 1500
                }),setTimeout(function(){
                    wx.hideToast()
                  },2000)
                //返回mine
                wx.navigateBack({
                  delta: 0,
                })
              }              
            },
            fail: function (res) {
              wx.showToast({
                title: '请求失败',
                icon: 'none',
                duration: 1500
              }),setTimeout(function(){
                  wx.hideToast()
                },2000)
            }
        })
      }
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