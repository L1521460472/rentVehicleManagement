<template>
  <div id="header">
    <div class="header scoped">
      <span v-if="international.content">{{ showMes }}</span>
    </div>
    <div class="footer">
      <div class="footerTitle">
        <span v-if="international.title">{{
          international.title.title_baseInfo
        }}</span>
      </div>
      <div class="footerNav">
        <el-form ref="form" :model="form" label-width="130px">
          <div class="formNav" v-if="international.content">
            <!-- <div class="formItemNav"> -->
            <el-form-item
              :label="
                international.content.content_operationUserPermission_username +
                '*'
              "
            >
              <el-input
                size="small"
                maxlength="100"
                v-model="form.username"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="
                international.content.content_operationUserPermission_email +
                '*'
              "
            >
              <el-input
                size="small"
                maxlength="100"
                v-model="form.email"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="
                international.content.content_operationUserPermission_iphone +
                '*'
              "
            >
              <el-input
                size="small"
                maxlength="100"
                v-model="form.mobile"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="this.$route.query.form == 'add'"
              :label="
                international.content.content_operationUserPermission_password +
                '*'
              "
            >
              <el-input
                size="small"
                maxlength="8"
                v-model="form.password"
              ></el-input>
            </el-form-item>
            <!-- </div>
           <div class="formItemNav"> -->
            <el-form-item
              :label="
                international.content.content_operationUserPermission_status +
                '*'
              "
            >
              <el-select size="small" v-model="form.userStatus" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="
                international.content
                  .content_operationUserPermission_affiliation + '*'
              "
            >
              <el-select
                size="small"
                v-model="form.enterpriseId"
                placeholder=""
                filterable
              >
                <el-option
                  v-for="item in optionsEnterpriseId"
                  :key="item.id"
                  :label="item.enterpriseName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="
                international.content.content_operationUserPermission_content
              "
            >
              <el-input
                size="small"
                maxlength="300"
                type="textarea"
                v-model="form.content"
              ></el-input>
            </el-form-item>
            <!-- </div> -->
          </div>
          <div class="footerButton" v-if="international.content">
            <!-- <el-form-item> -->
            <el-button
              type="primary"
              size="small"
              v-if="showButton"
              @click="onSubmit"
              >{{ international.global.global_create }}</el-button
            >
            <el-button
              type="primary"
              size="small"
              v-else
              @click="onSubmitEdit"
              >{{ international.global.global_change }}</el-button
            >
            <el-button size="small" @click="cancel">{{
              international.global.global_cancel
            }}</el-button>
            <!-- </el-form-item> -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bcryptjs from "bcryptjs";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
} from "../../public";
export default {
  name: "addPlatformUser",
  data() {
    return {
      form: {
        username: "",
        enterpriseId: "",
        email: "",
        mobile: "",
        password: "",
        userStatus: "",
        content: "",
      },
      international: {},
      options: [],
      showMes: "", //新增修改标题
      optionsEnterpriseId: [], //归属管理机构下拉
      showButton: false, //确定新增修改按钮
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    handleClose(done) {
      //关闭弹框前
      done();
    },
    onSubmit() {
      //确定新增
      //Bcrypt加密流程
      var salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
      this.form.password = bcryptjs.hashSync(this.form.password, salt); //进行加密
      if (
        this.form.username == "" ||
        this.form.enterpriseId == "" ||
        this.form.email == "" ||
        this.form.mobile == "" ||
        this.form.password == "" ||
        this.form.userStatus == ""
      ) {
        this.$message({
          message: this.international.global.global_requiredNotEmpty,
          center: true,
          type: "error",
        });
        return;
      }
      axios({
        method: "post",
        url: "/platform-base-service/platformUserAuthoritySetting/save",
        headers: this.headers,
        data: this.form,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.$store.commit("changeIsStatus", true);
            this.$message({
              type: "success",
              message: this.international.global.global_addSuccess,
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
    onSubmitEdit() {
      //确定修改
      var salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
      this.form.password = bcryptjs.hashSync(this.form.password, salt); //进行加密
      if (
        this.form.username == "" ||
        this.form.enterpriseId == "" ||
        this.form.email == "" ||
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
      this.form.id = this.$route.query.id;
      axios({
        method: "post",
        url: "/platform-base-service/platformUserAuthoritySetting/update",
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
  },
  mounted() {
      setTimeout(() => {
            window.onload()
          }, 10)
    this.$store.commit("changeIsStatus", false);
    if (this.$route.query.form == 'add') {
      this.showButton = true;
      this.form.username = "";
      this.form.enterpriseId = "";
      this.form.email = "";
      this.form.mobile = "";
      this.form.password = "";
      this.form.userStatus = "";
      this.form.content = "";
    } else {
      this.showButton = false;
      axios({
        method: "get",
        url:
          "/platform-base-service/platformUserAuthoritySetting/getPlatformUserAuthorityDetail?id=" +
          this.$route.query.id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            this.form.username = result.data.data.username;
            this.form.enterpriseId = result.data.data.enterpriseId;
            this.form.email = result.data.data.email;
            this.form.mobile = result.data.data.mobile;
            this.form.password = "";
            this.form.userStatus = result.data.data.userStatus;
            this.form.content = result.data.data.content;
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
    axios({
      //状态下拉
      method: "get",
      url:
        "/platform-base-service/dictionaryType/listInternalLangByDictionaryType?type=status",
      headers: this.headers,
    })
      .then((result) => {
        // console.log(result.data);
        this.options = result.data.data;
      })
      .catch((err) => {
        console.error(err);
        this.$message({
          message: err.response.data.message,
          center: true,
          type: "error",
        });
      });
    axios({
      //归属机构下拉
      method: "get",
      url:
        "/platform-base-service/platformBaseEnterprise/belongManagementQuery?enterpriseType=2",
      headers: this.headers,
    })
      .then((result) => {
        // console.log(result.data);
        this.optionsEnterpriseId = result.data.data;
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
        if (this.$route.query.form == 'add') {
          this.showMes = this.international.title
            ? this.international.title
                .title_platformUserPermissions_addUser
            : "";
        } else {
          this.showMes = this.international.title
            ? this.international.title
                .title_platformUserPermissions_editUser
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
.footerNav .formNav .el-textarea {
  width: 450px;
}
</style>
