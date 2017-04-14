var app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        result: ""
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        var that = this;
        that.setData({
            inputVal: e.detail.value
        });
        wx.request({
            url: app.globalData.serverAddr + '/api/v1.0/info?ip=' + that.data.inputVal,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res.data.data.ip_information)
                that.setData({
                    result: res.data.data.ip_information
                })
            }
        })
    }
})
