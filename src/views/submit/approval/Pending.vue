<template>
  <div class="list-content" id="list-content">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
      >
        <div class="list-item" v-for="items in list" :key="items.Name">
          <div class="gd-item">
            <!--            数据展示模块-->
            <div class="item" id="left1"  >
              <div class="w100pc">
                <van-row class="tables">
                  <van-col span="18"><p class="p">客户:{{items.Name}}</p></van-col>
                  <van-col span="6"><p class="p">款项收支</p></van-col>
                </van-row>
                <van-row class="tables">
                  <van-col span="12"><p class="p">收支类型:收入</p></van-col>
                  <van-col span="12"><p class="p">金额:{{items.Natural}}</p></van-col>
                </van-row>
                <van-row class="tables">
                  <van-col span="12"><p class="p">收款方式:刷卡</p></van-col>
                  <van-col span="12"
                  ><p class="p">支付时间：{{items.Date}}</p></van-col
                  >
                </van-row>
              </div>
              <div class="w100pc">
                <div class="collapse-wrap" v-if="items.isActive" >
                  <van-row class="tables">
                    <van-col span="12"
                    ><p class="p">提交人员:{{items.Name}}</p></van-col
                    >
                    <van-col span="12"
                    ><p class="p">提交时间:{{items.Date}}</p></van-col
                    >
                  </van-row>
                  <van-row class="tables">
                    <van-col span="12"
                    ><p class="p">审核人员:{{items.Name}}</p></van-col
                    >
                    <van-col span="12"
                    ><p class="p">修改人员:{{items.Name}}</p></van-col
                    >
                  </van-row>
                  <van-row class="tables">
                    <van-col span="18"
                    ><p class="p">备注:{{items.Paragraph}}</p></van-col
                    >
                    <van-col span="6"
                    ><van-button
                            type="primary"
                            @click="show = true"
                            size="small"
                    >关联事项</van-button
                    ></van-col
                    >
                  </van-row>
                  <div class="main">
                    <img
                            preview="0"
                            preview-text="描述文字"
                            src="https://img.yzcdn.cn/vant/apple-1.jpg"
                            alt
                    />
                    <img
                            preview="0"
                            preview-text="描述文字"
                            src="https://img.yzcdn.cn/vant/apple-1.jpg"
                            alt
                    />
                    <img
                            preview="0"
                            preview-text="描述文字"
                            src="https://img.yzcdn.cn/vant/apple-1.jpg"
                            alt
                    />
                    <img
                            preview="0"
                            preview-text="描述文字"
                            src="https://img.yzcdn.cn/vant/apple-1.jpg"
                            alt
                    />
                  </div>
                  <div>
                    <van-row>
                      <van-col span="20"
                      ><van-field
                              v-model="message"
                              rows="2"
                              autosize
                              label="审批意见"
                              type="textarea"
                              maxlength="50"
                              placeholder="请输入评论"
                              show-word-limit
                      /></van-col>
                      <van-col span="4">
                        <div class="button">
                          <van-button
                                  size="mini"
                                  color="#00b38a"
                                  @click="byTest"
                                  plain
                                  hairline
                                  type="primary"
                          >通过</van-button
                          >
                        </div>
                        <div class="button">
                          <van-button
                                  plain
                                  size="mini"
                                  color="red"
                                  @click="RefuseTest"
                                  hairline
                                  type="info"
                          >拒绝</van-button
                          >
                        </div></van-col
                      >
                    </van-row>
                  </div>
                </div>

              </div>
              <a
                      class="listmore"
                      href="javascript:;"
                      @click="commentClick(items)"
              >{{listmoreValue}}</a
              >
            </div>
            <div class="gd-item2">
              <p>
                <i class="icon iconfont icon-fuxuan" id="tongguo1"></i>
                <i class="icon iconfont icon-jujue1" id="jujue1"></i>
              </p>
            </div>

            <div class="Suggest">
              <div class="top">
                <div class="comment " v-show="comment && comment.length > 0">
                  <div class="com-space" v-for="onecommet in comment">
                    <div>
                      <a href="javascript:;" class="reply">
                        <span class="user"
                        >{{ onecommet.name }}{{ onecommet.status }}:</span
                        >
                        {{ onecommet.content }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--            评论-->
            <div class="commentDiv" @click="plclick">
              <div class="textarea">评论...</div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!--<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <div class="list-item">
          <div class="gd-item">
            &lt;!&ndash;            数据展示模块&ndash;&gt;
            <div class="item" id="left1">
              <div class="w100pc">
                <van-row class="tables">
                  <van-col span="18"><p class="p">客户:张三</p></van-col>
                  <van-col span="6"><p class="p">款项收支</p></van-col>
                </van-row>
                <van-row class="tables">
                  <van-col span="12"><p class="p">收支类型:收入</p></van-col>
                  <van-col span="12"><p class="p">金额:1255582563</p></van-col>
                </van-row>
                <van-row class="tables">
                  <van-col span="12"><p class="p">收款方式:刷卡</p></van-col>
                  <van-col span="12"
                    ><p class="p">支付时间：2020年3月2日</p></van-col
                  >
                </van-row>
              </div>
              <div class="w100pc">
                <fold>
                  <div class="collapse-wrap" v-show="isActive">
                    <van-row class="tables">
                      <van-col span="12"
                        ><p class="p">提交人员:王二</p></van-col
                      >
                      <van-col span="12"
                        ><p class="p">提交时间:2020年3月2日</p></van-col
                      >
                    </van-row>
                    <van-row class="tables">
                      <van-col span="12"
                        ><p class="p">审核人员:王二</p></van-col
                      >
                      <van-col span="12"
                        ><p class="p">修改人员:网三</p></van-col
                      >
                    </van-row>
                    <van-row class="tables">
                      <van-col span="24"
                        ><p class="p">备注:王二撒旦发生发生发射点</p></van-col
                      >
                    </van-row>
                    <div class="main">
                      <img
                        preview="0"
                        preview-text="描述文字"
                        src="https://img.yzcdn.cn/vant/apple-1.jpg"
                        alt
                      />
                      <img
                        preview="0"
                        preview-text="描述文字"
                        src="https://img.yzcdn.cn/vant/apple-1.jpg"
                        alt
                      />
                      <img
                        preview="0"
                        preview-text="描述文字"
                        src="https://img.yzcdn.cn/vant/apple-1.jpg"
                        alt
                      />
                      <img
                        preview="0"
                        preview-text="描述文字"
                        src="https://img.yzcdn.cn/vant/apple-1.jpg"
                        alt
                      />
                    </div>
                    <div>
                      <van-row>
                        <van-col span="20"
                          ><van-field
                            v-model="message"
                            rows="2"
                            autosize
                            label="审批意见"
                            type="textarea"
                            maxlength="50"
                            placeholder="请输入评论"
                            show-word-limit
                        /></van-col>
                        <van-col span="4"
                          >
                          <div class="button"> <van-button
                            size="mini"
                            color="#00b38a"
                            @click="byTest"
                            plain
                            hairline
                            type="primary"
                            >通过</van-button
                          >
                          </div>
                          <div class="button">
                          <van-button
                            plain
                            size="mini"
                            color="red"
                            @click="RefuseTest"
                            hairline
                            type="info"
                            >拒绝</van-button
                          ></div></van-col
                        >
                      </van-row>
                    </div>
                  </div>
                </fold>
              </div>
              <a
                class="listmore"
                href="javascript:;"
                @click="isActive = !isActive"
                >详情 ↓</a
              >
            </div>
            <div class="gd-item2">
              <p>
                <i class="icon iconfont icon-fuxuan" id="tongguo1"></i>
                <i class="icon iconfont icon-jujue1" id="jujue1"></i>
              </p>
            </div>

            <div class="Suggest">
              <div class="top">
                <div class="comment " v-show="comment && comment.length > 0">
                  <div class="com-space" v-for="onecommet in comment">
                    <div>
                      <a href="javascript:;" class="reply">
                        <span class="user"
                          >{{ onecommet.name }}{{ onecommet.status }}:</span
                        >
                        {{ onecommet.content }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            &lt;!&ndash;            评论&ndash;&gt;
            <div class="commentDiv" @click="plclick">
              <div class="textarea">评论...</div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>-->
    <!--评论输入框-->
    <div class="inset" v-show="enter" >
      <input type="text" placeholder="评论" v-model="srcomment" />
      <button class="input-button" v-on:click.stop="inputClick($event)">
        确认
      </button>
    </div>
  </div>
</template>

<script>
  import { Dialog } from "vant";
  let data = require("../../../utils/data");
  let json = require("../../../utils/json");
  import fold from "@/utils/fold";
  import { Toast } from "vant";
  export default {
    name: "Pending",
    components: {
      fold
    },
    data() {
      return {
        message: "",
        srcomment: "",
        listmoreValue: "详情 ↓",
        comment: [],
        list: [],
        Mask: false,
        loading: false, //是否处于加载状态
        finished: false, //是否已加载完所有数据
        isLoading: false, //是否处于下拉刷新状态
        enter: false, //评论输入框
        refreshing: false //是否处于下拉刷新状态
      };
    },
    directives: {
      // 自动获取焦点
      focus: {
        inserted: function(el, { value }) {
          //inserted 钩子函数:当元素被插入父元素时触发,
          if (value) {
            el.focus(); //el --> 触发的DOM元素
          }
        }
      }
    },
    created() {
      this.comment = data.comment;
      window.addEventListener("touchmove", this.myTouchMove);
    },
    methods: {
      commentClick:function(items){
        items.isActive= ! items.isActive;
        if (items.isActive===true){
          this.listmoreValue="收回 ↑"
        }else if(items.isActive===false){
          this.listmoreValue="详情 ↓"
        }
      },
      onLoad() {

        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
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
                    console.log(this.list);
                    this.finished = true;
                    this.loading = false;
                    this.finished = true;
                  })
                  .catch(err => {
                    console.log("登陆失败");
                  });
        }, 1000);
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      ddd(){
        debugger

      },
      plclick(){
        this.enter=true;
        this.Mask=true;
      },

      // 通过
      byTest() {
        this.comment.push({
          name: "老李",
          status: "审批通过",
          content: this.message
        });
        this.message = "";
      },
      RefuseTest() {
        this.comment.push({
          name: "老李",
          status: "审批拒绝",
          content: this.message
        });
        this.message = "";
      },

      // 输入框确认评论
      inputClick: function(event) {
        if (this.srcomment.length > 0) {
          this.comment.push({
            name: "老李",
            status: "发布评论",
            content: this.srcomment
          });
          this.srcomment = "";
          this.enter = false;
          this.Mask = false;
        } else {
          Toast("请填写评论");
        }
      }
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight; //视口大小
      document.getElementById("list-content").style.height =
              winHeight - 46 + "px"; //调整上拉加载框高度
    }
  };
</script>

<style lang="less" scoped>
  @import "../submission.less";
</style>
