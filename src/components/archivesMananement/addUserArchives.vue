<template>
  <div id="header">
    <div class="header">
      <span v-if="international.title">{{ showMes }}</span>
    </div>
    <div class="footer">
      <div class="footerTitle">
        <span v-if="international.title">
          {{
          international.title.title_baseInfo
          }}
        </span>
      </div>
      <div class="footerNav">
        <el-form ref="form" :model="form" label-width="130px">
          <div class="formNav" v-if="international.content">
            <!-- <div class="formItemNav"> -->
            <el-form-item :label="international.content.content_userProfile_userType">
              <b id="xlabel">*</b>
              <el-select size="small" v-model="form.userType" placeholder @change="userTypeChange">
                <el-option
                  v-for="item in optionsUserType"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="international.field.field_userProfileList_affiliation">
              <b id="xlabel">*</b>
              <el-select
                size="small"
                filterable
                v-model="form.enterpriseId"
                placeholder
                @change="selectEnterprise"
              >
                <el-option
                  v-for="item in optionsAffiliation"
                  :key="item.id"
                  :label="item.enterpriseName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="
                international.field.field_userProfileList_topDepartment
              "
            >
              <el-select size="small" v-model="form.departmentId" placeholder>
                <el-option
                  v-for="item in optionsAttributionDepartment"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="international.content.content_userProfile_username">
              <b id="xlabel">*</b>
              <el-input size="small" maxlength="100" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item
              :label="
                international.content.content_userProfile_userAccount
              "
            >
              <b id="xlabel">*</b>
              <el-input size="small" maxlength="100" v-model="form.loginName"></el-input>
            </el-form-item>
            <el-form-item :label="international.content.content_userProfile_iphone">
              <b id="xlabel">*</b>
              <el-input size="small" maxlength="100" v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item :label="international.content.content_userProfile_email">
              <el-input size="small" maxlength="100" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item :label="international.content.content_userProfile_post">
              <el-input size="small" maxlength="8" v-model="form.post"></el-input>
            </el-form-item>
            <!-- </div>
            <div class="formItemNav">-->
            <el-form-item :label="international.content.content_userProfile_status">
              <b id="xlabel">*</b>
              <el-select size="small" v-model="form.userStatus" placeholder>
                <el-option
                  v-for="item in optionsStatusList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- </div> -->
          </div>
          <div class="footerButton" v-if="international.content">
            <!-- <el-form-item> -->
            <el-button
              type="primary"
              size="small"
              v-if="showButton"
              @click="addConfirm"
            >{{ international.global.global_confirm }}</el-button>
            <el-button
              type="primary"
              size="small"
              v-else
              @click="editConfirm"
            >{{ international.global.global_confirm }}</el-button>
            <el-button size="small" @click="cancel">
              {{
              international.global.global_cancel
              }}
            </el-button>
            <!-- </el-form-item> -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getDepartmentList } from "../../api/fileManagement/api";
