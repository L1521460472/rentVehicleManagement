<template>
  <div class="container">
      <div class="search scoped">
        <div class="searchitem">
          <label>操作类型</label>
          <el-select v-model="search.operateType" placeholder="全部" size="small" style="width: 150px;">
              <el-option value="" label="全部"></el-option>
              <el-option :value="1" label="新增"></el-option>
              <el-option :value="2" label="修改"></el-option>
              <el-option :value="3" label="删除"></el-option>
              <el-option :value="4" label="查询"></el-option>
              <el-option :value="5" label="导入"></el-option>
              <el-option :value="6" label="导出"></el-option>
              <el-option :value="7" label="其他"></el-option>
          </el-select>
        </div>
        <div class="searchitem">
          <label>操作时间</label>
          <el-date-picker v-model="datestr" type="datetimerange" range-separator="~"
              start-placeholder="" end-placeholder="" size="small">
          </el-date-picker>
        </div>
        <div class="searchitem">
          <label>操作人</label>
          <el-input size="small" v-model="search.username" style="width: 150px;"></el-input>
        </div>
        <div>
          <el-button type="primary" size="small" @click="onsearch">查询</el-button>
        </div>
      </div>
     <el-table :data="dataList" border class="table" stripe :height="tableHeight" size="small"
      :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
      v-loading="loading">
      <el-table-column type="index" label="序号" width="50" align="center">
      	 <template slot-scope="scope">
      	        <span>{{(search.currentPage-1) * search.pageSize + scope.$index + 1}}</span>
      	 </template>
      </el-table-column>
       <el-table-column prop="userName" label="操作人" show-overflow-tooltip></el-table-column>
       <el-table-column prop="operateTypeStr" label="操作类型" show-overflow-tooltip></el-table-column>
       <el-table-column prop="content" label="操作描述"></el-table-column>
       <el-table-column prop="createTimeStr" label="操作时间"></el-table-column>
       <el-table-column prop="ip" width="100" label="操作IP"></el-table-column>
     </el-table>
     <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange" style="margin:10px 10px"
       :current-page="search.currentPage" :page-sizes="[10, 20, 50, 100, 200]" :page-size="search.pageSize"
       :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
import { getCookie, formatDate,formatJE } from "@/public";
  export default{
    name:'userOperateLogs',
    data(){
      return {
        search:{
          "username": "",
          "operateType": null,
          "endTime": "",
          "startTime": null,
          "currentPage": 1,
          "pageSize": 10,
        },
        datestr:"",
        loading:false,
        dataList:null,
        total:0,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        tableHeight: window.innerHeight - 276 +'',
      }
    },
    methods:{
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
            url:'/platform-base-service/userOperateLog/listLogByPage',
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
            this.search.startTime=formatDate(data[0],'yyyy-MM-dd HH:mm:ss')
            this.search.endTime=formatDate(data[1],'yyyy-MM-dd HH:mm:ss')
          }
          else{
            this.search.startTime=""
            this.search.startTime=""
          }
        }
    }
  }
</script>

<style scoped>
  .container{
    padding: 20px;
    border: 1px solid #E5E5E5;
    height: calc(100% - 103px);
    font-size: 12px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .table{
    overflow: auto;
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
  width:auto;
}
.searchitem label{
  min-width: 70px;
  line-height: 32px;
  font-size: 12px;
  color: #333333;
}
.bar{
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
