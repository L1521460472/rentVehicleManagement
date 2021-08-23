<template>
  <div style="height: calc(100% - 66px);overflow-y: auto;overflow-x: hidden;padding-right: 3px;">
      <div class="panel" style="width: 100%;margin-bottom: 20px;">
        <div class="panel-title" style="padding: 19px 21px;justify-content: flex-start;">
          接口统计
        </div>
        <div style="margin-left: 42px;margin-top: 10px;">
          选择统计月份
           <el-date-picker :clearable="false"
           v-model="yearAndMonth" type="month" placeholder="" value-format="yyyy-MM"></el-date-picker>
        </div>
        <div style="margin-left: 42px;margin-top: 10px;">总充值统计</div>
        <div class="panel-content">
          <div ref="echart_id" style="width: calc(100% - 1px);height: 350px;overflow: hidden;display: flex;justify-content: center;align-items: center;"></div>
        </div>
      </div>
      <div class="panel" style="width: 100%;margin-bottom: 20px;">
        <div class="panel-title" style="padding: 19px 21px;justify-content: flex-start;">
          企业接口使用量（月度）
          <!-- <getEnterpriseBox @onchanged="companychange" type="2" v-model="enterpriseId" style="margin-left: 20px;" :clearable="false"></getEnterpriseBox> -->
          <el-select class="getEnterpriseBox" clearable v-model="enterpriseId" size="small" placeholder @change="companychange">
            <el-option
              v-for="item in enterpriseidOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <hr class="panel-divider">
        <div class="panel-content">
          <el-table :data="data3" border class="table" stripe size="small"
          :header-cell-style="{ background: '#F5F7FA', color: '#333333' }">
            <el-table-column prop="totalRechargeMoney" label="总充值金额"></el-table-column>
            <el-table-column prop="violationTotal" label="违章查询-总条数"></el-table-column>
            <el-table-column prop="violationFree" label="违章查询-免费条数"></el-table-column>
            <el-table-column prop="violationPay" label="违章查询-付费条数"></el-table-column>
            <el-table-column prop="messagesPayRent" label="短信-合同交租条数"></el-table-column>
            <el-table-column prop="messagesExpire" label="短信-合同到期条数"></el-table-column>
            <el-table-column prop="violationsNewAdd" label="违章通知-当月新增次数"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel-group">
        <div class="panel panelLeft" style="margin-right:16px;">
          <div class="panel-title" style="padding: 19px 21px;">
            总接口使用量（月度）
          </div>
          <hr class="panel-divider">
          <div class="panel-content">
            <div class="panel-tab-cantianer">
              <div class="panel-tab" style="margin-top: 20px;">
                <div class="panel-tab-text">总充值金额</div>
                <div class="panel-tab-num">{{data2.totalRechargeMoney}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">短信-合同交租条数</div>
                <div class="panel-tab-num">{{data2.messagesPayRent}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">违章查询-免费条数</div>
                <div class="panel-tab-num">{{data2.violationFree}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">短信-合同到期条数</div>
                <div class="panel-tab-num">{{data2.messagesExpire}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">违章查询-付费条数</div>
                <div class="panel-tab-num">{{data2.violationPay}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">短信-注册验证条数</div>
                <div class="panel-tab-num">{{data2.messagesRegister}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">违章通知-当月新增次数</div>
                <div class="panel-tab-num">{{data2.violationsNewAdd}}</div>
              </div>
              <div class="panel-tab"  style="margin-top: 20px;">
                <div class="panel-tab-text">短信-找回密码条数</div>
                <div class="panel-tab-num">{{data2.messagesFindPwd}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">违章查询-总条数</div>
                <div class="panel-tab-num">{{data2.violationTotal}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">短信-发送总条数</div>
                <div class="panel-tab-num">{{data2.messages}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">
            接口排行榜
            <!-- <makeSelect v-model="type" :options="[{name:'总充值金额',value:0},{name:'违章查询总条数',value:1},{name:'违章查询-免费条数',value:2},{name:'违章查询-付费条数',value:3},{name:'短信-合同交租条数',value:4},{name:'短信-合同到期条数',value:5},{name:'违章通知-当月新增条数',value:6}]" :clearable="false"></makeSelect> -->
          </div>
          <hr class="panel-divider">
          <div class="panel-content-box">
            <div class="panel-content-left">
              <el-button class="selectBtn" @click="selectBtnAction(item.value)" v-for="item in options" :key="item.value" type="primary">{{item.name}}</el-button>
            </div>
            <div class="panel-content-right">
              <div class="panel-content">
                <div class="panel-row">
                  <div class="panel-row-index">排名</div>
                  <div class="panel-row-company">公司名称</div>
                  <div class="panel-row-num">数量</div>
                </div>
                <div class="panel-row" v-for="(item,index) in data1" :key="item.companyId">
                  <div class="panel-row-index">{{item.rankIndex}}</div>
                  <div class="panel-row-company">{{item.companyName}}</div>
                  <div class="panel-row-num" v-if="item.numbers">
                    <div class="panel-row-num-index">{{item.numbers}}</div>
                    <div class="panel-row-num-proccess">
                      <el-progress :percentage="item.numbers2" :show-text="false" :stroke-width="8"></el-progress>
                    </div>
                  </div>
                  <div class="panel-row-num" v-if="item.rechargeMoney">
                    <div class="panel-row-num-index">{{item.rechargeMoney}}</div>
                    <div class="panel-row-num-proccess">
                      <el-progress :percentage="item.rechargeMoney2" :show-text="false" :stroke-width="8" :color="item.color"></el-progress>
                    </div>
                  </div>
                </div>
                <div v-if="data1.length==0" style="padding-top: 20px; text-align: center; color: #a5a5a5;">
                  暂无数据
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import axios from 'axios'
  export default{
    name:'totalRechargeStatistics',
    data(){
      return {
        yearAndMonth2:"",
        yearAndMonth:"",
        // enterpriseId: this.$getCookie("UserEnterpriseId"),
        enterpriseId: null,
        type:0,
        data1:[],
        data2:{
          "messages": 0,
          "messagesExpire": 0,
          "messagesFindPwd": 0,
          "messagesPayRent": 0,
          "messagesRegister": 0,
          "totalRechargeMoney": "0.00",
          "violationFree": 0,
          "violationPay": 0,
          "violationTotal": 0,
          "violationsNewAdd": 0
        },
        data3:[],
        chartoption:{
            color:['#4ba9ff','#25cc7c'],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:[],
                axisLine:{
                     lineStyle:{
                         color:"gray"
                     }
                },
                axisTick:{
                    lineStyle:{
                        color:"gray",
                    }
                }
            },
            yAxis: {
                axisLine:{
                    show:false
                },
                type: 'value',
                splitLine:{
                    lineStyle:{
                        type:"dotted"
                    },
                },
                axisTick:{
                    lineStyle:{
                        color:"#cccccc",
                        type:"dotted"
                    }
                }
            },

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                backgroundColor:"#ffffffd0",
                textStyle:{
                    color:"#2c3e50"
                },
                borderColor:"#cccccc",
                borderWidth:1
            },
            legend: {
                data: ['金额', '笔数'],
                bottom:8,
                icon:'rect',

            },
            series: [{
                name:'金额',
                data: [],
                type: 'line',
                smooth: true,
                areaStyle: {
                    color:"#c9e5ff"
                },
                lineStyle:{
                    color:"#4ba9ff"
                },
                label:{
                    normal:{
                        backgroundColor: 'red',
                    }
                },
                showSymbol:false,
                symbolSize:2,
                symbol:"circle"
            },{
                name:'笔数',
                data: [],
                type: 'line',
                smooth: true,
                areaStyle: {
                    color:"#98ded8"
                },
                lineStyle:{
                    color:"#25cc7c"
                },
                showSymbol:false,
                symbolSize:2,
                symbol:"circle"
            }]
        },
        xAxis:[],
        seriesjine:[],
        seriesbishu:[],
        echart:null,
        enterpriseidOptions:[],
        options:[{name:'总充值金额',value:0},{name:'违章查询总条数',value:1},{name:'违章查询-免费条数',value:2},{name:'违章查询-付费条数',value:3},{name:'短信-合同交租条数',value:4},{name:'短信-合同到期条数',value:5},{name:'违章通知-当月新增条数',value:6}]
      }
    },
    methods:{
      // 获取企业列表
      getEnterpriseidList(){
        axios({ method: "get", url: "/vehicle-service/comboBoxController/getEnterpriseBox", headers:this.$getHeaders(this),params:{flag:2}})
          .then((result) => {
            result.data.data.unshift({id:null,name:'全部'})
            this.enterpriseidOptions = result.data.data;
            // this.enterpriseid=this.value?Number(this.value):""
          })
          .catch((err) => {
            console.error(err);
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      },
      // 点击排行榜按钮
      selectBtnAction(val){
        this.type = val
      },
      companychange(val){
        this.enterpriseId=val
        this.getdata2(this.enterpriseId)
      },
      initChart(){
        this.xAxis=[]
        this.seriesjine=[]
        this.seriesbishu=[]
        this.$axios.post("/platform-base-service/rechargeRecord/totalRechargeStatistics",{month:this.yearAndMonth},{headers:this.$getHeaders(this)})
        .then((res)=>{
          let data=res.data
          if(data.data){

            data.data.map((item)=>{
              this.xAxis.push(item.payTime)
              this.seriesjine.push(item.money)
              this.seriesbishu.push(item.count)
            })
            this.chartoption.xAxis.data=this.xAxis
            this.chartoption.series[0].data=this.seriesjine
            this.chartoption.series[1].data=this.seriesbishu
            this.echart=echarts.init(this.$refs.echart_id)
            this.echart.setOption(this.chartoption);
          }
          else{
            this.$message.info("总充值统计暂无数据")
          }
        })
        .catch((err)=>{
          this.$message.error(err.message)
        })
      },
      getdata1(){
        let url="/vehicle-service/violationBatch/ranking"
        if(this.type==0){
          url="/platform-base-service/rechargeRecord/rechargeMoneyRanking"
        }
        let params={
          "month": this.yearAndMonth,
          "rankType": this.type
        }
        this.$axios.post(url,params,{headers:this.$getHeaders(this)})
        .then((res)=>{
          let data=res.data
          this.data1=data.data
          if(this.data1&&this.data1.length>0){
            this.data1.map((item)=>{
              if(item.rechargeMoney){
                item.rechargeMoney2=item.rechargeMoney
                if(item.rechargeMoney>100){
                  item.rechargeMoney2=100
                  item.color="#f04d37"
                }
                else if(item.rechargeMoney<100&&item.rechargeMoney>=70){
                  item.color="#fb9333"
                }
                else if(item.rechargeMoney<70&&item.rechargeMoney>=40){
                  item.color="#37cff0"
                }
                else{
                  item.color="#409EFF"
                }
              }
              else{
                item.numbers2=item.numbers
                if(item.numbers>100){
                  item.numbers2=100
                  item.color="#f04d37"
                }
                else if(item.numbers<100&&item.numbers>=70){
                  item.color="#fb9333"
                }
                else if(item.numbers<70&&item.numbers>=40){
                  item.color="#37cff0"
                }
                else{
                  item.color="#409EFF"
                }
              }
            })
          }
          if(this.data1==null)
          {
            this.data1=[]
          }
        })
        .catch((err)=>{
          this.$message.error(err.message)
        })
      },
      getdata2(enterpriseId){
        let params={
          "enterpriseId": enterpriseId,
          "month": this.yearAndMonth
        }
        this.$axios.post("/vehicle-service/violationBatch/generalStatistics",params,{headers:this.$getHeaders(this)})
        .then((res)=>{
          let data=res.data
          if(data.data){
            data.data.totalRechargeMoney=this.$formatJE(data.data.totalRechargeMoney)
          }
          if(enterpriseId || enterpriseId===null){
            this.data3=[data.data]
          }else{
            this.data2=data.data
          }
        })
        .catch((err)=>{
          this.$message.error(err.message)
        })
      }
    },
    mounted(){
      this.yearAndMonth=this.$formatDate(new Date(),'yyyy-MM')
      this.getEnterpriseidList()
      setTimeout(() => {
            window.onload()
          }, 10)
    },
    computed:{
    },
    watch:{
      type(){
        this.getdata1()
      },
      yearAndMonth(){
        this.initChart()
        this.getdata1()
        this.getdata2()
        this.getdata2(this.enterpriseId)
      }
    }
  }
</script>

<style scoped>
 .panel-group {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    height: calc(100% - 76px);
    min-height: calc(100% - 76px);
  }
  .panel {
    width: 70%;
    border: 1px solid #E5E5E5;
    display: inline-block;
    font-size: 14px;
  }
  .panelLeft{
    width: 30%;
  }
  .panel-title {
    padding: 19px 21px;
    color: #333333;
    font-family: Microsoft YaHei;
    font-size: 20px;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  .panel-divider {
    width: 100%;
    margin: auto;
    background: #E5E5E5;
    border: none;
    border-top: 1px #E5E5E5 solid;
  }
  .panel-content-box{
    display: flex;
  }
  .panel-content-left{
    width: 180px;
    border-right: 1px solid #E5E5E5;
  }
  .panel-content-right{
    /* flex: 1; */
    width: calc(100% - 200px);
    margin-left: 10px;
  }
  .panel-content {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .selectBtn{
    width: 150px;
    height: 36px;
    /* line-height: 40px; */
    margin:  20px 15px 0;
  }

  .panel-row{
    padding: 8px 20px;
    border-bottom: 1px #E5E5E5 solid;
    display: flex;
    height: 32px;
    line-height: 32px;
  }
  .panel-row-index{
    width: 40px;
  }
  .panel-row-company{
    width: 230px;
    max-width: 230px;
  }
  .panel-row-num{
    flex-grow: 1;
    display: flex;
  }
  .panel-row-num-index{
    width: 32px;
  }
  .panel-row-num-proccess{
    padding-top: 13px;
    flex-grow: 1;
    margin-left: 50px;
  }
  .panel-tab-cantianer{
    width: 100%;
  }
  .panel-tab{
    height: 68px;
    /* width: 140px; */
    width: calc(calc(100% / 2) - 35px);
    display: inline-block;
    margin: 10px 20px;
    border: 1px solid #e5e5e5;
    padding: 9px 6px;
    box-sizing: border-box;
    line-height: 25px;
  }
  .panel-tab:nth-of-type(2n){
    margin-left: 0;
  }
  .panel-tab-num{
    font-size: 16px;
    font-weight: 600;
  }
  .panel-tab-text{
    font-size: 12px;
  }
</style>
