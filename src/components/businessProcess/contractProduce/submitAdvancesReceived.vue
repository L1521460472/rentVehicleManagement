<template>
  <div id="payFee" v-loading="loading">
    <div class="header scoped">
      <span>预收款管理</span>
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
          <span>预收款转租金</span><el-button style="margin-left: 10px;" type="primary" @click="jumpto">操作记录</el-button>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="135px" label-position="right">
            <el-form-item class="formItem"  prop="balance" label="预收款余额">
            <el-input size="small" disabled v-model="form.balance"></el-input>
            </el-form-item>
            <el-form-item  :rules="[{ required: true,message:'内容不能为空', trigger: 'blur'}]"
              class="formItem"  prop="payMoney" label="转租金金额">
            <el-input size="small" v-model="form.payMoney"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="备注">
              <el-input size="small" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item
            :rules="[{ required: true,message:'内容不能为空', trigger: 'blur'}]"
            class="formItem"
            label="附件">
              <el-upload class="upload" action="/vehicle-service/efileInfo/uploadImgFile?fileType=8" :headers="headers"
                :limit="3" :on-exceed="handleExceed" :on-preview="handlePreview"  :on-remove="handleRemove"
                :on-success="handleUploadSuccess"  :file-list="imgList" list-type="picture-card"  multiple>
                <span class="upload_txt">上传附件</span>
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
          <el-form v-for="item in selectData" :key="item.vehicleId" :model="form" label-width="135px" label-position="right">
            <span class="formItem car">{{item.vehicleNo}}(剩余未回款总额：{{item.uncollectionMoneyTotal}}元)</span>
            <el-form-item class="formItem" label="应收期数">
              <el-input disabled size="small" v-model="item.billPeriods"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="本次回款金额(元)">
              <el-input disabled size="small" v-model="item.payfee"></el-input>
            </el-form-item>
          </el-form>
         <div class="advancePayment " v-if="selectData.length>0">
            <span class="demonstration">核销金额(元)</span>
            <el-input disabled size="small"  v-model="confirmFee"></el-input>
          </div>
        </div>
      </div>
      <div class="footerButton">
        <el-button type="primary" size="small" @click="addConfirm" v-if="addbtn">提交</el-button>
        <el-button size="small" @click="cancel">返回</el-button>
      </div>
      <!-- 选择车辆弹窗 -->
      <el-dialog class="selectToast" :visible.sync="showSelectModle" :close-on-click-modal="false" title="选择车辆" top="200px" width="740px" append-to-body>
          <el-table ref="multipleTable" size="mini" border :data="vehicleList2" tooltip-effect="dark" style="width:100%;"
              @selection-change="handleSelectionChange" >
                  <el-table-column type="selection" prop="id" align="center" width="40"></el-table-column>
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
                  <el-table-column label="本次回款金额(元)" align="center" min-width="110">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.payfee" size="small" @blur="changeInput($event)"></el-input>
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
      <div class="showimage" style="position: absolute;width: 0px; height: 0px">
       <el-image ref="showimage" style="width: 0px; height: 0px" :src="dialogImageUrl"  :preview-src-list="imageUrlList"></el-image>
      </div>
    </div>
    <!-- 操作记录 -->
    <el-dialog :visible.sync="showysk" width="70%" top="40px" ref="eldialog" :lock-scroll="true"
    :before-close="beforclose" append-to-body>
      <submitAdvancesReceivedRecord ref="submitAdvancesReceivedRecord" :contractid="contractid" @closedialog="closedialog"></submitAdvancesReceivedRecord>
    </el-dialog>
  </div>
