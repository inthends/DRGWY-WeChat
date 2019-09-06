import axios from "axios";
import VueCookies from 'vue-cookies';

const baseURL = 'http://wxapi.turboradio.cn';
const post = (url, params) => {
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;
    axios.defaults.timeout = 60000;
    const Authorization = 'Authorization';
    axios.defaults.headers.common[Authorization] = 'Bearer ' + VueCookies.get('openId');
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then((response) => {
                // 未登录拦截
                resolve(response.data);
            }, (err) => {
                reject(err);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const get = (url) => {
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;
    axios.defaults.timeout = 60000;
    const Authorization = 'Authorization';
    axios.defaults.headers.common[Authorization] = 'Bearer ' + VueCookies.get('openId');
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default {
    post,
    get,
};
