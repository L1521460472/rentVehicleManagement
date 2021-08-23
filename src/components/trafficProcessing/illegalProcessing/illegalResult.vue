<template>
  <div class="container scoped">
      <div class="search">
      <div v-show="showmsg" class="msg">
        <div ref="msg" style="min-width: 800px;margin-left: 0px;">{{message}}</div>
        <div style="font-size: 16px;font-weight: 600;color: #000000;margin-top: 26px;margin-bottom: 20px;">系统查询违章车辆数：{{vehicleCount}}<span style="margin-left: 5px;">辆</span></div>
      </div>
        <div class="searchitem">
          <label>车牌号：</label>
          <el-input size="small" v-model="search.vehicleNo" style="width: 175px;"></el-input>
        </div>
        <div class="searchitem">
          <el-button type="primary" size="small" @click="onsearch" v-if="btn1">筛选</el-button>
          <el-button type="" size="small" @click="reset" v-if="btn1">重置</el-button>
        </div>
      </div>
      <div class="tablecontainer">
          <el-table :data="dataList" border stripe :height="tableHeight" size="small"
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            v-loading="loading" fit>
            <el-table-column prop="" width="60" label="序号" align="center">
              <template slot-scope="scope">{{ scope.$index + (search.currentPage - 1) * search.pageSize + 1 }}</template>
            </el-table-column>
            <el-table-column prop="vehicleNo" label="车牌号" ></el-table-column>
            <el-table-column prop="createTime" width="150" label="最近查询时间"></el-table-column>
            <el-table-column prop="score" label="违章扣分"></el-table-column>
            <el-table-column prop="money" label="违章金额"></el-table-column>
            <el-table-column prop="violationNum" label="违章条数"></el-table-column>
            <el-table-column prop=""  label="查看详情" align="center">
              <template slot-scope="scope">
                 <a v-if="btn2" href="javascript:;" class="alink" @click="detail(scope.row)">查看明细</a>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange" style="margin:10px 10px"
          :current-page="search.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="search.pageSize"
          :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
      <el-dialog title="查看记录" :visible.sync="dialogVisible" :close-on-click-modal="false" width="70%">
        <div style="margin-bottom: 10px;">
          <el-button type="primary" class="barbtn" size="small" @click="regetdetail(thisrow)" style="">
           查询更新
           </el-button>
           <span>（点击重新查询此车辆，刷新结果后，收取一条单次查询费用。）</span>
        </div>
       <el-table :data="datalist2" border stripe size="small" fit style="width: 100%;" v-loading="loading2" >
         <el-table-column prop="vehicleNo" label="车牌号" width="100"></el-table-column>
         <el-table-column prop="violationTime" width="150" label="违章时间" ></el-table-column>
         <el-table-column prop="violationPlace" label="违章地点"></el-table-column>
         <el-table-column prop="violationType" label="详细内容"></el-table-column>
         <el-table-column width="80" prop="money" label="违章金额"></el-table-column>
         <el-table-column prop="score" width="80" label="违章扣分"></el-table-column>
         <el-table-column prop="dealWithStatus" width="80" label="办理状态" align="center"></el-table-column>
       </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">关闭</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
