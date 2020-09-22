<template>
  <div>
    <div class="box">
      <div class="box-title">工作进度</div>
      <div class="box-item">
        <div class="box-item-tab">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame-4.png"></div>
            <div class="box-item-tab-top-value">回款率：68.6%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left">
            <div class="box-item-tab-left-value">254,123.00</div>
            <div class="box-item-tab-left-title">总应收款</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right">
            <div class="box-item-tab-right-value">85,476.00</div>
            <div class="box-item-tab-right-title">总已收款</div>
          </div>
        </div>
        <div class="box-item-tab" style="width: calc(100% - 522px)">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame-10.png"></div>
            <div class="box-item-tab-top-value">逾期率 : 75%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left" style="width: calc(calc(100% - 20px) / 4);">
            <div class="box-item-tab-left-value" style="color: #333333;">563</div>
            <div class="box-item-tab-left-title">已完结合同</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 20px) / 4);">
            <div class="box-item-tab-right-value" style="color: #333333;">127</div>
            <div class="box-item-tab-right-title">进行中合同</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 20px) / 4);">
            <div class="box-item-tab-right-value" style="color: #333333;">55</div>
            <div class="box-item-tab-right-title">逾期状态合同</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 20px) / 4);">
            <div class="box-item-tab-right-value" style="color: #333333;">48</div>
            <div class="box-item-tab-right-title">本月到期合同</div>
          </div>
        </div>
      </div>
      <div class="box-item" style="margin-top: 39px;">
        <div class="box-item-col" style="margin-right: 28px;">
          <div class="box-item-label">
            <div class="box-item-label-left">本月新增合同</div>
            <div class="box-item-label-right">15</div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #f7e4ce;color: #F08D19;">本月退车应付（预计）</div>
            <div class="box-item-label-right" style="color: #F08D19;">125,413.00</div>
          </div>
        </div>
        <div class="box-item-col" style="margin-right: 28px;">
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #e4daec;color: #7F40B1;">本月应收款（元）</div>
            <div class="box-item-label-right" style="color: #7F40B1;">251,246.00</div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #ece2d6;color: #B27427;">本月退车已付（元）</div>
            <div class="box-item-label-right" style="color: #B27427;">14,125.00</div>
          </div>
        </div>
        <div class="box-item-col">
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #cfe0f7;color: #1B6AD2;">本月已收款（元）</div>
            <div class="box-item-label-right" style="color: #1B6AD2;">5,468.00</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">待办事项</div>
      <div class="box-item">
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #25A092 0%, #36CBC4 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">合同待登记</div>
          <div class="box-item-card-value">88</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #01AACD 0%, #44C3EA 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-8.png"></div>
          <div class="box-item-card-title">缴费待审核</div>
          <div class="box-item-card-value">56</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #E3612A 0%, #FB986E 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-6.png"></div>
          <div class="box-item-card-title">变更待审核</div>
          <div class="box-item-card-value">28</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #FF4444 0%, #F56C6C 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-15.png"></div>
          <div class="box-item-card-title">待开票</div>
          <div class="box-item-card-value">67</div>
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
            <el-input id="searchin" class="searchin" size="small" placeholder="请输入合同编号/车牌号/客户手机号/业务员姓名 搜索相关合同" v-model="searchVal">
            </el-input>
            <el-button slot="append" size="small" icon="el-icon-search"></el-button>
          </div>
          <div class="box-item" style="justify-content: space-between;">
            <div class="box-item-col" style="margin-right: 16px;width: calc(100% / 2);">
              <div class="box-item-pain">合同登记</div>
              <div class="box-item-pain">合同变更</div>
              <div class="box-item-pain">变更记录</div>
              <div class="box-item-pain">收租台账</div>
              <div class="box-item-pain">逾期锁车</div>
            </div>
            <div class="box-item-col" style="width: calc(100% / 2);">
              <div class="box-item-pain">退车结算</div>
              <div class="box-item-pain">租金抵扣</div>
              <div class="box-item-pain">缴费审核</div>
              <div class="box-item-pain">预收款管理</div>
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
    width: calc(100% / 3);
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
    width: 240px;
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
    width: 240px;
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
    width: 157px;
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
    width: 157px;
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
