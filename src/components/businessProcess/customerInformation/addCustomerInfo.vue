<template>
  <div id="addCustomerInfo">
    <div class="header">
      <span>{{showMes}}</span>
    </div>
    <div class="footer" v-if="international.title">
      <div class="footerTop" >
        <div class="footerTitle">
          <span>客户信息</span>
        </div>
        <div class="footerNav" >
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item
              class="formItem"
              prop="customerType"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
              label="客户类型"
            >
              <el-select  size="small" :disabled="disabled" v-model="form.customerType" @change="changeCustomerType" placeholder>
                <el-option
                  v-for="item in customerTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="formItem"
              :class="showCompany ? '':'closeCompany'"
              prop="customerName"
              :rules="[{ required: required,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="客户名称"
            >
              <el-input maxlength="100" :disabled="disabled" size="small" v-model="form.customerName"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              :class="showCompany ? '':'closeCompany'"
              prop="busilicNo"
              label="营业执照号"
            >
              <el-input maxlength="100" :disabled="disabled" size="small" v-model="form.busilicNo"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="contact"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="联系人姓名"
            >
              <el-input maxlength="100" :disabled="disabled" size="small" v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="phone"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="联系人电话"
            >
              <el-input maxlength="100" :disabled="disabled" size="small" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              label="客户来源"
            >
              <span class="customerSource">{{form.source}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>附件资料</span>
        </div>
        <div class="footerNav">
          <el-form  :model="form" label-width="130px" label-position="right">
            <el-form-item
              class="formItem"
              label="客户-身份证号码"
              >
              <el-input maxlength="100" :disabled="disabled" size="small" v-model="form.customerIdNumber"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              label="客户-驾驶证号码" 
              >
              <el-input maxlength="100" :disabled="disabled" size="small" v-model="form.customerDriverNumber"></el-input>
            </el-form-item>
          </el-form>
          <div class="attachment">
            <div class="attachmentLeft">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=0"
                :headers="headers"
                :disabled="disabled"
                :limit="1"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove1"
                :on-success="handleUploadSuccess1"
                :file-list="imgIdcardProsList" 
                list-type="picture-card"
                >
                <span :class="disabled ? 'disabled_txt':'upload_txt'">身份证正面</span>
              </el-upload>
            </div>
            <div class="attachmentRight">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=6"
                :headers="headers"
                :limit="1"
                :disabled="disabled"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove2"
                :on-success="handleUploadSuccess2"
                :file-list="imgDriverLicenseList" 
                list-type="picture-card"
                >
                <span :class="disabled ? 'disabled_txt':'upload_txt'">驾驶证</span>
              </el-upload>
            </div>
          </div>
          <div class="attachment">
            <div class="attachmentLeft">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=0"
                :headers="headers"
                :limit="1"
                :disabled="disabled"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove3"
                :on-success="handleUploadSuccess3"
                :file-list="imgIdcardConsList" 
                list-type="picture-card"
                >
                <span :class="disabled ? 'disabled_txt':'upload_txt'">身份证反面</span>
              </el-upload>
            </div>
            <div class="attachmentRight" :class="showCompany ? '':'closeCompany'">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=1"
                :headers="headers"
                :limit="1"
                :disabled="disabled"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove4"
                :on-success="handleUploadSuccess4"
                :file-list="imgEfileBusilicList" 
                list-type="picture-card"
                >
                <span :class="disabled ? 'disabled_txt':'upload_txt'">营业执照</span>
              </el-upload>
            </div>
          </div>
          <!-- 图片放大 -->
          <el-dialog :visible.sync="dialogVisible" width="500px">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </div>
      <div class="footerButton">
        <el-button type="primary" size="small" v-if="!disabled" @click="$route.query.from == 'add' ? addConfirm():editConfirm()">提交</el-button>
        <el-button size="small" @click="cancel" v-if="!disabled">{{international.global.global_cancel}}</el-button>
        <el-button type="primary" size="small" v-if="disabled" @click="cancel" class="back">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {addCustomerInfo,getCustomerDetail,editCustomerInfo} from "../../../api/businessProcess/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
  regexpMobile,
  regexpidCard
} from "../../../public";
export default {
  name: "addCustomerInfo",
  data() {
    return {
      form: {
        customerType:2,//客户类型
        customerName:'',//客户名称
        busilicNo:'',//营业执照编号
        contact:'',//联系人
        phone:'',//联系人电话
        source:'',
        customerIdNumber:'',//客户身份证号
        customerDriverNumber:'',//客户驾驶证号
        customerSourceStr:'',
      }, //新增数据
      customerTypeList:[
        {
          id:1,
          value:'个人'
        },
        {
          id:2,
          value:'企业'
        }
      ],//客户类型
      showCompany:true,//是否显示客户名称和营业执照编号
      required:true,//客户名称
      driverLicenseIdList:[],//驾驶证文件id
      imgDriverLicenseList:[],//驾驶证图片地址
      efileBusilicIdList:[],//营业执照文件id
      imgEfileBusilicList:[],//营业执照图片地址
      idcardConsIdList:[],//身份证反面id
      imgIdcardConsList:[],//身份证反面图片地址
      idcardProsIdList:[],//身份证正面id
      imgIdcardProsList:[],//身份证正面图片地址
      showMes: "", //新增修改标题
      international: {},
      dialogVisible:false,
      dialogImageUrl:'',
      disabled:false,//是否禁用输入框
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    addConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 联系电话正则验证
          if(!regexpMobile(this.form.phone)){
              this.$message.error({
                  message:'联系电话格式不确',
                  center:true
              })
              return
          }
          if(this.form.customerIdNumber){
            if(!regexpidCard(this.form.customerIdNumber)){
                this.$message.error({
                    message:'身份证号码格式不确',
                    center:true
                })
                return
            }
          }
          if(this.form.customerDriverNumber){
            if(!regexpidCard(this.form.customerDriverNumber)){
                this.$message.error({
                    message:'驾驶证号码格式不确',
                    center:true
                })
                return
            }
          }
          let params = {
            busilicNo: this.form.busilicNo,
            customerSource: 1,
            driverLicenseId: this.driverLicenseIdList.toString(),//驾驶证文件id
            driverLicenseNo: this.form.customerDriverNumber,
            efileBusilicId: this.efileBusilicIdList.toString(),//营业执照文件id
            idcardConsId: this.idcardConsIdList.toString(),//身份证反面id
            idcardNo: this.form.customerIdNumber,
            idcardProsId: this.idcardProsIdList.toString(),//身份证正面id
            customerName: this.form.customerName,
            customerType: this.form.customerType,
            personInCharge: this.form.contact,
            phoneNumber: this.form.phone          
          };
          addCustomerInfo(params, this.headers).then((res) => {
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: '新增成功',
                  center: true,
                });
                this.$router.back();
              } else {
                this.$message.error({
                  message: res.message,
                  center: true,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    editConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 联系电话正则验证
          if(!regexpMobile(this.form.phone)){
              this.$message.error({
                  message:'联系电话格式不确',
                  center:true
              })
              return
          }
          if(this.form.customerIdNumber){
            if(!regexpidCard(this.form.customerIdNumber)){
                this.$message.error({
                    message:'身份证号码格式不确',
                    center:true
                })
                return
            }
          }
          if(this.form.customerDriverNumber){
            if(!regexpidCard(this.form.customerDriverNumber)){
                this.$message.error({
                    message:'驾驶证号码格式不确',
                    center:true
                })
                return
            }
          }
          let params = {
            id:this.$route.query.id,
            busilicNo: this.form.busilicNo,
            customerSource: 1,
            u_driverLicenseId: this.driverLicenseIdList.toString(),//驾驶证文件id
            driverLicenseNo: this.form.customerDriverNumber,
            u_efileBusilicId: this.efileBusilicIdList.toString(),//营业执照文件id
            u_idcardConsId: this.idcardConsIdList.toString(),//身份证反面id
            idcardNo: this.form.customerIdNumber,
            u_idcardProsId: this.idcardProsIdList.toString(),//身份证正面id
            customerName: this.form.customerName,
            customerType: this.form.customerType,
            personInCharge: this.form.contact,
            phoneNumber: this.form.phone          
          };
          editCustomerInfo(params, this.headers).then((res) => {
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: '修改成功',
                  center: true,
                });
                this.$router.back();
              } else {
                this.$message.error({
                  message: res.message,
                  center: true,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    // 改变客户类型
    changeCustomerType(val){
      this.showCompany = val==2 ? true:false
      this.required = val==1 ? false:true
    },
    // 上传文件超出回调
    handleExceed(files, fileList){
      this.$message.error({
        message:'只能上传一张图片',
        center:true
      })
    },
    // 身份证正面上传成功回调
    handleUploadSuccess1(response, file, fileList){
      if(response.status == 0){
        this.idcardProsIdList.push(response.data.id)
      }else{
        this.$message.error({
          message:'身份证正面上传失败',
          center:true
        })
      }
    },
    // 驾驶证上传成功回调
    handleUploadSuccess2(response, file, fileList){
      if(response.status == 0){
        this.driverLicenseIdList.push(response.data.id)
      }else{
        this.$message.error({
          message:'驾驶证上传失败',
          center:true
        })
      }
    },
    // 身份证反面上传成功回调
    handleUploadSuccess3(response, file, fileList){
      if(response.status == 0){
        this.idcardConsIdList.push(response.data.id)
      }else{
        this.$message.error({
          message:'身份证反面上传失败',
          center:true
        })
      }
    },
    // 营业执照上传成功回调
    handleUploadSuccess4(response, file, fileList){
      if(response.status == 0){
        this.efileBusilicIdList.push(response.data.id)
      }else{
        this.$message.error({
          message:'营业执照上传失败',
          center:true
        })
      }
    },
    // 身份证正面图片删除回调
    handleRemove1(file, fileList) {
      let index = this.idcardProsIdList.indexOf(file.response ? file.response.data.id:file.id)
      this.idcardProsIdList.splice(index,1)
    },
    // 驾驶证图片删除回调
    handleRemove2(file, fileList) {
      let index = this.driverLicenseIdList.indexOf(file.response ? file.response.data.id:file.id)
      this.driverLicenseIdList.splice(index,1)
    },
    // 身份证反面图片删除回调
    handleRemove3(file, fileList) {
      let index = this.idcardConsIdList.indexOf(file.response ? file.response.data.id:file.id)
      this.idcardConsIdList.splice(index,1)
    },
    // 营业执照图片删除回调
    handleRemove4(file, fileList) {
      let index = this.efileBusilicIdList.indexOf(file.response ? file.response.data.id:file.id)
      this.efileBusilicIdList.splice(index,1)
    },
    // 点击放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    if (this.$route.query.from == "add") {
        this.showMes ='新增客户信息'
        this.showCompany = true,
        this.required = true,
        this.form.customerType = 2,//客户类型
        this.form.customerName = '',//客户名称
        this.form.busilicNo = '',//营业执照编号
        this.form.contact = '',//联系人
        this.form.phone = '',//联系人电话
        this.form.customerIdNumber = '',//客户身份证号
        this.form.customerDriverNumber = ''//客户驾驶证号
        this.form.source = 'Web录入',
        this.driverLicenseIdList = [],//驾驶证文件id
        this.imgDriverLicenseList = [],//驾驶证图片地址
        this.efileBusilicIdList = [],//营业执照文件id
        this.imgEfileBusilicList = [],//营业执照图片地址
        this.idcardConsIdList = [],//身份证反面id
        this.imgIdcardConsList = [],//身份证反面图片地址
        this.idcardProsIdList = [],//身份证正面id
        this.imgIdcardProsList = []//身份证正面图片地址
    } else {
      this.showMes = "修改客户信息";
      getCustomerDetail({id:this.$route.query.id},this.headers).then(res=>{
        if(res.status == 0){
          this.disabled = res.data.customerSource == 2 ? true:false
          this.showCompany = res.data.customerType == 2 ? true:false
          this.required = res.data.customerType == 1 ? false:true
          this.form.customerType = res.data.customerType,//客户类型
          this.form.customerName = res.data.customerName,//客户名称
          this.form.busilicNo = res.data.busilicNo,//营业执照编号
          this.form.contact = res.data.personInCharge,//联系人
          this.form.phone = res.data.phoneNumber,//联系人电话
          this.form.customerIdNumber = res.data.idcardNo,//客户身份证号
          this.form.customerDriverNumber = res.data.driverLicenseNo//客户驾驶证号
          this.form.source = res.data.customerSourceStr,
          this.imgIdcardProsList = res.data.ls_IdcardProsIdAddr || []//身份证正面图片地址
          this.imgIdcardConsList = res.data.ls_IdcardConsIdAddr || [],//身份证反面图片地址
          this.imgDriverLicenseList = res.data.ls_DriverLicenseIdAddr || [],//驾驶证图片地址
          this.imgEfileBusilicList = res.data.ls_EfileBusilicIdAddr || []//营业执照图片地址
          if(res.data.ls_IdcardProsIdAddr){
            this.idcardProsIdList = []//身份证正面id
            res.data.ls_IdcardProsIdAddr.map(item=>{
              this.idcardProsIdList.push(item.id)
            })
          }
          if(res.data.ls_IdcardConsIdAddr){
            this.idcardConsIdList = [],//身份证反面id
            res.data.ls_IdcardConsIdAddr.map(item=>{
              this.idcardConsIdList.push(item.id)
            })
          }
          if(res.data.ls_DriverLicenseIdAddr){
            this.driverLicenseIdList = [],//驾驶证文件id
            res.data.ls_DriverLicenseIdAddr.map(item=>{
              this.driverLicenseIdList.push(item.id)
            })
          }
          if(res.data.ls_EfileBusilicIdAddr){
            this.efileBusilicIdList = [],//营业执照文件id
            res.data.ls_EfileBusilicIdAddr.map(item=>{
              this.efileBusilicIdList.push(item.id)
            })
          }
          if(this.$route.query.from == "detail"){
            this.disabled = true
          }

        }else{
          this.$message({
              message: res.message,
              center: true,
              type: "error",
          });
        }
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
    },
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
#addCustomerInfo {
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
.footerTitle {
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding-left: 40px;
  background-color: #f5f7fa;
}
.footerTitle span {
  color: #368cfe;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 16px;
}
.footerNav {
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  overflow: hidden;
}
.last_footerNav{
  overflow: initial;
}
.footerTop {
  width: 100%;
  height: calc(100% - 56px);
  overflow: auto;

}
.el-form {
  overflow: hidden;
}
.formItem {
  float: left;
}
.closeCompany{
  display: none;
}
.title {
  color: #333333;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 16px;
}
.footerButton {
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  padding-top: 12px;
  padding-left: 44%;
  border-top: 1px solid #e5e5e5;
  /* border-bottom: 1px solid #e5e5e5; */
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
.footerNav >>> .el-input--prefix .el-input__inner {
  padding: 0 15px !important;
}
.customerSource{
  color: #606266;
  font-size: 14px;
}
.attachment{
  display: block;
  overflow: hidden;
  text-align: right;
}
.attachmentLeft{
  margin-left: 46px;
  float: left;
  text-align: right;
}
.attachmentRight{
  margin-left: 220px;
  float: left;
}
.upload_txt{
  color: #368cfe;
  text-decoration:underline;
  white-space: nowrap;
  /* float: left; */
}
.disabled_txt{
  color: #999;
  text-decoration:underline;
  white-space: nowrap;
}
.upload{
  font-size: 14px;
  display: flex;
  width: 70px;
  height: 70px;
}
.footerNav >>> .el-upload-list{
  display: flex;
}
.footerNav >>> .el-upload--picture-card{
  width: 120px;
  height: 30px;
  text-align: right;
  line-height: 40px;
  background-color: #fff;
  border: 0;
}
.footerNav >>>.el-upload-list__item{
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border: 0;
}
.back{
  width: 80px;
  background-color: #409eff;
  color: #fff;
}
.imgSrc{
  float: left;
  margin-left: 10px;
  width: 60px;
  height: 60px;
}
#addCustomerInfo >>> .el-dialog__body{
  padding: 0;
}
#addCustomerInfo >>> .el-dialog__header{
  padding: 0;
}
#addCustomerInfo >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#addCustomerInfo>>> .el-dialog__close{
  color: #fff;
}
.el-dialog__body img{
  display: block;
}
</style>
