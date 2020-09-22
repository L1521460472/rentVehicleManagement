<template>
  <div id="paymentRecord1" ref="contentHeight" v-loading="loading" element-loading-text="loading">
    <div class="header" ref="headerHeight">
      <div class="headerTop">
        <div class="nav">
          <span class="demonstration">合同编号</span>
          <el-input maxlength="50" size="small" v-model="contractCode" placeholder></el-input>
        </div>
        <div class="nav">       
          <span class="demonstration">车牌号</span>
          <el-input maxlength="50" size="small" v-model="vehicleNo" placeholder></el-input>
        </div>
        <div class="nav">       
          <span class="demonstration">联系人姓名</span>
          <el-input maxlength="50" size="small" v-model="customerContacts" placeholder></el-input>
        </div>
        <div class="nav">       
          <span class="demonstration">联系人手机号</span>
          <el-input maxlength="50" size="small" v-model="contactsPhoneNumber" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">缴费审核状态</span>
          <el-select clearable size="small" v-model="auditStatus" placeholder>
            <el-option
              v-for="item in auditStatusOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>      
        <div class="nav">
          <span class="demonstration">缴费渠道</span>
          <el-select clearable size="small" v-model="paymentChannel" placeholder>
            <el-option
              v-for="item in payChanleList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">所属业务员</span>
          <el-select clearable size="small" v-model="salesman" placeholder>
            <el-option
              v-for="item in salesmanList"
              :key="item.id"
              :label="item.salesmanName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="nav orderTime">
          <span class="demonstration">缴费时段</span>
          <el-date-picker
            size="small"
            v-model="payTime"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="~"
            start-placeholder
            clearable
            end-placeholder
          ></el-date-picker>
        </div>
        <el-button class="search" type="primary" v-if="searchBtn" size="small" @click="search">查询</el-button>
        <el-button class="reset" type="primary" size="small" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="footer" >
      <div class="bottom">
        <div class="footerTable">
          <el-table
            border
            stripe
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            :data="tableData"
            :height="tableHeight"
            style="width: 100%;"
          >
            <!-- <el-table-column
                    type="selection"
                    align="center"
                    width="60">
            </el-table-column>-->
            
            <el-table-column prop="contractCode" label="合同编号" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerContacts" label="联系人姓名" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contactsPhoneNumber" label="联系人手机号" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="billPeriods" label="当期期数" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="collectionCode" label="缴费记录编号" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatusStr" label="审核状态" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="rentTimeStr" label="缴费时间" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="paymentAccount" label="收款账户" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column  label="附件" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="lookFile" @click="lookFeilAction(scope.row.efileIdCode)">查看附件</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="vehicleNo" label="关联车牌号" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="rentMoney" label="缴费金额" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="preCollectMoney" label="预收款" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="writeOffMoney" label="已核销金额" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="payTypeStr" label="缴费渠道" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="userName"
              label="所属业务员"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </div> 
        <div class="footer_page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            :pager-count="5"
            layout="total, sizes, prev, pager, next ,jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 查看附件 -->
        <el-dialog :visible.sync="dialogVisible" width="500px">
          <el-carousel trigger="click" height="400px" >
            <el-carousel-item v-for="item in imageUrlList" :key="item.id">
              <img class="imgList" :src="item.efileAddr" alt="" srcset="">
            </el-carousel-item>
          </el-carousel>        
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
  formatJE
} from "../../../public";
import {getSalesmanList,paymentRecord,getImgsrcList} from '../../../api/businessProcess/api'
export default {
  name: "paymentRecord",
  data() {
    return {
      total: 0, //数据总条数
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      tableData: [],
      auditStatusOptions: [
        {
          id: 0,
          label: "待审核",
        },
        {
          id: 1,
          label: "审核通过",
        },
        {
          id: 2,
          label: "审核不通过",
        },
      ], //审核状态列表
      payChanleList: [
        {
          id: 1,
          label: "Web后台",
        },
        {
          id: 2,
          label: "App提交",
        },
      ], //缴费渠道列表
      salesmanList:[],//所属业务员列表
      loading: false,
      contractCode:null,//合同编号
      vehicleNo:null,//车牌号
      auditStatus:null,//缴费审核状态
      paymentChannel:null,//缴费渠道
      salesman:null,//所属业务员
      payTime:null,//缴费时段
      customerContacts:null,//联系人
      contactsPhoneNumber:null,//联系人手机号
      dialogVisible:false,//查看附件弹窗
      imageUrlList:[],//附件资料
      searchBtn:false,//查询按钮是否有权限
      tableHeight: window.innerHeight - 380 +'',
      headerHeight:0,
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      }, //请求头
    };
  },
  methods: {
    // 获取分页数据
    getListData() {
      this.loading = true
      let params = {
        auditStatus: this.auditStatus,
        contactsPhoneNumber: this.contactsPhoneNumber,
        contractCode: this.contractCode,
        customerContacts:this.customerContacts,
        payType: this.paymentChannel,
        rentEndDateStr: this.payTime ?  (this.payTime[1] +" "+ '23:59:59'): null,
        rentStartDateStr: this.payTime ?  this.payTime[0]: null,
        userId: this.salesman,
        vehicleNo: this.vehicleNo,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      paymentRecord(params,this.headers).then(res=>{
          this.loading = false
          this.total = res.data.total
          res.data.records.map(item=>{
            item.rentMoney = formatJE(item.rentMoney)
            item.preCollectMoney = formatJE(item.preCollectMoney)
            item.writeOffMoney = formatJE(item.writeOffMoney)
          })
          this.tableData = res.data.records
      }).catch(err=>{
          this.loading = false
      })
    },
    // 获取所属业务员
    getStatusListData() {
      // 获取状态列表
      getSalesmanList({}, this.headers)
        .then((res) => {
          if(res.status == 0){
            this.salesmanList = res.data;
          }else{
            this.$message.error({
              message:res.message,
              center:true
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询
    search() {
      this.currentPage = 1;
      this.getListData();
    },
    // 重置
    reset() {
      this.contactsPhoneNumber= null,
      this.customerContacts = null,
      this.contractCode = null,//合同编号
      this.vehicleNo = null,//车牌号
      this.auditStatus = null,//缴费审核状态
      this.paymentChannel = null,//缴费渠道
      this.salesman = null,//所属业务员
      this.payTime = null,//缴费时段
      this.currentPage = 1,
      this.pageSize = 10,
      this.getListData();
    },
    // 查看附件
    lookFeilAction(imgCode){
      let params = {
        idCode:imgCode
      }
      getImgsrcList(params,this.headers).then(res=>{
        if(res.status == 0){
          this.imageUrlList =res.data
          if(this.imageUrlList<1){
            this.$message.warning({
              message:'暂无附件',
              center:true
            })
          }else{
            this.dialogVisible =true
          }
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{console.log(err)}) 
    },

    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getListData();
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
  },
  computed: {
    // 计算国际化标题和按钮
    // internationalTitle() {
    //   return this.$store.state.languageTitle;
    // },
    // 计算菜单页面按钮
    menuDataList() {
      return this.$store.state.menuData;
    },
  },
  watch: {
    // 监听国际化标题和按钮变化
    internationalTitle: {
      handler(data) {
        this.international = data;
      },
      immediate: true,
      deep: true,
    },
    // 监听菜单按钮变化并控制页面按钮显示
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '查询') this.searchBtn = true
          })
      },
      immediate:true,
      deep:true
    },
    // "$store.getters.isStatus": function () {
    //   if (
    //     this.$store.state.isStatus == true &&
    //     this.$route.path == "/addAccount"
    //   ) {
    //     this.getListData();
    //   }
    // },
  },
  mounted() {
    this.getListData();
    this.getStatusListData();
    this.headerHeight = this.$refs.headerHeight.offsetHeight
  },
};
</script>

<style scoped>
#paymentRecord1{
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
.nav {
  float: left;
  margin-top: 15px;
}
.demonstration {
  display: inline-block;
  width: 75px;
  font-size: 12px;
  margin-left: 20px;
  margin-right: 10px;
  text-align: right;
  color: #333333;
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
.orderTime >>> .el-input__icon {
  display: none;
}
.orderTime .el-input__inner {
  width: 230px;
}
.search {
  margin-left: 20px;
  margin-top: 15px;
  background: #368cfe !important;
  float: left;
}
.reset {
  margin-top: 15px;
  float: left;
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1) !important;
  border-color: #b3d8ff;
}
.search:hover {
  color: #fff !important;
}
.reset:hover {
  color: #fff !important;
  background: #368cfe !important;
}

/* ------------ footer -------------- */
.footer {
  width: 100%;
  height: calc(100% - 158px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footer .top {
  width: 100%;
  /* height: 68px; */
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
}
.footer .top .el-button:nth-child(1) {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footer .top .el-button:nth-child(1):hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.top .el-button:hover {
  color: #c0c4cc !important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footer .top .active:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footer .bottom {
  width: 100%;
  height: calc(100%);
}
.el-table {
  color: #333333;
}
.footerTable {
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
.footerTable .el-table {
  overflow: auto;
}
.from {
  overflow: hidden;
}
.formItem >>> .el-form-item {
  float: left;
  margin-left: 25px;
}
.lookFile {
  color: #0000ff;
  cursor: pointer;
}
#paymentRecord1 >>> .el-dialog__body{
  padding: 0;
}
#paymentRecord1 >>> .el-dialog__header{
  padding: 0;
}
#paymentRecord1 >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#paymentRecord1>>> .el-dialog__close{
  color: #fff;
}
#paymentRecord1 >>>.el-carousel__button{
  width: 12px;
}
.imgList{
  width: 100%;
  height: 400px;
  display: block;
}

</style>