<template>
  <div>
    <div class="box">
      <el-input class="searchin" size="small" placeholder="请输入车牌号 搜索相关合同" v-model="searchVal"
        clearable>
      </el-input>
      <el-button class="searchbtn" type="primary" size="small">查询</el-button>
      <el-button class="qybtn" type="primary" size="small">
        <img src="../../assets/workdesk/Frame-18.png" />
        签约
      </el-button>
      <el-button class="jsbtn" type="primary" size="small">
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
          <div class="box-item-card-value">{{cheliangzonglan.zaizucheliang}}</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #01AACD 0%, #44C3EA 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-3.png"></div>
          <div class="box-item-card-title">待租车辆</div>
          <div class="box-item-card-value">{{cheliangzonglan.daizucheliang}}</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #E3612A 0%, #FB986E 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-1.png"></div>
          <div class="box-item-card-title">备用车辆</div>
          <div class="box-item-card-value">{{cheliangzonglan.beiyongcheliang}}</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #FF4444 0%, #F56C6C 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-2.png"></div>
          <div class="box-item-card-title">维修中车辆</div>
          <div class="box-item-card-value">{{cheliangzonglan.weixiuzhongcheliang}}</div>
        </div>
        <div class="box-item-rate">
          <el-progress type="dashboard" :percentage="cheliangzonglan.percentage" :color="cheliangzonglan.color" id="cheliangzonglan_percentage"></el-progress>
          <div class="box-item-rate-title">车辆利用率</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">客户总览</div>
      <div class="box-item" style="justify-content: flex-start;">
        <div class="box-item-tab">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame-11.png"></div>
            <div class="box-item-tab-top-value">全部客户：1,256</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left">
            <div class="box-item-tab-left-value">856</div>
            <div class="box-item-tab-left-title">在租客户</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right">
            <div class="box-item-tab-right-value">400</div>
            <div class="box-item-tab-right-title">逾期客户</div>
          </div>
        </div>
        <div class="box-item-tab" style="width: 294px;">
          <div class="box-item-tab-top">
            <div class="box-item-tab-icon"><img src="../../assets/workdesk/Frame-10.png"></div>
            <div class="box-item-tab-top-value">意向订单成交率（本月）: 75%</div>
          </div>
          <hr class="divider-raw">
          <div class="box-item-tab-left" style="width: calc(calc(100% - 10px) / 3);">
            <div class="box-item-tab-left-value" style="color: #333333;">95</div>
            <div class="box-item-tab-left-title">新增</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 10px) / 3);">
            <div class="box-item-tab-right-value" style="color: #333333;">68</div>
            <div class="box-item-tab-right-title">待跟进</div>
          </div>
          <hr class="divider-col">
          <div class="box-item-tab-right" style="width: calc(calc(100% - 10px) / 3);">
            <div class="box-item-tab-right-value" style="color: #333333;">23</div>
            <div class="box-item-tab-right-title" style="left: 24px;">成交签约</div>
          </div>
        </div>
        <div>
          <div id='khzl_chart' style="width: 400px; margin-left: 46px; height: 200px;"></div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">合同总览</div>
      <div class="box-item">
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #25A056 0%, #36CB9E 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">正常进行中</div>
          <div class="box-item-card-value">{{hetongzonglan.zhengzaijinxing}}</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #AC4AF9 0%, #D57BFF 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">逾期待处理</div>
          <div class="box-item-card-value">{{hetongzonglan.yuqidaichuli}}</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #AC4AF9 0%, #D57BFF 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">逾期锁车</div>
          <div class="box-item-card-value">{{hetongzonglan.yuqisuoche}}</div>
        </div>
        <div class="box-item-card" style="background: linear-gradient(129.09deg, #C79659 0%, #E8B16E 100%);">
          <div class="box-item-card-icon"><img src="../../assets/workdesk/Frame-12.png"></div>
          <div class="box-item-card-title">退车完结</div>
          <div class="box-item-card-value">{{hetongzonglan.tuchewangjie}}</div>
        </div>
        <div class="box-item-rate">
          <el-progress type="dashboard" :percentage="hetongzonglan.percentage" :color="hetongzonglan.color" id="hetongzonglan_percentage"></el-progress>
          <div class="box-item-rate-title" style="left: 129px;">回款率</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">当月收付款总览</div>
      <div class="box-item" style="justify-content: flex-start;">
        <div class="box-item-col" style="margin-right: 28px;width: 342px;margin-bottom: unset;">
          <div class="box-item-label">
            <div class="box-item-label-left">本月新增合同</div>
            <div class="box-item-label-right">15</div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #e4daec;color: #7F40B1;">本月应收款（元）</div>
            <div class="box-item-label-right" style="color: #7F40B1;">251,246.00</div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #f7e4ce;color: #F08D19;">本月退车应付（预计）</div>
            <div class="box-item-label-right" style="color: #F08D19;">125,413.00</div>
          </div>
        </div>
        <div class="box-item-col" style="margin-right: 28px;width: 342px;margin-bottom: unset;">
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #cfe0f7;color: #1B6AD2;">本月已收款（元）</div>
            <div class="box-item-label-right" style="color: #1B6AD2;">5,468.00</div>
          </div>
          <div class="box-item-label">
            <div class="box-item-label-left" style="background: #ece2d6;color: #B27427;">本月退车已付（元）</div>
            <div class="box-item-label-right" style="color: #B27427;">14,125.00</div>
          </div>
        </div>
        <div class="box-item-col" style="margin-bottom: 63px;">
          <div class="box-item-barchart" id='sfkzl_chart'>

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
            <div class="box-item-Frame-value">14</div>
            <div class="box-item-Frame-title">年检到期</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-204@1x.png">
            </div>
            <div class="box-item-Frame-value">14</div>
            <div class="box-item-Frame-title">即将交租合同</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-207@1x.png">
            </div>
            <div class="box-item-Frame-value">7</div>
            <div class="box-item-Frame-title">违章提醒</div>
          </div>
        </div>
        <div class="box-item-col">
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-192@1x.png">
            </div>
            <div class="box-item-Frame-value">24</div>
            <div class="box-item-Frame-title">交强险到期</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-205@1x.png">
            </div>
            <div class="box-item-Frame-value">2</div>
            <div class="box-item-Frame-title">即将到期合同</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-208@1x.png">
            </div>
            <div class="box-item-Frame-value">4</div>
            <div class="box-item-Frame-title">报障/维修提醒</div>
          </div>
        </div>
        <div class="box-item-col">
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-194@1x.png">
            </div>
            <div class="box-item-Frame-value">24</div>
            <div class="box-item-Frame-title">商业险到期</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-206@1x.png">
            </div>
            <div class="box-item-Frame-value">20</div>
            <div class="box-item-Frame-title">逾期待处理合同</div>
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-209@1x.png">
            </div>
            <div class="box-item-Frame-value">12</div>
            <div class="box-item-Frame-title">事故/出险提醒</div>
          </div>
        </div>
        <div class="box-item-col">
          <div class="box-item-rate" style="padding-left: unset;width: 172px;">
            <el-progress type="dashboard" :percentage="tongzhitixing.percentage" :color="tongzhitixing.color" id="tongzhitixing_percentage"></el-progress>
            <div class="box-item-rate-title" style="left: 15px;">回款率</div>
          </div>
          <div class="box-item-Frame">
          </div>
          <div class="box-item-Frame">
            <div class="box-item-Frame-icon">
              <img src="../../assets/workdesk/Frame-209@1x-1.png">
            </div>
            <div class="box-item-Frame-value">12</div>
            <div class="box-item-Frame-title">事故/出险提醒</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {
    formatJE2
  } from '../../public.js'
  export default {
    name: 'businessWorkDesk',
    data() {
      return {
        searchVal: '',
        cheliangzonglan: {
          zaizucheliang: 256,
          daizucheliang: 1322,
          beiyongcheliang: 279,
          weixiuzhongcheliang: 38,
          percentage: 75,
          color: '#3EB9FF'
        },
        hetongzonglan: {
          zhengzaijinxing: 256,
          yuqidaichuli: 1322,
          yuqisuoche: 279,
          tuchewangjie: 38,
          percentage: 60,
          color: '#FFA030'
        },
        tongzhitixing: {
          percentage: 8.2,
          color: '#F56C6C'
        }
      }
    },
    mounted() {
      let cheliangzonglan_percentage = document.getElementById('cheliangzonglan_percentage').children[1];
      cheliangzonglan_percentage.style.fontSize = '32px'
      cheliangzonglan_percentage.style.fontFamily = 'fzyaoti'

      let hetongzonglan_percentage = document.getElementById('hetongzonglan_percentage').children[1];
      hetongzonglan_percentage.style.fontSize = '32px'
      hetongzonglan_percentage.style.fontFamily = 'fzyaoti'

      let tongzhitixing_percentage = document.getElementById('tongzhitixing_percentage').children[1];
      tongzhitixing_percentage.style.fontSize = '32px'
      tongzhitixing_percentage.style.fontFamily = 'fzyaoti'

      let cheliangzonglan = this.cheliangzonglan;
      for (let pname in cheliangzonglan) {
        if (typeof cheliangzonglan[pname] == 'number' && pname != "percentage") {
          cheliangzonglan[pname] = formatJE2(cheliangzonglan[pname]);
        }
      }
      let hetongzonglan = this.hetongzonglan;
      for (let pname in hetongzonglan) {
        if (typeof hetongzonglan[pname] == 'number' && pname != "percentage") {
          hetongzonglan[pname] = formatJE2(hetongzonglan[pname]);
        }
      }

      this.$nextTick(function() {
        //客户总览折线图
        let khzl_chart = echarts.init(document.getElementById('khzl_chart'))
        let option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        };
        khzl_chart.setOption(option);

        //收付款总览图表
        let sfkzl_chart = echarts.init(document.getElementById('sfkzl_chart'))
        let option2 = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }]
        };
        sfkzl_chart.setOption(option2);
      })
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
    width: 234px;
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
    width: 111px;
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
    height: 200px;
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
  .divider-raw{
    width: 90%;
    margin: auto;
    background: #E5E5E5;
    border: none;
    border-top: 1px #E5E5E5 solid;
  }
  .divider-col{
        position: absolute;
        margin: auto;
        top: 85px;
        width: 0px;
        height: 75px;
        border: none;
        display: inline-block;
        border-right: 1px #E5E5E5 solid;
  }
</style>
