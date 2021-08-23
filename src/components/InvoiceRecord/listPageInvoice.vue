<template>
  <div class="container">
    <div style="width: 80%;">
      <div class="top">
        <div class="form">
          <div class="row">
            <div class="item"><label>客户类型</label><span v-html="basedata.customerTypeStr"></span></div>
          </div>
          <div class="row">
            <div class="item"><label>合同编号</label><span v-html="basedata.contractCode"></span></div>
            <div class="item"><label>合同状态</label><span v-html="basedata.contractStatusStr"></span></div>
          </div>
          <div class="row">
            <div class="item"><label>合同应收</label><span v-html="basedata.accountsReceivable"></span></div>
            <div class="item"><label>合同已收</label><span v-html="basedata.received"></span>
            </div>
          </div>
          <div class="row">
            <div class="item"><label>已开票金额</label><span v-html="basedata.invoicedAmount">{{}}</span></div>
            <div class="item"><label>未开票金额</label><span v-html="basedata.unInvoicedAmount"></span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="btnbar">
      <el-button type="primary" @click="search()">全部</el-button>
      <el-button :type="primary1" @click="search(1)">普票</el-button>
      <el-button :type="primary2" @click="search(2)">专票</el-button>
      <el-button :type="primary3" @click="search(3)">电子票</el-button>
      <el-button :type="primary4" @click="search(4)">其他</el-button>
    </div>
    <div class="table" v-loading="loading">
      <div v-if="list!=null&&list.lenght>0" style="text-align: center;color: gray;margin-top: 50px;">暂无数据</div>
      <div class="trow" v-for="(item,index) in list" :key="index">
        <div class="trow-item">
          <div class="trow-item-item">
            <label>发票类型：</label>
            <span v-if="item.invoiceType==1">增值税普通发票</span>
            <span v-if="item.invoiceType==2">增值税专用发票</span>
            <span v-if="item.invoiceType==3">增值税电子普通发票</span>
            <span v-if="item.invoiceType==4">其他</span>
          </div>
        </div>
        <div class="trow-item">
          <div class="trow-item-item">
            <label>开票日期：</label>
            <span>{{item.invoiceDate}}</span>
          </div>
          <div class="trow-item-item">
            <label>开票金额：</label>
            <span>{{item.invoiceAmount}}</span>
          </div>
        </div>
        <el-button v-if="item.status==1" class="xianqing" type="primary" size="mini" @click="ondetail(item)">详情</el-button>
        <div v-else class="zuofei" @click="ondetail(item)" title="点击查看详细">已作废</div>
      </div>
    </div>
    <div class="page">
      <el-pagination style="display: inline-block;"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchdata.currentPage"
        :page-sizes="[10, 20, 50, 100, 200]"
         :page-size="searchdata.pageSize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-button @click="$router.back()" style="vertical-align: bottom;margin-left: 20px;" type="primary" size="mini">返回</el-button>
    </div>
    <el-dialog title="发票详情" :close-on-click-modal="false" :close-on-press-escape="false"
      :visible.sync="dialogVisible" width="40%"
      :before-close="handleClose">
      <invoiceDetail :fapiaoid="fapiaoid" @callback="callback"></invoiceDetail>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import{formatJE,getCookie,getMenuBtnList} from "@/public"
  import invoiceDetail from '@/components/InvoiceRecord/invoiceDetail.vue'
  export default{
    components:{
      invoiceDetail
    },
    name:'listPageInvoice',
    data(){
      return {
        dialogVisible:false,
        fapiaoid:"",
          basedata:{
            customerTypeStr:"",
            contractCode:"",
            contractStatusStr:"",
            accountsReceivable:"",
            received:"",
            invoicedAmount:"",
            unInvoicedAmount:""
          },
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
          searchdata:{
            "contractId": this.$route.query["contractId"],
            "customerId": null,
            "invoiceType": null,
            "currentPage": 1,
            "pageSize": 10
          },
          list:[],
          total:0,
          primary1:"",
          primary2:"",
          primary3:"",
          primary4:"",
          loading:false
      }
    },
    methods:{
      handleClose(done){
        done()
      },
      ondetail(item){
        this.dialogVisible=true
        this.fapiaoid=item.id
      },
      callback(){
        this.search(this.searchdata.invoiceType)
      },
      search(flag){
        this.searchdata.invoiceType=flag
        this.primary1=""
        this.primary2=""
        this.primary3=""
        this.primary4=""
        switch(flag){
          case 1:this.primary1="primary";break;
          case 2:this.primary2="primary";break;
          case 3:this.primary3="primary";break;
          case 4:this.primary4="primary";break;
        }
        this.searchdata.currentPage=1
        this.getlist();
      },
     handleSizeChange(val){
       this.searchdata.pageSize=val
       this.search(this.searchdata.invoiceType)
     },
     handleCurrentChange(val){
        this.searchdata.currentPage=val
        this.search(this.searchdata.invoiceType)
     },
     getlist(){
       this.loading=true
       axios({
         method: "post",
         url:'/vehicle-service/invoiceRecord/listPageInvoice',
         data:this.searchdata,
         headers:this.headers
       })
       .then((result)=>{
         if(result.data&&result.data.data&&result.data.data.records){
             setTimeout(() => {
            window.onload()
          }, 10)
           this.list=result.data.data.records
           this.list.map((item)=>{
             item.invoiceAmount=formatJE(item.invoiceAmount)
           })
           this.total=result.data.data.total
         }
         this.loading=false
       })
       .catch((err)=>{
          this.loading=false
         console.log(err)
         this.$message({
           message: "服务器繁忙，请稍后再试",
           center: true,
           type: "error",
         });
       })
     },
     getbasedata(){
       axios({
         method: "post",
         url:'/vehicle-service/invoiceRecord/listPage',
         data:{id:this.$route.query['contractId']},
         headers:this.headers
       })
       .then((result)=>{
         if(result.data&&result.data.data&&result.data.data.records){
           this.basedata=result.data.data.records[0]
           this.basedata.accountsReceivable=formatJE(this.basedata.accountsReceivable)
           this.basedata.received=formatJE(this.basedata.received)
           this.basedata.invoicedAmount=formatJE(this.basedata.invoicedAmount)
           this.basedata.unInvoicedAmount=formatJE(this.basedata.unInvoicedAmount)
         }
       })
       .catch((err)=>{
         console.log(err)
         this.$message({
           message: "服务器繁忙，请稍后再试",
           center: true,
           type: "error",
         });
       })
     }
    },
    mounted(){
      // this.getbasedata()
      // this.getlist()
    },
    computed:{
      thisroutequery(){
        return this.$route.query
      }
    },
    watch:{
      thisroutequery: {
        handler(data){
          this.getbasedata()
          this.getlist()
        },
        immediate:true,
        deep:true
      }
    }
  }
