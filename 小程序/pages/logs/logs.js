//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  //页面渲染后执行
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
