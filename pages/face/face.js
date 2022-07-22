// pages/face/face.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    career: '',
    career_name: '',
    face_img_hidden: true,
    face_img:''
  },
  clickFace(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var filePath = res.tempFilePaths;
        that.setData({
          face_img: filePath,
          face_img_hidden: false
        })
      }
    })
  },
  formSubmit: function(e){
    console.log(e);
    console.log(app.globalData.id);
    var face = this.data.face_img;
    console.log(face);
    // 表单图片数据不能为空
    if (e.detail.value.sname == ''){
      // 弹窗
      wx.showToast({
        title: '姓名不能空！',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    }else if(e.detail.value.snumber == ''){
      wx.showToast({
        title: '学号不能空！',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    }else if (face == ''){
      //照片
      wx.showToast({
        title: '照片不能空！',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    }else {
      this.setData({
        id: e.detail.value.snumber,
        career_name: e.detail.value.sname,
      })
      //提交信息--!!!--没写完
      wx.uploadFile({
        filePath: face,
        name: 'face',
        // 提交到的地址
        url: '',
        formData: {
          sname: career_name,
          snumber: id,
        },
        method: 'POST',
        header: {
          'content-type': 'multipart/form-data'
        },
        success(res){
          console.log(res.data);
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1500
          })
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
      id: app.globalData.id,
      career: app.globalData.career,
      career_name: app.globalData.career_name,
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