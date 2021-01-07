<template>
  <div id="auditillegal">
    <div class="header scoped">
      <span>{{showMes}}</span>
    </div>
    <div class="footer" v-if="international.title">
      <div class="footerTop" >
        <div class="footerTitle">
          <span>违章情况</span>
        </div>
        <div class="footerNav" >
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item
              class="formItem"
              prop="idCar"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
              label="车牌号"
            >
              <el-select filterable size="small" disabled v-model="form.idCar" placeholder>
                <!-- <el-option
                  v-for="item in idCarList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="illegalTime"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
              label="违章时间"
            >
              <el-date-picker
                size="small"
                disabled
                v-model="form.illegalTime"
                prefix-icon="el-icon-time2"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="illegalLocation"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="违章地址"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.illegalLocation"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="illegalBehavior"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="违章行为"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.illegalBehavior"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="deductMarks"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="扣分"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.deductMarks"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="forfeit"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="罚款金额"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.forfeit"></el-input>
            </el-form-item>
            <el-form-item class="formItem" prop="illegalCode" label="违章代号">
              <el-input maxlength="100" disabled size="small" v-model="form.illegalCode"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>关联合同</span>
        </div>
        <div class="footerNav">
          <div class="formItem">
            <span class="leftLable">合同编号</span>
            <span class="rightValue">{{form.contractCode}}</span>
          </div>
          <div class="formItem">
            <span class="leftLable">业务员</span>
            <span class="rightValue">{{form.merchandiser}}</span>
          </div>
        </div>
        <div class="footerTitle">
          <span>违章处理</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item class="formItem"  label="违章人">
              <el-input maxlength="100"  disabled size="small" v-model="handleForm.illegalPerson"></el-input>
            </el-form-item>
            <el-form-item class="formItem"  label="处理人">
              <el-input maxlength="100"  disabled size="small" v-model="handleForm.handlePerson"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              label="违章处理时间"
            >
              <el-date-picker
                size="small"
                disabled
                @change="selectHandleTime"
                v-model="handleForm.handleTime"
                prefix-icon="el-icon-time2"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="formItem" label="违章处理用时">
              <el-input maxlength="100"  disabled size="small" v-model="handleForm.handleUseTime"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="来源">
              <span class="formSource">{{handleForm.violationSourceStr}}</span>
            </el-form-item>
            <el-form-item class="formItem" label="处理凭证">
              <img @click="amplification(item.efileAddr)" v-for="(item,index) in handleForm.imgList"  :key="index" :src="item.efileAddr" alt="">
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle">
          <span>审核信息</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item   label="审核结果">
              <el-radio v-model="radio" :disabled="$route.query.from == 'audit' ? false:true "  label="0">通过</el-radio>
              <el-radio v-model="radio" :disabled="$route.query.from == 'audit' ? false:true "  label="1">拒绝</el-radio>
            </el-form-item>
            <el-form-item 
            prop="auditOpinion"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
            label="审核意见">
              <el-input maxlength="500" :disabled="$route.query.from == 'audit' ? false:true "  style="width:800px" placeholder="请输入审核意见"  type="textarea" :rows="5" size="small" v-model="form.auditOpinion"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footerButton">
        <el-button type="primary" size="small" @click="addConfirm()" v-if="$route.query.from == 'audit'">{{international.global.global_confirm}}</el-button>
        <el-button size="small" @click="cancel" v-if="$route.query.from == 'audit'">{{international.global.global_cancel}}</el-button>
        <el-button type="primary" size="small" @click="cancel" class="back" v-else>返回</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="500px">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {getAuditVehicleDetail,auditIllegal,getLookDetail} from "../../../api/trafficProcessing/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
} from "../../../public";
export default {
  name: "auditillegal",
  data() {
    return {
      form: {
        idCar: "",//车牌号
        illegalTime: "",//违章时间
        illegalLocation: "",//违章地点
        illegalBehavior: "",//违章行为
        deductMarks: "",//扣分
        forfeit: "",//罚款
        illegalCode: "",//违章编号
        contractCode:'',//合同编号
        merchandiser:'',//业务员
        auditOpinion:'',//审核意见
      }, //新增数据
      handleForm:{
        illegalPerson:'',//违章人
        handlePerson:'',//处理人
        handleTime:'',//违章处理时间
        handleUseTime:'',//违章处理用时
        imgList:[],//凭证图片
        violationSourceStr:''
      },//处理数据
      radio: '0',
      showMes: "", //新增修改标题
      international: {},
      dialogVisible:false,
      dialogImageUrl:'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    addConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            auditSuggestion: this.form.auditOpinion,
            id: this.$route.query.id,
            status: this.radio
          };
          auditIllegal(params, this.headers)
            .then((res) => {
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: '审核成功',
                  center: true,
                });
                this.$router.back();
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
        }
      });
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    // 选择违规处理时间后计算出违规处理用时
    selectHandleTime(){
      if(!this.handleForm.handleTime){
        this.handleForm.handleUseTime = ''
        return
      }
      let illegalTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(this.form.illegalTime)
      let et = new Date(this.handleForm.handleTime).getTime()
      let st = new Date(illegalTime).getTime()
      this.handleForm.handleUseTime = (et-st)/1000/60/60/24 +1+ ' ' + '天'
    },
    amplification(src){
      this.dialogImageUrl = src;
      this.dialogVisible = true;
    }
  },
  mounted() {
    if(this.$route.query.from == "audit"){
      this.showMes = '违章审核'
      getAuditVehicleDetail({id:this.$route.query.id},this.headers).then(res=>{
        if(res.status == 0){
          this.form.idCar = res.data.vehicleNo,//车牌号
          this.form.illegalTime = res.data.violationTimeStr,//违章时间
          this.form.illegalLocation = res.data.violationPlace,//违章地点
          this.form.illegalBehavior = res.data.violationType,//违章行为
          this.form.deductMarks = res.data.violationScore,//扣分
          this.form.forfeit = res.data.violationFine,//罚款
          this.form.illegalCode = res.data.violationCode,//违章编号
          this.form.contractCode =res.data.contractCode,//合同编号
          this.form.merchandiser =res.data.userName//业务员
          this.handleForm.illegalPerson = res.data.violators  //违章人
          this.handleForm.handlePerson = res.data.handlers //处理人
          this.handleForm.handleTime = res.data.violationHandlerTimeStr  //处理时间
          this.handleForm.violationSourceStr = res.data.violationSourceStr //来源
          this.handleForm.imgList = res.data.efileInfos
          this.selectHandleTime()

        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{console.log(err)})
    }else{
      this.showMes = '违章查看'
      getLookDetail({id:this.$route.query.id},this.headers).then(res=>{
        if(res.status == 0){
          this.form.idCar = res.data.vehicleNo,//车牌号
          this.form.illegalTime = res.data.violationTimeStr,//违章时间
          this.form.illegalLocation = res.data.violationPlace,//违章地点
          this.form.illegalBehavior = res.data.violationType,//违章行为
          this.form.deductMarks = res.data.violationScore,//扣分
          this.form.forfeit = res.data.violationFine,//罚款
          this.form.illegalCode = res.data.violationCode,//违章编号
          this.form.contractCode =res.data.contractCode,//合同编号
          this.form.merchandiser =res.data.userName//业务员
          this.handleForm.illegalPerson = res.data.violators  //违章人
          this.handleForm.handlePerson = res.data.handlers //处理人
          this.handleForm.handleTime = res.data.violationHandlerTimeStr  //处理时间
          this.handleForm.imgList = res.data.efileInfos
          this.handleForm.violationSourceStr = res.data.violationSourceStr //来源
          this.radio = res.data.status+''
          this.form.auditOpinion = res.data.auditSuggestion
          this.selectHandleTime()
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{console.log(err)})
    }
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
#auditillegal {
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
.leftLable {
  display: inline-block;
  width: 130px;
  text-align: right;
  font-size: 14px;
  color: #606266;
  padding-right: 12px;
  box-sizing: border-box;
  margin-bottom: 22px;
}
.rightValue {
  display: inline-block;
  width: 160px;
  font-size: 14px;
  color: #606266;
  margin-bottom: 22px;
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
  padding-left: 44%;
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
.footerNav >>> .el-input--prefix .el-input__inner {
  padding: 0 15px !important;
}
.formSource{
  width: 160px;
  display: block;
}
.formItem img{
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.back{
  width: 80px;
  color: #fff;
}
#auditillegal >>> .el-dialog__body{
  padding: 0;
}
#auditillegal >>> .el-dialog__header{
  padding: 0;
}
#auditillegal >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#auditillegal>>> .el-dialog__close{
  color: #fff;
}
.el-dialog__body img{
  display: block;
}

</style>
