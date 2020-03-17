<template>
  <header class="login">
    <div class="jc-sb bg-blue bdb favor-header pr-5 ovh" style="height: 40px">
      <p class="titi">
        登录
      </p>
    </div>
    <div>
      <van-form @submit="onSubmit" v-model="loginfrom">
        <van-field
          v-model="loginfrom.username"
          class="mt-5"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginfrom.password"
          type="password"
          class="mt-20"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="loginfrom.code"
          name="code"
          class="mt-5"
          label="验证码"
          :rules="codeRules"
        ><div slot="button" >
          <img :src="vImg"  @click="getVerifyCode"/>
        </div></van-field>
        <div style="margin: 50px;">
          <van-button
            round
            @click="login"
            block
            type="info"
            native-type="submit"
          >
            登录
          </van-button>
        </div>
      </van-form>
      <div>
        <van-divider>其他登陆方式</van-divider
        ><!-- 居中 -->
        <van-row type="flex" justify="center">
          <van-col span="8"
            ><img
              src="../../assets/img/qq.png"
              alt=""
              style="width: 45px;height: 45px;"/><img
              src="../../assets/img/qq.png"
              alt=""
              style="width: 45px;height: 45px;"
          /></van-col>
        </van-row>
      </div>
    </div>
  </header>
</template>

<script>
import { Toast } from "vant";
import {
  login,
  ObtainVerificationCode,
  verificationCode
} from "../../utils/data/login";
export default {
  data() {
    this.phoneRules = [
      { required: true, message: "请输入手机号" },
      { validator: this.phoneValidator, message: "手机号格式错误" }
    ];
    this.codeRules = [
      { required: true, message: "请输入验证码" },
      { validator: this.codeValidator, message: "验证码错误" }
    ];
    return {
      vImg:"@\assets\img\logo.png",
      loginfrom: {
        username: "",
        password: "",
        code: "",

      }
    };
  },
  created(){
    // 获取图片验证码
    ObtainVerificationCode().then(res =>{
      return 'data:image/png;base64,' + btoa(
              new Uint8Array(res.data)
                      .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

    }).then(data => {
      _this.previewImage = data //图片地址 <img src='data' />

    })
  },
  methods: {
    phoneValidator(val) {
      return /1\d{10}/.test(val);
    },
    // 校验函数返回 Promise 来实现异步校验
    codeValidator(val) {
      return new Promise(resolve => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    getVerifyCode(){

    },
    login() {
      // 发送请求,用post方式
      let url = "/login";
      // 请求参数
      let data = {
        password: this.loginfrom.password,
        username: this.loginfrom.username
      };
      // 登录
      verificationCode(this.loginfrom.code).then(res => {
        if (res === 1000) {
          login(data).then(res => {
            if (res === 1000) {
              this.$router.push("/index");
            }
          });
        }
      });

      /*this.$axios
        .post(url, data)
        .then(res => {
          // 修改登陆状态
          this.$store.commit("updateLogin", false);
          // 把token存入store
          this.$store.commit("updateToken", res.user.token);
          // 把用户名存入store
          this.$store.commit("updateUsername", res.user.phone);

        })
        .catch(err => {
          console.log("登陆失败");
        });*/
    }
  }
};
</script>

<style lang="less" scoped>
@import "./login.less";
.logo {
  font-size: 100px !important;
  margin-bottom: 150px;
}
.from {
  margin-top: 100px;
}
</style>
