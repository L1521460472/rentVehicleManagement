<template>
  <div class="mycenter" v-loading="isloading">
    <div class="center">个人中心</div>
    <div class="form">
      <div class="company">公司信息</div>
      <hr class="diliver"/>
      <div class="container">
        <div class="item">
          <label>所属公司</label>
          <span>{{basedata.companyName}}</span>
        </div>
        <div class="item">
          <label>已开账号数</label>
          <span>{{basedata.openedAccounts}}</span>
        </div>
      </div>
    </div>
    <div class="form">
      <div class="company">用户信息</div>
      <hr class="diliver" />
      <div class="container">
        <div class="item">
          <label>用户姓名</label>
          <span>{{basedata.userName}}</span>
        </div>
        <div class="item">
          <label>登录账号</label>
          <span>{{basedata.loginName}}</span>
        </div>
        <div class="item">
          <label>电话号码</label>
          <span>{{basedata.phoneNumber}}</span>
        </div>
        <div class="item">
          <label>邮箱地址</label>
          <span>{{basedata.emailAddress}}</span>
        </div>
        <div class="item">
          <label>岗位</label>
          <span>{{basedata.post}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCookie} from "@/public";
  import axios from 'axios';
  export default{
    name:'myCenter',
    data(){
      return {
          isloading:false,
          basedata:{
                "companyName": "",
                "emailAddress": "",
                "loginName": "",
                "openedAccounts": null,
                "phoneNumber": "",
                "post": "",
                "userName": ""
          },
          url:"/platform-base-service/platformBaseUserInfo/personalCenter",
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
      }
    },
    mounted(){
      this.isloading=true;
      axios.get(this.url,{
        headers:this.headers
      })
      .then((respone)=>{
        if(respone.data.status==0){
          this.basedata=respone.data.data
        }
        else{
          this.$message.info("获取个人信息失败")
        }
        this.isloading=false;
      })
      .catch(()=>{
        this.$message.info("获取个人信息失败")
        this.isloading=false;
      })
    }
  }
</script>

<style scoped>
  .mycenter{
    font-size: 14px;
     border:1px solid #E5E5E5;
     padding: 20px;
  }
  .center{
        color: #333333;
        font-family: Microsoft YaHei;
        font-size: 18px;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: left;
        margin-left: 9px;
  }
  .form{
    background-color: white;
    padding: 20px;
    margin: 20px 5px;
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
  .item{
        padding: 5px 10px;
        margin: 10px 0px;
  }
  .item > label{
    padding: 5px 10px;
    color: gray;
    text-align: right;
    display: inline-block;
  }
  .item> span{
    font-weight: 600;
  }
</style>
