import {SHOWLOADING, HIDELOADING} from './type';

const state = {
    showLoading: false,
};

const mutations = {
    [SHOWLOADING]() {
        state.showLoading = true;
    },
    [HIDELOADING]() {
        state.showLoading = false;
    },
};

const getters = {
    showLoading() {
        return state.showLoading;
    },
};

export default {
    state,
    mutations,
    getters,
};
