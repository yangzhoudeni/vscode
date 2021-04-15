// pages/citylist/citylist.js
const map = require('../../lib/map.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    citymap: {},
    letters: ['A','B','C','D','E','F','G','H',
      'I','J','K','L','M','N','O','P','Q','R',
      'S','T','U','V','W','X','Y','Z'],
    letter: 'A'  
  },

  /** 选择城市 */
  selectCity(event){
    let city = event.currentTarget.dataset.city;
    console.log(city);
    // 因为回到首页后需要获取当前选中的城市
    // 所以需要在返回之前，把city存入App.globalData
    // 然后再主页直接使用即可
    // getApp()可以拿到小程序唯一的app对象。
    getApp().globalData.city = city
    wx.navigateBack();
  },

  /** 点击导航字母后执行 */
  tapLetter(event){
    let l = event.currentTarget.dataset.letter;
    this.setData({
      letter: l
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      citymap: map
    })
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