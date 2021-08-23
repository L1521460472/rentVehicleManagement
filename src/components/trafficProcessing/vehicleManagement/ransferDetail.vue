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
    <div class="top">
      <div class="form">
        <div class="row">
          <div class="item"><label>车主姓名</label><span v-html="subdata.ownerName"></span></div>
          <div class="item"><label>过户费用</label><span v-html="subdata.transferCost"></span></div>
          <div class="item"><label>车牌变更</label><span v-html="subdata.transferVehicleno"></span></div>
        </div>
        <div class="row">
          <div class="item"><label>过户日期</label><span v-html="subdata.transferDate"></span></div>
          <div class="item"><label>手机号</label><span v-html="subdata.phoneNumber"></span></div>
          <div class="item"><label>身份证号</label><span v-html="subdata.idNumber"></span></div>
        </div>
        <div class="row">
          <div class="item"><label>车辆价格(元)</label><span v-html="subdata.vehiclePrice"></span></div>
          <div class="item"><label>备注</label><span v-html="subdata.remark"></span></div> 
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
  import axios from 'axios'
  import{getCookie,getMenuBtnList} from "@/public"
  export default{
    name:'ransferDetail',
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
     getranferRecord(){
       if(this.vehicleId){
         axios({
           method: "get",
           url:'/vehicle-service/ransferInfo/ransferRecord?vehicleId='+this.vehicleId,
           headers:this.headers
         })
         .then((result)=>{
           if(result.data&&result.data.data&&result.data.data){
             this.subdata=result.data.data
           }
         })
         .catch((err)=>{
           console.log(err)
           this.$message({
             message: "未获取到过户信息，请稍后再试",
             center: true,
             type: "error",
           });
         })
       }
     }
    },
    mounted(){
      this.getbasedata()
      this.getranferRecord()
    },
    computed:{
    },
    watch:{
      contractId(){
        if(this.contractId){
          this.getbasedata()
        }
      },
      vehicleId(){
        if(this.vehicleId){
          this.getranferRecord()
        }
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
  height: 350px;
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
  text-align: left;
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
