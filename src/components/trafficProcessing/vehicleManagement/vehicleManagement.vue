<template>
  <div
    id="header"
    v-loading="loading"
  >
    <div class="header">
      <div class="headerTop">
        <div class="nav">
          <span class="demonstration">品牌</span>
          <el-select
            v-model="brandName"
            size="small"
            @change="getVehicleType"
            placeholder
          >
            <el-option
              v-for="item in brandNameOptions"
              :key="item.id"
              :label="item.brandName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">车型</span>
          <el-select
            v-model="vehicleTypeName"
            size="small"
            placeholder
          >
            <el-option
              v-for="item in vehicleTypeNameOptions"
              :key="item.id"
              :label="item.vehicleTypeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号码</span>
          <el-input
            v-model="vehicleValue"
            size="small"
            maxlength="50"
            placeholder=""
          ></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">所属公司</span>
          <el-select  clearable v-model="companyValue" size="small" placeholder="">
            <el-option
              v-for="item in companyOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">使用方式</span>
          <el-select clearable v-model="useValue" size="small" placeholder="">
            <el-option
              v-for="item in useOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">出租状态</span>
          <el-select clearable v-model="leaseStateValue" size="small" placeholder="">
            <el-option
              v-for="item in leaseStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">年检状态</span>
          <el-select clearable v-model="ASStateValue" size="small" placeholder="">
            <el-option
              v-for="item in ASStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">交强险状态</span>
          <el-select clearable v-model="insuranceValue" size="small" placeholder="">
            <el-option
              v-for="item in insuranceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">商业险状态</span>
          <el-select clearable v-model="ComInsuranceValue" size="small" placeholder="">
            <el-option
              v-for="item in ComInsuranceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">维修状态</span>
          <el-select clearable v-model="maintenanceStateValue" size="small" placeholder="">
            <el-option
              v-for="item in maintenanceStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">有无ETC</span>
          <el-select clearable v-model="ETCValue" size="small" placeholder="">
            <el-option
              v-for="item in ETCOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">有无电子标签</span>
          <el-select clearable v-model="tagValue" size="small" placeholder="">
            <el-option
              v-for="item in tagOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="headerBotton">
            <el-button
          size="small"
          type="primary"
          class="search"
          @click="search"
          v-if="searchBtn"
        >查询</el-button>
        <el-button
          class="reset"
          size="small"
          type="primary"
          plain
          @click="reset"
        >重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button @click="handleAdd" size="small" v-if="addBtn">
          <i class="iconfont icon-add"></i>新增
        </el-button>
        <el-button @click="handleEdit" v-if="editBtn" size="small" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-edit"></i>修改
        </el-button>
        <el-button @click="handleExamine" v-if="addAsBtn" size="small" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-cheliangnianjian"></i>新增年检记录
        </el-button>
        <el-button @click="handleInsurance" v-if="addInsuranceBtn" size="small" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-baoxian"></i>新增保险记录
        </el-button>
        <el-button @click="handleImport"  v-if="importVehicleBtn" class="handleExport" size="small">
          <i class="iconfont icon-daoru"></i>
          <el-upload
                class="upload"
                action="/vehicle-service/vehicleInfo/importVehicleInfo"
                :headers="headers"
                :on-success="handleSuccess"
                :file-list="fileList"
                :show-file-list="false"
              >
                <span class="upload_txt">导入</span>
              </el-upload>
        </el-button>
        <el-button @click="handleExport"  v-if="exportVehicleBtn" class="handleExport" size="small">
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
            @selection-change="handleSelectionChange"
            :height="tableHeight"
          >
            <el-table-column
              type="selection"
              prop="id"
              align="center"
              width="60"
            ></el-table-column>
            <el-table-column prop="" width="60" label="序号" align="center">
              <template slot-scope="scope">
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="brandName"
              width="100"
              label="品牌"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="typeName"
              width="100"
              label="车型"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="vehicleNo"
              width="100"
              label="车牌号码"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="licenseNo" width="110" label="行驶证">
            </el-table-column>
            <el-table-column prop="termOfValidityStr" width="140" label="年检到期日期">
            </el-table-column>
            <el-table-column prop="remainingDaysValid" width="100" label="年检剩余天数">
            </el-table-column>
            <el-table-column prop="policyEndDate0Str" width="140" label="交强险到期日期">
            </el-table-column>
            <el-table-column prop="remainingDaysPolicyEndDate0" width="110" label="交强险剩余天数">
            </el-table-column>
            <el-table-column prop="policyEndDate1Str" width="140" label="商业险到期日期">
            </el-table-column>
            <el-table-column prop="remainingDaysPolicyEndDate1" width="110" label="商业险剩余天数">
            </el-table-column>
            <el-table-column prop="enterpriseName" width="100" label="所属公司" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="parkingLotName" width="180" label="存车地点">
            </el-table-column>
            <el-table-column prop="salesMan" min-width="100" label="业务员">
            </el-table-column>
            <el-table-column prop="vehicleUsageMode" width="80" label="使用方式">
              <template slot-scope="scope">
              <span v-if="scope.row.vehicleUsageMode == 0">租赁</span>
              <span v-if="scope.row.vehicleUsageMode == 1">替换</span>
            </template>
            </el-table-column>
            <el-table-column prop="vehicleUsageStatus" width="80" label="出租状态">
              <template slot-scope="scope">
              <span v-if="scope.row.vehicleUsageStatus == 0">已租</span>
              <span v-if="scope.row.vehicleUsageStatus == 1">待租</span>
            </template>
            </el-table-column>
            <el-table-column prop="vehicleRepairStatusStr" width="100" label="维修状态">
            </el-table-column>
            <el-table-column prop="isHasEtc" width="80" label="有无ETC">
              <template slot-scope="scope">
              <span v-if="scope.row.isHasEtc == 0">有</span>
              <span v-if="scope.row.isHasEtc == 1">无</span>
            </template>
            </el-table-column>
            <el-table-column prop="isHasRfid" width="100" label="有无电子标签">
              <template slot-scope="scope">
              <span v-if="scope.row.isHasRfid == 0">有</span>
              <span v-if="scope.row.isHasRfid == 1">无</span>
            </template>
            </el-table-column>
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
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString, getMenuBtnList } from "../../../public";
export default {
  name: "vehicleManagement",
  data() {
    return {
      loading: false,
      brandName:'',//品牌
      vehicleTypeName:'',//车型
      vehicleValue: "", //车牌号码
      companyValue: "", //所属公司
      useValue:"",//使用方式
      leaseStateValue:"",//出租状态
      ASStateValue:"",//年检状态
      insuranceValue:"",//交强险状态
      ComInsuranceValue:"",//商业险状态
      maintenanceStateValue:"",//维修状态
      ETCValue:"",//有无ETC
      tagValue:"",//有无电子标签
      companyOptions: [],//所属公司
      useOptions: [
        {
          value: "0",
          label: "租赁",
        },
        {
          value: "1",
          label: "替换",
        },
      ],//使用方式
      leaseStateOptions: [
        {
          value: "0",
          label: "已租",
        },
        {
          value: "1",
          label: "待租",
        },
      ],//出租状态
      ASStateOptions: [{
          value: "1",
          label: "正常",
        },
        {
          value: "2",
          label: "即将到期",
        },
        {
          value: "3",
          label: "逾期",
        }],//年检状态
      insuranceOptions: [{
          value: "1",
          label: "正常",
        },
        {
          value: "2",
          label: "即将到期",
        },
        {
          value: "3",
          label: "逾期",
        }],//交强险状态
      ComInsuranceOptions: [
        {
          value: "1",
          label: "正常",
        },
        {
          value: "2",
          label: "即将到期",
        },
        {
          value: "3",
          label: "逾期",
        }
      ],//商业险状态
      maintenanceStateOptions: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "维修",
        },
      ],//维修状态
      ETCOptions: [
        {
          value: "0",
          label: "有",
        },
        {
          value: "1",
          label: "无",
        },
      ],//有无ETC
      tagOptions: [
        {
          value: "0",
          label: "有",
        },
        {
          value: "1",
          label: "无",
        },
      ],//有无电子标签
      brandNameOptions: [
        //品牌
      ],
      vehicleTypeNameOptions: [
        //车型
      ],
      addBtn: true,
      editBtn: true,
      dataList: [],
      fileList:[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isDisable: true,
      tableHeight: window.innerHeight - 446 +'',
      searchBtn : false, //查询权限按钮
      addBtn : false, //新增权限按钮
      editBtn : false, // 修改权限按钮 
      addAsBtn : false, //新增年检记录权限按钮
      addInsuranceBtn : false, //新增保险记录权限按钮
      importVehicleBtn: false,
      exportVehicleBtn: false,
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
        url: "/vehicle-service/vehicleInfo/vehiclePageQuery",
        headers: this.headers,
        data: {
          brandId:this.brandName,
          typeId:this.vehicleTypeName,
          enterpriseIds: null,
          vehicleNo: this.vehicleValue,
          enterpriseId: this.companyValue,
          vehicleUsageMode: this.useValue,
          vehicleUsageStatus: this.leaseStateValue,
          vehicleRepairStatus: this.maintenanceStateValue,
          isHasEtc: this.ETCValue,
          isHasRfid: this.tagValue,
          annualInspection: this.ASStateValue,
          payHighInsurance: this.insuranceValue,
          commercialInsurance: this.ComInsuranceValue,
          currentPage: 1,
          pageSize: val,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
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
        url: "/vehicle-service/vehicleInfo/vehiclePageQuery",
        headers: this.headers,
        data: {
          brandId:this.brandName,
          typeId:this.vehicleTypeName,
          enterpriseIds: null,
          vehicleNo: this.vehicleValue,
          enterpriseId: this.companyValue,
          vehicleUsageMode: this.useValue,
          vehicleUsageStatus: this.leaseStateValue,
          vehicleRepairStatus: this.maintenanceStateValue,
          isHasEtc: this.ETCValue,
          isHasRfid: this.tagValue,
          annualInspection: this.ASStateValue,
          payHighInsurance: this.insuranceValue,
          commercialInsurance: this.ComInsuranceValue,
          currentPage: val,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
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
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    handleSuccess(response, file, fileList) {
      //导入
      // console.log(response)
      if(response.status == 0){
        this.$message.error({
          message:response.data,
          center:true,
          type:'true',
          type: 'success'
        })
        this.reset();
      }else{
        this.$message.error({
          message:'导入失败！',
          center:true,
        })
      }
    },
    search() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/vehicleInfo/vehiclePageQuery",
        headers: this.headers,
        data: {
            brandId:this.brandName,
            typeId:this.vehicleTypeName,
            enterpriseIds: null,
            vehicleNo: this.vehicleValue,
            enterpriseId: this.companyValue,
            vehicleUsageMode: this.useValue,
            vehicleUsageStatus: this.leaseStateValue,
            vehicleRepairStatus: this.maintenanceStateValue,
            isHasEtc: this.ETCValue,
            isHasRfid: this.tagValue,
            annualInspection: this.ASStateValue,
            payHighInsurance: this.insuranceValue,
            commercialInsurance: this.ComInsuranceValue,
            currentPage: 1,
            pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          // console.log(result.data)
          if (result.data.status == 0) {
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
    getVehicleType() {
      //获取车型
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleTypeInfo/queryVehicleTypeListByBrandId?id=" +
          this.brandName,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.vehicleTypeNameOptions = result.data.data;
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
      this.vehicleValue = '';
      this.companyValue = '';
      this.useValue = '';
      this.leaseStateValue = '';
      this.maintenanceStateValue = '';
      this.ETCValue = '';
      this.tagValue = '';
      this.ASStateValue = '';
      this.insuranceValue = '';
      this.ComInsuranceValue = '';
      this.brandName = '';
      this.vehicleTypeName = '';
    },
    handleAdd() {//新增
      this.$router.push({
        path:"/addVehicleManagement",
        query:{form:'add'}
      })
    },
    handleEdit() {//修改
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: '编辑不能多选!',
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path:"/addVehicleManagement",
        query:{form:'edit',id : this.multipleSelection[0].id }
      });
    },
    handleImport(){//导入

    },
    handleExport(){//导出
      //导出
      axios({
        method: "post",
        url: "/vehicle-service/vehicleInfo/exportVehicleInfo",
        headers: this.headers,
        data: {
          brandId:null,
          typeId:null,
          enterpriseIds:null,
          vehicleNo: this.vehicleValue,
          enterpriseId: this.companyValue,
          vehicleUsageMode: this.useValue,
          vehicleUsageStatus: this.leaseStateValue,
          vehicleRepairStatus: this.maintenanceStateValue,
          isHasEtc: this.ETCValue,
          isHasRfid: this.tagValue,
          annualInspection: this.ASStateValue,
          payHighInsurance: this.insuranceValue,
          commercialInsurance: this.ComInsuranceValue,
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
                link.download = "车辆管理信息.xls";
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
    handleExamine(){//新增年检记录
      this.$router.push({
        path: "/addAS",
        // query: { form: "add",vehicleNo: this.formVeInformation.vehicleNo,brand:this.formVehicleType.brandName},
        query: { form: "add",id: this.multipleSelection[0].id },
      });
    },
    handleInsurance(){//新增保险记录
      this.$router.push({
        path: "/addInsurance",
        query: { form: "add",id: this.multipleSelection[0].id },
      });
    },
    initData(){
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/vehicleInfo/vehiclePageQuery",
        headers: this.headers,
        data: {
          enterpriseIds: null,
            vehicleNo: null,
            enterpriseId: null,
            vehicleUsageMode: null,
            vehicleUsageStatus: null,
            vehicleRepairStatus: null,
            isHasEtc: null,
            isHasRfid: null,
            annualInspection: null,
            payHighInsurance: null,
            commercialInsurance: null,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false
          if (result.data.status == 0) {
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
    }
  },
  mounted() {
    this.initData();
    axios({//业务员
        method: "get",
        url: "/vehicle-service/comboBoxController/getEnterpriseBox",
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.companyOptions = result.data.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    axios({
      //品牌
      method: "post",
      url: "/vehicle-service/brandInfo/brandInfoListQuery",
      headers: this.headers,
    })
      .then((result) => {
        // console.log(result.data);
        this.brandNameOptions = result.data.data;
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
    internationalTitle() {
      return this.$store.state.languageTitle;
    },
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
            if(item.name == '新增') this.addBtn = true
            if(item.name == '修改') this.editBtn = true
            if(item.name == '新增年检记录') this.addAsBtn = true
            if(item.name == '新增保险记录') this.addInsuranceBtn = true
            if(item.name == '导入') this.importVehicleBtn = true
            if(item.name == '导出') this.exportVehicleBtn = true
          })
      },
      immediate:true,
      deep:true
    },
    "$store.getters.isStatus": function () {
      if (this.$store.state.isStatus == true && this.$route.path == '/addVehicleManagement') {
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
  margin-bottom: 16px;
}
.demonstration {
  display: inline-block;
  width: 80px;
  font-size: 12px;
  /* margin-left: 20px; */
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
  /* margin-left: 20px; */
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
  height: calc(100% - 156px);
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
.footerBottom .el-button:nth-child(1) {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.handleExport{
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:nth-child(1):hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:hover {
  color: #c0c4cc !important;
}
.footerBottom .handleExport:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
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
.upload{
  display: inline-block;
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
