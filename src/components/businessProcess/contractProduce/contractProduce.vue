<template>
  <!--
  不要随意进行代码换行，一目十行代码不香吗，一句代码分开几行显示看着都累
  -->
  <div id="contractProduce" v-loading="loading">
    <div class="headerTop">
      <div class="nav">
          <span class="demonstration">所属公司</span>
          <company v-model="enterpriseId"></company>
      </div>
      <div class="nav">
        <span class="demonstration">订单编号</span>
        <el-input v-model="orderNo" size="small" maxlength="50" placeholder></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">联系人姓名</span>
        <el-input v-model="customerContacts" size="small" maxlength="50" placeholder></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">联系人手机</span>
        <el-input v-model="contactsPhoneNumber" size="small" maxlength="50" placeholder></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">所属业务员</span>
        <el-select v-model="userId" clearable size="small" placeholder>
          <el-option v-for="item in userIdOptions" :key="item.id"  :label="item.salesmanName" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">合同编号</span>
        <el-input v-model="contractCode" size="small" maxlength="50" placeholder></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">车牌号</span>
        <el-input v-model="vehicleNo" size="small" maxlength="50" placeholder></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">合同状态</span>
        <el-select v-model="contractStatus" clearable size="small" placeholder>
          <el-option v-for="item in contractStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="nav illegalTime">
        <span class="demonstration">合同时段</span>
        <el-date-picker size="small" v-model="dateValue" type="daterange" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" range-separator="~" start-placeholder clearable end-placeholder></el-date-picker>
      </div>
      <div class="headerBotton">
        <el-button size="small" type="primary" class="search" v-if="searchBtn" @click="search">查询</el-button>
        <el-button class="reset" size="small" type="primary"  @click="reset">重置</el-button>
        <el-button class="reset" size="small" type="primary" v-if="taxesBtn"
         @click="taxesAction" title="距账单日7天">即将交租合同</el-button>
        <el-button class="reset" size="small" type="primary" v-if="expireBtn"
        @click="expireAction" title="距到期日30天">即将到期合同</el-button>
        <el-button class="reset" size="small" type="primary" v-if="searchBtn"
        @click="yajindaijiao" title="查询存在押金未结清（包含未交，待补交）的合同">押金待交</el-button>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button @click="checkContract" size="small" :class="{ 'active': !isDisable }"  :disabled="isDisable" v-if="checkContractBtn">
          <i class="iconfont icon-chakan"></i> 合同查看
        </el-button>
        <el-button v-if="paySubmitBtn" @click="rentCollection" size="small" :class="{ 'active': !isDisable }"  :disabled="isDisable" >
          <i class="iconfont icon-jiaofei"></i> <span v-html="paySubmitBtntitle"></span>
        </el-button>
        <el-button @click="onzjdk" size="small" :class="{ 'active': !isDisable }"
        :disabled="isDisable" v-if="zjdkBtn">
          <i class="iconfont icon-chakan"></i> 租金抵扣
        </el-button>
        <el-button v-if="exportBtn"  @click="exportAction" size="small" >
          <i class="iconfont icon-daochu"></i> 导出
        </el-button>
      </div>
      <div class="footerTable">
        <div class="">
          <el-table  :data="tableData" border stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }" size="small" style="width: 100%; height: 100%;"
            :height="tableHeight" @selection-change="handleSelectionChange">
            <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
            <el-table-column prop="enterpriseName" label="所属公司" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderNo" width="100" label="订单编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="userName" width="80" label="业务员" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="contractCode" width="150" label="合同编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="customerName" width="100" label="承租方" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="customerContacts" width="100" label="联系人姓名" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="billPeriods" width="80" label="当前期数" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.billPeriods == 0">押金</span>
                <span v-else>{{scope.row.billPeriods}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="payMoney" width="100" label="应收金额"></el-table-column>
            <el-table-column prop="payedMoney" width="100" label="已收金额"></el-table-column>
            <el-table-column prop="uncollectionMoney" width="100" label="待收金额"></el-table-column>
            <el-table-column prop="latefeeMoney" width="100" label="滞纳金"></el-table-column>
            <el-table-column prop="rentStartDateStr" width="100" label="租赁开始日" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rentEndDateStr" width="100" label="租赁到期日" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rentMonths" width="80" label="租赁月数" ></el-table-column>
            <el-table-column prop="vehicleNum" width="80" label="车辆数"></el-table-column>
            <el-table-column prop="chargingPileNum" width="80" label="充电桩数"></el-table-column>
            <el-table-column prop="contractStatusStr" min-width="100" label="合同状态"></el-table-column>
          </el-table>
        </div>
        <div class="footer_page">
          <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper"
             :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {contractProduceData,getSalesmanList,expireContractData,taxesContractData,exportContract} from '../../../api/businessProcess/api'
import { getCookie, dateToString, getMenuBtnList,formatJE } from "../../../public";
import axios from 'axios'
import company from "@/components/aacommon/getEnterpriseBox.vue"
export default {
  name: "contractProduce",
    components:{
      company
    },
  data() {
    return {
      enterpriseId:"",
      loading: false,
      orderNo: null, //订单编号
      customerContacts: null, //联系人姓名
      contactsPhoneNumber: null, //联系人手机
      userId: null, //所属业务员
      contractCode: null, //合同编号
      vehicleNo: null, //车牌号
      contractStatus: null, //合同状态
      collectionStatus: null, //当期收款状态
      dateValue: null, //合同时段
      userIdOptions: [], //所属业务员
      contractStatusOptions: [
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
      ], //合同状态
      currentCollectionStatus: [
        {
          id: 0,
          label: "未结清",
        },
        {
          id: 1,
          label: "已结清",
        }
      ], //当期收款状态
      tableData: [],
      selectData:[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      belongData:0,//0:所有合同数据1:即将交租合同数据2:即将到期合同数据
      isDisable: true,
      searchBtn:false,//查询按钮是否有权限显示
      taxesBtn:false,//新增按钮是否有权限显示
      expireBtn:false,//修改按钮是否有权限显示
      checkContractBtn:false,//处理按钮是否有权限显示
      paySubmitBtn:false,//审核按钮是否有权限显示
      exportBtn:false,//查看按钮是否有权限显示
      isdaijiaoyajinchaxun:false,//标记是否待交押金查询
      paySubmitBtntitle:"缴费提交",//按钮文字
      zjdkBtn:false,//租金抵扣按钮
      tableHeight: window.innerHeight - 448 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    checked(){
      if(this.selectData.length > 1){
          this.$message.warning({
              message:'租金抵扣提交不能多选',
              center:true
          })
          return false
      }
      if(this.selectData[0].contractStatus == 0 || this.selectData[0].contractStatus == 4){
          this.$message.warning({
              message:'该合同状态下不能进行租金抵扣提交操作',
              center:true
          })
          return false
      }
      if(this.selectData[0].paymentAuditStatusNum > 0){
          this.$message.warning({
              message:'缴费状态为待审核，不能进行租金抵扣提交操作',
              center:true
          })
          return false
      }
      return true
    },
    //租金抵扣
    onzjdk(){
      if(!this.checked()){
        return
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        name: "rentDeduction",
        params:{id:this.selectData[0].id,collectionType:this.isdaijiaoyajinchaxun?1:0}
      });
    },
    //押金待交查询
    yajindaijiao(){
        this.isdaijiaoyajinchaxun=true
        this.currentPage=1
        this.belongData = 3
        this.getListData()
    },
    //获取所有数据分页信息
    getListData(){
      this.loading = true
      let params = {
        collectionStatus: this.collectionStatus,
        contactsPhoneNumber: this.contactsPhoneNumber,
        contractCode: this.contractCode,
        contractStatus: this.contractStatus,
        customerContacts: this.customerContacts,
        endContractMode: this.endContractMode,
        orderNo: this.orderNo,
        rentEndDateStr: this.dateValue ? this.dateValue[1] : null,
        rentStartDateStr: this.dateValue ? this.dateValue[0] : null,
        userId: this.userId,
        vehicleNo: this.vehicleNo,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      //正常查询
      if(!this.isdaijiaoyajinchaxun){
        contractProduceData(params,this.headers).then(res=>{
            setTimeout(() => {
            window.onload()
          }, 10)
          this.loading = false
          this.total = res.data.total
          res.data.records.map(item=>{
            item.payMoney = formatJE(item.payMoney)
            item.payedMoney = formatJE(item.payedMoney)
            item.uncollectionMoney = formatJE(item.uncollectionMoney)
            item.latefeeMoney = formatJE(item.latefeeMoney)
          })
          this.tableData = res.data.records
        }).catch(err=>{
          this.loading = false
          this.$message.error({
            message:res.message,
            center:true
          })
        })
      }
      else{
        //查询押金待交
        axios({
          method: "post",
          url: "/vehicle-service/leaseContractInfo/depositDelay",
          headers: this.headers,
          data:params
        })
          .then((res) => {
              setTimeout(() => {
            window.onload()
          }, 10)
            this.loading = false
            this.total = res.data.data.total
            res.data.data.records.map(item=>{
              item.payMoney = formatJE(item.payMoney)
              item.payedMoney = formatJE(item.payedMoney)
              item.uncollectionMoney = formatJE(item.uncollectionMoney)
              item.latefeeMoney = formatJE(item.latefeeMoney)
            })
            this.tableData = res.data.data.records
          })
          .catch((err) => {
           this.loading = false
           this.$message.error({
             message:"服务器繁忙，请稍后再试",
             center:true
           })
          });
      }

    },
    // 获取下拉列表信息
    getListInfo(){
      // 所属业务员列表
      getSalesmanList({},this.headers).then(res=>{
        if(res.status == 0){
          this.userIdOptions = res.data
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{console.log(err)})
    },
    // 查询
    search() {
      this.belongData = 0
      this.currentPage =1
      this.isdaijiaoyajinchaxun=false
      this.getListData()
    },
    // 重置
    reset() {
      this.enterpriseId="",
      this.contactsPhoneNumber = null;
      this.contractCode = null;
      this.contractStatus = null;
      this.customerContacts = null;
      this.endContractMode = null;
      this.orderNo = null;
      this.userId = null;
      this.dateValue = null;
      this.vehicleNo = null;
      this.collectionStatus = null
      this.belongData = 0
      this.currentPage = 1
      this.pageSize =10
      this.isdaijiaoyajinchaxun=false
      this.getListData()
    },
    // 即将交租合同数据
    taxesAction(){
      this.loading = true
      this.belongData = 1
      let params ={
        collectionStatus: this.collectionStatus,
        contactsPhoneNumber: this.contactsPhoneNumber,
        contractCode: this.contractCode,
        contractStatus: this.contractStatus,
        customerContacts: this.customerContacts,
        endContractMode: this.endContractMode,
        orderNo: this.orderNo,
        userId: this.userId,
        vehicleNo: this.vehicleNo,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      taxesContractData(params,this.headers).then(res=>{
        this.total = res.data.total
        this.tableData = res.data.records
        this.loading = false
      }).catch(err=>{console.log(err)})
    },
    // 即将到期合同数据
    expireAction(){
      this.loading = true
      this.belongData = 2
      let params ={
        collectionStatus: this.collectionStatus,
        contactsPhoneNumber: this.contactsPhoneNumber,
        contractCode: this.contractCode,
        contractStatus: this.contractStatus,
        customerContacts: this.customerContacts,
        endContractMode: this.endContractMode,
        orderNo: this.orderNo,
        userId: this.userId,
        vehicleNo: this.vehicleNo,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      expireContractData(params,this.headers).then(res=>{
        this.loading = false
        this.total = res.data.total
        this.tableData = res.data.records
      }).catch(err=>{console.log(err)})
    },
    // 合同查看
    checkContract(){
      if(this.selectData.length > 1){
          this.$message.warning({
              message:'合同查看不能多选',
              center:true
          })
          return
      }
      this.$router.push({
          path:'/checkContract',
          query:{id:this.selectData[0].id}
      });
    },
    // 缴费提交
    rentCollection(){
      if(!this.checked()){
        return
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
          name:'payFee',
          params:{id:this.selectData[0].id,collectionType:this.isdaijiaoyajinchaxun?1:0}
      });
    },
    // 导出
    exportAction(){
      let params = {
        collectionStatus: this.collectionStatus,
        contactsPhoneNumber: this.contactsPhoneNumber,
        contractCode: this.contractCode,
        contractStatus:  this.contractStatus,
        customerContacts: this.customerContacts,
        endContractMode: this.endContractMode,
        orderNo: this.orderNo,
        rentEndDateStr: this.dateValue ? this.dateValue[1] : null,
        rentStartDateStr: this.dateValue ? this.dateValue[0] : null,
        userId: this.userId,
        vehicleNo: this.vehicleNo,
        importType:this.belongData
      }
      exportContract(params,this.headers).then(res=>{
          if (res.type === "application/json") {
            this.$message({
              type: "error",
              message: "导出失败",
              center:true
            });
          } else {
            let blob = new Blob([res]);
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob); //blob,file.fileName
            } else {
              let link = document.createElement("a");
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("click", false, false);
              link.href = URL.createObjectURL(blob);
              link.download = "合同收租信息.xls";
              link.style.display = "none";
              document.body.appendChild(link);
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          }
      }).catch(err=>{console.log(err)})
    },
    // 表格选择
    handleSelectionChange(val) {
      this.selectData = val;
      this.isDisable = this.selectData.length < 1 ? true : false;
      if(this.isdaijiaoyajinchaxun){
        this.canyajinbujiao=false
      }
      else{
        this.canyajinbujiao=true
      }
    },
    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      if(this.belongData == 0){
        this.getListData()
      }else if(this.belongData == 1){
        this.taxesAction()
      }else if(this.belongData == 2){
        this.expireAction()
      }
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val;
      if(this.belongData == 0){
        this.getListData()
      }else if(this.belongData == 1){
        this.taxesAction()
      }else if(this.belongData == 2){
        this.expireAction()
      }
    },

  },
  mounted() {
    let query=this.$router.currentRoute.query;
    if(query&&query.vehicleNo)
    {
      this.vehicleNo=query.vehicleNo;
    }
    this.getListData()
    this.getListInfo()
  },
  computed:{
    // 计算国际化标题和按钮
    internationalTitle(){
        return this.$store.state.languageTitle
    },
    // 计算菜单页面按钮
    menuDataList(){
        return this.$store.state.menuData
    }
  },
  watch: {
    isdaijiaoyajinchaxun:{
      handler(data){
        if(this.isdaijiaoyajinchaxun){
          this.paySubmitBtntitle="补交押金"
        }
        else{
          this.paySubmitBtntitle="缴费提交"
        }
      }
    },
    // 监听菜单按钮变化并控制页面按钮显示
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '查询') this.searchBtn = true
            if(item.name == '即将交租合同') this.taxesBtn = true
            if(item.name == '即将到期合同') this.expireBtn = true
            if(item.name == '合同查看') this.checkContractBtn = true
            if(item.name == '缴费提交') this.paySubmitBtn = true
            if(item.name == '导出') this.exportBtn = true
            if(item.name == '租金抵扣') this.zjdkBtn = true
          })
      },
      immediate:true,
      deep:true
    },
    "$store.getters.isStatus": function () {
      if (this.$store.state.isStatus == true &&(this.$route.path == "/payFee"||this.$route.path == "/rentDeduction")) {
          this.getListData()
      }
    },
  },
};
</script>
<style scoped>
#contractProduce {
  width: 100%;
  height: calc(100% - 76px);
}
.headerTop {
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 15px;
  margin-bottom: 16px;
}
.demonstration {
  display: inline-block;
  width: 75px;
  font-size: 12px;
  /* margin-left: 20px; */
  margin-right: 10px;
  text-align: right;
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
.illegalTime >>> .el-input__icon{
  display: none;
}
.illegalTime .el-input__inner {
  width: 210px;
}
.search {
  background: #368cfe !important;
  margin-left: 10px;
}
.reset {
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1) !important;
  border-color: #b3d8ff;
}
.search:hover {
  color: #fff !important;
  background: #409eff !important;
}
.reset:hover {
  color: #fff !important;
  background: #368cfe !important;
}

.headerBotton {
  margin-top: 15px;
  float: left;
}
/* ------------ footer -------------- */
.footer {
  width: 100%;
  height: calc(100% - 158px);
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
  height: calc(100% - 68px);
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
  justify-content: center;
}
.footer_informatian .el-table {
  overflow: auto;
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
</style>