</script>

<style scoped>
.container{
  font-size: 14px;
  padding: 10px;
  border:1px solid rgb(224, 224, 224);
  height: calc(100% - 86px);
}
.top{
  padding: 20px;
  padding-bottom: 0px;
  border:1px solid rgb(224, 224, 224);
  border-radius: 5px;
  background-color: #f5f5f5;
  margin: 10px 10px;
}
label{
  font-size: 14px;
}
.btnbar{
  margin-left: 13px;
}
.table{
  border-top:1px solid rgb(224, 224, 224);
  border-bottom:1px solid rgb(224, 224, 224);
  margin: 10px 0px;
  height: calc(100% - 252px);
  width: 80%;
  overflow-y: auto;
}
.trow{
  border:1px solid rgb(224, 224, 224);
  margin: 10px 10px;
  border-radius: 5px;
  position: relative;
  background-color: #f5f5f5;
}
.trow-item{
  display: flex;
  margin: 20px 20px;
}
.trow-item-item{
  margin-right: 50px;
}
.trow-item-item label{
   color: gray;
   margin-right: 10px;
}
.trow-item-item span{
   font-weight: 500;
   display: inline-block;
}
.item label{
   color: gray;
   width: 85px;
   display: inline-block;
}
.item span{
   font-weight: 500;
   display: inline-block;
}
.row{
  display: flex;
  margin-bottom:10px;
}
.row:last-child{
  margin-bottom:20px;
}
.item{
  width: 250px;
}
.xianqing{
      position: absolute;
      right: 20px;
      top: 20px;
      width: 70px!important;
}
.zuofei{
      position: absolute;
      right: 20px;
      top: 18px;
      border: 1px solid gray;
      border-radius: 50%;
      height: 60px;
      width: 60px;
      line-height: 60px;
      text-align: center;
      transform: rotate(-21deg);
      cursor: pointer;
}

.table::-webkit-scrollbar {
  /*滚动条整体样式*/

  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/

  height: 8px;
}

.table::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  background: #bfbfbf;
}

.table::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  border-radius: 10px;

  background: #dfdfdf;
}
</style>
