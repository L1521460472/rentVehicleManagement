<template>
  <div id="checkContract">
    <div class="header scoped">
      <span>合同查看</span>
    </div>
    <div class="footer" v-if="international.title">
      <div class="footerTop">
        <div class="footerTitle">
          <span>合同信息</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item class="formItem" label="合同编号">
              <el-input disabled size="small" v-model="form.contractCode"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="租赁开始日">
              <el-input disabled size="small" v-model="form.rentStartDateStr"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="租赁到期日">
              <el-input disabled size="small" v-model="form.rentEndDateStr"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="一键呼叫电话">
              <el-input disabled size="small" v-model="form.urgentPhoneNumer"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="合同附件">
              <div v-if="form.fileInfoVOS[0]">
                <span
                  v-for="item in form.fileInfoVOS"
                  :key="item.id"
                  class="customerSource"
                  @click="downloadAction(item.efileAddr,item.efileName)"
                >{{item.efileName}}</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>客户信息</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item class="formItem" label="承租方">
              <el-input disabled size="small" v-model="form.customerName"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="承租方电话">
              <el-input disabled size="small" v-model="form.customerPhoneNumber"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="地址">
              <el-input disabled size="small" v-model="form.customerAdd"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="联系人">
              <el-input disabled size="small" v-model="form.customerContacts"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="联系人手机号">
              <el-input disabled size="small" v-model="form.contactsPhoneNumber"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>车辆信息</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item class="formItem" label="车辆数">
              <el-input disabled size="small" v-model="form.vehicleNum"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="充电桩数">
              <el-input disabled size="small" v-model="form.chargingPileNum"></el-input>
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
              <el-table-column label="车牌号">
                <template slot-scope="scope">
                  <el-select size="small" v-model="scope.row.vehicleNo" placeholder disabled>
                    <!-- <el-option
                      v-for="item in scope.row.vehicleBrandList"
                      :key="item.id"
                      :label="item.brandName"
                      :value="item.id"
                    ></el-option>-->
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="颜色" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.vehicleColorName" disabled size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="车型" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.vehicleTypeName" disabled size="small"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <p class="checkDetail">
            <el-button type="primary" size="small" @click="checkContractDetail">点击查看合同详情</el-button>
          </p>
        </div>
        <div class="footerTitle paymentRecords">
          <span>回款计划—缴费记录</span>
        </div>
        <div class="footerNav">
          <el-table
            class="paymentRecord"
            border
            stripe
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            :data="tableData2"
            show-summary
            :summary-method="getSum"
            style="width: 100%; height: 100%;"
          >
            <el-table-column
              prop="collectionCode"
              width="100"
              label="缴费记录编号"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="auditStatusStr"
              width="100"
              label="审核状态"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="payTypeStr"
              width="100"
              label="缴费渠道"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="payUserName"
              width="100"
              label="提交账号"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="rentTimeStr"
              width="100"
              label="缴费时间"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="paymentAccount"
              width="160"
              label="收款账户"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="efileInfoVOS"
              width="100"
              label="附件"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span class="lookFile" @click="lookFeilAction(scope.row.efileIdCode)">查看附件</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" width="100" label="备注" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column
              prop="vehicleNo"
              width="160"
              label="关联车牌号"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="rentMoney"
              width="100"
              label="缴费金额"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="preCollectMoney"
              width="100"
              label="预收款"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="writeOffMoney"
              min-width="100"
              label="已核销金额"
              :show-overflow-tooltip="true"
            ></el-table-column>
          </el-table>
          <p class="checkDetail">
            <el-button type="primary" size="small" @click="goPayFee">缴费提交</el-button>
          </p>
        </div>
        <div class="footerTitle paymentRecords">
          <span>回款计划—执行表</span>
        </div>
        <div class="footerNav">
          <el-tabs tab-position="left" type="border-card" style="height: 500px;">
            <el-tab-pane label="汇总">
              <el-table
                class="table2"
                border
                stripe
                :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                size="small"
                :data="tableData3"
                height="470"
                show-summary
                :span-method="objectSpanMethod"
                :summary-method="getSum2"
                style="width: 100%;height:100%"
              >
                <el-table-column
                  prop="billPeriods"
                  width="50"
                  label="期数"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="adjustedPaybackDateStr"
                  width="80"
                  label="回款日"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="adjustedPaybackMoney"
                  width="90"
                  label="应收金额"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="remark"
                  width="90"
                  label="备注信息"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="collectionStatusStr"
                  width="100"
                  label="当期收款状态"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="lateFee"
                  width="80"
                  label="滞纳金"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="overdueDays"
                  width="70"
                  label="超期天数"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="uncollectionMoney"
                  width="85"
                  label="未回款金额"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="writeOffMoney"
                  width="85"
                  label="已核销金额"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="rentTimeStr"
                  width="80"
                  label="核销时间"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column prop="collectionCode" label="对应缴费记录" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-for="(item,index) in vehicleMap" :key="index" :label="item[0].vehicleNo">
              <el-table
                class="table2"
                border
                stripe
                :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                size="small"
                :data="vehicleMap[index]"
                height="470"
                style="width: 100%;height:100%"
                show-summary
                :span-method="objectSpanMethod"
                :summary-method="getSum2"
              >
                <el-table-column
                  prop="billPeriods"
                  width="50"
                  label="期数"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="adjustedPaybackDateStr"
                  width="80"
                  label="回款日"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column 
                  prop="adjustedPaybackMoney"
                  width="90" 
                  label="应收金额" 
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="remark"
                  width="90"
                  label="备注信息"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="collectionStatusStr"
                  width="100"
                  label="当期收款状态"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="lateFee"
                  width="80"
                  label="滞纳金"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="overdueDays"
                  width="70"
                  label="超期天数"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="uncollectionMoney"
                  width="85"
                  label="未回款金额"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="writeOffMoney"
                  width="85"
                  label="已核销金额"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="rentTimeStr"
                  width="80"
                  label="核销时间"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column prop="collectionCode" label="对应缴费记录" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </el-tab-pane> 
          </el-tabs>
        </div> 
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
        <el-button type="primary" size="small" @click="cancel" class="back">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { checkContractData,getImgsrcList } from "../../../api/businessProcess/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
  formatJE,
  download,
} from "../../../public";
export default {
  name: "checkContract",
  data() {
    return {
      form: {
        contractCode: "", //合同编号
        rentStartDateStr: "", //租赁开始日期
        rentEndDateStr: "", //租赁到期日期
        fileInfoVOS: [], //合同附件信息
        customerName: "", //承租方
        customerPhoneNumber: "", //承租方电话
        customerAdd: "", //地址
        customerContacts: "", //承租方联系人
        contactsPhoneNumber: "", //承租方联系人电话
        urgentPhoneNumer: "",
        vehicleNum: "", //车辆数
        chargingPileNum: "", //充电桩数
        contractStatus: "", //合同状态
        paymentAuditStatusNum: "", //待审核记录数量
      }, //新增数据
      tableData: [], //车辆信息
      tableData2: [], //缴费记录
      tableData3: [], //回款计划执行表汇总
      vehicleMap: {}, //回款计划执行表车辆表
      imageUrlList: [],
      dialogVisible: false,
      international: {},
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    // 返回
    cancel() {
      this.$router.back();
    },
    // 下载合同附件
    downloadAction(url, fileName) {
      download(url, fileName);
    },

    // 跳转缴费提交
    goPayFee() {
      if (this.form.contractStatus == 0 || this.form.contractStatus == 4) {
        this.$message.warning({
          message: "该合同状态下不能进行缴费提交操作",
          center: true,
        });
        return;
      }
      if (this.form.paymentAuditStatusNum > 0) {
        this.$message.warning({
          message: "缴费状态为待审核，不能进行缴费提交操作",
          center: true,
        });
        return;
      }
      this.$router.push({
        path: "/payFee",
        query: { id: this.$route.query.id },
      });
    },
    // 查看合同详情
    checkContractDetail() {
      this.$router.push({
        path: "/planLook",
        query: { form: "look", id: this.$route.query.id },
      });
    },
    // 查看附件
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
    // 表格合计
    getSum(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        //calcProp 为需要计算的列的prop值的集合
        const calcProp = ["rentMoney", "preCollectMoney", "writeOffMoney"];
        if (calcProp.includes(column.property)) {
          const values = data.map((item) => Number(item[column.property]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return (prev * 1000 + curr * 1000) / 1000;
            } else {
              return (prev * 1000) / 1000;
            }
          }, 0);
        }
      });
      for (let i = 0; i < sums.length; i++) {
        if (i === 0) {
          continue;
        }
        sums[i] = formatJE(sums[i]);
      }
      return sums;
    },
    getSum2(param) {
      const { columns, data } = param;
      const sums = [];
      for(let i = 0;i<data.length;i++){
        if(i !== 0){
          if(data[i].billPeriods  === data[i-1].billPeriods){
            data[i].adjustedPaybackMoney = 0
            data[i].lateFee = 0
            data[i].uncollectionMoney = 0
          }
        }
      }
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        //calcProp 为需要计算的列的prop值的集合
        const calcProp = [
          "adjustedPaybackMoney",
          "lateFee",
          "uncollectionMoney",
          "writeOffMoney",
        ];
        if (calcProp.includes(column.property)) {
          const values = data.map((item) => Number(item[column.property]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return (prev * 1000 + curr * 1000) / 1000;
            } else {
              return (prev * 1000) / 1000;
            }
          }, 0);
        }
      });
      for (let i = 0; i < sums.length; i++) {
        if (i === 0) {
          continue;
        }
        sums[i] = formatJE(sums[i]);
      }
      return sums;
    },
    // 处理表格数据用于合并
    mergeTableRow(data) {
      let arr = [];
      let spanNum = 0;
      for(let i = 0;i < data.length;i++){
        let house_info  = data[i].rentCollectionExecuteTableInfoVO;
        if(house_info.length > 0){
          for(let j =  0;j < house_info.length;j++){
            let info ={
              span_num: j == 0 ? house_info.length : 0,
              writeOffMoney: house_info[j].writeOffMoney,
              rentTimeStr: house_info[j].rentTimeStr,
              collectionCode: house_info[j].collectionCode,
              billPeriods: data[i].billPeriods===0 ? '押金':data[i].billPeriods,
              adjustedPaybackDateStr: data[i].adjustedPaybackDateStr,
              adjustedPaybackMoney: data[i].adjustedPaybackMoney,
              remark: data[i].remark,
              collectionStatusStr: data[i].collectionStatusStr,
              lateFee: data[i].lateFee,
              overdueDays: data[i].overdueDays,
              uncollectionMoney: data[i].uncollectionMoney,
              vehicleNo: data[i].vehicleNo ? data[i].vehicleNo : "汇总",
            }
            arr.push(info)
          }
        }else{
          let info2 = {
            span_num: 1,
            writeOffMoney: data[i].writeOffMoney,
            rentTimeStr: data[i].rentTimeStr,
            collectionCode: data[i].collectionCode,
            billPeriods: data[i].billPeriods===0 ? '押金':data[i].billPeriods,
            adjustedPaybackDateStr: data[i].adjustedPaybackDateStr,
            adjustedPaybackMoney: data[i].adjustedPaybackMoney,
            remark: data[i].remark,
            collectionStatusStr: data[i].collectionStatusStr,
            collectionStatusStr: data[i].collectionStatusStr,
            lateFee: data[i].lateFee,
            overdueDays: data[i].overdueDays,
            uncollectionMoney: data[i].uncollectionMoney,
            vehicleNo: data[i].vehicleNo ? data[i].vehicleNo : "汇总",
          }
          arr.push(info2)
        }
      }
      return arr
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(columnIndex < 8){
        if(row.span_num > 0){
          return{
            rowspan:row.span_num,
            colspan:1
          }
        }else{
          return [0, 0];
        }
      }
    },
  },
  mounted() {
    checkContractData({ id: this.$route.query.id }, this.headers)
      .then((res) => {
        if (res.status == 0) {
          this.form.contractCode = res.data.contractCode, //合同编号
          this.form.rentStartDateStr = res.data.rentStartDateStr, //租赁开始日期
          this.form.rentEndDateStr = res.data.rentEndDateStr, //租赁到期日期
          this.form.fileInfoVOS = res.data.fileInfoVOS ? res.data.fileInfoVOS : [], //合同附件信息
          this.form.customerName = res.data.customerName, //承租方
          this.form.customerPhoneNumber = res.data.customerPhoneNumber, //承租方电话
          this.form.customerAdd = res.data.customerAdd, //地址
          this.form.customerContacts = res.data.customerContacts, //承租方联系人
          this.form.contactsPhoneNumber = res.data.contactsPhoneNumber; //承租方联系人电话
          this.form.urgentPhoneNumer = res.data.urgentPhoneNumer; //一键呼叫电话
          this.form.vehicleNum = res.data.vehicleNum, //车辆数
          this.form.chargingPileNum = res.data.chargingPileNum, //充电桩数
          this.tableData = res.data.leaseContractVehicleInfoVOList; //车辆数据
          this.form.contractStatus = res.data.contractStatus, //合同状态
          this.form.paymentAuditStatusNum = res.data.paymentAuditStatusNum, //待审核记录数量
          this.tableData2 = res.data.contractPayCostRecordVOList || [];
          this.tableData3 = res.data.leaseContractExecuteTableVO ? res.data.leaseContractExecuteTableVO.aggregation: [];
          this.vehicleMap = res.data.leaseContractExecuteTableVO ? res.data.leaseContractExecuteTableVO.vehicleMap : [];
          this.tableData3 = this.mergeTableRow(this.tableData3);
          for (var i in this.vehicleMap) {
            this.vehicleMap[i] = this.mergeTableRow(this.vehicleMap[i]).slice(0);
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
#checkContract {
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
.carInfo {
  display: flex;
  justify-content: space-between;
}
.detail {
  margin-right: 10px;
}
.paymentRecords {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
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
  padding-left: 46%;
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
.customerSource {
  color: #368cfe;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  padding: 0 10px;
}
.back {
  width: 80px;
  background-color: #409eff;
  color: #fff;
}
.table >>> .el-input {
  width: 100%;
}
.lookFile {
  color: #0000ff;
  cursor: pointer;
}
.checkDetail {
  text-align: center;
}
#checkContract >>> .el-table {
  overflow-x: auto;
}
#checkContract >>> .el-table__header-wrapper,
.el-table__body-wrapper,
.el-table__footer-wrapper {
  overflow: visible;
}
#checkContract >>> .el-table__footer-wrapper,
.el-table__header-wrapper {
  overflow: initial;
}
#checkContract >>> .el-table::after {
  position: relative;
}
#checkContract >>> .el-table--scrollable-x .el-table__body-wrapper {
  overflow: visible;
}
#checkContract >>> .el-dialog__body {
  padding: 0;
}
#checkContract >>> .el-dialog__header {
  padding: 0;
}
#checkContract >>> .el-dialog__headerbtn {
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#checkContract >>> .el-dialog__close {
  color: #fff;
}
#checkContract >>> .el-carousel__button {
  width: 12px;
}
.imgList {
  width: 100%;
  height: 400px;
  display: block;
}
</style>
