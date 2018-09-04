export default function (Vue) {

    const Bus = new Vue({
       methods: {
           on(event, ...args) {

               this.$on(event, ...args);
           },
           emit(event, ...args) {

               this.$emit(event, ...args);
           },
           off(event, cb) {

               this.$off(event, cb);
           },
       }
    });

    Vue.prototype.$bus = Bus;
}