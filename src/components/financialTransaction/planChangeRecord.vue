<template>
  <div
    id="header"
    v-loading="loading"
  >
    <div class="header">
      <div class="headerTop">
        <div class="nav">
          <span class="demonstration">合同编号</span>
          <el-input v-model="contractCode" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号</span>
          <el-input v-model="vehicleNo" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">变更项</span>
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
          <span class="demonstration">操作时段</span>
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
          >
            <!-- <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
            <el-table-column prop width="60" label="序号" align="center">
              <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * pageSize + 1 }}</template>
            </el-table-column> -->
            <el-table-column prop="contractCode" width="150" label="合同编号"></el-table-column>
            <el-table-column prop="vehicleNo" width="100" label="车牌号"></el-table-column>
            <el-table-column prop="changeTypeStr" width="100" label="变更项"></el-table-column>
            <el-table-column prop="beforeChange" width="190" label="变更前">
            </el-table-column>
            <el-table-column prop="afterChange" width="190" label="变更后">
            </el-table-column>
            <el-table-column prop="auditSuggestion" width="100" label="审核意见"></el-table-column>
            <el-table-column prop="auditUserName" width="100" label="审核操作人"></el-table-column>
            <el-table-column prop="auditTimeStr" min-width="120" label="操作时间"></el-table-column>
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
export default {
  name: "planChangeRecord",
  data() {
    return {
      loading: false,
      contractCode: "", //合同编号
      vehicleNo: "", //车牌号
      auditStatus: "", //变更项
      dateValue: "", //操作时段
      userIdOptions: [], //所属业务员
      auditStatusOptions: [
        {
          value: "0",
          label: "变更计划",
        },
        {
          value: "1",
          label: "变更车辆",
        },
        {
          value: "2",
          label: "变更业务员",
        },
      ], //变更项
      type:null,
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isDisable: true,
      searchBtn : false, //查询权限按钮
      exportBtn: false,//导出
      tableHeight: window.innerHeight - 356 +'',
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
        url: "/vehicle-service/contractChangerecordInfo/queryPageChangeRecordInfo",
        headers: this.headers,
        data: {
          contractCode: null,
          changeType:null,
          id: null,
          changeEndTimeStr: null,
          changeStartTimeStr: null,
          vehicleNo: null,
          currentPage: 1,
          pageSize: val,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            this.dataList = result.data.data.records.map((item)=>{
              if(item.beforeChange.substring(0,3) == '第0期'){
                item.beforeChange = item.beforeChange.replace('第0期','押金')
              }
              if(item.afterChange.substring(0,3) == '第0期'){
                item.afterChange = item.afterChange.replace('第0期','押金')
              }
              return item;
            });
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
        url: "/vehicle-service/contractChangerecordInfo/queryPageChangeRecordInfo",
        headers: this.headers,
        data: {
          contractCode: null,
          changeType:null,
          id: null,
          changeEndTimeStr: null,
          changeStartTimeStr: null,
          vehicleNo: null,
          currentPage: val,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          // console.log(result.data.data)
          if (result.data.status == 0) {
            this.dataList = result.data.data.records.map((item)=>{
              if(item.beforeChange.substring(0,3) == '第0期'){
                item.beforeChange = item.beforeChange.replace('第0期','押金')
              }
              if(item.afterChange.substring(0,3) == '第0期'){
                item.afterChange = item.afterChange.replace('第0期','押金')
              }
              return item;
            });
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
        url: "/vehicle-service/contractChangerecordInfo/queryPageChangeRecordInfo",
        headers: this.headers,
        data: {
          contractCode: this.contractCode,
          changeType:this.auditStatus,
          id: null,
          changeStartTimeStr: this.dateValue[0] ? this.dateValue[0] : "",
          changeEndTimeStr: this.dateValue[1] ? this.dateValue[1] : "",
          vehicleNo: this.vehicleNo,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            this.dataList = result.data.data.records.map((item)=>{
              if(item.beforeChange.substring(0,3) == '第0期'){
                item.beforeChange = item.beforeChange.replace('第0期','押金')
              }
              if(item.afterChange.substring(0,3) == '第0期'){
                item.afterChange = item.afterChange.replace('第0期','押金')
              }
              return item;
            });
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
      this.auditStatus = "";
      this.contractCode = "";
      this.vehicleNo = "";
      this.dateValue = '';
    },
    handleInsurance() {
      //导出
      axios({
        method: "post",
        url: "/vehicle-service/contractChangerecordInfo/exportChangeRecord",
        headers: this.headers,
        data: {
          contractCode: this.contractCode,
          changeType:this.auditStatus,
          id: null,
          changeStartTimeStr: this.dateValue[0] ? this.dateValue[0] : "",
          changeEndTimeStr: this.dateValue[1] ? this.dateValue[1] : "",
          vehicleNo: this.vehicleNo,
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
                link.download = "变更记录.xls";
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
        url: "/vehicle-service/contractChangerecordInfo/queryPageChangeRecordInfo",
        headers: this.headers,
        data: {
          contractCode: null,
          changeType:null,
          id: null,
          changeEndTimeStr: null,
          changeStartTimeStr: null,
          vehicleNo: null,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            this.dataList = result.data.data.records.map((item)=>{
              if(item.beforeChange.substring(0,3) == '第0期'){
                item.beforeChange = item.beforeChange.replace('第0期','押金')
              }
              if(item.afterChange.substring(0,3) == '第0期'){
                item.afterChange = item.afterChange.replace('第0期','押金')
              }
              return item;
            });
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
  height: 66px;
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
  width: 50px;
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
  height: calc(100% - 66px);
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
