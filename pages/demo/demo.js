const app = getApp()
Page({
  data: {
    ishidden:false,
    infohidden:true,
    shidden:true,
    haslogin:false,
    login:"",
    teachNo:"",
    sign_all_data:[
      {
        "id": "10000000000",
        "name": "洪鸿煊",
        "sign": 2
      },
      {
        "id": "10000000001",
        "name": "傅君浩",
        "sign": 2
      },
      {
        "id": "10000000002",
        "name": "姚懿轩",
        "sign": 2
      }
    ],
    sign_on_data: [],
    sign_off_data: null,
  },

  sign_on_change: function(){
    var data = this.data.sign_all_data
    var sign_on = []
    var j = 0
    for(var i=0;i<data.length;i++){
      if(data[i].sign=='0'|data[i].sign=='1'){
        sign_on[j]=data[i]
        j++
      }
    }
    this.setData({
      ishidden: false,
      sign_on_data: sign_on
    })
  },
  sign_off_change: function(){
    var data = this.data.sign_all_data
    var sign_off = []
    var j = 0
    for(var i=0;i<data.length;i++){
      if(data[i].sign=='2'){
        sign_off[j]=data[i]
        j++
      }
    }
    this.setData({
      ishidden: true,
      sign_off_data: sign_off
    })
  },

  bindLookSign:function(e){
    var that = this
    var teachNo=e.detail.value.teachNo
    if(teachNo==""){
      wx.showToast({
        title: '授课编号不能空！',
        icon: 'none',
        duration: 1500
      }),setTimeout(function(){
        wx.hideToast()
      },2000)
    }else{
      if(this.data.haslogin==false){
        wx.showToast({
          title: '请前往登录',
          icon: 'none',
          duration: 1500
        }),setTimeout(function(){
          wx.hideToast()
        },2000)
      }else{
        if(app.globalData.career=="老师"){
        this.setData({
          teachNo:teachNo,
          infohidden:false
        })
        wx.request({
          url: 'http://39.106.43.42:8080/api/teacher/getRecord',
          data: {
            teachNo:teachNo
          },
          method:'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            "authorization": "bearer"+app.globalData.token 
          },
          success (res) {
            if(res.data.code=="0"){
              // that.setData({
              //   sign_all_data:res.data.data
              // })
              // 调用已签到的方法
              let data = res.data.data
              let sign_on = []
              let j = 0
              for(let i=0;i<data.length;i++){
                if(data[i].sign=='0'|data[i].sign=='1'){
                  sign_on[j]=data[i]
                  j++
                }
              }
              that.setData({
                ishidden: false,
                sign_all_data:data,
                sign_on_data: sign_on
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
        }else if(app.globalData.career=="学生"){
          this.setData({
            teachNo:teachNo,
            shidden:false
          })
          wx.request({
            url: 'http://39.106.43.42:8080/api/student/getRecord',
            data: {
              studentId:app.globalData.id,
              teachNo:teachNo
            },
            method:'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              "authorization": "bearer"+app.globalData.token 
            },
            success (res) {
              if(res.data.code=="0"){
                that.setData({
                  login:res.data.data
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
      }
    }
  },

  daiSign: function(e){
    var sid = e.currentTarget.dataset.item.id
    var teachNo = this.data.teachNo
    wx.showModal({
      title: '提示',
      content: '是否补签',
      success (res) {
        if (res.confirm) {
          console.log('确定补签')
          wx.request({
            url: 'http://39.106.43.42:8080/api/teacher/addSignRecord',
            method:'POST',
            data:{
              studentId:sid,
              teachNo:teachNo
            },
            header: {
              'content-type': 'application/json',
              "authorization": "bearer"+app.globalData.token
            },
            success (res) {
              if (res.data.data==1) {
                wx.showToast({
                  title: '添加成功',
                  icon: 'none',
                  duration: 1500
                }),setTimeout(function(){
                  wx.hideToast()
                },2000)
              }else{
                wx.showToast({
                  title: '添加失败',
                  icon: 'none',
                  duration: 1500
                }),setTimeout(function(){
                  wx.hideToast()
                },2000)
              }
            }
          })
        } else if (res.cancel) {
          console.log('取消补签')
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
    // var that = this
    this.setData({
      haslogin : app.globalData.islogin,
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