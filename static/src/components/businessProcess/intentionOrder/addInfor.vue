<template>
  <div id="addInfo">
    <div class="header scoped">
      <span>{{showMes}}</span>
    </div>
    <div class="footer" v-if="international.title">
      <div class="footerTop">
        <div class="footerTitle">
          <span>客户信息</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item class="formItem" label="客户类型">
              <el-select size="small" v-model="form.customerType" disabled placeholder>
                <!-- <el-option
                  v-for="item in customerTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item
              class="formItem"
              :class="showCompany ? '':'closeCompany'"
              prop="customerName"
              :rules="[{ required: required,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="客户名称"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.customerName"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              :class="showCompany ? '':'closeCompany'"
              prop="busilicNo"
              label="营业执照号"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.busilicNo"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="contact"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="联系人姓名"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="phone"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="联系电话"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle orderInfo">
          <span>订单信息</span>
        </div>
        <div class="footerNav">
          <el-form :model="form" label-width="130px" label-position="right">
            <el-form-item class="formItem" label="订单时间">
              <el-input maxlength="100" disabled size="small" v-model="form.orderTime"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="订单来源">
              <el-input maxlength="100" disabled size="small" v-model="form.orderSourceStr"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="操作账号">
              <el-input maxlength="100" disabled size="small" v-model="form.loginName"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="订单编号">
              <el-input maxlength="100" disabled size="small" v-model="form.orderNo"></el-input>
            </el-form-item>
            <el-form-item
              :rules="[{ required: true, message: '请选择时间', trigger: 'change' }]"
              class="formItem"
              label="期望提车日期"
            >
              <el-date-picker
                size="small"
                disabled
                v-model="form.expectDate"
                prefix-icon="el-icon-time2"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder
              ></el-date-picker>
            </el-form-item>
            <el-table
              class="table"
              border
              stripe
              :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
              size="small"
              :data="tableData"
              style="width: 100%; height: 100%;"
            >
              <el-table-column
                prop="id"
                :label="international.field.field_departmentArchivesList_serialNumber"
                align="center"
                width="60"
              >
                <template slot-scope="scope">{{ scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column width="180" label="车辆品牌*">
                <template slot-scope="scope">
                  <el-select disabled size="small" v-model="scope.row.brandName" placeholder>
                    <!-- <el-option
                      v-for="item in scope.row.vehicleBrandList"
                      :key="item.id"
                      :label="item.brandName"
                      :value="item.id"
                    ></el-option>-->
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column width="180" label="车型*" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-select size="small" disabled v-model="scope.row.vehicleTypeName" placeholder>
                    <!-- <el-option
                      v-for="item in scope.row.vehicleModelsList"
                      :key="item.id"
                      :label="item.vehicleTypeName"
                      :value="item.id"
                    ></el-option>-->
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column width="90" label="数量*" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.number" disabled size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column width="110" label="租赁时长（月）*" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.leaseDuration" disabled size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column min-width="100" label="月租金（元）/辆/月" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.monthlyRent" disabled size="small"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
        <div class="footerTitle supplement">
          <span>签约信息-补充资料</span>
        </div>
        <div class="footerNav">
          <el-form :model="form" ref="form" label-width="130px" label-position="right">
            <el-form-item class="formItem" label="分配业务员">
              <el-input maxlength="100" disabled size="small" v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item 
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
            prop="customerIdNumber"
            class="formItem" 
            label="客户-身份证号码">
              <el-input maxlength="100" size="small" v-model="form.customerIdNumber"></el-input>
            </el-form-item>
            <el-form-item 
            class="formItem" 
            label="客户-驾驶证号码">
              <el-input maxlength="100" size="small" v-model="form.customerDriverNumber"></el-input>
            </el-form-item>
          </el-form>
          <div class="attachment">
            <div class="attachmentLeft">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=0"
                :headers="headers"
                :limit="1"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove1"
                :on-success="handleUploadSuccess1"
                :file-list="imgIdcardProsList"
                list-type="picture-card"
              >
                <span class="upload_txt"><span class="redDot">*</span>身份证正面</span>
              </el-upload>
            </div>
            <div class="attachmentRight">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=6"
                :headers="headers"
                :limit="1"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove2"
                :on-success="handleUploadSuccess2"
                :file-list="imgDriverLicenseList"
                list-type="picture-card"
              >
                <span class="upload_txt">驾驶证</span>
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
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove3"
                :on-success="handleUploadSuccess3"
                :file-list="imgIdcardConsList"
                list-type="picture-card"
              >
                <span class="upload_txt"><span class="redDot">*</span>身份证反面</span>
              </el-upload>
            </div>
            <div class="attachmentRight">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=1"
                :headers="headers"
                :limit="1"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove4"
                :on-success="handleUploadSuccess4"
                :file-list="imgEfileBusilicList"
                list-type="picture-card"
              >
                <span class="upload_txt">营业执照</span>
              </el-upload>
            </div>
          </div>
          <!-- 图片放大 -->
          <el-dialog :visible.sync="dialogVisible" width="500px">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
      <div class="footerButton">
        <el-button
          type="primary"
          size="small"
          @click="addConfirm()"
        >提交</el-button>
        <el-button size="small" @click="cancel">{{international.global.global_cancel}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderDetail ,supplementOrder} from "../../../api/businessProcess/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
  regexpidCard,
  formatJE
} from "../../../public";
export default {
  name: "addInfo",
  data() {
    return {
      form: {
        customerId:'',//客户id
        customerName: "", //客户名字
        customerType: 2, //客户类型
        busilicNo: "", //营业执照编号
        contact: "", //联系人
        phone: "", //联系人电话
        orderTime: "", //订单时间
        orderSourceStr: "",
        loginName: "",
        orderNo: "", //订单编号
        expectDate: "", //期望提车日期
        userName: "", //分配的业务员
        customerIdNumber: "", //身份证号码
        customerDriverNumber: "", //驾驶证号码
      }, //新增数据
      showCompany: true,
      required: true,
      showMes: "", //新增修改标题
      driverLicenseIdList:[],//驾驶证文件id
      imgDriverLicenseList:[],//驾驶证图片地址
      efileBusilicIdList:[],//营业执照文件id
      imgEfileBusilicList:[],//营业执照图片地址
      idcardConsIdList:[],//身份证反面id
      imgIdcardConsList:[],//身份证反面图片地址
      idcardProsIdList:[],//身份证正面id
      imgIdcardProsList:[],//身份证正面图片地址
      tableData: [],//订单信息
      international: {},//国际化标题
      dialogVisible:false,//是否显示图片放大弹窗
      dialogImageUrl:'',//选中要放大图片的地址
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
          if(!regexpidCard(this.form.customerIdNumber)){
              this.$message.error({
                  message:'身份证号码格式不确',
                  center:true
              })
              return
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
          if(this.idcardProsIdList.length<1){
            this.$message.error({
              message:'请上传身份证正面附件',
              center:true
            })
            return
          }
          if(this.idcardConsIdList.length<1){
            this.$message.error({
              message:'请上传身份证反面附件',
              center:true
            })
            return
          }
          // if(this.driverLicenseIdList.length<1){
          //   this.$message.error({
          //     message:'请上传驾驶证附件',
          //     center:true
          //   })
          //   return
          // }
          let params = {
            id: this.$route.query.id,
            customerId: this.form.customerId,
            u_idcardNo: this.form.customerIdNumber,//客户身份证id
            u_driverLicenseNo: this.form.customerDriverNumber,//客户驾驶证号码
            u_efileBusilicId: this.efileBusilicIdList.toString(),//营业执照文件id
            u_idcardProsId: this.idcardProsIdList.toString(),//身份证正面文件id
            u_idcardConsId: this.idcardConsIdList.toString(),//身份证反面文件id
            u_driverLicenseId:this.driverLicenseIdList.toString() //驾驶证文件id          
          };
          supplementOrder(params, this.headers)
            .then((res) => {
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: "资料补充成功",
                  center: true,
                });
                this.$router.back();
              } else {
                this.$message.error({
                  message: "资料补充失败",
                  center: true,
                });
              }
            })
            .catch((err) => {
              this.$message.error({
                message: "资料补充失败",
                center: true,
              });
            });
        }
      });
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    // 上传文件超出回调
    handleExceed(files, fileList) {
      this.$message.error({
        message: "只能上传一张图片",
        center: true,
      });
    },
    // 身份证正面上传成功回调
    handleUploadSuccess1(response, file, fileList) {
      if(response.status == 0){
        this.idcardProsIdList.push(response.data.id);
      }else{
        this.$message.error({
          message:'身份证正面上传失败',
          center:true
        })
      }
    },
    // 驾驶证上传成功回调
    handleUploadSuccess2(response, file, fileList) {
      if(response.status == 0){
        this.driverLicenseIdList.push(response.data.id);
      }else{
        this.$message.error({
          message:'驾驶证上传失败',
          center:true
        })
      }
    },
    // 身份证反面上传成功回调
    handleUploadSuccess3(response, file, fileList) {
      if(response.status == 0){
        this.idcardConsIdList.push(response.data.id);
      }else{
        this.$message.error({
          message:'身份证反面上传失败',
          center:true
        })
      }
    },
    // 营业执照上传成功回调
    handleUploadSuccess4(response, file, fileList) {
      if(response.status == 0){
        this.efileBusilicIdList.push(response.data.id);
      }else{
        this.$message.error({
          message:'营业执照上传失败',
          center:true
        })
      }

    },
    // 身份证正面图片删除回调
    handleRemove1(file, fileList) {
      let index = this.idcardProsIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.idcardProsIdList.splice(index, 1);
    },
    // 驾驶证图片删除回调
    handleRemove2(file, fileList) {
      let index = this.driverLicenseIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.driverLicenseIdList.splice(index, 1);
    },
    // 身份证反面图片删除回调
    handleRemove3(file, fileList) {
      let index = this.idcardConsIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.idcardConsIdList.splice(index, 1);
    },
    // 营业执照图片删除回调
    handleRemove4(file, fileList) {
      let index = this.efileBusilicIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.efileBusilicIdList.splice(index, 1);
    },
    // 点击放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.showMes = "补充资料";
    getOrderDetail({ id: this.$route.query.id }, this.headers)
      .then((res) => {
        if (res.status == 0) {
          this.showCompany = res.data.customerType == 2 ? true : false;
          this.required = res.data.customerType == 1 ? false : true;
          this.form.customerId = res.data.customerId,
          this.form.customerName = res.data.customerName,
          this.form.customerType =res.data.customerType == 1 ? "个人" : "企业",
          this.form.busilicNo = res.data.busilicNo, //营业执照编号
          this.form.contact = res.data.personInCharge, //联系人
          this.form.phone = res.data.phoneNumber, //联系人电话
          this.form.orderTime = res.data.orderTimeStr, //订单时间
          this.form.orderSourceStr = res.data.orderSourceStr,
          this.form.loginName = res.data.operationAccount,
          this.form.orderNo = res.data.orderNumber, //订单编号
          this.form.expectDate = res.data.expectedDateStr; //期望提车日期
          res.data.leaseOrderDetailInfoVOS.map(item=>{
            item.monthlyRent = formatJE(item.monthlyRent)
          })
          this.tableData = res.data.leaseOrderDetailInfoVOS;
          this.form.userName = res.data.userName
          this.form.customerIdNumber = res.data.idcardNo , //身份证号码
          this.form.customerDriverNumber = res.data.driverLicenseNo, //驾驶证号码
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

        }
      })
      .catch((err) => {
        console.log(err);
        this.$message({
          message: err.response.data.message,
          center: true,
          type: "error",
        });
      });
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
#addInfo {
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
.orderInfo {
  display: flex;
  justify-content: space-between;
}
.supplement {
  margin-top: 25px;
}
.footerNav {
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  overflow: hidden;
}
.last_footerNav {
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
.closeCompany {
  display: none;
}
.leftLable {
  display: inline-block;
  width: 130px;
  text-align: right;
  font-size: 14px;
  color: #606266;
  padding-right: 12px;
  box-sizing: border-box;
  margin-bottom: 22px;
}
.rightValue {
  display: inline-block;
  width: 160px;
  font-size: 14px;
  color: #606266;
  margin-bottom: 22px;
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
.table >>> .el-input {
  width: 100%;
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
.closeOrderTip {
  display: none;
}
#addInfo >>> .el-dialog__body{
  padding: 0;
}
#addInfo >>> .el-dialog__header{
  padding: 0;
}
#addInfo >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#addInfo>>> .el-dialog__close{
  color: #fff;
}
.el-dialog__body img{
  display: block;
}
.redDot{
  color: #F56C6C;
}
</style>
