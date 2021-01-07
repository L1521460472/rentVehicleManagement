<template>
  <div id="header" v-loading="loading">
    <div class="header">
      <div class="headerTop scoped">
        <div class="nav">
          <span class="demonstration">所属公司</span>
          <getEnterpriseBox v-model="enterpriseId"></getEnterpriseBox>
        </div>
        <div class="nav">
          <span class="demonstration">品牌</span>
           <getBrandInfo v-model="searchdata.brandId"></getBrandInfo>
        </div>
        <div class="nav">
          <span class="demonstration">车型</span>
           <getvehicleType v-model="searchdata.typeId" :brandId="searchdata.brandId"></getvehicleType>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号码</span>
           <el-input v-model="searchdata.vehicleNo"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">逾期状态</span>
          <makeSelect :options="contractStatus" v-model="searchdata.contractStatus"></makeSelect>
        </div>
        <!-- <div class="nav">
          <span class="demonstration">锁车状态</span>
          <makeSelect :options="lockStatusOption" v-model="searchdata.lockStatus"></makeSelect>
        </div> -->
        <div class="headerBotton" style="margin-left: 45px;">
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button @click="suoche" size="small" v-if="lockBtn" :class="{ active: lockclass }" :disabled="!lockclass" >
         锁车
        </el-button>
        <el-button @click="jiesuo" size="small" v-if="unlockBtn" :class="{ active: unlockclass }" :disabled="!unlockclass" >
         解锁
        </el-button>
      </div>
      <el-table :data="dataList"  border stripe :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
        size="small" style="width: 100%; height: 100%;" height="100%" @selection-change="handleSelectionChange" >
        <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
        <el-table-column prop width="60" label="序号" align="center">
          <template slot-scope="scope">{{ scope.$index + (searchdata.currentPage - 1) * searchdata.pageSize + 1 }}</template>
        </el-table-column>
        <el-table-column prop="enterpriseName" label="所属公司" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="brandName"  label="品牌"></el-table-column>
        <el-table-column prop="typeName" label="车型"></el-table-column>
        <el-table-column prop="vehicleNo" label="车牌号码"></el-table-column>
        <el-table-column prop="contractCode" label="合同编号"></el-table-column>
        <el-table-column prop="contractStatusStr" label="逾期状态"></el-table-column>
        <el-table-column prop="lockStatusStr" label="锁车状态"></el-table-column>
      </el-table>
      <div class="footer_page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchdata.currentPage"
          :page-sizes="[10, 20, 50, 100, 200]" :page-size="searchdata.pageSize" :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
      </div>
    </div>
    <el-dialog title="锁车" :close-on-click-modal="false" :close-on-press-escape="false"
      :visible.sync="dialogVisible" width="40%" :destroy-on-close="true"
      :before-close="handleClose">
      <lockVehicle :vehicles="vehicles" remark="锁车" @callback="callback"></lockVehicle>
    </el-dialog>
    <el-dialog title="解锁" :close-on-click-modal="false" :close-on-press-escape="false"
      :visible.sync="dialogVisible2" width="40%" :destroy-on-close="true"
      :before-close="handleClose2">
      <unlockVehicle :vehicles="vehicles" remark="解锁" @callback="callback"></unlockVehicle>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString, getMenuBtnList,formatJE } from "@/public";
  import lockVehicle from '@/components/trafficProcessing/vehicleLockRecord/lockVehicle.vue'
  import unlockVehicle from '@/components/trafficProcessing/vehicleLockRecord/unlockVehicle.vue'
export default {
    name: "vehicleLockPageList",
    components:{
      lockVehicle,unlockVehicle
    },
  data() {
    return {
        vehicles:null,
        loading:false,
        enterpriseId:"",
        searchdata:{
          "id": "",
          "enterpriseIdList": [],
          "brandId": "",
          "typeId": "",
          "vehicleNo": "",
          "contractStatus": "",
          "lockStatus": "",
          "currentPage": 1,
          "pageSize": 10
        },
        lockStatusOption:[
          {name:'锁车',value:1},
          {name:'未锁车',value:2},
          {name:'状态未上报',value:3}
        ],
        contractStatus:[
          {name:'逾期',value:1},
          {name:'未逾期',value:2}
        ],
        dataList: [],
        total: 0,
        searchBtn : false,//查询权限按钮
        lockBtn : false,//锁车
        unlockBtn : false,//未锁车
        tableHeight: window.innerHeight - 495 +'',
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        lockclass:false,
        unlockclass:false,
        dialogVisible:false,
        dialogVisible2:false
    };
  },
  methods: {
    handleClose(done){
      done()
    },
    handleClose2(done){
      done()
    },
    suoche(){
      this.dialogVisible=true
    },
    jiesuo(){
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
    handleSelectionChange(multipleSelection) {
      if(multipleSelection&&multipleSelection.length>1){
        this.lockclass=false
        this.unlockclass=false
        this.$message.info("只能选择单条数据进行操作！")
        return
      }
      this.vehicles=multipleSelection[0];
      let suoche=false
      let jiesuo=false
      for(let item of multipleSelection){
          if(item.lockStatus=='1'){
            jiesuo=true
          }
          else if(item.lockStatus=='2'){
            suoche=true
          }
      }
      if(suoche&&jiesuo){
        this.lockclass=false
        this.unlockclass=false
      }
      else if(jiesuo){
        this.lockclass=false
        this.unlockclass=true
      }
      else if(suoche){
        this.lockclass=true
        this.unlockclass=false
      }
      else{
        this.lockclass=false
        this.unlockclass=false
      }
    },
    search() {
      this.searchdata.currentPage=1;
      this.getlist();
    },
    callback(){
      this.dialogVisible=false;
      this.dialogVisible2=false;
      this.getlist();
    },
    getlist(){
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/vehicleLock/vehicleLockPageList",
        headers: this.headers,
        data:this.searchdata,
      })
        .then((result) => {
         this.loading = false
          if (result.data.status == 0) {
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
            message: "拉取锁车列表数据失败，请稍后再试",
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
            if(item.name == '锁车') this.lockBtn = true
            if(item.name == '解锁') this.unlockBtn = true
          })
      },
      immediate:true,
      deep:true
    },
    enterpriseId(){
      if(this.enterpriseId){
         this.searchdata.enterpriseIdList=[this.enterpriseId]
      }
      else{
         this.searchdata.enterpriseIdList=[]
      }

    }
  }
};
</script>
<style scoped>
#header {
  width: 100%;
  height: calc(100% - 126px);
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
  height: calc(100% - 95px)!important;
  overflow: auto;
}
</style>
