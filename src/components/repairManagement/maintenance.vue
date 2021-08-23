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
          <span class="demonstration">添加人</span>
          <getTianjiaren v-model="searchdata.createBy"></getTianjiaren>
        </div>
        <div class="nav">
          <span class="demonstration">合同编号</span>
          <el-input v-model="searchdata.contractCode"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号</span>
          <el-input v-model="searchdata.vehicleNo"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">核实状态</span>
          <makeSelect v-model="searchdata.auditStatus" :options="[{name:'待核实',value:0},{name:'核实通过',value:1},{name:'核实不通过',value:2}]"></makeSelect>
        </div>
        <div class="headerBotton" style="margin-left: 45px;">
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button v-if="btn1" @click="add">
           <i class="iconfont icon-add"></i>新增
        </el-button>
        <el-button v-if="btn2" @click="shenhe" :disabled="canshenhe">
           <i class="iconfont icon-shenhe"></i>核实
        </el-button>
        <el-button v-if="btn3" @click="detail" :disabled="candetail">
          <i class="iconfont icon-chakan"></i>查看
        </el-button>
      </div>
      <el-table :data="dataList"  border stripe :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
        size="small" style="width: 100%; height: 100%;" height="100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="enterpriseName" label="所属公司" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="brandName"  label="品牌"></el-table-column>
        <el-table-column prop="vehicleTypeName" label="车型"></el-table-column>
        <el-table-column prop="vehicleNo" label="车牌号码" width="100"></el-table-column>
        <el-table-column prop="repairTime" label="维修日期" width="150"></el-table-column>
        <el-table-column prop="repairItemsDesc" label="维修项目" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="totalFee" label="费用（元）" width="100"></el-table-column>
        <el-table-column prop="payFee" label="实际支付（元）" width="120"></el-table-column>
        <el-table-column prop="repairMileage" label="维修时里程（公里）" width="130"></el-table-column>
        <el-table-column prop="createByStr" label="添加人"></el-table-column>
        <el-table-column prop="auditUserIdStr" label="核实人"></el-table-column>
        <el-table-column prop="auditTime" label="核实时间" width="140"></el-table-column>
        <el-table-column prop="auditStatus" label="核实状态" min-width="110"></el-table-column>
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
  name: "maintenance",
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
        tableHeight: window.innerHeight - 395 +'',
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        multipleSelection:[],
        btn1:false,
        btn2:false,
        btn3:false,
        yearAndMonth:[]
    };
  },
  methods: {
    shenhe(){
      let row=this.multipleSelection[0]
      this.$router.push({path:'/maintenanceshenhe',query:{id:row.id}})
    },
    detail(){
      let row=this.multipleSelection[0]
      this.$router.push({path:'/maintenancedetail',query:{id:row.id}})
    },
    add(){
      this.$router.push({path:'/maintenanceadd'})
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      if(this.multipleSelection.length==1){
       this.candetail=false
       if(val[0].auditStatus=='待核实'){
          this.canshenhe=false
       }
       else{
         this.canshenhe=true
       }
      }
      else{
        this.candetail=true
        this.canshenhe=true
      }
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
            if(item.name == '新增') this.btn1 = true
            if(item.name == '核实') this.btn2 = true
            if(item.name == '查看') this.btn3 = true
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
.footerBottom .el-button{
      color: #368cfe;
      border-radius: 4px;
      border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:hover  {
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

   .el-dialog__body{
    padding-top: 0px!important;
  }
</style>
