<template>
  <div
    id="header"
    v-loading="loading"
  >
    <div class="header scoped">
      <div class="headerTop">
      <div class="nav">
          <span class="demonstration">所属公司</span>
          <company v-model="enterpriseId"></company>
      </div>
        <div class="nav">
          <span class="demonstration">合同编号</span>
          <el-input v-model="contractCode" size="small" maxlength="50" placeholder></el-input>
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
          <el-select clearable v-model="userId" size="small" placeholder>
            <el-option
              v-for="item in userIdOptions"
              :key="item.id"
              :label="item.salesmanName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号</span>
          <el-input v-model="vehicleNo" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">缴费渠道</span>
          <el-select clearable v-model="payType" size="small" placeholder>
            <el-option
              v-for="item in payTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">审核状态</span>
          <el-select clearable v-model="auditStatus" size="small" placeholder>
            <el-option
              v-for="item in auditStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="nav illegalTime">
          <span class="demonstration">缴费时段</span>
          <el-date-picker
            size="small"
            v-model="dateValue"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="~"
            start-placeholder
            clearable
            end-placeholder
          ></el-date-picker>
        </div>
        <div class="headerBotton">
          <el-button v-if="searchBtn" size="small" type="primary" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button
          v-if="auditBtn"
          @click="handleAudit"
          size="small"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-shenhe"></i>审核操作
        </el-button>
      </div>
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
            <el-table-column prop width="60" label="序号" align="center">
              <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * pageSize + 1 }}</template>
            </el-table-column>
          <el-table-column prop="enterpriseName" label="所属公司" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractCode" width="140" label="合同编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="customerContacts" width="110" label="联系人姓名" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="contactsPhoneNumber" label="联系人手机号" width="120" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="billPeriods" width="110" label="当期期数" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.billPeriods == 0">押金</span>
                <span v-else>{{scope.row.billPeriods}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="collectionCode" width="130" label="缴费记录编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="auditStatusStr" width="100" label="审核状态" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="payTypeStr" width="80" label="缴费渠道" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="userName" width="90" label="所属业务员" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rentTimeStr" width="120" label="缴费时间" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="paymentAccount" width="130" label="收款账户" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="efileIdCode" show-overflow-tooltip width="80" label="附件">
              <template slot-scope="scope">
                <span class="lookFile" @click="lookFeilAction(scope.row.efileIdCode)">查看附件</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" width="80" label="备注" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="vehicleNo" width="150" :show-overflow-tooltip="true" label="关联车牌号"></el-table-column>
            <el-table-column prop="rentMoney" width="80" label="缴费金额"></el-table-column>
            <el-table-column prop="preCollectMoney" width="80" label="预收款"></el-table-column>
            <el-table-column prop="writeOffMoney" min-width="90" label="已核销金额"></el-table-column>
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
            layout="total, sizes, prev, pager, next, jumper"
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
import axios from "axios";
import {getImgsrcList} from '../../api/businessProcess/api'
import { getCookie, dateToString, getMenuBtnList,formatJE } from "../../public";
import company from "@/components/aacommon/getEnterpriseBox.vue"
export default {
  name: "payAuditing",
    components:{
      company
    },
  data() {
    return {
      enterpriseId:"",
      loading: false,
      payType: null,//缴费渠道(1-web后台 2-App提交)
      customerContacts: "", //联系人姓名
      contactsPhoneNumber: "", //联系人手机
      userId: "", //所属业务员
      contractCode: "", //合同编号
      vehicleNo: "", //车牌号
      contractStatus: "", //合同状态
      auditStatus: "", //审核状态
      dateValue: "", //合同时段
      userIdOptions: [], //所属业务员
      payTypeOptions: [
        {
          value: 1,
          label: "web后台",
        },
        {
          value: 2,
          label: "App提交",
        },
      ], //合同状态
      auditStatusOptions: [
        {
          value: "0",
          label: "待审核",
        },
        {
          value: "1",
          label: "审核通过",
        },
        {
          value: "2",
          label: "审核不通过",
        },
      ], //审核状态
      addBtn: true,
      editBtn: true,
      type:null,
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isDisable: true,
      imageUrlList:[],
      dialogVisible:false,
      searchBtn:false, //查询权限按钮
      auditBtn:false, //审核操作权限按钮
      tableHeight: window.innerHeight - 443 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/rentCollectionInfo/queryPagePayCostAuditing",
        headers: this.headers,
        data: {
          auditStatus: this.auditStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          customerContacts: this.customerContacts,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          id: null,
          payType:this.payType,
          rentStartDateStr: this.dateValue[0] ? this.dateValue[0] : "",
          rentEndDateStr: this.dateValue[1] ? (this.dateValue[1] +" "+ '23:59:59') : "",
          userId: this.userId,
          vehicleNo: this.vehicleNo,
          userName: null,
          currentPage: this.currentPage,
          pageSize: val,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            result.data.data.records.map(item=>{
              item.rentMoney = formatJE(item.rentMoney)
              item.preCollectMoney = formatJE(item.preCollectMoney)
              item.writeOffMoney = formatJE(item.writeOffMoney)
            })
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
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
    handleCurrentChange(val) {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/rentCollectionInfo/queryPagePayCostAuditing",
        headers: this.headers,
        data: {
          auditStatus: this.auditStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          customerContacts: this.customerContacts,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          id: null,
          payType:this.payType,
          rentStartDateStr: this.dateValue[0] ? this.dateValue[0] : "",
          rentEndDateStr: this.dateValue[1] ? (this.dateValue[1] +" "+ '23:59:59') : "",
          userId: this.userId,
          vehicleNo: this.vehicleNo,
          userName: null,
          currentPage: val,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            result.data.data.records.map(item=>{
              item.rentMoney = formatJE(item.rentMoney)
              item.preCollectMoney = formatJE(item.preCollectMoney)
              item.writeOffMoney = formatJE(item.writeOffMoney)
            })
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
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
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    search() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/rentCollectionInfo/queryPagePayCostAuditing",
        headers: this.headers,
        data: {
          auditStatus: this.auditStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          customerContacts: this.customerContacts,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          id: null,
          payType:this.payType,
          rentStartDateStr: this.dateValue[0] ? this.dateValue[0] : "",
          rentEndDateStr: this.dateValue[1] ? (this.dateValue[1] +" "+ '23:59:59') : "",
          userId: this.userId,
          vehicleNo: this.vehicleNo,
          userName: null,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
              setTimeout(() => {
            window.onload()
          }, 10)
            result.data.data.records.map(item=>{
              item.rentMoney = formatJE(item.rentMoney)
              item.preCollectMoney = formatJE(item.preCollectMoney)
              item.writeOffMoney = formatJE(item.writeOffMoney)
            })
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    reset() {
      this.enterpriseId=""
      this.initData();
      this.auditStatus = "";
      this.contactsPhoneNumber = "";
      this.contractCode = "";
      this.contractStatus = "";
      this.customerContacts = "";
      this.payType = "";
      this.userId = "";
      this.dateValue = "";
      this.vehicleNo = "";
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
    // 审核操作
    handleAudit() {
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "审核操作不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      if (this.multipleSelection[0].auditStatus != 0 ) {
        this.$message({
          message: "已审核，不可再进行审核操作!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/audit",
        query: { form: "audit", id: this.multipleSelection[0].id },
      });
    },
    initData() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/rentCollectionInfo/queryPagePayCostAuditing",
        headers: this.headers,
        data: {
          auditStatus: null,
          contactsPhoneNumber: null,
          contractCode: null,
          customerContacts: null,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          id: null,
          payType: null,//缴费渠道(1-web后台 2-App提交)
          rentEndDateStr: null,
          rentStartDateStr: null,
          userId: null,
          vehicleNo: null,
          userName: null,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            result.data.data.records.map(item=>{
              item.rentMoney = formatJE(item.rentMoney)
              item.preCollectMoney = formatJE(item.preCollectMoney)
              item.writeOffMoney = formatJE(item.writeOffMoney)
            })
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
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
  },
  mounted() {
    this.initData();
    axios({
      method: "get",
      url: "/vehicle-service/comboBoxController/getSalesmanBox",
      headers: this.headers,
    })
      .then((result) => {
        // console.log(result.data);
        this.userIdOptions = result.data.data;
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
            if(item.name == '审核操作') this.auditBtn = true
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
  },
};
</script>
<style scoped>
#header {
  width: 100%;
  height: calc(100% - 120px);
}
.header {
  width: 100%;
  /* height: 180px; */
  box-sizing: border-box;
  /* border: 1px solid #e5e5e5; */
  margin-bottom: 16px;
}
.headerTop {
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  overflow: hidden;
  /* padding-bottom: 15px; */
  margin-bottom: 16px;
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
  height: calc(100% - 109px);
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

/* .footerBottom .el-button:last-child {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:last-child:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
} */
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

.illegalTime >>> .el-input__icon {
  display: none;
}
.illegalTime >>> .el-input__inner {
  width: 210px !important;
}
.lookFile {
  color: #0000ff;
  cursor: pointer;
}
#header >>> .el-dialog__body{
  padding: 0;
}
#header >>> .el-dialog__header{
  padding: 0;
}
#header >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#header>>> .el-dialog__close{
  color: #fff;
}
#header >>>.el-carousel__button{
  width: 12px;
}
.imgList{
  width: 100%;
  height: 400px;
  display: block;
}

</style>
