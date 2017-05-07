var app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        result: "",
        loading: false,
        msg: ""
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
            inputVal: e.detail.value,
            loading: true,
            result: "",
            msg: ""
        });
        wx.request({
            url: app.globalData.serverAddr + '/api/v1.0/info?ip=' + that.data.inputVal,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res.data.status)
                if (res.data.status == 'success') {
                    that.setData({
                        result: res.data.data.ip_information,
                        loading: false,
                        msg: ""
                    })
                } else {
                    that.setData({
                        loading: false,
                        msg: '查询错误，请检查输入内容或者联系小程序开发人员。'
                    })
                }
            }
        })
    }
})
