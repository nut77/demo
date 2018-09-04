<template>
    <div class="container">
        <el-header></el-header>
        <router-view></router-view>
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
    h4 {
        margin-bottom: 15px;
    }
    p {
        margin: 15px 0;
    }
    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
    }
    .main {
        flex: 1;
        padding: 20px;
        background-color: #00C1DE;
    }
    button {
        padding: 8px 20px;
        border: none;
        border-radius: 5px;
        background-color: #f5a98f;
        color: white;
        text-align: center;
        outline: none;
        cursor: pointer;
    }
</style>