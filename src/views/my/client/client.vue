<template>
  <div>
    <van-nav-bar
      title="客户/供应商管理"
      left-text="返回"
      right-text="添加"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        background="#ffffff"
        input-align="center"
      />
    </form>
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
                  <div class="gd-item1">
                    <div class="gd-tm">
                      <div class="gdnum">
                        <div class="gdnum-1">
                          <dl>客户名称:</dl>
                          <dl id="dl-two">{{ item.customerName }}</dl>
                        </div>
                        <div class="gdnum-2">
                          <em>手机号:</em>
                          <dl>{{ item.phone }}</dl>
                        </div>
                      </div>
                      <div class="gethum">
                        <div class="gdnum-1">
                          <dl>服务人员:</dl>
                          <dl id="dl-one" i="undefined">
                            {{ item.servicerName }}
                          </dl>
                        </div>
                        <div class="gdnum-2">
                          <em>客户类型:</em>
                          <dl>{{ item.customerType }}</dl>
                        </div>
                      </div>
                    </div>
                    <div class="gb-item1">
                      <van-button
                        type="default"
                        color="#333"
                        icon="records"
                        round
                        @click="editshow = true"
                        plain
                        size="mini"
                        >编辑</van-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup v-model="addshow" position="bottom" :style="{ height: '100%' }">
      <div style="padding: 30px 10px 10px 10px">
        <van-nav-bar
          title="添加客户"
          left-text="返回"
          left-arrow
          @click-left="addshow = false"
        />
        <van-form @submit="onSubmit" v-model="addFrom">
          <van-field
            v-model="addFrom.username"
            name="客户名称"
            label="客户名称"
            placeholder="客户名称"
            :rules="[{ required: true, message: '请填写客户名称' }]"
          />
          <van-field
            v-model="addFrom.Phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="addFrom.clientName"
            label="客户类型"
            placeholder="请选择客户类型"
            @click="showPicker = true"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="addFrom.personnelValue"
            label="服务人员"
            placeholder="请选择服务人员"
            @click="personnel = true"
          />
          <van-field
            v-model="addFrom.message"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <van-popup v-model="editshow" position="bottom" :style="{ height: '100%' }">
      <div style="padding: 30px 10px 10px 10px">
        <van-nav-bar
          title="编辑客户"
          left-text="返回"
          left-arrow
          @click-left="editshow = false"
        />
        <van-form @submit="onSubmit" v-model="editFrom">
          <van-field
            v-model="editFrom.username"
            name="客户名称"
            label="客户名称"
            placeholder="客户名称"
            :rules="[{ required: true, message: '请填写客户名称' }]"
          />
          <van-field
            v-model="editFrom.Phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="editFrom.clientName"
            label="客户类型"
            placeholder="请选择客户类型"
            @click="showPicker = true"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="editFrom.personnelValue"
            label="服务人员"
            placeholder="请选择服务人员"
            @click="personnel = true"
          />
          <van-field
            v-model="editFrom.message"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <!--    客户类型-->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!--    服务人员-->
    <van-popup v-model="personnel" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="personnelFirm"
        @cancel="personnel = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
let json = require("../../../utils/json");
export default {
  name: "client",
  data() {
    return {
      value: "",
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
    // 客户类别
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    // 服务人员
    personnelFirm(value) {
      this.personnelValue = value;
      this.personnel = false;
    },

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

<style lang="less">
@import "client.less";
.list-content {
  overflow: scroll;
}
.list-item {
  text-align: center;
}
.van-nav-bar__text {
  color: #ffffff;
}
.van-nav-bar {
  background-color: #01aded;
}
.van-nav-bar .van-icon {
  color: #ffffff;
}
.van-nav-bar__title {
  color: #ffffff;
}
.van-tab__text {
  position: relative;
  color: #83fbff;
}

.van-popup {
  background-color: #f2f2f2;
}
</style>
