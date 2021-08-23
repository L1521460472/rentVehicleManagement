<template>
  <div class="container scoped">
      <div class="search">
        <div v-show="showmsg" class="msg">
          <div ref="msg" style="min-width: 800px;margin-left: 0px;">{{message}}</div>
        </div>
        <div class="searchitem">
          <label>查询状态：</label>
           <el-select v-model="search.queryStatus" style="width: 175px;" size="small" clearable="">
             <el-option :value="0" label="未查询"></el-option>
             <el-option :value="1" label="查询中"></el-option>
             <el-option :value="2" label="查询完成"></el-option>
           </el-select>
        </div>
        <div class="searchitem">
          <label>查询时段：</label>
          <el-date-picker v-model="datestr" type="daterange" range-separator="~" size="small"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="searchitem">
          <el-button type="primary" size="small" @click="onsearch" v-if="btn1">筛选</el-button>
          <el-button type="" size="small" @click="reset" v-if="btn1">重置</el-button>
        </div>
      </div>
      <div class="tablecontainer">
        <div style="padding: 10px 20px;">
          <div>* 提示：</div>
          <div>1、查询完成后，可点击“查看详情”查看查询结果;</div>
          <div>2、查询失败时，错误类型为车辆信息错误时（如：车牌号错误，车架号错误，车辆发动机号错误，车辆类型错误等），系统会扣除费用；错误类型为服务器错误时（如：请求超时，查询超时，系统错误等等），不会扣除费用;</div>
        </div>
          <div class="bar">
              <el-button type="primary" class="barbtn" size="small" @click="submitBatch"  v-if="btn2">
                <i class="iconfont icon-edit"></i>
               新建批次
               </el-button>
              <el-button type="primary" class="barbtn" size="small" @click="exportlist"  v-if="btn3">
                <i class="iconfont icon-chuli"></i>
                结果汇总
                </el-button>
          </div>
          <el-table :data="dataList" border stripe :height="tableHeight" size="small"
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            v-loading="loading" fit>
            <el-table-column prop="batchNo" label="批次号" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" width="150"  label="创建时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createByStr" label="操作用户" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseName" label="公司名称"></el-table-column>
            <el-table-column prop="vehicleNum" label="查询车辆数" align="center"></el-table-column>
            <el-table-column prop="statusStr" label="查询状态" align="center">
              <template slot-scope="scope">
                <a href="javascript:;"
                v-if="scope.row.status==0&&btn7" title="点击开始查询" class="abtn" @click="startcheck(scope.row)">
                  {{scope.row.statusStr}}
                </a>
                <span v-else-if="scope.row.status==1"><i class="el-icon-loading"></i>{{scope.row.statusStr}}</span>
                <span v-else>{{scope.row.statusStr}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="expectCostDeduction"  label="预计扣除费用"></el-table-column>
            <el-table-column prop="actualCostDeduction"  label="实际扣除费用"></el-table-column>
            <el-table-column prop=""  label="查看结果" width="205px"  align="center">
              <template slot-scope="scope">
                <a v-if="btn4" href="javascript:;" class="alink" @click="detail(scope.row)">查看详情</a>
                <a v-if="btn5" href="javascript:;" class="alink" @click="exportcount(scope.row)">导出汇总</a>
                <a v-if="btn6" href="javascript:;" class="alink" @click="exportdetail(scope.row)">导出明细</a>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange" style="margin:10px 10px"
          :current-page="search.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="search.pageSize"
          :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
import { getCookie,openNewTab ,formatDate,formatJE,getMenuBtnList} from "@/public";
  export default{
    name:'illegalbatchQuery',
    data(){
      return {
        search:{
          "queryStatus": null,
          "startTime": "",
          "endTime": "",
          "enterpriseId": null,
          "currentPage": 1,
          "pageSize": 10
        },
        message:"",
        datestr:null,
        loading:false,
        dataList:null,
        total:0,
        showmsg:false,
        isDisable:true,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        tableHeight: window.innerHeight - 440 +'',
        btn1:false,//权限按钮顺序，从上到下，从左到右
        btn2:false,
        btn3:false,
        btn4:false,
        btn5:false,
        btn6:false,
        btn7:false,//扣费查询
      }
    },
    methods:{
      exportexcel(url,data,name){
        //导出
        axios({
          method: "post",
          url: url,
          headers: this.headers,
          data:data,
          responseType: 'blob'
        })
          .then((result) => {
            if (result.data.type === "application/json") {
                this.$message({
                  type: "error",
                  message: "导出失败，请稍后再试"
                });
              } else {
                let blob = new Blob([result.data]);
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `${name}.xls`;
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(link.href);
                link.remove();
              }
          })
          .catch((err) => {
            if(typeof err =='object'){
              this.$message({
                message: err.response.data.message,
                center: true,
                type: "error",
              });
            }
            else{
              this.$message({
                message: err,
                center: true,
                type: "error",
              });
            }
          });
      },
      detail(thisrow){
        openNewTab(this,"查看详情","/illegalDetail",{id:thisrow.id})
      },
      exportcount(thisrow){
        this.exportexcel("/vehicle-service/violationBatchVehicle/exportList",{
            batchId:thisrow.id
          },`违章汇总_${thisrow.batchNo}`)
      },
      exportdetail(thisrow,flag){
        this.exportexcel("/vehicle-service/violationBatchVehicleDetail/exportDetail",{
            batchId:thisrow.id
          },`违章明细_${thisrow.batchNo}`)
      },
      startcheck(thisrow){
        thisrow.status=1
        thisrow.statusStr="查询中..."
        axios({
          method: "post",
          url:'/vehicle-service/violationBatch/startQuery?id='+thisrow.id,
          headers:this.headers
        })
        .then((result)=>{
          if(result.data.status==0){
            thisrow.status=2
            thisrow.actualCostDeduction=thisrow.expectCostDeduction
            thisrow.statusStr="查询完成"
          }
          else{
            thisrow.status=0
            thisrow.statusStr="未查询"
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err)=>{
          console.log(err)
          thisrow.status=0
          thisrow.statusStr="未查询"
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
        this.datestr=null
      },
      onsearch(){
        this.search.currentPage=1
        this.getlist()
      },
      exportlist(){
        openNewTab(this,"结果汇总",'/illegalResult')
      },
      submitBatch(){
         openNewTab(this,"筛选车辆",'/illegalVehicle')
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
            url:'/vehicle-service/violationBatch/batchQuery',
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
              this.dataList.map((item)=>{
                item.expectCostDeduction=formatJE(item.expectCostDeduction)
                item.actualCostDeduction=formatJE(item.actualCostDeduction)
              })
              this.total=result.data.data.total
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
      getPinPai(){
        axios({
          //品牌
          method: "post",
          url: "/vehicle-service/brandInfo/brandInfoListQuery",
          headers: this.headers,
        })
          .then((result) => {
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
      getVehicleType() {
        //获取车型
        axios({
          method: "get",
          url: "/vehicle-service/vehicleTypeInfo/queryVehicleTypeListByBrandId?id=" + this.search.brandId,
          headers: this.headers,
        })
          .then((result) => {
            this.search.typeId=""
            this.vehicleTypeNameOptions = result.data.data;
          })
          .catch((err) => {
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
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
      }
    },
    mounted(){
      this.getlist()
      this.getPinPai()
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
              if(item.name == '新建批次') this.btn2 = true
              if(item.name == '结果汇总') this.btn3 = true
              if(item.name == '查看详情') this.btn4 = true
              if(item.name == '导出条数') this.btn5 = true
              if(item.name == '导出详情') this.btn6 = true
              if(item.name == '扣费查询') this.btn7 = true
            })
        },
        immediate:true,
        deep:true
      },
      datestr:function(data){
          if(data&&data.length>1){
            this.search.startTime=formatDate(data[0],'yyyy-MM-dd')
            this.search.endTime=formatDate(data[1],'yyyy-MM-dd')
          }
          else{
            this.search.startDateStr=""
            this.search.endDateStr=""
          }
        }
    }
  }
</script>

<style scoped>
  .container{
    height: calc(100% - 98px);
    font-size: 12px;
  }
  .tablecontainer{
     padding: 10px 0px;
     border: 1px solid #E5E5E5;
     padding-top: 0px;
     height: calc(100% - 92px);
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
  flex-wrap:wrap
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
  background-color:#ecf5ff!important;
  color:#3a8ee6!important;
}
.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #FFF;
    border-color: #EBEEF5;
}
.abtn{
  color: #3a8ee6;
  text-decoration: none;
  padding: 3px 5px;
  border: 1px solid #409EFF;
  border-radius: 3px;
}
.abtn:hover{
  background-color: #ecf5ff;
}
.alink{
  color: #3a8ee6;
  text-decoration: none;
  margin: 0px 5px;
}
.msg{
  font-size: 14px;
  color: #A30014;
  padding: 0px 10px;
  overflow: hidden;
  width:100%;
  min-width: 100%;
  margin-bottom: 10px;
}

</style>
