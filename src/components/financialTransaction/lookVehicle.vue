<template>
  <div id="header">
    <div class="header">
      <span>{{ showMsg }}</span>
    </div>
    <div class="footer">
      <div class="footerNav">
        <div class="footerTitle">
          <span>车辆监控</span>
        </div>
        <el-table class="vehicleData" :data="data">
              <el-table-column prop="name" label="车牌号">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.vehicleNo"
                    size="small"
                    filterable
                    @change="handleChangevehicleNo(scope.$index,scope.row)"
                    placeholder
                  >
                    <el-option
                      v-for="item in vehicleNoOptions"
                      :key="item.id"
                      :label="item.vehicleNo"
                      :value="item.vehicleNo"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="vehicleColor" label="颜色">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    disabled
                    v-model="scope.row.vehicleColorName"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="车型">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    disabled
                    v-model="scope.row.vehicleTypeName"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleLook(scope.$index, scope.row)">实时监控</el-button>
                  <el-button size="mini" type="danger" @click="handleBack(scope.$index, scope.row)">轨迹回放</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="footerTitle">
                <span>车务数据</span>
            </div>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick" type="border-card" style="height: 500px;">
                <el-tab-pane label="汇总">
                  <el-table
                    :data="dataList"
                    border
                    stripe
                    :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                    size="small"
                    height="470"
                    style="width: 100%;"
                  >
                    <el-table-column prop="vehicleNo" label="车牌号码" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="contractCode" label="合同编号" width="130" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="userName" label="所属业务员" width="90" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationTimeStr" label="违章时间" width="130" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationPlace" label="违章地点" width="130" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationType" label="违章类型" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationScore" label="扣分" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationFine" label="罚款" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="customerContacts" label="客户联系人" width="90" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violators" label="违章人" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="handlers" label="处理人" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationStatusStr" label="状态" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="处理凭证" min-width="80">
                        <template slot-scope="scope">
                            <span class="lookFile" @click="lookFeilAction(scope.row)">查看附件</span>
                        </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane
                  v-for="(item,index) in dataList1"
                  :label="item.vehicleNo"
                  :key="dataList1[index].vehicleId"
                >
                  <el-table
                    :data="dataList2"
                    border
                    size="small"
                    height="470"
                    style="width: 100%;"
                  >
                    <el-table-column prop="vehicleNo" label="车牌号码" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="contractCode" label="合同编号" width="130" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="userName" label="所属业务员" width="90" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationTimeStr" label="违章时间" width="130" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationPlace" label="违章地点" width="130" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationType" label="违章类型" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationScore" label="扣分" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationFine" label="罚款" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="customerContacts" label="客户联系人" width="90" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violators" label="违章人" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="handlers" label="处理人" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="violationStatusStr" label="状态" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="处理凭证" min-width="80">
                        <template slot-scope="scope">
                            <span class="lookFile" @click="lookFeilAction(scope.row)">查看附件</span>
                        </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
      </div>
      <!-- 查看附件 -->
      <el-dialog :visible.sync="dialogVisible" width="500px">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in imageUrlList" :key="item.id">
            <img class="imgList" :src="item.efileAddr" alt srcset />
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
      <div class="footerButton">
        <el-button type="primary" size="small" @click="confirm">确定</el-button>
        <el-button size="small" @click="cancel">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getImgsrcList } from "../../api/businessProcess/api";
