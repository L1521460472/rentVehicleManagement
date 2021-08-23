<template>
  <div id="payFee">
    <div class="header scoped">
      <span>租金抵扣</span>
    </div>
    <div class="footer">
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
              <el-input disabled size="small" v-model="form.lateFee"></el-input> (滞纳金退车时结算)
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>抵扣信息</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="135px" label-position="right">
            <el-form-item  :rules="[{ required: true,message:'内容不能为空', trigger: 'change'}]"
            prop="getFeeTime" class="formItem"  label="抵扣时间">
              <el-date-picker size="small" v-model="form.getFeeTime" prefix-icon="el-icon-time2"
                format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetime"></el-date-picker>
            </el-form-item>
            <el-form-item  :rules="[{ required: true,message:'内容不能为空', trigger: 'blur'}]"
              class="formItem"  prop="getFee" label="抵扣金额(元)">
            <el-input size="small" disabled v-model="form.getFee"></el-input>
            </el-form-item>
            <el-form-item  :rules="[{ required: true,message:'内容不能为空', trigger: 'blur'}]"
              class="formItem"  prop="reductionType" label="抵扣类型">
            <makeSelect :disabled="true" v-model="form.reductionType" :options="[{name:'故障/维修抵扣',value:1},{
             name:'事故/出险抵扣',value:2}, { name:'自行保养抵扣',value:3 }]"></makeSelect>
            </el-form-item>
            <el-form-item class="formItem" label="备注">
              <el-input disabled size="small" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item
            :rules="[{ required: true,message:'内容不能为空', trigger: 'blur'}]"
            class="formItem"
            label="附件">
              <el-upload disabled class="upload" action="/vehicle-service/efileInfo/uploadImgFile?fileType=8" :headers="headers"
                :limit="3" :on-exceed="handleExceed" :on-preview="handlePreview"  :on-remove="handleRemove"
                :on-success="handleUploadSuccess"  :file-list="imgList" list-type="picture-card"  multiple>
                <span class="upload_txt">上传附件</span>
              </el-upload>
            </el-form-item>
            <div class="el-form-item formItem el-form-item--small"
            style="margin-left: 46px;font-size: 14px;width: 1000px;">（审核通过后，将此抵扣金额转为此期已交此金额；）</div>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>关联车辆</span>
        </div>
        <div class="footerNav">
          <p class="vehicleNumber">
            已关联{{selectData.length}}辆车
            <span class="SelectVehicle" @click="selectCar">详情</span>
          </p>
          <el-form v-for="item in selectData" :key="item.vehicleId" :model="form" label-width="135px" label-position="right">
            <span class="formItem car">{{item.vehicleNo}}(剩余未回款总额：{{item.uncollectionMoneyTotal}}元)</span>
            <el-form-item class="formItem" label="应收期数">
              <el-input disabled size="small" v-model="item.billPeriods"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="本次回款金额(元)">
              <el-input disabled size="small" v-model="item.currPeriodPlaybackMoney"></el-input>
            </el-form-item>
          </el-form>
          <div class="advancePayment " v-if="selectData.length>0">
            <span class="demonstration">计入预收款(元)</span>
            <el-input disabled size="small"  v-model="advancePayment"></el-input>
          </div>
        </div>
        <div class="footerTitle">
            <span>审核信息</span>
          </div>
          <div class="footerNav">
                <el-form ref="formAudit" :model="formAudit" label-width="130px" label-position="right">
                  <el-form-item label="审核结果">
                    <el-radio v-model="formAudit.status" :label="0">通过</el-radio>
                    <el-radio v-model="formAudit.status" :label="1">拒绝</el-radio>
                  </el-form-item>
                  <el-form-item
                    label="审核意见"
                    prop="auditSuggestion"
                    :rules="[{required: true,message:'审核意见不能为空',trigger: 'blur'}]"
                  >
                    <el-input
                      maxlength="500"
                      style="width:800px"
                      placeholder="请输入审核意见"
                      type="textarea"
                      :rows="5"
                      size="small"
                      v-model="formAudit.auditSuggestion"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
        </div>
      </div>
      <div class="footerButton">
        <el-button type="primary" size="small" @click="addConfirm">提交</el-button>
        <el-button size="small" @click="cancel">返回</el-button>
      </div>
      <!-- 选择车辆弹窗 -->
      <el-dialog class="selectToast" :visible.sync="showSelectModle" :close-on-click-modal="false" title="选择车辆" top="200px" width="740px">
          <el-table ref="multipleTable" size="mini" border :data="vehicleList2" tooltip-effect="dark" style="width:100%;" >
                  <el-table-column prop="vehicleNo"  label="车牌号"  align="center" width="100">
                  </el-table-column>
                  <el-table-column prop="uncollectionMoneyTotal" label="剩余未回款总额(元)" align="center" width="125">
                  </el-table-column>
                  <el-table-column prop="billPeriods" label="应收期数" align="center" width="100">
                    <template slot-scope="scope">
                      <span v-if="scope.row.billPeriods == 0">押金</span>
                      <span v-else>{{scope.row.billPeriods}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="adjustedPaybackMoney" label="应收金额(元)" align="center" width="95">
                  </el-table-column>
                  <el-table-column prop="uncollectionMoney" label="当期未回款金额(元)" align="center" width="125">
                  </el-table-column>
                  <el-table-column prop="currPeriodPlaybackMoney" label="本次回款金额(元)" align="center" min-width="110">
                  </el-table-column>
          </el-table>
          <!-- <p>已关联{{val.length}}辆车，核销金额：{{confirmFee}}</p> -->
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="showSelectModle = false">取 消</el-button>
          <el-button size="small" type="primary" @click="selectConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 图片放大弹窗 -->
      <el-dialog class="imgSrc" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { payFeeDetail, submitPayment,getEnterpriseList,getFeeAccount } from "../../../api/businessProcess/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
  formatDate
} from "../../../public";
export default {
  name: "rentAudting",
  data() {
    return {
      formAudit:{
       id: "",
       status: 0,
       auditSuggestion: "",
       rentTimeStr:'',
       collectionAccountId:'-1'
      },
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
        reductionType:null,//抵扣类型(1-故障/维修抵扣 2-事故/出险抵扣 3-自行保养抵扣)
        collectionType:2//缴费类型(1-缴费 2-租金抵扣 3-预收款抵扣)
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
      timer: null,
      confirmFee:0,//核销金额
      international: {},
      collectionType:0,//缴费类型(0-未延期账单缴费 1-延期账单缴费)
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    // 提交
    addConfirm() {
      //
      if(!this.form.getFeeTime){
        this.$message.error('收款时间不能为空')
        return
      }
      if(!this.formAudit.auditSuggestion){
        this.$message.error('审核意见不能为空')
        return
      }
      this.formAudit.rentTimeStr=formatDate(this.form.getFeeTime,"yyyy-MM-dd HH:mm")
      this.$axios.post("/vehicle-service/rentCollectionInfo/submitPayCostAuditing",this.formAudit,{headers:this.headers})
      .then((res)=>{
          res=res.data
          if(res.status==0){
            this.$store.commit("changeIsStatus", true);
            this.$message.success('审核完成')
            this.$router.back();
          }
          else{
            this.$message.error(res.message)
          }
      })
      .catch((err)=>{
        this.$message.error(err.message)
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
          message:`回款附件上传失败：${response.message}`,
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
      this.showSelectModle = true
    },
    // 选择车辆确认
    selectConfirm(){
      this.showSelectModle = false
    },
    changeInput(e){
      this.confirmFee = 0
      this.val.map(item=>{
        this.confirmFee = this.confirmFee + Number(item.payfee)
      })
    },
    //选择车辆数据
    handleSelectionChange(val) {
      this.val = val;
      this.confirmFee = 0
      val.map(item=>{
        this.confirmFee =this.confirmFee + Number(item.payfee)
      })
    },
    // 获取缴费详情数据
    getDetail(){
      this.$axios.get(`/vehicle-service/rentCollectionInfo/goPayCostAuditing?id=${this.$route.query.id}`,{headers:this.headers})
      .then((res)=>{
        res=res.data
        if (res.status == 0) {
            setTimeout(() => {
            window.onload()
          }, 10)
          let leaseContractCurrentBillVO=res.data.leaseContractCurrentBillVO
          this.form.contractCode = leaseContractCurrentBillVO.contractCode, //合同编号
          this.form.customerName = leaseContractCurrentBillVO.customerName, //承租方姓名
          this.form.uncollectionMoneyTotal = leaseContractCurrentBillVO.uncollectionMoneyTotal, //剩余未回款总额
          this.form.billPeriods = leaseContractCurrentBillVO.billPeriods;//应收期数
          this.form.adjustedPaybackMoney = leaseContractCurrentBillVO.adjustedPaybackMoney, //应收金额
          this.form.currPeriodUnClooectionMoney =leaseContractCurrentBillVO.currPeriodUnClooectionMoney, //当期未回款金额
          this.form.lateFee = leaseContractCurrentBillVO.lateFee; //滞纳金
          this.form.contractRentId = leaseContractCurrentBillVO.contractRentId //合同回款计划id

          let collectionInfoVO=res.data.collectionInfoVO
          this.form.getFeeTime=collectionInfoVO.rentTime
          this.form.getFee=collectionInfoVO.rentMoney
          this.form.reductionType=collectionInfoVO.reductionType
          this.form.remark=collectionInfoVO.remark
          this.imgList=collectionInfoVO.efileIdList
          this.formAudit.id=collectionInfoVO.id

          let vehicleCurrentBillVOList=res.data.vehicleCurrentBillVOList
          this.selectData=vehicleCurrentBillVOList

          this.advancePayment =collectionInfoVO.preCollectMoney;
          this.vehicleList2=vehicleCurrentBillVOList
        } else {
          this.$message.error({
            message: res.message,
            center: true,
          });
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.getDetail()
  },
  computed: {
    // 计算国际化标题和按钮
    // internationalTitle() {
    //   return this.$store.state.languageTitle;
    // },
  },
  watch: {
    // 监听国际化标题和按钮变化
    // internationalTitle: {
    //   handler(data) {
    //     this.international = data;
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
};
</script>
<style scoped>
#payFee {
  width: 100%;
  height: calc(100% - 117px);
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
  height: calc(100% - 1px);
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
.select >>> .el-input--suffix {
  width: 290px;
}
#payFee>>>.el-input--suffix .el-input__inner{
  padding-left: 15px;
}
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

</style>
