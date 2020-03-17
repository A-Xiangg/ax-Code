<template>
  <div>
    <van-nav-bar
      title="员工管理"
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
      <van-pull-refresh v-model="isLoading"   success-text="刷新成功"	@refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          :offset="5"
        >
          <div class="list-item" v-for="items in list" :key="items.Name">
            <div class="gd-item">
              <div class="item" id="left1">
                <van-row class="tables">
                  <van-col span="12"><p class="p">客户名称:{{items.Name}}</p></van-col>
                  <van-col span="12"><p class="p">真实姓名:{{items.Name}}</p></van-col>
                </van-row>
                <van-row class="tables">
                  <van-col span="12"><p class="p">在职状态:离职</p></van-col>
                  <van-col span="12"
                    ><p class="p">手机号:{{items.phone}}</p></van-col
                  >
                </van-row>
                <fold >
                  <div class="collapse-wrap" v-if="items.isActive">
                    <van-row class="tables">
                      <van-col span="12"
                        ><p class="p">默认客户:{{items.Name}}</p></van-col
                      >
                      <van-col span="12"
                        ><p class="p">默认收款方式:支付宝</p></van-col
                      >
                    </van-row>
                    <!-- @slot default -->
                    <van-row class="tables">
                      <van-col span="12"><p class="p">上传文件:是</p></van-col>
                      <van-col span="12"
                        ><p class="p">
                          <van-button
                                  round
                                  type="primary"
                            @click="editshow = true"
                            size="small"
                          >
                            <span class="icon iconfont icon-bianji"></span
                            >编辑</van-button
                          ><van-button type="warning" round  @click="Leave" size="small"
                            >离职</van-button
                          >
                        </p></van-col
                      >
                    </van-row>
                  </div>
                </fold>
                <a
                  class="listmore"
                  href="javascript:;"
                  @click="commentClick(items)"
                  >{{listmoreValue}}</a
                >
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!--        添加员工对话框-->
    <van-popup v-model="addshow" position="bottom" :style="{ height: '100%' }">
      <div >
        <van-nav-bar
          title="添加客户"
          left-text="返回"
          left-arrow
          @click-left="addshow = false"
        />
        <van-form @submit="onSubmit" v-model="addFrom">
          <van-field
            v-model="addFrom.username"
            name="员工名称"
            label="员工名称"
            placeholder="员工名称"
            :rules="[{ required: true, message: '请填写员工名称' }]"
          />
          <van-field
            v-model="addFrom.Phone"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="addFrom.Phone"
            name="真实姓名"
            label="真实姓名"
            placeholder="真实姓名"
            :rules="[{ required: true, message: '请填写真实姓名' }]"
          />
          <van-field
            v-model="addFrom.Phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field name="radio" label="是否上传文件">
            <template #input>
              <van-radio-group v-model="addFrom.radio" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="picker"
            :value="addFrom.clientName"
            label="默认客户"
            placeholder="请选择"
            @click="showPicker = true"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="addFrom.personnelValue"
            label="收款方式"
            placeholder="请选择收款方式"
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
    <!--        编辑员工对话框-->
    <van-popup v-model="editshow" position="bottom" :style="{ height: '100%' }">
      <div >
        <van-nav-bar
          title="编辑员工"
          left-text="返回"
          left-arrow
          @click-left="editshow = false"
        />
        <van-form @submit="onSubmit" v-model="addFrom">
          <van-field
            v-model="editshow.username"
            name="员工名称"
            label="员工名称"
            placeholder="员工名称"
            :rules="[{ required: true, message: '请填写员工名称' }]"
          />
          <van-field
            v-model="editshow.Phone"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="editshow.Phone"
            name="真实姓名"
            label="真实姓名"
            placeholder="真实姓名"
            :rules="[{ required: true, message: '请填写真实姓名' }]"
          />
          <van-field
            v-model="editshow.Phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field name="radio" label="是否上传文件">
            <template #input>
              <van-radio-group v-model="editshow.radio" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="picker"
            :value="editshow.clientName"
            label="默认客户"
            placeholder="请选择"
            @click="showPicker = true"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="editshow.personnelValue"
            label="收款方式"
            placeholder="请选择收款方式"
            @click="personnel = true"
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
  import { Toast } from 'vant';
    import { Dialog } from 'vant';
let json = require("../../../utils/json");
import fold from "@/utils/fold";

export default {
  name: "staff",
  components: {
    fold
  },
  data() {
    return {
      listmoreValue:'详情 ↓',
      value: "",
      personnelValue: "",
      list: [],
      isActive: false,
      editFrom: {
        username: "",
        radio: "",
        clientName: "",
        personnelValue: "",
        message: "",
        Phone: ""
      },
      addFrom: {
        username: "",
        clientName: "",
        radio: "1",
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
  methods: {
    commentClick(items){
      items.isActive= ! items.isActive;
      if (items.isActive===true){
        this.listmoreValue="收回 ↑"
      }else if(items.isActive===false){
        this.listmoreValue="详情 ↓"
      }
    },
      Leave(){
          Dialog.confirm({
              message: '确定要离职吗'
          }).then(() => {
              // on confirm
          }).catch(() => {
              // on cancel
          });
      },
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

      //上拉加载
      setTimeout(() => {
        if (this.isLoading) {
          this.list = [];
          this.isLoading = false;
        }
        this.$axios
                .get("/data/tableData", null)
                .then(res => {
                  for (let i=0;i<res.data.length;i++){
                    this.list.push(res.data[i]);
                  }
                  for (let i=0;i<this.list.length;i++){
                    this.list[i].isActive=false
                  }

                  this.loading = false;
                })
                .catch(err => {
                  console.log("登陆失败");
                });
      }, 1000);
    },
    onRefresh() {
      //下拉刷新
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
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

<style scoped>
@import "staff.less";
@import "../../../components/index.less";
 

</style>