import { getCookie, dateToString, getMenuBtnList ,formatJE} from "../../public";
export default {
  name: "lookVehicle",
  data() {
    return {
      showMsg: "查看合同车辆记录",
      data:[],
      form:{

      },
      dataList:[],
      dataList1:[],
      dataList2:[],
      vehicleNoOptions:[],
      tabPosition:'left',
      vehicleTypeId:'',
      dialogVisible: false,
      currentPage:1,
      pageSize:10,
      imageUrlList: [],
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    confirm() {
      //确定
      this.$refs.formBackVehicle.validate((valid) => {
        if (valid) {
          axios({
            method: "post",
            url:
              "/vehicle-service/backOffVehicleInfo/submitReturnCarSettlement", //+this.vehicleTypeId
            headers: this.headers,
            data: this.formBackVehicle,
          })
            .then((result) => {
              console.log(result.data);
              this.$store.commit("changeIsStatus", true);
              if (result.data.status === 0) {
                this.$message({
                  type: "success",
                  message: "结算成功",
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
    handleLook(index,row) {
      //实时监控
      console.log(row)
      this.$router.push({
        path: "/vehicleMonitoring",
        query: { form: "vehicleMonitoring",vehicleNo:row.vehicleNo },
      });
    },
    handleBack(index,row) {
      //轨迹回放
      console.log(row)
      // this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/backLookVehicle",
        query: { form: "backLookVehicle",vehicleNo:row.vehicleNo },
      });
    },
    handleSearch(){
        //违章查询
        axios({
            method: "post",
            url:
              "/vehicle-service/rentCollectionInfo/queryVehicleEndorsement", //+this.vehicleTypeId
            headers: this.headers,
            data: {
                contractId:this.$route.query.id,
                vehicleNo:'',
                currentPage:1,
                pageSize:this.pageSize,
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status === 0) {
                this.dataList = result.data.data;
              } else {
                this.$message({
                  message: result.data.message,
                  center: true,
                  type: "error",
                });
              }
            })
    },
    handleClick(targetName,action){
        // console.log(targetName,action)
        axios({
            method: "post",
            url:
              "/vehicle-service/rentCollectionInfo/queryVehicleEndorsement", //+this.vehicleTypeId
            headers: this.headers,
            data: {
                contractId:this.$route.query.id,
                vehicleNo:targetName.label == '汇总' ? '' : targetName.label,
                currentPage:1,
                pageSize:this.pageSize,
            },
          })
            .then((result) => {
              console.log(result.data);
              if (result.data.status === 0) {
                this.dataList2 = result.data.data;
              } else {
                this.$message({
                  message: result.data.message,
                  center: true,
                  type: "error",
                });
              }
            })
    },
    getVehicle() {
      //合同查询车辆
      axios({
        method: "get",
        url:
          "/vehicle-service/comboBoxController/contractSearchVehicle?vehicleTypeId=" + this.vehicleTypeId, //+, 
        headers: this.headers,
      })
        .then((result) => {
          console.log(result.data);
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
    handleChangevehicleNo(index, row) {
      //获取车牌
      axios({
        method: "get",
        url:
          "/vehicle-service/comboBoxController/contractSearchVehicle?vehicleTypeId=" + this.vehicleTypeId + "&vehicleNo=" +
          row.vehicleNo, //+this.vehicleTypeId
        headers: this.headers,
      })
        .then((result) => {
          console.log(result.data);
          if (result.data.status === 0) {
            row.id = result.data.data[0].id;
            row.vehicleId = result.data.data[0].id;
            row.vehicleColor = result.data.data[0].vehicleColorName;
            row.vehicleType = result.data.data[0].vehicleTypeName;
            // row.startDate = result.data.data[0].startDate;
            // row.endDate1 = result.data.data[0].endDate1;
            // row.endDate2 = result.data.data[0].endDate2;
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
    lookFeilAction(row) {
        console.log(row)
      let params = {
        idCode: row.efileIdCode,
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
      //跳转查看合同车辆记录
      axios({
        method: "get",
        url:
          "/vehicle-service/rentCollectionInfo/queryContractVehicleRecord?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          console.log(result.data);
          if (result.data.status === 0) {
            this.data = result.data.data.leaseContractVehicleInfoVOList;
            this.dataList1 = result.data.data.leaseContractVehicleInfoVOList;
            this.vehicleTypeId = result.data.data.leaseContractVehicleInfoVOList[0].vehicleTypeId;
            this.getVehicle();
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
    this.getInitData();
    this.handleSearch();
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
/* .cctv1 >>> .el-form-item__content .el-tabs--left {
  overflow-y: auto;
} */
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
.uploadList {
  width: 100%;
}
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
.tableList {
  float: left;
}
.tableList li {
  width: 400px;
  height: 40px;
  border-top: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tableList:first-child li {
  width: 200px;
  border-left: 1px solid #e5e5e5;
}
.tableList li:last-child {
  border-bottom: 1px solid #e5e5e5;
}
.tableList li .el-input {
  width: 90%;
}
</style>
