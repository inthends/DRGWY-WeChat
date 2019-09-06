import {Toast} from "antd-mobile";


export default {
    /**
     * 显示loading
     * @param msg loading的文案 默认是"正在加载中..."
     */
    showLoading(msg = "正在加载中...") {
        Toast.loading(msg, 0);
    },
    /**
     * 隐藏loading
     */
    hiddenLoading() {
        Toast.hide();
    },
    /**
     * 显示成功
     * @param msg 成功的文案
     */
    showSuccess(msg) {
        Toast.success(msg,2);
    },
    /**
     * 显示失败
     * @param msg 失败的文案
     */
    showError(msg) {
        Toast.info(msg);
    }
};
