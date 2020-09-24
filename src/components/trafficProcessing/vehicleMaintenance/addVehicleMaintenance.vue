<template>
  <div id="header">
    <div class="header">
      <span>{{ showMsg }}</span>
    </div>
    <div class="footer">
      <div class="footerTitle">
        <span>车型信息</span>
      </div>
      <div class="footerNav" v-if="international.title">
        <el-form ref="form" :model="form" label-width="130px">
          <div class="formNav">
            <el-form-item
              label="品牌"
              prop="brandName"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.brandName"></el-input>
            </el-form-item>
            <el-form-item
              label="车型"
              prop="vehicleTypeName"
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
                maxlength="100"
                v-model="form.vehicleTypeName"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="车身尺寸长(mm)"
              prop="vehicleLength"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.vehicleLength"></el-input>
            </el-form-item>
            <el-form-item
              label="车身尺寸宽(mm)"
              prop="width"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.width"></el-input>
            </el-form-item>
            <el-form-item
              label="车身尺寸高(mm)"
              prop="height"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.height"></el-input>
            </el-form-item>
            <el-form-item
              label="轴距(mm)"
              prop="axisbase"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.axisbase"></el-input>
            </el-form-item>
            <el-form-item
              label="轮距(mm)"
              prop="wheelbase"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.wheelbase"></el-input>
            </el-form-item>
            <el-form-item
              label="总质量(kg)"
              prop="totalMass"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.totalMass"></el-input>
            </el-form-item>
            <el-form-item
              label="额定载质量(kg)"
              prop="maxLoad"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.maxLoad"></el-input>
            </el-form-item>
            <el-form-item
              label="额定乘坐人数"
              prop="maxPassengers"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.maxPassengers"></el-input>
            </el-form-item>
            <el-form-item
              label="最高车速(km/h)"
              prop="maxSpeed"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.maxSpeed"></el-input>
            </el-form-item>
            <el-form-item
              label="续航里程(km)"
              prop="vehicleRange"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.vehicleRange"></el-input>
            </el-form-item>
            <el-form-item
              label="充电时长(h)"
              prop="chargingTime"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.chargingTime"></el-input>
            </el-form-item>
            <el-form-item
              label="电池容量(kw.h)"
              prop="batteryCapacity"
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
                maxlength="100"
                v-model="form.batteryCapacity"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="月租金(元)"
              prop="monthlyRent"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input class="formItem" size="small" maxlength="100" v-model="form.monthlyRent"></el-input>
            </el-form-item>
            <el-form-item
              label="图片"
              class="formItem"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-upload
                class="upload"
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
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </div>
          <div class="footerButton">
            <el-button type="primary" size="small" v-if="showButton" @click="addConfirm">新增</el-button>
            <el-button type="primary" size="small" v-else @click="editConfirm">修改</el-button>
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
  getMenuBtnList,
} from "../../../public";
export default {
  name: "addVehicleMaintenance",
  data() {
    return {
      form: {
        enterpriseId: "",
        brandId: "", //品牌id
        id: "", //车型id
        brandName: "", //品牌
        vehicleTypeName: "", //车型名称
        vehicleLength: "", //长
        width: "", //宽
        height: "", //高
        axisbase: "", //轴距
        wheelbase: "", //轮距
        totalMass: "", //车辆总质量
        maxLoad: "", //额定载质量
        maxPassengers: "", //额定乘坐人数
        maxSpeed: "", //最高车速
        vehicleRange: "", //续航里程
        chargingTime: "", //充电时长
        batteryCapacity: "", //电池容量
        monthlyRent: "", //月租金
        efileIdCode: "", //图片id
        enabled: "", //车型状态
      },
      imgIdList: [], //图片id
      international: {},
      showMsg: "", //新增修改标题
      showButton: false, //确定新增修改按钮
      fileList: [],
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.imgIdList.length <= 0) {
            this.$message({
              type: "error",
              message: "图片不能为空!",
              center: true,
            });
            return;
          }
          axios({
            method: "post",
            url: "/vehicle-service/vehicleTypeInfo/insertVehicleType",
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.imgIdList.length <= 0) {
            this.$message({
              type: "error",
              message: "图片不能为空!",
              center: true,
            });
            return;
          }
          axios({
            method: "post",
            url: "/vehicle-service/vehicleTypeInfo/editVehicleType",
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      let index = this.imgIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.imgIdList.splice(index, 1);
      this.form.efileIdCode = this.imgIdList.toString();
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      this.imgIdList.push(response.data.id);
      this.form.efileIdCode = this.imgIdList.toString();
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
    handleExceed() {
      this.$message({
        message: "最多上传5张图片!",
        center: true,
        type: "error",
      });
    },
  },
  mounted() {
    this.$store.commit("changeIsStatus", false);
    if (this.$route.query.form == "add") {
      this.showButton = true;
      this.showMsg = "新增 车型信息";
      this.form.brandName = "";
      this.form.vehicleTypeName = "";
      this.form.vehicleLength = "";
      this.form.width = "";
      this.form.height = "";
      this.form.axisbase = "";
      this.form.wheelbase = "";
      this.form.totalMass = "";
      this.form.maxLoad = "";
      this.form.maxPassengers = "";
      this.form.maxSpeed = "";
      this.form.vehicleRange = "";
      this.form.chargingTime = "";
      this.form.batteryCapacity = "";
      this.form.monthlyRent = "";
      this.form.efileIdCode = "";
    } else {
      this.showButton = false;
      this.showMsg = "修改 车型信息";
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleTypeInfo/vehicleTypeDetails?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data)
          if (result.data.status === 0) {
            this.form.enterpriseId = result.data.data.enterpriseId;
            this.form.brandId = result.data.data.brandId;
            this.form.id = result.data.data.id;
            this.form.brandName = result.data.data.brandName;
            this.form.vehicleTypeName = result.data.data.vehicleTypeName;
            this.form.vehicleLength = result.data.data.vehicleLength;
            this.form.width = result.data.data.width;
            this.form.height = result.data.data.height;
            this.form.axisbase = result.data.data.axisbase;
            this.form.wheelbase = result.data.data.wheelbase;
            this.form.totalMass = result.data.data.totalMass;
            this.form.maxLoad = result.data.data.maxLoad;
            this.form.maxPassengers = result.data.data.maxPassengers;
            this.form.maxSpeed = result.data.data.maxSpeed;
            this.form.vehicleRange = result.data.data.vehicleRange;
            this.form.chargingTime = result.data.data.chargingTime;
            this.form.batteryCapacity = result.data.data.batteryCapacity;
            this.form.monthlyRent = result.data.data.monthlyRent;
            //this.form.efileIdCode = result.data.data.efileIdCode;
            this.fileList = result.data.data.ls_EfileIdCodeAddr;
            this.form.efileIdCode = "";
            if (result.data.data.ls_EfileIdCodeAddr) {
              (this.imgIdList = []),
                result.data.data.ls_EfileIdCodeAddr.map((item) => {
                  this.imgIdList.push(item.id);
                });
              this.form.efileIdCode = this.imgIdList.toString();
            }

            // for( var i = 0; i < result.data.data.ls_EfileIdCodeAddr.length; ++i )
            // {
            //   this.form.efileIdCode += result.data.data.ls_EfileIdCodeAddr[i].id;
            //   if(i != result.data.data.ls_EfileIdCodeAddr.length)
            //   {
            //     this.form.efileIdCode +=",";
            //   }
            // }
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
