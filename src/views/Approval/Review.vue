<template>
  <div>
    <van-nav-bar
      title="审核账目"
      left-text="返回"
      right-text="筛选"
      left-color="#fff" :border=false  @click-left="onClickLeft"  left-arrow

      @click-right="show = true"
    />
    <van-tabs  background="#01ADED" title-active-color="#83fbff" :border=false title-inactive-color="#ffffff"  color="#FFFFFF">
      <van-tab title="待审核" ><Pending></Pending></van-tab>
      <van-tab title="未通过" ><notPass></notPass></van-tab>
      <van-tab title="已通过" ><passed></passed></van-tab>
    </van-tabs>
    <van-popup
      v-model="show"
      position="right"
      :style="{ width: '90%', height: '100%' }"
    >
      <filterFrom></filterFrom>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import filterFrom from "./Subassembly/from";
import passed from "./Subassembly/passed";
import notPass from "./Subassembly/notPass";
import Pending from "./Subassembly/Pending";
export default {
  name: "Review",
  components: {
      filterFrom,
    passed,
    notPass,
    Pending,
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({path:'/index'})
    },
  }
};
</script>

<style lang="less" scoped>
  @import "../../components/index.less";
</style>
