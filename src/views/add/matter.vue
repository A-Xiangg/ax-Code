<template>
    <div>
        <header  >
        <van-nav-bar title="记一笔" left-text="返回"  left-color="#fff" :border=false  @click-left="back"  left-arrow/>
        <van-tabs  background="#01ADED" title-active-color="#83fbff" :border=false title-inactive-color="#ffffff"  color="#FFFFFF">
            <van-tab title="款项收支" ><Cashier></Cashier></van-tab>
            <van-tab title="收支事项" ><accounting></accounting></van-tab>
        </van-tabs>
        </header>
    </div>

</template>

<script>
    import accounting from "./revenue/accounting";  //引用组件的地址
    import Cashier from "./revenue/Cashier";  //引用组件的地址
    export default {
        name: "matter",
        components: {
            'accounting': accounting,
            'Cashier': Cashier
        },
        methods:{
            back(){
                this.$router.push({path: '/index'});
            }
        }


    }
</script>

<style  scoped>
    @import "../../components/index.less";
</style>
