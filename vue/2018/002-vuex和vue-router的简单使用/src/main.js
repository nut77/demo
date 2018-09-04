import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
    mode: 'history', // 生产环境是服务器端设置的路由需要返回 index.html
    routes: [
        {
            path: '*',
            redirect: '/index'
        },
        {
            path: '/index',
            component: () => import('./page/Index.vue'),
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

// 仓库store包含了应用的数据（状态）和操作过程
// Vuex里的数据都是响应式的，任何组件使用同一个store的数据时，只要store的数据变化，对应的组件也会立即更新
const moduleA = {
    state: {
        name: 'moudelA'
    }
};
const store = new Vuex.Store({
    // 可以用来将store分割为不同的模块
    modules: {
        a: moduleA
    },
    // 用来存储数据
    state: {
        count: 0,
        list: [12, 45, 9, 8, 56, 7, 1]
    },
    // 用来修改state里面的数据 - 尽量不要异步操作，因为commit数据不会立即改变
    mutations: {
        changeCount(state, num = 5) {

            state.count += num;
        }
    },
    // 可以用来过滤数据-拿到过滤后的数据
    getters: {
        filteredList(state) {

            return state.list.filter(item => item > 10);
        },
        filteredListLen(state, getters) {

            return getters.filteredList.length
        }
    },
    // 提交mutation，且可以用来实现异步操作
    actions: {
        changeCount(context, num) {

            return new Promise((resolve, reject) => {

                setTimeout(() => {

                    context.commit('changeCount', num);
                }, 2000);
                resolve('success');
            });
        }
    }
});

router.afterEach((to, from) => {

   window.document.title = to.meta.title;
   window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});