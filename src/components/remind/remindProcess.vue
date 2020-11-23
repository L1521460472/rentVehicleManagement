<template>
  <div class="container" v-loading="loading">
    <div class="topbar">
      <el-button ref="btn0" type="primary" size="mini" @click="loadmessage(0)">全部</el-button>
      <el-button ref="btn1" size="mini" @click="loadmessage(1)">未查看</el-button>
      <el-button ref="btn2" size="mini" @click="loadmessage(2)">已查看</el-button>
    </div>
    <hr class="divider-raw" style="width: unset;margin-left: -17px;margin-right: -17px;">
    <div class="panel-content">
      <div v-for="item in remindData">
        <div class="panel-list" @click="setreaded(item,$event)">
          <div class="panel-list-order" v-html="item.order"></div>
          <div class="panel-list-content">
            <div class="panel-list-content-t">
              <div class="panel-list-title" v-html="item.title"></div>
              <div class="red-dot" v-if="item.messageStatus==1"></div>
            </div>
            <div class="panel-list-content-b" v-html="item.content"></div>
          </div>
          <div class="panel-list-contrl">
            <div style="color: #333333;">创建人</div>
            <span v-html="item.createBy"></span>
          </div>
          <div class="panel-list-contrl">
            <div style="color: #333333;">日期</div>
            <span v-html="item.createTimeStr"></span>
          </div>
        </div>
        <hr class="divider-raw">
      </div>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import {
    getCookie,
    dateToString,
    getMenuBtnList
  } from "@/public";
  export default {
    name: "remindProcess",
    data() {
      return {
        setreadedUrl: '/vehicle-service/remindMessageRecord/contractPushInfoDetail',
        loading: false,
        remindData: [],
        isFontColorW: true,
        isFontColorB: false,
        messageStatus: 2,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      };
    },
    methods: {
      search() {
        var temp = this.isFontColorW;
        this.isFontColorW = this.isFontColorB;
        this.isFontColorB = temp;
      },
      loadmessage(flag, pageSize, currentPage) {
        let nodata = "暂无消息"
        let data = {
          currentPage: currentPage | this.currentPage,
          pageSize: pageSize | this.pageSize,
        }
        this.messageStatus = flag
        if (flag != 0) {
          data.messageStatus = flag
        }
        this.$refs.btn0.$el.className = "el-button el-button--mini"
        this.$refs.btn1.$el.className = "el-button el-button--mini"
        this.$refs.btn2.$el.className = "el-button el-button--mini"
        if (flag == 0) {
          this.$refs.btn0.$el.className = "el-button el-button--primary el-button--mini"
        } else if (flag == 1) {
          nodata = "暂无未读消息"
          this.$refs.btn1.$el.className = "el-button el-button--primary el-button--mini"
        } else if (flag == 2) {
          nodata = "暂无已读消息"
          this.$refs.btn2.$el.className = "el-button el-button--primary el-button--mini"
        }
        this.loading = true;
        axios({
            method: "post",
            url: "/vehicle-service/homePage/processingRemind",
            headers: this.headers,
            data: data,
          })
          .then((result) => {
            this.loading = false
            if (result.data.status == 0) {
              this.remindData = result.data.data.records;
              if (this.remindData.length == 0) {
                this.$message({
                  message: nodata,
                  center: true,
                  type: "success",
                });
              }
              this.currentPage = result.data.data.current;
              this.pageSize = result.data.data.size;
              this.total = result.data.data.total;
              let order = result.data.data.current;
              for (let i = 1; i <= this.remindData.length; ++i) {
                this.remindData[i - 1].order = (order - 1) * 10 + i
              }
            } else {
              this.$message({
                message: result.data.message,
                center: true,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.loading = false
          })
      },
      setreaded(item, event) {
        var $currentTarget = event.currentTarget
        if (item.messageStatus == 1) {
          axios({
              method: "post",
              url: this.setreadedUrl,
              headers: this.headers,
              data: {
                id: item.id
              },
            })
            .then((result) => {
              debugger
              $currentTarget.children[1].children[0].children[1].remove()
            })
        }
      },
      handleSizeChange(val) {
        this.loadmessage(this.messageStatus, val)
      },
      handleCurrentChange(val) {
        this.loadmessage(this.messageStatus, null, val)
      }
    },
    mounted() {
      this.loadmessage(0)
    },
  };
</script>
<style scoped>
  .page {
    text-align: center;
    margin-top: 13px;
  }

  .container {
    border: 1px solid #DEE4F0;
    padding: 17px 17px;
    height: calc(100% - 100px);
  }

  .topbar {
    margin-bottom: 17px;
  }

  .panel-content {
    padding: 20px 21px;
    height: calc(100% - 127px);
    overflow: auto;
    margin-right: -17px;
  }

  .panel-list {
    display: flex;
    padding: 13px 0px;
    width: 100%;
    justify-content: space-between;
  }

  .panel-list-title {
    display: inline-block;
  }

  .panel-list-order,
  .panel-list-content-t,
  .panel-list-content-b,
  .panel-list-contrl {
    color: #333333;
    font-family: Microsoft YaHei;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.1px;
    text-align: left;
  }

  .panel-list-order {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    text-align: center;
  }

  .panel-list-content {
    display: inline-block;
    width: calc(100% - 250px);
  }

  .panel-list-content-b {
    color: #999999;
  }

  .panel-list-contrl {
    display: inline-block;
    color: #999999;
    width: 90px;
    word-break: break-word;
  }

  .panel-list-contrl>span {
    margin-right: 10px;
  }

  .red-dot {
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
    margin-bottom: 5px;
    margin-left: -3px;
  }

  .divider-raw {
    margin: auto;
    background: #E5E5E5;
    border: none;
    border-top: 1px #E5E5E5 solid;
  }
</style>
