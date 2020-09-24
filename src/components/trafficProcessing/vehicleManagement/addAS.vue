<template>
  <div id="header">
    <div class="header">
      <span>{{ showMsg }}</span>
    </div>
    <div class="footer">
      <div class="footerTitle">
        <span>年检记录</span>
      </div>
      <div class="footerNav" v-if="international.title">
        <el-form ref="form" :model="form" label-width="130px">
          <div class="formNav">
            <el-form-item
              label="车牌号"
              prop="vehicleNo"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="form.vehicleNo"
              ></el-input> </el-form-item
            ><el-form-item
              label="年检金额"
              prop="yearlyInspectionMoney"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isShow"
                maxlength="100"
                v-model="form.yearlyInspectionMoney"
              ></el-input> </el-form-item
            ><el-form-item
              label="年检日期"
              prop="yearlyInspectionDate"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-date-picker
                v-model="form.yearlyInspectionDate"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isShow"
                placeholder="选择日期"
              >
              </el-date-picker> </el-form-item
            ><el-form-item
              label="年检处理人"
              prop="handler"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isShow"
                maxlength="100"
                v-model="form.handler"
              ></el-input> </el-form-item
            ><el-form-item label="品牌车型">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="form.brand"
              ></el-input> </el-form-item
            ><el-form-item
              label="下次年检日期"
              prop="termOfValidity"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-date-picker
                v-model="form.termOfValidity"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isShow"
                placeholder="选择日期"
              >
              </el-date-picker> </el-form-item
            ><el-form-item label="备注">
              <el-input
                class="formItem"
                type="textarea"
                autosize
                size="small"
                :disabled="isShow"
                maxlength="100"
                v-model="form.remark"
              ></el-input>
            </el-form-item>
            <el-form-item label="附加照片" class="formItem">
              <el-upload
                class="upload"
                :disabled="isShow"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=4"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-exceed="handleExceed"
                :before-upload="handleBeforeUpload"
                :file-list="fileList"
                list-type="picture-card"
                :limit="5"
                multiple
              >
                <span class="upload_txt">上传图片</span>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" width="500px">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </div>
          <div class="footerButton">
            <el-button
              type="primary"
              size="small"
              v-if="showButton"
              @click="addConfirm"
              >新增</el-button
            >
            <el-button
              type="primary"
              :disabled="isShow"
              size="small"
              v-else
              @click="editConfirm"
              >修改</el-button
            >
            <el-button size="small" @click="cancel">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  getCookie,
  setCookie,
  removeCookie,
  dateToString,
  getMenuBtnList,
} from "../../../public";
export default {
  name: "addAS",
  data() {
    return {
      form: {
        id:'',//年检id
        vehicleNo: "", //车牌号
        yearlyInspectionMoney: "", //年检金额
        brand: "", //品牌
        handler: "", //年检处理人
        yearlyInspectionDate: "", //年检日期
        termOfValidity: "", //下一次年检日期
        vehicleId: "", //
        remark: "", //备注
        efileIdCode: "", //图片id
      },
      brandOptions: [],
      imgIdList: [], //图片id
      international: {},
      showMsg: "", //新增修改标题
      showButton: false, //确定新增修改按钮
      fileList: [],
      isShow: false,
      dialogImageUrl: "",
      dialogVisible: false,
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    addConfirm() {
      //确定新增
      
      var time1 = new Date(this.form.yearlyInspectionDate).getTime();
      var time2 = new Date(this.form.termOfValidity).getTime();

      if( time1 > time2 )
      {
        this.$message({
          message: "年检日期大于下次年检日期",
          center: true,
          type: "error",
        }); 
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios({
        method: "post",
        url:
          "/vehicle-service/vehicleYearlyinspectionInfo/insertVehicleYearlyinspection",
        headers: this.headers,
        data: this.form,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.$store.commit("changeIsStatus", true);
            this.$message({
              type: "success",
              message: this.international.global.global_addSuccess,
              center: true,
            });
            if(this.$route.query.form == 'addAS'){
              this.$router.push({
                path:"/addVehicleManagement",
                query:{form:'edit',id : this.$route.query.id }
              });
            }
            else{
              this.$router.back();
            }
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    editConfirm() {
      //确定修改

      this.form.id = this.$route.query.id;
      axios({
        method: "post",
        url:
          "/vehicle-service/vehicleYearlyinspectionInfo/modifyVehicleYearlyinspection",
        headers: this.headers,
        data: this.form,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.$store.commit("changeIsStatus", true);
            this.$message({
              type: "success",
              message: this.international.global.global_changeSuccess,
              center: true,
            });
            this.$router.back();
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      var index = this.imgIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.imgIdList.splice(index,1);
      this.form.efileIdCode = this.imgIdList.toString();
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      if(response.status == 0){
        this.imgIdList.push(response.data.id);
        this.form.efileIdCode = this.imgIdList.join(",");
      }else{
        this.$message({
        message: '上传失败,请重新上传!',
        center: true,
        type: "error",
      });
      }
    },
    handleError() {
      this.$error("上传失败,请重新上传图片!");
    },
    handleBeforeUpload(file) {
      const isImage = file.type.includes("image");
      if (!isImage) {
        this.$message.error("上传文件类型必须是图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isImage && isLt2M;
    },
    handleExceed(){
      this.$message({
        message: "最多上传5张图片!",
        center: true,
        type: "error",
      });
    },
    initData() {
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleInfo/vehicleNoTypeQuery?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.form.brand = result.data.data.brandTypeName;
            this.form.vehicleNo = result.data.data.vehicleNo;
            this.form.vehicleId = this.$route.query.id;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.$store.commit("changeIsStatus", false);
    if (this.$route.query.form == "add" || this.$route.query.form == "addAS") {
      this.initData();
      this.showButton = true;
      this.isShow = false;
      this.showMsg = "新增年检记录";
      // this.form.brand = this.$route.query.brand;
      // this.form.vehicleNumber = this.$route.query.vehicleNo;
      this.form.yearlyInspectionMoney = "";
      this.form.handler = "";
      this.form.yearlyInspectionDate = "";
      this.form.termOfValidity = "";
      this.form.remark = "";
      this.form.efileIdCode = "";
    } else if (this.$route.query.form == "look") {
      this.showButton = false;
      this.showMsg = "查看 年检信息";
      this.isShow = true;
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleYearlyinspectionInfo/vehicleYearlyinspectionDetails?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.form.vehicleNo = result.data.data.vehicleNo;
            this.form.vehicleId = result.data.data.vehicleId;
            this.form.brand = result.data.data.brandTypeName;
            this.form.vehicleNumber = "";
            this.form.yearlyInspectionMoney =
              result.data.data.yearlyInspectionMoney;
            this.form.handler = result.data.data.handler;
            this.form.yearlyInspectionDate =
              result.data.data.yearlyInspectionDateStr;
            this.form.termOfValidity = result.data.data.termOfValidityStr;
            this.form.remark = result.data.data.remark;
            this.form.efileIdCode = "";
            this.fileList = result.data.data.ls_EfileIdCodeAddr;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    } else {
      this.showButton = false;
      this.showMsg = "修改 年检信息";
      this.isShow = false;
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleYearlyinspectionInfo/vehicleYearlyinspectionDetails?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.form.vehicleNo = result.data.data.vehicleNo;
            this.form.vehicleId = result.data.data.vehicleId;
            this.form.brand = result.data.data.brandTypeName;
            this.form.yearlyInspectionMoney =
              result.data.data.yearlyInspectionMoney;
            this.form.handler = result.data.data.handler;
            this.form.yearlyInspectionDate =
              result.data.data.yearlyInspectionDateStr;
            this.form.termOfValidity = result.data.data.termOfValidityStr;
            this.form.remark = result.data.data.remark;
            result.data.data.ls_EfileIdCodeAddr.map((res) => {
              return this.imgIdList.push(res.id);
            });
            this.form.efileIdCode = this.imgIdList.join(",");
            this.fileList = result.data.data.ls_EfileIdCodeAddr;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
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
#header {
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
  height: calc(100% - 79px);
  box-sizing: border-box;
  margin-top: 40px;
}

.el-form {
  width: 100%;
  height: 100%;
}

.formNav {
  width: 100%;
  height: calc(100% - 60px);
}

.formNav .formItemNav {
  width: 100%;
  height: 63px;
}

.formNav .el-form-item {
  float: left;
}
.formNav .el-form-item:last-child {
  width: 100%;
}
/* .images{
    width: 100%;
    height: 63px;
    float: left;
} */
/* .formNav .formItemNav .el-form-item{
    float: left;
} */
.el-form .footerButton {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding-top: 12px;
  padding-left: 44%;
  border-top: 1px solid #e5e5e5;
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
/* 图片 */
.upload_txt {
  color: #368cfe;
  text-decoration: underline;
  white-space: nowrap;
  /* float: left; */
}
.upload {
  display: flex;
  width: 60px;
  height: 60px;
}
.formItem >>> .el-upload-list {
  display: flex;
}
.formItem >>> .el-upload--picture-card {
  width: 120px;
  height: 30px;
  line-height: 40px;
  background-color: #fff;
  border: 0;
}
.formItem >>> .el-upload-list__item {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  /* padding: 10px; */
  border: 0;
}
/* .formItem >>> .el-upload-list__item-status-label{
  display: none !important;
}
.formItem >>> .el-upload-list__item-thumbnail{
  width: 40px;
  height: 40px;
  margin-left: 0;
  display: block;
}
.formItem >>> .el-upload-list__item .el-icon-close{
  top: 0;
  right: 0;
} */
.imgSrc {
  float: left;
  margin-left: 10px;
  width: 60px;
  height: 60px;
}
#header >>> .el-dialog__body {
  padding: 20px;
}
#header >>> .el-dialog__header {
  padding: 0;
}
#header >>> .el-dialog__headerbtn {
  top: 3px;
  right: 3px;
}
</style>
