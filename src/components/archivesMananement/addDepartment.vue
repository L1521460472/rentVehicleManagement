<template>
  <div id="addDepartment">
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
                prop="belong" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]" 
                :label="international.content.content_departmentArchives_belongOrganization">
                <el-select size="small" filterable  v-model="form.belong" placeholder=""  @change="selectEnterprise" >
                    <el-option
                    v-for="item in belongList"
                    :key="item.id"
                    :label="item.enterpriseName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
                class="formItem"
                prop="parentDepartment"
                :label="international.content.content_departmentArchives_parentDepartment">
                <el-select size="small" clearable filterable  v-model="form.parentDepartment" placeholder=""   >
                    <el-option
                    v-for="item in departmentList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
                class="formItem"
                prop="departmentName"
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"  
                :label="international.content.content_departmentArchives_departmentName" >
                <el-input maxlength="100" size="small"  v-model="form.departmentName"></el-input>
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_departmentArchives_status">
                <el-select size="small" v-model="form.status" placeholder=""   >
                    <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_departmentArchives_principal">
                <el-input maxlength="100" size="small"  v-model="form.principal"></el-input>
                <!-- <el-select size="small" v-model="form.principal" placeholder=""  >
                    <el-option
                    v-for="item in managementUserlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_departmentArchives_phone">
                <el-input maxlength="100" size="small"  v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item class="formItem" :label="international.content.content_departmentArchives_address">
                <el-input maxlength="100" size="small"  v-model="form.address"></el-input>
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
import {getStatusList,getBelongList,getDepartmentList,getPrincipalList,getDepartmentDetail,addDepartment,editDepartment} from '../../api/fileManagement/api'
import {getCookie,setCookie,removeCookie,getMenuBtnList,regexpMobile,regexpAddr} from "../../public";
export default {
  name: "addDepartment",
  data() {
      return {
        form:{
            departmentName:null,
            parentDepartment:null,
            belong:null,
            status:null,
            principal:null,
            mobile:null,
            address:null
        },//新增数据
        statusList:[],//状态列表
        belongList:[],//机构归属列表
        departmentList:[],//部门列表
        managementUserlist:[],//负责人列表
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
                // 联系电话正则验证
                if(this.form.mobile){
                    if(!regexpMobile(this.form.mobile)){
                        this.$message.error({
                            message:'联系电话格式不确',
                            center:true
                        })
                        return
                    }
                }
                // 地址正则验证
                if(this.form.address){
                    if(regexpAddr(this.form.address)){
                        this.$message.error({
                            message:'地址格式不正确',
                            center:true
                        })
                        return
                    }
                }
                let params = {
                    departmentName: this.form.departmentName,
                    parentId: (this.form.parentDepartment === null || this.form.parentDepartment === '') ? 0 :this.form.parentDepartment ,
                    enterpriseId:this.form.belong,
                    departmentStatus:this.form.status,
                    headOfPerson: this.form.principal,
                    mobile: this.form.mobile,
                    address: this.form.address,
                }
                addDepartment(params,this.headers).then(res=>{
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
                // 联系电话正则验证
                if(this.form.mobile){
                    if(!regexpMobile(this.form.mobile)){
                        this.$message.error({
                            message:'联系电话格式不确',
                            center:true
                        })
                        return
                    }
                }
                // 地址正则验证
                if(this.form.address){
                    if(regexpAddr(this.form.address)){
                        this.$message.error({
                            message:'地址格式不正确',
                            center:true
                        })
                        return
                    }
                }
                let params = {
                    id: this.$route.query.id,
                    departmentName: this.form.departmentName,
                    parentId:(this.form.parentDepartment === null || this.form.parentDepartment === '') ? 0 :this.form.parentDepartment,
                    enterpriseId:this.form.belong,
                    departmentStatus:this.form.status,
                    headOfPerson: this.form.principal,
                    mobile: this.form.mobile,
                    address: this.form.address,
                }
                editDepartment(params,this.headers).then(res=>{
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
    // 获取状态列表和归属机构列表
    getStatusListData(){
        // 获取状态列表
        getStatusList({type:'status'},this.headers).then(res=>{
            this.statusList = res.data
        }).catch(err=>{
            console.log(err)
        })
        // 获取归属机构列表
        getBelongList({enterpriseType:2},this.headers).then(res=>{
            this.belongList = res.data
        }).catch(err=>{
            console.log(err)
        })
        // 获取负责人列表
        // let params = {
        //     userType:234,
        //     queryType:1,
        //     currentPage:1,
        //     pageSize:200,
        // }
        // getPrincipalList(params,this.headers).then(res=>{
        //     this.managementUserlist = res.data
        // }).catch(err=>{
        //     console.log(err)
        // })
    },
    // 选择归属机构
    selectEnterprise(enterpriseId){
        this.form.parentDepartment = null
        // 获取部门列表
        getDepartmentList({enterpriseId:enterpriseId},this.headers).then(res=>{
            this.departmentList = res.data
        }).catch(err=>{
            console.log(err)
        })
    }
  },
  mounted() {
    //   this.$store.commit("changeIsStatus", false)
      this.getStatusListData()
      if(this.$route.query.from == 'add'){
        // this.showButton = true;
        this.form.departmentName = null;
        this.form.parentDepartment = null;
        this.form.belong = null;
        this.form.status = 232;
        this.form.principal = null;
        this.form.mobile = null;
        this.form.address = null;
      }else{
        getDepartmentDetail({id:this.$route.query.id},this.headers).then(res=>{
            this.form.departmentName = res.data.departmentName;
            this.form.parentDepartment = res.data.parentId == 0 ? null:res.data.parentId;
            this.form.belong = res.data.enterpriseId;
            this.form.status = res.data.departmentStatus;
            this.form.principal = res.data.headOfPerson;
            this.form.mobile = res.data.mobile;
            this.form.address = res.data.address;
            getDepartmentList({enterpriseId:this.form.belong},this.headers).then(res2=>{
                this.departmentList = res2.data
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
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
            this.showMes =this.international.title ? this.international.title.title_departmentArchives_addDepartmentArchives :''
        }else if(this.$route.query.from == 'edit'){
            this.showMes = this.international.title ? this.international.title.title_departmentArchives_editDepartmentArchives :''
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style scoped>
#addDepartment {
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
