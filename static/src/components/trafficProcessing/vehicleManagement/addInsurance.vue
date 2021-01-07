<template>
  <div id="header">
    <div class="header scoped">
      <span>{{ showMsg }}</span>
    </div>
    <div class="footer">
      <div class="footerTitle">
        <span>保险记录</span>
      </div>
      <div class="footerNav" v-if="international.title">
        <el-form ref="form" :model="form" label-width="130px">
          <div class="formNav">
            <el-form-item label="车牌号">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="form.vehicleNo"
              ></el-input>
            </el-form-item>
            <el-form-item label="品牌车型">
              <el-input class="formItem" size="small" disabled maxlength="100" v-model="form.brand"></el-input>
            </el-form-item>

            <el-form-item
              label="交强险保单号"
              prop="policyNo0"
              :rules="[
                {
                  required: this.showredstar,
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
                v-model="form.policyNo0"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="交强险开始日期"
              prop="policyStartDate0"
              :rules="[
                {
                  required: this.showredstar,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-date-picker
                v-model="form.policyStartDate0"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isShow"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="交强险结束日期"
              prop="policyEndDate0"
              :rules="[
                {
                  required: this.showredstar,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-date-picker
                v-model="form.policyEndDate0"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isShow"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="交强险保费"
              prop="premium0"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isShow"
                maxlength="100"
                v-model="form.premium0"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="交强险保险公司"
              prop="companyName0"
              :rules="[
                {
                  required: this.showredstar,
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
                v-model="form.companyName0"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark0">
              <el-input
                class="formItem"
                size="small"
                :disabled="isShow"
                type="textarea"
                autosize
                maxlength="100"
                v-model="form.remark0"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="附加照片"
              class="formItem"
            >
              <el-upload
                class="upload"
                :disabled="isShow"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=4"
                :headers="headers"
                :on-preview="handlePreview0"
                :on-remove="handleRemove0"
                :on-success="handleSuccess0"
                :on-error="handleError0"
                :on-exceed="handleExceed"
                :before-upload="handleBeforeUpload0"
                :file-list="fileList0"
                list-type="picture-card"
                :limit="5"
                multiple
              >
                <span class="upload_txt">上传图片</span>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <el-dialog :visible.sync="dialogVisible0" width="500px">
                <img width="100%" :src="dialogImageUrl0" alt />
              </el-dialog>
            </el-form-item>

            <el-form-item
              label="商业险保单号"
              prop="policyNo1"
              :rules="[
                {
                  required: this.showredstar,
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
                v-model="form.policyNo1"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商业险开始日期"
              prop="policyStartDate1"
              :rules="[
                {
                  required: this.showredstar,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-date-picker
                v-model="form.policyStartDate1"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isShow"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="商业险结束日期"
              prop="policyEndDate1"
              :rules="[
                {
                  required: this.showredstar,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-date-picker
                v-model="form.policyEndDate1"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isShow"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="商业险保费"
              prop="premium1"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isShow"
                maxlength="100"
                v-model="form.premium1"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商业险保险公司"
              prop="companyName1"
              :rules="[
                {
                  required: this.showredstar,
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
                v-model="form.companyName1"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark1">
              <el-input
                class="formItem"
                size="small"
                :disabled="isShow"
                type="textarea"
                autosize
                maxlength="100"
                v-model="form.remark1"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="续保处理人"
              prop="dealMan"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isShow"
                maxlength="100"
                v-model="form.dealMan"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="附加照片"
              class="formItem"
            >
              <el-upload
                class="upload"
                :disabled="isShow"
                action="vehicle-service/efileInfo/uploadImgFile?fileType=4"
                :headers="headers"
                :on-preview="handlePreview1"
                :on-remove="handleRemove1"
                :on-success="handleSuccess1"
                :on-error="handleError1"
                :on-exceed="handleExceed"
                :before-upload="handleBeforeUpload1"
                :file-list="fileList1"
                list-type="picture-card"
                :limit="5"
                multiple
              >
                <span class="upload_txt">上传图片</span>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <el-dialog :visible.sync="dialogVisible1" width="500px">
                <img width="100%" :src="dialogImageUrl1" alt />
              </el-dialog>
            </el-form-item>
          </div>
        </el-form>
        <div class="footerButton">
          <el-button type="primary" size="small" v-if="showButton" @click="addConfirm">新增</el-button>
          <el-button type="primary" :disabled="isShow" size="small" v-else @click="editConfirm">修改</el-button>
          <el-button size="small" @click="cancel">取消</el-button>
        </div>
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
  name: "addInsurance",
  data() {
    return {
      form: {
        vehicleId: "", //车牌id
        vehicleNo: "", //车牌
        brand: "", //车型名称
        policyNo0: "", //强保险单号
        companyName0: "", //强保险公司
        premium0: "", //强保险保费
        policyStartDate0: "", //强保险开始日期
        policyEndDate0: "", //强保险结束日期
        remark0: "", //强保险备注
        efileIdCode0: "", //强保险图片id
        policyNo1: "", //商业保险单号
        companyName1: "", //商业保险公司
        premium1: "", //商业保险保费
        policyStartDate1: "", //商业保险开始日期
        policyEndDate1: "", //商业保险结束日期
        remark1: "", //商业保险备注
        efileIdCode1: "", //商业保险图片id
        dealMan: "", //处理人
        insploinfoId0: "",
        insploinfoId1: "",
      },
      showredstar:true,//控制查看不现实红星
      isShow: false,
      imgIdList0: [], //图片id
      imgIdList1: [], //图片id
      international: {},
      showMsg: "", //新增修改标题
      showButton: false, //确定新增修改按钮
      fileList0: [],
      fileList1: [],
      dialogImageUrl0: "",
      dialogImageUrl1: "",
      dialogVisible0: false,
      dialogVisible1: false,
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    addConfirm() {
      //确定新增

      var time1 = new Date(this.form.policyStartDate0).getTime();
      var time2 = new Date(this.form.policyEndDate0).getTime();

      if (time1 > time2) {
        this.$message({
          message: "交强险开始日期大于交强险结束日期",
          center: true,
          type: "error",
        });
        return;
      }

      time1 = new Date(this.form.policyStartDate1).getTime();
      time2 = new Date(this.form.policyEndDate1).getTime();

      if (time1 > time2) {
        this.$message({
          message: "商业险开始日期大于商业险结束日期",
          center: true,
          type: "error",
        });
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios({
            method: "post",
            url: "/vehicle-service/vehicleInspolinfo/insertVehicleInspolinfo",
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
                if(this.$route.query.form == 'addInsurance'){
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
              console.error(err);
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

      // if(this.form.efileIdCode0.length == 0)
      // {
      //   this.$message({
      //     type: "error",
      //     message: "请上传强保险图片",
      //     center: true,
      //   });
      //   return;
      // }
      // if( this.form.efileIdCode1.length == 0 )
      // {
      //   this.$message({
      //     type: "error",
      //     message: "请上传商业险图片",
      //     center: true,
      //   });
      //   return;
      // }

      this.form.id = this.$route.query.id;
      axios({
        method: "post",
        url: "/vehicle-service/vehicleInspolinfo/modifyVehicleInspolinfo",
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
    handleRemove0(file, fileList) {
      // console.log(file, fileList);
      // console.log(this.form.efileIdCode)
      var index = this.imgIdList0.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.imgIdList0.splice(index,1);
      this.form.efileIdCode0 = this.imgIdList0.toString();
    },
    handlePreview0(file) {
      this.dialogImageUrl0 = file.url;
      this.dialogVisible0 = true;
    },
    handleSuccess0(response, file, fileList) {
      // console.log(response, file, fileList);
      if(response.status == 0){
        this.imgIdList0.push(response.data.id);
        this.form.efileIdCode0 = this.imgIdList0.join(",");
      }else{
        this.$message({
        message: '上传失败,请重新上传!',
        center: true,
        type: "error",
      });
      }

    },
    handleError0() {
      this.$error("上传失败,请重新上传图片!");
    },
    handleBeforeUpload0(file) {
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
    handleExceed() {
      this.$message({
        message: "最多上传5张图片!",
        center: true,
        type: "error",
      });
    },
    handleRemove1(file, fileList) {
      // console.log(file, fileList);
      // console.log(this.form.efileIdCode)
      var index = this.imgIdList1.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.imgIdList1.splice(index,1);
      this.form.efileIdCode1 = this.imgIdList1.toString();
    },
    handlePreview1(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    handleSuccess1(response, file, fileList) {
      // console.log(response, file, fileList);
      if(response.status == 0){
        this.imgIdList1.push(response.data.id);
        this.form.efileIdCode1 = this.imgIdList1.join(",");
      }else{
        this.$message({
        message: '上传失败,请重新上传!',
        center: true,
        type: "error",
      });
      }
    },
    handleError1() {
      this.$error("上传失败,请重新上传图片!");
    },
    handleBeforeUpload1(file) {
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
            this.form.vehicleId = result.data.data.id;
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
    this.initData();
    if (this.$route.query.form == "add" || this.$route.query.form == "addInsurance") {
      this.showButton = true;
      this.isShow = false;
      this.showMsg = "新增保险记录";
      this.form.policyNo0 = "";
      this.form.companyName0 = "";
      this.form.premium0 = "";
      this.form.policyStartDate0 = "";
      this.form.policyEndDate0 = "";
      this.form.remark0 = "";
      this.form.efileIdCode0 = "";
      this.form.policyNo1 = "";
      this.form.companyName1 = "";
      this.form.premium1 = "";
      this.form.policyStartDate1 = "";
      this.form.policyEndDate1 = "";
      this.form.remark1 = "";
      this.form.efileIdCode1 = "";
      this.form.dealMan = "";
    } else if (this.$route.query.form == "look") {
      this.showredstar=false;
      this.showButton = false;
      this.showMsg = "查看 保险信息";
      this.isShow = true;
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleInspolinfo/vehicleInspolinfoDetails?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.form.policyNo0 = result.data.data.policyNo0;
            this.form.companyName0 = result.data.data.companyName0;
            this.form.premium0 = result.data.data.premium0;
            this.form.policyStartDate0 = result.data.data.policyStartDate0;
            this.form.policyEndDate0 = result.data.data.policyEndDate0;
            this.form.remark0 = result.data.data.remark0;
            result.data.data.ls_EfileIdCodeAddr0.map((res) => {
              return this.imgIdList0.push(res.id);
            });
            this.form.efileIdCode0 = this.imgIdList0.join(",");
            this.form.policyNo1 = result.data.data.policyNo1;
            this.form.companyName1 = result.data.data.companyName1;
            this.form.premium1 = result.data.data.premium1;
            this.form.policyStartDate1 = result.data.data.policyStartDate1;
            this.form.policyEndDate1 = result.data.data.policyEndDate1;
            this.form.remark1 = result.data.data.remark1;
            result.data.data.ls_EfileIdCodeAddr1.map((res) => {
              return this.imgIdList1.push(res.id);
            });
            this.form.insploinfoId0 = result.data.data.insploinfoId0;
            this.form.insploinfoId1 = result.data.data.insploinfoId1;
            this.form.efileIdCode1 = this.imgIdList1.join(",");
            this.form.dealMan = result.data.data.dealMan;
            this.fileList0 = result.data.data.ls_EfileIdCodeAddr0;
            this.fileList1 = result.data.data.ls_EfileIdCodeAddr1;
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
      this.isShow = false;
      this.showMsg = "修改 保险信息";
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleInspolinfo/vehicleInspolinfoDetails?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.form.policyNo0 = result.data.data.policyNo0;
            this.form.companyName0 = result.data.data.companyName0;
            this.form.premium0 = result.data.data.premium0;
            this.form.policyStartDate0 = result.data.data.policyStartDate0;
            this.form.policyEndDate0 = result.data.data.policyEndDate0;
            this.form.remark0 = result.data.data.remark0;
            result.data.data.ls_EfileIdCodeAddr0.map((res) => {
              return this.imgIdList0.push(res.id);
            });
            this.form.efileIdCode0 = this.imgIdList0.join(",");
            this.form.policyNo1 = result.data.data.policyNo1;
            this.form.companyName1 = result.data.data.companyName1;
            this.form.premium1 = result.data.data.premium1;
            this.form.policyStartDate1 = result.data.data.policyStartDate1;
            this.form.policyEndDate1 = result.data.data.policyEndDate1;
            this.form.remark1 = result.data.data.remark1;
            result.data.data.ls_EfileIdCodeAddr1.map((res) => {
              return this.imgIdList1.push(res.id);
            });
            this.form.insploinfoId0 = result.data.data.insploinfoId0;
            this.form.insploinfoId1 = result.data.data.insploinfoId1;
            this.form.efileIdCode1 = this.imgIdList1.join(",");
            this.form.dealMan = result.data.data.dealMan;
            this.fileList0 = result.data.data.ls_EfileIdCodeAddr0;
            this.fileList1 = result.data.data.ls_EfileIdCodeAddr1;
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
  height: calc(100% - 56px);
  overflow: auto;
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


.formNav .formItemNav {
  width: 100%;
  height: 63px;
}

.formNav .el-form-item {
  float: left;
}
.formNav .el-form-item:nth-child(9) {
  width: 100%;
}
.formNav .el-form-item:last-child {
  width: 100%;
}
/* .formItemImg {
  width: 100%;
}
.formItemImg .el-form-item{
  width: 100%;
} */
/* .images{
    width: 100%;
    height: 63px;
    float: left;
} */
/* .formNav .formItemNav .el-form-item{
    float: left;
} */
/* .el-form .footerButton {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding-top: 12px;
  padding-left: 44%;
  border-top: 1px solid #e5e5e5;
} */

.footerNav .el-input {
  width: 160px;
}

.footerNav .el-input__inner {
  width: 160px;
}

.footerNav >>> .el-input--suffix {
  width: 160px;
}
.footerNav .el-textarea{
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
