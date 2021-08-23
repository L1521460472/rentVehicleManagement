<template>
  <div class="container">
      <div class="h1">充值</div>
      <div>
        <span class="label">企业余额：</span class=""value><span v-html="accountBalance"></span>元
      </div>
      <div>
         <span class="label">金额选择：</span>
         <div class="paycount">
             <el-radio v-if="isadmin" v-model="paycount" label="0.01">0.01元</el-radio>
             <el-radio v-model="paycount" label="10">10元</el-radio>
             <el-radio v-model="paycount" label="50">50元</el-radio>
             <el-radio v-model="paycount" label="300">300元</el-radio>
         </div>
      </div>
      <div class="paybtn" style="margin-bottom: 50px;margin-left: 110px;margin-top: 20px;">
        <el-button size="small" type="primary" @click="pay">支付</el-button>
      </div>
      <div class="searchdiliver"></div>
      <div class="second">
        <span class="h2">充值须知:</span>
      </div>
      <div class="mark">
        <div>1. 本产品属于特殊商品，一经售出概不退换。</div>
        <div>2. 如需开具发票，请联系客服。</div>
      </div>
      <div class="paybtn">
         <el-button size="small"  type="primary" @click="chongzhijilu">充值记录</el-button>
         <el-button size="small"  type="primary" @click="koufeijilu">扣费记录</el-button>
      </div>
  </div>
</template>

<script>
  import axios from "axios"
import { getCookie,formatJE } from "@/public";
  export default{
    name:'pay',
    data(){
      return {
        accountBalance:"0.00",
        paycount:'0.01',
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      }
    },
    methods:{
      pay(){
        if(!isNaN(this.paycount)&&this.paycount<0){
          this.$message({
            message: "订单金额格式不正确，请重新充值",
            center: true,
            type: "error",
          });
        }
        axios({
          method: "post",
          url:'/platform-base-service/pay/orderPlace?money='+this.paycount,
          headers:this.headers
        })
        .then((result)=>{
          if(result.data&&result.data.data){
            this.$router.push({name:'onlinepay',params:{orderNo:result.data.data}})
          }
        })
        .catch((err)=>{
          console.log(err)
          this.$message({
            message: "服务器繁忙，生成订单失败，请稍后再试",
            center: true,
            type: "error",
          });
        })
      },
      chongzhijilu(){
        this.$router.push({name:'payrecord'})
      },
      koufeijilu(){
        this.$router.push({name:'chargerecord'})
      }
    },
    mounted(){
      axios({
            method: "post",
            url:'/platform-base-service/rechargeRecord/rechargeJump',
            headers:this.headers
          })
          .then((result)=>{
            if(result.data&&result.data.data){
                setTimeout(() => {
            window.onload()
          }, 10)
               this.accountBalance=formatJE(result.data.data.accountBalance)
            }
          })
          .catch((err)=>{
            console.log(err)
            this.$message({
              message: "服务器繁忙，查询企业余额失败，请稍后再试",
              center: true,
              type: "error",
            });
      })
    },
    computed:{
      isadmin(){ 
        return getCookie('userInfo')=="admin"?true:false
      }
    }
  }
</script>

<style scoped>
.container{
  padding: 20px;border: 1px solid #E5E5E5; height: calc(100% - 103px);
}
.h1{
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 10px;
}
.label{
  font-size: 16px;
  font-weight: 700;
  margin: 10px 20px 10px 10px;
  display: inline-block;
}
.paycount{
  display: inline-block;
}
.paybtn{
  margin: 10px 10px;
}
.h2{
  margin-left: 10px;
  font-size: 16px;
}
.mark{
  margin-bottom: 40px;
}
.mark div{
  margin: 10px 10px;
  font-size: 16px;
}
.second{
  margin-top: 50px;
}

.searchdiliver{
	background-image: url(../../assets/diliver.svg);
	height: 1px;
	margin: 5px 5px;
}
/deep/ .paybtn > button{
  width: 80px!important;
}
</style>
