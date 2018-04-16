//index.js
//获取应用实例
const app = getApp()

Page({
  
  data: {
    //轮播页数组
    imgUrls: [    'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    imageWidth: wx.getSystemInfoSync().windowWidth,
    yetinglist:[],
    currencyF_Name: '',  
    //是否显示指适点
    indicatorDots: true,
    //是否轮播
    autoplay: true,
    //
    interval: 5000,
    duration: 1000,
    inputShowed:false,
    inputVal:"",
    //轮播页当前index
    swiperCurrent:0,

//用户信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent)
  },
  //列表点击事件
  readDetail: function(e) {
    //跳转到其他页面
    wx.navigateTo({
      url: '../twoVC/twovc?id='+e.currentTarget.dataset.id
    })
   // console.log(e.currentTarget.dataset.id);
  },



  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that =this;
    //获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //网络解析
    wx.request({   url:'http://mobile.ximalaya.com/mobile/v1/album/track/ts-1499312754612?albumId=260769&device=iPhone&isAsc=true&pageId=1&pageSize=20&',
      success:function(res) {
        console.log(res.data.data.list)
         that.setData({
           yetinglist:res.data.data.list,
          
        })
        
      }
      
    })
   
  

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  
})
