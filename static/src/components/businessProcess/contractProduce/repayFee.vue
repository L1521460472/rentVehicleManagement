<template>
  <div id="payFee">
    <div class="header scoped">
      <span>审核操作</span>
    </div>
    <div class="footer" v-if="international.title">
      <div class="footerTop">
        <div class="footerTitle">
          <span>合同当期账单</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="135px" label-position="right">
            <el-form-item class="formItem" label="合同编号">
              <el-input disabled size="small" v-model="form.contractCode"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="承租人">
              <el-input disabled size="small" v-model="form.customerName"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="剩余未回款总额(元)">
              <el-input disabled size="small" v-model="form.uncollectionMoneyTotal"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="应收期数">
              <el-input disabled size="small" v-model="form.billPeriods"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="应收金额(元)">
              <el-input disabled size="small" v-model="form.adjustedPaybackMoney"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="当期未回款金额(元)">
              <el-input disabled size="small" v-model="form.currPeriodUnClooectionMoney"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="滞纳金(元)">
              <el-input disabled size="small" v-model="form.lateFee"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>回款信息</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="125px" label-position="right">
            <el-form-item
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
            prop="getFeeTime"
            class="formItem"
            label="收款时间">
              <el-date-picker
                size="small"
                v-model="form.getFeeTime"
                prefix-icon="el-icon-time2"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="date"
                placeholder
              ></el-date-picker>
            </el-form-item>
            <el-form-item
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
            class="formItem"
            prop="getFee"
            label="收款金额(元)">
              <el-input size="small" v-model="form.getFee"></el-input>
            </el-form-item>
            <el-form-item
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
            prop="collectionAccount"
            class="formItem"
            label="收款账户">
              <el-select size="small" filterable v-model="form.belongCompany" placeholder @change="changeCompany">
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select size="small" class="bank"  v-model="form.collectionAccount" placeholder  @change="changeCompany2">
                <el-option
                  v-for="item in collectionList"
                  :key="item.id"
                  :label="item.bankTypeAndOfDeposit"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="formItem" label="备注">
              <el-input size="small" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
            class="formItem"
            label="附件">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=8"
                :headers="headers"
                :limit="3"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleUploadSuccess"
                :file-list="imgList"
                list-type="picture-card"
                multiple
              >
                <span class="upload_txt disabled_txt">上传附件</span>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>关联车辆</span>
        </div>
        <div class="footerNav">
          <p class="vehicleNumber">
            已关联{{selectData.length}}辆车
            <span class="SelectVehicle" @click="selectCar">[点击选择]</span>
          </p>
          <el-form
            v-for="item in selectData"
            :key="item.vehicleId"
            :model="form"
            label-width="135px"
            label-position="right"
          >
            <span class="formItem car">{{item.vehicleNo}}(剩余未回款总额：{{item.uncollectionMoneyTotal}}元)</span>
            <el-form-item class="formItem" label="应收期数">
              <el-input disabled size="small" v-model="item.billPeriods"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="本次回款金额(元)">
              <el-input disabled size="small" v-model="item.adjustedPaybackMoney"></el-input>
            </el-form-item>
          </el-form>
          <div class="advancePayment " v-if="selectData.length>0">
            <span class="demonstration">计入预收款(元)</span>
            <el-input disabled size="small"  v-model="advancePayment"></el-input>
          </div>
        </div>
      </div>
      <div class="footerButton">
        <el-button type="primary" size="small" @click="addConfirm">提交</el-button>
        <el-button size="small" @click="cancel">返回</el-button>
      </div>
      <!-- 选择车辆弹窗 -->
      <el-dialog class="selectToast" :visible.sync="showSelectModle" :close-on-click-modal="false" title="选择车辆" top="200px" width="740px">
          <el-table
              ref="multipleTable"
              size="mini"
              border
              :data="vehicleList2"
              tooltip-effect="dark"
              style="width:100%;"
              @selection-change="handleSelectionChange"
              >
                  <el-table-column type="selection" prop="id" align="center" width="40"></el-table-column>
                  <el-table-column
                  prop="vehicleNo"
                  label="车牌号"
                  align="center"
                  width="100">
                  </el-table-column>
                  <el-table-column
                  prop="uncollectionMoneyTotal"
                  label="剩余未回款总额(元)"
                  align="center"
                  width="125">
                  </el-table-column>
                  <el-table-column
                  prop="billPeriods"
                  label="应收期数"
                  align="center"
                  width="100">
                    <template slot-scope="scope">
                      <span v-if="scope.row.billPeriods == 0">押金</span>
                      <span v-else>{{scope.row.billPeriods}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                  prop="adjustedPaybackMoney"
                  label="应收金额(元)"
                  align="center"
                  width="95">
                  </el-table-column>
                  <el-table-column
                  prop="uncollectionMoney"
                  label="当期未回款金额(元)"
                  align="center"
                  width="125">
                  </el-table-column>
                  <el-table-column
                  label="本次回款金额(元)"
                  align="center"
                  min-width="110">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.adjustedPaybackMoney" size="small" @blur="changeInput($event)"></el-input>
                    </template>
                  </el-table-column>
          </el-table>
          <p>已关联{{val.length}}辆车，核销金额：{{confirmFee}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="showSelectModle = false">取 消</el-button>
          <el-button size="small" type="primary" @click="selectConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 图片放大弹窗 -->
      <el-dialog class="imgSrc" :visible.sync="dialogVisible" width="500px">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { payFeeDetail, submitPayment,getEnterpriseList,getFeeAccount } from "@/api/businessProcess/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
  formatJE,formatDate
} from "../../../public";
export default {
  name: "repayFee",
  data() {
    return {
      form: {
        contractCode: "", //合同编号
        customerName: "", //承租方姓名
        uncollectionMoneyTotal: "", //剩余未回款总额
        billPeriods: "", //应收期数
        adjustedPaybackMoney: "", //应收金额
        currPeriodUnClooectionMoney: "", //当期未回款金额
        lateFee: "", //滞纳金
        getFeeTime: "", //收款时间
        getFee: "", //收款金额
        belongCompany: "", //收款账号归属公司
        collectionAccount: "", //收款账号
        remark: "", //备注
        contractRentId:"",//合同回款计划id
        collectionAccountId:""//收款账号ID
      },
      formAudit: {
        id: "",
        status: 0,
        auditSuggestion: "",
        rentTimeStr:'',
        collectionAccountId:''
      },
      companyList: [], //收款公司列表
      collectionList: [], //收款账号
      vehicleList: [], //合同车列表
      vehicleList2:[],
      imgList: [], //附件
      imgIdList:[],//上传的附件id
      advancePayment:0,//计入预收款
      showSelectModle:false,
      dialogVisible:false,
      dialogImageUrl:'',
      selectData:[],//选择的车辆数据
      val:[],
      confirmFee:0,//核销金额
      international: {},
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    // 提交
    addConfirm() {
      this.$refs.form.validate((valid)=>{
        if(valid){
          if(this.imgIdList.length < 1){
            this.$message.error({
              message:'附件不能为空',
              center:true
            })
            return
          }
          if(this.selectData.length < 1){
            this.$message.error({
              message:'请选择关联车辆',
              center:true
            })
            return
          }
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          this.timer = setTimeout(function () {
            _this.timer = null;
            let vehiclePaymentDtos = []
            _this.selectData.map(item=>{
              let obj ={}
              obj.billPeriods = item.billPeriods
              obj.paybackMoney = item.adjustedPaybackMoney0
              obj.vehicleId = item.vehicleId
              obj.vehicleNo = item.vehicleNo
              obj.vehicleRentId = item.contractVehicleRentId
              vehiclePaymentDtos.push(obj)
            })
            let rentTime=formatDate(_this.form.getFeeTime,'yyyy-MM-dd HH:mm')
            let params = {
              billPeriods: _this.form.billPeriods, //应收期数
              collectionAccountId: _this.form.collectionAccountId, //收款账户id
              contractCode: _this.form.contractCode, //合同编号
              contractId: _this.$route.query.id, //合同id
              contractRentId: _this.form.contractRentId, //合同回款计划id
              efileIdList: _this.imgIdList, //附件集合
              payMoney: _this.form.getFee, //缴费金额
              rentTime:rentTime,//缴费时间
              payType: 1, //缴费渠道1-web后台 2-App提交
              remark:_this.form.remark,
              preCollectMoney: _this.advancePayment, //预收金额
              vehiclePaymentDtos: vehiclePaymentDtos, //车辆缴费数据集合
            };
            submitPayment(params, _this.headers)
              .then((res) => {
                if(res.status == 0){
                  _this.$store.commit("changeIsStatus", true);
                  _this.$message.success({
                    message:'缴费提交成功',
                    center:true
                  })
                  _this.$router.back();
                }else{
                  _this.$message.error({
                    message:'缴费提交失败 ',
                    center:true
                  })
                }
              })
              .catch((err) => {console.log(err)});
          }, 1000);

        }
      })
    },
    // 返回
    cancel() {
      this.$router.back();
    },
    // 上传文件超出回调
    handleExceed(files, fileList) {
      this.$message.error({
        message: "图片不能超过三张",
        center: true,
      });
    },
    // 上传成功回调
    handleUploadSuccess(response, file, fileList) {
      if(response.status == 0){
        this.imgIdList.push(response.data.id);
      }else{
        this.$message.error({
          message:'回款信息附件上传失败，请上传png/jpg格式的图片',
          center:true
        })
      }

    },
    handleRemove(file, fileList) {
      let index = this.imgIdList.indexOf(
        file.response ? file.response.data.id : file.id
      );
      this.imgIdList.splice(index, 1);
    },
    // 点击放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 选择车辆
    selectCar() {
      if(this.form.getFee===''){
        this.$message.warning({
          message:'请先填写收款金额',
          center:true
        })
        return
      }
      let fee = this.form.getFee
      this.vehicleList.map(item=>{
        if(fee > 0 && fee >= Number(item.uncollectionMoney)){
          item.adjustedPaybackMoney =  item.uncollectionMoney
          fee = fee-item.uncollectionMoney
        }else if(fee > 0 && fee < Number(item.uncollectionMoney)){
          item.adjustedPaybackMoney =  fee
          fee = 0
        }else{
          item.adjustedPaybackMoney =  0
          fee = 0
        }
      })
      this.vehicleList2 = this.vehicleList
      // this.advancePayment = fee
      this.showSelectModle = true
    },
    // 选择车辆确认
    selectConfirm(){
      if(this.confirmFee - this.form.getFee > 0){
        this.$message.error({
          message:'核销金额应小于等于收款金额',
          center:true
        })
        return
      }
      this.val.map(item=>{
        if(item.adjustedPaybackMoney - item.uncollectionMoney > 0){
          this.$message.error({
            message:'本次回款金额应小于等于当期未回款金额',
            center:true
          })
          return
        }
      })
      this.selectData = this.val
      this.advancePayment = this.form.getFee - this.confirmFee
      this.showSelectModle = false
    },
    changeInput(e){
      this.confirmFee = 0
      this.val.map(item=>{
        this.confirmFee = this.confirmFee + Number(item.adjustedPaybackMoney)
      })
    },
    //选择车辆数据
    handleSelectionChange(val) {
      this.val = val;
      this.confirmFee = 0
      val.map(item=>{
        this.confirmFee =this.confirmFee + Number(item.adjustedPaybackMoney)
      })
    },
    // 获取公司列表
    getListInfo(){
      getEnterpriseList({},this.headers).then(res=>{
        this.companyList = res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    // 获取选择公司的收费账号列表
    changeCompany(val){
      getFeeAccount({ id: val }, this.headers).then(res=>{
        this.collectionList = res.data
        // console.log('执行力')
        this.form.collectionAccount = ''
      }).catch(err=>{console.log(err)})

    },
    changeCompany2(val){
       this.form.collectionAccountId = val;
    },
    // 获取缴费详情数据
    initData(){
      axios({
        method: "get",
        url: "/vehicle-service/rentCollectionInfo/goPayCostResubmit?id=" + this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status == 0) {
            this.form.contractCode = result.data.data.leaseContractCurrentBillVO.contractCode; //合同编号
            this.form.customerName = result.data.data.leaseContractCurrentBillVO.customerName; //承租方姓名
            this.form.uncollectionMoneyTotal = result.data.data.leaseContractCurrentBillVO.uncollectionMoneyTotal; //剩余未回款总额
            this.form.billPeriods = result.data.data.leaseContractCurrentBillVO.billPeriods; //应收期数
            this.form.adjustedPaybackMoney = result.data.data.leaseContractCurrentBillVO.adjustedPaybackMoney; //应收金额
            this.form.currPeriodUnClooectionMoney = result.data.data.leaseContractCurrentBillVO.currPeriodUnClooectionMoney; //当期未回款金额
            this.form.lateFee = result.data.data.leaseContractCurrentBillVO.lateFee; //滞纳金

            this.form.getFeeTime = new Date(result.data.data.collectionInfoVO.rentTimeStr); //收款时间
            this.form.getFee = result.data.data.collectionInfoVO.rentMoney; //getFee: "", //收款金额
            this.form.belongCompany = result.data.data.collectionInfoVO.accountEnterpriseId; //收款公司
            this.form.collectionAccount = result.data.data.collectionInfoVO.bankTypeName; //收款账号
            this.form.collectionAccountId=result.data.data.collectionInfoVO.collectionAccountId; //收款账号ID
            getFeeAccount({ id: this.form.belongCompany }, this.headers).then(res=>{
              this.collectionList = res.data
            }).catch(err=>{console.log(err)})
            this.form.remark = result.data.data.collectionInfoVO.remark; //备注
            this.imgList = result.data.data.collectionInfoVO.efileIdList;
            if(this.imgList&&this.imgList.length>0){
              this.imgList.map((item)=>{
                this.imgIdList.push(item.id)
              })
            }

            this.form.contractRentId = result.data.data.leaseContractCurrentBillVO.contractRentId; //合同回款计划id
            result.data.data.vehicleCurrentBillVOList.map(item=>{
              item.uncollectionMoneyTotal = formatJE(item.uncollectionMoneyTotal)
              item.adjustedPaybackMoney0=item.adjustedPaybackMoney
              item.adjustedPaybackMoney = formatJE(item.adjustedPaybackMoney)
              item.uncollectionMoney = formatJE(item.uncollectionMoney)
              item.currPeriodPlaybackMoney = formatJE(item.currPeriodPlaybackMoney)
            })
            this.vehicleList = result.data.data.vehicleCurrentBillVOList; //合同车辆
            this.selectData = result.data.data.vehicleCurrentBillVOList; //合同车辆
            this.advancePayment = result.data.data.collectionInfoVO.preCollectMoney;
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
    }
  },
  mounted() {
    this.getListInfo();
    this.initData();
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
#payFee {
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
.upload_txt {
  color: #368cfe;
  text-decoration: underline;
  white-space: nowrap;
  /* float: left; */
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
.vehicleNumber {
  font-size: 14px;
  margin-top: 0;
  margin: 0 0 14px 70px;
  color: #606266;
}
.SelectVehicle {
  cursor: pointer;
  color: #368cfe;
  margin-left: 80px;
}
.car{
  font-size: 14px;
  margin-top: 0;
  margin: 0 0 14px 70px;
  color: #606266;
  min-width: 225px;
  line-height: 32px;
  display: block;
  white-space: nowrap;
}
.demonstration {
  display: inline-block;
  /* width: 60px; */
  font-size: 12px;
  margin-left: 70px;
  margin-right: 10px;
  text-align: right;
  color: #333333;
}
.advancePayment{
  padding-bottom: 20px;
}
.imgSrc >>> .el-dialog__body {
  padding: 0;
}
.imgSrc >>> .el-dialog__header {
  padding: 0;
}
.imgSrc >>> .el-dialog__headerbtn {
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#payFee >>> .el-dialog__close {
  color: #fff;
}
.el-dialog__body img {
  display: block;
}
.selectToast >>> .el-dialog__header{
  padding: 20px !important;
}
.selectToast >>> .el-dialog__footer{
    text-align: center ;
}
.bank{
  width: 300px !important;
}
.bank >>> .el-input--suffix{
  width: 100% !important;
}
</style>
