// pages/vocabulary/vocabulary.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 从后台导入数据--数据格式可能不一样
    index: 0,
    courses: [],
    days: [],
  },
  bindPickerChange: function(e) { 
    var that = this
    this.setData({
      index:e.detail.value
    });
    if (app.globalData.career=='老师') {
      wx.request({
      method:'POST',
      url: 'http://39.106.43.42:8080/api/teacher/getTeachRecord',
      data: {
        courseNo: this.data.courses[this.data.index].no,
        id: app.globalData.id
      },
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
      wx.request({
        method:'POST',
        url: 'http://39.106.43.42:8080/api/student/getTeachRecord',
        data: {
          courseNo: this.data.courses[this.data.index].no,
          id: app.globalData.id
        },
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
    var that = this
    if (app.globalData.career=="老师") {
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
          wx.request({
            method:'POST',
            url: 'http://39.106.43.42:8080/api/teacher/getTeachRecord',
            data: {
              courseNo: that.data.courses[that.data.index].no,
              id: app.globalData.id
            },
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
    }else{
      wx.request({
        method:'POST',
        url: 'http://39.106.43.42:8080/api/student/getCourseList',
        data: {
          id: app.globalData.id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          "authorization": "bearer"+app.globalData.token
        },
        success (res) {
          if(res.data.code=='0'){
            that.setData({
              courses: res.data.data
            })
            //获取days
            wx.request({
              method:'POST',
              url: 'http://39.106.43.42:8080/api/student/getTeachRecord',
              data: {
                courseNo: that.data.courses[that.data.index].no,
                id: app.globalData.id
              },
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