<template>
  <div id="header" v-loading="loading">
    <div class="header">
      <div class="headerTop scoped">
        <div class="nav">
          <span class="demonstration">所属公司</span>
          <getEnterpriseBox v-model="searchdata.enterpriseId"></getEnterpriseBox>
        </div>
        <div class="nav">
          <span class="demonstration">品牌</span>
           <getBrandInfo v-model="searchdata.brandId"></getBrandInfo>
        </div>
        <div class="nav">
          <span class="demonstration">车型</span>
           <getvehicleType v-model="searchdata.vehicleTypeId" :brandId="searchdata.brandId"></getvehicleType>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号码</span>
           <el-input v-model="searchdata.vehicleNo"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">使用方式</span>
          <makeSelect :options="[{name:'出售',value:3},{name:'以租代售',value:4}]" v-model="searchdata.vehicleUsageMode"></makeSelect>
        </div>
        <div class="nav">
          <span class="demonstration">合同状态</span>
          <makeSelect :options="[{name:'已签合同',value:1},{name:'暂无合同',value:2}]" v-model="searchdata.contractStatus"></makeSelect>
        </div>
        <div class="nav">
          <span class="demonstration">过户状态</span>
          <makeSelect :options="[{name:'已过户',value:1},{name:'未过户',value:2}]" v-model="searchdata.ransferStatus"></makeSelect>
        </div>
        <div class="nav">
          <span class="demonstration">过户后车牌号</span>
          <el-input v-model="searchdata.ransferVehicleNo"></el-input>
        </div>
        <div class="headerBotton" style="margin-left: 45px;">
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-table :data="dataList"  border stripe :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
        size="small" style="width: 100%; height: 100%;" height="100%">
        <el-table-column prop="enterpriseName" label="所属公司" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="brandName"  label="品牌"></el-table-column>
        <el-table-column prop="vehicleTypeName" label="车型"></el-table-column>
        <el-table-column prop="vehicleNo" label="车牌号码"></el-table-column>
        <el-table-column prop="vehicleUsageMode" label="使用方式"></el-table-column>
        <el-table-column prop="contractStatus" label="合同状态"></el-table-column>
        <el-table-column prop="insurance" label="是否包买保险"></el-table-column>
        <el-table-column prop="transferFee" label="是否包过户费"></el-table-column>
        <el-table-column prop="contractExpireDate" label="合同到期日期"></el-table-column>
        <el-table-column prop="transferStatus" label="过户状态"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a class="link" href='javascript:;' v-if="scope.row.transferStatus=='未过户'" @click="guohu(scope.row)">过户</a>
            <a style="text-decoration: none;color: #409eff;" href='javascript:;' v-else @click="guohuRecord(scope.row)">过户记录</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer_page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchdata.currentPage"
          :page-sizes="[10, 20, 50, 100, 200]" :page-size="searchdata.pageSize" :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
      </div>
    </div>
    <el-dialog title="车辆过户" :close-on-click-modal="false" :close-on-press-escape="false"
      :visible.sync="dialogVisible" width="60%"
      :before-close="handleClose"> 
      <components :is="ransfer" :contractId="contractId" :vehicleId="vehicleId"  @callback="callback"></components>
    </el-dialog>
    <el-dialog title="车辆过户记录"
      :visible.sync="dialogVisible2" width="60%"
      :before-close="handleClose2">
      <components :is="ransferDetail" :contractId="contractId2" :vehicleId="vehicleId2"></components>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString, getMenuBtnList,formatJE } from "@/public";
  import ransfer from '@/components/trafficProcessing/vehicleManagement/ransfer.vue'
  import ransferDetail from '@/components/trafficProcessing/vehicleManagement/ransferDetail.vue'
export default {
    name: "ransferInfo", 
  data() {
    return {
        ransferDetail:ransferDetail,
        ransfer:ransfer,
        vehicles:null,
        loading:false,
        enterpriseId:"",
        searchdata:{
          "enterpriseId": null,
          "brandId": null,
          "vehicleTypeId": null,
          "vehicleNo": "",
          "vehicleUsageMode": null,
          "contractStatus": null,
          "ransferStatus": null,
          "ransferVehicleNo": "",
          "currentPage": 1,
          "pageSize": 10
        },
        dataList: [],
        total: 0,
        searchBtn : false,//查询权限按钮
        tableHeight: window.innerHeight - 495 +'',
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        lockclass:false,
        unlockclass:false,
        dialogVisible:false,
        contractId:"",
        vehicleId:"",
        contractId2:"",
        vehicleId2:"",
        dialogVisible2:false
    };
  },
  methods: {
    handleClose(done){
      this.contractId=""
      this.vehicleId=""
      done()
    },
    handleClose2(done){
      this.contractId2=""
      this.vehicleId2=""
      done()
    },
    guohu(row){
      this.contractId=row.contractId
      this.vehicleId=row.vehicleId
      this.dialogVisible=true
    },
    guohuRecord(row){
      this.contractId2=row.contractId
      this.vehicleId2=row.vehicleId
      this.dialogVisible2=true
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
    callback(){
      this.dialogVisible=false;
      this.getlist();
    },
    getlist(){
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/ransferInfo/queryPage",
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
            message: "拉取租售列表数据失败，请稍后再试",
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
          })
      },
      immediate:true,
      deep:true
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
  height: calc(100% - 60px);
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

.footerBottom .el-button:hover  {
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
