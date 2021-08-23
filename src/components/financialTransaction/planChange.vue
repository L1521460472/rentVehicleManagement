<template>
  <div id="header">
    <div class="header scoped">
      <span>{{ showMsg }}</span>
    </div>
    <div class="footer">
      <div class="footerNav">
        <div class="footerTitle">
          <span>订单信息</span>
        </div>
        <div class="orderNum">
          <span>订单编号</span>
          <el-input class="formItem" size="small" disabled v-model="orderValue"></el-input>
        </div>
        <el-form ref="formVeInformation" :model="formVeInformation" label-width="130px">
          <div class="formNav formNavs">
            <el-form-item label="车辆品牌">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.brand"
              ></el-input>
            </el-form-item>
            <el-form-item label="车型">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.vehicleType"
              ></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.number"
              ></el-input>
            </el-form-item>
            <el-form-item label="租赁时长">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.duration"
              ></el-input>个月
            </el-form-item>
            <el-form-item label="客户类型">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.userType"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户名称">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.userName"
              ></el-input>
            </el-form-item>
            <el-form-item label="营业执照号">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.businessNO"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.contactsName"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.ipone"
              ></el-input>
            </el-form-item>
            <el-form-item label="分配业务员">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVeInformation.userid"
              ></el-input>
            </el-form-item>
            <el-form-item class="cctv">
              <el-button type="primary" size="small" disabled @click="handleClick">点击查看订单详情</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="footerTitle">
          <span>合同信息</span>
        </div>
        <el-form ref="formContract" :model="formContract" label-width="130px">
          <div class="formNav formNavs" v-if="international.title">
            <el-form-item label="业务类型" prop="businessType">
                <el-select :clearable="false" v-model="formContract.businessType" disabled>
                    <el-option label="月租" :value="2"></el-option>
                    <el-option label="以租代售" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="合同类型"
                prop="contractType"
                :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
              >
                <el-select clearable v-model="formContract.contractType" size="small" placeholder>
                  <el-option
                    v-for="item in contractTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
              label="合同编号"
              prop="contractCode"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.contractCode"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="租赁开始日"
              prop="rentStartDateStr"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-date-picker
                v-model="formContract.rentStartDateStr"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                disabled
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="租赁到期日"
              prop="rentEndDateStr"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-date-picker
                v-model="formContract.rentEndDateStr"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                disabled
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="一键呼叫电话"
              prop="urgentPhoneNumer"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.urgentPhoneNumer"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="合同附件"
              prop="efileIdList"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <div v-if="fileList">
                <span
                  v-for="item in fileList"
                  :key="item.id"
                  class="customerSource"
                  @click="downloadAction(item.efileAddr,item.name)"
                >{{item.name}}</span>
              </div>
            </el-form-item>
            <div class="footerTitle">
              <span>客户信息</span>
            </div>
            <el-form-item
              label="承租方"
              prop="customerName"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.customerName"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="电话"
              prop="customerPhoneNumber"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.customerPhoneNumber"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系人姓名"
              prop="customerContacts"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.customerContacts"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系人手机号"
              prop="contactsPhoneNumber"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.contactsPhoneNumber"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="地址"
              prop="customerAdd"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.customerAdd"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否包买保险" prop="isBuyInsurance"  v-if="showisBuyInsurance"  >
              <el-select :clearable="false" v-model="formContract.isBuyInsurance" disabled>
                  <el-option label="是" :value="0"></el-option>
                  <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否包过户费" prop="isTransfer" v-if="showisTransfer" >
              <el-select :clearable="false" v-model="formContract.isTransfer" disabled>
                  <el-option label="是" :value="0"></el-option>
                  <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <div class="footerTitle">
              <span>车辆信息</span>
            </div>
            <el-form-item
              label="车辆数"
              prop="vehicleNum"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.vehicleNum"
              ></el-input>
              <el-button type="primary" disabled size="small" @click="addVehicle">增加</el-button>
            </el-form-item>
            <el-form-item
              label="充电桩数"
              prop="chargingPileNum"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.chargingPileNum"
              ></el-input>
            </el-form-item>

            <el-table class="vehicleData" :data="formContract.vehicleList">
              <el-table-column prop="name" label="*车牌号">
                <template slot-scope="scope">
                  <el-select
                    v-model="formContract.vehicleList[scope.$index].vehicleNo"
                    size="small"
                    disabled
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
              <el-table-column prop="value" label="*充电桩数">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    disabled
                    v-model="formContract.vehicleList[scope.$index].chargingPileNum"
                    onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    @change="handleChangechargingPileNum"
                    placeholder
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column width="60">
                <template slot-scope="scope">
                  <el-button size="small" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="footerTitle">
              <span>押金信息</span>
            </div>
            <el-form-item
              label="车辆押金"
              prop="vehicleDeposit"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.vehicleDeposit"
              ></el-input>元/辆
            </el-form-item>
            <el-form-item
              label="充电桩押金"
              prop="chargingPileDeposit"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.chargingPileDeposit"
              ></el-input>元/个
            </el-form-item>
            <el-form-item
              label="合同总押金"
              prop="deposit"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.deposit"
              ></el-input>元
            </el-form-item>
            <div class="footerTitle">
              <span>租金计划</span>
            </div>
            <el-form-item v-if="showdownPayment"
            label="车辆首付款" prop="downPayment">
              <el-input class="formItem" disabled
                maxlength="100" v-model="formContract.downPayment"></el-input>元/辆/月
            </el-form-item>
            <el-form-item v-if="latePayment"
            label="车辆尾付款" prop="latePayment">
              <el-input class="formItem" disabled
                maxlength="100" v-model="formContract.latePayment"></el-input>元/辆/月
            </el-form-item>
            <el-form-item
              label="车辆租金"
              prop="onevehicleRent"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.onevehicleRent"
              ></el-input>元/辆/月
            </el-form-item>
            <el-form-item
              label="充电桩租金"
              prop="onechargingPileRent"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.onechargingPileRent"
              ></el-input>元/个/月
            </el-form-item>
            <el-form-item
              label="合同月租"
              prop="vehicleRent"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.vehicleRent"
              ></el-input>元
            </el-form-item>
            <el-form-item
              label="租赁月数"
              prop="rentMonths"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.rentMonths"
              ></el-input>月
            </el-form-item>
            <el-form-item
              label="首次回款日期"
              prop="payRentDateStr"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-date-picker
                v-model="formContract.payRentDateStr"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                disabled
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="逾期滞纳金费率"
              prop="lateFeeRate"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur',},]"
            >
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formContract.lateFeeRate"
              ></el-input>‰
            </el-form-item>
            <el-form-item class="cctv">
              <el-button type="primary" disabled size="small" @click="confirmTable">生成回款计划表</el-button>
            </el-form-item>
            <el-form-item class="cctv1">
              <el-tabs :tab-position="tabPosition" type="border-card" style="height: 500px;">
                <el-tab-pane label="汇总">
                  <el-table
                    :data="formContract.leaseContractGenerateTableVO.aggregation"
                    border
                    show-summary
                    :summary-method="getSum2"
                    size="small"
                    height="470"
                    style="width: 100%;"
                  >
                    <el-table-column prop="billPeriods" label="期数" width="80"></el-table-column>
                    <el-table-column prop="planPaybackDateStr" label="计划回款日" width="100"></el-table-column>
                    <el-table-column prop="vehicleRent" label="车辆租金(汇总)" width="105"></el-table-column>
                    <el-table-column prop="chargingPileRent" label="充电桩租金(汇总)" width="115"></el-table-column>
                    <el-table-column prop="planPaybackMoney" label="计划回款金额(汇总)" width="125"></el-table-column>
                    <el-table-column prop="adjustedPaybackDateStr" label="手动调整后还款日" width="150">
                      <template slot-scope="scope">
                        <el-date-picker
                          v-if="scope.row.collectionStatus == 0"
                          @change="handleChangeDate(scope.$index,scope.row)"
                          :disabled="!checked1"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          v-model="formContract.leaseContractGenerateTableVO.aggregation[scope.$index].adjustedPaybackDateStr"
                          type="date"
                          :clearable="false"
                          size="small"
                          placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker
                          v-else
                          @change="handleChangeDate(scope.$index,scope.row)"
                          disabled
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          v-model="formContract.leaseContractGenerateTableVO.aggregation[scope.$index].adjustedPaybackDateStr"
                          type="date"
                          :clearable="false"
                          size="small"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column prop="adjustedPaybackMoney" label="手动调整后金额" width="110"></el-table-column>
                    <el-table-column label="备注信息" min-width="120">
                      <template slot-scope="scope">
                        <span>{{scope.row.remark}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane
                  v-for="(item,index) in formContract.leaseContractGenerateTableVO.vehicleMap"
                  :label="formContract.leaseContractGenerateTableVO.vehicleMap[index][0].vehicleNo"
                  :key="index"
                >
                  <el-table
                    :data="formContract.leaseContractGenerateTableVO.vehicleMap[index]"
                    border
                    show-summary
                    :summary-method="getSum2"
                    size="small"
                    height="470"
                    style="width: 100%;"
                  >
                    <el-table-column prop="billPeriods" label="期数" width="80"></el-table-column>
                    <el-table-column prop="planPaybackDateStr" label="计划回款日" width="100"></el-table-column>
                    <el-table-column prop="vehicleRent" label="车辆租金" width="105"></el-table-column>
                    <el-table-column prop="chargingPileRent" label="充电桩租金" width="115"></el-table-column>
                    <el-table-column prop="planPaybackMoney" label="计划回款金额" width="125"></el-table-column>
                    <el-table-column prop="adjustedPaybackDateStr" label="手动调整后还款日" width="150"></el-table-column>
                    <el-table-column prop="adjustedPaybackMoney" label="手动调整后金额" width="110">
                      <template slot-scope="scope">
                        <el-input
                          v-if="scope.row.collectionStatus == 0"
                          class="formItem"
                          size="small"
                          :disabled="!checked1"
                          maxlength="100"
                          @change="handleChangeMoney(scope.$index,scope.row)"
                          v-model="formContract.leaseContractGenerateTableVO.vehicleMap[index][scope.$index].adjustedPaybackMoney"
                        ></el-input>
                        <el-input
                          v-else
                          class="formItem"
                          size="small"
                          disabled
                          maxlength="100"
                          @change="handleChangeMoney(scope.$index,scope.row)"
                          v-model="formContract.leaseContractGenerateTableVO.vehicleMap[index][scope.$index].adjustedPaybackMoney"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注信息" min-width="120">
                      <template slot-scope="scope">
                        <el-input
                          class="formItem"
                          size="small"
                          disabled
                          maxlength="50"
                          @change="handleChangeRemark(scope.$index,scope.row)"
                          v-model="formContract.leaseContractGenerateTableVO.vehicleMap[index][scope.$index].remark"
                        ></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-form-item>
            <el-form-item label="调整附件">
              <el-upload
                class="upload"
                disabled
                action="/vehicle-service/efileInfo/uploadLeaseContractFile?fileType=8"
                :headers="headers"
                :on-preview="handlePreview1"
                :on-remove="handleRemove1"
                :on-success="handleSuccess1"
                :on-error="handleError1"
                :file-list="fileList1"
                multiple
              >
                <span class="upload_txt disabled_txt">上传</span>
              </el-upload>
            </el-form-item>
            <div class="footerTitle">
              <span>变更类型</span>
            </div>
            <div class="footerNav changeTable">
              <el-form-item label>
                <el-checkbox v-model="checked1">变更计划</el-checkbox>
                <el-checkbox v-model="checked2">变更车辆</el-checkbox>
                <el-checkbox v-model="checked3">变更业务员</el-checkbox>
              </el-form-item>
              <el-form-item label v-if="checked2">
                <el-table class="vehicleData" :data="vehicleList">
                  <el-table-column prop="name" label="*车牌号">
                    <template slot-scope="scope">
                      <el-select
                        v-model="vehicleList[scope.$index].vehicleNo"
                        size="small"
                        @change="handleChangevehicleNo(scope.$index,scope.row)"
                        filterable
                        placeholder
                      >
                        <el-option
                          v-for="item in vehicleNoOptionsed"
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
                        v-model="vehicleList[scope.$index].vehicleColorName"
                        placeholder
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="value" label="车型">
                    <template slot-scope="scope">
                      <el-input
                        size="small"
                        disabled
                        v-model="vehicleList[scope.$index].vehicleTypeName"
                        placeholder
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="value" label="*充电桩数">
                    <template slot-scope="scope">
                      <el-input
                        size="small"
                        disabled
                        v-model="vehicleList[scope.$index].chargingPileNum"
                        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                        @change="handleChangechargingPileNum"
                        placeholder
                      ></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item class="cctv" v-if="checked3">
                <el-select v-model="afterUserId" size="small" placeholder="请选择">
                  <el-option
                    v-for="item in userIdoptions"
                    :key="item.id"
                    :label="item.salesmanName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="footerTitle">
              <span>变更附件</span>
            </div>
            <el-form-item label="变更附件">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadLeaseContractFile?fileType=8"
                :headers="headers"
                :on-preview="handlePreview2"
                :on-remove="handleRemove2"
                :on-success="handleSuccess2"
                :on-error="handleError2"
                :file-list="fileList2"
                multiple
              >
                <span class="upload_txt">上传</span>
              </el-upload>
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
import {
  getCookie,
  dateToString,
  getMenuBtnList,
  formatJE,
  download,
} from "../../public";
export default {
  name: "planChange",
  data() {
    return {
        businessType:2,
        showisBuyInsurance:false,
        showisTransfer:false,
        showdownPayment:false,
        latePayment:false,
      formVeInformation: {
        //订单信息
        brand: "", //车牌号码
        vehicleType: "", //车型
        number: "", //数量
        duration: "", //时长
        userType: "", //客户类型
        userName: "", //客户名称
        businessNO: "", //营业执照号
        contactsName: "", //联系人姓名
        ipone: "", //联系电话
        userid: "", //分配业务员
      },
      formContract: {
        id: null,
        //合同信息
        contractCode: null, //合同编号
        rentStartDateStr: null, //起租日期
        rentEndDateStr: null, //止租日期
        urgentPhoneNumer: null, //紧急联系电话
        efileIdList: [], //合同附件id
        supplefileIdList: [], //合同补充附件Id集合
        contractType:'',//合同类型

        businessType:2,//业务类型 1-以租代售 2-月租
        isBuyInsurance:null,//是否买保险 0-是 1-否
        isTransfer:null,//是否包过户 0-是 1-否
        downPayment:null,//车辆首付款
        latePayment:null,//车辆尾付款

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
            id: "",
            vehicleId: "",
            vehicleNo: "",
            vehicleColor: "",
            vehicleType: "",
            chargingPileNum: "",
            startDate: "",
            endDate1: "",
            endDate2: "",
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
        contractTypes:[
          {value:1,label:'新签'}, {value:2,label:'续签'}
        ],

        leaseContractGenerateTableVO: {
          aggregation: [], //汇总的
          vehicleMap: {}, //每辆车的
        },
      },

      beforeLeaseContractGenerateTableVO: {},
      formList: [],
      formList1:[],//备份
      dateList: [],
      changeVehicleList: [],
      userIdList: [],
      afterPaybackDateStr: null, //变更后还款日期
      afterPaybackMoney: null, //变更后还款金额
      afterUserId: null, //变更后业务员id
      afterVehicleId: null, //变更后车辆id
      beforePaybackDateStr: null, //变更前还款日期
      beforePaybackMoney: null, //变更前还款金额
      beforeUserId: null, //变更前业务员id
      beforeVehicleId: null, //变更前车辆id
      billPeriods: null, //期数
      changeType: null, //变更类型(0-计划变更 1-车辆变更 2-业务员变更)
      contactVehicleId: null, //合同车辆关系表主键
      contractId: null, //合同id
      contractRentId: null, //合同回款计划主键
      fileIdList: [], //变更附件地址
      vehicleId: null, //车Id
      vehicleRentId: null, //车辆回款计划主键

      tabPosition: "left",
      showMsg: "计划变更",
      vehicleTypeId: null, //车型ID
      orderValue: null, //订单编号
      brandOptions: [], //车辆品牌
      vehicleTypeOptions: [], //车型
      userTypeOptions: [], //客户类型
      vehicleNoOptions: [], //车牌号
      vehicleNoOptionsed: [], //车牌号
      userIdoptions: [], //更换业务员
      fileList: [], //合同附件
      fileList1: [], //合同补充附件
      fileList2: [], //变更附件
      imgIdList: [], //图片id
      checked1: false,
      checked2: false,
      checked3: false,
      open: false,
      vehicleList: [
        {
          vehicleId: "",
          vehicleNo: "",
          vehicleColor: "",
          vehicleType: "",
          chargingPileNum: "",
          startDate: "",
          endDate1: "",
          endDate2: "",
        },
      ], //合同车辆关联
      tableData: [],
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    addVehicleInfo() {
      //新增车辆信息
      axios({
        method: "post",
        url: "/vehicle-service/vehicleInfo/insertVehicle",
        headers: this.headers,
        data: this.formVeInformation,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.vehicleId = JSON.parse(result.data.data).id;
            this.userId = JSON.parse(result.data.data).userid;
            this.getCompany();
            this.getVehiclePlace();
            this.getSalesman();
            this.$message({
              type: "success",
              message: "保存成功!",
              center: true,
            });
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
    addVehicle() {
      //增加车辆数
      this.formContract.vehicleNum++;
      this.formContract.vehicleList.push({
        vehicleNo: null,
        vehicleColor: null,
        vehicleType: null,
        chargingPileNum: null,
        startDate: null,
        endDate1: null,
        endDate2: null,
      });
    },
    deleteRow(index) {
      //规则删除
      this.formContract.vehicleNum--;
      this.formContract.vehicleList.splice(index, 1);
    },
    confirm() {
      //确定
      this.formList = [];
      if(this.checked1){
        for(var i=0;i<this.formList1.length;i++){
          this.formList.push(this.formList1[i])
        }
      }
      if (this.checked2) {
        var arr = [];
        this.vehicleList.map((item) => {
          arr.push(item.id);
        });
        var nary = arr.sort();
        for (var j = 0; j < arr.length; j++) {
          if (nary[j] == nary[j + 1]) {
            this.$message({
              type: "error",
              message: "变更的车牌号相同不能提交变更!",
              center: true,
            });
            return;
          }
        }
        for (var i = 0; i < this.vehicleList.length; i++) {
          if (
            this.formContract.vehicleList[i].vehicleNo !==
            this.vehicleList[i].vehicleNo
          ) {
            this.formList.push({
              afterVehicleId: this.vehicleList[i].id,
              changeType: 1,
              contactVehicleId: this.formContract.vehicleList[i].id,
              contractId: this.$route.query.id,
            });
          }
        }
      }
      if (this.checked3) {
        if (this.beforeUserId != this.afterUserId) {
          this.formList.push({
            afterUserId: this.afterUserId,
            changeType: 2,
            contractId: this.$route.query.id,
          });
        }
      }
      if(!this.checked1 && !this.checked2 && !this.checked3){
        this.$message({
          type: "error",
          message: "没有变更不能提交变更!",
          center: true,
        });
        return;
      }
      if (this.fileIdList.length > 0) {
        this.formList = this.formList.map((item) => {
            return { ...item, fileIdList: this.fileIdList };
          });
      }
      // console.log(this.formList);
      axios({
        method: "post",
        url: "/vehicle-service/leaseContractInfo/submitPlanChange", //+this.vehicleTypeId
        headers: this.headers,
        data: this.formList,
      })
        .then((result) => {
          // console.log(result.data);
          this.$store.commit("changeIsStatus", true);
          if (result.data.status === 0) {
            this.$message({
              type: "success",
              message: "变更成功",
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
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    // 下载附件
    downloadAction(url, fileName) {
      download(url, fileName);
    },
    handleClick() {
      //查看订单详情
      this.$router.push({
        path: "/auditOrder",
        query: { form: "detail", id: this.$route.query.id },
      });
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
      this.formContract.efileIdList.push(response.data.id);
      this.fileList.map((res) => {
        this.formContract.efileIdList.push(res.id);
      });
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
    handleRemove1(file, fileList) {
    },
    handlePreview1(file) {
    },
    handleSuccess1(response, file, fileList) {
      //   console.log(response, file, fileList);
      this.formContract.supplefileIdList = [];
      this.formContract.supplefileIdList.push(response.data.id);
      this.fileList1.map((res) => {
        this.formContract.supplefileIdList.push(res.id);
      });
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
    handleRemove2(file, fileList) {
      // console.log(file, fileList);
      // console.log(this.form.efileIdCode)
      //   var newArr = this.form.efileIdCode.split(",");
      //   var index = newArr.indexOf(file.response ? file.response.data.id:file.id);
      //   this.form.efileIdCode = newArr.splice(index,1).join(",");
    },
    handlePreview2(file) {
      //   this.dialogImageUrl = file.url;
      //   this.dialogVisible = true;
    },
    handleSuccess2(response, file, fileList) {
      // console.log(response, file, fileList);
      this.fileIdList = [];
      this.fileIdList.push(response.data.id);
      this.fileList2.map((res) => {
        this.fileIdList.push(res.id);
      });
      // console.log(this.fileIdList);
    },
    handleError2() {
      this.$error("上传失败,请重新上传图片!");
    },
    handleBeforeUpload2(file) {
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
    getVehicle() {
      //合同查询车辆
      axios({
        method: "get",
        url:
          "/vehicle-service/comboBoxController/contractSearchVehicle?vehicleTypeId=" +
          this.vehicleTypeId, //
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.vehicleNoOptions = result.data.data;
            this.vehicleNoOptionsed = result.data.data;
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
      // console.log(row);
      axios({
        method: "get",
        url:
          "/vehicle-service/comboBoxController/contractSearchVehicle?vehicleTypeId=" +
          +this.vehicleTypeId +
          "&vehicleNo=" +
          row.vehicleNo, //+this.vehicleTypeId
        headers: this.headers,
      })
        .then((result) => {
          if (result.data.status === 0) {
            row.id = result.data.data[0].id;
            row.vehicleId = result.data.data[0].id;
            row.vehicleColor = result.data.data[0].vehicleColorName;
            row.vehicleType = result.data.data[0].vehicleTypeName;
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
    handleChangechargingPileNum() {
      //充电桩数量
      this.formContract.chargingPileNum = null;
      this.formContract.vehicleList.map((res) => {
        this.formContract.chargingPileNum += Number(res.chargingPileNum);
      });
    },
    confirmTable() {
      //生成计划表
      axios({
        method: "post",
        url: "/vehicle-service/leaseContractInfo/generateCollectionSchedule",
        headers: this.headers,
        data: this.formContract,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.formContract.leaseContractGenerateTableVO.aggregation =
              result.data.data.aggregation;
            this.formContract.leaseContractGenerateTableVO.vehicleMap =
              result.data.data.vehicleMap;
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
    handleChangeDate(index, row) {
      //改变日期
      // console.log(index,row)
      Object.keys(
        this.formContract.leaseContractGenerateTableVO.vehicleMap
      ).forEach((key) => {
        // console.log(key,this.formContract.leaseContractGenerateTableVO.vehicleMap[key]);
        this.formContract.leaseContractGenerateTableVO.vehicleMap[key][index].adjustedPaybackDateStr =
          this.formContract.leaseContractGenerateTableVO.aggregation[index].adjustedPaybackDateStr;
      });
      if(row.adjustedPaybackDateStr != this.beforeLeaseContractGenerateTableVO.aggregation[index].adjustedPaybackDateStr){
            //变更日期
            this.formList1.push({
              afterPaybackDateStr: row.adjustedPaybackDateStr,
              billPeriods: index,
              changeType: 0,
              contractId: this.$route.query.id,
              contractRentId: this.beforeLeaseContractGenerateTableVO.aggregation[index].id,
            });
          }
    },
    handleChangeMoney(index, row) {
      //改变金额
      // console.log(index,row)
      this.formContract.leaseContractGenerateTableVO.aggregation[index].adjustedPaybackMoney = 0;
      Object.keys(
        this.formContract.leaseContractGenerateTableVO.vehicleMap
      ).forEach((key) => {
        // console.log(key,this.formContract.leaseContractGenerateTableVO.vehicleMap[key])
        this.formContract.leaseContractGenerateTableVO.aggregation[index].adjustedPaybackMoney += Number(
          this.formContract.leaseContractGenerateTableVO.vehicleMap[key][index].adjustedPaybackMoney);
        if (row.adjustedPaybackMoney == this.formContract.leaseContractGenerateTableVO.vehicleMap[key][index].adjustedPaybackMoney) {
          this.formList1.push({
            afterPaybackMoney: this.formContract.leaseContractGenerateTableVO
              .vehicleMap[key][index].adjustedPaybackMoney,
            billPeriods: index,
            changeType: 0,
            contractId: this.$route.query.id,
            contractRentId: this.formContract.leaseContractGenerateTableVO
              .aggregation[index].id,
            vehicleId: this.formContract.leaseContractGenerateTableVO
              .vehicleMap[key][index].vehicleId,
            vehicleRentId: this.formContract.leaseContractGenerateTableVO
              .vehicleMap[key][index].id,
          });
        }
      });
    },
    handleChangeRemark(index, row) {
      //改变备注
      var arr = [];
      this.formContract.leaseContractGenerateTableVO.aggregation[index].remark =
        "";
      Object.keys(
        this.formContract.leaseContractGenerateTableVO.vehicleMap
      ).forEach((key) => {
        // console.log(key,this.formContract.aggregation[index].remark)
        arr.push(this.formContract.leaseContractGenerateTableVO.vehicleMap[key][index].remark);
        this.formContract.leaseContractGenerateTableVO.aggregation[index].remark = arr.join(",");
      });
    },
    changeUserId() {
      //改变业务员
      if (this.beforeUserId != this.afterUserId) {
        this.userIdList.push({
          afterUserId: this.afterUserId,
          changeType: 2,
          contractId: this.$route.query.id,
        });
      }
    },
    getInitData() {
      //跳转计划变更
      axios({
        method: "get",
        url:
          "/vehicle-service/leaseContractInfo/goPlanChangePage?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
              setTimeout(() => {
            window.onload()
          }, 10)
            this.orderValue = result.data.data.leaseContractOrderVO.orderNumber;
            this.vehicleTypeId = result.data.data.vehicleTypeId;

            this.formContract.businessType= result.data.data.businessType
            if(this.formContract.businessType==1){
              this.formContract.isBuyInsurance= result.data.data.isBuyInsurance
              this.formContract.isTransfer= result.data.data.isTransfer
              this.formContract.downPayment= result.data.data.downPayment
              this.formContract.latePayment= result.data.data.latePayment
              this.showisBuyInsurance=true
              this.showisTransfer=true
              this.showdownPayment=true
              this.latePayment=true
              this.businessType=1
            }
            this.getVehicle();

            this.formVeInformation.brand =
              result.data.data.leaseContractOrderVO.brandName; //车辆品牌
            this.formVeInformation.vehicleType =
              result.data.data.leaseContractOrderVO.vehicleTypeName; //车型
            this.formVeInformation.number =
              result.data.data.leaseContractOrderVO.number; //数量
            this.formVeInformation.duration =
              result.data.data.leaseContractOrderVO.leaseDuration; //时长
            this.formVeInformation.userType =
              result.data.data.leaseContractOrderVO.customerTypeStr; //客户类型
            this.formVeInformation.userName =
              result.data.data.leaseContractOrderVO.customerName; //客户名称
            this.formVeInformation.businessNO =
              result.data.data.leaseContractOrderVO.busilicNo; //营业执照号
            this.formVeInformation.contactsName =
              result.data.data.leaseContractOrderVO.personInCharge; //联系人姓名
            this.formVeInformation.ipone =
              result.data.data.leaseContractOrderVO.phoneNumber; //联系电话
            this.formVeInformation.userid =
              result.data.data.leaseContractOrderVO.userName; //分配业务员


            this.formContract.contractType = result.data.data.contractType;//合同类型
            this.formContract.contractCode = result.data.data.contractCode; //合同编号
            this.formContract.rentStartDateStr =
              result.data.data.rentStartDateStr; //起租日期
            this.formContract.rentEndDateStr = result.data.data.rentEndDateStr; //止租日期
            this.formContract.urgentPhoneNumer =
              result.data.data.urgentPhoneNumer; //紧急联系电话
            this.formContract.efileIdList = result.data.data.efileIdList; //合同附件
            this.fileList = result.data.data.fileInfoVOS
              ? result.data.data.fileInfoVOS
              : [];
            this.fileList = JSON.parse(
              JSON.stringify(this.fileList).replace(/efileName/g, "name")
            );
            this.formContract.supplefileIdList =
              result.data.data.supplefileIdList; //合同附加附件
            this.fileList1 = result.data.data.suppleFileInfoVOS
              ? result.data.data.suppleFileInfoVOS
              : [];
            this.fileList1 = JSON.parse(
              JSON.stringify(this.fileList1).replace(/efileName/g, "name")
            );

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

            this.formContract.vehicleDeposit = result.data.data.vehicleDeposit; //单车押金
            this.formContract.chargingPileDeposit =
              result.data.data.chargingPileDeposit; //单桩押金
            this.formContract.deposit = result.data.data.deposit; //合同总押金

            this.formContract.onevehicleRent = result.data.data.onevehicleRent; //单车租金
            this.formContract.onechargingPileRent =
              result.data.data.onechargingPileRent; //单桩租金
            this.formContract.vehicleRent = result.data.data.vehicleRent; //合同月租金
            this.formContract.rentMonths = result.data.data.rentMonths; //租赁月数
            this.formContract.payRentDateStr = result.data.data.payRentDate; //首次还款日期
            this.formContract.lateFeeRate = result.data.data.lateFeeRate * 1000; //逾期滞纳金收取标准

            this.formContract.leaseContractGenerateTableVO =
              result.data.data.leaseContractGenerateTableVO; //汇总,单车
            this.beforeLeaseContractGenerateTableVO = JSON.parse(
              JSON.stringify(result.data.data.leaseContractGenerateTableVO)
            ); //汇总,单车之前

            this.afterPaybackDateStr =
              result.data.data.leaseContractGenerateTableVO.aggregation;

            this.formContract.leaseContractGenerateTableVO.aggregation[0].billPeriods = '押金';
            // console.log(this.formContract.leaseContractGenerateTableVO.aggregation[0].billPeriods)
            Object.keys(this.formContract.leaseContractGenerateTableVO.vehicleMap).forEach((key) => {
              this.formContract.leaseContractGenerateTableVO.vehicleMap[key][0].billPeriods = '押金';
            });

            this.beforeUserId = result.data.data.leaseContractOrderVO.userId; //分配业务员afterUserId
            this.afterUserId = result.data.data.leaseContractOrderVO.userId; //分配业务员afterUserId
            this.vehicleList = JSON.parse(
              JSON.stringify(result.data.data.leaseContractVehicleInfoVOList)
            ); //合同车辆关联
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
    getUserId() {
      //业务员
      axios({
        method: "get",
        url:
          "/vehicle-service/comboBoxController/getSalesmanBox?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.userIdoptions = result.data.data;
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
    // 表格合计
    getSum2(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        //calcProp 为需要计算的列的prop值的集合
        const calcProp = [
          "vehicleRent",
          "chargingPileRent",
          "planPaybackMoney",
          "adjustedPaybackMoney",
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
  },
  mounted() {
    this.getInitData();
    this.getUserId();
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
/* .formNavs .el-form-item:last-child {
  width: 100%;
} */
.cctv {
  width: 100%;
}
.cctv1 {
  width: 100%;
}
.cctv1 >>> .el-form-item__content {
  margin-left: 0 !important;
}
.cctv1 >>> .el-tabs--border-card > .el-tabs__content {
  height: 500px;
  overflow-y: auto;
  box-sizing: border-box;
}
.footerNav .el-input {
  width: 160px;
}

.formNavs .el-form-item:nth-child(4) .el-input {
  width: 130px;
}
.changeTable .el-form-item:nth-child(2) {
  width: 100%;
}
.footerNav .el-table .el-input {
  width: 100%;
}

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
.disabled_txt {
  color: #999;
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
