// import cookie from 'react-cookie';

export default {
    urlSearch(str) {
        let name, value;
        let num = str.indexOf('?');
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
        let arr = str.split('&'); //各个参数放到数组里
        console.log(arr);
        let params = {};
        for (let i = 0; i < arr.length; i++) {
            num = arr[i].indexOf('=');
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                params[name] = value;
            }
        }
        return params;
    },
    getCurrentUrlParams() {
        return this.urlSearch(decodeURI(window.location.href));
    },
};
