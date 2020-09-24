<template>
  <div>
    <div class="box">
      <div class="box-title">工作进度</div>
      <div class="box-item">
        <div class="box-item-tab" style="width: calc(100% - 100px)">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame.png"></div>
            <div class="box-item-tab-top-value">车辆利用率：68.6%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left">
            <div class="box-item-tab-left-value">856</div>
            <div class="box-item-tab-left-title">在租车</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right">
            <div class="box-item-tab-right-value">223</div>
            <div class="box-item-tab-right-title">待租车</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right">
            <div class="box-item-tab-right-value">462</div>
            <div class="box-item-tab-right-title">备用车</div>
          </div>
        </div>
        <div class="box-item-tab" style="width: calc(100% - 522px)">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame.png"></div>
            <div class="box-item-tab-top-value">车辆维修率：5.9%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left" style="width: calc(calc(100% - 20px) / 2);">
            <div class="box-item-tab-left-value" style="color: #333333;">806</div>
            <div class="box-item-tab-left-title">正常状态</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 20px) / 2);">
            <div class="box-item-tab-right-value" style="color: #333333;">50</div>
            <div class="box-item-tab-right-title">维修状态</div>
          </div>
        </div>
        <div class="box-item-tab" style="width: calc(100% - 522px)">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame.png"></div>
            <div class="box-item-tab-top-value">车辆在线率：92.3%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left" style="width: calc(calc(100% - 20px) / 2);">
            <div class="box-item-tab-left-value" style="color: #36CBC4;">769</div>
            <div class="box-item-tab-left-title">设备在线</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 20px) / 2);">
            <div class="box-item-tab-right-value" style="color: #FF4444;">87</div>
            <div class="box-item-tab-right-title">设备离线</div>
          </div>
        </div>
      </div>
      <div class="box-item" style="margin-top: 39px;">
        <div class="box-item-col" style="margin-right: 28px;">
          <div class="box-item-label">
            <div class="box-item-label-left">需年检车辆</div>
            <div class="box-item-label-right">15</div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #f7e4ce;color: #E72828;">事故/出险车辆</div>
            <div class="box-item-label-right" style="color: #E72828;">257</div>
          </div>
        </div>
        <div class="box-item-col" style="margin-right: 28px;">
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #cfe0f7;color: #0A5FD1;">需续保车辆</div>
            <div class="box-item-label-right" style="color: #0A5FD1;">12</div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #d9ebd0;color: #389E06;">保养车辆</div>
            <div class="box-item-label-right" style="color: #389E06;">8</div>
          </div>
        </div>
        <div class="box-item-col"  style="margin-right: 28px;">
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #cfe8f7;color: #1B6AD2;">违章车辆</div>
            <div class="box-item-label-right" style="color: #1B6AD2;">36</div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #cfe8f7;color: #0C8FD9;">逾期锁车</div>
            <div class="box-item-label-right" style="color: #0C8FD9;">3</div>
          </div>
        </div>
        <div class="box-item-col">
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #e4daec;color: #7F40B1;">保障/维修车辆</div>
            <div class="box-item-label-right" style="color: #7F40B1;">36</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">待办事项</div>
      <div class="box-item">
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #4A9CEE 0%, #329FFF 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-3.png"></div>
          <div class="box-item-card-title">车辆登记</div>
          <div class="box-item-card-value">24</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #01AACD 0%, #44C3EA 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-5.png"></div>
          <div class="box-item-card-title">一键上传待处理</div>
          <div class="box-item-card-value">4</div>
        </div>
      </div>
    </div>
    <div class="panel-group">
      <div class="panel">
        <div class="panel-title">
          快捷功能
        </div>
        <hr class="panel-divider">
        <div class="panel-content">
          <div class="searchbtn">
            <el-input id="searchin" class="searchin" size="small" placeholder="请输入车牌号 搜索相关合同" v-model="searchVal">
            </el-input>
            <el-button slot="append" size="small" icon="el-icon-search"></el-button>
          </div>
          <div class="box-item" style="justify-content: space-between;">
            <div class="box-item-col" style="margin-right: 16px;width: calc(100% / 2);">
              <div class="box-item-pain">实时监控</div>
              <div class="box-item-pain">轨迹回放</div>
              <div class="box-item-pain">车型维护</div>
              <div class="box-item-pain">车辆管理</div>
              <div class="box-item-pain">逾期锁车</div>
            </div>
            <div class="box-item-col" style="width: calc(100% / 2);">
              <div class="box-item-pain">违章管理</div>
              <div class="box-item-pain">报障/维修管理</div>
              <div class="box-item-pain">事故/出险管理</div>
              <div class="box-item-pain">事故/出险管理</div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel" style="margin-left:16px;">
        <div class="panel-title">
          通知提醒
          <a class="panel-more" href="javascript:;">更多></a>
        </div>
        <hr class="panel-divider">
        <div class="panel-content">
          <div v-for="item in notifylist">
            <div class="panel-list">
              <div class="panel-list-order">{{item.order}}</div>
              <div class="panel-list-content">
                <div class="panel-list-content-t">{{item.title}}</div>
                <div class="panel-list-content-b">{{item.content}}</div>
              </div>
              <div class="panel-list-contrl">
                <span>{{item.time}}</span>
                <a class="panel-more" href="javascript:;">查看></a>
              </div>
            </div>
            <hr class="divider-raw">
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {
    formatJE2
  } from '../../public.js'
  export default {
    name: 'financialWorkDesk',
    data() {
      return {
        searchVal: '',
        notifylist:[]
      }
    },
    methods:{

    },
    mounted() {
      document.getElementById('searchin').style.border = 'none'
      for(let i=1;i<=6;++i){
        this.notifylist.push({order:i,title:'合同到期提醒',content:'合同TFA23423442到期，还有30天',time:'2020-09-02 14:32'})
      }
    }
  }
