import UDToast from './ud-toast';
import axios from 'axios';
import {getToken, saveLogin2, loseLogin} from '../store/actions';
import store from '../store/store';
import qs from 'qs';

export default {
    network(request) {
        axios.defaults.withCredentials = true;
        let url = request.url;
        let params = request.params;
        let showLoading = request.showLoading;
        let method = request.method ? request.method : 'GET';
        showLoading && UDToast.showLoading();


        return new Promise((resolve, reject) => {

            //根据微信url获取接口host neo add
            let oneurl = 'http://hf.jslesoft.com:8008/api/WeChat/GetServerUrl';//接口统一管理中心
            let host = window.location.host;
            if (window.location.host.includes('localhost:3000')) {
                host = 'wechat.jslesoft.com'
            }
            axios.get(oneurl, {
                params: {url: 'http://' + host},
            }).then(result => {

                host = result.data.data;
                let a = url;
                if (!a.startsWith('/')) {
                    a = '/' + url;
                }

                axios.defaults.headers['Authorization'] = 'Bearer ' + getToken();
                axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

                let complete = host + a;

                console.log('complete=' + complete);

                if (method === 'GET') {
                    axios.get(complete, {
                        params: params,
                    }).then(res => {
                        this.success(showLoading, res, resolve, reject);
                    }).catch(error => {
                        this.fail(showLoading, error, reject);
                    });
                } else {
                    axios.post(complete, params).then(res => {
                        console.log(res);
                        this.success(showLoading, res, resolve, reject);
                    }).catch(error => {
                        console.log(error);
                        this.fail(showLoading, error, reject);
                    });
                }

            }).catch(error => {
                this.fail(showLoading, error, reject);
            });

        });
    },
    success(showLoading, res, resolve, reject) {
        showLoading && UDToast.hiddenLoading();
        const data = res.data;
        resolve(data);


    },
    fail(showLoading, error, reject) {
        showLoading && UDToast.hiddenLoading();
        store.dispatch(loseLogin());
        reject(error);
    },


    getData(url, params = {}, showLoading = true) {
        return this.network({
            url: url,
            params: params,
            showLoading: showLoading,
            method: 'GET',
        });
    },
    postData(url, params = {}, showLoading = true) {
        params = qs.stringify(params);
        return this.network({
            url: url,
            params: params,
            showLoading: showLoading,
            method: 'POST',
        });
    },
    /**
     *
     * @param requests
     *
     * requests格式：  [{url:'/order',params:{},method:'GET'},{url:'/user',params:{},method:'POST'}] method默认POST
     *
     */
    multiFetchData(requests) {
        if (!requests || requests.length === 0) {
            UDToast.showError('request无效');
        }
        UDToast.showLoading();
        return Promise.all(requests.map(item => {
            return this.network({
                url: item.url,
                params: item.params,
                showLoading: false,
                method: item.method ? item.method : 'POST',
            });
        })).then(res => {
            UDToast.hiddenLoading();
            return res;
        }).catch(error => {
            console.log(error);
            const err = error.error ? error.error : '当前网络不佳';
            UDToast.hiddenLoading();
            return [];
        });
    },

    getHost() {
        return new Promise((resolve, reject) => {
            let host = sessionStorage.getItem('host') || '';
            if (host && host.length > 0 && host !== 'undefined') {
                resolve();
            } else {
                let h = window.location.host;
                if (h.includes('localhost')) {
                    h = 'a6testwechat.jslesoft.com';
                }
                let oneurl = 'http://hf.jslesoft.com:8008/api/WeChat/GetServerUrl';//接口统一管理中心
                this.getData(oneurl, {url: 'http://' + h}, false).then(result => {
                    let host = result.data;
                    sessionStorage.setItem('host', host);
                    localStorage.setItem('host', host);
                    console.log('gethost', host);
                    resolve();
                }).catch(() => {
                    reject();
                });
            }

        });
    },
};



