<template>
  <div class="main">
    <div v-if="ishaspay==1" class="container" v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.9)"
      element-loading-text="正在生成支付订单,请稍等...">
      <div class="paytitle">
        <div>
          <img src="../../assets/wechatpay.svg" />
        </div>
        <div style="line-height: 24px;">
          微信扫码支付
        </div>
      </div>
      <div class="paycode">
        <img v-show="showcode" src="" ref="$_codeimg_1_0" width="200" height="200"/>
      </div>
      <div class="paymark">
        请打开微信扫描上方二维码完成支付
      </div>
      <div class="haspay">
        <el-button type="primary" size="small" @click="checkhaspay">我已支付</el-button>
      </div>
    </div>
    <transition name="fade">
      <div v-if="ishaspay==2" class="container">
        <div class="paycode2">
          <img src="../../assets/wechathaspay.svg" width="80" height="80"/>
        </div>
        <div class="paymark" style="font-size: 16px;">
            已成功支付<span v-html="haspaycount"></span>元
        </div>
        <div class="haspay">
          <el-button type="primary" size="small" @click="haspay">完成</el-button>
        </div>
      </div>
    </transition>
    <transition name="fade">  
       <div v-if="ishaspay==3" class="container">
         <div class="paycode2">
           <img src="../../assets/wechatnopay.svg" width="80" height="80"/>
         </div>
         <div class="paymark" style="font-size: 16px;">
             支付失败
         </div>
         <div class="haspay">
           <el-button type="primary" size="small" @click="$router.push({name:'pay'})">关闭</el-button>
         </div>
       </div>
    </transition>    
  </div>
</template>

<script>
  import axios from 'axios'
import { getCookie ,formatJE} from "@/public";
  export default{
    name:'onlinepay',
    data(){
      return {
        loading:false,
        ishaspay:1,
        codeimg:"",
        paycount:0,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        haspaycount:0,
        orderNo:"",
        checkindex:0,
        timeoutindex:-1,
        showcode:false
      }
    },
    methods:{
      repeatcheckhaspay(){
        if(this.checkindex>60){//最多自动检查5分钟
          this.checkindex=-1
          return
        }
        let _this=this
        this.timeoutindex=window.setTimeout(function(){
          _this.checkindex++
          if(_this.orderNo){
            axios({
              method: "post",
              url:'/platform-base-service/pay/queryOrderInfo?orderNo='+_this.orderNo,
              headers:_this.headers,
            })
            .then((result)=>{
               if(result.data&&result.data.data){
                 if(result.data.data.status==0){
                    _this.repeatcheckhaspay()
                 }
                 else if(result.data.data.status==1){
                   _this.ishaspay=2
                   _this.haspaycount=result.data.data.chargeMoney
                 }
                 else if(result.data.data.status==2){
                   _this.ishaspay=3
                 }
               }
               else{
                 _this.repeatcheckhaspay()
               }
            })
            .catch((err)=>{
              console.log(err)
            })
          }
          else{
            _this.repeatcheckhaspay()
          }
        },3000)
      },
      checkhaspay(){
        axios({
          method: "post",
          url:'/platform-base-service/pay/trackOrder?orderNo='+this.orderNo,
          headers:this.headers,
        })
        .then((result)=>{
          if(result.data&&result.data.data){
            if(result.data.data.status==0){
              this.$message({
                message: "当前还没完成支付...",
                center: true,
                type: "success",
              });
            }
            else if(result.data.data.status==1){
              this.ishaspay=2
              this.haspaycount=result.data.data.chargeMoney
            }
            else if(result.data.data.status==2){
              this.ishaspay=3
            }
            else{
              this.$message({
                message: "服务器繁忙，查询支付状态失败，请返回重新充值",
                center: true,
                type: "error",
              });
            }
          }
          else{
            this.$message({
              message: "服务器繁忙，查询支付状态失败，请返回重新充值",
              center: true,
              type: "error",
            });
          }
        })
        .catch((err)=>{
          this.$message({
            message: "服务器繁忙，查询支付状态失败，请返回重新充值",
            center: true,
            type: "error",
          });
        })
      },
      haspay(){
          this.$router.push({name:'payrecord',params:''})
      }
    },
    mounted(){
      this.ishaspay=1
      if(getCookie("HTBD_PASS")){
        this.orderNo=this.$route.params.orderNo
        if(!this.orderNo){
          this.$message({
            message: "充值订单号为空，请返回重新充值",
            center: true,
            type: "error",
          });
          this.ishaspay=3
        }else{
          this.loading=true
          //////////////////////////////////////////////////////
          axios({
            method: "post",
            url:'/platform-base-service/pay/generateQRCodeWX?orderNo='+this.orderNo,
            headers:this.headers,
            responseType: 'blob'
          })
          .then((result)=>{
            this.loading=false
            if(result.data){
              this.showcode=true
              this.$refs.$_codeimg_1_0.src=window.URL.createObjectURL(result.data)
              this.repeatcheckhaspay()
            }
            else{
              this.ishaspay=3
            }
          })
          .catch((err)=>{
            console.log(err)
            this.showcode=true
            this.ishaspay=3
            this.loading=false
            this.$message({
              message: "服务器繁忙，生成订单失败，请返回重新充值",
              center: true,
              type: "error",
            });
          })
          ///////////////////////////////////////////////////////////////
        }
      }
      else{
        this.$message({
          message: "登录超时，请重新登录",
          center: true,
          type: "error",
        });
      }
    },
    beforeDestroy(){
      window.clearTimeout(this.timeoutindex)
    }
  }
</script>

<style scoped>
.main{
  font-size: 14px;
    padding: 20px;
  border: 1px solid #E5E5E5;
    height: calc(100% - 103px);
}
.container{
  width: 280px;
  height: 350px;
    border: 1px solid #bbbbbb;
  margin: 80px auto auto auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.paytitle{
  display: flex;
  justify-content: center;
}
.paytitle div{
  margin: 10px 5px;
}
.paycode{
  text-align: center;
  width: 200px;
  height: 200px;
}
.paycode2{
  text-align: center;
  width: 200px;
  height: 178px;
}
.haspay,.paymark{
  text-align: center;
  margin: 10px 0px;
}
/deep/ .haspay  button{
  width: 225px!important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
