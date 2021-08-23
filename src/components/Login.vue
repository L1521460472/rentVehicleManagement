<template>
  <div id="login">
    <div class="header scoped">
      <div class="nav">
        <img src="../assets/航通北斗logo2020版(透明格式)-1@1x.png" alt />
        <span>新能源汽车租赁业务系统</span>
      </div>
    </div>
    <div class="main">
      <img src="../assets/logo_bg.jpg" alt />
      <div class="left">
        <img src="../assets/HTBD_APP.png" alt="">
        <p>扫码下载最新App</p>
        <p class="remark">(支持IOS/Android)</p>
      </div>
      <div class="center">
        <img src="../assets/phone2.png" alt="">
      </div>
      <div class="login">
        <div class="top">
          <div class="loginHeader">欢迎登录/USER LOGIN</div>
          <div class="username">
            <!-- <span class="demonstration">名称</span> -->
            <el-input v-model="username" maxlength="100" placeholder="请输入用户名称" @input="changeInfo">
              <i slot="prefix" class="el-input__icon"></i>
            </el-input>
            <img src="../assets/Frame@1x.png" alt />
          </div>
          <div class="password">
            <!-- <span class="demonstration">密码</span> -->
            <el-input type="password" v-model="password" maxlength="8" placeholder="请输入登录密码" @input="changeInfo">
              <i slot="prefix" class="el-input__icon"></i>
            </el-input>
            <img src="../assets/Frame@1x-1.png" alt />
          </div>
          <el-checkbox v-model="checked" @change="changeChecked" class="remember">记住账号和密码</el-checkbox>
          <el-button class="button" @click="login" :loading="logining">登录</el-button>
        </div>
        <div class="bottom">
          <p>客服热线：400-8899-918</p>
          <p>服务时间：周一至周五 09:00-18:00</p>
        </div>
      </div>
    </div>
    <div class="footer scoped">
      <div>©2020 深圳市航通北斗信息技术有限公司 版权所有 ​​粤ICP备15008917号</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bcryptjs from "bcryptjs";
