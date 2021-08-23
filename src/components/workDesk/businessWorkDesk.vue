<template>
  <div class="box-container" v-loading="loading">
    <div style="text-align: right;margin-right: -17px;">
      <span style="font-size: 14px;">所属公司</span>
      <company v-model="searchdata.enterpriseId" :clearable="false"></company>
    </div>
    <div class="box" style="margin-top: 2px;">
      <div class="box-title">工作进度</div>
      <div class="box-item">
        <div class="box-item-tab" style="width: calc(100% - 522px)">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame.png"></div>
            <div class="box-item-tab-top-value">车辆利用率：{{vehicleUtilization}}%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left" style="width: calc(calc(100% - 20px) / 2);">
            <div class="box-item-tab-left-value" style="color: #333333;"> {{vehicleType}} </div>
            <div class="box-item-tab-left-title">车型</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 20px) / 2);">
            <div class="box-item-tab-right-value" style="color: #333333;"> {{unRentVehicle}} </div>
            <div class="box-item-tab-right-title">待租车辆</div>
          </div>
        </div>
        <div class="box-item-tab" style="width: calc(100% - 100px)">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame-10.png"></div>
            <div class="box-item-tab-top-value">意向订单成交率（门店本月）: {{turnoverRatio}}%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left">
            <div class="box-item-tab-left-value"> {{total}} </div>
            <div class="box-item-tab-left-title">总数</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right">
            <div class="box-item-tab-right-value"> {{toFollowUp}} </div>
            <div class="box-item-tab-right-title">待跟进</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right">
            <div class="box-item-tab-right-value"> {{turnover}} </div>
            <div class="box-item-tab-right-title">成交签约</div>
          </div>
        </div>
        <div class="box-item-tab" style="width: calc(100% - 522px)">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame-13.png"></div>
            <div class="box-item-tab-top-value">目标达成率（季度）：暂无数据</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left" style="width: calc(calc(100% - 20px) / 2);">
            <div class="box-item-tab-left-value" style="color: #368CFE;font-size: 14px;">暂无数据</div>
            <div class="box-item-tab-left-title">季度目标</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 20px) / 2);">
            <div class="box-item-tab-right-value" style="color: #36CBC4;font-size: 14px">暂无数据</div>
            <div class="box-item-tab-right-title">已完成</div>
          </div>
        </div>
      </div>
      <div class="box-item" style="margin-top: 39px;">
        <div class="box-item-col" style="margin-right: 28px;width: 50%;margin-left: 30px;">
          <div class="box-item-panel">
            <div class="box-item-panel-title" style="border-left:3px solid #368CFE;padding-left: 8px;">
              客户
            </div>
            <div class="box-item-panel-content">
              <div class="box-item-rate">
                <el-progress type="circle" :show-text="false" :percentage="100" :color="ratelist.qbkf_rate"></el-progress>
                <div class="box-item-rate-title">
                  <div class="box-item-rate-title-t"> {{customers}} </div>
                  <div class="box-item-rate-title-b">全部客户</div>
                </div>
              </div>
              <div class="box-item-rate">
                <el-progress type="circle" :show-text="false" :percentage="100" :color="ratelist.zzkh_rate"></el-progress>
                <div class="box-item-rate-title">
                  <div class="box-item-rate-title-t"> {{rentCustomer}} </div>
                  <div class="box-item-rate-title-b">在租客户</div>
                </div>
              </div>
              <div class="box-item-rate">
                <el-progress type="circle" :show-text="false" :percentage="100" :color="ratelist.yqkh_rate"></el-progress>
                <div class="box-item-rate-title">
                  <div class="box-item-rate-title-t">{{overdueCustomer}}</div>
                  <div class="box-item-rate-title-b">逾期客户</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-item-col" style="margin-right: 28px;">
          <div class="box-item-panel">
            <div class="box-item-panel-title" style="border-left:3px solid #368CFE;padding-left: 8px;">
              违章
            </div>
            <div class="box-item-panel-content">
              <div class="box-item-rate">
                <el-progress type="circle" :show-text="false" :percentage="100" :color="ratelist.qbkf_rate"></el-progress>
                <div class="box-item-rate-title">
                  <div class="box-item-rate-title-t"> {{violation}} </div>
                  <div class="box-item-rate-title-b">违章数</div>
                </div>
              </div>
              <div class="box-item-rate">
                <el-progress type="circle" :show-text="false" :percentage="100" :color="ratelist.yqs_rate"></el-progress>
                <div class="box-item-rate-title">
                  <div class="box-item-rate-title-t"> {{delay}} </div>
                  <div class="box-item-rate-title-b">逾期数</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">待办事项</div>
      <div class="box-item">
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #4A9CEE 0%, #329FFF 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-9.png"></div>
          <div class="box-item-card-title">待我跟进</div>
          <div class="box-item-card-value"> {{followUp}} </div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #01AACD 0%, #44C3EA 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-8.png"></div>
          <div class="box-item-card-title">即将缴费</div>
          <div class="box-item-card-value"> {{paymentContract}} </div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #E3612A 0%, #FB986E 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-7.png"></div>
          <div class="box-item-card-title">即将到期</div>
          <div class="box-item-card-value"> {{expirationContract}} </div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #FF4444 0%, #F56C6C 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-14.png"></div>
          <div class="box-item-card-title">逾期中</div>
          <div class="box-item-card-value">{{overdue}}</div>
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
            <el-button slot="append" size="small" icon="el-icon-search" @click="handleSearch"></el-button>
          </div>
          <div class="box-item" style="justify-content: space-between;">
            <div class="box-item-col" style="margin-right: 16px;width: calc(100% / 2);">
              <div class="box-item-pain" @click="handleClient">客户信息</div>
              <div class="box-item-pain" @click="handleOrder">意向订单</div>
              <div class="box-item-pain" @click="handleContract">合同收租</div>
              <div class="box-item-pain" @click="handleClick">违章处理</div>
            </div>
            <div class="box-item-col" style="width: calc(100% / 2);">
              <div class="box-item-pain" @click="handleClientAdd">客户信息-新增</div>
              <div class="box-item-pain" @click="handleOrderAdd">意向订单-新增</div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel" style="margin-left:16px;">
        <div class="panel-title">
          通知提醒
          <a class="panel-more" href="javascript:;" @click="handleMore">更多></a>
        </div>
        <hr class="panel-divider">
        <div class="panel-content">
          <div v-for="(item,index) in notifylist" :key="item.id">
            <div class="panel-list"  @click="setreaded(item,$event)">
              <div class="panel-list-order">{{index + 1}}</div>
              <div class="panel-list-content">
                <div class="panel-list-content-t">
                  <div class="panel-list-title" v-html="item.title"></div>
                  <div class="red-dot" v-if="item.messageStatus==1"></div>
                </div>
                <div class="panel-list-content-b">{{item.content}}</div>
              </div>
              <div class="panel-list-contrl">
                <span>{{item.createTimeStr}}</span>
                <!-- <a class="panel-more" href="javascript:;">查看></a> -->
              </div>
            </div>
            <hr class="divider-raw">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    formatJE2,
    getCookie,
    openNewTab
  } from '../../public.js'
  import company from "@/components/aacommon/getEnterpriseBox.vue"
  import axios from 'axios';
  export default {
    name: 'businessWorkDesk',
    components:{
      company
    },
    data() {
      return {
        searchdata:{
          "enterpriseId":getCookie("UserEnterpriseId"),
          "years":"",
           "type":"1"
        },
        loading:true,
        setreadedUrl:'/vehicle-service/remindMessageRecord/contractPushInfoDetail',
        searchVal: '',
        notifylist: [],
        customers: '0', //全部客户
        overdueCustomer: '0', //逾期客户
        rentCustomer: '0', //在租客户
        toFollowUp: '0', //待跟进
        total: '0', //总数
        turnover: '0', //成交签约
        turnoverRatio: '0', //意向订单成交率
        expirationContract: '0', //即将到期
        followUp: '0', //待我跟进
        paymentContract: '0', //即将缴费
        overdue:'0',//逾期中
        maintenanceInVehicle: '0', //维修中车辆
        rentVehicle: '0', //在租车辆
        unRentVehicle: '0', //待租车辆
        vehicleType: '0', //车型
        vehicleUtilization: '0', //车辆使用率
        delay: '0', //逾期
        violation: '0', //违章
        ratelist: {
          qbkf_rate: '#36CBC4',
          zzkh_rate: '#36B6FE',
          yqkh_rate: '#F56B2F',
          wzs_rate: '#FFA030',
          yqs_rate: '#FF4444'
        },
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      }
    },
    methods: {
      initData() {
        axios({
          method: 'post',
          url: '/vehicle-service/homePage/businessReport',
          headers: this.headers,
          data:this.searchdata
        }).then((result) => {
          // console.log(result.data);
          setTimeout(() => {
            window.onload()
          }, 10)
          this.loading = false;
          if(result.data.data.customerOverViewVO){
          this.customers = result.data.data.customerOverViewVO.customers; //全部客户
          this.overdueCustomer = result.data.data.customerOverViewVO.overdueCustomer; //逾期客户
          this.rentCustomer = result.data.data.customerOverViewVO.rentCustomer; //在租客户
          this.toFollowUp = result.data.data.customerOverViewVO.toFollowUp; //待跟进
          this.total = result.data.data.customerOverViewVO.total; //总数
          this.turnover = result.data.data.customerOverViewVO.turnover; //成交签约
          this.turnoverRatio = result.data.data.customerOverViewVO.turnoverRatio; //意向订单成交率
          }
          if( result.data.data.toDoVO){
            this.expirationContract = result.data.data.toDoVO.expirationContract; //即将到期
            this.followUp = result.data.data.toDoVO.followUp; //待我跟进
            this.paymentContract = result.data.data.toDoVO.paymentContract; //即将缴费
            this.overdue = result.data.data.toDoVO.overdue; //逾期
          }
          if(result.data.data.vehicleOverViewVO){
            this.maintenanceInVehicle = result.data.data.vehicleOverViewVO.maintenanceInVehicle; //维修中车辆
            this.rentVehicle = result.data.data.vehicleOverViewVO.rentVehicle; //在租车辆
            this.unRentVehicle = result.data.data.vehicleOverViewVO.unRentVehicle; //待租车辆
            this.vehicleType = result.data.data.vehicleOverViewVO.vehicleType; //车型
            this.vehicleUtilization = result.data.data.vehicleOverViewVO.vehicleUtilization; //车辆使用率
          }
          if(result.data.data.violationOrDelayVO){
          this.delay = result.data.data.violationOrDelayVO.delay; //逾期
          this.violation = result.data.data.violationOrDelayVO.violation; //违章
          }
          this.notifylist = result.data.data.page.records;
        }).catch(err => {
          console.log(err)
        })
      },
      setreaded(item,event){
        var $currentTarget=event.currentTarget
        if(item.messageStatus==1){
          axios({
              method: "post",
              url: this.setreadedUrl,
              headers: this.headers,
              data: {id:item.id},
            })
            .then((result) => {
              debugger
              $currentTarget.children[1].children[0].children[1].remove()
            })
        }
      },
      handleSearch() {
        let searchVal = this.searchVal.replace(/\s/gm, '')
        if (searchVal) {
          openNewTab(this, '合同收租', '/contractProduce', {
            vehicleNo: this.searchVal
          })
          this.searchVal = '';
        }
      },
      handleClient() {
        //客户信息
        openNewTab(this, '客户信息', '/customerInformation')
        //   this.$router.push({
        //   path:"/customerInformation",
        //   query:{form:'customerInformation'}
        // })
      },
      handleOrder() {
        //意向订单
        openNewTab(this, '意向订单', '/intentionOrder')
        //   this.$router.push({
        //   path:"/intentionOrder",
        //   query:{form:'intentionOrder'}
        // })
      },
      handleContract() {
        //合同收租
        openNewTab(this, '合同收租', '/contractProduce')
        //   this.$router.push({
        //   path:"/contractProduce",
        //   query:{form:'contractProduce'}
        // })
      },
      handleClick() {
        //违章处理
        openNewTab(this, '违章处理', '/illegalProcessing')
        //   this.$router.push({
        //   path:"/illegalProcessing",
        //   query:{form:'illegalProcessing'}
        // })
      },
      handleClientAdd() {
        //客户信息-新增
        this.$router.push({
          path: "/addCustomerInfo",
          query: {
            from: 'add'
          }
        })
      },
      handleOrderAdd() {
        //意向订单-新增
        this.$router.push({
          path: "/addOrder",
          query: {
            from: 'add'
          }
        })
      },
      handleMore() {
        // this.$router.push({
        //   path: '/remindProcess'
        // });
         openNewTab(this, '提醒处理', '/remindProcess')
      },
      handleNo() {
        this.$message({
          message: '功能正在努力开发中!',
          center: true,
        });
      }
    },
    mounted() {
      this.initData();
      document.getElementById('searchin').style.border = 'none'
      openNewTab(this,'业务','/businessWorkDesk')

      // for (let i = 1; i <= 6; ++i) {
      //   this.notifylist.push({
      //     id: i,
      //     title: '合同到期提醒',
      //     content: '交租提醒：租车合同202009031742第1期：2020-10-04，应交租金2850.00元，剩余7天，请及时提交缴费证明，以免逾期产生滞纳金',
      //     createTimeStr: '2020-09-02 14:32'
      //   })
      // }
    },
    watch:{
      searchdata:{
        handler(){
          this.initData()
        },
        immediate:true,
        deep:true
      }
    }
  }
