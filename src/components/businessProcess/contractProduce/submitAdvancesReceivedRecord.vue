<template>
  <div class="container" style="padding: 0px;">
      <div style="color: rgba(51, 51, 51, 1);  font-weight: bold; font-size: 16px; line-height: normal;margin: 20px;">预收款操作记录</div>
     <el-table :data="dataList" border class="table" stripe :height="tableHeight" size="small"
      :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
      v-loading="loading">
       <el-table-column prop="collectionCode" label="操作编号" show-overflow-tooltip></el-table-column>
       <el-table-column prop="createdTime" width="150" label="操作时间" show-overflow-tooltip></el-table-column>
       <el-table-column prop="createdBy" label="操作账号"></el-table-column>
       <el-table-column prop="billPeriods" label="转租期数"></el-table-column>
       <el-table-column prop="turnRentMoney" label="转租金金额"></el-table-column>
       <el-table-column prop="beforeBalance" label="转租前预付款余额"></el-table-column>
       <el-table-column prop="afterBalance" label="转租后预付款余额"></el-table-column>
     </el-table>
     <div style="height: 40ppx;line-height: 40px;text-align: center;bottom: 0px;">
       <el-button type="" @click="cancel">返回</el-button>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getCookie, formatDate,formatJE,getMenuBtnList } from "@/public";
  export default{
    name:'submitAdvancesReceivedRecord',
    data(){
      return {
        loading:false,
        dataList:null,
        total:0,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        tableHeight: window.innerHeight - 276 +'',
        id:this.contractid?this.contractid:this.$route.query.id,
        iszhujian:false
      }
    },
    props:{
      contractid:{
        type:[String,Number],
        default(){
          return ""
        }
      }
    },
    methods:{
      cancel(){
        if(this.iszhujian){
          this.$emit('closedialog',"")
        }
        else{
          this.$router.back()
        }
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
            method: "get",
            url:'/vehicle-service/advancesReceivedRecord/recordPage?id='+this.$route.query.id,
            headers:this.headers
          })
          .then((result)=>{
            this.loading=false
            if(result.data&&result.data.data){
                setTimeout(() => {
            window.onload()
          }, 10)
              this.dataList=result.data.data  
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
    beforeMount(){
      if(this.contractid){
        this.iszhujian=true
      }
    },
    mounted(){
      this.getlist()
    },
    computed: {
    },
    watch:{
      contractid(){
        if(this.contractid){
          this.iszhujian=true
          this.getlist()
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
.cbtn{
  color: #169BD5;
  margin: 0px 2px;
  text-decoration: none;
}
</style>
