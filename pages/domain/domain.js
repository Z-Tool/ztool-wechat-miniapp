var app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        result: "",
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
            url: app.globalData.serverAddr + '/api/v1.0/whois?domain=' + that.data.inputVal,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res.data.data)
                var r = res.data.data;
                delete r.contacts;
                delete r.raw;
                delete r.registrar;
                delete r.status;
                delete r.nameservers;
                var creation_date = new Date(r.creation_date[0]);
                r.creation_date = creation_date.toLocaleString();
                var expiration_date = new Date(r.expiration_date[0]);
                r.expiration_date = expiration_date.toLocaleString();
                var updated_date = new Date(r.updated_date[0]);
                r.updated_date = updated_date.toLocaleString();
                that.setData({
                    result: res.data.data
                })
            }
        })
    }
})