</script>

<style scoped>
  .box-container {
    margin-left: -20px;
    padding-left: 20px;
    margin-right: -20px;
    padding-right: 20px;
    height: calc(100% - 40px);
    overflow: auto;
    margin-bottom: -20px;
  }

  .box {
    width: calc(100% - 15px);
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
    text-align: center;
  }

  .panel-list-content {
    display: inline-block;
    width: calc(100% - 150px);
  }
.panel-list-title {
    display: inline-block;
  }
  .panel-list-content-b {
    color: #999999;
  }

  .panel-list-contrl {
    display: inline-block;
    color: #999999;
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

  .box-item-card-value1 {
    color: #FFFFFF;
    font-family: fzyaoti;
    font-size: 18px;
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
    cursor: pointer;
  }
.box-item-pain:hover {
    color: #368CFE;
  }
  .box-item-panel {}

  .box-item-panel-title {
    margin-bottom: 33px;
    line-height: 21px;
  }

  .box-item-panel-content {
    display: flex;
    justify-content: flex-start;
  }

  .box-item-rate {
    width: 150px;
    height: 150px;
    position: relative;
    text-align: center;
  }

  .box-item-rate-title {
    color: #666666;
    font-family: Microsoft YaHei;
    font-size: 14px;
    line-height: normal;
    letter-spacing: 0.2px;
    margin-top: -95px;
  }

  .box-item-rate-title-t {
    color: #333333;
    font-family: 'fzyaoti';
    font-size: 40px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: center;
  }

  .box-item-rate-title-b {
    color: #666666;
    font-family: Microsoft YaHei;
    font-size: 12px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: center;
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
