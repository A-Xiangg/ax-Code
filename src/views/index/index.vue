<template>
  <div class="wrapper">
    <header class="fixed w100pc bg-blue pl-5 pr-5">
      <p class="titi h100pc f16 fff tac lh15">
        领英智能科技
      </p>
    </header>
    <div class="gezx">
      <dl class="w100pc pt-20 pb-20">
        <li class="w100pc tac pt-20">
          <p class=" green">
            当前现金流
          </p>
          <p class="fff pt-15 f18">
            0
          </p>
        </li>
      </dl>
      <ul class="w100pc pt-25 pt-15 fl">
        <li>
          <p>
            流入
          </p>
          <p class="ff income">
            0
          </p>
        </li>

        <li>
          <p>
            流出
          </p>
          <p class="ff expenditure">
            0
          </p>
        </li>
      </ul>
    </div>
    <div style="padding: 10px ;background-color: #FFFFFF;">
      <van-row type="flex" justify="center">
        <van-col span="15"
          ><van-button type="info" @click="Remember" to="/matter" block
            >记一笔</van-button
          ></van-col
        >
        <van-col span="5"
          ><van-button type="info" to="/Review">审核</van-button></van-col
        >
      </van-row>
    </div>

    <!--部门功能-->
    <div class="department">
      <div class="department-l">账单功能</div>
      <div class="department-r">
        {{ isShow ? "出纳" : "会计" }}
        <span
          class="switch"
          :class="{ on: isShow }"
          @click.stop="switchDepartment"
        >
          <div class="switch-circle" :class="{ right: isShow }"></div>
        </span>
      </div>
      <!--      <van-switch v-model="checked" size="24px" />-->
    </div>
<!--    出纳/-->
    <div class="index-main" v-show="Cashier">
      <form name="form1">
        <div class="info">
          <dl><a> 收支利润</a></dl>
        </div>
        <van-cell
          title="收入"
          icon="balance-pay"
          value="0"
          is-link
          to="index"
        />
        <van-cell
          title="支出"
          icon="pending-payment"
          value="0"
          is-link
          to="index"
        />
      </form>
      <form name="form1">
        <div class="info">
          <dl><a> 预收预付</a></dl>
        </div>
        <van-cell
          title="预收"
          icon="balance-pay"
          value="0"
          is-link
          to="index"
        />
        <van-cell
          title="预付"
          icon="pending-payment"
          value="0"
          is-link
          to="index"
        />
      </form>
      <form name="form1" style="margin-bottom: 15%">
        <div class="info">
          <dl><a> 筛选</a></dl>
        </div>
        <van-cell
          title="服务人员"
          icon="balance-pay"
          value="请选择"
          @click="inputCodeSpan"
          is-link
          to="index"
        />
        <van-cell
          title="客户名称"
          icon="pending-payment"
          value="请选择"
          is-link
          to="index"
        />
        <van-cell title="开始日期" :value="tartData" @click="tartShow = true" />
        <van-calendar
          v-model="tartShow"
          @confirm="tartonConfirm"
          color="#1989fa"
        />
        <van-cell title="结束日期" :value="endData" @click="endShow = true" />
        <van-calendar
          v-model="endShow"
          @confirm="endonConfirm"
          color="#1989fa"
        />
        <van-row>
          <van-radio-group
            v-model="radio"
            class="ml-20 mt-20"
            direction="horizontal"
          >
            <van-col span="8"><van-radio name="1">支付时间</van-radio></van-col>
            <van-col span="8"><van-radio name="2">提交时间</van-radio></van-col>
            <van-col span="8"><van-radio name="3">审批时间</van-radio></van-col>
          </van-radio-group>
        </van-row>
        <van-row type="flex" class="mt-20" justify="center">
          <van-col span="6"
            ><van-button size="normal" round icon="search" type="info"
              >搜索</van-button
            >
          </van-col>
          <van-col span="6"
            ><van-button size="normal" icon="replay" round type="info"
              >重置</van-button
            >
          </van-col>
        </van-row>
      </form>
      <van-overlay :show="dataShow">
        <van-cell-group class="switch1">
          <van-field
            v-model="inputCodeValue"
            center
            style="border-radius: 10px"
            clearable
            size="small"
            placeholder="请输入用户名"
          >
            <van-button
              slot="button"
              size="small"
              type="primary"
              @click="show = false"
              >确定</van-button
            >
          </van-field>
        </van-cell-group>
      </van-overlay>
    </div>
