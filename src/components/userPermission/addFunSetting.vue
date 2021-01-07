<template>
  <div id="addFunSetting">
    <div class="header scoped">
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
            prop="roleName"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
            :label="international.content.content_functionPermissionSettings_role" >
                <el-input maxlength="100" size="small"  v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item
            class="formItem"
            prop="roleType"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
            :label="international.content.content_functionPermissionSettings_roleType">
                <el-select size="small" v-model="form.roleType"  placeholder="" >
                    <el-option
                    v-for="item in roleTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_functionPermissionSettings_content">
                <el-input maxlength="300" size="small"    v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_functionPermissionSettings_content">
                 <el-checkbox v-model="isDefaultRole">是否为默认角色</el-checkbox>
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
import { getCookie, setCookie, removeCookie ,getMenuBtnList} from "../../public";
import {getFunDeail,addFunSetting,editFunSetting,getTypeList} from '../../api/userPermissions/api'
export default {
  name: "addFunSetting",
  data() {
      return {
        form:{
            content: '',
            roleName:'',
            roleType:''
        },//新增数据
        statusList:[],
        roleTypeList:[],//状态列表
        international:{},
        showMes: "", //新增修改标题
        showButton: false, //确定新增修改按钮
        headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
        },
        isDefaultRole:false
    }
  },
  methods: {
    addConfirm() {
        this.$refs.form.validate((valid)=>{
            if(valid){
                let params = {
                    content: this.form.content,
                    roleName: this.form.roleName,
                    roleType: this.form.roleType,
                    isDefaultRole:this.isDefaultRole?1:0
                }
                addFunSetting(params,this.headers).then(res=>{
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
                    content: this.form.content,
                    id: this.$route.query.id,
                    roleName: this.form.roleName,
                    roleType: this.form.roleType,
                    isDefaultRole:this.isDefaultRole?1:0
                }
                editFunSetting(params,this.headers).then(res=>{
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
    // 获取下拉框的状态列表以及角色列表
    getTypeListData(){
        let params = ['status','roleType']
        getTypeList(params,this.headers).then(res=>{
            this.statusList = res.data.status
            this.roleTypeList = res.data.roleType
        }).catch(err=>{console.log(err)})
    },
  },
  mounted() {
    //   this.$store.commit("changeIsStatus", false)
      this.getTypeListData()
      if(this.$route.query.from == 'add'){
        // this.showButton = true;
        this.form.content = "";
        this.form.roleName = "";
        this.form.roleType = "";
        this.isDefaultRole=false
      }else{
        getFunDeail({id:this.$route.query.id},this.headers).then(res=>{
            this.form.content = res.data.content;
            this.form.roleName = res.data.roleName;
            this.form.roleType = res.data.roleType;
            this.isDefaultRole=res.data.isDefaultRole==1?true:false
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
            this.showMes =this.international.title ? this.international.title.title_functionPermissionSettings_addFunctionRole :''
        }else if(this.$route.query.from == 'edit'){
            this.showMes = this.international.title ? this.international.title.title_functionPermissionSettings_editFunctionRolr :''
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style scoped>
#addFunSetting {
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
</style>
