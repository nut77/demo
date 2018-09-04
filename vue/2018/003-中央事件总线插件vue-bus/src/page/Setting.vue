<template>
    <div class="main">
        <h4>设置</h4>
        <button type="button" @click="minus">随机减少count</button>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        methods: {
            minus() {

                this.$bus.emit('minus', Math.floor(Math.random() * 5) || 1);
            }
        }
    }
</script>