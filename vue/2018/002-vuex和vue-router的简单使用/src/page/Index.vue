<template>
    <div class="main">
        <h4>首页</h4>
        <p>this.$store.state：{{count}}</p>
        <p><button type="button" @click="syncChangeCount(12)">异步操作-更新count</button></p>
        <div>
            <h2>注意：</h2>
            <p>如果是在生产环境中使用，vue-router使用mode: 'history',记得让服务器端返回index.html页面，不然页面跳转会报错。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        computed: {
            count() {

                return this.$store.state.count;
            }
        },
        methods: {
            changeCount(num = 5) {

                this.$store.commit('changeCount', num);

                // 如果以这种方式提交mutation 那么changeCount的第二个参数为一个对象 需要用.num才能取到正确的num值
                /*this.$store.commit({
                    type: 'changeCount',
                    num
                })*/
            },
            syncChangeCount(num) {

                this.$store.dispatch('changeCount', num).then((data) => {

                    alert(data);
                });
            }
        },
        mounted() {

            this.changeCount(10);
        }
    }
</script>

<style scoped>
    button {
        width: 200px;
        border: none;
        border-radius: 5px;
        background-color: #f5a98f;
        color: white;
        text-align: center;
        line-height: 25px;
        outline: none;
        cursor: pointer;
    }
</style>