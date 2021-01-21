const URL = "https://iam.myhuaweicloud.com/v3/auth/tokens"
var datastreamList = []
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
  "scope": {
  }
}

function getDeviceList(that) {
  const promise = new Promise((resolve, reject) => {
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
        that.setData({
          deviceInfo: res.data.devices,
          deviceNum: res.data.devices.length
        })
        resolve(res)
      }
    })
  })
  promise.then(() => {
    getDeviceData(that)
  })
}

function getDeviceData(that){
  var num = 0
  const promise = new Promise((resolve, reject) => {
    for (var i = 0; i < that.data.deviceNum; i++) {
      wx.request({
        url: "https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/wx0cbb84791fc5999b/devices/" + that.data.deviceInfo[i].device_id + "/shadow", 
        header: {
          "X-Auth-Token": that.data.token, 
          "Content-Type": "application/json"
        }, 
        data: {}, 
        success(res) {
          datastreamList.push(res.data.shadow[0].reported.properties)
          num++
          if (num == that.data.deviceNum) {
            resolve()
          }
        }, 
        fail(res) {
          console.log("请求失败")
        }
      })
    }
  })
  promise.then(() => {
    that.setData({
      dataList: datastreamList
    })
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