import JSEncrypt from "jsencrypt";
import { mapActions } from "vuex";
import { getCookie, setCookie, removeCookie,openNewTab } from "../public";
export default {
  name: "login",
  data() {
    return {
      logining:false,
      username: "",
      password: "",
      checked: false,
    };
  },
  methods: {
    changeChecked(val){
      if(!val){
        this.password =''
      }
    },
    //修改输入框清空cookie
    changeInfo(){
      removeCookie('HTuserName');
      removeCookie('HTpassWord');
    },
    login() {
      this.logining = true
      // if(this.checked == true){
      //   setCookie('HTuserName',this.username,30);
      //   setCookie('HTpassWord',this.password,30);
      // }else{
      //   removeCookie('HTuserName');
      //   removeCookie('HTpassWord');
      // }

      // this.$router.push('/home');
      //Bcrypt加密流程
      var salt = bcryptjs.genSaltSync(12); //定义密码加密的计算强度，默认10
      var hash = bcryptjs.hashSync("admin", salt); //进行加密

      //RSA加密流程
      let jse = new JSEncrypt(); //新建JSEncrypt对象
      //后端传回的公钥
      let publicKey =
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsdyqfaCfhwUuvIUyMnKu9Btmcx1bX53a9tV0q0vSF/S4fd+DjzhX/u8FWHH61e/YpRwvs6DiC/h06hgYnswnZxEvwp/eRxnt6JQVK2y+v8ZzZ838Z6fRb82W3g5FLJfTtJPf93uKlTDQywjYvmO1qbQTFraUNMSxzBi2/unRLHwIDAQAB";
      jse.setPublicKey(publicKey); //设置公钥
      let A = jse.encrypt("admin"); //进行加密
      // console.log(A);
      if(this.checked == true){
        if(!(getCookie('HTuserName') && getCookie('HTpassWord'))){
          setCookie('HTuserName',this.username,30);
          setCookie('HTpassWord',jse.encrypt(this.password),30);
        }
      }else{
        removeCookie('HTuserName');
        removeCookie('HTpassWord');
      }
      let password1
      if(getCookie('HTuserName') && getCookie('HTpassWord')){
        password1 = getCookie('HTpassWord')
      }else{
        password1 =  jse.encrypt(this.password)
      }
      axios({
        method: "post",
        url: "/security-jwt-service/auth/login",
        data: {
          loginName: this.username,
          password: password1,
          mobileCode: 0,
          rememberMe: 0,
        },
      })
        .then((result) => {
          this.logining = false
          // console.log(result.data);
          if (result.data.status === 0) {
            setCookie("HTBD_UserName", this.username, 1 / 12);
            setCookie("HTBD_PASS", result.data.data.token, 1 / 12);
            setCookie("userInfo", result.data.data.userInfoVo.username);
            setCookie("userId", result.data.data.userInfoVo.userId);
            setCookie("UserEnterpriseId", result.data.data.userInfoVo.enterpriseId);
            setCookie('setlogoAddress',result.data.data.userInfoVo.logoAddress)
            setCookie('setsystemTitle',result.data.data.userInfoVo.systemTitle)
            this.$store.commit('setlogoAddress',result.data.data.userInfoVo.logoAddress)
            this.$store.commit('setsystemTitle',result.data.data.userInfoVo.systemTitle)
            this.$store.commit('setUpdatePwdFlag',result.data.data.userInfoVo.isUpdatePwdFlag)
            this.$store.commit('setUserEnterpriseId',result.data.data.userInfoVo.enterpriseId)
            if(result.data.data.userInfoVo.authorityData
            &&result.data.data.userInfoVo.authorityData.length>0
            &&result.data.data.userInfoVo.authorityData[0].children[0].show){
              this.$router.push(result.data.data.userInfoVo.authorityData[0].children[0].children[0].url)
              this.$store.commit('setDefualtPage',result.data.data.userInfoVo.authorityData[0].children[0].children[0])
              }else{
                if(result.data.data.userInfoVo.authorityData&&result.data.data.userInfoVo.authorityData.length>0){
                  this.$router.push(result.data.data.userInfoVo.authorityData[0].children[0].url)
                  this.$store.commit('setDefualtPage',result.data.data.userInfoVo.authorityData[0].children[0])
                }
                else{
                  this.$message.error("该账号暂没开通任何功能业务，请联系系统管理员！")
                }
            }
          } else {
            this.logining = false
            let msg="登录失败"
            if(result.data.message){
                msg=result.data.message
            }
            else if(result.data.data.message){
              msg=result.data.data.message
            }
            this.$message({
              message: msg,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
            this.logining = false
            this.$message({
              message: err.message,
              center: true,
              type: "error",
            });
        });
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        //enter回车键 == 13
        this.login();
      }
    },
  },
  computed: {},
  mounted() {
      setTimeout(() => {
            window.onload()
          }, 10)
    if(getCookie('HTuserName') && getCookie('HTpassWord')){
      this.checked = true;
      this.username = getCookie('HTuserName');
      this.password = '********';
    }
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },
};
</script>

<style scoped>
#login {
  width: 100%;
  min-width: 1440px;
  height: 100%;
  min-height: 700px;
  position: relative;
}
.header {
  width: 100%;
  height: 17%;
  background: #f1f1f1;
  box-sizing: border-box;
  position: relative;
}
.nav {
  position: absolute;
  left: 104px;
  bottom: 20px;
  height: 42px;
  box-sizing: border-box;
  line-height: 42px;
}
.nav img {
  display: inline-block;
  width: 120px;
  height: 42px;
  float: left;
}
.nav span {
  display: inline-block;
  /* width: 265px; */
  height: 42px;
  float: left;
  color: #565757;
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 24px;
  line-height: 42px;
}
.main {
  width: 100%;
  height: 66%;
  position: relative;
}
.main img {
  width: 100%;
  height: 100%;
}
.main .left{
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translateY(-50%);
}

.main .left img{
  width: 138px;
  height: 138px;
  display: block;
}
.main .left p{
  color: #FFFFFF;
  font-family: Source Han Sans CN;
  font-weight: regular;
  font-size: 16px;
  line-height: 10px;
  letter-spacing: 0.1px;
  text-align: left;
}
.main .left .remark{
  color: #FFFFFF;
  font-family: Source Han Sans CN;
  font-weight: regular;
  font-size: 12px;
  line-height: 5px;
  letter-spacing: 0.1px;
  text-align: left;
}
.main .center{
  position: absolute;
  top: 50%;
  left: 37%;
  transform: translateY(-50%);
  width: 197px;
  height: 405px;
  display: block;
}
.main .center img{
  width: 197px;
  height: 405px;
  display: block;
}
.footer {
  width: 100%;
  height: 17%;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 170px;
}
.login .top {
  width: 320px;
  height: 360px;
  margin: auto;
  background: #fff;
  border: 1px solid fff;
}
.login .bottom{
  color: #FFFFFF;
  font-family: Source Han Sans CN;
  font-weight: regular;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.1px;
  text-align: left;
}
.login .bottom p {
  line-height: 15px;
}
.loginHeader {
  padding: 30px 0 0 30px;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}
.login .demonstration {
  display: inline-block;
  width: 60px;
  margin-right: 10px;
  text-align: right;
}
.login .el-input {
  width: 260px;
  height: 50px;
}
.login .el-input__inner {
  height: 50px !important;
}
.username {
  margin-top: 40px;
  margin-left: 30px;
  border-radius: 4px;
  position: relative;
}
.username img {
  position: absolute;
  top: 7px;
  left: 7px;
  width: 18px;
  height: 18px;
  display: block;
}
.password {
  margin-top: 20px;
  margin-left: 30px;
  border-radius: 4px;
  position: relative;
}
.password img {
  position: absolute;
  top: 7px;
  left: 7px;
  width: 18px;
  height: 18px;
  display: block;
}
.login >>> .button {
  width: 260px;
  /* height: 50px; */
  box-sizing: border-box !important;
  margin-top: 25px;
  margin-left: 30px;
  border-radius: 4px;
  background: #398cfe;
  color: #ffffff;
  font-weight: medium;
  font-size: 14px;
  line-height: 18px;
  font-family: Source Han Sans CN;
  border: 0;
}
.remember {
  margin-top: 13px;
  margin-left: 30px;
}
.footer{
  color: #999999;
  font-size: 12px;
}
</style>
