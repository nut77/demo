<template>
    <div class="main">
        <h4>首页</h4>
        <p>中央事件总线bus是除了vuex用来解决组件间通信的另外一种办法。本小型项目是使用封装的vue-bus插件的案列。</p>
        <button type="button" @click="plus">随机增加count</button>
    </div>
</template>

<script>
    export default {
        name: "Index",
        methods: {
            plus() {

                this.$bus.emit('plus', Math.floor(Math.random() * 10));
            }
        }
    }
</script>