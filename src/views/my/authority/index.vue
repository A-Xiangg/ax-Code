<template>
    <div>
        <van-nav-bar
                title="权限管理"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-tabs  background="#01ADED" title-active-color="#83fbff" :border=false title-inactive-color="#ffffff"  color="#FFFFFF">
            <van-tab title="设置管理员" ><cancel></cancel></van-tab>
            <van-tab title="取消管理员" ><Setup></Setup></van-tab>
        </van-tabs>


    </div>
</template>

<script>
    import cancel from "./data/cancel.vue";  //引用组件的地址
    import Setup from "./data/Setup.vue";
    export default {
        name: "index",
        components: {
            'cancel': cancel,
            'Setup': Setup
        },
        data() {
            return {
                value:''
            };
        },
        methods: {
            onClickLeft() {
                this.$router.push("/my/center");

            },

        }
    }
</script>

<style lang="less"  scoped>
    @import "../../../components/index.less";
</style>