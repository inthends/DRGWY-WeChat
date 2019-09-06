import {Toast} from 'vant';

const openLoading = (msg) => {
    Toast.loading({
        mask: true,
        message: msg ? msg : '加载中...',
        duration: 0,
    });
};
const clearLoading = () => {
    Toast.clear();
};

export default {
    openLoading,
    clearLoading
};

