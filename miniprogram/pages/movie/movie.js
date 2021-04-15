// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen : false,
    movie : {},
    id : 0,
    comments : []
  },

  /** 点击收起小箭头图标后，触发 */
  tapClamp(){
    this.setData({
      isOpen : !(this.data.isOpen)
    })
  },

  /** 点击视频剧照图片后执行 */
  previewImage(event){
    console.log(event)
    let index = event.currentTarget.dataset.index;
    // 全屏预览图片
    let urls = this.data.movie.thumb;
    // url: https://xxxxxx/xxxx/xxx/xxx@xxxx
    // 整理路径，保留高清大图的图片地址
    urls.forEach((url, i)=>{
      urls[i] = url.split('@')[0];
    })
    wx.previewImage({
      urls: urls,
      showmenu: true,
      current: urls[index]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * /movie?id=1
   * 将会把id=1封装到options中
   * https://api.tedu.cn/detail.php?id=1
   */
  onLoad: function (options) {
    console.log(options)

    let id = options.id;
    this.setData({id: id});
    
    // 发送请求，访问电影详情
    wx.request({
      url: 'https://api.tedu.cn/detail.php',
      method: 'GET',
      data: {id: id},
      success: (res)=>{
        console.log(res);
        this.setData({
          movie: res.data
        })
      }
    });

    // 加载当前电影的评论   访问云数据库
    this.loadComments();
  },

  // 加载当前电影的评论   访问云数据库
  loadComments(){
    const db = wx.cloud.database()
    db.collection('comments').where({
      movieid: this.data.id
    })
    .skip(0).limit(3)
    .get()
      .then(res=>{
        console.log(res)
        // 把评论列表存储在data中 然后渲染页面
        this.setData({
          comments: res.data
        })
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