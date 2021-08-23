<template>
  <div v-loading="loading" class="box-container">
    <div style="text-align: right;margin-right: -17px;">
      <span style="font-size: 14px;">所属公司</span>
      <company v-model="searchdata.enterpriseId" :clearable="false"></company>
    </div>
    <div class="box" style="margin-top: 2px;">
      <el-input class="searchin" size="small" placeholder="请输入车牌号 搜索相关合同" v-model="searchVal" clearable>
      </el-input>
      <el-button @click="search" class="searchbtn" type="primary" size="small">查询</el-button>
      <el-button class="qybtn" type="primary" size="small" @click="jumptohtdj">
        <img src="../../assets/workdesk/Frame-18.png" />
        签约
      </el-button>
      <el-button class="jsbtn" type="primary" size="small" @click="jumptosztz">
        <img src="../../assets/workdesk/Frame-17.png" />
        结算
      </el-button>
    </div>
    <div class="box">
      <div class="box-title">车辆总览</div>
      <div class="box-item">
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #25A092 0%, #36CBC4 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-3.png"></div>
          <div class="box-item-card-title">在租车辆</div>
          <div class="box-item-card-value" v-html="vehicleOverViewVO.rentVehicle"></div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #01AACD 0%, #44C3EA 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-3.png"></div>
          <div class="box-item-card-title">待租车辆</div>
          <div class="box-item-card-value" v-html="vehicleOverViewVO.unRentVehicle"></div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #E3612A 0%, #FB986E 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-1.png"></div>
          <div class="box-item-card-title">备用车辆</div>
          <div class="box-item-card-value" v-html="vehicleOverViewVO.spareVehicle"></div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #FF4444 0%, #F56C6C 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-2.png"></div>
          <div class="box-item-card-title">维修中车辆</div>
          <div class="box-item-card-value" v-html="vehicleOverViewVO.maintenanceInVehicle"></div>
        </div>
        <div class="box-item-rate">
          <el-progress type="dashboard" :percentage="vehicleOverViewVO.vehicleUtilization" :color="vehicleOverViewVO_color" ref="vehicleOverViewVO_percentage_id"></el-progress>
          <div class="box-item-rate-title">车辆利用率</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">客户总览</div>
      <div class="box-item">
        <div class="box-item-tab" style="width: calc(calc(100% / 3 ) - 100px);">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame-11.png"></div>
            <div class="box-item-tab-top-value">
              全部客户：<span v-html="customerOverViewVO.customers"></span></div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left">
            <div class="box-item-tab-left-value" v-html="customerOverViewVO.rentCustomer"></div>
            <div class="box-item-tab-left-title">在租客户合同数</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right">
            <div class="box-item-tab-right-value" v-html="customerOverViewVO.overdueCustomer"></div>
            <div class="box-item-tab-right-title">逾期客户</div>
          </div>
        </div>
        <div class="box-item-tab">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame-10.png"></div>
            <div class="box-item-tab-top-value">
              意向订单成交率（本月）：<span v-html="customerOverViewVO.turnoverRatio"></span>%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left" style="width: calc(calc(100% - 10px) / 3);">
            <div class="box-item-tab-left-value" style="color: #333333;" v-html="customerOverViewVO.total"></div>
            <div class="box-item-tab-left-title">总数</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 10px) / 3);">
            <div class="box-item-tab-right-value" style="color: #333333;" v-html="customerOverViewVO.toFollowUp"></div>
            <div class="box-item-tab-right-title">待跟进</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 10px) / 3);">
            <div class="box-item-tab-right-value" style="color: #333333;" v-html="customerOverViewVO.turnover"></div>
            <div class="box-item-tab-right-title" style="left: 24px;">成交签约</div>
          </div>
        </div>
        <div class="box-item-chart">
          <div class="box-item-chart-title">
            <div class="box-item-chart-l">签约动态</div>
            <div class="box-item-chart-r">
              <ul>
                <li @click="GetChartData(1)" :style="chartlabelcolor.wcolor">本周</li>
                <li @click="GetChartData(2)" :style="chartlabelcolor.mcolor">本月</li>
                <li @click="GetChartData(3)" :style="chartlabelcolor.ycolor">全年</li>
              </ul>
            </div>
          </div>
          <div ref='khzl_chart_id' style="width: 100%; height: 200px;">

          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">合同总览</div>
      <div class="box-item">
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #25A056 0%, #36CB9E 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">正常进行中</div>
          <div class="box-item-card-value" v-html="leaseContractOverViewVO.normalInProgress"></div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #AC4AF9 0%, #D57BFF 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">逾期待处理</div>
          <div class="box-item-card-value" v-html="leaseContractOverViewVO.lateWaitProcessed"></div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #AC4AF9 0%, #D57BFF 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">逾期锁车</div>
          <div class="box-item-card-value" v-html="leaseContractOverViewVO.lateLockVehicle"></div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #C79659 0%, #E8B16E 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">退车完结</div>
          <div class="box-item-card-value" v-html="leaseContractOverViewVO.backFinish"></div>
        </div>
        <div class="box-item-rate">
          <el-progress type="dashboard" :percentage="leaseContractOverViewVO.returnRate" :color="leaseContractOverViewVO_color"
            ref="leaseContractOverViewVO_percentage_id"></el-progress>
          <div class="box-item-rate-title" style="left: 129px;">回款率</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">
        当月合同收付款总览
      <div style="font-size: 14px;display: inline-block;margin-left: 20px;">
        <span>选择月份</span>
        <el-date-picker v-model="searchdata.years" type="month" placeholder="" value-format="yyyy-MM"></el-date-picker>
      </div>
      </div>
      <div class="box-item" style="justify-content: flex-start;">
        <div class="box-item-col"
        style="margin-right: 28px;width: calc(calc(100% / 3) - 50px);margin-bottom: unset;">
          <div class="box-item-label">
            <div class="box-item-label-left">本月新增合同</div>
            <div class="box-item-label-right" v-html="receivingOverViewVO.newContract"></div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #e4daec;color: #7F40B1;">本月应收款（元）</div>
            <div class="box-item-label-right" style="color: #7F40B1;" v-html="receivingOverViewVO.accountsReceivable"></div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #f7e4ce;color: #F08D19;">本月退车应付（预计）</div>
            <div class="box-item-label-right" style="color: #F08D19;" v-html="receivingOverViewVO.dealWith"></div>
          </div>
        </div>
        <div class="box-item-col"
        style="margin-right: 28px;width: calc(calc(100% / 3) - 50px);margin-bottom: unset;">
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #cfe0f7;color: #1B6AD2;">本月已收款（元）</div>
            <div class="box-item-label-right" style="color: #1B6AD2;" v-html="receivingOverViewVO.collection"></div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #ece2d6;color: #B27427;">本月退车已付（元）</div>
            <div class="box-item-label-right" style="color: #B27427;" v-html="receivingOverViewVO.paid"></div>
          </div>
        </div>
        <div class="box-item-col" style="margin-bottom: unset;">
          <div class="box-item-barchart" ref='sfkzl_chart_id'>

          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">通知提醒</div>
      <div class="box-item">
        <div class="box-item-col">
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-193@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.yearlyCheck"></div>
            <div class="box-item-Frame-title">年检到期</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-204@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.paymentContract"></div>
            <div class="box-item-Frame-title">即将交租合同</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-207@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.reminderViolation"></div>
            <div class="box-item-Frame-title">违章提醒</div>
          </div>
        </div>
        <div class="box-item-col">
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-192@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.payInsurance"></div>
            <div class="box-item-Frame-title">交强险到期</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-205@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.expirationContract"></div>
            <div class="box-item-Frame-title">即将到期合同</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-208@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.maintenanceReminder"></div>
            <div class="box-item-Frame-title">报障/维修提醒</div>
          </div>
        </div>
        <div class="box-item-col">
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-194@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.businessRisks"></div>
            <div class="box-item-Frame-title">商业险到期</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-206@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.pendingContracts"></div>
            <div class="box-item-Frame-title">逾期待处理合同</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-209@1x.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.caseEmergency"></div>
            <div class="box-item-Frame-title">事故/出险提醒</div>
          </div>
        </div>
        <div class="box-item-col">
          <div class="box-item-rate" style="padding-left: unset;width: 172px;">
            <el-progress type="dashboard" :percentage="messageOverViewVO.handlingRate" :color="messageOverViewVO_color"
              ref="messageOverViewVO_percentage_id"></el-progress>
            <div class="box-item-rate-title" style="left: 15px;">违章处理率</div>
          </div>
          <div class="box-item-Frame">
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-209@1x-1.png">
            </div>
            <div class="box-item-Frame-value" v-html="messageOverViewVO.reminderMaintenance"></div>
            <div class="box-item-Frame-title">保养提醒</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import echarts from 'echarts'
  import company from "@/components/aacommon/getEnterpriseBox.vue"
  import {
    formatJE,
    formatJE2,
    getCookie,
    openNewTab,
    convertObject,formatDate
  } from '../../public.js'
  export default {
    name: 'mainWorkDesk',
    components:{
      company
    },
    data() {
      return {
        searchdata:{
          "enterpriseId":getCookie("UserEnterpriseId"),
          "years": formatDate(new Date(),'yyyy-MM'),
           "type":"1"
        },
        loading: false,
        initPageUrl: '/vehicle-service/homePage/home',
        GetChartDataUrl: '/vehicle-service/homePage/signDynamic?type=',
        searchVal: '',
        "customerOverViewVO": {
          "customers": 0,
          "overdueCustomer": 0,
          "rentCustomer": 0,
          "toFollowUp": 0,
          "total": 0,
          "turnover": 0,
          "turnoverRatio": 0
        },
        "leaseContractOverViewVO": {
          "backFinish": 0,
          "lateLockVehicle": 0,
          "lateWaitProcessed": 0,
          "normalInProgress": 0,
          "returnRate": 0,
          "totalMoney": 0,
          "unCollectionMoney": 0
        },
        leaseContractOverViewVO_color: '#FFA030',
        "messageOverViewVO": {
          "businessRisks": 0,
          "caseEmergency": 0,
          "expirationContract": 0,
          "handlingRate": 0,
          "maintenanceReminder": 0,
          "payInsurance": 0,
          "paymentContract": 0,
          "pendingContracts": 0,
          "reminderMaintenance": 0,
          "reminderViolation": 0,
          "totalViolation": 0,
          "yearlyCheck": 0
        },
        messageOverViewVO_color: "#F56C6C",
        "receivingOverViewVO": {
          "accountsReceivable": 0,
          "collection": 0,
          "dealWith": 0,
          "newContract": 0,
          "paid": 0
        },
        "vehicleOverViewVO": {
          "maintenanceInVehicle": 0,
          "rentVehicle": 0,
          "spareVehicle": 0,
          "unRentVehicle": 0,
          vehicleUtilization:0
        },
        vehicleOverViewVO_color: '#3EB9FF',
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        chartlabelcolor:{
          wcolor:'color:#368CFE',mcolor:'',ycolor:''
        }
      }
    },
    methods: {
      search() {
        let searchVal = this.searchVal.replace(/\s/gm, '')
        if (searchVal) {
          // this.$parent.$parent.$parent.$parent.addTable({url:''})
          openNewTab(this, '收租台账', '/rentParameter', {
            vehicleNo: this.searchVal
          })
        }
      },
      jumptohtdj() {
        openNewTab(this, '合同登记', '/contractRegistration')
      },
      jumptosztz() {
        openNewTab(this, '收租台账', '/rentParameter')
      },
      initPage() {
        this.loading = true
        axios({
            method: "post",
            url: this.initPageUrl,
            headers: this.headers,
            data: this.searchdata,
          })
          .then((result) => {
            // console.log(result.data);
            this.loading = false
            if (result.data.status == 0) {
                setTimeout(() => {
            window.onload()
          }, 10)
              this.vehicleOverViewVO = result.data.data.vehicleOverViewVO;
              this.leaseContractOverViewVO = result.data.data.leaseContractOverViewVO;
              this.messageOverViewVO = result.data.data.messageOverViewVO;
              this.receivingOverViewVO = result.data.data.receivingOverViewVO;
              this.customerOverViewVO = result.data.data.customerOverViewVO;
              this.InitYinFuChart();

              let vehicleOverViewVO = this.vehicleOverViewVO;
              for (let pname in vehicleOverViewVO) {
                if (typeof vehicleOverViewVO[pname] == 'number' && pname != "percentage"&&pname!="vehicleUtilization") {
                  vehicleOverViewVO[pname] = formatJE2(vehicleOverViewVO[pname]);
                }
              }
              let receivingOverViewVO = this.receivingOverViewVO;
              for (let pname in receivingOverViewVO) {
                if (typeof receivingOverViewVO[pname] == 'number' && pname != "returnRate"&&pname!="newContract") {
                  receivingOverViewVO[pname] = formatJE(receivingOverViewVO[pname]);
                }
              }
              let messageOverViewVO = this.messageOverViewVO;
              for (let pname in messageOverViewVO) {
                if (messageOverViewVO[pname] == '暂无数据') {
                  messageOverViewVO[pname] = '<span style="font-size:14px">暂无数据</span>'
                }
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
            //console.error(err);
            this.loading = false
            this.$message({
              message: err.message,
              center: true,
              type: "error",
            });
          });
      },
      GetChartData(type) {
        this.searchdata.type=type
        if(type==1){
          this.chartlabelcolor.wcolor='color:#368CFE'
          this.chartlabelcolor.mcolor=''
          this.chartlabelcolor.ycolor=''
        }
        else if(type==2){
         this.chartlabelcolor.wcolor=''
         this.chartlabelcolor.mcolor='color:#368CFE'
         this.chartlabelcolor.ycolor=''
        }
        else{
          this.chartlabelcolor.wcolor=''
          this.chartlabelcolor.mcolor=''
          this.chartlabelcolor.ycolor='color:#368CFE'
        }
        axios({
            method: "post",
            url: this.GetChartDataUrl + type,
            headers: this.headers,
            data: this.searchdata,
          })
          .then((result) => {
            //console.log(result.data);
            this.loading = false
            if (result.data.status == 0) {
                setTimeout(() => {
            window.onload()
          }, 10)
              this.InitQianYueChart(result.data.data)
            } else {
              this.$message({
                message: res.data.message,
                center: true,
                type: "error",
              });
            }
          })
          .catch((err) => {
            //console.error(err);
            this.loading = false
            this.$message({
              message: '获取签约动态数据失败！',
              center: true,
              type: "error",
            });
          });
      },
      InitQianYueChart(option) {
        //客户总览折线图
        let khzl_chart = echarts.init(this.$refs.khzl_chart_id)
        let xAxis_data = []
        let series_data = []
        for (let item of option) {
          xAxis_data.push(item.day.replace(/-/gm, '/'))
          series_data.push(item.total)
        }
        option = {
          grid: {
            left: '8%',
            right: '10%',
            bottom: '10%',
            top: '5%',
            width:'90%',
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: xAxis_data,
          },
          yAxis: {
            type: 'value',minInterval:1
          },
          series: [{
            name:'总数',
            data: series_data,
            type: 'line',
            color: ['#FFA030']
          }]
        };
        khzl_chart.setOption(option);
      },
      InitYinFuChart(){
        //收付款总览图表
        let sfkzl_chart = echarts.init(this.$refs.sfkzl_chart_id)
        let xAxis_data=['应收款','已收款','预计应付','实际已付']
        let series_data=[this.receivingOverViewVO.accountsReceivable,
               this.receivingOverViewVO.collection,
               this.receivingOverViewVO.dealWith,
               this.receivingOverViewVO.paid]
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
         grid: {
           left: '20%',
           right: '10%',
           bottom: '10%',
           top: '5%',
           width:'78%',
            height:'250px'
         },
          xAxis: [{
            type: 'category',
            data: xAxis_data,
            minInterval:1
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '金额（元）',
            type: 'bar',
            barWidth: '30%',
            data: series_data}]
        };
        sfkzl_chart.setOption(option);
      }
    },
    mounted() {
      let cheliangzonglan_percentage = this.$refs.vehicleOverViewVO_percentage_id.$el.children[1];
      cheliangzonglan_percentage.style.fontSize = '32px'
      cheliangzonglan_percentage.style.fontFamily = 'fzyaoti'

      let hetongzonglan_percentage = this.$refs.leaseContractOverViewVO_percentage_id.$el.children[1];
      hetongzonglan_percentage.style.fontSize = '32px'
      hetongzonglan_percentage.style.fontFamily = 'fzyaoti'

      let tongzhitixing_percentage = this.$refs.messageOverViewVO_percentage_id.$el.children[1];
      tongzhitixing_percentage.style.fontSize = '32px'
      tongzhitixing_percentage.style.fontFamily = 'fzyaoti'

      this.initPage();
      this.GetChartData(1);
      openNewTab(this,'总览','/mainWorkDesk')
    },
    watch:{
      searchdata:{
        handler(){
          this.initPage()
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

  .box-title {
    color: #333333;
    font-family: Microsoft YaHei;
    font-size: 20px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    margin-bottom: 35px;
    margin-left: 9px;
  }

  .box:first-child {
    margin-top: unset !important;
  }

  .box-item {
    display: flex;
    justify-content: space-between;
  }

  .box-item-col {
    width: calc(calc(100% - 134px) / 5);
    display: inline;
    margin-bottom: 49px;
  }

  .box-item-col:first-child {
    margin-left: 19px;
  }

  .box-item-card {
    width: calc(calc(100% - 134px) / 5);
    height: 129px;
    margin-left: 14px;
    position: relative;
    display: inline-block;
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

  .box-item-rate {
    width: calc(calc(100% - 134px) / 5);
    height: 120px;
    padding-left: 50px;
    position: relative;
    text-align: center;
  }

  .box-item-rate-title {
    color: #666666;
    font-family: Microsoft YaHei;
    font-size: 14px;
    line-height: normal;
    letter-spacing: 0.2px;
    margin-top: -20px;
  }

  .box-item-Frame {
    height: 72px;
    width: 170px;
    margin-bottom: 48px;
    position: relative;
  }

  .box-item-Frame:last-child {
    margin-bottom: unset;
  }

  .box-item-Frame-icon {
    width: 72px;
    height: 72px;
    position: absolute;
  }

  .box-item-Frame-value {
    position: absolute;
    top: 6px;
    left: 83px;
    color: #333333;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 26px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;

  }

  .box-item-Frame-title {
    position: absolute;
    top: 47px;
    left: 83px;
    color: #666666;
    font-family: Microsoft YaHei;
    font-weight: regular;
    font-size: 12px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;

  }

  .box-item-tab {
    height: 172px;
    width: calc(calc(100% - 60px) / 3);
    border: 1px #E5E5E5 solid;
    display: inline-block;
    margin-left: 16px;
    position: relative;
  }

  .box-item-tab :first-child {
    margin-left: unset;
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
    width: calc(100% / 2);
    display: inline-block;
  }

  .box-item-tab-left-value,
  .box-item-tab-right-value {
    top: 24px;
    left: 34px;
    color: #368CFE;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 24px;
    line-height: normal;
    letter-spacing: 0.1px;
    text-align: center;
  }

  .box-item-tab-right-value {
    color: #F56B2F;
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
    width: 111px;
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
    width: 342px;
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

  .box-item-barchart {
    width: 400px;
    height: 318px;
  }

  .searchin {
    width: 540px;
    margin-right: 10px;
  }

  .searchbtn {
    width: 80px !important;
    margin-right: 32px;
  }

  .qybtn,
  .jsbtn {
    border: none;
    width: 80px !important;
    border-radius: 50px !important;
    background: linear-gradient(180deg, #7DB5FF 0%, #166DE1 100%) !important;
  }

  .jsbtn {
    background: linear-gradient(180deg, #48E3DC 0%, #009F98 100%) !important;
  }

  .qybtn img,
  .jsbtn img {
    vertical-align: text-bottom;
  }

  .divider-raw {
    width: 90%;
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

  .box-item-chart {
    width: 532px;
    margin-left: 46px;
    margin-top: -65px;
    color: #333333;
    font-size: 14px;
    line-height: normal;
    letter-spacing: 0.2px;
  }

  .box-item-chart-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    width: calc(100% - 30px);
  }
.box-item-chart-l{
  margin-left: 10px;
}
  .box-item-chart-r {
    width: 110px;
  }

  .box-item-chart-r ul {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
  }

  .box-item-chart-r ul li {
    list-style: none;
    display: inline-block;
    cursor: pointer;
  }
.box-item-chart-r ul li:hover{
  color: #368CFE;
}
  .box-item-chart-r>div {
    display: inline-block;
    width: 200px;
  }

  .el-range-editor--mini.el-input__inner {
    height: 28px;
    width: 200px!important;
  }
</style>
