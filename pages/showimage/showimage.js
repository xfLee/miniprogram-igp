var xml2json = require('xmlstring2json');
const URL = 'https://taike-marked-image.obs.cn-north-4.myhuaweicloud.com'
var filekeyContentlist = []

function getDictionary(that) {
  wx.request({
    url: URL + '/' + '?prefix=' + that.data.device, //查询特定前缀的所有文件名字
    method: 'GET',
    data: {},
    success(res) { //
      const promise = new Promise((resolve, reject) => {
        var json_data = xml2json(res.data) //xml转json
        filekeyContentlist = json_data.ListBucketResult.Contents
        resolve(res)
      })
      promise.then(res => {
        getImage(that)
      })
    },
    fail(res) {
      console.log("请求失败")
    }
  })
}

function getImage(that) {
  for (var index = 0; index < filekeyContentlist.length; index++) {
    wx.downloadFile({
      url: 'https://taike-marked-image.obs.cn-north-4.myhuaweicloud.com' + '/' + filekeyContentlist[index].Key["#text"],
      fail: (res) => {},
      success: (res) => {
        let newarray = [res.tempFilePath]
        that.setData({
          filepathlist: that.data.filepathlist.concat(newarray)
        })
      },
    })
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: '',
    filepathlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      device: options.device
    })
    var that = this //将当前对象赋值
    getDictionary(that)
  },
  previewImage: function (e) {
    console.log(e.currentTarget)
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
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