<template>
  <div
    id="header"
    v-loading="loading"
  >
    <div class="header">
      <div class="headerTop scoped">
      <div class="nav">
          <span class="demonstration">所属公司</span>
          <company v-model="enterpriseId"></company>
      </div>
        <div class="nav">
          <span class="demonstration">合同编号</span>
          <el-input v-model="contractCode" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav illegalTime">
          <span class="demonstration">合同时段</span>
          <el-date-picker
            size="small"
            v-model="dateValue"
            type="daterange"
            range-separator="~"
          ></el-date-picker>
        </div>
        <div class="nav">
          <span class="demonstration">合同状态</span>
          <el-select v-model="contractStatus" size="small" placeholder clearable >
            <el-option
              v-for="item in contractStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">联系人姓名</span>
          <el-input v-model="contactsName" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">联系人手机</span>
          <el-input v-model="contactsPhoneNum" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">所属业务员</span>
          <el-select v-model="userId" size="small" placeholder clearable >
            <el-option
              v-for="item in userIdOptions"
              :key="item.id"
              :label="item.salesmanName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="nav illegalTime">
          <span class="demonstration" style="width: 80px">计划还款时段</span>
          <el-date-picker
            size="small"
            v-model="jihuadateValue"
            type="daterange"
            range-separator="~"
          ></el-date-picker>
        </div>
        <div class="headerBotton">
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
          <el-button class="btn"
            v-if="exportBtn"
            @click="handleInsurance"
            size="small"
          >
             <i class="iconfont icon-daochu"></i>导出
          </el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerTable">
        <div class="">
          <el-table
            :data="dataList"
            border
            stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            size="small"
            style="width: 100%; height: 100%;"
            :height="tableHeight"
          >
            <!-- <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
            <el-table-column prop width="60" label="序号" align="center">
              <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * pageSize + 1 }}</template>
            </el-table-column> -->
          <el-table-column prop="enterpriseName" label="所属公司" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractCode" width="150" label="合同编号"></el-table-column>
            <el-table-column prop="contactsName" width="100" label="承租方联系人"></el-table-column>
            <el-table-column prop="startDate" width="100" label="租赁开始日"></el-table-column>
            <el-table-column prop="endDate" width="100" label="租赁到期日"></el-table-column>
            <el-table-column prop="months" width="80" label="租赁月数"></el-table-column>
            <el-table-column prop="vehicleNum" width="80" label="车辆数"></el-table-column>
            <el-table-column prop="chargingPileNum" width="80" label="充电桩数"></el-table-column>
            <el-table-column prop="totalDeposit" width="110" label="合同总押金"></el-table-column>
            <el-table-column prop="receivableMoney" width="110" label="应收金额" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="receivedMoney" width="140" label="已收金额" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="notReceivedMoney" width="110" label="待收金额"></el-table-column>
            <el-table-column prop="lateFee" width="110" label="滞纳金累计"></el-table-column>
            <el-table-column prop="currentPeriods" width="80" label="当前期数"></el-table-column>
            <el-table-column prop="contractStatus" min-width="100" label="合同状态"></el-table-column>
            <el-table-column prop="userName" width="150" label="业务员"></el-table-column>
          </el-table>
        </div>
        <div class="footer_page">
          <div class="zongji">
            <div >
              <label>应收金额汇总：</label>
              <span>{{receivableMoneyTotal}}</span>
            </div>
            <div>
              <label>已收金额汇总：</label>
              <span>{{receivedMoneyTotal}}</span>
            </div>
             <div>
              <label>待收金额汇总：</label>
              <span>{{notReceivedMoneyTotal}}</span>
            </div>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, formatDate, getMenuBtnList } from "../../public";
