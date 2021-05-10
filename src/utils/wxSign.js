import wx from 'weixin-js-sdk';
import api from './api';

export default {
    getWXSign(showLoading = true) {
        return new Promise((resolve, reject) => {
            api.postData('/api/WeChat/GetWeChatSign', {  
            }, showLoading).then(data => {
                //console.log('GetWeChatSign:', data.data)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                    signature: data.data.signature, // 必填，签名，见附录1
                    jsApiList: [
                        "scanQRCode",
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "onMenuShareQQ",
                        "getLocation",
                        "openLocation",
                        "WeixinJSBridge",
                        "chooseWXPay",
                        "showMenuItems",
                        "hideMenuItems",
                        "chooseImage",
                        "uploadImage",
                        "downloadImage",
                        "previewImage",
                        "getLocalImgData",
                        "hideAllNonBaseMenuItem"
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    resolve(wx);
                });
                wx.error(function (res) {
                    //console.log('error', res);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            }).catch(e => {
                reject(e);
            });
        });
    }
};
