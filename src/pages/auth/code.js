import React from 'react';
import common from '../../utils/common';
import api from '../../utils/api';

import { connect } from 'react-redux';
import {
    saveLogin,
    saveLogin2,
    saveAppid,
    loggedUserReducer,
} from '../../store/actions';

class Code extends React.Component {
    componentDidMount() {
        // let params = common.urlSearch(decodeURI(window.location.href));
        let host = window.location.host;
        //const code = params.code;
        // if (window.location.host === 'localhost:3000') {
        //     host = 'http://wechat.jslesoft.com'
        // }

        api.getHost().then(res => {

            if (loggedUserReducer().appid == ''
                || loggedUserReducer().appid == null
                || loggedUserReducer().appid == undefined) {

                api.getData('/api/WeChat/GetAppId', {
                    url: 'http://' + host,
                }, true).then(res => {
                    this.props.saveAppid(res.data);
                    setTimeout(() => {
                        this.auth(res.data);//必须传值，state有延迟 neo.li
                    }, 1000);

                });
            } else {
                this.auth(loggedUserReducer().appid);
            }
        });

    }

    auth(appid) {
        /*
        let res = {
            data:{
                openid:'oYSv9v3HR0pR6BwI8MmHRh3DFMYE',
                token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTM2MDUxNDMzNTQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiMUIzMEIxQkU1QTExMTA5QkE0OUE4Rjg1QzM2NTM1OUMxNUNBNTdDM0QwRThDODlDNjNGMzc4REFCM0Y0MTI5QzhBRUU1MzUyMjI3MEYwNzYwMzlDRTY2MjQ2MjYzOTNCMzUzQkMwQkI4QkFDOUZBNTZCRTUzMzNEOUM1Q0Y0NTRGRkNGQzYzNTIwOUNDQTkwNzVFQkUwQkRCNjI0ODI0NzI5QUY4RUYxQjFDMjM1RUMyMzU4QTcwOUI0MDVCQzBDNEU2Mjk2OUIzNkIzMkFEMDAwMDIxMTY1ODExM0JEQjY1MzA0OTgzQTI5ODdGRDZDQTAyRkEzMDg5OTcwOEVGRUY3Rjc0MjBCMEZFNDNDMUYzOTk2Q0FGN0ZDNjBGMkYzN0I0N0EyMDEyRTgxMEFFMTNGRjFGRjY1M0MwMDcwQjFFNzlEREU3QTEyNkFBMTNDMjcxODIyRkYwRkJCRTA4RjY5Nzc5MjAwMjVBRDc0MTUzRTJFNkY5Q0JGQkRENzZCMzlFMzc5N0FGRkM5QkY5NkMyRkZDNkYzM0JEMzMxQTEzNDMwNDc0QTJFMTBGNzA1NjIzQkFEOUIwQTQ2RDQ4N0ZERTEzMkI4MkJEQ0MwNTQzOTUxRUFCOThCRUMzMjFGRDc2NDYwQzYyNDQ0MURDMUI4M0I0MkNFOTM4RUI3MUQ5MTg3Q0U5OTBDNEIwQjBDQTg3OUE4OTdCMkRFNjZDN0FEMDIyQ0QyNDM0MTVBMkQ3MTI5Qjk2Rjc1NzJFQUFBRjdBQjE5RUQ1MzQyQzE2NzVBOTQ2QThGNTAxMjJBMjg2NDdGM0FCNkQxRDQxQkEyNUUxOTI3MjMxNDA0QjE2REM2QjkwRTY1QjY4RDY2NjBFMjc4Rjk1NTk2REUwQzgzRkVERjgyNkIzMDYxQTcwREI3RTc1QzA5MUU3NTUzQTU5QTE0NTkwODdFRDMzODcxNTIyQTNFQUU0NjBCM0NGREFDOUJDODI4QUFBODJBOTk1RDg4MkZBRjBERTBBMjEzNkM2MDlFNkQxRkREMDBGOSIsImV4cCI6MTU4MjI0Mjc2MiwiaXNzIjoiRFJHV1kuU2VydmVyIiwiYXVkIjoiRFJHV1kuTW9iaWxlIn0.A_zul7w-hXhFg48imWgQ9ddL-xpDWPLRm8N9esNZ78Y'
            }
        }
                this.props.saveLoginInfo(res.data);
                api.getData('/api/WeChat/GetUserInfo', {
                    openid: res.data.openid,
                }, true).then(res2 => {
                    if (res2.data != 'false') {
                        this.props.saveLoginInfo2(res2.data);
                        if (sessionStorage.getItem('redirect') || sessionStorage.getItem('redirect') != null || sessionStorage.getItem('redirect') != undefined) {
                            this.props.history.replace(sessionStorage.getItem('redirect'));
                        } else {
                            this.props.history.replace('/home');
                        }
                    } else {
                        this.props.history.replace('/login');
                    }
                });
         */

        let params = common.urlSearch(decodeURI(window.location.href));
        let host = window.location.host;
        const code = params.code;
        if (code === undefined) {
            const redirectUri = 'http://' + host + '/auth';
            const weiXinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                //loggedUserReducer().appid +
                appid +
                '&redirect_uri=' +
                redirectUri +
                '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            window.location.href = weiXinUrl;
        }
        else {
            console.log('code', code);
        } 
    }

    render() {
        return (
            <div />

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

        saveAppid: (info) => {
            dispatch(saveAppid(info));
        },
    };
};
export default connect(null, kk)(Code);
