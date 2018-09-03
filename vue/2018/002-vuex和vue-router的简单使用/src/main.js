import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history', // 生产环境是服务器端设置的路由需要返回 index.html
    routes: [
        {
            path: '*',
            redirect: '/index'
        },
        {
            path: '/index',
            component: require('./page/Index.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/statistic',
            component: resolve => require(['./page/Statistic.vue'], resolve),
            meta: {
                title: '统计'
            }
        },
        {
            path: '/setting',
            component: resolve => require(['./page/Setting.vue'], resolve),
            meta: {
                title: '设置'
            }
        }
    ]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});