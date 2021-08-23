<template>
  <div class="container">
    <div style="width: 100%;">
      <div class="btnbar">
        <h3>客户信息</h3>
      </div>
      <div class="top">
        <div class="form">
          <div class="row">
            <div class="item"><label>客户类型</label><span v-html="basedata.customerType"></span></div>
            <div class="item"><label>客户名称</label><span v-html="basedata.customerName"></span></div>
            <div class="item"><label>营业执照</label><span v-html="basedata.busilicNo"></span></div>
          </div>
          <div class="row">
            <div class="item"><label>联系人姓名</label><span v-html="basedata.personInCharge"></span></div>
            <div class="item"><label>联系电话</label><span v-html="basedata.phoneNumber"></span></div>
            <div class="item"><label>分配业务员</label><span v-html="basedata.saleName"></span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="btnbar">
       <h3>过户信息</h3>
    </div>
    <div class="table" v-loading="loading">
        <div class="nav">
          <span class="demonstration"><li class='redstar'>*</li>车主姓名</span>
          <el-input v-model="subdata.ownerName"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration"><li class='redstar'>*</li>过户费用</span>
          <el-input v-model="subdata.transferCost"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration"><li class='redstar'>*</li>车牌变更</span>
          <el-input v-model="subdata.transferVehicleno"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">过户日期</span>
          <el-input v-model="subdata.transferDate"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration"><li class='redstar'>*</li>手机号</span>
          <el-input v-model="subdata.phoneNumber"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">身份证号</span>
          <el-input v-model="subdata.idNumber"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">车辆价格(元)</span>
          <el-input v-model="subdata.vehiclePrice"></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">备注</span>
          <el-input v-model="subdata.remark"></el-input>
        </div>
    </div>
    <div class="page">
      <el-button type="primary" size="mini" @click="submit" :disabled="disabled">{{tijiao}}</el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import{formatJE,getCookie,getMenuBtnList} from "@/public"
  export default{
    name:'ransfer',
    props:{
      contractId:{
        type:[String,Number],
        default(){
          return ""
        }
      },
      vehicleId:{
        type:[String,Number],
        default(){
          return ""
        }
      }
    },
    data(){
      return {
        disabled:false,
        tijiao:"提交",
          basedata:{
            "busilicNo": "",
            "customerName": "",
            "customerType": "",
            "personInCharge": "",
            "phoneNumber": "",
            "saleId": null,
            "saleName": ""
          },
          subdata:{
            "idNumber": "",
            "ownerName": "",
            "phoneNumber":null,
            "remark": "",
            "transferCost":null,
            "transferDate": "",
            "transferVehicleno": "",
            "vehicleId": this.vehicleId,
            "vehiclePrice": null
          },
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
          loading:false
      }
    },
    methods:{
     getbasedata(){
       if(this.contractId){
         axios({
           method: "get",
           url:'/vehicle-service/ransferInfo/queryCustomerInfo?contractId='+this.contractId,
           headers:this.headers
         })
         .then((result)=>{
           if(result.data&&result.data.data&&result.data.data){
               setTimeout(() => {
            window.onload()
          }, 10)
             this.basedata=result.data.data
           }
         })
         .catch((err)=>{
           console.log(err)
           this.$message({
             message: "未获取到客户信息，请稍后再试",
             center: true,
             type: "error",
           });
         })
       }       
     },
     submit(){
       if(!this.subdata.ownerName){
         this.$message.error('车主姓名不能为空')
         return
       }
       if(!this.subdata.transferCost){
         this.$message.error('过户费用不能为空')
         return
       }
       if(!this.subdata.transferVehicleno){
         this.$message.error('车牌变更不能为空')
         return
       }
       if(!this.subdata.phoneNumber){
         this.$message.error('手机号不能为空')
         return
       }
       this.$confirm('车辆过户后，不再在【车辆管理】中显示，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.disabled=true
          this.tijiao='正在提交..'
          axios({
            method:'post',
            url:"/vehicle-service/ransferInfo/ransfer",
            data:this.subdata,
            headers:this.headers
          })
          .then((respone)=>{
            if(respone.data&&respone.data.status==0){
              this.$message.success("提交成功")
              this.$emit("callback")
            }
            else{
              this.$message.error(respone.data.message)
              this.disabled=false
              this.tijiao='提交'
            }
          })
          .catch(()=>{
            this.$message.info("服务器繁忙，请稍后再试")
            this.disabled=false
            this.tijiao='提交'
          })
        }).catch(() => {
          console.log("用户已取消过户")
        });
     }
    },
    mounted(){
      this.getbasedata()
    },
    computed:{
    },
    watch:{
      contractId(){ 
          this.getbasedata() 
      }
    }
  }
</script>

<style scoped>
  .page{
        text-align: center;
        margin: 20px;
  }
  .redstar{
    color: red!important;
    display: inline!important;
  }
.container{
  font-size: 14px;
  border:1px solid rgb(224, 224, 224);
  height: calc(100% - 86px);
}
.top{
  padding: 0px 20px;
  padding-bottom: 0px;
  border-radius: 5px;
  margin: 10px 10px;
}
label{
  font-size: 14px;
}
.btnbar{
  margin-left: 13px;
}
.table{
  margin: 0px 0px 10px 0px;
  height: calc(100% - 252px);
  width: 100%;
  overflow-y: auto;
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
  width: 90px;
  display: inline-block;
  text-align: right;
}
.item label{
   color: gray;
   width: 75px;
   display: inline-block;
}
.item span{
   font-weight: 500;
   display: inline-block;
}
.row{
  display: flex;
  margin-bottom:15px;
}
.row:last-child{
  margin-bottom:20px;
}
.item{
  width: 250px;
}
h3{
  margin: 15px 0px;
}
</style>
