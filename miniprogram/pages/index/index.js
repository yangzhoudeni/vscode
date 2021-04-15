// index.js
// 获取应用实例
const app = getApp()
// 引入地图库
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    pageno: 1,
    cid: 1,
    movieList : [],    // 用于存储当前电影列表
    city: '加载中'
  },

  /** 顶部导航的点击事件 */
  tapNav(event){
    let id = event.target.dataset.id;
    this.setData({
      cid : id,
      movieList: [],
      pageno: 1
    });
    // 发送请求，更新列表数据
    this.loadData();
  },

  /** 发送请求，加载当前cid下的列表数据 追加到movieList 
   *  页码     offset   每页20条
   *  1        0
   *  2        20
   *  3        40
   *  4        60
   *  pageno   (pageno-1)*20
  */
  loadData(){
    let offset = (this.data.pageno-1)*20;
    wx.showLoading({
      title: '加载中...'
    })
    wx.request({
      url: 'https://api.tedu.cn/index.php',
      method: 'GET',
      data: {cid: this.data.cid, offset: offset},
      success: res=>{
        // 把得到的结果 添加到movieList中
        let ml = this.data.movieList;
        ml = ml.concat(res.data);
        this.setData({
          movieList: ml
        });
        console.log(this.data.movieList)
        wx.hideLoading()
      }
    });
    
  },

  /**监听当前页面的触底事件 */
  onReachBottom(){
    // this.setData({
    //   pageno : ++this.data.pageno
    // })
    let pageno = this.data.pageno;
    pageno++;
    this.setData({
      pageno : pageno
    });
    console.log('readBottom...'+this.data.pageno)
    this.loadData();
  }, 

  /** 页面初始化加载时执行 */
  onLoad() {
    // 加载热映列表
    this.loadData();
    // 加载当前地址
    qqmapsdk = new QQMapWX({
      key: 'SQKBZ-EKJ6J-QAZF3-KC2ZN-UGTGJ-VWFNY'
    });
    qqmapsdk.reverseGeocoder({
      success: (res)=>{
        this.setData({
          city: res.result.address_component.city
        })
        // 设置app中的globalData
        getApp().globalData.city = res.result.address_component.city
      }
    })
  },
  onShow(){
    this.setData({
      city: getApp().globalData.city
    })
  }
})
