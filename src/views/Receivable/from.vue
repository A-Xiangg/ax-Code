<template>
  <div>
    <div class="top">筛选</div>
    <van-form>
      <!--            服务人员-->
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="服务人员"
        placeholder="选择服务人员"
        @click="showPicker = true"
      />
      <!--            客户名称-->
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="客户"
        placeholder="选择客户"
        @click="showPicker = true"
      />
      <!--            时间类型-->
      <van-field name="radio" label="时间类型">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1" shape="square">提交时间</van-radio>
            <van-radio name="2" shape="square">审核时间</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!--            时间段-->
      <van-field
        label="开始时间"
        readonly="readonly"
        @click="StartTimePop = true"
        v-model="startDate"
      />
      <van-field
        label="结束时间"
        readonly="readonly"
        v-model="endValue"

        @click="endTimePop = true"
      />
    </van-form>
    <div class="subNav"><div class="advanced" i="0" style="">高级筛选</div></div>
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
export default {
  name: "from",
  data() {
    return {
      radio: 1,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false,
      endTimePop: false,
        StartTimePop: false,
        endValue:'',
        startDate:'',
      value: ""
    };
  },
  methods: {
      // 日期格式化
      formatDate(date) {
          return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      },
      // 开始时间
      startPo(time){
          this.startDate = this.formatDate(time);
          this.StartTimePop = false;
      },
      // 结束时间
    endPo(time) {
      this.endValue = this.formatDate(time);
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
  width: 25%;
  cursor: pointer;
  float: right;
}
.advanced {
  display: block;
  text-align: center;
  height: 25px;
  border-top: 1px solid #e8e8e8;
  color: #01ADED;
  font: normal 12px/25px Tahoma, Verdana;
}
</style>