import company from "@/components/aacommon/getEnterpriseBox.vue"
export default {
  name: "rentsReport",
    components:{
      company
    },
  data() {
    return {
      enterpriseId:"",
      rentsReportUrl:'/vehicle-service/contractRentCollectionInfo/collectionReport',//查询列表数据接口
      rentsReportTotalCountUrl:'/vehicle-service/contractRentCollectionInfo/collectionReportSummary',//底部统计接口
      exporturl:'/vehicle-service/contractRentCollectionInfo/exportCollectionReport',//导出
      loading: false,
      contractCode: "", //合同编号
      dateValue: [], //合同时段
      jihuadateValue:[],//计划还款时段
      contractStatus:"",//合同状态编号
      contractStatusOptions: /*合同状态*/[
        {
          value: "1",
          label: "正常进行中",
          disabled: true,
        },
        {
          value: "2",
          label: "逾期待处理",
        },
        {
          value: "3",
          label: "逾期锁车",
        },
        {
          value: "4",
          label: "退车完结",
        },
      ],
      contactsName: "", //联系人姓名
      contactsPhoneNum: "", //联系人手机
      userId: "", //所属业务员
      userIdOptions:[], //所属业务员
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchBtn:false,//查询按钮是否有权限显示
      exportBtn:false,//导出按钮是否有权限显示
      tableHeight: window.innerHeight - 370 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
      receivableMoneyTotal:'',//应收金额汇总
      receivedMoneyTotal:'',//已收金额汇总
      notReceivedMoneyTotal:''//待收金额汇总
    };
  },
  methods: {
    //格式化金额
    formatJE(money,flag){
      if(money){
        let arr=String(money).split('.');
        if(arr.length==1){
          money=arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+".00";
        }
        else{
           money=arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+"."+arr[1];
        }
      }
      return money;
    },
    GetSeachParam(){
      let startDate=""
      let endDate=""
      if(this.dateValue&&this.dateValue.length==2){
        startDate=formatDate(this.dateValue[0],'yyyy-MM-dd')
        endDate=formatDate(this.dateValue[1],'yyyy-MM-dd')
      }
      let planPaymentStartDate=""
      let planPaymentEndDate=""
      if(this.jihuadateValue&&this.jihuadateValue.length==2){
        planPaymentStartDate=formatDate(this.jihuadateValue[0],'yyyy-MM-dd')
        planPaymentEndDate=formatDate(this.jihuadateValue[1],'yyyy-MM-dd')
      }
      return {
        enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
        contractCode: this.contractCode,
        startDate: startDate,
        endDate: endDate,
        contractStatus: this.contractStatus,
        contactsName: this.contactsName,
        contactsPhoneNum:this.contactsPhoneNum,
        planPaymentStartDate:planPaymentStartDate,
        planPaymentEndDate:planPaymentEndDate,
        userId: this.userId,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
    },
    GetList(){
      this.loading=true
      axios({
        method: "post",
        url: this.rentsReportUrl,
        headers: this.headers,
        data: this.GetSeachParam(),
      })
        .then((result) => {
          //console.log(result.data);
          this.loading=false
          if (result.data.status == 0) {
            setTimeout(() => {
            window.onload()
          }, 10)
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
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
          this.loading=false
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    GetTotal(){
      axios({
        method: "post",
        url: this.rentsReportTotalCountUrl,
        headers: this.headers,
        data: this.GetSeachParam(),
      })
        .then((result) => {
          //console.log(result.data);
          if (result.data.status == 0&&result.data.data) {
            this.receivableMoneyTotal = result.data.data.receivableMoneyTotal;
            this.receivedMoneyTotal = result.data.data.receivedMoneyTotal;
            this.notReceivedMoneyTotal = result.data.data.notReceivedMoneyTotal;
          } else {
            this.receivableMoneyTotal = ''
            this.receivedMoneyTotal = ''
            this.notReceivedMoneyTotal =''
          }
        })
        .catch((err) => {
          //console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleSizeChange(pagesize) {
      this.pageSize=pagesize;
      this.GetList();
    },
    handleCurrentChange(pageindex) {
       this.currentPage=pageindex;
       this.GetList();
    },
    handleSelectionChange(item) {
      //console.log(item);
      this.multipleSelection = item;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    search() {
      this.GetList();//获取列表
      this.GetTotal();//获取总数
    },
    reset() {
      this.contractCode=""
      this.dateValue=""
      this.contractStatus=""
      this.contactsName=""
      this.contactsPhoneNum=""
      this.userId=""
      this.enterpriseId=""
      this.initData();
    },
    handleInsurance() {
      //导出
      axios({
        method: "post",
        url: this.exporturl,
        headers: this.headers,
        data:this.GetSeachParam(),
        responseType: 'blob'
      })
        .then((result) => {
          //console.log(result.data);
          if (result.data.type === "application/json") {
              this.$message({
                type: "error",
                message: "导出失败，请稍后再试"
              });
            } else {
              let blob = new Blob([result.data]);
              let link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "收租台账报表.xls";
              link.style.display = "none";
              document.body.appendChild(link);
              link.click();
              window.URL.revokeObjectURL(link.href);
              link.remove();
            }
        })
        .catch((err) => {
          if(typeof err =='object'){
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          }
          else{
            this.$message({
              message: err,
              center: true,
              type: "error",
            });
          }
        });
    },
    initData() {
       this.GetList();
       this.GetTotal();
    },
  },
  mounted() {
    this.initData();
    axios({
      method: "get",
      url: "/vehicle-service/comboBoxController/getSalesmanBox",
      headers: this.headers,
    })
      .then((result) => {
        //console.log(result.data);
        this.userIdOptions = result.data.data;
      })
      .catch((err) => {
        //console.error(err);
        this.$message({
          message: err.response.data.message,
          center: true,
          type: "error",
        });
      });
  },
  computed:{
    // 计算国际化标题和按钮
    // internationalTitle(){
    //     return this.$store.state.languageTitle
    // },
    // 计算菜单页面按钮
    menuDataList(){
        return this.$store.state.menuData
    }
  },

  watch: {
    // 监听菜单按钮变化并控制页面按钮显示
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '查询') this.searchBtn = true
            if(item.name == '导出') this.exportBtn = true
          })
      },
      immediate:true,
      deep:true
    },
    "$store.getters.isStatus": function () {
      if (this.$store.state.isStatus == true) {
        this.initData();
      }
    },
    "receivableMoneyTotal":function(){
      this.receivableMoneyTotal=this.formatJE(this.receivableMoneyTotal);
    },
    "receivedMoneyTotal":function(){
      this.receivedMoneyTotal=this.formatJE(this.receivedMoneyTotal);
    },
    "notReceivedMoneyTotal":function(){
      this.notReceivedMoneyTotal=this.formatJE(this.notReceivedMoneyTotal);
    },
    "dataList":function(){
      if(this.dataList){
        for(let item of this.dataList){
          item.receivableMoney=this.formatJE(item.receivableMoney);
          item.receivedMoney=this.formatJE(item.receivedMoney);
          item.notReceivedMoney=this.formatJE(item.notReceivedMoney);
          item.totalDeposit=this.formatJE(item.totalDeposit);
          item.lateFee=this.formatJE(item.lateFee);
          item.currentPeriods=item.currentPeriods==0?'押金':item.currentPeriods
        }
      }
    }
  },
};
</script>
<style scoped>
#header {
  width: 100%;
  height: calc(100% - 106px);
}
.header {
  width: 100%;
  /* height: 180px; */
  box-sizing: border-box;
  /* border: 1px solid #e5e5e5; */
  margin-bottom: 16px;
}
.headerTop {
  box-sizing: border-box;
  overflow: hidden;
  /* padding-bottom: 15px; */
}
.demonstration {
  display: inline-block;
  width: 60px;
  font-size: 12px;
  margin-left: 20px;
  margin-right: 10px;
  text-align: right;
  color: #333333;
  color: #333333;
}
.nav {
  float: left;
  margin-top: 15px;
}
.nav .el-input {
  width: 160px;
}
.nav .el-input__inner {
  width: 160px;
}
.nav >>> .el-input--suffix {
  width: 160px;
}
.nav span {
  color: #333333;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 12px;
  line-height: 18px;
  margin-left: 20px;
  margin-right: 5px;
}
.search {
  background: #368cfe !important;
  margin-left: 10px;
}
.reset {
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1) !important;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.search:hover {
  color: #fff !important;
  background: #409eff !important;
}
.reset:hover {
  color: #fff !important;
  background: #368cfe !important;
}

.p .el-input {
  width: 202px !important;
}
.p >>> .el-input--suffix {
  width: 202px !important;
}
.tableSelect .el-input {
  width: 350px !important;
}
.tableSelect >>> .el-input--suffix {
  width: 350px !important;
}
.headerBotton {
  height: 60px;
  display: flex;
  align-items: center;
  float: left;
}
/* ------------ footer -------------- */
.footer {
  width: 100%;
  height: calc(100% - 118px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footerBottom {
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
}
.footerBottom .el-button:last-child {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:last-child:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:hover {
  color: #c0c4cc !important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .active:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerTable {
  width: 100%;
  height: calc(100% - 0px);
}
.el-table {
  color: #333333;
}
.footer_informatian {
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: auto;
}
.footer_page {
  width: 100%;
  height: 56px;
  display: flex;
  border-top: 1px solid #e5e5e5;
  align-items: center;
  text-align: center;
  justify-content: space-between;
}
.footer_informatian .el-table {
  overflow: auto;
  height: 100%!important;
}
.confirm {
  float: left;
  margin-left: 220px;
  background: #368cfe !important;
}
.confirm:hover {
  color: #fff !important;
  background: #409eff !important;
}
.cancel {
  margin-right: 220px;
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1);
}
.cancel:hover {
  color: #fff !important;
  background: #368cfe !important;
}

.illegalTime >>> .el-input__inner {
  width: 212px !important;
}
.btn{
  border: 1px solid rgba(54, 140, 254, 0.5);
  color: #368cfe;
}
.zongji {
  width: auto;
}
.zongji div{
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
  width: 170px;
  text-align: left;
}
.zongji label{
  color: #333333;
  font-family: Microsoft YaHei;
  font-size: 12px;
  font-weight: 700;
}
.zongji span{
  color: #3399FF;
  font-size: 13px;
}
.el-pagination {
    margin-right: 10px;
}
</style>