<!--    会计-->
    <div class="index-main" v-show="account">
      <form name="form1">
        <div class="info">
          <dl><a> 收支利润</a></dl>
        </div>
        <van-cell
          title="收入"
          icon="balance-pay"
          value="0"
          is-link
          to="index"
        />
        <van-cell
          title="支出"
          icon="pending-payment"
          value="0"
          is-link
          to="index"
        />
      </form>
      <form name="form1">
        <div class="info">
          <dl><a> 应收应付</a></dl>
        </div>
        <van-cell
          title="应收款"
          icon="balance-pay"
          value="0"
          is-link
          @click="incomeshow = true"
        />
        <van-cell
          title="应付款"
          icon="pending-payment"
          value="0"
          @click="expenditureshow = true"
          is-link
        />
      </form>
      <form name="form1" style="margin-bottom: 15%">
        <div class="info">
          <dl><a> 筛选</a></dl>
        </div>
        <van-cell
          title="服务人员"
          icon="balance-pay"
          value="请选择"
          @click="inputCodeSpan"
          is-link
          to="index"
        />
        <van-cell
          title="客户名称"
          icon="pending-payment"
          value="请选择"
          is-link
          to="index"
        />
        <van-cell
                title=""
                icon="pending-payment"
                value="请选择"
                is-link
                to="index"
        />
        <van-cell title="开始日期" :value="tartData" @click="tartShow = true" />
        <van-calendar
          v-model="tartShow"
          @confirm="tartonConfirm"
          color="#1989fa"
        />
        <van-cell title="结束日期" :value="endData" @click="endShow = true" />
        <van-calendar
          v-model="endShow"
          @confirm="endonConfirm"
          color="#1989fa"
        />
        <van-row>
          <van-radio-group
            v-model="radio"
            class="ml-20 mt-20"
            direction="horizontal"
          >
            <van-col span="8"><van-radio name="1">支付时间</van-radio></van-col>
            <van-col span="8"><van-radio name="2">提交时间</van-radio></van-col>
            <van-col span="8"><van-radio name="3">审批时间</van-radio></van-col>
          </van-radio-group>
        </van-row>
        <van-row type="flex" class="mt-20" justify="center">
          <van-col span="6"
            ><van-button size="normal" round icon="search" type="info"
              >搜索</van-button
            >
          </van-col>
          <van-col span="6"
            ><van-button size="normal" icon="replay" round type="info"
              >重置</van-button
            >
          </van-col>
        </van-row>
      </form>
      <van-overlay :show="dataShow">
        <van-cell-group class="switch">
          <van-field
            v-model="inputCodeValue"
            center
            style="border-radius: 10px"
            clearable
            size="small"
            placeholder="请输入用户名"
          >
            <van-button
              slot="button"
              size="small"
              type="primary"
              @click="show = false"
              >确定</van-button
            >
          </van-field>
        </van-cell-group>
      </van-overlay>
    </div>

    <Footer page="index" />
    <!--    应付-->
    <van-popup
      v-model="expenditureshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <expenditure @formson="fromsonFn" :center="expenditureshow"></expenditure
    ></van-popup>
    <!--    应收-->
    <van-popup
      v-model="incomeshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <income :center="incomeshow" @fromsoncome="fromsoncome"></income>
    </van-popup>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import expenditure from "../Receivable/expenditure";
import income from "../Receivable/income";
import {
  GetJournal,//获取日记账信息
  GetAuthority,//获取用户权限
  GetCashierCustomers,//出纳获取客户信息
  GetCashierPersonnel,//出纳获取服务人员信息
  GetAccountingCustomers,//会计获取客户信息
  GetAccountingPersonnel,//会计获取服务人员
  GetAccountingMatter//会计获取收支事项
} from "../../utils/data/index";
export default {
  name: "index",
  data() {
    return {
      Cashier: true,
      account: false,
      show: false,
      inputCodefocus: false,
      popovarlay: false,
      incomeshow: false, //应收弹出层
      expenditureshow: false, //应付弹出层
      active: 0,
      radio: 1,
      oninputFocus: "",
      inputCodeValue: "",
      list: [],
      checked: true,
      tartData: "",
      endData: "",
      isShow: true,
      tartShow: false,
      endShow: false,
      dataShow: false
    };
  },
  created() {
    let index = this.active + 1;
    this.list = this[`list${index}`]; // this.list1
    // this.getGoods();
    // 获取日记账信息
    GetJournal().then(res =>{

    })
  },
  components: {
    Footer,
    income,
    expenditure
  },
  methods: {
    Remember() {
      this.$router.push({ path: "/matter" });
    },
    formatDate(date) {
      debugger;
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },

    tartonConfirm(date) {
      this.tartShow = false;
      this.tartData = this.formatDate(date);
    },
    endonConfirm(date) {
      this.endShow = false;
      this.endData = this.formatDate(date);
    },
    inputCodeSpan() {
      this.dataShow = true;
    },
    fromsonFn(val) {
      this.expenditureshow = val;
    },
    fromsoncome(val) {
      this.incomeshow = val;
    },
    ComeOnClick() {
      debugger;
      this.incomeshow = false;
    },
    // 账单功能
    switchDepartment: function() {
      this.isShow = !this.isShow;
      if (this.isShow === false) {
        this.Cashier = false;
        this.account = true;
      } else {
        this.Cashier = true;
        this.account = false;
      }
    },
    onchange(index) {
      this.list = this[`list${index + 1}`];
    },

    getGoods() {
      let url = "/goods"; // /api/goods
      this.$axios
        .get(url)
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
.department {
  height: 30px;
  background-color: #f8f8f8;
  padding: 0 12px 0;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  .department-l {
    line-height: 20px;
    font-size: 12px;
    ccolor: #303030;
  }
  .department-r {
    line-height: 20px;
    font-size: 12px;
    color: #454545;
  }
}
.switch {
  display: inline-block;
  width: 45px;
  height: 23px;
  background: #dbdbdb;
  border-radius: 30px;
  position: relative;
  vertical-align: middle;
  margin-left: 4px;
  .switch-circle {
    position: absolute;

    width: 25px;
    height: 23px;
    border-radius: 50%;
    background: #fff;
  }
}
.on {
  background: -webkit-linear-gradient(
    left,
    #19a89f,
    #9cdd97
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #19a89f,
    #9cdd97
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #19a89f,
    #9cdd97
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    #19a89f,
    #9cdd97
  ); /* 标准的语法（必须放在最后） */
}
.right {
  transform: translateX(20px);
}
</style>
