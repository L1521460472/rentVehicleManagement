<template>
  <div id="header">
    <div class="userLeft">
      <!-- indent="0" 是否缩进 -->
      <el-tree
        :data="data"
        ref="tree"
        :indent="0"
        :props="defaultProps"
        highlight-current
        :expand-on-click-node="false"
        node-key="id"
        default-expand-all
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="userRight">
      <div class="header" v-if="international.global">
        <div class="headerTop">
          <div class="nav">
            <span>{{
              international.content.content_userProfile_industryTitle
            }}</span>
            <el-input
              v-model="departmentName"
              size="small"
              maxlength="50"
              :placeholder="
                international.content.content_userProfile_industryTitle
              "
            ></el-input>
          </div>
          <div class="nav">
            <span>{{
              international.content.content_userProfile_userAccount
            }}</span>
            <el-input
              v-model="username"
              size="small"
              maxlength="50"
              :placeholder="
                international.content.content_userProfile_userAccount
              "
            ></el-input>
          </div>
          <div class="nav">
            <span>{{ international.content.content_userProfile_status }}</span>
            <el-select v-model="status" size="small" placeholder="">
              <el-option
                v-for="item in optionsStatusList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="nav">
            <span>{{
              international.content.content_userProfile_userType
            }}</span>
            <el-select v-model="userType" size="small" placeholder="">
              <el-option
                v-for="item in optionsUserType"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div style="display: block;">
            <el-button
              class="search"
              type="primary"
              @click="search"
              size="small"
              v-if="searchBtn"
              >{{ international.global.global_search }}</el-button
            >
            <el-button
              class="reset"
              type="primary"
              plain
              @click="reset"
              size="small"
              >{{ international.global.global_reset }}</el-button
            >
          </div>
        </div>
      </div>
      <div class="footer" v-if="international.global">
        <div class="footerBottom">
          <el-button @click="handleAdd" size="small" v-if="addBtn">
            <i class="iconfont icon-add"></i>
            {{ international.global.global_add }}</el-button
          >
          <el-button
            @click="handleEdit"
            size="small"
            :class="{ active: !isDisable }"
            :disabled="isDisable"
            v-if="editBtn"
          >
            <i class="iconfont icon-edit"></i>
            {{ international.global.global_edit }}</el-button
          >
          <el-button
            @click="handleDisable"
            size="small"
            :class="{ active: !isDisable }"
            :disabled="isDisable"
            v-if="deactiveBtn"
          >
            <i class="iconfont icon-stop"></i>
            {{ international.global.global_disabled }}</el-button
          >
          <el-button
            @click="handleEnable"
            :class="{ active: !isDisable }"
            :disabled="isDisable"
            size="small"
            v-if="activeBtn"
          >
            <i class="iconfont icon-wanchengyunda"></i>
            {{ international.global.global_enable }}</el-button
          >
          <el-button
            @click="handleReset"
            :class="{ active: !isDisable }"
            :disabled="isDisable"
            size="small"
            v-if="resetPasswordBtn"
          >
            <i class="iconfont icon-zhongzhimima"></i>
            <!-- <i class="iconfont icon-chongzhimima"></i> -->
            {{ international.global.global_resetPassword }}</el-button
          >
        </div>
        <div class="footerTable">
          <div class="footer_informatian" v-if="international.field">
            <el-table
              ref="multipleTable"
              size="small"
              border
              stripe
              :data="tableData"
              :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
              tooltip-effect="dark"
              style="width: 100%;"
              @selection-change="handleSelectionChange"
              :height="tableHeight"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column type="selection" align="center" width="60">
              </el-table-column>
              <el-table-column
                prop="id"
                :label="international.field.field_userProfileList_number"
                align="center"
                width="60"
              >
                <template slot-scope="scope">
                  {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                prop="email"
                :label="international.field.field_userProfileList_email"
                width="180"
                show-overflow-tooltip
              >
              </el-table-column>

              <el-table-column
                prop="loginName"
                :label="international.field.field_userProfileList_userAccount"
                width="130"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="userTypeText"
                :label="international.field.field_userProfileList_userType"
                width="100"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="username"
                :label="international.field.field_userProfileList_username"
                width="130"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="mobile"
                :label="international.field.field_userProfileList_iphone"
                width="130"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="statusText"
                :label="international.field.field_userProfileList_status"
                width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span
                    :class="
                      scope.row.userStatus == 232
                        ? 'activeStatus'
                        : 'deactiveStatus'
                    "
                    >{{ scope.row.statusText }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="departmentName"
                :label="international.field.field_userProfileList_topDepartment"
                width="150"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="enterpriseName"
                :label="international.field.field_userProfileList_affiliation"
                min-width="150"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="footer_page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="pageSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 重置密码 -->
      <el-dialog
        v-if="international.title"
        :title="international.title.title_appUserSettings_resetPassword"
        :visible.sync="showPassword"
        width="320px"
        top="30vh"
        @close="clearPassword"
      >
        <el-form
          ref="editPassword"
          label-width="70px"
          class="from"
          label-position="left"
        >
          <div class="formItem">
            <el-form-item
              :label="international.content.content_userProfile_resetPassword"
            >
              <el-input
                size="small"
                type="password"
                maxlength="8"
                v-model="editPassword.resetPassStr1"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="international.content.content_userProfile_repeatPassword"
            >
              <el-input
                size="small"
                type="password"
                maxlength="8"
                v-model="editPassword.resetPassStr2"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            size="small"
            class="confirm"
            type="primary"
            @click="passwordConfirm"
            >{{ international.global.global_confirm }}</el-button
          >
          <el-button
            size="small"
            class="cancel"
            @click="showPassword = false"
            >{{ international.global.global_cancel }}</el-button
          >
        </span>
      </el-dialog>
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
  name: "userArchives",
  data() {
    return {
      total: 0, //数据总条数
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      departmentName: "", //部门名称
      username: "", //用户账号
      status: "", //状态
      userType: "", //用户类型
      optionsStatusList: [], //状态列表
      isDisable: true,
      tableData: [],
      addform: {
        id: "",
        username: "",
        // password: "123456",
        email: "",
        mobile: "",
        post: "", //岗位
        enterpriseId: "", //归属机构
        departmentId: "", //归属部门
        userStatus: "",
        userType: "",
      }, //新增数据
      editPassword: {
        id: "",
        resetPassStr1: "",
        resetPassStr2: "",
      },
      optionsAffiliation: [], //归属机构
      optionsAttributionDepartment: [], //归属部门
      optionsStatus: [], //状态
      optionsUserType: [], //用户类型
      editform: {}, //编辑数据
      showAddToast: false, //是否显示新增弹窗
      showEditToast: false, //是否显示编辑弹窗
      showPassword: false, //是否显示重置密码弹窗
      multipleSelection: [], //选中框
      loading: false, //是否显示loading
      show: true,
      activate: "",
      disabled: "",
      international: {}, //国际化标题按钮
      searchBtn: true/*false*/, //查询按钮是否显示
      addBtn: true/*false*/, //新增按钮是否显示
      editBtn: true/*false*/, //编辑按钮是否显示
      deactiveBtn: true/*false*/, //失效按钮是否显示
      activeBtn: true/*false*/, //激活按钮是否显示
      resetPasswordBtn: true/*false*/, //重置密码
      tableHeight: window.innerHeight - 375 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      }, //请求头
      data: [], //tree
      defaultProps: {
        id: "id",
        children: "children",
        label: "name",
      },
      treeValue: {}, //树的请求参数
    };
  },
  methods: {
    //重置密码框后清楚填写的重置密码
    clearPassword(){
      this.editPassword.id="";
      this.editPassword.resetPassStr1="";
      this.editPassword.resetPassStr2="";
    },
    handleNodeClick(data) {
      //   console.log(data);
      if (data.type == 1) {
        this.treeValue = {
          enterpriseId: data.id,
          currentPage: 1,
          pageSize: 10,
        };
      } else {
        this.treeValue = {
          departmentId: data.id,
          currentPage: 1,
          pageSize: 10,
        };
      }
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseUserInfo/userPageQuery",
        headers: this.headers,
        data: this.treeValue,
      })
        .then((result) => {
          //   console.log(result.data);
          this.tableData = result.data.data.records;
          this.total = result.data.data.total;
          this.pageSize = result.data.data.size;
          this.currentPage = result.data.data.current;
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
    // 获取初始数据
    getListData() {
      axios({
        //分页数据
        method: "post",
        url: "/platform-base-service/platformBaseUserInfo/userPageQuery",
        headers: this.headers,
        data: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.tableData = result.data.data.records;
          this.total = result.data.data.total;
          this.pageSize = result.data.data.size;
          this.currentPage = result.data.data.current;
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });

      //tree数据
      axios({
        method: "get",
        url:
          "/platform-base-service/platformBaseUserInfo/listOrganizationTree?queryType=0",
        headers: this.headers,
      })
        .then((result) => {
          //   console.log(result.data);
          this.data = result.data.data;
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
    // 查询
    search() {
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseUserInfo/userPageQuery",
        headers: this.headers,
        data: {
          departmentName: this.departmentName,
          username: this.username,
          userStatus: this.status,
          currentPage: 1,
          userType: this.userType,
          pageSize: 10,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.tableData = result.data.data.records;
          this.total = result.data.data.total;
          this.pageSize = result.data.data.size;
          this.currentPage = result.data.data.current;
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
    // 重置
    reset() {
      //数据置空
      this.departmentName = "";
      this.username = "";
      this.status = "";
      this.getListData();
    },
    handleAdd() {
      //新增
      // this.$store.commit("changeIsShow", true);
      // this.$router.push("/addUserArchives");
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/addUserArchives",
        query: { form: "add" },
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    // 编辑
    handleEdit() {
      if (this.multipleSelection.length > 1) {
        this.$message.warning({
          message: this.international.global.global_editNotChooseMore,
          center: true,
        });
        return;
      }
      // this.$store.commit("changeEditId", this.multipleSelection[0].id);
      // this.$store.commit("changeIsShow", false);
      // this.$router.push("/addUserArchives");
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/addUserArchives",
        query: { form: "edit", id: this.multipleSelection[0].id },
      });
    },
    handleReset() {
      //重置密码
      this.showPassword = true;
    },
    passwordConfirm() {
      //确定重置密码
      let resetdata={}
      resetdata.id = this.multipleSelection[0].id;
      //Bcrypt加密流程
      var salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
      resetdata.resetPassStr1 = bcryptjs.hashSync(this.editPassword.resetPassStr1, salt); //进行加密
      resetdata.resetPassStr2 = bcryptjs.hashSync(this.editPassword.resetPassStr2, salt); //进行加密
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseUserInfo/resetPassword",
        headers: this.headers,
        data: resetdata,
      })
        .then((result) => {
          this.showPassword = false;
          this.$message({
            message: '已重置',
            center: true,
            type: "success",
          });
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
    // 表格选择
    // handleSelectionChange(val){

    // },
    handleDisable() {
      //失效
      var brr = [];
      this.multipleSelection.map((res) => {
        brr.push(res.id);
      });
      this.$confirm(this.international.global.global_confirmDeactive, {
        confirmButtonText: this.international.global.global_confirm,
        cancelButtonText: this.international.global.global_cancel,
      })
        .then(() => {
          var arr = [];
          this.multipleSelection.map((res) => {
            arr.push(res.id);
          });
          axios({
            method: "post",
            url: "/platform-base-service/platformBaseUserInfo/failUser",
            headers: this.headers,
            data: brr,
          })
            .then((result) => {
              this.getListData();
            })
            .catch((err) => {
              console.error(err);
              this.$message({
                message: err.response.data.message,
                center: true,
                type: "error",
              });
            });
          this.$message.error({
            message: this.international.global.global_changeStatusFailure,
            center: true,
          });
        })
        .catch(() => {});
    },
    handleEnable() {
      //激活
      var arr = [];
      this.multipleSelection.map((res) => {
        arr.push(res.id);
      });
      this.$confirm(this.international.global.global_confirmActive, {
        confirmButtonText: this.international.global.global_confirm,
        cancelButtonText: this.international.global.global_cancel,
      })
        .then(() => {
          var brr = [];
          this.multipleSelection.map((res) => {
            brr.push(res.id);
          });
          axios({
            method: "post",
            url: "/platform-base-service/platformBaseUserInfo/activeUser",
            headers: this.headers,
            data: arr,
          })
            .then((result) => {
              this.getListData();
            })
            .catch((err) => {
              console.error(err);
              this.$message({
                message: err.response.data.message,
                center: true,
                type: "error",
              });
            });
          this.$message.success({
            message: this.international.global.global_changeStatusSuccess,
            center: true,
          });
        })
        .catch(() => {});
    },
    //每页多少条
    handleSizeChange(val) {
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseUserInfo/userPageQuery",
        headers: this.headers,
        data: {
          departmentName: this.departmentName,
          username: this.username,
          userStatus: this.status,
          userType: this.userType,
          currentPage: this.currentPage,
          pageSize: val,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.tableData = result.data.data.records;
          this.total = result.data.data.total;
          this.pageSize = result.data.data.size;
          this.currentPage = result.data.data.current;
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
    //选择页数
    handleCurrentChange(val) {
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseUserInfo/userPageQuery",
        headers: this.headers,
        data: {
          departmentName: this.departmentName,
          username: this.username,
          userStatus: this.status,
          userType: this.userType,
          currentPage: val,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.tableData = result.data.data.records;
          this.total = result.data.data.total;
          this.pageSize = result.data.data.size;
          this.currentPage = result.data.data.current;
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
    getSelete() {
      axios({
        //用户类型
        method: "get",
        url:
          "/platform-base-service/dictionaryType/listInternalLangByDictionaryType?type=roleType",
        headers: this.headers,
      })
        .then((result) => {
          //   console.log(result.data);
          this.optionsUserType = result.data.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
      //归属机构
      axios({
        method: "get",
        url:
          "/platform-base-service/platformBaseEnterprise/belongManagementQuery?enterpriseType=2",
        headers: this.headers,
      })
        .then((result) => {
          //   console.log(result.data);
          this.optionsAffiliation = result.data.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
      //用户部门
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseDepartment/departmentListQuery",
        headers: this.headers,
        data: {
          departmentName: "",
        },
      })
        .then((result) => {
          //   console.log(result.data);
          this.optionsAttributionDepartment = result.data.data;
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
      },
      immediate: true,
      deep: true,
    },
    // 监听菜单按钮变化并控制页面按钮显示
    menuDataList: {
      handler(data) {
        let btns = getMenuBtnList(data, this.$route.path);
        if (this.international.global) {
          btns.map((item) => {
            if (item.name == this.international.global.global_search)
              this.searchBtn = true;
            if (item.name == this.international.global.global_add)
              this.addBtn = true;
            if (item.name == this.international.global.global_edit)
              this.editBtn = true;
            if (item.name == this.international.global.global_disabled)
              this.deactiveBtn = true;
            if (item.name == this.international.global.global_enable)
              this.activeBtn = true;
            if (item.name == this.international.global.global_resetPassword)
              this.resetPasswordBtn = true;
          });
        }
      },
      immediate: true,
      deep: true,
    },
    "$store.getters.isStatus": function () {
      if (
        this.$store.state.isStatus == true &&
        this.$route.path == "/addUserArchives"
      ) {
        this.getListData();
      }
    },
  },
  mounted() {
    this.getListData();
    this.getSelete();
    //状态下拉框
    axios({
      method: "get",
      url:
        "/platform-base-service/dictionaryType/listInternalLangByDictionaryType?type=status",
      headers: this.headers,
    })
      .then((result) => {
        // console.log(result.data);
        this.optionsStatusList = result.data.data;
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
};
</script>

<style scoped>
#header {
  width: 100%;
  height: calc(100% - 60px);
}
.header {
  width: 100%;

  height: 85px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  margin-bottom: 16px;
}
.headerTop {
  width: 100%;
  height: 85px;
  line-height: 40px;
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
.el-dialog .el-form-item .el-input {
  width: 160px;
}
.userRight >>> .el-dialog .el-dialog__body {
  padding: 10px 20px !important;
}
.userLeft {
  width: 20%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  float: left;
  border: 1px solid #e5e5e5;
}
.userRight {
  width: 80%;
  height: 100%;
  padding-left: 16px;
  box-sizing: border-box;
  float: left;
}
/* .header .el-input {
  width: 180px;
  margin-right: 10px;
}
.header >>> .el-input--suffix {
  width: 180px;
}
.header .el-button {
  margin-left: 10px;
}
.main {
  margin-top: 20px;
}
.main .bottom {
  margin-top: 20px;
}
.footer {
  margin-top: 20px;
  text-align: right;
} */
.from {
  overflow: hidden;
}
.formItem {
  /* float: left; */
}
.formItem >>> .el-form-item {
  float: left;
  margin-left: 40px;
}
.search {
  background: #368cfe !important;
  margin-left: 10px;
}
.reset {
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1);
}
.search:hover {
  color: #fff !important;
}
.reset:hover {
  color: #fff !important;
  background: #368cfe !important;
}

/* ------------ footer -------------- */
.footer {
  width: 100%;
  height: calc(100% - 101px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footerBottom {
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
}
.footerBottom .el-button:nth-child(1) {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:nth-child(1):hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:hover {
  color: #c0c4cc !important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .active:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerTable {
  width: 100%;
  height: calc(100% - 68px);
}
.el-table {
  color: #333333;
}
.footer_informatian {
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: auto;
}
.footer_page {
  width: 100%;
  height: 56px;
  display: flex;
  border-top: 1px solid #e5e5e5;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.footer_informatian .el-table {
  overflow: auto;
}

.confirm {
  float: left;
  margin-left: 75px;
  margin-right: 0;
  background: #368cfe !important;
}
.confirm:hover {
  color: #fff !important;
  background: #409eff !important;
}
.cancel {
  margin-right: 75px;
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1);
}
.cancel:hover {
  color: #fff !important;
  background: #368cfe !important;
}

/* Tree */

.userLeft /deep/ .el-tree-node{
  position: relative;
  padding-left: 16px;
}
.userLeft /deep/ .el-tree-node__children{
  padding-left: 16px;
}
.userLeft /deep/ .el-tree-node :last-child:before {
  height: 38px;
}
.userLeft /deep/ .el-tree>.el-tree-node:before{
  border-left: none;
}
.userLeft /deep/ .el-tree>.el-tree-node:after{
  border-top: none;
}
.userLeft /deep/ .el-tree-node:before{
  content: "";
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}
.userLeft /deep/ .el-tree-node:after{
  content: "";
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}
.userLeft /deep/ .tree :first-child .el-tree-node:before{
  border-left: none;
}
.userLeft /deep/ .el-tree-node:before {
  border-left: 1px dashed #4386c6;
  bottom: 0px;
  height: 100%;
  top: -26px;
  width: 1px;
}
.userLeft /deep/ .el-tree-node:after {
  border-top: 1px dashed #4386c6;
  height: 20px;
  top: 12px;
  width: 24px;
}
</style>
