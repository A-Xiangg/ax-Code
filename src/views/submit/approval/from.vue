<template>
  <div>
    <div class="top">筛选</div>
    <van-form v-model="filter">
      <!--            服务人员-->
      <van-field
        readonly
        clickable
        name="picker"
        :value="filter.serviceUserId"
        label="服务人员"
        placeholder="选择服务人员"
        @click="showPicker = true"
      />
      <!--            客户名称-->
      <van-field
        readonly
        clickable
        name="picker"
        :value="filter.customerId"
        label="客户"
        placeholder="选择客户"
        @click="showPicker = true"
      />
      <!--            时间类型-->
      <van-field name="radio" label="时间类型">
        <template #input>
          <van-radio-group v-model="filter.timeType" direction="horizontal">
            <van-radio name="creatTime" shape="square">提交时间</van-radio>
            <van-radio name="passTime" shape="square">审核时间</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!--            时间段-->
      <van-field
        label="开始时间"
        readonly="readonly"
        @click="StartTimePop = true"
        v-model="filter.startDate"
      />
      <van-field
        label="结束时间"
        readonly="readonly"
        v-model="filter.endDate"
        @click="endTimePop = true"
      />
      <fold>
        <div class="collapse-wrap" v-show="isActive">
      <dl><a>款项收支</a></dl>
      <van-field name="radio" label="收支方式">
        <van-radio-group
          v-model="filter.payType"
          direction="horizontal"
          slot="input"
        >
          <van-radio name="1" shape="square">收入</van-radio>
          <van-radio name="0" shape="square">支出</van-radio>
        </van-radio-group>
        <van-radio-group
          v-model="filter.payType"
          direction="horizontal"
          slot="input"
        >
          <van-radio name="2" shape="square">预收</van-radio>
          <van-radio name="3" shape="square">预付</van-radio>
        </van-radio-group>
      </van-field>
      <van-field name="radio" label="时间类型">
        <van-radio-group
          v-model="filter.timeType"
          direction="horizontal"
          slot="input"
        >
          <van-radio name="payTime" shape="square">支付时间</van-radio>
        </van-radio-group>
      </van-field>
      <dl><a>收支事项</a></dl>
      <van-field
        readonly
        clickable
        name="picker"
        :value="filter.customerId"
        label="收支事项"
        placeholder="选择收支事项"
        @click="showPicker = true"
      />
      <van-field name="radio" label="时间类型">
        <van-radio-group
          v-model="filter.timeType"
          direction="horizontal"
          slot="input"
        >
          <van-radio name="Time" shape="square">所属时间</van-radio>
        </van-radio-group>
      </van-field>
        </div>
      </fold>
      <div class="subNav">
        <div class="advanced" style=""@click="isActive = !isActive">高级筛选</div>
      </div>
      <div class="w100pc">
        <van-row type="flex" justify="center">
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
      </div>
    </van-form>

    <!--        服务人员选择框-->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!--        开始时间-->
    <van-popup
      v-model="StartTimePop"
      label="开始时间"
      position="bottom"
      :overlay="true"
    >
      <van-datetime-picker
        type="date"
        @cancel="StartTimePop = false"
        @confirm="startPo"
      />
    </van-popup>
    <!--        结束时间-->

    <van-popup
      v-model="endTimePop"
      label="结束时间"
      position="bottom"
      :overlay="true"
    >
      <van-datetime-picker
        type="date"
        @cancel="endTimePop = false"
        @confirm="endPo"
      />
    </van-popup>
  </div>
</template>

<script>
  import fold from "@/utils/fold";
export default {
  name: "from",
  components: {
    fold
  },
  data() {
    return {
      filter: {
        serviceUserId: "",
        payType: 1,
        endDate: "",
        startDate: "",
        customerId: "",
        timeType:'',
      },
      isActive:false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false,
      endTimePop: false,
      StartTimePop: false,

      value: ""
    };
  },
  methods: {
    // 日期格式化
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    // 开始时间
    startPo(time) {
      this.filter.startDate = this.formatDate(time);
      this.StartTimePop = false;
    },
    // 结束时间
    endPo(time) {
      this.filter.endDate = this.formatDate(time);
      this.endTimePop = false;
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  background: #f8f4f5;
  padding: 3% 1em;
  color: #c1c1c1;
  font-size: 16px;
}
.subNav {
  padding: 5px;
  width: 100%;
  cursor: pointer;
}
.advanced {
  display: block;
  width: 25%;
  margin-left: 75%;
  text-align: center;
  height: 0.66667rem;
  border-top: 0.02667rem solid #e8e8e8;
  color: #01aded;
  font: normal 0.32rem/0.66667rem Tahoma, Verdana;
}
dl {
  display: block;
  width: 100%;
  height: 100%;
  float: left;
  font: 12px/42px "microsoft yahei";
  color: #c0c0c0;
  a {
    margin-left: 8px;
    font: 12px/45px "microsoft yahei";
    color: #c0c0c0;
  }
}
</style>