import { getCookie,formatJE,getMenuBtnList  } from "@/public";
  export default{
    name:'illegalResult',
    data(){
      return {
        search:{
          "vehicleNo": "",
          "enterpriseId": null,
          "currentPage": 1,
          "pageSize": 20
         } ,
        loading:false,
        loading2:false,
        dataList:null,
        total:0,
        dialogVisible:false,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        tableHeight: window.innerHeight - 370 +'',
        datalist2:null,
        showmsg:false,
        message:"",
        vehicleCount:"0",
        thisrow:null,
        btn1:false,//权限按钮顺序，从上到下，从左到右
        btn2:false,
      }
    },
    methods:{
      regetdetail(thisrow){
         this.detail(thisrow);
      },
      detail(thisrow){
          this.thisrow=thisrow
          this.datalist2=null
          this.dialogVisible=true
          this.loading2=true
          axios({
            method: "get",
            url:'/vehicle-service/violationBatchVehicleDetail/batchVehicleViolationDetail?batchVehicleId='+thisrow.batchVehicleId,
            headers:this.headers
          })
          .then((result)=>{
            this.loading2=false
            if(result.data&&result.data.data){
                this.datalist2=result.data.data
                this.datalist2.map((item)=>{
                  item.money=formatJE(item.money)
                })
            }
          })
          .catch((err)=>{
            console.log(err)
            this.loading2=false
            this.$message({
              message: "服务器繁忙，请稍后再试",
              center: true,
              type: "error",
            });
          })
      },
      reset(){
        for(let item in this.search){
          if(item!="currentPage"&&item!="pageSize"){
            this.search[item]=""
          }
        }
      },
      onsearch(){
        this.search.currentPage=1
        this.getlist()
      },
      handleSizeChange(val){
         this.search.pageSize=val
         this.getlist()
      },
      handleCurrentChange(val){
          this.search.currentPage=val
         this.getlist()
      },
      getlist(){
          this.loading=true
          axios({
            method: "post",
            url:'/vehicle-service/violationBatchVehicle/vehicleSummary',
            data:this.search,
            headers:this.headers
          })
          .then((result)=>{
            this.loading=false
            if(result.data&&result.data.data){
                setTimeout(() => {
            window.onload()
          }, 10)
              this.dataList=result.data.data.records
              this.total=result.data.data.total
              this.dataList.map((item)=>{
                item.money=formatJE(item.money)
              })
            }
          })
          .catch((err)=>{
            console.log(err)
            this.loading=false
            this.$message({
              message: "服务器繁忙，请稍后再试",
              center: true,
              type: "error",
            });
          })
      },
      getmsg(){
        axios({
          method: "get",
          url: "/vehicle-service/noticeInfo/queryNoticeInfo",
          headers: this.headers,
        })
          .then((result) => {
            if(result.data.data){
              this.message=result.data.data
              this.showmsg=true;
            }
          })
          .catch((err) => {
          });
      },
       getVehicleCount(){
        axios({
          method: "post",
          url: "/vehicle-service/violationBatchVehicle/getViolationNum",
          headers: this.headers,
        })
          .then((result) => {
            if(result.data.data){
              this.vehicleCount=result.data.data
            }
          })
          .catch((err) => {
          });
      },
    },
    mounted(){
      if(this.$route.query.id){
        this.search.batchId=this.$route.query.id
      }
      this.getlist()
      this.getVehicleCount()
      this.getmsg()
    },
     computed:{
      menuDataList(){
          return this.$store.state.menuData
      }
    },
    watch:{
      menuDataList:{
        handler(data){
            let btns =  getMenuBtnList(data,this.$route.path)
            btns.map(item=>{
              if(item.name == '筛选') this.btn1 = true
              if(item.name == '查看详细') this.btn2 = true
            })
        },
        immediate:true,
        deep:true
      },
    }
  }
</script>

<style scoped>
  .container{
    height: calc(100% - 106px);
    font-size: 12px;
  }
  .tablecontainer{
     padding: 10px 0px;
     border: 1px solid #E5E5E5;
     padding-top: 0px;
     height: calc(100% - 137px);
  }
.title{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 10px;
}
.search{
  padding: 10px 20px;
  border: 1px solid #E5E5E5;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-top: 0px;
  flex-wrap: wrap;
}
.searchitem{
  display: flex;
  justify-content: flex-start;
  margin:5px 10px;
}
.searchitem label{
  min-width: 70px;
  line-height: 32px;
  font-size: 14px;
}
.bar{
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 20px;
}
.goback{
    color: rgb(22, 155, 213);
    text-decoration: none;
    float: left;
    font-weight: 500;
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid #dddddd;
}
.subsearchitem{
  display: flex;
  justify-content: flex-start;
  flex: 1;
}
.subsearchitem > div{
  display: flex;
  justify-content: flex-start;
  flex: 1;
}
.subsearchitem > div > label{
  width: 150px;
  font-size: 12px!important;
  text-align: center!important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
/deep/ .barbtn{
  background-color:white;
  color:#3a8ee6;
}
/deep/ .barbtn:hover{
  background-color:#ecf5ff;
}
.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #FFF;
    border-color: #EBEEF5;
}
.alink{
  color: #3a8ee6;
  text-decoration: none;
  display: block;
}
.msg{
  font-size: 14px;
  color: #A30014;
  padding: 0px 10px;
  overflow: hidden;
  width: 100%;
  min-width: 100%;
  margin-bottom: 10px;
} 
</style>
