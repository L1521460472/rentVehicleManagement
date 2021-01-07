<template>
  <div class="mycenter" v-loading="isloading">
    <!-- <div class="center">发票详情</div> -->
    <div class="container">
      <div class="container-l">
         <div class="form2">
            <div class="item2" style="position: relative;">
              <label>发票类型</label>
              <span>{{basedata.invoiceTypeStr}}</span>
              <div style="top:0;right: 0;position: absolute;">
                <el-button  v-if="zuofeibtn&&btn1" type="" size="mini" @click="onzuofei" class="zuofei">作废</el-button>
                <div v-else-if="!zuofeibtn" class="zuofei2">已作废</div>
              </div>
            </div>
            <div class="item2">
              <label>发票号码</label>
              <span>{{basedata.invoiceNo}}</span>
            </div>
            <div class="item2">
              <label>开票日期</label>
              <span>{{basedata.invoiceDateStr}}</span>
            </div>
            <div class="item2">
              <label >开票金额</label>
              <span>{{basedata.invoiceAmount}}</span>
            </div>
            <div class="item2">
              <label>税率</label>
              <span>{{basedata.rate}}</span>
            </div>
            <div class="item2">
              <label>税额</label>
              <span>{{basedata.tax}}</span>
            </div>
            <div class="item2">
              <label>备注</label>
              <span>{{basedata.remark}}</span>
            </div>
            <div class="item2" v-if="showzuofeiinput" >
              <label>作废原因</label>
              <el-input ref="textarea1" type="textarea" :rows="2" placeholder="请输入作废原因" :disabled="disabled"
              v-model="zuofeitext"  v-if="basedata.status==1">
              </el-input>
              <span v-else>{{zuofeitext}}</span>
            </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getCookie,formatJE,getMenuBtnList} from "@/public";
  import axios from 'axios';
  export default{
    name:'invoiceDetail',
    data(){
      return {
          disabled:false,
          zuofeibtn:false,
          btn1:false,
          showzuofeiinput:false,
          isloading:false,
          url:"/vehicle-service/invoiceRecord/invoiceDetail",
          zuofeiurl:"/vehicle-service/invoiceRecord/invoiceUnInvalid",
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
          basedata:{
            "contractId": null,//合同id
            "customerId": null,//客户id
            "invoiceAmount": null,//开票金额
            "invoiceDate": "",//开票日期(yyyy-MM-dd)
            "invoiceDateStr": "",//开票日期(yyyy-MM-dd)
            "invoiceNo": "",//发票号码
            "invoiceType": null,//发票类型 1-增值税普通发票 2-增值税专用发票 3-增值税电子普通发票 4-其他
            "rate": "",//税率
            "tax": null,//税额
            remark:""//备注
          },
          id: this.fapiaoid,
          zuofeitext:""
      }
    },
    props:{
      fapiaoid:{
        type:[String,Number],
        default(){
          return ""
        }
      }
    },
    methods:{
      onzuofei(){
          if(!this.showzuofeiinput){
              this.showzuofeiinput=true
              this.$message.info("请填写作废原因")
              return
          }
          if(!this.zuofeitext||!this.zuofeitext.replace(/^[ ]|[　]/gm,"")){
              if(this.$refs.textarea1){
                this.$refs.textarea1.focus()
              }
              this.$message.info("请填写作废原因")
              return
          }
          else{
            this.$confirm('作废发票, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               axios({
                 method:'post',
                 url:this.zuofeiurl,
                 data:{
                   "id": this.id,
                   "reason": this.zuofeitext
                 },
                 headers:this.headers
               })
               .then((respone)=>{
                 if(respone.data.status==0){
                   this.$message.success("已作废")
                   this.disabled=true
                   this.zuofeibtn=false
                   this.$emit("callback")
                 }
                 else{
                   this.$message.error("作废失败，请稍后再试")
                 }
                 this.isloading=false;
               })
               .catch(()=>{
                 this.$message.info("服务器繁忙，请稍后再试")
                 this.isloading=false;
               })
             }).catch(() => {
               console.log("已取消")
             });
          }
      },
      getdata(){
        let theid=this.$route.query['id']?this.$route.query['id']:this.fapiaoid
        this.disabled=false
        this.zuofeibtn=false
        this.showzuofeiinput=false
        if(theid){
          this.isloading=true;
          axios({
            method:'post',
            url:`${this.url}?id=${theid}`,
            headers:this.headers
          })
          .then((respone)=>{
            if(respone.data.status==0){
              this.basedata=respone.data.data
              this.basedata.invoiceAmount=formatJE(this.basedata.invoiceAmount)
              this.basedata.tax=formatJE(this.basedata.tax)
              if(this.basedata.rate){
                this.basedata.rate=this.basedata.rate+"%"
              }              
              this.zuofeitext=this.basedata.reason
              if(this.basedata.status==1){
                this.zuofeibtn=true
              }
              else{
                this.showzuofeiinput=true
                this.disabled=true
              }
            }
            else{
              this.$message.info("获取发票详细失败，请稍后再试")
            }
            this.isloading=false;
          })
          .catch(()=>{
            this.$message.info("服务器繁忙，请稍后再试")
            this.isloading=false;
          })
        }
      }
    },
    mounted(){
        if(this.$route.query['id']){
          this.getdata(this$route.query['id'])
        }
        else{
          this.getdata(this.fapiaoid)
        }
    },
    computed: {
      menuDataList() {
        return this.$store.state.menuData;
      },
    },
    watch:{
      fapiaoid(){
        this.getdata(this.fapiaoid)
      },
      menuDataList:{
        handler(data){
            let btns = getMenuBtnList(data,"/listPage")
            btns.map(item=>{
              if(item.name == '作废') this.btn1 = true
            })
        },
        immediate:true,
        deep:true
      }
    }
  }
