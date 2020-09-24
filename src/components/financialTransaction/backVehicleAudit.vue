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
        <el-form ref="formContract" :model="formContract" label-width="130px">
          <div class="formNav formNavs">
            <el-form-item label="合同编号">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.contractCode"
              ></el-input>
            </el-form-item>
            <el-form-item label="租赁开始日">
              <el-date-picker
                v-model="formContract.rentStartDateStr"
                type="date"
                size="small"
                disabled
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="租赁到期日">
              <el-date-picker
                v-model="formContract.rentEndDateStr"
                type="date"
                size="small"
                disabled
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="一键呼叫电话">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.urgentPhoneNumer"
              ></el-input>
            </el-form-item>
            <el-form-item label="合同附件" class="uploadList">
              <div v-if="fileList">
                <span
                  v-for="item in fileList"
                  :key="item.id"
                  class="customerSource"
                  @click="downloadAction(item.efileAddr,item.name)"
                >{{item.name}}</span>
              </div>

              <!-- <el-upload
                class="upload"
                disabled
                action="/vehicle-service/efileInfo/uploadLeaseContractFile?fileType=8"
                :headers="headers"
                :file-list="fileList"
              >
                <span class="upload_txt">上传</span>
              </el-upload>-->
            </el-form-item>
            <div class="footerTitle">
              <span>客户信息</span>
            </div>
            <el-form-item label="承租方">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.customerName"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.customerPhoneNumber"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.customerContacts"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.contactsPhoneNumber"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.customerAdd"
              ></el-input>
            </el-form-item>
            <div class="footerTitle">
              <span>车辆信息</span>
            </div>
            <el-form-item label="车辆数">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.vehicleNum"
              ></el-input>
              <!-- <el-button type="primary" disabled size="small">增加</el-button> -->
            </el-form-item>
            <el-form-item label="充电桩数">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.chargingPileNum"
              ></el-input>
            </el-form-item>

            <el-table class="vehicleData" :data="formContract.vehicleList">
              <el-table-column prop="name" label="车牌号">
                <template slot-scope="scope">
                  <el-select
                    v-model="formContract.vehicleList[scope.$index].vehicleNo"
                    size="small"
                    disabled
                    filterable
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
                    v-model="formContract.vehicleList[scope.$index].vehicleColorName"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="车型">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    disabled
                    v-model="formContract.vehicleList[scope.$index].vehicleTypeName"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="充电桩数">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    disabled
                    v-model="formContract.vehicleList[scope.$index].chargingPileNum"
                    onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="value" label="实际提车日期">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    disabled
                    v-model="formContract.vehicleList[scope.$index].startDate"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="应退车日期">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    disabled
                    v-model="formContract.vehicleList[scope.$index].endDate1"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="实退车日期">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    disabled
                    v-model="formContract.vehicleList[scope.$index].endDate2"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>-->
              <!-- <el-table-column width="60">
                <template slot-scope="scope">
                  <el-button size="small" disabled>删除</el-button>
                </template>
              </el-table-column>-->
            </el-table>
            <el-form-item class="cctv">
              <el-button type="primary" size="small" @click="handleClick">点击查看合同详情</el-button>
            </el-form-item>
            <div class="footerTitle">
              <span>缴费记录</span>
              <!-- <el-button size="small" type="primary" @click="handlePay">预收款核销</el-button> -->
            </div>
            <div class="cctvTable">
              <el-table
                class="vehicleData"
                border
                stripe
                :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                size="small"
                show-summary
                :summary-method="getSum"
                :span-method="objectSpanMethod2"
                :data="vehicleDataList"
              >
                <el-table-column prop="billPeriods" width="80" label="合同期数" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="collectionCode" width="150" label="缴费记录编号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="auditStatusStr" width="100" label="审核状态" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="payTypeStr" width="100" label="缴费渠道" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="payUserName" width="100" label="提交账号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="rentTimeStr" width="100" label="缴费时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="paymentAccount" width="120" label="收款账户" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="efileIdCode" width="100" label="附件">
                  <template slot-scope="scope">
                    <span class="lookFile" @click="lookFeilAction(scope.row.efileIdCode)">查看附件</span>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" width="100" label="备注" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="vehicleNo" width="150"  label="关联车牌号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="rentMoney" width="100" label="缴费金额" ></el-table-column>
                <el-table-column prop="preCollectMoney" width="100" label="预收款"></el-table-column>
                <el-table-column prop="writeOffMoney" min-width="100" label="已核销金额"></el-table-column>
              </el-table>
            </div>
            <div class="footerTitle">
              <span>回款记录-执行表</span>
            </div>
            <el-form-item class="cctv1">
              <el-tabs :tab-position="tabPosition" type="border-card" style="height: 500px;">
                <el-tab-pane label="汇总">
                  <el-table
                    :data="formContract.leaseContractGenerateTableVO.aggregation"
                    :span-method="objectSpanMethod"
                    border
                    stripe
                    :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                    show-summary
                    :summary-method="getSum2"
                    size="small"
                    height="470"
                    style="width: 100%;"
                  >
                    <el-table-column prop="billPeriods" label="期数" width="50"></el-table-column>
                    <el-table-column prop="adjustedPaybackDateStr" label="回款日" width="100" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="adjustedPaybackMoney" label="应收金额" width="80"></el-table-column>
                    <el-table-column prop="remark" label="备注信息" width="120" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="collectionStatusStr" label="当期收款状态" width="100"></el-table-column>
                    <el-table-column prop="lateFee" label="滞纳金" width="80"></el-table-column>
                    <el-table-column prop="overdueDays" label="超期天数" width="80"></el-table-column>
                    <el-table-column prop="uncollectionMoney" label="未回款金额" width="90"></el-table-column>
                    <el-table-column prop="writeOffMoney" label="已核销金额" width="90"></el-table-column>
                    <el-table-column prop="rentTimeStr" label="核销时间" width="90" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="collectionCode" label="对应缴费记录" min-width="140" :show-overflow-tooltip="true"></el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane
                  v-for="(item,index) in formContract.leaseContractGenerateTableVO.vehicleMap"
                  :label="formContract.leaseContractGenerateTableVO.vehicleMap[index][0].vehicleNo"
                  :key="index"
                >
                  <el-table
                    :data="formContract.leaseContractGenerateTableVO.vehicleMap[index]"
                    :span-method="objectSpanMethod"
                    border
                    stripe
                    :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                    show-summary
                    :summary-method="getSum2"
                    size="small"
                    height="470"
                    style="width: 100%;"
                  >
                    <el-table-column prop="billPeriods" label="期数" width="50"></el-table-column>
                    <el-table-column prop="adjustedPaybackDateStr" label="回款日" width="100" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="adjustedPaybackMoney" label="应收金额" width="80"></el-table-column>
                    <el-table-column prop="remark" label="备注信息" width="120" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="collectionStatusStr" label="当期收款状态" width="100"></el-table-column>
                    <el-table-column prop="lateFee" label="滞纳金" width="80"></el-table-column>
                    <el-table-column prop="overdueDays" label="超期天数" width="80"></el-table-column>
                    <el-table-column prop="uncollectionMoney" label="未回款金额" width="90"></el-table-column>
                    <el-table-column prop="writeOffMoney" label="已核销金额" width="90"></el-table-column>
                    <el-table-column prop="rentTimeStr" label="核销时间" width="90" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="collectionCode" label="对应缴费记录" min-width="140" :show-overflow-tooltip="true"></el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-form-item>
          </div>
        </el-form>
        <el-form ref="formBackVehicle" :model="formBackVehicle" label-width="130px">
          <div class="footerTitle">
            <span>退车单信息</span>
          </div>
          <div class="formNav formNew">
            <el-form-item>
              <div class="tableList">
                <li>结算项目</li>
                <li>已交押金</li>
                <li>欠租金</li>
                <li>滞纳金</li>
                <li>违约赔偿金</li>
                <li>违章扣除</li>
                <li>出险保费上浮</li>
                <li>车损外观</li>
                <li>证件补办</li>
                <li>其他款项</li>
                <li>结算余款</li>
              </div>
              <div class="tableList">
                <li>金额</li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.contractDeposit"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.oweRent"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.lateFee"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.damages"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.regulationsDeduction"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.comeUpMoney"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.vehicleDamageDeduction"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.certifiReplaceMoney"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.\\-]/g,'');"
                    v-model="formBackVehicle.otherDeduction"
                    @change="changeVehicleRent"
                  ></el-input>
                </li>
                <li>
                  <el-input
                    type="text"
                    disabled
                    size="mini"
                    onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    v-model="formBackVehicle.backOffMoney"
                  ></el-input>
                </li>
              </div>
              <div class="tableList">
                <li>备注</li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value11"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value12"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value13"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value14"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value15"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value16"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value17"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value18"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value19"></el-input>
                </li>
                <li>
                  <el-input type="text" disabled size="mini" v-model="value20"></el-input>
                </li>
              </div>
            </el-form-item>
            <el-form-item
              label="退车类型"
              prop="backOffType"
              :rules="[{required: true,message: '内容不能为空',trigger: 'blur',},]"
            >
              <el-select
                v-model="formBackVehicle.backOffType"
                size="small"
                disabled
                filterable
                placeholder
              >
                <el-option
                  v-for="item in backVehicleTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="退车日期"
              prop="backOffDate"
              :rules="[{required: true,message: '内容不能为空',trigger: 'blur',},]"
            >
              <el-date-picker
                v-model="formBackVehicle.backOffDate"
                type="date"
                size="small"
                disabled
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="押金退款日"
              prop="backOffMoneyDate"
              :rules="[{required: true,message: '内容不能为空',trigger: 'blur',},]"
            >
              <el-date-picker
                v-model="formBackVehicle.backOffMoneyDate"
                type="date"
                size="small"
                disabled
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="合同附件" class="uploadList">
              <div v-if="fileList1">
                <span
                  v-for="item in fileList1"
                  :key="item.id"
                  class="customerSource"
                  @click="downloadAction(item.efileAddr,item.name)"
                >{{item.name}}</span>
              </div>

              <!-- <el-upload
                class="upload"
                disabled
                action="/vehicle-service/efileInfo/uploadLeaseContractFile?fileType=8"
                :headers="headers"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :file-list="fileList1"
                :limit="5"
                multiple
              >
                <span class="upload_txt">上传</span>
              </el-upload>-->
            </el-form-item>
          </div>
        </el-form>
        <div class="footerTitle">
          <span>审核信息</span>
        </div>
        <div class="formNav">
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item label="审核结果">
              <el-radio v-model="form.status" :label="0">通过</el-radio>
              <el-radio v-model="form.status" :label="1">拒绝</el-radio>
            </el-form-item>
            <el-form-item
              label="审核意见"
              prop="auditSuggestion"
              :rules="[{required: true,message: '内容不能为空',trigger: 'blur',},]"
            >
              <el-input
                maxlength="500"
                style="width:800px"
                placeholder="请输入审核意见"
                type="textarea"
                :rows="5"
                size="small"
                v-model="form.auditSuggestion"
              ></el-input>
            </el-form-item>
          </el-form>
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
  download,
} from "../../public";
export default {
  name: "backVehicleAudit",
  data() {
    return {
      formContract: {
        id: null,
        //合同信息
        contractCode: null, //合同编号
        rentStartDateStr: null, //起租日期
        rentEndDateStr: null, //止租日期
        urgentPhoneNumer: null, //紧急联系电话
        efileIdList: [], //合同附件id
        supplefileIdList: [], //合同补充附件Id集合

        //客户信息
        customerName: null, //承租方名称
        customerPhoneNumber: null, //承租方电话
        customerContacts: null, //承租方联系人
        contactsPhoneNumber: null, //承租方联系人电话
        customerAdd: null, //承租方地址

        //车辆信息
        vehicleNum: 1, //租车数量
        chargingPileNum: null, //充电桩数量
        vehicleList: [
          {
            vehicleId: null,
            vehicleNo: null,
            vehicleColor: null,
            vehicleType: null,
            chargingPileNum: null,
            startDate: null,
            endDate1: null,
            endDate2: null,
          },
        ], //合同车辆关联

        //押金信息
        vehicleDeposit: null, //单车押金
        chargingPileDeposit: null, //单桩押金
        deposit: null, //合同总押金

        //租金计划
        onevehicleRent: null, //单车租金
        onechargingPileRent: null, //单桩租金
        vehicleRent: null, //合同月租金
        rentMonths: null, //租赁月数
        payRentDateStr: null, //首次还款日期
        lateFeeRate: null, //逾期滞纳金收取标准

        leaseContractGenerateTableVO: {
          aggregation: [], //汇总的
          vehicleMap: {}, //每辆车的
        },
      },
      form: {
        id: "",
        status: 0,
        auditSuggestion: "",
      },
      formBackVehicle: {
        contractId: null,
        contractDeposit: "", //已交押金金额
        oweRent: "", //欠租金金额
        lateFee: "", //滞纳金金额
        damages: "", //违约赔偿金金额
        regulationsDeduction: "", //违章扣除金额
        comeUpMoney: "", //出险保费上浮金额
        vehicleDamageDeduction: "", //车损外观金额
        certifiReplaceMoney: "", //证件补办金额
        otherDeduction: "", //其他款项金额
        backOffMoney: "", //结算余款金额

        remakeList: [],

        backOffType: "", //退车类型
        backOffDate: "", //退车日期
        backOffMoneyDate: "", //押金退款日
        fileIdList: [], //附件ID
      },
      vehicleDataList: [], //缴费记录
      item: [], //序号
      value11: "", //已交押金备注
      value12: "", //欠租金备注
      value13: "", //滞纳金备注
      value14: "", //违约赔偿金备注
      value15: "", //违章扣除备注
      value16: "", //出险保费上浮备注
      value17: "", //车损外观备注
      value18: "", //证件补办备注
      value19: "", //其他款项备注
      value20: "", //结算余款备注
      personWorkload: [], //名字
      backVehicleTypeOptions: [
        {
          value: 0,
          label: "正常退车",
        },
        {
          value: 1,
          label: "异常收车",
        },
      ], //退车类型
      manageArr: [], //要合并的数组
      managePos: 0, //要合并数组的序号
      tabPosition: "left",
      showMsg: "退车结算审核",
      dialogVisible: false,
      imageUrlList: [],
      value: "",
      vehicleTypeId: null, //车型ID
      orderValue: null, //订单编号
      brandOptions: [], //车辆品牌
      vehicleTypeOptions: [], //车型
      userTypeOptions: [], //客户类型
      vehicleNoOptions: [], //车牌号
      fileList: [], //合同附件
      fileList1: [], //合同补充附件
      imgIdList: [], //图片id
      tableData: [],
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    confirm() {
      //确定
      this.form.id = this.$route.query.id;
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios({
            method: "post",
            url: "/vehicle-service/backOffVehicleInfo/auditReturnCarSettlement", //+this.vehicleTypeId
            headers: this.headers,
            data: this.form,
          })
            .then((result) => {
              // console.log(result.data);
              this.$store.commit("changeIsStatus", true);
              if (result.data.status === 0) {
                this.$message({
                  type: "success",
                  message: "审核成功",
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
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // console.log(this.form.efileIdCode)
      //   var newArr = this.form.efileIdCode.split(",");
      //   var index = newArr.indexOf(file.response ? file.response.data.id:file.id);
      //   this.form.efileIdCode = newArr.splice(index,1).join(",");
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      //   console.log(response, file, fileList);
      this.formBackVehicle.fileIdList.push(response.data.id);
      this.fileList1.map((res) => {
        this.formBackVehicle.fileIdList.push(res.id);
      });
    },
    handleError() {
      this.$error("上传失败,请重新上传图片!");
    },
    handleBeforeUpload(file) {
      const isImage = file.type.includes("image");
      if (isImage) {
        this.$message.error("上传文件类型不能是图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 20MB!");
      }
      return isImage && isLt2M;
    },
    objectSpanMethod2({ row, column, rowIndex, columnIndex }) {
      //   console.log(row, column, rowIndex, columnIndex);
      const span = column["property"] + "-span";
      if (row[span]) {
        return row[span];
      }
    },
    // 处理表格数据用于合并
    mergeTableRow(data) {
      let arr = [];
      let spanNum = 0;
      for (let i = 0; i < data.length; i++) {
        let house_info = data[i].rentCollectionExecuteTableInfoVO;
        if (house_info.length > 0) {
          for (let j = 0; j < house_info.length; j++) {
            let info = {
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
            };
            arr.push(info);
          }
        } else {
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
          };
          arr.push(info2);
        }
      }
      return arr;
    },
    // 表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 8) {
        if (row.span_num > 0) {
          return {
            rowspan: row.span_num,
            colspan: 1,
          };
        } else {
          return [0, 0];
        }
      }
    },

    handleClick() {
      //查看订单详情
      this.$router.push({
        path: "/planLook",
        query: { form: "look", id: this.$route.query.id },
      });
    },
    handlePay() {
      //预收款核销
      // this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/advancesReceived",
        query: { form: "edit" },
      });
    },
    changeVehicleRent() {
      //计算结算余额
      this.formBackVehicle.backOffMoney =
        Number(this.formBackVehicle.contractDeposit) +
        Number(this.formBackVehicle.oweRent) +
        Number(this.formBackVehicle.lateFee) +
        Number(this.formBackVehicle.damages) +
        Number(this.formBackVehicle.regulationsDeduction) +
        Number(this.formBackVehicle.certifiReplaceMoney) +
        Number(this.formBackVehicle.vehicleDamageDeduction) +
        Number(this.formBackVehicle.comeUpMoney) +
        Number(this.formBackVehicle.otherDeduction);
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
    // 下载附件
    downloadAction(url, fileName) {
      download(url, fileName);
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
    getInitData() {
      //跳转退车结算审核
      axios({
        method: "get",
        url:
          "/vehicle-service/backOffVehicleInfo/goReturnCarSettlementAudit?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.vehicleTypeId =
              result.data.data.leaseContractRentRecordVO.vehicleTypeId;
            this.getVehicle();

            this.formContract.contractCode =
              result.data.data.leaseContractRentRecordVO.contractCode; //合同编号
            this.formContract.rentStartDateStr =
              result.data.data.leaseContractRentRecordVO.rentStartDateStr; //起租日期
            this.formContract.rentEndDateStr =
              result.data.data.leaseContractRentRecordVO.rentEndDateStr; //止租日期
            this.formContract.urgentPhoneNumer =
              result.data.data.leaseContractRentRecordVO.urgentPhoneNumer; //紧急联系电话
            this.formContract.efileIdList =
              result.data.data.leaseContractRentRecordVO.efileIdList; //合同附件
            this.fileList =
              result.data.data.leaseContractRentRecordVO.fileInfoVOS;
            this.fileList = JSON.parse(
              JSON.stringify(this.fileList).replace(/efileName/g, "name")
            );

            this.formContract.customerName =
              result.data.data.leaseContractRentRecordVO.customerName; //承租方名称
            this.formContract.customerPhoneNumber =
              result.data.data.leaseContractRentRecordVO.customerPhoneNumber; //承租方电话
            this.formContract.customerContacts =
              result.data.data.leaseContractRentRecordVO.customerContacts; //承租方联系人
            this.formContract.contactsPhoneNumber =
              result.data.data.leaseContractRentRecordVO.contactsPhoneNumber; //承租方联系人电话
            this.formContract.customerAdd =
              result.data.data.leaseContractRentRecordVO.customerAdd; //承租方地址

            this.formContract.vehicleNum =
              result.data.data.leaseContractRentRecordVO.vehicleNum; //租车数量
            this.formContract.chargingPileNum =
              result.data.data.leaseContractRentRecordVO.chargingPileNum; //充电桩数量
            this.formContract.vehicleList =
              result.data.data.leaseContractRentRecordVO.leaseContractVehicleInfoVOList; //合同车辆关联

            this.vehicleDataList =
              result.data.data.leaseContractRentRecordVO.contractPayCostRecordVOList; //缴费记录

            this.formContract.leaseContractGenerateTableVO =
              result.data.data.leaseContractRentRecordVO.leaseContractExecuteTableVO;

            this.formBackVehicle.contractDeposit =
              result.data.data.contractDeposit;
            this.formBackVehicle.lateFee = result.data.data.lateFee;
            this.formBackVehicle.backOffMoney = result.data.data.backOffMoney;
            this.formBackVehicle.contractId = result.data.data.contractId;
            this.formBackVehicle.oweRent = result.data.data.oweRent; //欠租金金额
            this.formBackVehicle.damages = result.data.data.damages; //违约赔偿金金额
            this.formBackVehicle.regulationsDeduction =
              result.data.data.regulationsDeduction; //违章扣除金额
            this.formBackVehicle.comeUpMoney = result.data.data.comeUpMoney; //出险保费上浮金额
            this.formBackVehicle.vehicleDamageDeduction =
              result.data.data.vehicleDamageDeduction; //车损外观金额
            this.formBackVehicle.certifiReplaceMoney =
              result.data.data.certifiReplaceMoney; //证件补办金额
            this.formBackVehicle.otherDeduction =
              result.data.data.otherDeduction; //其他款项金额

            // remakeList:[],
            this.value11 = result.data.data.remakeList[0]; //已交押金备注
            this.value12 = result.data.data.remakeList[1]; //欠租金备注
            this.value13 = result.data.data.remakeList[2]; //滞纳金备注
            this.value14 = result.data.data.remakeList[3]; //违约赔偿金备注
            this.value15 = result.data.data.remakeList[4]; //违章扣除备注
            this.value16 = result.data.data.remakeList[5]; //出险保费上浮备注
            this.value17 = result.data.data.remakeList[6]; //车损外观备注
            this.value18 = result.data.data.remakeList[7]; //证件补办备注
            this.value19 = result.data.data.remakeList[8]; //其他款项备注
            this.value20 = result.data.data.remakeList[9]; //结算余款备注

            this.formBackVehicle.backOffType = result.data.data.backOffType; //退车类型
            this.formBackVehicle.backOffDate = result.data.data.backOffDate; //退车日期
            this.formBackVehicle.backOffMoneyDate =
              result.data.data.backOffMoneyDate; //押金退款日
            this.fileList1 = result.data.data.fileList; //附件

            this.vehicleDataList = this.mergeTableRow2(this.vehicleDataList, [
              "billPeriods",
            ]);
            this.formContract.leaseContractGenerateTableVO.aggregation = this.mergeTableRow(
              this.formContract.leaseContractGenerateTableVO.aggregation
            );
            for (var i in this.formContract.leaseContractGenerateTableVO
              .vehicleMap) {
              this.formContract.leaseContractGenerateTableVO.vehicleMap[
                i
              ] = this.mergeTableRow(
                this.formContract.leaseContractGenerateTableVO.vehicleMap[i]
              ).slice(0);
            }
            this.fileList1 = JSON.parse(
              JSON.stringify(this.fileList1).replace(/efileName/g, "name")
            );
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
    mergeTableRow2(data, merge) {
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
              return (prev * 100 + curr * 100) / 100;
            } else {
              return (prev * 100) / 100;
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
      for (let i = 0; i < data.length; i++) {
        if (i !== 0) {
          if (data[i].billPeriods === data[i - 1].billPeriods) {
            data[i].adjustedPaybackMoney = 0;
            data[i].lateFee = 0;
            data[i].uncollectionMoney = 0;
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
              return (prev * 100 + curr * 100) / 100;
            } else {
              return (prev * 100) / 100;
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

    merage() {
      this.vehicleDataList = this.tableList; //每次过滤之前都要把筛选之前的tableData重置
      this.manageArr = []; //要合并的数组
      this.personWorkload = []; //名字
      this.item = []; //序号
      var count = 0; //相同的序号
      var perwl = 0; //个人合计
      for (var i = 0; i < this.vehicleDataList.length; i++) {
        if ((i = 0)) {
          //第一行必须存在
          this.manageArr.push(1);
          this.managePos = 0;
          this.item.push(1);
          perwl = parseFloat(this.vehicleDataList[i].id);
        } else {
          //判断当前元素与上一个元素是否相同，managePos是manageArr内容的序号
          if (this.vehicleDataList[i].id == this.vehicleDataList[i - 1].id) {
            this.manageArr[this.managePos] += 1;
            this.manageArr.push(0);
            perwl = parseFloat(this.vehicleDataList[i].id);
          } else {
            this.personWorkload.push(perwl); //当前值与上一个值不同，把上一个经理的累计耗时放入数组
            perwl = parseFloat(this.tableData[i].id); //累计值清0
            count++; //若不同则不需要合并行，cout+1。否则需要合并行，count不变
            this.manageArr.push(1);
            this.managePos = i;
          }
          this.item.push(count); //不管需不需要合并都存放在原数组长度
        }
        if (i == this.vehicleDataList.length - 1) {
          this.personWorkload.push(perwl);
        }
      }
      // splice从指定位置插入数组  索引，删除个数，插入值
      for (var j = 0; j < this, item.length; j++) {
        if (this.item[j] == this.item[j + 1]) {
          this.personWorkload.splice(j + 1, 0, this.personWorkload[j]);
        }
      }
    },
  },
  created() {

  },
  mounted() {
    this.getInitData();
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
.formNew .el-form-item:first-child {
  width: 100%;
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
.customerSource {
  color: #368cfe;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  padding: 0 10px;
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
