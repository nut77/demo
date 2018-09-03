<template>
    <div class="container">
        <el-header></el-header>
        <div class="main">
            <router-view></router-view>
        </div>
        <el-footer></el-footer>
    </div>
</template>

<script>
    import elHeader from './component/Header';
    import elFooter from './component/Footer';
    export default {
        name: "App",
        components: {elHeader, elFooter}
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: "Microsoft Yahei", sans-serif;
    }
    html, body {
        height: 100%;
    }
    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
    }
    .main {
        flex: 1;
        background-color: #00C1DE;
    }
</style>