<template>
  <div class="mycenter" v-loading="isloading">
    <div class="center">新增发票</div>
    <div class="container">
      <div class="container-l">
         <div class="form2">
            <div class="item2">
              <label><span class="redstar">*</span>发票类型</label>
              <el-select v-model="adddata.invoiceType">
                <el-option :value="1" label="增值税普通发票"></el-option>
                <el-option :value="2" label="增值税专用发票"></el-option>
                <el-option :value="3" label="增值税电子普通发票"></el-option>
                <el-option :value="4" label="其他"></el-option>
              </el-select>
            </div>
            <div class="item2">
              <label><span class="redstar">*</span>发票号码</label>
              <el-input v-model="adddata.invoiceNo"></el-input>
            </div>
            <div class="item2">
              <label style="min-width: 140px;max-width: 140px;"><span class="redstar">*</span>开票日期</label>
               <el-date-picker v-model="adddata.invoiceDateStr" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="item2">
              <label ><span class="redstar">*</span>开票金额(单位：元)</label>
              <el-input v-model="adddata.invoiceAmount" @change="formatJE3(adddata.invoiceAmount,'开票金额')"></el-input>
            </div>
            <div class="item2">
              <label>税率(单位：%)</label>
              <el-input v-model="adddata.rate" placeholder="0.00%" @change="formatrate()"></el-input>
            </div>
            <div class="item2">
              <label>税额(单位：元)</label>
              <el-input v-model="adddata.tax" @change="formatJE3(adddata.tax,'税额')"></el-input>
            </div>
            <div class="item2">
              <label>备注</label>
              <el-input v-model="adddata.remark"></el-input>
            </div>
            <div class="item2">
             <el-button type="primary" @click="submmit" v-if="btn1">提交</el-button>
             <el-button @click="cancel">取消</el-button>
            </div>
         </div>
      </div>
      <div class="diliver2"></div>
      <div class="container-r">
        <div class="form">
          <div class="company">客户信息</div>
          <hr class="diliver"/>
          <div>
            <div class="item">
              <label>客户类型</label>
              <span>{{basedata.customerTypeStr}}</span>
            </div>
            <!-- 企业 -->
            <div class="item" v-if="iscompany">
              <label>客户名称</label>
              <span>{{basedata.customerName}}</span>
            </div>
            <div class="item" v-if="iscompany">
              <label>营业执照号</label>
              <span>{{basedata.busilicNo}}</span>
            </div>
            <div class="item">
              <label>联系人姓名</label>
              <span>{{basedata.personInCharge}}</span>
            </div>
            <div class="item">
              <label>联系人电话</label>
              <span>{{basedata.phoneNumber}}</span>
            </div>
            <div class="item">
              <label>客户来源</label>
              <span>{{basedata.customerSourceStr}}</span>
            </div>
          </div>
        </div>
        <div class="form">
          <div class="company">开票信息</div>
          <hr class="diliver" />
          <div>
            <div class="item">
              <label style="width: 58px;">发票抬头</label>
              <span>{{basedata.invoiceTitle}}</span>
            </div>
            <div class="item">
              <label>纳税人识别号/统一社会信用代码</label>
              <span>{{basedata.taxIdeNum}}</span>
            </div>
            <div class="item">
              <label>企业地址</label>
              <span>{{basedata.enterpriseAddr}}</span>
            </div>
            <div class="item">
              <label>企业电话</label>
              <span>{{basedata.enterprisePhone}}</span>
            </div>
            <div class="item">
              <label>公司开户行</label>
              <span>{{basedata.enterpriseBank}}</span>
            </div>
            <div class="item">
              <label>开户行账号</label>
              <span>{{basedata.enterpriseAccount}}</span>
            </div>
            <div class="item">
              <label>收件人</label>
              <span>{{basedata.addressee}}</span>
            </div>
            <div class="item">
              <label>联系电话</label>
              <span>{{basedata.telephone}}</span>
            </div>
            <div class="item">
              <label>邮寄地址</label>
              <span style="word-wrap: break-word;">{{basedata.mailingAddr}}</span>
            </div>
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
    name:'AddInvoice',
    data(){
      return {
        btn1:false,
          isloading:false,
          basedata:{},
          url:"/vehicle-service/invoiceRecord/goAddInvoice",
          addurl:"/vehicle-service/invoiceRecord/insertInvoice",
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
          iscompany:true,
          adddata:{
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
          }
      }
    },
    methods:{
      submmit(){
        if(!this.adddata.invoiceType){
          this.$message.error('发票类型不能为空')
          return
        }
        if(!this.adddata.invoiceNo){
          this.$message.error('发票号码不能为空')
          return
        }
        if(!this.adddata.invoiceDateStr){
          this.$message.error('开票日期不能为空')
          return
        }
        if(!this.adddata.invoiceAmount){
          this.$message.error('开票金额不能为空')
          return
        }
        // if(!this.adddata.rate){
        //   this.$message.error('税率不能为空')
        //   return
        // }
        // if(!this.adddata.tax){
        //   this.$message.error('税额不能为空')
        //   return
        // }
        this.isloading=true
        axios({method:'post', url:this.addurl, data:this.adddata, headers:this.headers})
        .then((respone)=>{
          if(respone.data.status==0){
             this.$message.success("提交成功")
             this.$router.back()
          }
          else{
            this.$message.info(`提交失败，${respone.data.message}`)
          }
          this.isloading=false;
        })
        .catch(()=>{
          this.$message.info("服务器繁忙，请稍后再试")
          this.isloading=false;
        })
      },
      cancel(){
        this.$router.back()
      },
      formatJE3(val,title){
        if(isNaN(val)||val<0){
           this.$message.error(`${title}填写不正确`)
           if(title=="开票金额"){
             this.adddata.invoiceAmount=""
           }
           else{
              this.adddata.tax=""
              }

              return
        }
        if(title=="开票金额"){
          this.adddata.invoiceAmount=String(formatJE(this.adddata.invoiceAmount)).replace(/[,]/gm,"")
        }
        else{
           this.adddata.tax=String(formatJE(this.adddata.tax)).replace(/[,]/gm,"")
        }
      },
      formatrate(){
        if(isNaN(this.adddata.rate)||this.adddata.rate<0){
           this.$message.error(`税率填写不正确`)
           this.adddata.rate=""
           return
        }
        this.adddata.rate=this.adddata.rate.replace(/[ ]|[　]/gm,'')
        let dot =this.adddata.rate.indexOf('.')
        if(dot>-1){
          if(dot>=1){
             this.adddata.rate=this.adddata.rate.substr(0,this.adddata.rate.indexOf('.'))
          }
          else{
              this.adddata.rate=""
          }
        }
      },

      getlist(){
        this.isloading=true;
        this.adddata.contractId=this.$route.query.contractId
        this.adddata.customerId=this.$route.query.customerId
        axios({
          method:'post',
          url:this.url,
          data:this.$route.query,
          headers:this.headers
        })
        .then((respone)=>{
          if(respone.data.status==0){
            this.basedata=respone.data.data
            if(this.basedata){
              this.iscompany = respone.data.customerType == 2 ? true:false
            }
          }
          else{
            this.$message.info("客户信息失败")
          }
          this.isloading=false;
        })
        .catch(()=>{
          this.$message.info("服务器繁忙，请稍后再试")
          this.isloading=false;
        })
      },
    },
    mounted(){
      // this.getlist()
    },
    computed: {
      menuDataList() {
        return this.$store.state.menuData;
      },
      thisroutequery(){
         return this.$route.query
      }
    },
    watch:{
      menuDataList:{
        handler(data){
            let btns =  getMenuBtnList(data,"/listPage")
            btns.map(item=>{
              if(item.name == '新开发票') this.btn1 = true
            })
        },
        immediate:true,
        deep:true
      },
      thisroutequery: {
        handler(data){
          this.getlist()
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
    padding: 20px;
    padding-bottom: 0px;
  }
  .form2{
        display: flex;
        flex-direction: column;
        align-items: center;
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
      min-width: 135px;
      max-width: 135px;
  }
  .item> span,.item2>span{
    font-weight: 600;
    display: inline-block;
    line-height: 29px;
  }
  .item:last-child{
    margin-bottom: 0px;
  }
  .item2:last-child{
    margin-bottom: 0px;
    margin-left: 67px;
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
    padding-top: 31px;
  }
  .container-r{
    flex:1
  }
  .redstar{
    color: red;
  }
</style>
