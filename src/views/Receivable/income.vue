<template>

    <div>
        <van-nav-bar
                title="应收"
                left-text="返回"
                right-text="筛选"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <Pending></Pending>
        <van-popup
                v-model="show"
                position="right"
                :style="{ width: '90%', height: '100%' }"
        >
            <from></from>
        </van-popup>
    </div>
</template>

<script>
    import Pending from "../submit/approval/Pending";
    import from from "./from";
    export default {
        name: "income",
        components: {
            Pending,
            from
        },
        props:{
            center:Boolean
        },
        data(){
            return({
                show:false
            })
        },
        methods:{
            onClickLeft(){
                this.$emit('fromsoncome',false)
            },
            onClickRight(){
                this.show=true
            },
        }
    }
</script>

<style scoped>

</style>