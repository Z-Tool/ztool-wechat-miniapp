var app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        result: "",
        ip_info: ""
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            result: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: "",
            result: ""
        });
    },
    inputTyping: function (e) {
        var that = this;
        that.setData({
            inputVal: e.detail.value
        });
        wx.request({
            url: app.globalData.serverAddr + '/api/v1.0/nslookup?domain=' + that.data.inputVal,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res.data.data);
                var r = res.data.data
                that.setData({
                    result: r['DNS record'],
                    ip_info: r['IP infomation']
                });
            }
        })
    }
})