import bcryptjs from "bcryptjs";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
} from "../../public";
export default {
  name: "addUserArchives",
  data() {
    return {
      form: {
        id: "",
        loginName: "", //账号，登录名
        username: "", //用户名
        // password: "123456",
        email: "",
        mobile: "",
        post: "", //岗位
        enterpriseId: "", //归属机构
        departmentId: "", //归属部门
        userStatus: "",
        userType: "",
      },
      international: {},
      optionsStatusList: [], //状态列表
      optionsAffiliation: [], //归属机构
      optionsAttributionDepartment: [], //归属部门
      optionsStatus: [], //状态
      optionsUserType: [], //用户类型
      enterpriseType: 2,
      options: [],
      showMes: "", //新增修改标题
      optionsEnterpriseId: [], //归属管理机构下拉
      showButton: false, //确定新增修改按钮
      timer: null,
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
      content_userProfile_affiliation: "",
    };
  },
  methods: {
    addConfirm() {
      //确定新增
      //Bcrypt加密流程
      // var salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
      // this.form.password = bcryptjs.hashSync(this.form.password, salt); //进行加密
      if (
        this.form.loginName == "" ||
        this.form.enterpriseId == "" ||
        this.form.username == "" ||
        this.form.mobile == "" ||
        this.form.userStatus == ""
      ) {
        this.$message({
          message: this.international.global.global_requiredNotEmpty,
          center: true,
          type: "error",
        });
        return;
      }
      // var timer
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let _this = this
      this.timer = setTimeout(function () {
        _this.timer = null;
        axios({
          method: "post",
          url: "/platform-base-service/platformBaseUserInfo/insertUser",
          headers: _this.headers,
          data: _this.form,
        })
          .then((result) => {
            // console.log(result.data);
            if (result.data.status === 0) {
              _this.$store.commit("changeIsStatus", true);
              _this.$message({
                type: "success",
                message: _this.international.global.global_addSuccess,
                center: true,
              });
              _this.$router.back();
            } else {
              _this.$message({
                message: result.data.message,
                center: true,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            _this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      }, 1000);
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    editConfirm() {
      //确定修改
      //   var salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
      //   this.form.password = bcryptjs.hashSync(this.form.password, salt); //进行加密
      if (
        this.form.loginName == "" ||
        this.form.username == "" ||
        this.form.enterpriseId == "" ||
        this.form.mobile == "" ||
        this.form.userStatus == "" ||
        this.form.userType == ""
      ) {
        this.$message({
          message: this.international.global.global_requiredNotEmpty,
          center: true,
          type: "error",
        });
        return;
      }
      this.form.id = this.$route.query.id;
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseUserInfo/editUser",
        headers: this.headers,
        data: this.form,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.$store.commit("changeIsStatus", true);
            this.$message({
              type: "success",
              message: this.international.global.global_changeSuccess,
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
    selectEnterprise(enterpriseId) {
      this.form.parentDepartment = "";
      // 获取部门列表
      getDepartmentList({ enterpriseId: enterpriseId }, this.headers)
        .then((res) => {
          this.optionsAttributionDepartment = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSelete() {
      axios({
        //用户类型
        method: "get",
        url:
          "/platform-base-service/dictionaryType/listInternalLangByDictionaryType?type=roleType",
        headers: this.headers,
      })
        .then((result) => {
          this.optionsUserType = result.data.data;
          // this.userType =
          // if (this.optionsUserType) {
          //   for (var i = 0; i < this.optionsUserType.length; ++i) {
          //     if (this.optionsUserType[i].id == 234) {
          //       this.form.userType = 234;
          //       break;
          //     }
          //   }
          // }
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
      //归属机构
      axios({
        method: "get",
        url: `/platform-base-service/platformBaseEnterprise/belongManagementQuery?enterpriseType=${this.enterpriseType}`,
        headers: this.headers,
      })
        .then((result) => {
          //   console.log(result.data);
          this.optionsAffiliation = result.data.data;
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    userTypeChange() {
      if (this.form.userType == 234) {
        this.enterpriseType = 2;
        this.content_userProfile_affiliation = this.international.content.content_userProfile_affiliation;
        axios({
          method: "get",
          url: `/platform-base-service/platformBaseEnterprise/belongManagementQuery?enterpriseType=${this.enterpriseType}`,
          headers: this.headers,
        })
          .then((result) => {
            //   console.log(result.data);
            this.optionsAffiliation = result.data.data;
          })
          .catch((err) => {
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      } else if (this.form.userType == 236) {
        this.enterpriseType = 1;
        this.content_userProfile_affiliation = this.international.content.content_userProfile_affiliation2;
        axios({
          method: "get",
          url: `/platform-base-service/platformBaseEnterprise/belongManagementQuery?enterpriseType=${this.enterpriseType}`,
          headers: this.headers,
        })
          .then((result) => {
            //   console.log(result.data);
            this.optionsAffiliation = result.data.data;
          })
          .catch((err) => {
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      }
    },
  },
  mounted() {
    this.getSelete();
    this.$store.commit("changeIsStatus", false);
    if (this.$route.query.form == "add") {
      this.showButton = true;
      this.form.loginName = "";
      this.form.username = "";
      this.form.email = "";
      this.form.mobile = "";
      this.form.post = "";
      this.form.enterpriseId = "";
      this.form.departmentId = "";
      this.form.userStatus = 232;
      this.form.userType = 234;
    } else {
      this.showButton = false;
      axios({
        method: "get",
        url:
          "/platform-base-service/platformBaseUserInfo/userDetails?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          if (result.data.status === 0) {
            this.form.loginName = result.data.data.loginName;
            this.form.username = result.data.data.username;
            this.form.email = result.data.data.email;
            this.form.mobile = result.data.data.mobile;
            this.form.post = result.data.data.post;
            this.form.enterpriseId = result.data.data.enterpriseId;
            this.form.departmentId = result.data.data.departmentId;
            this.form.userStatus = result.data.data.userStatus;
            this.form.userType = result.data.data.userType;
            getDepartmentList(
              { enterpriseId: this.form.enterpriseId },
              this.headers
            )
              .then((res) => {
                this.optionsAttributionDepartment = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
            if (this.form.userType == 234) {
              this.enterpriseType = 2;
              this.content_userProfile_affiliation = this.international.content.content_userProfile_affiliation;
            } else if (this.form.userType == 236) {
              this.enterpriseType = 1;
              this.content_userProfile_affiliation = this.international.content.content_userProfile_affiliation2;
            }
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
    }
    axios({
      //状态下拉
      method: "get",
      url:
        "/platform-base-service/dictionaryType/listInternalLangByDictionaryType?type=status",
      headers: this.headers,
    })
      .then((result) => {
        this.optionsStatusList = result.data.data;
      })
      .catch((err) => {
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
    // 计算菜单页面按钮
    menuDataList() {
      return this.$store.state.menuData;
    },
  },
  watch: {
    // 监听国际化标题和按钮变化
    internationalTitle: {
      handler(data) {
        this.international = data;
        if (this.international.content) {
          this.content_userProfile_affiliation = this.international.content.content_userProfile_affiliation;
        }
        if (this.$route.query.form == "add") {
          this.showMes = this.international.title
            ? this.international.title.title_appUserSettings_addUserProfiles
            : "";
        } else {
          this.showMes = this.international.title
            ? this.international.title.title_appUserSettings_editUserProfiles
            : "";
        }
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
  height: 100%;
}
#xlabel {
  color: red;
  margin-left: -8px;
  margin-right: 0px;
  padding-left: 0px;
  padding-right: 0px;
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

/* .formNav .formItemNav .el-form-item{
    float: left;
} */
.el-form .footerButton {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding-top: 12px;
  padding-left: 44%;
  border-top: 1px solid #e5e5e5;
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

/* .footerNav .formNav .el-textarea {
  width: 450px;
} */
</style>
