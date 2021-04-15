// pages/theatre/theatre.js
// 引入地图库
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theatreList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载当前地址
    qqmapsdk = new QQMapWX({
      key: 'SQKBZ-EKJ6J-QAZF3-KC2ZN-UGTGJ-VWFNY'
    });
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
    console.log(getApp().globalData.city)
    qqmapsdk.search({
      keyword: '影院',
      region: getApp().globalData.city,
      pagesize: 20,
      success: (res)=>{
        console.log(res.data)
        this.setData({
          theatreList : res.data
        })
      }
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