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
    <div class="gclass ">
      <van-button type="info" @click="Remember" to="/matter" block>记一笔</van-button>
    </div>
    <div class="tar bg-f8 mt-5">
      <van-switch v-model="checked" size="24px" />
    </div>
    <div class="index-main">
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
          title="预付"
          icon="pending-payment"
          value="请选择"
          is-link
          to="index"
        />
        <van-cell title="开始日期" :value="tartData"  @click="tartShow = true" />
        <van-calendar v-model="tartShow" @confirm="tartonConfirm" color="#1989fa" />
        <van-cell title="结束日期" :value="endData" @click="endShow = true" />
        <van-calendar v-model="endShow" @confirm="endonConfirm" color="#1989fa" />
        <van-row >
        <van-radio-group v-model="radio" class="ml-20 mt-20" direction="horizontal">
          <van-col span="8"><van-radio name="1">支付时间</van-radio></van-col>
          <van-col span="8"><van-radio name="2">提交时间</van-radio></van-col>
          <van-col span="8"><van-radio name="3">审批时间</van-radio></van-col>
        </van-radio-group>
      </van-row>
        <van-row type="flex" class="mt-20" justify="center">
          <van-col span="6"><van-button size="normal"  round  icon="search"  type="info">搜索</van-button> </van-col>
          <van-col span="6"><van-button size="normal" icon="replay" round   type="info">重置</van-button> </van-col>
        </van-row>

      </form>
      <van-overlay :show="dataShow" >
        <van-cell-group class="switch"
        >
        <van-field

                v-model="inputCodeValue"
                center
                style="border-radius: 10px"
                clearable
                size="small"
                placeholder="请输入用户名"
        >
          <van-button slot="button" size="small" type="primary" @click="show=false">确定</van-button>
        </van-field>

        </van-cell-group>
      </van-overlay>

    </div>

    <Footer page="index" />
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  data() {
    return {
      show:false,
      inputCodefocus: false,
      popovarlay:false,
      active: 0,
      radio:1,
      oninputFocus:'',
      inputCodeValue:'',
      list: [],
      checked: true,
      tartData: '',
      endData:'',
      tartShow: false,
      endShow: false,
      dataShow:false
    };
  },
  created() {
    let index = this.active + 1;
    this.list = this[`list${index}`]; // this.list1
    // this.getGoods();
  },
  components: {
    Footer
  },
  methods: {
    Remember(){
      this.$router.push({path: '/matter'});

    },
    formatDate(date) {
      debugger
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
    inputCodeSpan(){
      this.dataShow=true;
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
.van-button--info {
  color: #fff;
  background-color:  #01ADED;
  border: 0.02667rem solid  #01ADED;
}
</style>
