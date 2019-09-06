import * as types from './type';
export default {
    showloader: ({commit}) => {
        commit(types.SHOWLOADING);
    },
    hideloader: ({commit}) => {
        commit(types.HIDELOADING);
    },
};
