<template>
  <div class="center">
    <!-- 头部 -->
    <header>
      <div class="beijin"></div>
      <div class="flex aic users pixed" style="width:50%;">
        <img :src="require('../../../assets/img/personal/tx.jpg')" class="imege" />
        <router-link v-if="!isLogin" to="/login" class="f16 fff ml-20">立即登录</router-link>
        <span v-else class="f16 fff ml-20">用户 {{username.slice(-4)}}</span>
      </div>
      <div class="userdata flex aic pixed">
        <div class="it"><span>收入</span><em id="numberTimer">0</em></div>
        <div class="it"><span>支出</span><em id="numberTimer1">0</em></div>
        <div class="it"><span>利润</span><em id="numberTimer2">0</em></div>
      </div>


    </header>

    <!-- 主体 -->
    <main class="mt-10">
      <div class="bg-fff">
        <van-cell title="客户管理" icon="friends-o" isLink to="/my/client"/>
        <van-cell title="权限管理" icon="manager-o" isLink to="/my/authority"/>
        <van-cell title="职员管理" icon="user-circle-o" isLink to="/my/staff"/>
        <van-cell title="设置" icon="setting-o" isLink to="/my/set"/>
      </div>
    </main>

    <Footer page="my" />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";
export default {
  components: {
    Footer
  },

  computed: {
    ...mapGetters(["username", "isLogin"])
  }
};
</script>

<style lang="less" scoped>
@import "./center.less";
</style>
