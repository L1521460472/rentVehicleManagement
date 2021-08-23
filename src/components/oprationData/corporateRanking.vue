<template>
  <div style="height: calc(100% - 66px);overflow-y: auto;overflow-x: hidden;">
      <div class="panel" style="width: 100%;margin-bottom: 20px;">
        <div class="panel-title" style="padding: 19px 21px;justify-content: flex-start;">
          企业使用情况
          <!-- <getEnterpriseBox v-model="enterpriseId" type="2" style="margin-left: 20px;" :clearable="false"></getEnterpriseBox> -->
          <el-select style="margin-left: 20px;" class="getEnterpriseBox" clearable v-model="enterpriseId" size="small" placeholder >
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
            <el-table-column prop="balance" label="企业余额"></el-table-column>
            <el-table-column prop="dueDate" label="到期时间"></el-table-column>
            <el-table-column prop="openAccounts" label="可开账号数"></el-table-column>
            <el-table-column prop="accounts" label="账号数"></el-table-column>
            <el-table-column prop="carTypes" label="车型数"></el-table-column>
            <el-table-column prop="cars" label="车辆数"></el-table-column>
            <el-table-column prop="customers" label="客户数"></el-table-column>
            <el-table-column prop="contracts" label="合同数"></el-table-column>
            <el-table-column prop="logins" label="登录次数"></el-table-column>
            <el-table-column prop="apps" label="关联APP用户数"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel" style="width: 100%;margin-bottom: 20px;">
        <div class="panel-title" style="padding: 19px 21px;justify-content: flex-start;">
          页面访问统计
        </div>
        <div class="selectTime">
          <el-button-group>
            <el-button size="small" ref="buttonFocus" @click="btn(0)">今天</el-button>
            <el-button size="small" @click="btn(1)">昨天</el-button>
            <el-button size="small" @click="btn(2)">最近7日</el-button>
            <el-button size="small" @click="btn(3)">最近30天</el-button>
          </el-button-group>
          <el-date-picker v-model="selectTime" type="daterange" size="small" unlink-panels :clearable='false' range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
            @change="handleChange">
          </el-date-picker>
        </div>
        <hr class="panel-divider">
        <div class="panel-content">
          <el-table @sort-change="changeSort" :data="clickTableData" border class="table" stripe size="small"
          :header-cell-style="{ background: '#F5F7FA', color: '#333333' }">
            <el-table-column prop="menuName" label="菜单页面"></el-table-column>
            <el-table-column prop="clicks" sortable="custom" label="页面打开次数"></el-table-column>
          </el-table>
          <div class="footer_page">
            <el-pagination 
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange" 
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100, 200]" 
              :page-size="pageSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper" 
              :total="totalCount" >
            </el-pagination>
          </div>
        </div>

      </div>
      <div class="panel-group">
        <div class="panel panelLeft" style="margin-right:16px;">
          <div class="panel-title" style="padding: 19px 21px;">
            总使用情况
          </div>
          <hr class="panel-divider">
          <div class="panel-content">
            <div class="panel-tab-cantianer">
              <div class="panel-tab" style="margin-top: 20px;">
                <div class="panel-tab-text">公司总数量</div>
                <div class="panel-tab-num">{{data2.companys}}</div>
              </div>
              <div class="panel-tab"  style="margin-top: 20px;">
                <div class="panel-tab-text">车辆总数量</div>
                <div class="panel-tab-num">{{data2.cars}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">客户总数量</div>
                <div class="panel-tab-num">{{data2.customers}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">账号总数量</div>
                <div class="panel-tab-num">{{data2.accounts}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">合同总数量</div>
                <div class="panel-tab-num">{{data2.contracts}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">余额总金额</div>
                <div class="panel-tab-num">{{data2.balance}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">企业登录总次数</div>
                <div class="panel-tab-num">{{data2.logins}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">车型总数量</div>
                <div class="panel-tab-num">{{data2.carTypes}}</div>
              </div>
              <div class="panel-tab">
                <div class="panel-tab-text">APP用户总数量</div>
                <div class="panel-tab-num">{{data2.apps}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">
            使用排行榜
            <!-- <makeSelect v-model="type" :options="[{name:'账号总数',value:1},{name:'车型总数',value:2},{name:'车辆总数',value:3},{name:'客户数',value:8},{name:'合同总数',value:4},{name:'登录总次数',value:5},{name:'当前企业余额',value:6},{name:'关联App用户数',value:7}]" :clearable="false"></makeSelect> -->
          </div>
          <hr class="panel-divider">
          <div class="panel-content-box">
            <div class="panel-content-left">
              <el-button class="selectBtn" @click="selectCompany(item.value)" v-for="item in options" :key="item.value" type="primary">{{item.name}}</el-button>
            </div>
            <div class="panel-content-right">
              <div class="panel-content">
                <div class="panel-row">
                  <div class="panel-row-index">排名</div>
                  <div class="panel-row-company">公司名称</div>
                  <div class="panel-row-num">数量</div>
                </div>
                <div class="panel-row" v-for="(item,index) in data1" :key="item.enterpriseId">
                  <div class="panel-row-index">{{index+1}}</div>
                  <div class="panel-row-company">{{item.enterpriseName}}</div>
                  <div class="panel-row-num">
                    <div class="panel-row-num-index">{{item.num}}</div>
                    <div class="panel-row-num-proccess">
                      <el-progress :percentage="item.num2" :show-text="false" :stroke-width="8" :color="item.color"></el-progress>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name:'corporateRanking',
    data(){
      return {
        enterpriseId:null,
        total:0,
        type:1,
        data1:null,
        data2:{
            "accounts": 0,
            "apps": 0,
            "balance": "0.00",
            "carTypes": 0,
            "cars": 0,
            "companys": 0,
            "contracts": 0,
            "logins": 0,
            customers:0
          },
        data3:null,
        totalCount:0,
        currentPage:1,
        pageSize:10,
        order:'desc',//排序
        selectTime:[],
        clickTableData:[],//点击菜单数据
        enterpriseidOptions:[],
        options:[{name:'账号总数',value:1},{name:'车型总数',value:2},{name:'车辆总数',value:3},{name:'客户数',value:8},{name:'合同总数',value:4},{name:'登录总次数',value:5},{name:'当前企业余额',value:6},{name:'关联App用户数',value:7}]
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
      // 选择公司
      selectCompany(val){
        this.type = val
      },
      getdata3(){
        this.$axios.get("/vehicle-service/operationalData/corporateQuery",
        {params:{ enterpriseId :this.enterpriseId },headers:this.$getHeaders(this)})
          .then((res)=>{
            if(res.data.data&&res.data.data.openAccounts==0){ 
               res.data.data.openAccounts="无限制";
            }
            this.data3=[res.data.data]
          })
          .catch((err)=>{
            this.$message.error(err.message)
          })
      },
      getdata1(){
        this.$axios.get("/vehicle-service/operationalData/corporateRanking",{params:{ type:this.type},headers:this.$getHeaders(this)})
        .then((res)=>{
          let data=res.data
          this.data1=data.data
          this.data1.map((item)=>{
            item.num2=item.num
            if(item.num>100){
              item.num2=100
              item.color="#f04d37"
            }
            else if(item.num<100&&item.num>=70){
              item.color="#fb9333"
            }
            else if(item.num<70&&item.num>=40){
              item.color="#37cff0"
            }
            else{
              item.color="#409EFF"
            }
          })
        })
        .catch((err)=>{
          this.$message.error(err.message)
        })
      },
      getdata2(){
        this.$axios.get("/vehicle-service/operationalData/statistical",{headers:this.$getHeaders(this)})
        .then((res)=>{
          let data=res.data
          this.data2=data.data
          if(this.data2){
            this.data2.balance=this.$formatJE(this.data2.balance)
          }
        })
        .catch((err)=>{
          this.$message.error(err.message)
        })
      },
      changeSort(column, prop, order){
        console.log(column.order)
        if(column.order === 'descending'){
          this.order = 'desc'
        }else{
          this.order = 'asc'
        }
        this.getClickData()
        // console.log(column, prop, order)
      },
      // 获取点击统计表格数据
      getClickData(){
        let params ={
          currentPage: this.currentPage,
          endTime: this.selectTime.length <1 ?  null: this.selectTime[1],
          startTime: this.selectTime.length <1 ?  null: this.selectTime[0],
          order: this.order,
          pageSize: this.pageSize,
        }
        axios({
          method: "post",
          url: "/platform-base-service/userAccessMenu/accessStatistic",
          headers:this.$getHeaders(this),          
          data: params,
        })
          .then((result) => {
              setTimeout(() => {
            window.onload()
          }, 10)
            this.clickTableData = result.data.data.records;
            this.totalCount = result.data.data.total
          })
          .catch((err) => {
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      },
      // 按钮选择查询时间
      btn(index) {
        if (index == 0) {
          //今
          this.selectTime = []
          const end = new Date()
          const start = new Date()
          this.selectTime.push(this.dateToString(start))
          this.selectTime.push(this.dateToString(end))
          this.getClickData()
        } else if (index == 1) {
          //昨
          this.selectTime = []
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
          end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
          this.selectTime.push(this.dateToString(start))
          this.selectTime.push(this.dateToString(end))
          this.getClickData()
        } else if (index == 2) {
          //7天
          this.selectTime = []
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
          this.selectTime.push(this.dateToString(start))
          this.selectTime.push(this.dateToString(end))
          this.getClickData()
        } else if (index == 3) {
          //30天
          this.selectTime = []
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
          this.selectTime.push(this.dateToString(start))
          this.selectTime.push(this.dateToString(end))
          this.getClickData()
        }
      },
      // 选择查询时间段数据
      handleChange(){
        this.getClickData()
      },
      //每页多少条
      handleSizeChange(val) {
        this.pageSize = val;
        this.getClickData()
      },
      //选择页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getClickData()
      },
      dateToString(date) {
        //日期转字符串
        var year = date.getFullYear()
        var month = (date.getMonth() + 1).toString()
        var day = date.getDate().toString()
        if (month.length == 1) {
          month = '0' + month
        }
        if (day.length == 1) {
          day = '0' + day
        }
        var dateTime = year + '-' + month + '-' + day
        return dateTime
      },
    },
    mounted(){
      this.btn(0)
      this.$refs.buttonFocus.$el.focus()
      this.getdata1()
      this.getdata2()
      this.getdata3()
      this.getClickData()
      this.getEnterpriseidList()
    },
    watch:{
      type(){
        this.getdata1()
      },
      enterpriseId(){
        this.getdata3()
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
  .selectBtn{
    width: 150px;
    height: 36px;
    /* line-height: 40px; */
    margin:  20px 15px 0;
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
    height: 50px;
    width: calc(calc(100% / 2) - 85px);
    display: inline-block;
    margin: 10px 20px;
    border: 1px solid #e5e5e5;
    padding: 9px 20px;
    line-height: 25px;
  }
  .panel-tab-num{
    font-size: 16px;
    font-weight: 600;
  }
  .panel-tab-text{
    font-size: 12px;
  }
  .selectTime{
    margin: 0 0 20px 20px;
  }
  .footer_page{
    margin: 15px 0;
    text-align: center;
  }
</style>
