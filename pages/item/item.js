// pages/item/item.js
// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    wx.showLoading({ title: '拼命加载中...' })

    app.douban.findOne(params.id)
      .then(d => {
        console.log('item:'+d)
        this.setData({ title: d.title, movie: d })
        wx.setNavigationBarTitle({ title: d.title + ' « 电影 « 豆瓣' })
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {} })
        console.error(e)
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: this.data.title + ' » 电影 » 豆瓣' })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      desc: this.data.title,
      path: '/pages/item?id=' + this.data.id
    }
  }
})