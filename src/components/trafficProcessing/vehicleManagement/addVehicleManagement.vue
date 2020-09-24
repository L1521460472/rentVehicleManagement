<template>
  <div id="header">
    <div class="header">
      <span>{{ showMsg }}</span>
    </div>
    <div class="footer">
      <div class="footerNav" v-if="international.title">
        <div class="footerTitle">
          <span>车辆信息</span>
        </div>
        <el-form ref="formVeInformation" :model="formVeInformation" label-width="120px">
          <div class="formNav formNavs">
            <el-form-item
              label="车牌号码"
              prop="vehicleNo"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur'}]"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isOperation"
                maxlength="100"
                v-model="formVeInformation.vehicleNo"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="车架号"
              prop="vinNo"
              :rules="[{required: true,message: international.global.global_contNotEmpty,trigger: 'blur'}]"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isOperation"
                maxlength="100"
                v-model="formVeInformation.vinNo"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="发动机号"
              prop="engineNo"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isOperation"
                maxlength="100"
                v-model="formVeInformation.engineNo"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="有无办理营运证"
              prop="isHasBuslic"
            >
              <el-select
                v-model="formVeInformation.isHasBuslic"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in isHasBuslicOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="有无ETC"
              prop="isHasEtc"
            >
              <el-select
                v-model="formVeInformation.isHasEtc"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in isHasEtcOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="有无电子标签"
              prop="isHasRfid"
            >
              <el-select
                v-model="formVeInformation.isHasRfid"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in isHasRfidOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="出厂日期"
              prop="exFactoryDate"
            >
              <el-date-picker
                v-model="formVeInformation.exFactoryDate"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isOperation"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="运营日期"
              prop="saleDate"
            >
              <el-date-picker
                v-model="formVeInformation.saleDate"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isOperation"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="颜色"
              prop="vehicleColor"
            >
              <el-select
                v-model="formVeInformation.vehicleColor"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in vehicleColorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="备注"
              prop="remark"
            >
              <el-input
                class="formItem"
                size="small"
                :disabled="isOperation"
                maxlength="100"
                v-model="formVeInformation.remark"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="图片"
              class="formItem"
              prop="efileIdCode"
            >
              <el-upload
                class="upload"
                :disabled="isOperation"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=4"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-exceed="handleExceed"
                :before-upload="handleBeforeUpload"
                :file-list="fileVeInfoList"
                list-type="picture-card"
                :limit="5"
                multiple
              >
                <span :class="isOperation ? 'disabled_txt':'upload_txt'">上传图片</span>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" width="500px">
                <img class="imgList" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </div>
        </el-form>
        <div class="footerTitle">
          <span>车型信息</span>
        </div>
        <el-form ref="formVehicleType" :model="formVehicleType" label-width="130px">
          <div class="formNav formNavs">
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
              <el-select
                v-model="formVehicleType.brandName"
                size="small"
                :disabled="isOperation"
                @change="getVehicleType"
                placeholder
              >
                <el-option
                  v-for="item in brandNameOptions"
                  :key="item.id"
                  :label="item.brandName"
                  :value="item.id"
                ></el-option>
              </el-select>
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
              <el-select
                v-model="formVehicleType.vehicleTypeName"
                size="small"
                :disabled="isOperation"
                @change="getVehicleTypeDetails"
                placeholder
              >
                <el-option
                  v-for="item in vehicleTypeNameOptions"
                  :key="item.id"
                  :label="item.vehicleTypeName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车身尺寸长(mm)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.vehicleLength"
              ></el-input>
            </el-form-item>
            <el-form-item label="车身尺寸宽(mm)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.width"
              ></el-input>
            </el-form-item>
            <el-form-item label="车身尺寸高(mm)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.height"
              ></el-input>
            </el-form-item>
            <el-form-item label="轴距(mm)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.axisbase"
              ></el-input>
            </el-form-item>
            <el-form-item label="轮距(mm)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.wheelbase"
              ></el-input>
            </el-form-item>
            <el-form-item label="总质量(kg)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.totalMass"
              ></el-input>
            </el-form-item>
            <el-form-item label="额定载质量(kg)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.maxLoad"
              ></el-input>
            </el-form-item>
            <el-form-item label="额定乘坐人数">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.maxPassengers"
              ></el-input>
            </el-form-item>
            <el-form-item label="最高车速(km/h)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.maxSpeed"
              ></el-input>
            </el-form-item>
            <el-form-item label="续航里程(km)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.vehicleRange"
              ></el-input>
            </el-form-item>
            <el-form-item label="充电时长(h)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.chargingTime"
              ></el-input>
            </el-form-item>
            <el-form-item label="电池容量(kw.h)">
              <el-input
                class="formItem"
                size="small"
                disabled
                maxlength="100"
                v-model="formVehicleType.batteryCapacity"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片" class="formItem">
              <el-image
                v-for="(item, index) in fileList"
                :key="index"
                style="width: 60px; height: 60px;"
                :src="item.url"
                :preview-src-list="[item.url]"
              ></el-image>
            </el-form-item>
          </div>
        </el-form>
        <div class="footerTitle">
          <span>运营信息</span>
        </div>
        <el-form ref="formVeInformation" :model="formVeInformation" label-width="130px">
          <div class="formNav">
            <el-form-item
              label="所属门店"
              prop="enterpriseId"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-select
                v-model="formVeInformation.enterpriseId"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in companyOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="车辆使用方式"
              prop="vehicleUsageMode"
            >
              <el-select
                v-model="formVeInformation.vehicleUsageMode"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in vehicleUseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="存车地点"
              prop="parkingLotId"
            >
              <el-select
                v-model="formVeInformation.parkingLotId"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in vehiclePlaceOptions"
                  :key="item.id"
                  :label="item.parkingLotName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="业务员"
              prop="userId"
            >
              <el-select
                v-model="formVeInformation.userId"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in salesmanOptions"
                  :key="item.id"
                  :label="item.salesmanName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="车辆出租状态"
              prop="vehicleUsageStatus"
            >
              <el-select
                v-model="formVeInformation.vehicleUsageStatus"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in leaseStateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="维修状态"
              prop="vehicleRepairStatus"
            >
              <el-select
                v-model="formVeInformation.vehicleRepairStatus"
                size="small"
                :disabled="isOperation"
                placeholder
              >
                <el-option
                  v-for="item in maintenanceStateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div class="footerTitles">
          <el-button size="small" type="primary" v-if="showButton" @click="addVehicleInfo">提交</el-button>
          <el-button size="small" type="primary" v-else @click="editVehicleInfo">提交</el-button>
          <el-button size="small" type="primary" @click="isOperationShow">编辑</el-button>
        </div>
        <div class="footerTitle">
          <span>车辆证件资料</span>
          <el-button size="small" v-if="showButton || formVehicleCard.id == null" type="primary" @click="addVehicleCard">保存</el-button>
          <el-button size="small" v-else type="primary" @click="editVehicleCard">保存</el-button>
          <el-button size="small" type="primary" @click="isVehicleCardShow">编辑</el-button>
        </div>
        <el-form ref="formVehicleCard" :model="formVehicleCard" label-width="130px">
          <div class="formNav formNavs">
            <el-form-item
              label="行驶证号码"
              prop="drilicNo"
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
                :disabled="isVehicleCard"
                maxlength="100"
                v-model="formVehicleCard.drilicNo"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="行驶证注册日期"
              prop="dateOfRegistration"
              :rules="[
                {
                  required: true,
                  message: international.global.global_contNotEmpty,
                  trigger: 'blur',
                },
              ]"
            >
              <el-date-picker
                v-model="formVehicleCard.dateOfRegistration"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isVehicleCard"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
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
                v-model="formVehicleCard.termOfValidity"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="isVehicleCard"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="电子档"
              class="formItem"
              prop="efileIdCode"
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
                :disabled="isVehicleCard"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=6"
                :headers="headers"
                :on-preview="cardHandlePreview"
                :on-remove="cardHandleRemove"
                :on-exceed="cardHandleExceed"
                :on-success="cardHandleSuccess"
                :on-error="cardHandleError"
                :before-upload="cardHandleBeforeUpload"
                :file-list="cardFileList"
                list-type="picture-card"
                :limit="2"
                multiple
              >
                <span :class="isVehicleCard ? 'disabled_txt':'upload_txt'">上传图片</span>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <el-dialog :visible.sync="dialogVisibleCard" width="500px">
                <img class="imgList" :src="dialogImageUrlCard" alt />
              </el-dialog>
            </el-form-item>
          </div>
        </el-form>
        <div class="footerTitle">
          <span>车辆保养计划表</span>
          <el-button size="small" v-if="showButton || scheduleTableData[0].id == null" type="primary" @click="addSchedule">保存</el-button>
          <el-button size="small" v-else type="primary" @click="editSchedule">保存</el-button>
          <el-button size="small" type="primary" @click="isVehicleScheduleShow">编辑</el-button>
        </div>
        <el-table :data="scheduleTableData" size="small" border style="width: 100%;">
          <el-table-column prop="count" label="保养次数" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.count == 1">首保</span>
              <span v-if="scope.row.count == 2">二保</span>
              <span v-if="scope.row.count == 3">三保</span>
              <span v-if="scope.row.count == 4">四保</span>
              <span v-if="scope.row.count == 5">常规保养</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="保养周期" width="220">
            <template slot-scope="scope">
              <el-input
                size="small"
                :disabled="isVehicleSchedule"
                v-model="scheduleTableData[scope.$index].date"
                placeholder
              ></el-input>  &nbsp;月
            </template>
          </el-table-column>
          <el-table-column prop="mileage" label="保养公里">
            <template slot-scope="scope">
              <el-input
                size="small"
                :disabled="isVehicleSchedule"
                v-model="scheduleTableData[scope.$index].mileage"
                placeholder
              ></el-input> &nbsp;Km
            </template>
          </el-table-column>
        </el-table>
        <div class="footerTitle">
          <span>车辆年检记录</span>
          <el-button size="small" type="primary" @click="addAS">新增</el-button>
        </div>
        <el-table :data="inspectionTableData" size="small" border style="width: 100%;">
          <el-table-column prop="yearlyInspectionDateStr" label="年检办理日期" width="180"></el-table-column>
          <el-table-column prop="yearlyInspectionMoney" label="年检金额" width="180"></el-table-column>
          <el-table-column prop="handler" label="年检处理人"></el-table-column>
          <el-table-column prop="ls_EfileIdCodeAddr" label="附件">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleClick(scope.row.ls_EfileIdCodeAddr)">查看附件</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="footerTitle">
          <span>车辆保险记录</span>
          <el-button size="small" type="primary" @click="addInsurance">新增</el-button>
        </div>
        <el-table :data="insuranceTableData" size="small" border style="width: 100%;">
          <el-table-column prop="policyStartDate" label="开始日期" width="160"></el-table-column>
          <el-table-column prop="policyEndDate" label="到期日期" width="160"></el-table-column>
          <el-table-column prop="companyName" width="100" label="保险公司"></el-table-column>
          <el-table-column prop="policyTypeStr" width="80" label="保险种类">
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.policyType == 0">交强险</span>
              <span v-if="scope.row.policyType == 1">商业险</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="policyNo" width="120" label="保单号"></el-table-column>
          <el-table-column prop="premium" width="100" label="保费金额"></el-table-column>
          <el-table-column prop="dealMan" width="90" label="续保处理人"></el-table-column>
          <el-table-column width="100" label="附件">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleClick(scope.row.ls_EfileIdCodeAddr)">查看附件</el-button>
              <!-- 查看附件 -->
              <!-- <el-dialog :visible.sync="dialogVisibleImg1" width="500px">
                <el-carousel trigger="click" height="400px">
                  <el-carousel-item v-for="items in scope.row.ls_EfileIdCodeAddr" :key="items.id">
                    <img class="imgList" :src="items.url" alt srcset />
                  </el-carousel-item>
                </el-carousel>
              </el-dialog> -->
            </template>
          </el-table-column>
          <el-table-column prop="remark" width="100" label="备注"></el-table-column>
          <el-table-column min-width="100" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleLooks(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="handleEdits(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footerButton">
        <el-button size="small" @click="cancel">返回</el-button>
      </div>
      <!-- 查看附件 -->
      <el-dialog :visible.sync="dialogVisibleImg" width="500px">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in imageUrlList" :key="item.id">
            <img class="imgList" :src="item.url" />
          </el-carousel-item>
        </el-carousel>
      </el-dialog>

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
  formatJE
} from "../../../public";
export default {
  name: "addVehicleManagement",
  data() {
    return {
      formVeInformation: {
        //车辆信息
        vehicleNo: null, //车牌号码15
        vinNo: null, //车架号16
        engineNo: "", //发动机号14
        isHasBuslic: "", //有无办理营运证3
        isHasEtc: "", //有无ETC4
        isHasRfid: "", //有无电子标签5
        exFactoryDate: "", //出厂日期2
        saleDate: "", //运营日期8
        vehicleColor: "", //颜色10
        remark: "", //备注7
        efileIdCode: "", //图片ID18
        typeId: "", //车辆型号ID17
        enterpriseId: "", //所属门店1
        vehicleUsageMode: "", //车辆使用方式12
        parkingLotId: "", //存车地点6
        userId: "", //业务员9
        vehicleUsageStatus: "", //出租状态13
        vehicleRepairStatus: "", //维修状态11
        id:null,//
      },
      formVehicleType: {
        //车型信息
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
      formVehicleCard: {
        //车辆证件资料
        drilicNo: "", //行驶证号码
        dateOfRegistration: "", //行驶证注册日期
        termOfValidity: "", //下次年检日期
        vehicleId: "", //车辆ID
        efileIdCode: "", //证件照ID
        id: null,
      },
      scheduleTableData: [
        //车辆保养计划表
        {
          count: "1",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "2",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "3",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "4",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "5",
          date: null,
          id: null,
          mileage: null,
        },
      ],
      inspectionTableData: [
        //车辆年检记录
      ],
      insuranceTableData: [
        //车辆保险记录
      ],
      isHasBuslicOptions: [
        //运营执照
        {
          value: 0,
          label: "有",
        },
        {
          value: 1,
          label: "无",
        },
      ],
      isHasEtcOptions: [
        //ETC
        {
          value: 0,
          label: "有",
        },
        {
          value: 1,
          label: "无",
        },
      ],
      isHasRfidOptions: [
        //证书
        {
          value: 0,
          label: "有",
        },
        {
          value: 1,
          label: "无",
        },
      ],
      vehicleColorOptions: [
        //颜色1-黑色,2-白色,3-银色,4-红色,5-橙色,6-棕色,7-粉色,8-蓝色,9-绿色,10-灰色,11-紫色,12-浅绿色,13-浅蓝色,14-黄色
        {
          value: 1,
          label: "黑色",
        },
        {
          value: 2,
          label: "白色",
        },
        {
          value: 3,
          label: "银色",
        },
        {
          value: 4,
          label: "红色",
        },
        {
          value: 5,
          label: "橙色",
        },
        {
          value: 6,
          label: "棕色",
        },
        {
          value: 7,
          label: "粉色",
        },
        {
          value: 8,
          label: "蓝色",
        },
        {
          value: 9,
          label: "绿色",
        },
        {
          value: 10,
          label: "灰色",
        },
        {
          value: 11,
          label: "紫色",
        },
        {
          value: 12,
          label: "浅绿色",
        },
        {
          value: 13,
          label: "浅蓝色",
        },
        {
          value: 14,
          label: "黄色",
        },
      ],
      brandNameOptions: [
        //品牌
      ],
      vehicleTypeNameOptions: [
        //车型
      ],
      companyOptions: [
        //所属门店
      ],
      vehicleUseOptions: [
        //车辆使用方式
        {
          value: 0,
          label: "租赁",
        },
        {
          value: 1,
          label: "替换",
        },
      ],
      vehiclePlaceOptions: [
        //存车地点
      ],
      salesmanOptions: [
        //业务员
      ],
      leaseStateOptions: [
        //出租状态
        {
          value: 0,
          label: "已租",
        },
        {
          value: 1,
          label: "待租",
        },
      ],
      maintenanceStateOptions: [
        //维修状态
        {
          value: 0,
          label: "正常",
        },
        {
          value: 1,
          label: "维修",
        },
      ],
      isVehicle: true, //车辆禁用
      isVehicleType: true, //车型禁用
      isOperation: true, //运营禁用
      isVehicleCard: true, //证件照禁用
      isVehicleSchedule: true, //车辆保养禁用
      vehicleId: "", //车辆ID
      userId: "", //用户id
      typeId:'',//车型id
      imgIdList: [], //图片id
      imgCardIdList: [], //证件照id
      imageUrlList: [], //查看附件图片
      international: {},
      showMsg: "", //新增修改标题
      showButton: false, //确定新增修改按钮
      fileVeInfoList: [], //车辆信息图片
      fileList: [], //车型图片
      cardFileList: [], //证件照电子档
      dialogImageUrl: "", //车型图片url
      dialogVisible: false, //车型图片
      dialogImageUrlCard: "", //证件照url
      dialogVisibleCard: false, //证件照
      dialogVisibleImg: false,
      // dialogVisibleImg1: false,
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      let index = this.imgIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.imgIdList.splice(index, 1);
      this.formVeInformation.efileIdCode = this.imgIdList.join(",");
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.imgIdList.push(response.data.id);
      this.formVeInformation.efileIdCode = this.imgIdList.join(",");
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
    cardHandleRemove(file, fileList) {
      // console.log(file, fileList);
      let index = this.imgCardIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.imgCardIdList.splice(index, 1);
      this.formVehicleCard.efileIdCode = this.imgCardIdList.join(",");
      // console.log(this.imgCardIdList);
    },
    cardHandlePreview(file) {
      this.dialogImageUrlCard = file.url;
      this.dialogVisibleCard = true;
    },
    cardHandleSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.imgCardIdList.push(response.data.id);
      this.formVehicleCard.efileIdCode = this.imgCardIdList.join(",");
    },
    cardHandleError() {
      this.$error("上传失败,请重新上传图片!");
    },
    cardHandleBeforeUpload(file) {
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
    cardHandleExceed() {
      this.$message({
        message: "最多上传2张图片!",
        center: true,
        type: "error",
      });
    },
    cancel() {
      //取消新增修改
      this.$store.commit("changeIsStatus", true);
      if(this.$route.query.form == 'edit'){
        this.$router.push({
          path:"/vehicleManagement",
        });
      }else{
        this.$router.back();
      }
    },
    addVehicleInfo() {
      //新增车辆
      if( this.formVeInformation.vehicleNo == "" || this.formVeInformation.vehicleNo == null)
      {
        this.$message({
          message: "请输入车牌号码",
          center: true,
          type: "error",
        }); 
        return;
      }
      if( this.formVeInformation.vinNo == "" || this.formVeInformation.vinNo == null )
      {
        this.$message({
          message: "请输入车架号",
          center: true,
          type: "error",
        }); 
        return;       
      }
      if (this.formVehicleType.vehicleTypeName == "" ||
        this.formVehicleType.brandName == ""
        ) {
        this.$message({
          message: "请输入车型信息",
          center: true,
          type: "error",
        });
        return;
      }

      if (this.formVeInformation.enterpriseId == "" || this.formVeInformation.enterpriseId == null ) {
        this.$message({
          message: "请输入所属门店",
          center: true,
          type: "error",
        });
        return;
      }

      var time1 = new Date(this.formVeInformation.exFactoryDate).getTime();
      var time2 = new Date(this.formVeInformation.saleDate).getTime();

      if( time1 > time2 )
      {
        this.$message({
          message: "出厂日期大于运营日期",
          center: true,
          type: "error",
        }); 
        return;
      }
      // this.$refs.formVeInformation.validate((valid) => {
      //   if (valid) {
          axios({
            method: "post",
            url: "/vehicle-service/vehicleInfo/insertVehicle",
            headers: this.headers,
            data: this.formVeInformation,
          })
            .then((result) => {
              // console.log(result.data.data)
              if (result.data.status == 0) {
                this.vehicleId = JSON.parse(result.data.data).id;
                this.$message({
                  type: "success",
                  message: "新增成功!",
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
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    editVehicleInfo(){
      //修改车辆
      if( this.formVeInformation.vehicleNo == "" || this.formVeInformation.vehicleNo == null)
      {
        this.$message({
          message: "请输入车牌号码",
          center: true,
          type: "error",
        }); 
        return;
      }
      if( this.formVeInformation.vinNo == "" || this.formVeInformation.vinNo == null )
      {
        this.$message({
          message: "请输入车架号",
          center: true,
          type: "error",
        }); 
        return;       
      }
      if (this.formVehicleType.vehicleTypeName == "" ||
        this.formVehicleType.brandName == ""
        ) {
        this.$message({
          message: "请输入车型信息",
          center: true,
          type: "error",
        });
        return;
      }

      if (this.formVeInformation.enterpriseId == "" || this.formVeInformation.enterpriseId == null ) {
        this.$message({
          message: "请输入所属门店",
          center: true,
          type: "error",
        });
        return;
      }

      var time1 = new Date(this.formVeInformation.exFactoryDate).getTime();
      var time2 = new Date(this.formVeInformation.saleDate).getTime();

      if( time1 > time2 )
      {
        this.$message({
          message: "出厂日期大于运营日期",
          center: true,
          type: "error",
        }); 
        return;
      }
      this.formVeInformation.id = this.$route.query.id;
      // this.$refs.formVeInformation.validate((valid) => {
      //   if (valid) {
          axios({
            method: "post",
            url: "/vehicle-service/vehicleInfo/modifyVehicle",
            headers: this.headers,
            data: this.formVeInformation,
          })
            .then((result) => {
              // console.log(result.data);
              this.isOperation = true;
              if (result.data.status === 0) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
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
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    getVehicleType() {
      //获取车型
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleTypeInfo/queryVehicleTypeListByBrandId?id=" +
          this.formVehicleType.brandName,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.vehicleTypeNameOptions = result.data.data;
          this.formVehicleType.vehicleTypeName = "";
          this.formVehicleType.vehicleLength = "";
          this.formVehicleType.width = "";
          this.formVehicleType.height = ""; 
          this.formVehicleType.axisbase = "";
          this.formVehicleType.wheelbase = "";
          this.formVehicleType.totalMass = "";
          this.formVehicleType.maxLoad = "";
          this.formVehicleType.maxPassengers = "";
          this.formVehicleType.maxSpeed = "";
          this.formVehicleType.vehicleRange = ""; 
          this.formVehicleType.chargingTime = ""; 
          this.formVehicleType.batteryCapacity = "";
          this.fileList = [];
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
    getVehicleTypeDetails() {
      //获取车型详情接口
      // console.log(this.formVehicleType.vehicleTypeName)
      if(this.formVehicleType.vehicleTypeName == null)
      {
        return;
      }
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleTypeInfo/vehicleTypeDetails?id=" +
          this.formVehicleType.vehicleTypeName,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            // this.$store.commit("changeIsStatus", true);
            this.formVehicleType.brandId = result.data.data.brandId;
            this.formVehicleType.id = result.data.data.id;
            this.formVeInformation.typeId = result.data.data.id;
            // this.formVehicleType.brandName = result.data.data.brandName;
            this.formVehicleType.vehicleTypeName = result.data.data.vehicleTypeName;
            this.formVehicleType.vehicleLength = result.data.data.vehicleLength;
            this.formVehicleType.width = result.data.data.width;
            this.formVehicleType.height = result.data.data.height;
            this.formVehicleType.axisbase = result.data.data.axisbase;
            this.formVehicleType.wheelbase = result.data.data.wheelbase;
            this.formVehicleType.totalMass = result.data.data.totalMass;
            this.formVehicleType.maxLoad = result.data.data.maxLoad;
            this.formVehicleType.maxPassengers = result.data.data.maxPassengers;
            this.formVehicleType.maxSpeed = result.data.data.maxSpeed;
            this.formVehicleType.vehicleRange = result.data.data.vehicleRange;
            this.formVehicleType.chargingTime = result.data.data.chargingTime;
            this.formVehicleType.batteryCapacity =
              result.data.data.batteryCapacity;
            this.formVehicleType.monthlyRent = result.data.data.monthlyRent;
            this.formVehicleType.efileIdCode = result.data.data.efileIdCode;
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
          console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    addInsurance() {
      //新增保险记录
      this.$router.push({
        path: "/addInsurance",
        query: { form: "addInsurance", id: this.vehicleId },
      });
    },
    addAS() {
      //新增年检记录
      this.$router.push({
        path: "/addAS",
        // query: { form: "add",vehicleNo: this.formVeInformation.vehicleNo,brand:this.formVehicleType.brandName},
        query: { form: "addAS", id: this.vehicleId },
      });
    },
    getCompany() {
      //所属门店
      axios({
        method: "get",
        url: "/vehicle-service/comboBoxController/getEnterpriseBox",
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.companyOptions = result.data.data;
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
    getVehiclePlace() {
      //存车地点
      axios({
        method: "post",
        url: "/vehicle-service/parkingLotInfo/parkingLotInfoPageQuery",
        headers: this.headers,
        data: {
          parkingName: "",
          currentPage: 1,
          pageSize: 100,
        },
      })
        .then((result) => {
          // console.log(result.data.data.records)
          this.vehiclePlaceOptions = result.data.data.records;
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
    getSalesman() {
      //业务员
      axios({
        method: "get",
        url: "/vehicle-service/comboBoxController/getSalesmanBox",
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.salesmanOptions = result.data.data;
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
    addVehicleCard() {
      //新增证件信息

      var time1 = new Date(this.formVehicleCard.dateOfRegistration).getTime();
      var time2 = new Date(this.formVehicleCard.termOfValidity).getTime();

      // if( this.imgCardIdList.length == 0 )
      // {
      //   this.$message({
      //     message: "请上传图片",
      //     center: true,
      //     type: "error",
      //   });
      //   return;     
      // }

      // console.log(this.vehicleId)
      this.formVehicleCard.vehicleId = this.vehicleId;
      this.$refs.formVehicleCard.validate((valid) => {
          if (valid) {
            if (time1 > time2) {
              this.$message({
                message: "行驶证注册日期大于下次年检日期",
                center: true,
                type: "error",
              });
              return;
            }
            axios({
        method: "post",
        url: "/vehicle-service/vehicleLicenseInfo/saveVehicleLicense",
        headers: this.headers,
        data: this.formVehicleCard,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.isVehicleCard = true;
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    editVehicleCard() {
      //修改证件信息
      var time1 = new Date(this.formVehicleCard.dateOfRegistration).getTime();
      var time2 = new Date(this.formVehicleCard.termOfValidity).getTime();

      if (time1 > time2) {
        this.$message({
          message: "行驶证注册日期大于下次年检日期",
          center: true,
          type: "error",
        });
        return;
      }

      this.formVehicleCard.vehicleId = this.vehicleId;
      axios({
        method: "post",
        url: "/vehicle-service/vehicleLicenseInfo/modifyVehicleLicense",
        headers: this.headers,
        data: this.formVehicleCard,
      })
        .then((result) => {
          // console.log(result.data);
          this.isVehicleCard = true;
          if (result.data.status === 0) {
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
    addSchedule() {
      //新增保养计划表
      // console.log(this.scheduleTableData[0].id)
      for (var i = 0; i < this.scheduleTableData.length; ++i) {
        if (
          (this.scheduleTableData[0].date == null &&
          this.scheduleTableData[0].mileage == null) || (this.scheduleTableData[i].date && this.scheduleTableData[i].mileage == null) || ( this.scheduleTableData[i].date && this.scheduleTableData[i].mileage == '') ||(this.scheduleTableData[i].date == null && this.scheduleTableData[i].mileage) || (this.scheduleTableData[i].date == '' && this.scheduleTableData[i].mileage)
        ) {
          this.$message({
            message: "保养计划表信息空",
            center: true,
            type: "error",
          });
          return;
        }
      }
      axios({
        method: "post",
        url: "/vehicle-service/vehicleMaintplanInfo/insertVehicleMaintplan",
        headers: this.headers,
        data: {
          list: this.scheduleTableData,
          vehicleId: this.vehicleId,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.isVehicleSchedule = true;
          if (result.data.status === 0) {
            this.getScheduleData();
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
    editSchedule() {
      //修改保养计划表
      for (var i = 0; i < this.scheduleTableData.length; ++i) {
        if (
          (this.scheduleTableData[0].date == null &&
          this.scheduleTableData[0].mileage == null) || (this.scheduleTableData[i].date && this.scheduleTableData[i].mileage == null) || ( this.scheduleTableData[i].date && this.scheduleTableData[i].mileage == '') ||(this.scheduleTableData[i].date == null && this.scheduleTableData[i].mileage) || (this.scheduleTableData[i].date == '' && this.scheduleTableData[i].mileage)
        ) {
          this.$message({
            message: "保养计划表信息空",
            center: true,
            type: "error",
          });
          return;
        }
      }
      axios({
        method: "post",
        url: "/vehicle-service/vehicleMaintplanInfo/modifyVehicleMaintplan",
        headers: this.headers,
        data: {
          list: this.scheduleTableData,
          vehicleId: this.vehicleId,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.isVehicleSchedule = true;
          if (result.data.status === 0) {
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
    getScheduleData() {
      //保养计划表详情
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleMaintplanInfo/maintplanInfoListQuery?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if(result.data.data.length == 0){
            (this.scheduleTableData = [
        //车辆保养计划表
        {
          count: "1",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "2",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "3",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "4",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "5",
          date: null,
          id: null,
          mileage: null,
        },
      ])
          }else{
            this.scheduleTableData = result.data.data;
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
    getASData() {
      //年检查询
      axios({
        method: "post",
        url:
          "/vehicle-service/vehicleYearlyinspectionInfo/vehicleYearPageQuery",
        headers: this.headers,
        data: {
          vehicleId: this.$route.query.id,
          currentPage: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          if (result.data.status === 0) {
            result.data.data.records.map(item=>{
              item.yearlyInspectionMoney = formatJE(item.yearlyInspectionMoney)
            })
            this.inspectionTableData = result.data.data.records;
            // this.imageUrlList = result.data.data.records.ls_EfileIdCodeAddr;
            // console.log(this.imageUrlList)
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
    getInsuranceData() {
      //保险查询
      axios({
        method: "post",
        url: "/vehicle-service/vehicleInspolinfo/vehicleInspolinfoPageQuery",
        headers: this.headers,
        data: {
          policyType: null,
          vehicleNo: null,
          id: this.$route.query.id,
          currentPage: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          if (result.data.status === 0) {
            result.data.data.records.map(item=>{
              item.premium = formatJE(item.premium)
            })
            this.insuranceTableData = result.data.data.records;
            // this.imageUrlList = result.data.data.records.ls_EfileIdCodeAddr;
            // console.log(this.imageUrlList)
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
    isVehicleShow() {
      this.isVehicle = false;
    },
    isVehicleTypeShow() {
      this.isVehicleType = false;
    },
    isOperationShow() {
      this.isOperation = false;
    },
    isVehicleCardShow() {
      this.isVehicleCard = false;
    },
    isVehicleScheduleShow() {
      this.isVehicleSchedule = false;
    },
      //查看附件
    handleClick(imgList) {
      this.imageUrlList = []
      if(imgList) this.imageUrlList = imgList
      if(this.imageUrlList<1){
        this.$message.warning({
          message:'暂无图片',
          center:true
        })
      }else{
        this.dialogVisibleImg =true
      }

    },
    // handleClick1() {
    //   //查看附件
    //   this.dialogVisibleImg1 = true;
    // },
    handleLook(index, row) {
      //查看年检记录
      // console.log(row);
      this.$router.push({
        path: "/addAS",
        // query: { form: "add",vehicleNo: this.formVeInformation.vehicleNo,brand:this.formVehicleType.brandName},
        query: { form: "look", id: row.id },
      });
    },
    handleEdit(index, row) {
      //修改年检记录
      // console.log(row)
      this.$router.push({
        path: "/addAS",
        // query: { form: "add",vehicleNo: this.formVeInformation.vehicleNo,brand:this.formVehicleType.brandName},
        query: { id: row.id ,vehicleId:row.vehicleId },
      });
    },
    handleLooks(index, row) {
      //查看保险记录
      this.$router.push({
        path: "/addInsurance",
        query: { form: "look", id: row.vehicleId },
      });
    },
    handleEdits(index, row) {
      //修改保险记录
      // console.log(row);
      this.$router.push({
        path: "/addInsurance",
        query: { form: "edit", id: row.vehicleId },
      });
    },
  },
  mounted() {
    this.$store.commit("changeIsStatus", false);
    if (this.$route.query.form == "add") {
      this.getCompany();
      this.getSalesman();
      this.getVehiclePlace();
      this.showButton = true;
      this.isVehicle = false;
      this.isVehicleType = false;
      this.isOperation = false;
      this.isVehicleCard = false;
      this.isVehicleSchedule = false;
      this.showMsg = "新增 车辆信息";
      //车辆信息
      this.formVeInformation.vehicleNo = null;
      this.formVeInformation.vinNo = null;
      this.formVeInformation.engineNo = null;
      this.formVeInformation.isHasBuslic = null;
      this.formVeInformation.isHasEtc = null;
      this.formVeInformation.isHasRfid = null;
      this.formVeInformation.exFactoryDate = null;
      this.formVeInformation.saleDate = null;
      this.formVeInformation.vehicleColor = null;
      this.formVeInformation.remark = null;
      this.formVeInformation.efileIdCode = null;
      // 车型信息
      this.formVehicleType.brandName = "";
      this.formVehicleType.vehicleTypeName = "";
      this.formVehicleType.vehicleLength = "";
      this.formVehicleType.width = "";
      this.formVehicleType.height = "";
      this.formVehicleType.axisbase = "";
      this.formVehicleType.wheelbase = "";
      this.formVehicleType.totalMass = "";
      this.formVehicleType.maxLoad = "";
      this.formVehicleType.maxPassengers = "";
      this.formVehicleType.maxSpeed = "";
      this.formVehicleType.vehicleRange = "";
      this.formVehicleType.chargingTime = "";
      this.formVehicleType.batteryCapacity = "";
      this.formVehicleType.monthlyRent = "";
      this.formVehicleType.efileIdCode = "";
      // 运营信息
      this.formVeInformation.enterpriseId = null;
      this.formVeInformation.vehicleUsageMode = null;
      this.formVeInformation.parkingLotId = null;
      this.formVeInformation.userId = null;
      this.formVeInformation.vehicleUsageStatus = null;
      this.formVeInformation.vehicleRepairStatus = null;
      // 车辆证件资料
      this.formVehicleCard.drilicNo = null;
      this.formVehicleCard.dateOfRegistration = null;
      this.formVehicleCard.termOfValidity = null;
      this.formVehicleCard.vehicleId = null;
      this.formVehicleCard.efileIdCode = null;

      (this.scheduleTableData = [
        //车辆保养计划表
        {
          count: "1",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "2",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "3",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "4",
          date: null,
          id: null,
          mileage: null,
        },
        {
          count: "5",
          date: null,
          id: null,
          mileage: null,
        },
      ]),
        (this.inspectionTableData = [
          //车辆年检记录
        ]),
        (this.insuranceTableData = [
          //车辆保险记录
        ]);
    } else {
      this.showButton = false;
      this.isVehicle = true;
      this.isVehicleType = true;
      this.isOperation = true;
      this.isVehicleCard = true;
      this.isVehicleSchedule = true;
      this.showMsg = "修改 车辆信息";
      axios({
        method: "get",
        url:
          "/vehicle-service/vehicleInfo/vehicleDetailsQuery?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.vehicleId = this.$route.query.id;
            this.formVeInformation.id = this.$route.query.id;
            this.formVehicleCard.id = result.data.data.licenseId;

            this.formVeInformation.vehicleNo = result.data.data.vehicleNo;
            this.formVeInformation.vinNo = result.data.data.vinNo;
            this.formVeInformation.engineNo = result.data.data.engineNo;
            this.formVeInformation.isHasBuslic = result.data.data.isHasBuslic;
            this.formVeInformation.isHasEtc = result.data.data.isHasEtc;
            this.formVeInformation.isHasRfid = result.data.data.isHasRfid;
            this.formVeInformation.exFactoryDate =
              result.data.data.exFactoryDateStr;
            this.formVeInformation.saleDate = result.data.data.saleDateStr;
            this.formVeInformation.vehicleColor = result.data.data.vehicleColor;
            this.formVeInformation.remark = result.data.data.remark;
            result.data.data.ls_EfileIdCodeAddr.map((res) => {
              return this.imgIdList.push(res.id);
            });
            this.formVeInformation.efileIdCode = this.imgIdList.join(",");
            // 车型信息
            this.formVehicleType.brandName = result.data.data.brandId;
            this.getVehicleType();
            this.formVehicleType.vehicleTypeName = result.data.data.typeId;
            this.typeId = result.data.data.typeId;
            // console.log(this.formVehicleType.vehicleTypeName)
            // var that = this;
            // setTimeout(()=>{
            //   that.getVehicleTypeDetails();
            // },300)
            
            // 运营信息
            this.formVeInformation.enterpriseId =
              result.data.data.enterpriseId;
            this.formVeInformation.vehicleUsageMode =
              result.data.data.vehicleUsageMode;
            this.formVeInformation.parkingLotId =
              result.data.data.parkingLotId;
            this.formVeInformation.userId = result.data.data.userId;
            this.formVeInformation.vehicleUsageStatus =
              result.data.data.vehicleUsageStatus;
            this.formVeInformation.vehicleRepairStatus =
              result.data.data.vehicleRepairStatus;
            // this.formVeInformation.vehicleId = result.data.data.vehicleId;
            // 车辆证件资料
            this.formVehicleCard.drilicNo = result.data.data.licenseNo;
            this.formVehicleCard.dateOfRegistration =
              result.data.data.dateOfRegistration;
            this.formVehicleCard.termOfValidity =
              result.data.data.termOfValidityStr;
            // this.formVehicleCard.efileIdCode = result.data.data.efileIdCodeVehicleLicense;
            this.fileVeInfoList = result.data.data.ls_EfileIdCodeAddr; //车辆图片
            this.fileList = result.data.data.ls_efileIdCodeVehicleTypeAddr; //车型图片
            this.cardFileList =
              result.data.data.ls_efileIdCodeVehicleLicenseAddr; //证件照图片
            result.data.data.ls_efileIdCodeVehicleLicenseAddr.map((item)=>{
              return this.imgCardIdList.push(item.id);
            })
            this.getScheduleData();
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
      this.getCompany();
      this.getSalesman();
      this.getVehiclePlace();
      this.getASData();
      this.getInsuranceData();
    }
    axios({
      //品牌
      method: "post",
      url: "/vehicle-service/brandInfo/brandInfoListQuery",
      headers: this.headers,
    })
      .then((result) => {
        // console.log(result.data);
        this.brandNameOptions = result.data.data;
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
    typeId:function(){
      var _this = this;
      _this.$nextTick(()=>{
        _this.getVehicleTypeDetails();
      })
    }
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
.footerTitles {
  width: 100%;
  height: 40px;
  float: left;
  line-height: 40px;
  box-sizing: border-box;
  padding-left: 40px;
  margin-bottom: 40px;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
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
/* .nav {
  width: 25%;
  height: 60px;
  display: flex;
  align-items: center;
  float: left;
}
.nav .el-input {
  width: 170px;
}
.nav .el-input__inner {
  width: 170px;
}
.nav >>> .el-input--suffix {
  width: 170px;
}
.nav span {
  color: #333333;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 12px;
  line-height: 18px;
  margin-left: 20px;
  margin-right: 5px;
} */

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
.formNavs .el-form-item:last-child {
  width: 100%;
}
.footerNav .el-input {
  width: 170px;
}

.footerNav .el-input__inner {
  width: 170px;
}

.footerNav >>> .el-input--suffix {
  width: 170px;
}
/* 图片 */
.upload_txt {
  color: #368cfe;
  text-decoration: underline;
  white-space: nowrap;
}
.disabled_txt{
  color: #999;
  text-decoration:underline;
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
.imgSrc {
  float: left;
  margin-left: 10px;
  width: 60px;
  height: 60px;
}
#header >>> .el-dialog__body{
  padding: 0;
}
#header >>> .el-dialog__header{
  padding: 0;
}
#header >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#header>>> .el-dialog__close{
  color: #fff;
}
#header >>>.el-carousel__button{
  width: 12px;
}
.imgList{
  width: 500px;
  height: 400px ;
  display: block;
}

</style>