</script>

<style scoped>
  .box {
    width: calc(100% - 30px);
    border: 1px solid #E5E5E5;
    padding: 16px 15px;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .panel-group {
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .panel {
    width: calc(100% / 2);
    border: 1px solid #E5E5E5;
    display: inline-block;
  }

  .panel-divider {
    width: 100%;
    margin: auto;
    background: #E5E5E5;
    border: none;
    border-top: 1px #E5E5E5 solid;
  }

  .panel-more {
    color: #368CFE;
    font-family: Microsoft YaHei;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.1px;
    text-align: left;
    text-decoration: none;
  }

  .panel-title {
    padding: 16px 21px;
    color: #333333;
    font-family: Microsoft YaHei;
    font-size: 20px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .panel-content {
    padding: 20px 21px;
  }

  .panel-list {
    display: flex;
    padding: 13px 0px;
    width: 100%;
    justify-content: space-between;
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
    line-height: 36px;
  }

  .panel-list-content {
    display: inline-block;
    width: calc(100% - 200px);
  }

  .panel-list-content-b {
    color: #999999;
  }

  .panel-list-contrl {
    display: inline-block;
    color: #999999;
    line-height: 36px;
  }

  .panel-list-contrl>span {
    margin-right: 10px;
  }

  .box-title {
    color: #333333;
    font-family: Microsoft YaHei;
    font-size: 20px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    margin-bottom: 35px;
  }

  .box:first-child {
    margin-top: unset !important;
  }

  .box-item {
    display: flex;
    justify-content: flex-start;
  }

  .box-item-col {
    width: calc(100% / 4);
    display: inline;
  }

  .box-item-col:first-child {}

  .box-item-tab {
    height: 172px;
    width: 489px;
    border: 1px #E5E5E5 solid;
    display: inline-block;
    position: relative;
    margin-left: 33px;
  }

  .box-item-tab:first-child {
    margin-left: unset !important;
  }

  .box-item-tab>div>div {
    position: absolute;
  }

  .box-item-tab-top {
    position: relative;
    height: 71px;
  }

  .box-item-tab-icon {
    top: 25px;
    left: 17px;
  }

  .box-item-tab-left {
    position: relative;
    height: 101px;
    width: calc(calc(100% - 10px) / 3);
    display: inline-block;
  }

  .box-item-tab-left-value,
  .box-item-tab-right-value {
    top: 24px;
    left: 34px;
    font-family: Microsoft YaHei;
    color: unset;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    letter-spacing: 0.1px;
    text-align: center;
  }

  .box-item-tab-right-value {
    color: unset;
  }

  .box-item-tab-left-title,
  .box-item-tab-right-title {
    top: 61px;
    left: 34px;
    color: #999999;
    font-family: Microsoft YaHei;
    font-size: 12px;
    line-height: normal;
    letter-spacing: 0.1px;
    text-align: left;
  }

  .box-item-tab-right {
    position: relative;
    display: inline-block;
    height: 101px;
    width: calc(calc(100% - 10px) / 3);
  }

  .box-item-tab-top-value {
    top: 27px;
    left: 60px;
    color: #333333;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0.1px;
    text-align: left;
  }

  .box-item-label {
    margin-bottom: 24px;
    background-color: #F5F5F5;
    padding: 5px 5px;
  }

  .box-item-label>div {
    display: inline-block;
    vertical-align: middle;
  }

  .box-item-label-left {
    background: #cfedeb;
    width: 100px;
    height: 60px;
    line-height: 60px !important;
    color: #009891;
    font-family: Microsoft YaHei;
    font-size: 14px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    padding: 6px 6px;
  }

  .box-item-label-right {
    color: #009891;
    font-family: fzyaoti;
    font-size: 30px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    width: 100px;
  }

  .box-item-card {
    width: calc(100% / 4);
    height: 129px;
    margin-left: 14px;
    position: relative;
    display: inline-block;
  }

  .box-item-card:first-child {
    margin-left: unset;
  }

  .box-item-card-icon {
    position: absolute;
    top: 39px;
    left: 20px;
  }

  .box-item-card-title {
    color: #FFFFFF;
    font-family: Microsoft YaHei;
    font-size: 14px;
    line-height: normal;
    letter-spacing: 0.1px;
    text-align: left;
    position: absolute;
    left: 92px;
    top: 30px;
  }

  .box-item-card-value {
    color: #FFFFFF;
    font-family: fzyaoti;
    font-size: 40px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    position: absolute;
    top: 59px;
    left: 90px;
  }

  .box-item-pain {
    border-radius: 4px;
    background: #F1F1F1;
    text-align: center;
    height: 48px;
    width: 100%;
    line-height: 48px;
    margin-top: 14px;
    margin-bottom: 14px;
  }

  .divider-raw {
    width: 95%;
    margin: auto;
    background: #E5E5E5;
    border: none;
    border-top: 1px #E5E5E5 solid;
  }

  .divider-col {
    position: absolute;
    margin: auto;
    top: 85px;
    width: 0px;
    height: 75px;
    border: none;
    display: inline-block;
    border-right: 1px #E5E5E5 solid;
  }

  .searchbtn {
    border: 1px #E5E5E5 solid;
    border-radius: 4px;
    background: #FFFFFF;
    padding: 1px 1px;
  }

  .searchin {
    width: 90%;
  }

  .searchin>input {
    border: none !important;
    background: unset !important;
  }

  .el-button {
    border: none !important;
    background: unset !important;
  }

  .el-button:focus,
  .el-button:hover {
    color: #409EFF;
    border-color: unset !important;
    background-color: unset !important;
  }
</style>
