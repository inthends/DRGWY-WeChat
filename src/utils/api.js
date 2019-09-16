import UDToast from './ud-toast';
import axios from 'axios';
import {getToken} from '../store/actions';

export default {
    network(request) {
        axios.defaults.withCredentials = true;
        let url = request.url;
        let params = request.params;
        let showLoading = request.showLoading;
        let method = request.method ? request.method : 'GET';
        showLoading && UDToast.showLoading();
        return new Promise((resolve, reject) => {
            let a = url;
            if (!a.startsWith('/')) {
                a = '/' + url;
            }
            axios.defaults.headers['Authorization'] = 'Bearer ' + getToken();
            let host = 'http://hf.jslesoft.com:8018';
            let complete = host + a;
            if (Object.keys(params).length > 0) {
                console.log('url', complete);
                console.log('参数', params);
            }
            console.log(complete)
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
                    this.fail(showLoading, error, reject);

                });
            }

        });
    },
    success(showLoading, res, resolve, reject) {
        showLoading && UDToast.hiddenLoading();
        const data = res.data;
        resolve(data);
    },
    fail(showLoading, error, reject) {
        showLoading && UDToast.hiddenLoading();
        showLoading && UDToast.showError('当前网络不佳');
        console.log('error11', error);
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
            const err = error.error ? error.error : '当前网络不佳';
            UDToast.hiddenLoading();
            UDToast.showError(err);
            return [];

        });
    },
};



