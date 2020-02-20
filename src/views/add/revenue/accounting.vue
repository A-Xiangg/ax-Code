<template>
  <div>
    <van-form validate-first>
      <!--        客户名称-->
      <van-field
              readonly
              clickable
              v-model="clientValue"
              name="phone"
              @click="inputCodeSpan"
              label="客户名称"
      />
      <van-field v-model="phone" name="phone" label="事项名称" />
      <!--     所属 时间-->
      <van-field
              readonly
              clickable
              name="datetimePicker"
              :value="currentDate"
              label="所属时间"
              placeholder="点击选择时间"
              @click="showPicker = true"
      />
      <!--        服务人员-->
      <van-field
              readonly
              clickable
              name="picker"
              :value="serviceValue"
              label="服务人员"
              placeholder="选择服务人员"
              @click="servicePicker = true"
      />
      <van-field name="radio" label="收支方式">
        <van-radio-group v-model="radio" direction="horizontal" slot="input">
          <van-radio name="1">收入</van-radio>
          <van-radio name="2">支出</van-radio>
        </van-radio-group>
      </van-field>
      <van-field v-model="code" name="code" label="金额" ><van-button slot="button" size="small" type="primary" color="#01ADED" >关联事项</van-button></van-field>
      <!--        备注-->
      <van-field
              v-model="message"
              rows="2"
              autosize
              label="留言"
              type="textarea"
              maxlength="50"
              placeholder="请输入留言"
              show-word-limit
      />
      <van-field name="uploader" label="图片上传">
        <van-uploader v-model="uploader" slot="input" />
      </van-field>
      <div style="margin: 16px;">

        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!--    服务人员-->
    <van-popup v-model="servicePicker" position="bottom">
      <van-picker
              show-toolbar
              :columns="columns"
              @confirm="serviceOnConfirm"
              @cancel="servicesPicker = false"
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
    <!--    所属时间-->
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              :formatter="formatter"
              @confirm="onConfirm"
              @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "accounting",
  data() {
    return {
      code: "",
      phone: "",
      radio: 1,
      value: "",
      serviceValue: "",
      CollectionValue: "",
      inputCodeValue: "",
      clientValue: "",
      message: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      Collection: ["收入", "支出"],
      showPicker: false,
      servicePicker: false,
      CollectionPicker: false,
      uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],
      dataShow: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: this.formatDate(new Date())
    };
  },
  methods: {
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

    // 服务人员
    serviceOnConfirm(value) {
      this.serviceValue = value;
      this.servicePicker = false;
    },
    formatDate(date) {
      return `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`;
    },
    onConfirm(tim) {
      debugger;
      this.value = this.formatDate(tim);
      this.showPicker = false;
    },
    // 客户
    inputCodeSpan() {
      this.dataShow = true;
    },
  }
};
</script>

<style scoped></style>
