<template>
  <div>
    <div class="list-content" id="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :offset="10"
        >
          <template v-for="item in list">
            <div class="list-item">
              <div class="gd-item">
                <div class="item" id="left1">
                  <van-row>
                    <van-col span="20"
                      ><div class="gdnum">
                        <div class="gdnum-1">
                          <dl>客户名称:</dl>
                          <dl id="dl-two">{{ item.customerName }}</dl>
                        </div>
                        <div class="gdnum-2">
                          <em>手机号:</em>
                          <dl>{{ item.phone }}</dl>
                        </div>
                      </div></van-col
                    >
                    <van-col span="4">
                      <div class="gb-item1">
                        <van-button
                          color="#606266"
                          round
                          type="info"
                          plain
                          hairline
                          @click="editshow = true"
                          size="mini"
                          ><span
                            class="icon iconfont icon-shouquan1"
                          />授权</van-button
                        >
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </div>
            </div>
          </template>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
let json = require("../../../../utils/json");
export default {
  name: "Setup",
  data() {
    return {
      personnelValue: "",
      list: "",
      editFrom: {
        username: "",
        clientName: "",
        personnelValue: "",
        message: "",
        Phone: ""
      },
      addFrom: {
        username: "",
        clientName: "",
        personnelValue: "",
        message: "",
        Phone: ""
      },
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      addshow: false,
      editshow: false,
      showPicker: false, //客户类别
      personnel: false, //服务人员
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false //是否处于下拉刷新状态
    };
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight; //视口大小
    document.getElementById("list-content").style.height =
      winHeight - 46 + "px"; //调整上拉加载框高度
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    // 获取资源表单列表
    onLoad() {
      this.list = json;
      //上拉加载
      setTimeout(() => {
        this.loading = false;
        if (this.list.length >= 60) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      //下拉刷新
      setTimeout(() => {
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.onLoad();
      }, 500);
    },
    onCancel() {
      Toast("取消");
    },
    onClickLeft() {
      this.$router.push("/my/center");
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    onClickRight() {
      this.addshow = true;
    }
  }
};
</script>

<style lang="less" >

</style>
