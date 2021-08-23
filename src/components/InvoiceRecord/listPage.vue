<template>
  <div class="container">
      <div class="search scoped">
        <div class="searchitem">
          <label>所属业务员</label>
          <getSalesmanBox v-model="search.userId" style="width: 150px;"></getSalesmanBox>
        </div>
        <div class="searchitem">
          <label>合同编号</label>
          <el-input size="small" v-model="search.contractCode" style="width: 150px;"></el-input>
        </div>
        <div class="searchitem">
          <label>合同状态</label>
          <getContractStatus v-model="search.contractStatus" :uncontain="['待登记']" style="width: 150px;"></getContractStatus>
         </el-select>
        </div>
        <div>
          <el-button type="primary" size="small" @click="onsearch" v-if="btn1">查询</el-button>
        </div>
      </div>
     <el-table :data="dataList" border class="table" stripe :height="tableHeight" size="small"
      :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
      v-loading="loading">
     <!-- <el-table-column type="index" label="序号" width="50" align="center">
      	 <template slot-scope="scope">
      	        <span>{{(search.currentPage-1) * search.pageSize + scope.$index + 1}}</span>
      	 </template>
      </el-table-column> -->
       <el-table-column prop="userName" label="业务员" show-overflow-tooltip></el-table-column>
       <el-table-column prop="contractCode" label="合同编号" show-overflow-tooltip></el-table-column>
       <el-table-column prop="customerTypeStr" label="客户类型"></el-table-column>
       <el-table-column prop="contractStatusStr" label="合同状态"></el-table-column>
       <el-table-column prop="accountsReceivable" label="合同应收"></el-table-column>
       <el-table-column prop="received" label="合同已收"></el-table-column>
       <el-table-column prop="invoicedAmount" label="已开发票金额"></el-table-column>
       <el-table-column prop="unInvoicedAmount" label="未开发票金额"></el-table-column>
       <el-table-column prop="" width="130" label="操作" align="center">
         <template slot-scope="scope">
                <a href="javascript:;" @click="jumpto(scope.row,'add')" class="cbtn" v-if="btn2">新增开票</a>
                <a href="javascript:;" @click="jumpto(scope.row,'records')" class="cbtn" v-if="btn3">发票记录</a>
         </template>
       </el-table-column>
     </el-table>
     <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange" style="margin:10px 10px"
       :current-page="search.currentPage" :page-sizes="[10, 20, 50, 100, 200]" :page-size="search.pageSize"
       :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import { getCookie, formatDate,formatJE,getMenuBtnList } from "@/public";
  export default{
    name:'listPage',
    data(){
      return {
        search:{
          "contractCode": "",
          "contractStatus": null,
          "enterpriseId": null,
          "id": null,
          "userId": null,
          "currentPage": 1,
          "pageSize": 10
        },
        loading:false,
        dataList:null,
        total:0,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        tableHeight: window.innerHeight - 276 +'',
        btn1:false,
        btn2:false,
        btn3:false,
      }
    },
    methods:{
      jumpto(item,flag){
        if(flag=='add'){
          this.$router.push({path:'/AddInvoice',query:{
             "contractId": item.id,
             "customerId": item.customerId,
           }})
        }
        else{
          this.$router.push({path:'/listPageInvoice',query:{
             "contractId": item.id,
             "customerId": item.customerId,
           }})
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
            url:'/vehicle-service/invoiceRecord/listPage',
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
    computed: {
      menuDataList() {
        return this.$store.state.menuData;
      },
    },
    watch:{
        menuDataList:{
          handler(data){
              let btns =  getMenuBtnList(data,this.$route.path) 
              btns.map(item=>{
                if(item.name == '查询') this.btn1 = true
                if(item.name == '新开发票') this.btn2 = true
                if(item.name == '发票记录') this.btn3 = true
              })
          },
          immediate:true,
          deep:true
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
