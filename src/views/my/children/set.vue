<template>
  <div class="page">
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="back"
    ></van-nav-bar>

    <van-cell-group class="mt-10">
      <van-cell title="账号id" is-link></van-cell>
      <van-cell isLink title="修改密码" @click="modifyshow=true"></van-cell>
      <van-cell isLink title="安全密码"></van-cell>
    </van-cell-group>

    <!-- 退出登录 -->
    <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="logout">
      <p class="blue">退出登录</p>
    </div>
    <van-popup v-model="modifyshow" position="bottom"   :style="{ width:'100%', height: '100%' }" >
      <van-nav-bar
              title="修改密码"
              left-text="返回"
              left-arrow
              @click-left="modifyshow=false"
      />
      <van-form @submit="onSubmit" v-model="PW">
        <van-field
                v-model="PW.oldPassword"
                name="原密码"
                type="password"
                label="原密码"
                placeholder="原密码"
                :rules="[{ required: true, message: '请填写' }]"
        />
        <van-field
                v-model="password"
                type="password"
                name="新密码"
                label="新密码"
                placeholder="新密码"
                :rules="[{ required: true, message: '请填写' }]"
        />
        <van-field
                v-model="PW.newPassword"
                type="password"
                name="确认密码"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请填写' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" @click="change" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import {
    dropout,
    changePassword
  } from "../../../utils/data/login";
export default {
  name: "set",
  data() {
    return {
      PW:{
        oldPassword:'',
        newPassword:''
      },
      modifyshow: false,
      password: '',
    };
  },
  methods: {
    change(){

      changePassword(this.PW).then(res =>{

      })
    },
    onSubmit(values) {
      console.log('submit', values);
    },
    back() {
      history.back();
    },
     logout() {
       dropout().then(res =>{
         if (res.code===1000){
           Toast('退出成功');
           // 修改登陆状态
           this.$store.commit("updateLogin", false);
           // 把用户名置空
           this.$store.commit("updateUsername", "");
           // 清除token
           this.$store.commit("updateToken", "");
           this.$router.push("/my");
         }
       })

    }
  }
};
</script>

<style lang="less" scoped>
  @import "../../../components/index.less";
.logout {
  bottom: 0;
  height: 50px;
  color: #01aded;
}
</style>
