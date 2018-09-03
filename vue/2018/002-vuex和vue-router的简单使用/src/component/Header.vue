<template>
    <header>
        <h3 class="pull-left">header</h3>
        <ul class="pull-right nav">
            <router-link to="/index" tag="li">首页</router-link>
            <router-link to="/statistic" tag="li">统计</router-link>
            <router-link to="/setting" tag="li">设置</router-link>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    header {
        height: 65px;
        background-color: #0e3d69;
        color: white;
    }
    .pull-left {
        float: left;
    }
    .pull-right {
        float: right;
    }
    .nav {

    }
</style>