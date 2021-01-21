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
    "domain": {
      "name": "linzhihao037"
    }
  }
}

function getIAMToken(that) {
  wx.request({
    url: URL,
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
        resolve(res)
      })
      promise.then(res => {
        getDeviceList(that)
      })
    },
    fail(res) {
      console.log("请求失败")
    }
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
      that.setData({
        deviceInfo: res.data.devices,
        deviceNum: res.data.devices.length
      })
      console.log(res.data.devices)
    }
  })
}

Page({
  data: {
    fanSec: 0,
    lightSec: 0
  },
  lightSecInput: function (e) {
    this.setData({
      lightSec: e.detail.value
    })
  },
  fanSecInput: function (e) {
    this.setData({
      fanSec: e.detail.value
    })
  },
  LightbuttonClick: function (e) {
    var idx = e.currentTarget.id
    wx.request({
      url: "https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/wx0cbb84791fc5999b/devices/" + this.data.deviceInfo[idx].device_id + "/commands",
      method: 'POST',
      header: {
        "X-Auth-Token": this.data.token,
        "Content-Type": "application/json"
      },
      data: {
        "command_name": "light_on",
        "paras": {
          "time": parseInt(this.data.lightSec)
        }
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log("请求失败")
      }
    })
  },
  FanbuttonClick: function (e) {
    var idx = e.currentTarget.id
    console.log(this.data.fanSec)
    wx.request({
      url: "https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/wx0cbb84791fc5999b/devices/" + this.data.deviceInfo[idx].device_id + "/commands",
      method: 'POST',
      header: {
        "X-Auth-Token": this.data.token,
        "Content-Type": "application/json"
      },
      data: {
        "command_name": "fan_on",
        "paras": {
          "time": parseInt(this.data.fanSec)
        }
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log("请求失败")
      }
    })
  },
  onLoad: function () {
    var that = this //将当前对象赋值
    getIAMToken(that)
  }
})