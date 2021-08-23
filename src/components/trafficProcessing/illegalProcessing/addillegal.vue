<template>
  <div id="addillegal">
    <div class="footer">
      <div class="footerTitle">
        <span>{{showMes}}</span>
      </div>
      <div class="footerNav" v-if="international.title">
        <el-form ref="form" :model="form" label-width="130px" class="from" label-position="right">
          <el-form-item
            class="formItem"
            prop="idCar"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
            label="车牌号"
          >
            <el-select filterable size="small" v-model="form.idCar" placeholder>
              <el-option
                v-for="item in idCarList"
                :key="item.id"
                :label="item.vehicleNo"
                :value="item.id"
              ></el-option>
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
              v-model="form.illegalTime"
              prefix-icon="el-icon-time2" 
              format="yyyy-MM-dd HH:mm" 
              value-format="yyyy-MM-dd HH:mm"
              type="datetime" 
              placeholder="">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            class="formItem"
            prop="illegalLocation"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
            label="违章地址"
          >
            <el-input maxlength="100" size="small" v-model="form.illegalLocation"></el-input>
          </el-form-item>
          <el-form-item
            class="formItem"
            prop="illegalBehavior"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
            label="违章行为"
          >
            <el-input maxlength="100" size="small" v-model="form.illegalBehavior"></el-input>
          </el-form-item>
          <el-form-item
            class="formItem"
            prop="deductMarks"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
            label="扣分"
          >
            <el-input maxlength="100" size="small" v-model="form.deductMarks"></el-input>
          </el-form-item>
          <el-form-item
            class="formItem"
            prop="forfeit"
            :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
            label="罚款金额"
          >
            <el-input maxlength="100" size="small" v-model="form.forfeit"></el-input>
          </el-form-item>
          <el-form-item class="formItem" prop="illegalCode" label="违章代号">
            <el-input maxlength="100" size="small" v-model="form.illegalCode"></el-input>
          </el-form-item>
        </el-form>
        <div class="footerButton">
            <el-button type="primary" size="small" @click="$route.query.from == 'add' ? addConfirm():editConfirm()" >提交</el-button>
            <el-button size="small" @click="cancel">{{international.global.global_cancel}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {addIllegal,editIllegalDetail,editIllegal,getVehicleList} from "../../../api/trafficProcessing/api";
import {getCookie,setCookie,removeCookie,getMenuBtnList} from "../../../public";
export default {
  name: "addillegal",
  data() {
    return {
      form: {
        idCar: "",
        illegalTime: "",
        illegalLocation: "",
        illegalBehavior: "",
        deductMarks : "",
        forfeit: "",
        illegalCode: "",
      }, //新增数据
      idCarList: [], //车牌号列表
      showMes: "", //新增修改标题
      international:{},
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
            vehicleId: this.form.idCar,
            violationCode: this.form.illegalCode,
            violationFine: this.form.forfeit,
            violationPlace: this.form.illegalLocation,
            violationScore: this.form.deductMarks,
            violationTimeStr: this.form.illegalTime,
            violationType: this.form.illegalBehavior
          };
          addIllegal(params, this.headers)
            .then((res) => {
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: this.international.global.global_addSuccess,
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
    editConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            id:this.$route.query.id,
            vehicleId: this.form.idCar,
            violationCode: this.form.illegalCode,
            violationFine: this.form.forfeit,
            violationPlace: this.form.illegalLocation,
            violationScore: this.form.deductMarks,
            violationTimeStr: this.form.illegalTime,
            violationType: this.form.illegalBehavior
          };
          editIllegal(params, this.headers)
            .then((res) => {
              this.showEditToast = false;
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: this.international.global.global_changeSuccess,
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
    // 获取车牌号列表
    getVehicleListData() {
      getVehicleList({},this.headers).then(res=>{
        if(res.status == 0){
          this.idCarList = res.data
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{
          console.log(err)
      })
    },
  },
  mounted() {
    //   this.$store.commit("changeIsStatus", false)
    setTimeout(() => {
            window.onload()
          }, 10)
    this.getVehicleListData()
    if (this.$route.query.from == "add") {
        this.showMes ='违章登记'
        this.form.idCar = '',
        this.form.illegalCode = '',
        this.form.forfeit = '',
        this.form.illegalLocation = '',
        this.form.deductMarks = '',
        this.form.illegalTime = '',
        this.form.illegalBehavior = ''
    } else {
      this.showMes = "违章修改";
      editIllegalDetail({id:this.$route.query.id},this.headers).then(res=>{
          this.form.idCar = res.data.vehicleId,
          this.form.illegalCode = res.data.violationCode,
          this.form.forfeit = res.data.violationFine,
          this.form.illegalLocation = res.data.violationPlace,
          this.form.deductMarks = res.data.violationScore,
          this.form.illegalTime = res.data.violationTimeStr,
          this.form.illegalBehavior = res.data.violationType
      }).catch(err=>{
          this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
          });

      })
    }
  },
  computed: {
    // 计算国际化标题和按钮
    internationalTitle() {
      return this.$store.state.languageTitle;
    }
  },
  watch: {
    // 监听国际化标题和按钮变化
    internationalTitle: {
      handler(data) {
        this.international = data;
        // if(this.$route.query.from == 'add'){
        //     this.showMes ='违章登记'
        // }else if(this.$route.query.from == 'edit'){
        //     this.showMes = '违章修改'
        // }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style scoped>
#addillegal {
  width: 100%;
  height: calc(100% - 76px);
}
.footer {
  width: 100%;
  height: 100%;
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
  height: calc(100% - 79px);
  box-sizing: border-box;
  margin-top: 40px;
}
.el-form {
  width: 100%;
  height: calc(100% - 56px);
  overflow: hidden;
}
.formItem {
  float: left;
}
.footerButton {
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  padding-top: 12px;
  padding-left: 44%;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
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
.footerNav >>> .el-input--prefix .el-input__inner{
  padding: 0 15px !important;
}

</style>
