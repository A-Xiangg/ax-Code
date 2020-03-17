<template>
    <div>
        <van-nav-bar
                title="应付"
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
    import income from "./income";
    import From from "../Approval/Subassembly/from";
    export default {
        name: "expenditure",
        components: {
            From,
            Pending
        },
        data(){
            return({
                show:false
            })
        },
        methods:{
            onClickLeft(){
                this.$emit('formson',false)
            },
            onClickRight(){
                this.show=true

            },
        }
    }
</script>

<style scoped>

</style>