<template>
  <div >
    <van-nav-bar
            title="我的提交"
            left-color="#fff"
            @click-right="show = true"
    />
    <van-tabs v-model="activeName" title-active-color="#83fbff" background="#01ADED"  :border=false title-inactive-color="#ffffff"	 color="#FFFFFF">
      <van-tab title="待审批" name="a"><passed></passed></van-tab>
      <van-tab title="已通过" name="c"><Pending></Pending></van-tab>
      <van-tab title="未通过 " name="b"><notpass></notpass></van-tab>
    </van-tabs>
    <Footer page="cart"></Footer>
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
import Footer from "@/components/Footer";
import passed from "./approval/passed";
import filterFrom from "./approval/from";
import notpass from "./approval/notpass";
import Pending from "./approval/Pending";
export default {
  name:"submit",
  components: {
    Pending,
    passed,
    notpass,
    Footer,
    filterFrom
  },
  data() {
    return {
      activeName: ""
    };
  },

};
</script>

<style lang="less" scoped>
 @import "../../components/index.less";
</style>
