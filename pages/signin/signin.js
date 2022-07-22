// pages/signin/signin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  // 从后台导入数据--数据格式可能不一样
  data: {
    index: 0,
    cIndex: 0,
    courses:[],
    days:[],
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    var that = this
    var courseNo=this.data.courses[this.data.index].no
    wx.request({
      url: 'http://39.106.43.42:8080/api/teacher/getTeachRecord',
      data:{
        courseNo:courseNo,
        id:app.globalData.id
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "authorization": "bearer"+app.globalData.token
      },
      success (res) {
        if(res.data.code=="0"){
          that.setData({
            days: res.data.data
          })
        }else{
          wx.showToast({
            title: '查询数据失败！',
            icon: 'none',
            duration: 1500
          }),setTimeout(function(){
            wx.hideToast()
          },2000)
        }
      }
    })
  },

  bindPickerChange_2: function (e) {
    this.setData({
      cIndex: e.detail.value
    })
  },

  bindSignIn:function(){
    var teachNo=this.data.days[this.data.cIndex].no
    wx.request({
      url: 'http://39.106.43.42:8080/api/teacher/StartSign',
      data:{
        teachNo: teachNo
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "authorization": "bearer"+app.globalData.token
      },
      success (res) {
        if(res.data.code=='0'){
          wx.showToast({
            title: '签到成功！请前往签到管理查看',
            icon: 'none',
            duration: 1500
          }),setTimeout(function(){
            wx.hideToast()
          },2000)
        }else if (res.data.code=='1'){
          wx.showToast({
            title: '签到失败',
            icon: 'none',
            duration: 1500
          }),setTimeout(function(){
            wx.hideToast()
          },2000)
        }
      }
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
    var that = this
    if(app.globalData.career=='学生'){
      wx.showToast({
        title: '学生不能使用该功能',
        icon: 'none',
        duration: 1500
      }),setTimeout(function(){
        wx.hideToast()
      },2000)
      wx.navigateBack({
        delta: 0,
      })
    }else if(app.globalData.career=='老师'){
      wx.request({
        method:'POST',
        url: 'http://39.106.43.42:8080/api/teacher/getCourseList',
        data: {
          id: app.globalData.id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' ,
          "authorization": "bearer"+app.globalData.token
        },
        success (res) {
          if(res.data.code=='0'){
            that.setData({
              courses: res.data.data
            })
            //获取days
            let courseNo=res.data.data[that.data.index].no
            wx.request({
              url: 'http://39.106.43.42:8080/api/teacher/getTeachRecord',
              data:{
                courseNo:courseNo,
                id:app.globalData.id
              },
              method:"POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                "authorization": "bearer"+app.globalData.token
              },
              success (res) {
                if(res.data.code=="0"){
                  that.setData({
                    days: res.data.data
                  })
                }else{
                  wx.showToast({
                    title: '查询数据失败！',
                    icon: 'none',
                    duration: 1500
                  }),setTimeout(function(){
                    wx.hideToast()
                  },2000)
                }
              }
            })
          }else{
            wx.showToast({
              title: '查询失败！',
              icon: 'none',
              duration: 1500
            }),setTimeout(function(){
              wx.hideToast()
            },2000)
          }
          
        }
      })
    }
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