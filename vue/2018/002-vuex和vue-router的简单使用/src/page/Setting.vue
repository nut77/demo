<template>
    <div class="main">
        <h4>设置</h4>
        <p>this.$store.state.a.name：{{name}}</p>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        computed: {
            name() {

                return this.$store.state.a.name;
            }
        }
    }
</script>

<style scoped>

</style>