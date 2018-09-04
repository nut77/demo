<template>
    <header>
        <h3 class="pull-left">header-当前数字count：<span>{{count}}</span></h3>
        <ul class="pull-left nav">
            <router-link to="/index" tag="li">首页</router-link>
            <router-link to="/statistic" tag="li">统计</router-link>
            <router-link to="/setting" tag="li">设置</router-link>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                count: 0
            }
        },
        created() {

            this.$bus.on('plus', num => {

                this.count += num;
            });
            this.$bus.on('minus', num => {

                this.count -= num;
            });
            this.$bus.on('multiple', num => {

                this.count *= num;
            });
        }
    }
</script>

<style scoped>
    header {
        height: 60px;
        padding: 0 20px;
        background-color: #0e3d69;
        color: white;
        line-height: 60px;
    }
    header span {
        color: #00C1DE;
    }
    .pull-left {
        float: left;
    }
    .pull-right {
        float: right;
    }
    .nav {
        margin-left: 80px;
    }
    .nav li {
        display: inline-block;
        width: 80px;
        font-size: 16px;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
    }
    .nav li:hover {
        background-color: #0c3256;
    }
    .router-link-active {
        background-color: #071e33 !important;
    }
</style>