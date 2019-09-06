import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import createPersiste from 'vue-savedata'

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        mutations,
    },
    actions,
    plugins: [createPersiste()],
});
