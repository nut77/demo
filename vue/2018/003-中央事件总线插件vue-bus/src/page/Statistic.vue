<template>
    <div class="main">
        <h4>统计</h4>
        <button type="button" @click="multiple">随机加倍count</button>
    </div>
</template>

<script>
    export default {
        name: "Statistic",
        methods: {
            multiple() {

                this.$bus.emit('multiple', Math.floor(Math.random() * 10));
            }
        }
    }
</script>