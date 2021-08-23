<template>
  <div id="addAccount">
    <div class="header scoped">
      <span >{{ showMes }}</span>
    </div>
    <div class="footer">
      <div class="footerTitle">
        <span >基本信息</span>
      </div>
      <div class="footerNav"  v-if="international.global">
        <el-form ref="form" :model="form" label-width="110px" class="from" label-position="right">
            <el-form-item 
                class="formItem"
                prop="belongCompany" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]" 
                label="所属门店">
                <el-select size="small" filterable  v-model="form.belongCompany" placeholder=""  >
                    <el-option
                    v-for="item in companyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
                class="formItem"
                prop="accountType"
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
                label="账户类型">
                <el-select size="small" filterable  v-model="form.accountType" placeholder="" @change="changeAccountType"  >
                    <el-option
                    v-for="item in accountTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
                class="formItem"
                :class="showCompany ? '':'closeBankName'"
                prop="bankName"
                :rules="[{ required: required,message:international.global.global_contNotEmpty, trigger: 'blur'}]"  
                label="开户银行" >
                <el-input maxlength="100" size="small"  v-model="form.bankName"></el-input>
            </el-form-item>
            <el-form-item 
            class="formItem" 
            prop="account"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"  
            label="账号">
                <el-input maxlength="100" size="small"  v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="备注">
                <el-input maxlength="100" size="small"  v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="footerButton">
            <el-button type="primary" size="small" @click="$route.query.from == 'add' ? addConfirm():editConfirm()" >确认</el-button>
            <el-button size="small" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getEnterpriseList,addAccount,getAccountDetail,editAccount} from '../../api/financialProcesses/api'
import {getCookie,setCookie,removeCookie,getMenuBtnList,regexpBankName} from "../../public";
export default {
  name: "addAccount",
  data() {
      return {
        form:{
            belongCompany:null,
            accountType:null,
            bankName:null,//开户行
            account:null,//账号
            remark:null,//备注
        },//新增数据
        companyList:[],//所属公司列表
        accountTypeList:[
            {
                id:0,
                value:'银行卡'
            },
            {
                id:1,
                value:'微信'
            },
            {
                id:2,
                value:'支付宝'
            }
        ],//账户类型列表
        international:{},
        showCompany:true,//是否显示开户行
        required:true,//开户行是否必填
        showMes: "", //新增修改标题
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
                if(this.form.bankName){
                  if(!regexpBankName(this.form.bankName)){
                    this.$message.error({
                      message:'开户行格式不正确',
                      center:true
                    })
                    return
                  }
                }
                let params = {         
                    accountNumber: this.form.account,
                    bankOfDeposit: this.form.bankName,
                    bankType: this.form.accountType,
                    enterpriseId: this.form.belongCompany,
                    remark: this.form.remark
                }
                addAccount(params,this.headers).then(res=>{
                    if(res.status == 0){
                        this.$store.commit("changeIsStatus", true);
                        this.$message.success({
                            message:'新增账号成功',
                            center:true
                        })
                        this.$router.back();
                    }else{
                        this.$message.error({
                            message:'新增账号失败',
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
                if(this.form.bankName){
                  if(!regexpBankName(this.form.bankName)){
                    this.$message.error({
                      message:'开户行格式不正确',
                      center:true
                    })
                    return
                  }
                }
                let params = {
                    id:this.$route.query.id,
                    accountNumber: this.form.account,
                    bankOfDeposit: this.form.bankName,
                    bankType: this.form.accountType,
                    enterpriseId: this.form.belongCompany,
                    remark: this.form.remark
                }
                editAccount(params,this.headers).then(res=>{
                    if(res.status == 0){
                        this.$store.commit("changeIsStatus", true);
                        this.$message.success({
                            message:'账号修改成功',
                            center:true
                        })
                        this.$router.back();
                    }else{
                        this.$message.error({
                            message:'账号修改失败',
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
    // 获取所属公司列表
    getCompanyList(){
        getEnterpriseList({},this.headers).then(res=>{
            this.companyList = res.data
        }).catch(err=>{
            console.log(err)
        })
    },
    // 获取账户详情          
    getAccountDetail(){
        getAccountDetail({id:this.$route.query.id},this.headers).then(res=>{
            setTimeout(() => {
            window.onload()
          }, 10)
            this.showCompany = res.data.bankType==0 ? true:false
            this.required = res.data.bankType==0 ? true:false
            this.form.belongCompany = res.data.enterpriseId;
            this.form.accountType = res.data.bankType;
            this.form.bankName = res.data.bankOfDeposit;
            this.form.account = res.data.accountNumber;
            this.form.remark = res.data.remark;
        }).catch(err=>{
            console.log(err)
            // this.$message({
            //     message: err,
            //     center: true,
            //     type: "error",
            // });
        })
    },
    // 更改账户类型
    changeAccountType(val){
      this.showCompany = val==0 ? true:false
      this.required = val==0 ? true:false
    }
  },
  mounted() {
      this.getCompanyList()
      if(this.$route.query.from == 'add'){
        this.showMes  = '新增收款账户'
        this.form.belongCompany = null;
        this.form.accountType = 0;
        this.form.bankName = null;
        this.form.account = null;
        this.form.remark = null;
      }else{
        this.showMes  = '修改收款账户'
        this.getAccountDetail()
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
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style scoped>
#addAccount {
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
.footerTitle span {
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
  width: 170px;
}
.footerNav .el-input__inner {
  width: 170px;
}
.footerNav >>> .el-input--suffix {
  width: 170px;
}
.closeBankName{
    display: none;
}
</style>
