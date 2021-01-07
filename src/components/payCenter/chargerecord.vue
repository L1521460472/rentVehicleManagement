<template>
  <div class="container">
      <div class="title">
        扣费记录
        <a href="javascript:;" class="goback" @click="goback">返回</a>
      </div>
      <div class="search scoped">
        <div class="searchitem">
          <label>扣费时段</label>
          <el-date-picker v-model="datestr" type="datetimerange" range-separator="~"
              start-placeholder="" end-placeholder="" size="small">
          </el-date-picker>
        </div>
        <div class="searchitem">
          <label>订单编号</label>
          <el-input size="small" v-model="search.orderNo"></el-input>
        </div>
        <div>
          <el-button type="primary" size="small" @click="onsearch">查询</el-button>
        </div>
      </div>
      <div class="bar">
          <el-button type="primary" size="small" @click="daochu">导出数据</el-button>
      </div>
     <el-table :data="dataList" border class="table" stripe :height="tableHeight"
      :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
      v-loading="loading">
       <el-table-column prop="enterpriseName" width="200" label="公司名称" show-overflow-tooltip></el-table-column>
       <el-table-column prop="batchNo" width="250" label="流水编号" show-overflow-tooltip></el-table-column>
       <el-table-column prop="orderNo" width="300" label="订单编号" show-overflow-tooltip></el-table-column>
       <el-table-column prop="typeStr" width="100" label="扣费类型"></el-table-column>
       <el-table-column prop="deductionMoney" width="100" label="扣费金额"></el-table-column>
       <el-table-column prop="afterMoney" width="100" label="扣费后余额"></el-table-column>
       <el-table-column prop="createTime" width="200" label="扣费时间"></el-table-column>
     </el-table>
     <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange" style="margin:10px 10px"
       :current-page="search.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="search.pageSize"
       :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
import { getCookie, formatDate,formatJE } from "@/public";
  export default{
    name:'chargerecord',
    data(){
      return {
        search:{
          "currentPage": 1,
          "pageSize": 10,
          "enterpriseId": 0,
          "orderNo": "",
          "batchNo": "",
          "startDateStr": "",
          "endDateStr": ""
        },
        datestr:"",
        loading:false,
        dataList:null,
        total:0,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        tableHeight: window.innerHeight - 376 +'',
      }
    },
    methods:{
      goback(){
        this.$router.push({name:'pay'})
      },
      onsearch(){
        this.search.currentPage=1
        this.getlist()
      },
      daochu(){
        let filename="扣费记录.xls"
        let path="/platform-base-service/deductionRecord/listExport"//导出
        //导出
        axios({
          method: "post",
          url: path,
          headers: this.headers,
          data: this.search,
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
                  link.download = filename
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
            url:'/platform-base-service/deductionRecord/listPage',
            data:this.search,
            headers:this.headers
          })
          .then((result)=>{
            this.loading=false
            if(result.data&&result.data.data){
              this.dataList=result.data.data.records
              this.total=result.data.data.total
              for(let item of this.dataList){
                item['deductionMoney']=formatJE(item['deductionMoney'])
                item['afterMoney']=formatJE(item['afterMoney'])
              }
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
      }
    },
    mounted(){
      this.getlist()
    },
    watch:{
      datestr:function(data){
          if(data&&data.length>1){
            this.search.startDateStr=formatDate(data[0],'yyyy-MM-dd HH:mm:ss')
            this.search.endDateStr=formatDate(data[1],'yyyy-MM-dd HH:mm:ss')
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
    padding: 20px;border: 1px solid #E5E5E5; height: calc(100% - 103px);
    font-size: 14px;
  }
  .table{
    overflow: auto;
    margin-right: 10px;
    margin-left: 10px;
  }
.title{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 10px;
}
.search{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.searchitem{
  display: flex;
  justify-content: flex-start;
  margin-right: 10px;
  margin-left: 10px;
  width: 410px;
}
.searchitem label{
  min-width: 70px;
  line-height: 32px;
  font-size: 14px;
}
.bar{
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
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
</style>
