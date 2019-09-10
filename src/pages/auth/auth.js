import React from 'react';
import common from '../../utils/common';
import api from "../../utils/api";

class Auth extends React.Component {
    componentDidMount() {
        let params = common.urlSearch(decodeURI(window.location.href));
        const code = params.code;
        if (code === undefined) {
            const redirectUri = 'http://wechat.jslesoft.com/auth';
            const weiXinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                'wxa3cbf60affa3a702' +
                '&redirect_uri=' +
                redirectUri +
                '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            window.location.href = weiXinUrl;
        } else {

        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default Auth;