</template>
<script>
import { submitPayment,getEnterpriseList,getFeeAccount } from "../../../api/businessProcess/api";
import submitAdvancesReceivedRecord from "@/components/businessProcess/contractProduce/submitAdvancesReceivedRecord.vue"
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
  formatDate,
  openNewTab
} from "../../../public";
export default {
  components:{
    submitAdvancesReceivedRecord
  },
  name: "submitAdvancesReceived",
  data() {
    return {
      showysk:false,
      loading:false,
      imageUrlList:null,
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
        collectionType:2,//缴费类型(1-缴费 2-租金抵扣 3-预收款抵扣)
        balance:"",//预收款余额
        payMoney:"",//转租金金额
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
      id:this.contractid?this.contractid:this.$route.query.contractid,
      iszujian:false,
      addbtn:true
    };
  },
  props:{
    contractid:{
      type:[String,Number],
      default(){
        return ""
      }
    }
  },
  methods: {
    closedialog(){
      if(this.iszujian){
         this.showysk=false
      }
     else{
       this.$router.back()
     }
    },
    beforclose( done){
       done()
    },
    jumpto(){
      this.showysk=true
    },
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
              obj.paybackMoney = item.payfee
              obj.vehicleId = item.vehicleId
              obj.vehicleNo = item.vehicleNo
              obj.vehicleRentId = item.vehicleRentId
              vehiclePaymentDtos.push(obj)
            })
            let params = {
              billPeriods: _this.collectionType==1?0:_this.form.billPeriods, //应收期数
              collectionAccountId: -1, //收款账户id
              contractCode: _this.form.contractCode, //合同编号
              contractId: _this.id, //合同id
              contractRentId: _this.form.contractRentId, //合同回款计划id
              efileIdList: _this.imgIdList, //附件集合
              payMoney: _this.form.payMoney, //缴费金额
              payType: 1, //缴费渠道1-web后台 2-App提交
              remark:_this.form.remark,
              preCollectMoney: _this.advancePayment, //预收金额
              vehiclePaymentDtos: vehiclePaymentDtos, //车辆缴费数据集合
              reductionType:0,
              collectionType:3,
              rentTime:formatDate(new Date(),'yyyy-MM-dd HH:mm')
            };
            _this.$confirm('确认后，将此金额从预付款扣除，转为此期的已交金额, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             })
            .then(()=>{
              _this.$axios.post('/vehicle-service/advancesReceivedRecord/submitAdvancesReceived',
                  params,
                  {headers:_this.headers})
              .then((res) => {
                  res=res.data
                  if(res.status == 0){
                    _this.$store.commit("changeIsStatus", true);
                    _this.$message.success({
                      message:'提交成功',
                      center:true
                    })
                    _this.cancel()
                  }else{
                    _this.$message.error({
                      message:'提交失败',
                      center:true
                    })
                  }
                })
                .catch((err) => {
                  _this.$message.error(err.message)
                });
            })
            .catch((err)=>{
               _this.$message.error(err.message)
              console.log("用户取消提交预收款")
            })
          }, 1000);
        }
      })
    },
    // 返回
    cancel() {
      if(this.iszujian){
        this.selectData=[]
        this.imgIdList=[]
        this.imgList=[]
        this.dialogImageUrl=""
        this.imageUrlList=null
        this.form.payMoney=""
        this.form.remark=""
        this.$emit("closedialog","")
      }
      else{
        this.$router.back();
      }
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
      this.imageUrlList=[this.dialogImageUrl]
      this.$refs.showimage.$el.children[0].click()
    },
    // 选择车辆
    selectCar() {
      if(this.form.payMoney===''){
        this.$message.warning({
          message:'请先填写转租金金额',
          center:true
        })
        return
      }
      let fee = this.form.getFee
      this.vehicleList.map(item=>{
        if(fee > 0 && fee >= Number(item.uncollectionMoney)){
          item.payfee =  item.uncollectionMoney
          fee = fee-item.uncollectionMoney
        }else if(fee > 0 && fee < Number(item.uncollectionMoney)){
          item.payfee =  fee
          fee = 0
        }else{
          item.payfee =  0
          fee = 0
        }
      })
      this.vehicleList2 = JSON.parse(JSON.stringify(this.vehicleList))
      // this.advancePayment = fee
      this.showSelectModle = true
    },
    // 选择车辆确认
    selectConfirm(){
      if(this.confirmFee != this.form.payMoney ){
        this.$message.error({
          message:'当前车辆核销金额不等于转租金金额，请校对',
          center:true
        })
        return
      }
      this.val.map(item=>{
        if(item.payfee - item.uncollectionMoney > 0){
          this.$message.error({
            message:'本次回款金额应小于等于当期未回款金额',
            center:true
          })
          return
        }
      })
      this.selectData = this.val
      this.advancePayment = this.form.balance - this.confirmFee
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
      let params={ id: this.id,collectionType:0,type:3 }
      this.loading=true
      this.$axios.post("/vehicle-service/advancesReceivedRecord/goPage", params, {headers:this.headers})
      .then((res)=>{
        res=res.data
        if (res.status == 0) {
            setTimeout(() => {
            window.onload()
          }, 10)
          this.form.contractCode = res.data.contractCode, //合同编号
          this.form.customerName = res.data.customerName, //承租方姓名
          this.form.uncollectionMoneyTotal = res.data.uncollectionMoneyTotal, //剩余未回款总额
          this.form.billPeriods = res.data.billPeriods;//应收期数
          if(this.collectionType==1)//1 是补交押金
          {
            this.form.billPeriods="押金（0期）"
          }
          this.form.adjustedPaybackMoney = res.data.adjustedPaybackMoney, //应收金额
          this.form.currPeriodUnClooectionMoney =res.data.currPeriodUnClooectionMoney, //当期未回款金额
          this.form.lateFee = res.data.lateFee; //滞纳金
          this.form.contractRentId = res.data.contractRentId //合同回款计划id
          this.vehicleList = res.data.vehicleRepaymentVOList //合同车辆
          this.form.balance=res.data.balance
          if(res.data.vehicleRepaymentVOList.length <=0 ){
            this.$message.error({
              message: '暂无账单',
              center: true,
            });
          }
        } else {
          this.addbtn=false
          this.$message.error({
            message: res.message,
            center: true,
          });
        }
         this.loading=false
      })
      .catch((err)=>{
        this.$message.error('服务器繁忙，请稍后再试')
        console.log(err)
        this.addbtn=false
        this.loading=false
      })
    }
  },
  beforeMount(){
    if(this.contractid){
      this.iszujian=true
    }
  },
  mounted() {
    this.getDetail()
  },
  watch: {
    contractid(){
      this.id=this.contractid
      if(this.id){
         this.getDetail()
      }
      else{
        this.imageUrlList=[]
        this.dialogImageUrl=""
      }
    },
    form:{
      handler(data){
        if(isNaN(this.form.payMoney)){
          this.$message.error("转租金金额填写不正确")
          this.form.payMoney=""
        }
        else if(this.form.payMoney){
          if(Number(this.form.payMoney)>Number(this.form.currPeriodUnClooectionMoney)){
            this.$message.error("转租金金额不能大于当期未汇款金额")
            this.form.payMoney=""
          }
          else if(Number(this.form.payMoney)>Number(this.form.balance)){
            this.$message.error("转租金金额不能大于预收款余额")
            this.form.payMoney=""
          }
        }
      },
      immediate:true,
      deep:true
    }
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
