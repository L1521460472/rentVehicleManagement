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
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search(null)">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
          <el-button class="reset" size="small" v-if="taxesBtn" plain @click="handleAbout" title="距账单日7天">即将交租合同</el-button>
          <el-button class="reset" size="small" v-if="expireBtn" plain @click="handleDataOut" title="距到期日30天">即将到期合同</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button
          @click="handleAdd"
          size="small"
          v-if="registerBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-dengji"></i>计划登记
        </el-button>
        <el-button
          @click="handleEdit"
          size="small"
          v-if="changeBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-biangeng"></i>计划变更
        </el-button>
        <el-button
          @click="handleImport"
          size="small"
          v-if="auditBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-shenhe"></i>计划审核
        </el-button>
        <el-button
          @click="handleExport"
          size="small"
          v-if="checkBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-chakan"></i>计划查看
        </el-button>
        <!-- <el-button @click="handleExamine" size="small" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-edit"></i>租金抵扣
        </el-button>-->
        <el-button class="daochu"
          @click="handleInsurance"
          size="small"
          v-if="exportBtn"
        >
          <i class="iconfont icon-daochu"></i>导出
        </el-button>
          <el-upload
            class="upload"
            v-if="ImporBtn"
            action="/vehicle-service/leaseContractInfo/importContractInfo"
            :headers="headers"
            :on-success="handleSuccess"
            :show-file-list="false"
            >
            <span class="upload_txt"><i class="iconfont icon-daoru"></i>导入</span>
            </el-upload>
            <a class="download" v-if="ImporBtn" :href="`/static/excel/台账导入表格.xlsx`">下载模板</a>
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
            <el-table-column prop="orderNo" width="140" label="订单编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="brandName" width="110" label="品牌" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="vehicleTypeName" width="110" label="车型" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="userName" width="80" label="业务员" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="contractCode" width="150" label="合同编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="customerName" width="100" label="承租方" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="customerContacts" width="100" label="联系人姓名" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rentStartDateStr" width="100" label="租赁开始日" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rentEndDateStr" width="100" label="租赁到期日" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rentMonths" width="80" label="租赁月数"></el-table-column>
            <el-table-column prop="vehicleNum" width="80" label="车辆数"></el-table-column>
            <el-table-column prop="chargingPileNum" width="80" label="充电桩数"></el-table-column>
            <el-table-column prop="deposit" width="110" label="合同总押金"></el-table-column>
            <el-table-column prop="vehicleRent" width="110" label="合同月租(汇总)"></el-table-column>
            <el-table-column prop="billPeriods" width="80" label="当前期数">
              <template slot-scope="scope">
                <span v-if="scope.row.billPeriods == 0">押金</span>
                <span v-else>{{scope.row.billPeriods}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="contractStatusStr" min-width="100" label="合同状态" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="auditStatusStr" min-width="110" label="审核状态" :show-overflow-tooltip="true"></el-table-column>
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
import { getCookie, dateToString, getMenuBtnList ,formatJE} from "../../public";
import company from "@/components/aacommon/getEnterpriseBox.vue"
export default {
  name: "contractRegistration",
    components:{
      company
    },
  data() {
    return {
      enterpriseId:"",
      loading: false,
      orderNo: "", //订单编号
      customerContacts: "", //联系人姓名
      contactsPhoneNumber: "", //联系人手机
      userId: "", //所属业务员
      contractCode: "", //合同编号
      vehicleNo: "", //车牌号
      contractStatus: "", //合同状态
      auditStatus: "", //审核状态
      dateValue: "", //合同时段
      userIdOptions: [], //所属业务员
      contractStatusOptions: [
        {
          value: "0",
          label: "待登记",
        },
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
      auditStatusOptions: [
        {
          value: "0",
          label: "待提交",
        },
        {
          value: "1",
          label: "登记待审核",
        },
        {
          value: "2",
          label: "登记审核通过",
        },
        {
          value: "3",
          label: "登记审核不通过",
        },
        {
          value: "4",
          label: "变更待审核",
        },
        {
          value: "5",
          label: "变更审核通过",
        },
        {
          value: "6",
          label: "变更审核不通过",
        },
      ], //审核状态
      type:null,
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isDisable: true,
      searchBtn: false,//计划登记权限按钮
      taxesBtn: false,//即将交租权限按钮
      expireBtn: false,//即将到期权限按钮
      registerBtn: false,//计划登记权限按钮
      changeBtn: false,//计划变更
      auditBtn: false,//计划审核
      checkBtn: false,//计划查看
      exportBtn: false,//导出
      ImporBtn: false,//导入
      tableHeight: window.innerHeight - 445 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {

    ImportFile(){//导入

    },
    handleSuccess(response, file, fileList) {
      //导入
      if(response.status == 0){
        this.$message.success({
          message:response.data,
          center:true,
          type:'true',
          type: 'success'
        })
        this.reset();
      }else{
        this.$message.error({
          message:response.message,
          center:true,
        })
      }
    },
    handleSizeChange(val) {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/leaseContractInfo/queryPageLeaseContractInfo",
        headers: this.headers,
        data: {
          auditStatus: this.auditStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          contractStatus: this.contractStatus,
          customerContacts: this.customerContacts,
          endContractMode: this.endContractMode,
          type:this.type,
          orderNo: this.orderNo,
          rentStartDateStr: this.dateValue[0] ? this.dateValue[0] : "",
          rentEndDateStr: this.dateValue[1] ? this.dateValue[1] : "",
          userId: this.userId,
          vehicleNo: this.vehicleNo,
          currentPage: this.currentPage,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          pageSize: val,
        },
      })
        .then((result) => {
         this.loading = false
          if (result.data.status == 0) {
            result.data.data.records.map(item=>{
              item.deposit = formatJE(item.deposit)
              item.vehicleRent = formatJE(item.vehicleRent)
            })
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
        url: "/vehicle-service/leaseContractInfo/queryPageLeaseContractInfo",
        headers: this.headers,
        data: {
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          auditStatus: this.auditStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          contractStatus: this.contractStatus,
          customerContacts: this.customerContacts,
          endContractMode: this.endContractMode,
          type:this.type,
          orderNo: this.orderNo,
          rentStartDateStr: this.dateValue[0] ? this.dateValue[0] : "",
          rentEndDateStr: this.dateValue[1] ? this.dateValue[1] : "",
          userId: this.userId,
          vehicleNo: this.vehicleNo,
          currentPage: val,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            result.data.data.records.map(item=>{
              item.deposit = formatJE(item.deposit)
              item.vehicleRent = formatJE(item.vehicleRent)
            })
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
          console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    search(type) {
      this.currentPage = 1
      this.type = type
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/leaseContractInfo/queryPageLeaseContractInfo",
        headers: this.headers,
        data: {
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          auditStatus: this.auditStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          contractStatus: this.contractStatus,
          customerContacts: this.customerContacts,
          endContractMode: this.endContractMode,
          id: null,
          type:this.type,
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
              item.vehicleRent = formatJE(item.vehicleRent)
            })
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
          } else {
            this.loading = false
            this.$message({
              message: res.data.message,
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
      this.enterpriseId=""
      this.initData();
      this.auditStatus = "";
      this.contactsPhoneNumber = "";
      this.contractCode = "";
      this.contractStatus = "";
      this.customerContacts = "";
      this.endContractMode = "";
      this.orderNo = "";
      this.userId = "";
      this.dateValue = "";
      this.vehicleNo = "";
      this.type = null
    },
    handleAbout(){
      //即将交租合同
      this.type = 2;
      this.search(2);
    },
    handleDataOut(){
      //即将到期合同
      this.type = 3;
      this.search(3);
    },
    handleAdd() {
      //计划登记
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "计划登记不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      if (this.multipleSelection[0].contractStatus != 0) {
        this.$message({
          message: "合同状态不为待登记，不可登记",
          center: true,
          type: "error",
        });
        return;
      }
      if (!(this.multipleSelection[0].auditStatus == 0 || this.multipleSelection[0].auditStatus == 3)) {
        this.$message({
          message: "该审核状态下，不可进行登记操作",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/planRegister",
        query: { form: "add", id: this.multipleSelection[0].id },
      });
    },
    handleEdit() {
      //计划变更
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "计划变更不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      if (this.multipleSelection[0].contractStatus != 1) {
        this.$message({
          message: "合同状态不为正常进行中，不可进行计划变更操作",
          center: true,
          type: "error",
        });
        return;
      }
      if (!(this.multipleSelection[0].auditStatus == 2 || this.multipleSelection[0].auditStatus == 5 || this.multipleSelection[0].auditStatus == 6 )) {
        this.$message({
          message: "该审核状态不可进行计划变更操作",
          center: true,
          type: "error",
        });
        return;
      }

      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/planChange",
        query: { form: "change", id: this.multipleSelection[0].id },
      });
    },
    handleImport() {
      //计划审核
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "计划审核不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      if (!((this.multipleSelection[0].contractStatus == 0 && this.multipleSelection[0].auditStatus == 1) || (this.multipleSelection[0].contractStatus == 1 && this.multipleSelection[0].auditStatus == 4))) {
        this.$message({
          message: "不可进行计划审核操作",
          center: true,
          type: "error",
        });
        return;
      }

      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/planAudit",
        query: { form: "audit", id: this.multipleSelection[0].id },
      });
    },
    handleExport() {
      //计划查看
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "计划查看不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/planLook",
        query: { form: "look", id: this.multipleSelection[0].id },
      });
    },
    handleExamine() {
      //租金抵扣
    },
    handleInsurance() {
      //导出
      axios({
        method: "post",
        url: "/vehicle-service/leaseContractInfo/exportLeaseContractInfo",
        headers: this.headers,
        data: {
          auditStatus: this.auditStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          contractStatus: this.contractStatus,
          customerContacts: this.customerContacts,
          endContractMode: this.endContractMode,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          id: null,
          type:this.type,
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
          // console.log(result.data);
          if (result.data.type === "application/json") {
              this.$message({
                type: "error",
                message: "导出失败",
                center:true
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
                link.download = "合同登记信息.xls";
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
        url: "/vehicle-service/leaseContractInfo/queryPageLeaseContractInfo",
        headers: this.headers,
        data: {
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          auditStatus: null,
          contactsPhoneNumber: null,
          contractCode: null,
          contractStatus: null,
          customerContacts: null,
          endContractMode: null,
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
              setTimeout(() => {
            window.onload()
          }, 10)
            result.data.data.records.map(item=>{
              item.deposit = formatJE(item.deposit)
              item.vehicleRent = formatJE(item.vehicleRent)
            })
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
          } else {
            this.loading = false
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
            if(item.name == '即将交租合同') this.taxesBtn = true
            if(item.name == '即将到期合同') this.expireBtn = true
            if(item.name == '计划登记') this.registerBtn = true
            if(item.name == '计划变更') this.changeBtn = true
            if(item.name == '计划审核') this.auditBtn = true
            if(item.name == '计划查看') this.checkBtn = true
            if(item.name == '导出') this.exportBtn = true
            if(item.name == '导入') this.ImporBtn = true
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
.upload_txt{
    display: flex;
    width: 70px;
    height: 30px;
    justify-content: center;
    align-items: center;
    color: #368cfe;
    border-radius: 4px;
    font-size: 12px;
    border: 1px solid rgba(54, 140, 254, 0.5);
    margin-left: 10px;
}
.upload_txt i{
    font-size: 12px;
    margin-right: 2px;
}
.upload{
  display:inline-block
}
.footerBottom .el-button:last-child ,.footerBottom .daochu{
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:last-child:hover ,.footerBottom .daochu:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
/* .footerBottom .el-button:hover {
  color: #c0c4cc !important;
} */
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
.download{
  font-size: 12px;
          margin-left: 10px;
          text-decoration: none;
          color: #368cfe;
          padding: 7.5px;
          border: 1px solid #9ac5fe;
          border-radius: 5px;
}
.download:hover{
  background-color: #ecf5ff;
}
</style>
