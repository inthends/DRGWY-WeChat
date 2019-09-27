import React from 'react';
import common from '../../utils/common';
import api from "../../utils/api";

import {connect} from 'react-redux';
import {
    saveLogin,
    saveLogin2
} from '../../store/actions';

class Auth extends React.Component {
    componentDidMount() {
        let params = common.urlSearch(decodeURI(window.location.href));
        const code = params.code;
        console.log(code)
        if (code === undefined) {
            const redirectUri = 'http://wechat.jslesoft.com/auth';
            const weiXinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                'wxa3cbf60affa3a702' +
                '&redirect_uri=' +
                redirectUri +
                '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            window.location.href = weiXinUrl;
        } else {
            api.postData('/api/WeChat/GetWeChatInfo', {
                code: code
            }, true).then(res => {
                this.props.saveLoginInfo(res.data);
                api.getData('/api/WeChat/GetUserInfo', {
                    openid: res.data.openid
                }, true).then(res2 => {
                    if (res2.data != 'false') {
                        this.props.saveLoginInfo2(res2.data);
                        if (sessionStorage.getItem('redirect')) {
                            this.props.history.replace(sessionStorage.getItem('redirect'))
                        } else {
                            this.props.history.replace('/home')
                        }
                    } else {
                        this.props.history.replace('/login')
                    }
                });
            });
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

const kk = (dispatch, ownProps) => {
    return {
        saveLoginInfo: (info) => {
            dispatch(saveLogin(info));
        },

        saveLoginInfo2: (info) => {
            dispatch(saveLogin2(info));
        },
    };
};
export default connect(null, kk)(Auth);
