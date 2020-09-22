<template>
  <div
    id="header"
    v-loading="loading"
  >
    <div class="header">
      <div class="headerTop">
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
          <span class="demonstration">合同编号</span>
          <el-input v-model="contractCode" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号</span>
          <el-input v-model="vehicleNo" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">合同状态</span>
          <el-select clearable v-model="contractStatus" size="small" placeholder>
            <el-option
              v-for="item in contractStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">锁车审核状态</span>
          <el-select clearable v-model="auditLockStatus" size="small" placeholder>
            <el-option
              v-for="item in auditStatus1Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">退车审核状态</span>
          <el-select clearable v-model="auditBackStatus" size="small" placeholder>
            <el-option
              v-for="item in auditStatus2Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="nav illegalTime">
          <span class="demonstration">合同时段</span>
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
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button
          @click="handleAdd"
          size="small"
          v-if="payAuditBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-shenhe"></i>缴费审核
        </el-button>
        <el-button
          @click="handleEdit"
          size="small"
          v-if="checkPayRecordBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-chakan"></i>查看合同缴费记录
        </el-button>
        <el-button
          @click="handleImport"
          size="small"
          v-if="settleBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-huikuan"></i>退车结算
        </el-button>
        <el-button
          @click="handleExport"
          size="small"
          v-if="settleAuditBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-shenhe"></i>退车结算审核
        </el-button>
        <el-button @click="handleExamine" v-if="checkCarRecordBtn" size="small" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-chakan"></i>查看合同车辆记录
        </el-button>
        <el-button
          @click="handleInsurance"
          size="small"
          v-if="exportBtn"
        >
          <i class="iconfont icon-daochu"></i>导出
        </el-button>
      </div>
      <div class="footerTable">
        <div class="footer_informatian">
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
            <el-table-column prop="orderNo" width="140" label="订单编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="userName" width="100" label="业务员" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="contractCode" width="120" label="合同编号"></el-table-column>
            <el-table-column prop="customerName" width="120" label="承租方"></el-table-column>
            <el-table-column prop="customerContacts" width="100" label="联系人姓名"></el-table-column>
            <el-table-column prop="rentStartDateStr" width="100" label="租赁开始日"></el-table-column>
            <el-table-column prop="rentEndDateStr" width="100" label="租赁到期日"></el-table-column>
            <el-table-column prop="rentMonths" width="80" label="租赁月数"></el-table-column>
            <el-table-column prop="vehicleNum" width="80" label="车辆数"></el-table-column>
            <el-table-column prop="chargingPileNum" width="80" label="充电桩数"></el-table-column>
            <el-table-column prop="deposit" width="90" label="合同总押金"></el-table-column>
            <el-table-column prop="vehicleRent" width="110" label="合同月租(汇总)"></el-table-column>
            <el-table-column prop="billPeriods" width="80" label="当前期数"></el-table-column>
            <el-table-column prop="contractStatusStr" min-width="100" label="合同状态"></el-table-column>
            <!-- <el-table-column prop="collectionStatusStr" width="100" label="当期状态"></el-table-column> -->
            <el-table-column prop="auditLockStatusStr" width="100" label="锁车审核状态"></el-table-column>
            <el-table-column prop="auditBackStatusStr" min-width="100" label="退车审核状态"></el-table-column>
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
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString, getMenuBtnList,formatJE } from "../../public";
export default {
  name: "rentParameter",
  data() {
    return {
      loading: false,
      orderNo: "", //订单编号
      customerContacts: "", //联系人姓名
      contactsPhoneNumber: "", //联系人手机
      userId: "", //所属业务员
      contractCode: "", //合同编号
      vehicleNo: "", //车牌号
      contractStatus: "", //合同状态
      auditLockStatus: "", //锁车审核状态
      auditBackStatus: "", //退车审核状态
      dateValue: "", //合同时段
      userIdOptions: [], //所属业务员
      contractStatusOptions: [
        // {
        //   value: "0",
        //   label: "待登记",
        // },
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
      auditStatus1Options: [
        {
          value: "0",
          label: "锁车待审核",
        },
        {
          value: "1",
          label: "锁车通过",
        },
        {
          value: "2",
          label: "锁车不通过",
        },
      ], //锁车审核状态
      auditStatus2Options: [
        {
          value: "0",
          label: "退车待审核",
        },
        {
          value: "1",
          label: "退车通过",
        },
        {
          value: "2",
          label: "退车不通过",
        },
      ], //锁车审核状态
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isDisable: true,
      searchBtn : false,//查询权限按钮
      payAuditBtn : false,//缴费审核权限按钮
      checkPayRecordBtn : false,//查看合同缴费记录权限按钮
      settleBtn : false,//退车结算权限按钮
      settleAuditBtn : false,//退车结算审核权限按钮
      checkCarRecordBtn : false,//查看合同车辆记录按钮
      exportBtn : false, //导出按钮权限
      tableHeight: window.innerHeight - 445 +'',
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
        url: "/vehicle-service/rentCollectionInfo/queryPageRentParameter",
        headers: this.headers,
        data: {
          auditBackStatus:null,
          auditLockStatus: null,
          contactsPhoneNumber: null,
          contractCode: null,
          contractStatus: null,
          customerContacts: null,
          endContractMode: null,
          enterpriseIdList: [],
          id: null,
          orderNo: null,
          rentEndDateStr: null,
          rentStartDateStr: null,
          userId: null,
          vehicleNo: null,
          userName: null,
          currentPage: this.currentPage,
          pageSize: val,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            result.data.data.records.map(item=>{
              item.deposit = formatJE(item.deposit)
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
        url: "/vehicle-service/rentCollectionInfo/queryPageRentParameter",
        headers: this.headers,
        data: {
          auditBackStatus:null,
          auditLockStatus: null,
          contactsPhoneNumber: null,
          contractCode: null,
          contractStatus: null,
          customerContacts: null,
          endContractMode: null,
          enterpriseIdList: [],
          id: null,
          orderNo: null,
          rentEndDateStr: null,
          rentStartDateStr: null,
          userId: null,
          vehicleNo: null,
          userName: null,
          currentPage: val,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            result.data.data.records.map(item=>{
              item.deposit = formatJE(item.deposit)
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
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    search() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/rentCollectionInfo/queryPageRentParameter",
        headers: this.headers,
        data: {
          auditBackStatus:this.auditBackStatus,
          auditLockStatus: this.auditLockStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          contractStatus: this.contractStatus,
          customerContacts: this.customerContacts,
          endContractMode: this.endContractMode,
          enterpriseIdList: null,
          id: null,
          orderNo: this.orderNo,
          rentStartDateStr: this.dateValue[0] ? this.dateValue[0] : "",
          rentEndDateStr: this.dateValue[1] ? this.dateValue[1] : "",
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
            result.data.data.records.map(item=>{
              item.deposit = formatJE(item.deposit)
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
    reset() {
      this.initData();
      this.auditBackStatus = '',
      this.auditLockStatus = '',
      this.contactsPhoneNumber = "";
      this.contractCode = "";
      this.contractStatus = "";
      this.customerContacts = "";
      this.endContractMode = "";
      this.orderNo = "";
      this.userId = "";
      this.dateValue = "";
      this.vehicleNo = "";
    },
    handleEdit() {
      //查看合同缴费记录
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "查看合同缴费记录不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/lookContractPayment",
        query: { form: "look", id: this.multipleSelection[0].id },
      });
    },
    handleImport() {
      //退车结算
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "退车结算不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      if (this.multipleSelection[0].auditBackStatus === 0 || this.multipleSelection[0].auditBackStatus === 1) {
        this.$message({
          message: "不可进行退车结算操作!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/backVehicle",
        query: { form: "backVehicle", id: this.multipleSelection[0].id },
      });
    },
    handleExport() {
      //退车结算审核
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "退车结算审核不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      if (this.multipleSelection[0].auditBackStatus != 0) {
        this.$message({
          message: "不可进行退车结算审核操作!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/backVehicleAudit",
        query: { form: "audit", id: this.multipleSelection[0].id },
      });
    },
    handleExamine() {
      //查看合同车辆记录
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "查看合同车辆记录不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/lookVehicle",
        query: { form: "look", id: this.multipleSelection[0].id },
      });
    },
    handleInsurance() {
      //导出
      axios({
        method: "post",
        url: "/vehicle-service/rentCollectionInfo/exportRentParameterInfo",
        headers: this.headers,
        data: {
          auditBackStatus:this.auditBackStatus,
          auditLockStatus: this.auditLockStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          contractStatus: this.contractStatus,
          customerContacts: this.customerContacts,
          endContractMode: this.endContractMode,
          enterpriseIdList: null,
          id: null,
          orderNo: this.orderNo,
          rentStartDateStr: this.dateValue[0] ? this.dateValue[0] : "",
          rentEndDateStr: this.dateValue[1] ? this.dateValue[1] : "",
          userId: this.userId,
          vehicleNo: this.vehicleNo,
          userName: null,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
        responseType: 'blob'
      })
        .then((result) => {
          if (result.data.type === "application/json") {
              this.$message({
                type: "error",
                message: "下载失败，文件不存在或权限不足"
              });
            } else {
              let blob = new Blob([result.data]);
              if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob,);//blob,file.fileName
              } else {
                let link = document.createElement("a");
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, false);
                link.href = URL.createObjectURL(blob); 
                link.download = "收租台账信息.xls";
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(link.href);
              }
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
    initData() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/rentCollectionInfo/queryPageRentParameter",
        headers: this.headers,
        data: {
          auditBackStatus:null,
          auditLockStatus: null,
          contactsPhoneNumber: null,
          contractCode: null,
          contractStatus: null,
          customerContacts: null,
          endContractMode: null,
          enterpriseIdList: [],
          id: null,
          orderNo: null,
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
              item.deposit = formatJE(item.deposit)
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
        console.log(result.data);
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
    // 监听菜单按钮变化并控制页面按钮显示
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '查询') this.searchBtn = true
            if(item.name == '缴费审核') this.payAuditBtn = true
            if(item.name == '查看合同缴费记录') this.checkPayRecordBtn = true
            if(item.name == '退车结算') this.settleBtn = true
            if(item.name == '退车结算审核') this.settleAuditBtn = true
            if(item.name == '查看合同车辆记录') this.checkCarRecordBtn = true
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
  },
};
</script>
<style scoped>
#header {
  width: 100%;
  height: calc(100% - 76px);
}
.header {
  width: 100%;
  height: 155px;
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
  width: 80px;
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
  height: calc(100% - 155px);
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

.illegalTime >>> .el-input__icon {
  display: none;
}
.illegalTime >>> .el-input__inner {
  width: 210px !important;
}
</style>
