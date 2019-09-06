import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import stores from './store/store';
import '@/assets/css/app.css';
import appJs from './assets/js/app.js';
import 'vant/lib/index.css';
import '@/assets/css/app.css';
import api from './core/net/api';
import loading from './core/net/loading';
import VueCookies from 'vue-cookies';
import Vant from 'vant';

Vue.use(Vant);
// rem
appJs.app();

Vue.config.productionTip = false;
// 全局变量定义
Vue.prototype.$cookies = VueCookies;
Vue.prototype.$get = api.get;
Vue.prototype.$post = api.post;
Vue.prototype.$clearLoading = loading.clearLoading;
Vue.prototype.$openLoading = loading.openLoading;


// 授权
router.beforeEach((to, from, next) => {
    // 配置标题
    document.title = to.meta.title ? to.meta.title : '';
    next();
});

new Vue({
    router,
    store: stores,
    render: h => h(App),
}).$mount('#app');
