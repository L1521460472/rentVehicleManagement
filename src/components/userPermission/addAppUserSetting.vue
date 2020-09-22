<template>
  <div id="addAppUserSetting">
    <div class="header">
      <span v-if="international.title">{{ showMes }}</span>
    </div>
    <div class="footer">
      <div class="footerTitle">
        <span v-if="international.title">{{international.title.title_baseInfo}}</span>
      </div>
      <div class="footerNav" v-if="international.title">
        <el-form ref="form" :model="form" label-width="125px" class="from" label-position="right">
            <el-form-item 
            class="formItem"
            prop="username" 
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
            :label="international.content.content_appUserSettings_userAccount" >
                <el-input maxlength="100" size="small"  v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item
            v-if="$route.query.from == 'add'"
            class="formItem" 
            prop="password" 
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
            :label="international.content.content_appUserSettings_password">
                <el-input maxlength="100" size="small"  v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item 
            prop="email" 
            class="formItem"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
            :label="international.content.content_appUserSettings_email">
                <el-input maxlength="100" size="small"  v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item 
            prop="mobile" 
            class="formItem"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
            :label="international.content.content_appUserSettings_phone">
                <el-input maxlength="100" size="small"  v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_appUserSettings_status">
                <el-select size="small" v-model="form.userStatus" placeholder="" >
                    <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_appUserSettings_belongInstitutional">
                <el-select size="small" filterable v-model="form.enterpriseId"  placeholder="" >
                    <el-option
                    v-for="item in belongList"
                    :key="item.id"
                    :label="item.enterpriseName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_appUserSettings_remark">
                <el-input maxlength="300" size="small" type="textarea"   v-model="form.content"></el-input>
            </el-form-item>
        </el-form>
        <div class="footerButton">
            <el-button type="primary" size="small" @click="$route.query.from == 'add' ? addConfirm():editConfirm()" >{{
                international.global.global_confirm
            }}</el-button>
            <el-button size="small" @click="cancel">{{
                international.global.global_cancel
            }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bcryptjs from "bcryptjs";
import { getCookie, setCookie, removeCookie ,getMenuBtnList} from "../../public";
import { getAppUserDeail,addAppUserSetting,editAppUserSetting,getBelongList,getStatusList } from '../../api/userPermissions/api'
export default {
  name: "addAppUserSetting",
  data() {
      return {
        form:{
            content: "",
            email:"" ,
            enterpriseId: '',
            mobile: '',
            password: '',
            userStatus: '',
            username: ''
        },//新增数据
        statusList:[],//状态列表
        belongList:[], //归属管理机构列表
        international:{},
        showMes: "", //新增修改标题
        showButton: false, //确定新增修改按钮
        headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    }
  },
  methods: {
    addConfirm() {
        this.$refs.form.validate((valid)=>{
            if(valid){
                let salt = bcryptjs.genSaltSync(12); //定义密码加密的计算强度，默认10
                let hash = bcryptjs.hashSync("admin", salt); //进行加密
                let params = {
                    content: this.form.content,
                    email: this.form.email,
                    enterpriseId: this.form.enterpriseId,
                    mobile: this.form.mobile,
                    password: hash,
                    userStatus: this.form.userStatus,
                    username: this.form.username
                }
                addAppUserSetting(params,this.headers).then(res=>{
                    if(res.status == 0){
                        this.$store.commit("changeIsStatus", true);
                        this.$message.success({
                          message:this.international.global.global_addSuccess,
                          center:true
                        })
                        this.$router.back();
                    }else{
                        this.$message.error({
                          message:res.message,
                          center:true
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        })
    },
    editConfirm(){
        this.$refs.form.validate((valid)=>{
            if(valid){
                let params = {
                    id: this.$route.query.id,
                    content: this.form.content,
                    email: this.form.email,
                    enterpriseId: this.form.enterpriseId,
                    mobile: this.form.mobile,
                    // password: hash,
                    userStatus: this.form.userStatus,
                    username: this.form.username
                }
                editAppUserSetting(params,this.headers).then(res=>{
                    if(res.status == 0){
                        this.$store.commit("changeIsStatus", true);
                        this.$message.success({
                          message:this.international.global.global_changeSuccess,
                          center:true
                        })
                        this.$router.back();
                    }else{
                        this.$message.error({
                          message:res.message,
                          center:true
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        })
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    // 获取归属管理机构列表和状态列表
    getBelongManagementList(){
        // 获取归属管理机构列表
        getBelongList({enterpriseType:2},this.headers).then(res=>{
            this.belongList = res.data
        }).catch(err=>{
            console.log(err)
        })
        getStatusList({type:'status'},this.headers).then(res=>{
            this.statusList = res.data
        }).catch(err=>{
            console.log(err)
        })
    },
  },
  mounted() {
      this.getBelongManagementList()
      if(this.$route.query.from == 'add'){
        // this.showButton = true;
        this.form.content = "";
        this.form.email = "";
        this.form.enterpriseId = "";
        this.form.mobile = "";
        this.form.password = "";
        this.form.userStatus = 232;
        this.form.username = "";
      }else{
        getAppUserDeail({id:this.$route.query.id},this.headers).then(res=>{
            this.form.content = res.data.content;
            this.form.email = res.data.email;
            this.form.enterpriseId = res.data.enterpriseId;
            this.form.mobile = res.data.mobile;
            this.form.userStatus = res.data.userStatus;
            this.form.username = res.data.username;
        }).catch(err=>{
            console.log(err)
            this.$message({
                message: err.response.data.message,
                center: true,
                type: "error",
            });

        })
      }
  },
  computed: {
    // 计算国际化标题和按钮
    internationalTitle() {
      return this.$store.state.languageTitle;
    }
  },
  watch: {
    // 监听国际化标题和按钮变化
    internationalTitle: {
      handler(data) {
        this.international = data;
        if(this.$route.query.from == 'add'){
            this.showMes =this.international.title ? this.international.title.title_appUserSettings_addAppUser :''
        }else if(this.$route.query.from == 'edit'){
            this.showMes = this.international.title ? this.international.title.title_appUserSettings_editAppUser :''
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style scoped>
#addAppUserSetting {
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
.header span{
    color: rgba(51,51,51,1);
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
.footerTitle{
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 40px;
    background-color: #F5F7FA;
}
.footerTitle span{
    color: #368cfe;
    font-family: Microsoft YaHei;
    font-weight: regular;
    font-size: 16px;
}
.footerNav{
    width: 100%;
    height: calc(100% - 79px);
    box-sizing: border-box;
    margin-top: 40px;
}
.el-form{
    width: 100%;
    height: calc(100% - 56px);
    overflow: hidden;
}
.formItem{
    float: left;
}
.footerButton{
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
.footerNav >>> .el-textarea {
  width: 450px;
}

</style>
