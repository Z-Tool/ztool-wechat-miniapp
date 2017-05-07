var app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        result: "",
        ip_info: "",
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
            result: "",
            msg: ""
        });
    },
    inputTyping: function (e) {
        var that = this;
        that.setData({
            inputVal: e.detail.value,
            loading: true,
            result: ""
        });
        wx.request({
            url: app.globalData.serverAddr + '/api/v1.0/nslookup?domain=' + that.data.inputVal,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if (res.data.status == 'success') {
                    // console.log(res.data.data);
                    var r = res.data.data
                    that.setData({
                        result: r['DNS record'],
                        ip_info: r['IP infomation'],
                        loading: false,
                        msg: ""
                    });
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
