<template>
  <div id="header">
    <div class="header scoped">
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
                disabled
                v-model="scope.row.vehicleNo"
                size="small"
                filterable
                @change="handleChangevehicleNo(scope.$index, scope.row)"
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
              <el-button
                size="mini"
                @click="handleLook(scope.$index, scope.row)"
                >实时监控</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleBack(scope.$index, scope.row)"
                >轨迹回放</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="footerTitle">
          <span>车务数据</span>
        </div>
        <div class="operBtn">
          <el-button size="mini" ref="buttonFocus" @click="btnAction(1)">违章记录</el-button>
          <el-button size="mini" @click="btnAction(2)">维修记录</el-button>
          <el-button size="mini" @click="btnAction(3)">保养记录</el-button>
        </div>
        <el-tabs
          v-model="activeName"
          :tab-position="tabPosition"
          @tab-click="handleClick"
          type="border-card"
          style="height: 500px"
        > 
          <el-tab-pane label="汇总" name="first">
            <div class="tips" v-if="showType === 1">
               未处理违章 <span>{{statisticalInfo.pendingNum}} </span>次，费用<span> {{statisticalInfo.totalFine}} </span>元，扣分<span> {{statisticalInfo.totalScore}} </span>分
            </div>
            <div class="tips" v-else-if="showType === 2">
               累计维修 <span>{{statisticalInfo.services}} </span>次，费用<span> {{statisticalInfo.totalFee}} </span>元
            </div>
            <div class="tips" v-else>
               累计保养 <span>{{statisticalInfo.maintains}} </span>次，费用<span> {{statisticalInfo.totalFee}} </span>元
            </div>
            <el-table
              :data="dataList"
              border
              stripe
              :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
              size="small"
              height="470"
              style="width: 100%"
            >
              <el-table-column v-if="showType === 1" prop="vehicleNo"  label="车牌号码" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="contractCode" label="合同编号"  width="130"  :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="userName"  label="所属业务员"  width="90" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationTimeStr"  label="违章时间"  width="130"  :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationPlace"  label="违章地点"  width="130"  :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationType" label="违章类型" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationScore" label="扣分" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationFine" label="罚款" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="customerContacts" label="客户联系人" width="90" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violators" label="违章人" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="handlers" label="处理人" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationStatusStr" label="状态" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" label="处理凭证" min-width="80">
                <template slot-scope="scope">
                  <span class="lookFile" @click="lookFeilAction(scope.row)"
                    >查看附件</span
                  >
                </template>
              </el-table-column>

              <el-table-column v-if="showType === 2" prop="repairTime" label="维修日期" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="repairMileage" label="维修时里程（公里）" width="130"></el-table-column>
              <el-table-column v-if="showType === 2" prop="repairItemsDesc" label="维修项目" width="160" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="repairer"  label="修理厂" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="totalFee" label="费用合计（元）" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="payFee" label="实际支付费用（元）" width="130" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="createByStr" label="添加人"  width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="createdTime" label="添加时间" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="auditUserIdStr" label="核实人" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="auditTime" label="核实时间" min-width="140" show-overflow-tooltip></el-table-column>
              
              <el-table-column v-if="showType === 3" prop="maintainTime" label="保养时间" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="maintainMileage" label="保养时里程（km）" width="130" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="maintainItemsDesc" label="保养项目" width="160" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="repairer" label="修理厂" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="totalFee" label="费用合计（元）" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="payFee" label="实际支付费用（元）" width="130" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="nextMaintainTime" label="下次保养日期" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="nextMaintainMileage" label="下次保养里程（千米）" width="160" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="createByStr" label="添加人"  width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="createdTime" label="添加时间" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="auditUserIdStr" label="核实人"   width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="auditTime" label="核实时间" min-width="140" show-overflow-tooltip></el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane
            v-for="(item, index) in dataList1"
            :label="item.vehicleNo"
            :name="item.vehicleId.toString()"
            :key="dataList1[index].vehicleId"
          >
            <div class="tips" v-if="showType === 1">
               未处理违章 <span>{{statisticalInfo.pendingNum}} </span>次，费用<span> {{statisticalInfo.totalFine}} </span>元，扣分<span> {{statisticalInfo.totalScore}} </span>分
            </div>
            <div class="tips" v-else-if="showType === 2">
               累计维修 <span>{{statisticalInfo.services}} </span>次，费用<span> {{statisticalInfo.totalFee}} </span>元
            </div>
            <div class="tips" v-else>
               累计保养 <span>{{statisticalInfo.maintains}} </span>次，费用<span> {{statisticalInfo.totalFee}} </span>元
            </div>
            <el-table
              :data="dataList2"
              border
              size="small"
              height="470"
              style="width: 100%"
            >
              <el-table-column v-if="showType === 1" prop="vehicleNo" label="车牌号码" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="contractCode" label="合同编号" width="130" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="userName" label="所属业务员" width="90" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationTimeStr" label="违章时间" width="130" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationPlace" label="违章地点" width="130" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationType" label="违章类型" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationScore" label="扣分" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationFine" label="罚款" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="customerContacts" label="客户联系人" width="90" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violators" label="违章人" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="handlers" label="处理人" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" prop="violationStatusStr" label="状态" width="80" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column v-if="showType === 1" label="处理凭证" min-width="80">
                <template slot-scope="scope">
                  <span class="lookFile" @click="lookFeilAction(scope.row)"
                    >查看附件</span
                  >
                </template>
              </el-table-column>

              <el-table-column v-if="showType === 2" prop="repairTime" label="维修日期" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="repairMileage" label="维修时里程（公里）" width="130"></el-table-column>
              <el-table-column v-if="showType === 2" prop="repairItemsDesc" label="维修项目" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="repairer"  label="修理厂" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="totalFee" label="费用合计（元）" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="payFee" label="实际支付费用（元）" width="130" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="createByStr" label="添加人" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="createdTime" label="添加时间" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="auditUserIdStr" label="核实人" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 2" prop="auditTime" label="核实时间" width="140" show-overflow-tooltip></el-table-column>
              
              <el-table-column v-if="showType === 3" prop="maintainTime" label="保养时间" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="maintainMileage" label="保养时里程（km）" width="130" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="maintainItemsDesc" label="保养项目" width="160" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="repairer" label="修理厂" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="totalFee" label="费用合计（元）" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="payFee" label="实际支付费用（元）" width="130" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="nextMaintainTime" label="下次保养日期" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="nextMaintainMileage" label="下次保养里程（千米）" width="145" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="createByStr" label="添加人" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="createdTime" label="添加时间" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="auditUserIdStr" label="核实人" show-overflow-tooltip></el-table-column>
              <el-table-column v-if="showType === 3" prop="auditTime" label="核实时间" width="140" show-overflow-tooltip></el-table-column>

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
import {
  getCookie,
  dateToString,
  getMenuBtnList,
  formatJE,
} from "../../public";
export default {
  name: "lookVehicle",
  data() {
    return {
      showMsg: "查看合同车辆记录",
      data: [],
      form: {},
      showType:1,
      activeName:'first',
      statisticalInfo:{
        pendingNum :null,
        services :null,
        maintains :null,
        totalFine :null, 
        totalScore:null
      },
      dataList: [],
      dataList1: [],
      dataList2: [],
      vehicleNoOptions: [],
      tabPosition: "left",
      vehicleTypeId: "",
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      imageUrlList: [],
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    // 查询类型
    btnAction(type){
      if(type === 1){
        this.showType =1
        this.activeName='first'
        this.handleSearch(1)
      }else if(type === 2){
        this.showType =2
        this.activeName='first'
        this.handleSearch(2)
      }else{
        this.showType =3
        this.activeName='first'
        this.handleSearch(3)
      }
    },
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
              // console.log(result.data);
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
    handleLook(index, row) {
      //实时监控
      // console.log(row)
      this.$router.push({
        path: "/vehicleMonitoring",
        query: { form: "vehicleMonitoring", vehicleNo: row.vehicleNo },
      });
    },
    handleBack(index, row) {
      //轨迹回放
      // console.log(row)
      // this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/backLookVehicle",
        query: { form: "backLookVehicle", vehicleNo: row.vehicleNo },
      });
    },
    handleSearch(type) {
      //违章查询
      let detailUrl 
      if(type === 1){
        detailUrl = '/vehicle-service/rentCollectionInfo/recordsViolation'
      }else if(type === 2){
        detailUrl = '/vehicle-service/rentCollectionInfo/recordsService'
      }else{
        detailUrl = '/vehicle-service/rentCollectionInfo/recordsMaintenance'
      }
      axios({
        method: "post",
        url: detailUrl, //+this.vehicleTypeId
        headers: this.headers,
        data: {
          vehicleId:null,
          contractId: this.$route.query.id,
        },
      }).then((result) => {
        if (result.data.status === 0) {
          this.dataList = result.data.data.data;
          if(type === 1){
            this.statisticalInfo.pendingNum = result.data.data.pendingNum
            this.statisticalInfo.totalFine = result.data.data.totalFine
            this.statisticalInfo.totalScore = result.data.data.totalScore
          }else if(type === 2){
            this.statisticalInfo.services = result.data.data.services
            this.statisticalInfo.totalFee = result.data.data.totalFee
          }else{
            this.statisticalInfo.maintains = result.data.data.maintains
            this.statisticalInfo.totalFee = result.data.data.totalFee
          }
          // this.statisticalInfo.pendingNum = result.data.data.pendingNum
          // this.statisticalInfo.totalFine = result.data.data.totalFine
          // this.statisticalInfo.totalScore = result.data.data.totalScore
        } else {
          this.$message({
            message: result.data.message,
            center: true,
            type: "error",
          });
        }
      });
    },
    handleClick(targetName, action) {
      let detailUrl 
      if(this.showType === 1){
        detailUrl = '/vehicle-service/rentCollectionInfo/recordsViolation'
      }else if(this.showType === 2){
        detailUrl = '/vehicle-service/rentCollectionInfo/recordsService'
      }else{
        detailUrl = '/vehicle-service/rentCollectionInfo/recordsMaintenance'
      }
      axios({
        method: "post",
        url: detailUrl,
        headers: this.headers,
        data: {
          contractId: this.$route.query.id,
          vehicleId: targetName.label == "汇总" ? null : Number(targetName.name),
        },
      }).then((result) => {
        if (result.data.status === 0) {
          this.dataList2 = result.data.data.data;
          if(this.showType === 1){
            this.statisticalInfo.pendingNum = result.data.data.pendingNum
            this.statisticalInfo.totalFine = result.data.data.totalFine
            this.statisticalInfo.totalScore = result.data.data.totalScore
          }else if(this.showType === 2){
            this.statisticalInfo.services = result.data.data.services
            this.statisticalInfo.totalFee = result.data.data.totalFee
          }else{
            this.statisticalInfo.maintains = result.data.data.maintains
            this.statisticalInfo.totalFee = result.data.data.totalFee
          }
        } else {
          this.$message({
            message: result.data.message,
            center: true,
            type: "error",
          });
        }
      });
    },
    getVehicle() {
      //合同查询车辆
      axios({
        method: "get",
        url:
          "/vehicle-service/comboBoxController/contractSearchVehicle?vehicleTypeId=" +
          this.vehicleTypeId, //+,
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
    handleChangevehicleNo(index, row) {
      //获取车牌
      axios({
        method: "get",
        url:
          "/vehicle-service/comboBoxController/contractSearchVehicle?vehicleTypeId=" +
          this.vehicleTypeId +
          "&vehicleNo=" +
          row.vehicleNo, //+this.vehicleTypeId
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
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
      // console.log(row)
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
          // console.log(result.data);
          if (result.data.status === 0) {
              setTimeout(() => {
            window.onload()
          }, 10)
            this.data = result.data.data.leaseContractVehicleInfoVOList;
            this.dataList1 = result.data.data.leaseContractVehicleInfoVOList;
            this.vehicleTypeId =
              result.data.data.leaseContractVehicleInfoVOList[0].vehicleTypeId;
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
    this.handleSearch(1);
    this.$refs.buttonFocus.$el.focus()
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
  margin-bottom: 20px;
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
.operBtn {
  margin-left: 20px;
  margin-bottom: 20px;
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
.tips{
  font-size: 14px;
  color: #666;
  line-height: 40px;
}
.el-tabs--border-card>>>.el-tabs__content{
  padding: 0 15px 15px;
}
</style>
