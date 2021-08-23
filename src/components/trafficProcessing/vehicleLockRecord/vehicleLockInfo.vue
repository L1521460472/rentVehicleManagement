<template>
  <div id="header" v-loading="loading">
    <div class="header">
      <div class="headerTop scoped">
        <div class="nav">
          <span class="demonstration">所属公司</span>
          <getEnterpriseBox v-model="enterpriseId"></getEnterpriseBox>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号码</span>
           <el-input v-model="searchdata.vehicleNo"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">操作时段</span>
           <el-date-picker style="width: 330px;"
             v-model="datestr"
             type="datetimerange"
             start-placeholder="开始时间"
             end-placeholder="结束时间">
           </el-date-picker>
        </div>
        <div class="nav">
          <span class="demonstration">下发状态</span>
          <makeSelect :options="[{name:'已下发',value:0},{name:'未下发',value:1},{name:'下发成功',value:2}]" v-model="searchdata.operateResult"></makeSelect>
        </div>
        <div class="nav">
          <span class="demonstration">锁车状态</span>
          <makeSelect :options="[{name:'未锁车',value:0},{name:'已锁车',value:1}]"
          v-model="searchdata.uploadResult"></makeSelect>
        </div>
        <div class="nav">
          <span class="demonstration">操作账号</span>
           <el-input v-model="searchdata.createdName"></el-input>
        </div>
        <div class="headerBotton" style="margin-left: 45px;">
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-table :data="dataList"  border stripe :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
        size="small" style="width: 100%; height: 100%;" height="100%" >
        <el-table-column prop width="60" label="序号" align="center">
          <template slot-scope="scope">{{ scope.$index + (searchdata.currentPage - 1) * searchdata.pageSize + 1 }}</template>
        </el-table-column>
        <el-table-column prop="enterpriseName" label="所属公司" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="vehicleNo"  label="车牌号码"></el-table-column>
        <el-table-column prop="operateUser" label="操作人"></el-table-column>
        <el-table-column prop="operateTime" label="操作时间"></el-table-column>
        <el-table-column prop="accOnOff" label="ACC状态"></el-table-column>
        <el-table-column prop="action" label="指令描述"></el-table-column>
        <el-table-column prop="operateResult" label="下发状态"></el-table-column>
        <el-table-column prop="uploadTime" label="执行时间"></el-table-column>
        <el-table-column prop="uploadResult" label="锁车状态"></el-table-column>
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
import { getCookie, dateToString, getMenuBtnList,formatDate } from "@/public";
export default {
    name: "vehicleLockInfo",
  data() {
    return {
        datestr:null,
        id:null,
        loading:false,
        enterpriseId:"",
        searchdata:{
          "createdName": "",
          "endTime": "",
          "startTime": "",
          "uploadResult": null,
          "enterpriseIdList": [],
          "operateResult": null,
          "vehicleNo": "",
          "currentPage": 1,
          "pageSize": 10
        },
        dataList: [],
        total: 0,
        searchBtn : false,//查询权限按钮
        tableHeight: window.innerHeight - 395 +'',
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
    };
  },
  methods: {
    handleClose(done){
      done()
    },
    detail(row){
        this.dialogVisible=true
        this.id=row.id
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
        url: "/vehicle-service/vehicleLockInfo/pageList",
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
            message: "拉取记录列表数据失败，请稍后再试",
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
       this.datestr=null
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
    },
    enterpriseId(){
      if(this.enterpriseId){
         this.searchdata.enterpriseIdList=[this.enterpriseId]
      }
      else{
         this.searchdata.enterpriseIdList=[]
      }
    },
    datestr(){
      if(!this.datestr){
        this.searchdata.startTime=""
        this.searchdata.endTime=""
      }
      else{
        this.searchdata.startTime=formatDate(this.datestr[0],"yyyy-MM-dd HH:mm:ss")
        this.searchdata.endTime=formatDate(this.datestr[1],"yyyy-MM-dd HH:mm:ss")
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
  height: calc(100% - 47px)!important;
  overflow: auto;
}
</style>
