<template>
  <div id="header">
    <div class="header">
      <span>{{ showMsg }}</span>
    </div>
    <div class="footer">
      <div class="footerNav">
        <div class="footerTitle">
          <span>合同信息</span>
        </div>
        <el-form ref="form" :model="form" label-width="130px">
            <div class="formNav formNavs">
            <el-form-item label="合同编号">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="form.contractCode"
              ></el-input>
            </el-form-item>
            <el-form-item label="承租方">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="form.contractCode"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="form.contractCode"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="form.urgentPhoneNumer"
              ></el-input>
            </el-form-item>
            </div>
        </el-form>
      </div>
      <div class="footerButton">
        <el-button type="primary" size="small" @click="confirm">确定</el-button>
        <el-button size="small" @click="cancel">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString, getMenuBtnList } from "../../public";
export default {
  name: "advancesReceived",
  data() {
    return {
      showMsg: "预收款管理",
      form : {

      },
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    confirm() {
      //确定
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   console.log(row, column, rowIndex, columnIndex);
      const span = column["property"] + "-span";
      if (row[span]) {
        return row[span];
      }
    },
    getVehicle() {
      //合同查询车辆
      axios({
        method: "get",
        url:
          "/vehicle-service/comboBoxController/contractSearchVehicle?vehicleTypeId=1", //+this.vehicleTypeId
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.vehicleNoOptions = result.data.data;
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
    lookFeilAction(imgCode) {
      let params = {
        idCode: imgCode,
      };
      getImgsrcList(params, this.headers)
        .then((res) => {
          if (res.status == 0) {
            this.imageUrlList = res.data;
            if (this.imageUrlList < 1) {
              this.$message.warning({
                message: "暂无附件",
                center: true,
              });
            } else {
              this.dialogVisible = true;
            }
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
    },
    getInitData() {
      //跳转计划审核
      axios({
        method: "get",
        url:
          "/vehicle-service/rentCollectionInfo/queryContractRentRecord?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.vehicleTypeId = result.data.data.vehicleTypeId;
            this.getVehicle();

            this.formContract.contractCode = result.data.data.contractCode; //合同编号
            this.formContract.rentStartDateStr =
              result.data.data.rentStartDateStr; //起租日期
            this.formContract.rentEndDateStr = result.data.data.rentEndDateStr; //止租日期
            this.formContract.urgentPhoneNumer =
              result.data.data.urgentPhoneNumer; //紧急联系电话
            this.formContract.efileIdList = result.data.data.efileIdList; //合同附件
            this.fileList = result.data.data.fileInfoVOS;
            this.fileList = JSON.parse(
              JSON.stringify(this.fileList).replace(/efileName/g, "name")
            );
            this.formContract.supplefileIdList =
              result.data.data.supplefileIdList; //合同附加附件

            this.formContract.customerName = result.data.data.customerName; //承租方名称
            this.formContract.customerPhoneNumber =
              result.data.data.customerPhoneNumber; //承租方电话
            this.formContract.customerContacts =
              result.data.data.customerContacts; //承租方联系人
            this.formContract.contactsPhoneNumber =
              result.data.data.contactsPhoneNumber; //承租方联系人电话
            this.formContract.customerAdd = result.data.data.customerAdd; //承租方地址

            this.formContract.vehicleNum = result.data.data.vehicleNum; //租车数量
            this.formContract.chargingPileNum =
              result.data.data.chargingPileNum; //充电桩数量
            this.formContract.vehicleList =
              result.data.data.leaseContractVehicleInfoVOList; //合同车辆关联

            this.vehicleDataList = result.data.data.contractPayCostRecordVOList; //缴费记录

            this.formContract.leaseContractGenerateTableVO =
              result.data.data.leaseContractExecuteTableVO;
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
    mergeTableRow(data, merge) {
      if (!merge || merge.length === 0) {
        return data;
      }
      merge.forEach((m) => {
        const mList = {};
        data = data.map((v, index) => {
          const rowVal = v[m];
          if (mList[rowVal]) {
            mList[rowVal]++;
            data[index - (mList[rowVal] - 1)][m + "-span"].rowspan++;
            v[m + "-span"] = {
              rowspan: 0,
              colspan: 0,
            };
          } else {
            mList[rowVal] = 1;
            v[m + "-span"] = {
              rowspan: 1,
              colspan: 1,
            };
          }
          return v;
        });
      });
      return data;
    },
  },
  created() {

  },
  mounted() {
    // this.getInitData();
  },
  computed: {},
  watch: {},
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
.banner {
  width: 100%;
}
.orderNum {
  margin-bottom: 23px;
}
.orderNum span {
  margin-left: 65px;
  margin-right: 5px;
  font-size: 14px;
}
.footerTitle {
  width: 100%;
  height: 40px;
  float: left;
  line-height: 40px;
  box-sizing: border-box;
  padding-left: 40px;
  margin-bottom: 40px;
  background-color: #f5f7fa;
}

.footerTitle span {
  color: #368cfe;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 16px;
}
.footerTitle .el-button {
  float: right;
  margin-top: 3px;
  margin-right: 10px;
}
.footerNav {
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  /* box-sizing: border-box; */
}
.footerButton {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border-top: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demonstration {
  display: inline-block;
  width: 60px;
  font-size: 12px;
  margin-right: 10px;
  text-align: right;
  color: #333333;
}
.nav {
  width: 25%;
  height: 60px;
  display: flex;
  align-items: center;
  float: left;
}
.nav .el-input {
  width: 160px;
}
.nav .el-input__inner {
  width: 160px;
}
.nav >>> .el-input--suffix {
  width: 160px;
}
.nav span {
  color: #333333;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 12px;
  line-height: 18px;
  margin-left: 20px;
  margin-right: 5px;
}
.cctv1 >>> .el-tabs--border-card > .el-tabs__content {
  height: 500px;
  overflow-y: auto;
  box-sizing: border-box;
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

.cctv {
  width: 100%;
  margin-top: 20px;
}
.cctvTable {
  margin-bottom: 40px;
}
.cctv1 {
  width: 100%;
}
.cctv1 >>> .el-form-item__content {
  margin-left: 0 !important;
}
.cctv1 >>> .el-form-item__content .el-tabs--left {
  overflow-y: auto;
}
.footerNav .el-input {
  width: 160px;
}
/* .footerNav .el-input:nth-child(4) {
  width: 140px;
} */
.footerNav .el-table .el-input {
  width: 100%;
}
/* .formNavs .el-form-item:nth-child(4) .el-input {
  width: 130px;
} */
.footerNav .el-input__inner {
  width: 160px;
}

.footerNav >>> .el-input--suffix {
  width: 160px;
}
.vehicleData .el-input {
  width: 100%;
}
.vehicleData .el-input__inner {
  width: 100%;
}
.vehicleData >>> .el-input--suffix {
  width: 100%;
}
.vehicleData >>> .el-table__row td div {
  width: 100%;
}
/* 图片 */
.upload_txt {
  color: #368cfe;
  text-decoration: underline;
  white-space: nowrap;
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
  border: 0;
}
.lookFile {
  color: #0000ff;
  cursor: pointer;
}
#header >>> .el-dialog__body {
  padding: 0;
}
#header >>> .el-dialog__header {
  padding: 0;
}
#header >>> .el-dialog__headerbtn {
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#header >>> .el-dialog__close {
  color: #fff;
}
#header >>> .el-carousel__button {
  width: 12px;
}
.imgList {
  width: 100%;
  height: 400px;
  display: block;
}
.imgSrc {
  float: left;
  margin-left: 10px;
  width: 60px;
  height: 60px;
}
</style>
