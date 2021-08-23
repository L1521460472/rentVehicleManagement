<template>
  <div id="header" v-loading="loading">
    <div class="header">
      <div class="headerTop scoped">
        <div class="nav">
          <span class="demonstration">所属公司</span>
          <company v-model="searchdata.enterpriseId"></company>
          <!-- <getEnterpriseBox v-model="searchdata.enterpriseId" type="2"></getEnterpriseBox> -->
        </div>
        <div class="nav">
          <span class="demonstration">选择年月</span>
           <el-date-picker style="width: 250px;" v-model="yearAndMonth" type="daterange" value-format="yyyy-MM-dd"
           start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>
        <div class="nav">
          <span class="demonstration">品牌</span>
          <getBrandInfo v-model='searchdata.brandId' ></getBrandInfo>
        </div>
        <div class="nav">
          <span class="demonstration">车型</span>
          <getvehicleType v-model='searchdata.vehicleTypeId' :brandId='searchdata.brandId'></getvehicleType>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号</span>
          <el-input v-model="searchdata.vehicleNo"></el-input>
        </div>
        <div class="headerBotton" style="margin-left: 45px;">
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
          <el-button size="small" class="daochu" v-if="btn1" @click="daochu"><i class="iconfont icon-daochu"></i>导出</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-table :data="dataList"  border stripe :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
        size="small" style="width: 100%; height: 100%;" height="100%">
            <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="enterpriseName" label="所属公司" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="brandName"  label="品牌"></el-table-column>
        <el-table-column prop="vehicleTypeName" label="车型"></el-table-column>
        <el-table-column prop="vehicleNo" label="车牌号码" width="100"></el-table-column>
        <el-table-column prop="repairTime" label="维修日期" width="150"></el-table-column>
        <el-table-column prop="repairMileage" width="130px" label="维修时里程（公里）"></el-table-column>
        <el-table-column prop="repairItemsDesc" label="维修项目" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="repairer" label="维修厂"></el-table-column>
        <el-table-column prop="totalFee" label="费用合计（元）" width="120px"></el-table-column>
        <el-table-column prop="payFee" label="实际支付（元）" width="120px"></el-table-column>
        <el-table-column prop="createByStr" label="添加人"></el-table-column>
        <el-table-column prop="createdTime" label="添加时间" width="140px"></el-table-column>
        <el-table-column prop="auditUserIdStr" label="核实人"></el-table-column>
        <el-table-column prop="auditTime" label="核实时间" width="140px"></el-table-column>
      </el-table>
      <div class="footer_page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchdata.currentPage"
          :page-sizes="[10, 20, 50, 100, 200]" :page-size="searchdata.pageSize" :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import company from "@/components/aacommon/getEnterpriseBox.vue"
import { getCookie, dateToString, getMenuBtnList } from "@/public";
export default {
  name: "maintenancestatistics",
  components:{
    company
  },

  data() {
    return {
        canshenhe:true,
        candetail:true,
        loading:false,
        searchdata:{
          "enterpriseId": null,
          "currentPage": 1,
          "pageSize": 10,
          "repairStartDate": "",
          "repairEndDate": "",
          "createBy": null,
          "contractCode": "",
          "vehicleNo": "",
          "auditStatus": null,
          "brandId": null,
          "vehicleTypeId": null,
        },
        dataList: [],
        total: 0,
        searchBtn : false,//查询权限按钮
        tableHeight: window.innerHeight - 295 +'',
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        btn1:false,
        yearAndMonth:[]
    };
  },
  methods: {
    daochu(){
        //导出
        axios({
          method: "post",
          url: "/vehicle-service/repairManagement/repairStatisticsExport",
          headers: this.headers,
          data: this.searchdata,
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
                  link.download = "维修统计导出.xls"
                  link.style.display = "none";
                  document.body.appendChild(link);
                  link.click();
                  window.URL.revokeObjectURL(link.href);
                }
              }
          })
          .catch((err) => {
            this.$message({
              message: err.message,
              center: true,
              type: "error",
            });
          });
    },
    handleSizeChange(val) {
       this.searchdata.pageSize=val;
       this.getlist();
    },
    handleCurrentChange(val) {
      this.searchdata.currentPage=val
      this.getlist();
    },
    search() {
      this.searchdata.currentPage=1;
      this.getlist();
    },
    getlist(){
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/repairManagement/repairManagementPageQuery",
        headers: this.headers,
        data:this.searchdata,
      })
        .then((result) => {
         this.loading = false
          if (result.data.status == 0) {
              setTimeout(() => {
            window.onload()
          }, 10)
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.loading = false
          this.$message({
            message: "拉取维修统计列表数据失败，请稍后再试",
            center: true,
            type: "error",
          });
        });
    },
    reset() {
       for(let pname in this.searchdata){
         if(pname=="enterpriseIdList"){
            this.searchdata[pname]=[]
         }
         else if(pname!='currentPage'&&pname!='pageSize'){
            this.searchdata[pname]=''
         }
       }
       this.enterpriseId=""
       this.searchdata.currentPage=1
       this.yearAndMonth=null
       this.search()
    },
  },
  mounted() {
    this.getlist();
  },
    computed: {
    menuDataList() {
      return this.$store.state.menuData;
    },
  },
  watch: {
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '查询') this.searchBtn = true
            if(item.name == '导出') this.btn1 = true
          })
      },
      immediate:true,
      deep:true
    },
    yearAndMonth(){
      if(this.yearAndMonth){
        this.searchdata.repairStartDate= this.yearAndMonth[0]
         this.searchdata.repairEndDate= this.yearAndMonth[1]
      }
      else{
        this.searchdata.repairStartDate= "";
         this.searchdata.repairEndDate= "";
      }
    }
  }
};
</script>
<style scoped>
#header {
  width: 100%;
  height: calc(100% - 170px);
}
.header {
  width: 100%;
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
.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
  color: #C0C4CC!important;
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
.reset,.daochu {
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
  height: calc(100% - 13px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footerBottom {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
}
.footerBottom .el-button,.daochu{
      color: #368cfe;
      border-radius: 4px;
      border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:hover,.daochu:hover  {
  color: #368cfe;
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
  height: 45px;
  display: flex;
  border-top: 1px solid #e5e5e5;
  align-items: center;
  text-align: left;
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
.el-table{
  height: calc(100% - 48px)!important;
  overflow: auto;
}
.link{
  color: white;
  text-decoration: none;
  display: inline-block;
  height: 21px;
  width: 49px;
  line-height: 21px;
  background-color: #409EFF;
  border-radius: 5px;
  border: 1px solid #409EFF;
  text-align: center;
}
.link:hover{
  background-color: #368cfe;
}

  /deep/ .el-dialog__body{
    padding-top: 0px!important;
  }
</style>
