const auth_data = {
  "identity": {
    "methods": [
      "password"
    ],
    "password": {
      "user": {
        "domain": {
          "name": "hw76710221"
        },
        "name": "hw76710221",
        "password": "huaweicloud9"
      }
    }
  },
  "scope": {}
}

function getIAMToken(that) {
  wx.request({
    url: "https://iam.myhuaweicloud.com/v3/auth/tokens",
    method: 'POST',
    header: {
      "Content-Type": "application/json;charset=utf8"
    },
    data: {
      "auth": auth_data
    },
    success(res) {
      const promise = new Promise((resolve, reject) => {
        that.setData({
          token: res.header["X-Subject-Token"]
        })
        // console.log(res.header["X-Subject-Token"])
        resolve(res)
      })
      promise.then(res => {
        getDeviceList(that)
      })
    },
    fail(res) {
      console.log("请求失败")
    },
    complete() {}
  })
}

function getDeviceList(that) {
  wx.request({
    url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/wx0cbb84791fc5999b/devices',
    method: 'GET',
    header: {
      "X-Auth-Token": that.data.token,
      "Content-Type": "application/json"
    },
    data: {
      "product_id": "5ffc57a1aaafca02dbc2b0f2"
    },
    success(res) {
      console.log(res.data.devices)
      that.setData({
        deviceInfo: res.data.devices,
        deviceNum: res.data.devices.length
      })
      console.log(that.data.deviceNum)
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this //将当前对象赋值
    getIAMToken(that)
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