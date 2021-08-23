<template>
  <div id="changePassword">
    <div style="margin-bottom: 5px;margin-left: 10px;">
      <span style="color: #F56C6C;">当前密码为系统默认初始密码，请修改密码！（密码组成规则：至少由英文+数字6-16位密码组成。）</span>
    </div>
    <div class="footer">
      <div class="footerNav">
        <el-form ref="form" :model="form" label-width="125px" class="from" label-position="right">
          <el-form-item class="formItem" prop="password"
          :rules="[{ required: true, message: '新密码不能为空', trigger: 'blur' }]" label="新密码">
            <el-input maxlength="8" size="small" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item class="formItem" prop="confirmPassword"
          :rules="[{ required: true, message: '确认密码不能为空', trigger: 'blur' }]" label="确认密码" >
            <el-input maxlength="8" size="small" v-model="form.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
        <div class="footerButton">
          <el-button type="primary" size="small" @click="saveAction">保存</el-button>
          <el-button v-if="!iscomponent" size="small" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import bcryptjs from "bcryptjs";

import { getCookie, setCookie, removeCookie } from "../public";
export default {
  name: "changePassword",
  data() {
    return {
      form: {
        password: "",
        confirmPassword: "",
      },
      userId: "", //用户id
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      }, //请求头
    };
  },
  props:{
    iscomponent:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    // 保存
    saveAction() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(!/^[a-zA-Z]\w{5,15}$/.test(this.form.password)){
            this.$message({
              message: "密码组成规则：至少由英文+数字6-16位密码组成，请修改",
              center: true,
              type: "warning",
            });
             return
          }
          let resetdata = {};
          resetdata.id = this.userId;
          //Bcrypt加密流程
          var salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
          resetdata.resetPassStr1 = bcryptjs.hashSync(
            this.form.password,
            salt
          ); //进行加密
          resetdata.resetPassStr2 = bcryptjs.hashSync(
            this.form.confirmPassword,
            salt
          ); //进行加密
          axios({
            method: "post",
            url: "/platform-base-service/platformBaseUserInfo/resetPassword",
            headers: this.headers,
            data: resetdata,
          })
            .then((res) => {
             if(res.data.status ===0){
                this.$alert('修改密码成功，请重新登录', '', {
                    confirmButtonText: '确定',
                    showClose:false,
                    callback: action => {
                      this.$router.push('/login')
                    }
                });
             }else{
              this.$message({
                message: res.data.message,
                center: true,
                type: "error",
              });
             }
            })
            .catch((err) => {
              this.$message({
                message: err.data.message,
                center: true,
                type: "error",
              });
            });
        }
      });
    },
    // 取消
    cancel() {
      // 返回上一路由
      this.$router.back();
    },
  },
  mounted() {
      setTimeout(() => {
            window.onload()
          }, 10)
    this.form.password = "";
    this.form.confirmPassword = "";
    this.userId = getCookie("userId");
  },
};
</script>
<style scoped>
#changePassword {
  width: 100%;
  height: calc(100% - 76px);
}
.header {
  width: 100%;
  height: 26px;
  box-sizing: border-box;
  padding-left: 40px;
  margin-bottom: 16px;
}
.header span {
  color: rgba(51, 51, 51, 1);
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 16px;
  line-height: normal;
}
.footer {
  width: 100%;
  height: calc(100% - 26px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
/* .footerTitle {
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding-left: 40px;
  background-color: #f5f7fa;
} */
.footerTitle span {
  color: #368cfe;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 16px;
}
.footerNav {
  width: 100%;
  height: calc(100% - 39px);
  box-sizing: border-box;
  margin-top: 40px;
}
.el-form {
  width: 100%;
  height: calc(100% - 56px);
  overflow: hidden;
}
.formItem {
  float: left;
}
.footerButton {
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  padding-top: 12px;
  padding-left: 44%;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.footerNav .el-input {
  width: 160px;
}
.footerNav .el-input__inner {
  width: 160px;
}
.footerNav >>> .el-input--suffix {
  width: 160px;
}
</style>
