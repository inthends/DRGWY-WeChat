import {Modal} from 'antd-mobile';
import UDToast from './ud-toast';
import React from 'react';
import common from './common';


export default {
    /**
     *
     * @param title
     * @param message
     * @param actions 样例 [ { text: 'Cancel', onPress: () => console.log('cancel') },{ text: 'Ok', onPress: () => console.log('ok') },]
     * @returns alert
     *
     *
     * UDAlert.showAlert('title','message',[{
            text:'确定',
            onPress: () => {事件}
        }]);
     */
    showAlert(title, message, actions) {
        let act = actions;
        if (!act || act.length === 0) {
            UDToast.showError('actions数量必须大于0');
            return null;
        }
        if (act.length === 1) {
            let aa = [{text: '取消', onPress: () => console.log('cancel')}];
            aa.push(act[0]);
            act = aa;

        }
        console.log(act);
        return Modal.alert(title, message, act);
    },
    hiddenAlert(alert) {
        alert.close();
    },
    showOneButton(title, message, comfirmTitle, completeBlock) {
        return Modal.alert(title, message, [{text: comfirmTitle, onPress: () => completeBlock()}]);
    },
};
