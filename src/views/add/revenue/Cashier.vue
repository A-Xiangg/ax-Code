<template>
  <div>
    <van-form validate-first v-model="CashierForm">
      <!--        客户名称-->
      <van-field
        readonly
        clickable
        v-model="CashierForm.clientValue"
        name="phone"
        @click="inputCodeSpan"
        label="客户名称"
      />
      <!--        服务人员-->
      <van-field
        readonly
        clickable
        name="picker"
        :value="CashierForm.serviceValue"
        label="服务人员"
        placeholder="选择服务人员"
        @click="servicePicker = true"
      />
      <!--        服务人员-->
      <van-field
        readonly
        clickable
        name="picker"
        :value="CashierForm.CollectionValue"
        label="收款方式"
        placeholder="选择收款方式"
        @click="CollectionPicker = true"
      />
      <!--        金额-->
      <van-field v-model="CashierForm.Amount" name="code" label="金额"
        ><van-button slot="button" size="small" type="primary" @click="Related=true" color="#01ADED"
          >关联事项</van-button
        ></van-field
      >
      <!--        收支方式-->
      <van-field name="radio" label="收支方式">
        <van-radio-group v-model=" CashierForm.radio" direction="horizontal" slot="input">
          <van-radio name="1">收入</van-radio>
          <van-radio name="2">支出</van-radio>
        </van-radio-group>
        <van-radio-group v-model="CashierForm.radio" direction="horizontal" slot="input">
          <van-radio name="3">预收</van-radio>
          <van-radio name="4">预付</van-radio>
        </van-radio-group>
      </van-field>
      <!--     支付时间-->
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="CashierForm.currentDate"
        label="支付时间"
        placeholder="点击选择时间"
        @click="showPicker = true"
      />
      <!--        备注-->
      <van-field
        v-model="CashierForm.message"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注"
        show-word-limit
      />
      <van-field name="uploader" label="图片上传">
        <van-uploader v-model="uploader" slot="input" :after-read="afterRead"/>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block @click="Cashier" type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!--    支付时间-->
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        :min-date="minDate"
        :max-date="maxDate"
        type="date"
        @confirm="onConfirm"
        :formatter="formatter"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!--    服务人员-->
    <van-popup v-model="servicePicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="serviceOnConfirm"
        @cancel="servicesPicker = false"
      />
    </van-popup>
    <!--      收款方式-->
    <van-popup v-model="CollectionPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="Collection"
        @confirm="CollectionConfirm"
        @cancel="CollectionPicker = false"
      />
    </van-popup>
    <!--      客户名称-->
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
            @click="dataShow = false"
            >确定</van-button
          >
        </van-field>
      </van-cell-group>
    </van-overlay>
    <!--    款项收支列表-->
      <van-popup v-model="Related" position="bottom" :style="{ height: '50%' }">
        <van-contact-list
                v-model="chosenContactId"
                :list="list"
                @select="onSelect"
        />
      </van-popup>

  </div>
</template>

<script>
  import {CashierSubmit,CashierImg}from "../../../utils/data/add/add-matter"
  import { GetCashierPersonnel,//获取服务人员信息
    GetCashierCustomers//获取客户名称信息
  } from "../../../utils/index";
export default {
  name: "Cashier",
  data() {
    return {
      CashierForm:{
        clientValue:'',//客户名称
        serviceValue: "",//服务人员
        CollectionValue: "",//服务人员
        Amount:'',//金额
        radio: 1,//收支方式
        currentDate: this.formatDate(new Date()),//支付时间
        message: "",//备注
      },


      inputCodeValue: "",

      chosenContactId: null,
      editingContact: {},
      showList: true,
      showEdit: false,
      isEdit: false,
      list: [{
        name: '张三',
        tel: '13000000000',
        id: 0
      },
        {
          name: '张三',
          tel: '13000000000',
          id: 1
        },
        {
          name: '张三',
          tel: '13000000000',
          id: 2
        }],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      Collection: ["收入", "支出"],
      showPicker: false,
      servicePicker: false,
      Related: false,
      CollectionPicker: false,
      uploader: [],
      dataShow: false,

    };
  },
  methods: {
    Cashier(){
      CashierSubmit().then()
    },
    // 格式话时间
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    inputCodeSpan() {
      this.dataShow = true;
    },
    // 服务人员
    serviceOnConfirm(value) {
      this.serviceValue = value;
      this.servicePicker = false;
    },
    // 收款方式
    CollectionConfirm(value) {
      this.CollectionValue = value;
      this.CollectionPicker = false;
    },
    // 图片上传
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';

      CashierImg().then(res=>{
        if(res.code===1000){
          file.status = 'uploading';
          file.message = '上传成功';
        }
      }).each(err=>{
        setTimeout(() => {
          file.status = 'failed';
          file.message = '上传失败';
        }, 1000);
      })

    },
    // 日期格式化
    formatDate(date) {
      return `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`;
    },
    // 日期
    onConfirm(time) {
      this.value = this.formatDate(time);
      this.showPicker = false;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

  }
};
</script>

<style lang="less" scoped>
  .van-contact-list__bottom {
    display: none;
  }
</style>
