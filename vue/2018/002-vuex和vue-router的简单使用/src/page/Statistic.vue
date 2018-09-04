<template>
    <div class="main">
        <h4>统计</h4>
        <p>list：</p>
        <p>filteredList：{{filteredList}}</p>
        <p>filteredListLen：{{filteredListLen}}</p>
    </div>
</template>

<script>
    export default {
        name: "Statistic",
        computed: {
            filteredList() {

                return this.$store.getters.filteredList;
            },
            filteredListLen() {

                return this.$store.getters.filteredListLen;
            }
        }
    }
</script>

<style scoped>

</style>