</script>

<style scoped>
  .mycenter{
    font-size: 14px;
     border:1px solid #E5E5E5;
     padding-bottom: 0px;
     height: calc(100% - 97px);
  }
  .center{
        color: #333333;
        font-family: Microsoft YaHei;
        font-size: 18px;
        line-height: 40px;
        letter-spacing: 0.2px;
        text-align: left;
        height: 40px;
        background-color: rgba(245, 247, 250, 1);
        padding: 0px 20px;
  }
  .form,.form2{
    background-color: white;
    padding-bottom: 0px;
  }
  .form2{
        display: flex;
        flex-direction: column;
        padding: 20px;
  }
  .company{
    color: #169BD5;
    margin-left: 5px;
    border-left: 3px solid;
    padding-left: 10px;
  }
  .diliver{
     border: none;
     border-bottom:1px solid #E5E5E5;
  }
  .diliver2{
     margin: 0px 20px;
     margin-top: 1%;
     border-left: 1px solid #e5e5e5;
  }
  .item,.item2{
    display: flex;
  }
  .item > label,.item2>label{
    padding: 5px 10px;
    color: gray;
    text-align: right;
    display: inline-block;
    margin-right: 8px;
  }
  .item2>label{
      min-width: 60px;
      max-width: 60px;
  }
  .item> span,.item2>span{
    font-weight: 600;
    display: inline-block;
    line-height: 29px;
  }
  .item:last-child{
    margin-bottom: 0px;
  }
  .item2{
    margin-bottom: 10px;
  }
  /deep/ .item2 .el-input__inner{
    width: 215px!important;
  }
  .container{
    display: flex;
    justify-content: space-between;
  }
  .container-l{
    flex: 1;
  }
  .container-r{
    flex:1
  }
.zuofei{
        color: #409EFF!important;
        border-color: #c6e2ff!important;
        background-color: #ecf5ff!important;
  }
  .zuofei2{
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
  }
</style>
