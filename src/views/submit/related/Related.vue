<template>
  <div>
    <van-tabs
      v-model="activeName"
      title-active-color="#83fbff"
      background="#01ADED"
      :border="false"
      title-inactive-color="#ffffff"
      color="#FFFFFF"
    >
      <van-tab title="已关联" name="a"> <Already /></van-tab>
      <van-tab title="未关联" name="c"><not/></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import not from "./whether/not";
import Already from "./whether/Already";
export default {
  name: "demo",
  components: {
    not,
    Already
  },
    data() {
        return {
            activeName: "",

        };

    },
  methods:{
    onClickLeft(){

    }
  }
};
</script>

<style scoped>
@import "../../../components/index.less";
</style>
