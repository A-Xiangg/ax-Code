<template>
  <div>
    <div class="lyy-bg">
      <div class="lyy-hei"></div>
<!--      正文-->
      <div class="lyy-neia lyy-gs1" v-for="(items, index) in list" :key="index">


        <div class="lyy-nei">
            <div class="left-Check">
            <van-checkbox
                    style="padding:0px 5px 0px 0px"
                    v-model="items.checked"
                    @change="choose"
                    checked-color="#07c160"
            />
            </div>
            <div class="right-text">
            <van-row class="tables">
              <van-col span="24"><div  >客户：测试客户</div></van-col>
            </van-row>
            <van-row class="tables">
              <van-col span="12"><div   >收支类型：收入</div></van-col>
              <van-col span="12"><div >金额：188</div></van-col>
            </van-row>
            <van-row class="tables">
              <van-col span="12"><div >收款方式：支付宝</div></van-col>
              <van-col span="12"><div >支付时间：日期</div></van-col>
            </van-row>
            </div>
        </div>
      </div>
      <!-- 全选按钮 -->
      <div class="lyy-qx lyy-gs1">
        <div>
          <van-checkbox
            class="lyy-qx2"
            v-model="checked"
            checked-color="#07c160"
            @click="allCheck"
            >全选</van-checkbox
          >
        </div>
        <div>
        <van-button round type="info" size="small">关联</van-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    name:"Already",
  data() {
    return {
      checked: false, //全选
      isShow: false,
      //测试数据
      list: [
        {
          id: "1",
          shop_name: "若萱旗舰店",
          num: 5,
          shop_logo: require("@/assets/img/not.jpeg"),
          checked: false
        },
        {
          id: "2",
          shop_name: "小白旗舰店",
          num: 2,
          shop_logo: require("@/assets/img/orderList1.jpg"),
          checked: false
        }
      ]
    };
  },
  created() {
    this.followData();
    this.addData();
  },
  methods: {
    //全选
    allCheck() {
      let a = !this.checked;
      this.list = this.list.map(e => {
        e.checked = a;
        return e;
      });
    },

    //单选
    choose() {
      let a = true;
      this.list.forEach(e => {
        if (e.checked === false) {
          a = false;
        }
      });
      this.checked = a;
    },
    addData() {
      let _self = this;
      let data = {
        shop_id: 9,
        uid: 10
      };
    }
  }
};
</script>

<style lang="less" scoped>
.lyy-bg {
  background-color: #f8f6f6;
}
.lyy-hei {
  height: 5px;
}
.lyy-nei {
  font-size: 12px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.lyy-neia {
 margin-top: 5px;
}
.lyy-tu {
  width: 68px;
  height: 68px;
  background: rgba(255, 255, 255, 1);
  border: 0px solid rgba(238, 238, 238, 1);
}
.lyy-gs {
  font-size: 12px;
  flex-direction: row;
}
.lyy-gs1 {
  display: flex;
  justify-content: space-between;
}
.left-Check{
  width: 10%;
  float: left;
  top: 45%; /*偏移*/
 margin: 5px;
  position: relative; /*设置position属性*/
  height: 100%;
}
.right-text{
  width: 85%;
  float: left;
}
.lyy-qx {
  height: 51px;
  width: 100%;
  position: fixed;
  bottom: 0rem;
  border-top: #f2f2f2 solid 1px;
  background: white;
}
.lyy-qx2 {
  position: relative;
  top: 10px;
  left: 10px;
}
.tables {
  width: 100%;
  height: 100%;
  margin: 15px 10px 10px 10px;
}
</style>
