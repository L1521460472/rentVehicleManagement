<template>
  <div id="dealWithillegal">
    <div class="header scoped">
      <span>违章处理</span>
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
        <div class="footerNav last_footerNav" >
          <el-form ref="handleForm" :model="handleForm" label-width="130px" label-position="right">
            <el-form-item
            prop="illegalPerson"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
            class="formItem"  
            label="违章人">
              <el-input maxlength="100"  size="small" v-model="handleForm.illegalPerson"></el-input>
            </el-form-item>
            <el-form-item 
            prop="handlePerson"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
            class="formItem"  
            label="处理人">
              <el-input maxlength="100"  size="small" v-model="handleForm.handlePerson"></el-input>
            </el-form-item>
            <el-form-item
              prop="handleTime"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]" 
              class="formItem"
              label="违章处理时间"
            >
              <el-date-picker
                size="small"
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
              <el-input maxlength="100" disabled size="small" v-model="handleForm.handleUseTime"></el-input>
            </el-form-item>
            <el-form-item
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
            class="formItem" 
            label="处理凭证">
              <el-upload
                class="upload"
                action="/vehicle-service/efileInfo/uploadImgFile?fileType=3"
                :headers="headers"
                :limit="3"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleUploadSuccess"
                :file-list="handleForm.imgList" 
                list-type="picture-card"
                multiple>
                <span class="upload_txt">上传处理凭证</span>
                <!-- <img class="imgSrc" v-for="(item,index) in handleForm.imgList" :key="index" :src="item.efileAddr" alt=""> -->
              </el-upload>
            </el-form-item>
          </el-form>
          <el-dialog :visible.sync="dialogVisible" width="500px">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </div>
      <div class="footerButton">
        <el-button type="primary" size="small" @click=" addConfirm()">提交审核</el-button>
        <el-button size="small" @click="cancel">{{international.global.global_cancel}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {getHandleVehicleDetail,handleIllegal} from "../../../api/trafficProcessing/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
} from "../../../public";
export default {
  name: "dealWithillegal",
  data() {
    return {
      form: {
        idCar: "",//车牌号
        illegalTime: "2020-08-13 12:12",//违章时间
        illegalLocation: "",//违章地点
        illegalBehavior: "",//违章行为
        deductMarks: "",//扣分
        forfeit: "",//罚款
        illegalCode: "",//违章编号
        contractCode:'',//合同编号
        merchandiser:''//业务员
      }, //新增数据
      handleForm:{
        illegalPerson:'',//违章人
        handlePerson:'',//处理人
        handleTime:'',//违章处理时间
        handleUseTime:'',//违章处理用时
        imgList: [],//凭证图片
      },//处理数据
      imgIdList:[],//图片id
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
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
          if(this.imgIdList.length < 1){
            this.$message.error({
              message:'请上传处理凭证',
              center:true
            })
            return
          }
          let params = {
            handlers: this.handleForm.handlePerson,
            id: this.$route.query.id,
            imgIdList: this.imgIdList,
            violationHandlerTimeStr: this.handleForm.handleTime,
            violationSource: 0,
            violators: this.handleForm.illegalPerson
          };
          handleIllegal(params, this.headers).then((res) => {
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: '处理成功',
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
    // 上传文件超出回调
    handleExceed(files, fileList){
      this.$message.error({
        message:'图片不能超过三张',
        center:true
      })
    },
    // 上传成功回调
    handleUploadSuccess(response, file, fileList){
      if(response.status == 0){
        this.imgIdList.push(response.data.id)
      }else{
        this.$message.error({
          message:'凭证上传失败',
          center:true
        })
      }
    },
    // 文件删除回调
    handleRemove(file, fileList) {
      let index = this.imgIdList.indexOf(file.response ? file.response.data.id:file.id)
      this.imgIdList.splice(index,1)
    },
    // 点击放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    getHandleVehicleDetail({id:this.$route.query.id},this.headers).then(res=>{
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
        this.handleForm.illegalPerson = res.data.violators || '' //违章人
        this.handleForm.handlePerson = res.data.handlers || ''//处理人
        this.handleForm.handleTime = res.data.violationHandlerTimeStr || '' //处理时间
        this.handleForm.imgList = res.data.efileInfos

        if(res.data.efileInfos){
          this.imgIdList=[]
          res.data.efileInfos.map(item=>{
            this.imgIdList.push(item.id)
          })
        }
        this.selectHandleTime()
      }else{
        this.$message.error({
          message:res.message,
          center:true
        })
      }
    }).catch(err=>{console.log(err)})
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
#dealWithillegal {
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
.last_footerNav{
  overflow: initial;
}
.footerTop {
  width: 100%;
  height: calc(100% - 56px);
  overflow: auto;

}
.el-form {
  /* overflow: hidden; */
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
.upload_txt{
  color: #368cfe;
  text-decoration:underline;
  white-space: nowrap;
  /* float: left; */
}
.upload{
  display: flex;
  width: 60px;
  height: 60px;
}
.formItem >>> .el-upload-list{
  display: flex;
}
.formItem >>> .el-upload--picture-card{
  width: 120px;
  height: 30px;
  line-height: 40px;
  background-color: #fff;
  border: 0;
}
.formItem >>>.el-upload-list__item{
  width: 60px;
  height: 60px;
  margin-right: 10px;
  /* padding: 10px; */
  border: 0;
}
/* .formItem >>> .el-upload-list__item-status-label{
  display: none !important;
}
.formItem >>> .el-upload-list__item-thumbnail{
  width: 40px;
  height: 40px;
  margin-left: 0;
  display: block;
}
.formItem >>> .el-upload-list__item .el-icon-close{
  top: 0;
  right: 0;
} */
.imgSrc{
  float: left;
  margin-left: 10px;
  width: 60px;
  height: 60px;
}
#dealWithillegal >>> .el-dialog__body{
  padding: 0;
}
#dealWithillegal >>> .el-dialog__header{
  padding: 0;
}
#dealWithillegal >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#dealWithillegal>>> .el-dialog__close{
  color: #fff;
}
.el-dialog__body img{
  display: block;
}

</style>
