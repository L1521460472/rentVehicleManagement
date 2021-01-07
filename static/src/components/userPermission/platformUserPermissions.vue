<template>
  <div
    id="header"
    v-loading="loading"
    element-loading-text="loading"
    element-loading-spinner="el-icon-loading"
  >
    <div class="header" v-if="international.global">
      <div class="headerTop scoped">
        <div class="nav">
          <span>{{
            international.content.content_operationUserPermission_email
          }}</span>
          <el-input
            v-model="e_mail"
            size="small"
            maxlength="50"
            :placeholder="
              international.content.content_operationUserPermission_email
            "
          ></el-input>
        </div>
        <div class="nav">
          <span>{{
            international.content.content_operationUserPermission_username
          }}</span>
          <el-input
            v-model="userName"
            size="small"
            maxlength="50"
            :placeholder="
              international.content.content_operationUserPermission_username
            "
          ></el-input>
        </div>
        <div class="nav">
          <span>{{
            international.content.content_operationUserPermission_affiliation
          }}</span>
          <el-input
            v-model="affiliation"
            size="small"
            maxlength="50"
            :placeholder="
              international.content.content_operationUserPermission_affiliation
            "
          ></el-input>
        </div>
        <div class="nav">
          <span>{{
            international.content.content_operationUserPermission_status
          }}</span>
          <el-select v-model="status" size="small" placeholder="">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
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

    <!-- 功能权限分配 -->
    <el-dialog
      v-if="international.global"
      :title="international.global.global_funcDistribut"
      :visible.sync="dialogVisibleFunction"
      width="600px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="dialogVisibleHeader">
        <span class="diaMeg">{{
          international.content.content_operationUserPermission_roleName
        }}</span>
        <el-input
          v-model="roleName"
          size="small"
          :placeholder="
            international.content.content_operationUserPermission_roleName
          "
        ></el-input>
        <el-button
          size="small"
          type="primary"
          class="search"
          @click="handleFunctionSearch"
          >{{ international.global.global_search }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          class="reset"
          @click="handleFunctionReset"
          >{{ international.global.global_reset }}</el-button
        >
      </div>
      <el-table
        :data="data"
        border
        size="mini"
        style="width: 80%; margin-left: 10%;"
        ref="multipleTable"
        :height="300"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :label="international.content.content_operationUserPermission_select"
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="functionRadio"
              @change.native="getCurrentRow(scope.row, 'function')"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          :label="
            international.content.content_operationUserPermission_sequence
          "
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          :label="
            international.content.content_operationUserPermission_roleName
          "
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="roleStatusStr"
          :label="international.content.content_operationUserPermission_status"
          width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" size="small" @click="cancelFunction">{{
          international.global.global_cancel
        }}</el-button>
        <el-button
          class="confirm"
          size="small"
          type="primary"
          @click="confirmFunction"
          >{{ international.global.global_confirm }}</el-button
        >
      </span>
    </el-dialog>
    <!-- 数据权限分配 -->
    <el-dialog
      v-if="international.global"
      :title="international.global.global_dataDistribut"
      :visible.sync="dialogVisibleData"
      width="600px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="dialogVisibleHeader">
        <span class="diaMeg">{{
          international.content.content_operationUserPermission_roleName
        }}</span>
        <el-input
          v-model="roleName"
          size="small"
          :placeholder="
            international.content.content_operationUserPermission_roleName
          "
        ></el-input>
        <el-button
          size="small"
          type="primary"
          class="search"
          @click="handleDataSearch"
          >{{ international.global.global_search }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          class="reset"
          @click="handleDataReset"
          >{{ international.global.global_reset }}</el-button
        >
      </div>
      <el-table
        :data="data"
        border
        size="mini"
        ref="multipleTable"
        style="width: 80%; margin-left: 10%;"
        @selection-change="handleSelectionChangeData"
      >
        <el-table-column
          :label="international.content.content_operationUserPermission_select"
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="functionRadio"
              @change.native="getCurrentRow(scope.row, 'function')"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          :label="
            international.content.content_operationUserPermission_sequence
          "
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          :label="
            international.content.content_operationUserPermission_roleName
          "
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="roleStatusStr"
          :label="international.content.content_operationUserPermission_status"
          width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="cancel"
          size="small"
          @click="cancelData"
          >{{ international.global.global_cancel }}</el-button
        >
        <el-button
          class="confirm"
          size="small"
          type="primary"
          @click="confirmData"
          >{{ international.global.global_confirm }}</el-button
        >
      </span>
    </el-dialog>
    <div class="footer">
      <div class="footerBottom">
       <!-- <el-button @click="addUser" size="small" v-if="addBtn">
          <i class="iconfont icon-add"></i>
          {{international.global.global_add}}
        </el-button>
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
        > -->
        <el-button
          @click="FunctionalAuthority"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
          size="small"
          v-if="funcBtn"
          >
          <i class="iconfont icon-gongneng-"></i>
          {{ international.global.global_funcDistribut }}</el-button
        >
        <el-button
          @click="DataAuthority"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
          size="small"
          v-if="dataBtn"
          >
          <i class="iconfont icon-shujuyuan"></i>
          {{ international.global.global_dataDistribut }}</el-button
        >
      </div>
      <div class="footerTable">
        <div class="" v-if="international.field">
          <el-table
            border
            stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            :data="dataList"
            size="small"
            style="width: 100%; height: 100%;"
            @selection-change="handleSelectionChange"
            :height="tableHeight"
          >
            <el-table-column
              type="selection"
              prop="id"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="date"
              width="60"
              :label="
                international.field.field_platformUserPermissionsList_number
              "
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="loginName"
              width="150"
              :label="
                international.field.field_platformUserPermissions_userAccount
              "
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="username"
              width="120"
              show-overflow-tooltip
              :label="
                international.field
                  .field_operationUserPermissionList_username
              "
            >
            </el-table-column>
            <el-table-column
              prop="email"
              width="140"
              show-overflow-tooltip
              :label="
                international.field.field_platformUserPermissionsList_email
              "
            >
            </el-table-column>
            <el-table-column
              prop="mobile"
              width="110"
              :label="
                international.field.field_platformUserPermissionsList_mobile
              "
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="userStatusStr"
              show-overflow-tooltip
              width="80"
              :label="international.field.field_platformUserPermissionst_status"
            >
              <template slot-scope="scope">
                  <span :class="scope.row.userStatus == 232 ? 'activeStatus':'deactiveStatus'">{{scope.row.userStatusStr}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="enterpriseName"
              show-overflow-tooltip
              width="150"
              :label="international.field.field_userProfileList_affiliation"
            >
            </el-table-column>
            <el-table-column
              prop="functionRoleName"
              width="140"
              show-overflow-tooltip
              :label="
                international.field.field_platformUserPermissions_functionalRole
              "
            >
            </el-table-column>
            <el-table-column
              prop="dataRoleName"
              min-width="150"
              show-overflow-tooltip
              :label="
                international.field.field_platformUserPermissions_dataAuthority
              "
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
  </div>
</template>
<script>
import axios from "axios";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
} from "../../public";
export default {
  name: "platformUserPermissions",
  data() {
    return {
      e_mail: "", //邮箱
      userName: "", //用户账号
      affiliation: "", //归属管理机构
      status: "",
      isDisable: true,
      options: [],
      showMes: "", //新增修改标题
      showButton: false, //确定新增修改按钮
      optionsEnterpriseId: [], //归属管理机构下拉
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      loading: true,
      total: 10,
      dialogVisible: false,
      dialogVisibleFunction: false,
      dialogVisibleData: false,
      form: {
        username: "",
        enterpriseId: "",
        email: "",
        mobile: "",
        password: "",
        userStatus: "",
        content: "",
      },
      roleName: "", //角色名称
      showClick: false,
      functionRadio: "", //功能权限分配单选
      userIds: [],
      data: [], //功能权限分配表格数据
      multipleSelection: [], //功能权限分配表格选中数据
      international: {}, //国际化标题按钮
      searchBtn: false, //查询按钮是否显示
      addBtn: false, //新增按钮是否显示
      funcBtn: false, //功能权限分配是否显示
      dataBtn: false, //数据权限分配是否显示
      editBtn: false, //编辑按钮是否显示
      deactiveBtn: false, //失效按钮是否显示
      activeBtn: false, //激活按钮是否显示
      tableHeight: window.innerHeight - 356 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    search() {
      //查询
      axios({
        method: "post",
        url:
          "/platform-base-service/platformUserAuthoritySetting/listPlatformUserAuthorityByPage",
        headers: this.headers,
        data: {
          email: this.e_mail,
          enterpriseId: "",
          enterpriseName: this.affiliation,
          userStatus: this.status,
          username: this.userName,
          currentPage: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.dataList = result.data.data.records;
          this.total = result.data.data.total;
          this.currentPage = result.data.data.current;
          this.pageSize = result.data.data.size;
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
    reset() {
      //重置
      this.e_mail = "";
      this.userName = "";
      this.status = "";
      this.affiliation = "";
      this.getDataList();
    },
    // 弹窗表格单选
    getCurrentRow(row, from) {
      if (from == "function") {
        this.functionRadio = row.id;
      } else if (from == "data") {
        this.dataRadio = row.id;
      }
    },
    addUser() {
      //新增
      // this.$store.commit("changeIsShow", true);
      // this.$router.push("/addPlatformUser");
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path:"/addPlatformUser",
        query:{form:'add'}
      });
    },
    FunctionalAuthority() {
      //功能权限分配
      this.dialogVisibleFunction = true;
      this.roleName = "";
      this.functionRadio = "";
      this.multipleSelection.map((res) => {
        this.userIds.push(res.id);
      });
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseRole/listPlatformUserFunctionAuthorityByPage",
        headers: this.headers,
        data: {
          currentPage: 1,
          pageSize: 1000,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.data = result.data.data.records;
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
    handleFunctionSearch() {
      //功能权限分配查询
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseRole/listPlatformUserFunctionAuthorityByPage",
        headers: this.headers,
        data: {
          roleName: this.roleName,
          roleStatus: "",
          currentPage: 1,
          pageSize: 1000,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.data = result.data.data.records;
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
    handleFunctionReset() {
      //功能权限分配重置
      this.FunctionalAuthority();
    },
    confirmFunction() {
      //功能权限分配确定
      axios({
        method: "post",
        url:
          "/platform-base-service/platformUserAuthoritySetting/function/authority/bind",
        headers: this.headers,
        data: {
          roleId: this.functionRadio,
          userIds: this.userIds,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.dialogVisibleFunction = false;
          this.$message({
              type: "success",
              message: this.international.global.global_funcDistributSuccess,
              center: true,
            });
          this.getDataList();
          this.showClick = false;
          this.userIds = [];
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
    cancelFunction() {
      this.dialogVisibleFunction = false;
    },
    handleSelectionChange(val) {
      //功能权限分配表格选中
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    handleSelectionChangeData(val) {
      this.multipleSelection = val;
      this.showClick = true;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    DataAuthority() {
      //数据权限分配
      this.dialogVisibleData = true;
      this.roleName = "";
      this.functionRadio = "";
      this.multipleSelection.map((res) => {
        this.userIds.push(res.id);
      });
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseRole/listPlatformUserDataAuthorityByPage",
        headers: this.headers,
        data: {
          currentPage: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.data = result.data.data.records;
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
    handleDataSearch() {
      //数据权限分配查询
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseRole/listPlatformUserDataAuthorityByPage",
        headers: this.headers,
        data: {
          roleName: this.roleName,
          currentPage: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.data = result.data.data.records;
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
    handleDataReset() {
      //数据权限分配重置
      this.DataAuthority();
    },
    confirmData() {
      //数据权限分配确定
      axios({
        method: "post",
        url:
          "/platform-base-service/platformUserAuthoritySetting/date/authority/bind",
        headers: this.headers,
        data: {
          roleId: this.functionRadio,
          userIds: this.userIds,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.dialogVisibleData = false;
          this.$message({
              type: "success",
              message: this.international.global.global_dataDistributSuccess,
              center: true,
            });
          this.getDataList();
          this.showClick = false;
          this.userIds = [];
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
    cancelData(){
      this.dialogVisibleData = false;
      // this.$message({
      //         type: "info",
      //         message: "已取消数据权限分配!",
      //         center: true,
      //       });
    },
    handleDisable() {
      //失效
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
            url:
              "/platform-base-service/platformUserAuthoritySetting/status/disabled",
            headers: this.headers,
            data: {
              ids: arr,
            },
          })
            .then((result) => {
              // console.log(result.data);
              this.getDataList();
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
                message:this.international.global.global_changeStatusSuccess,
                center:true
            })
        })
        .catch(() => {
        });
      // console.log(this.multipleSelection);
    },
    handleEnable() {
      //激活
      let _this = this;
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
            url:
              "/platform-base-service/platformUserAuthoritySetting/status/enabled",
            headers: this.headers,
            data: {
              ids: brr,
            },
          })
            .then((result) => {
              // console.log(result.data);
              this.getDataList();
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
                message:this.international.global.global_changeStatusSuccess,
                center:true
            })
        })
        .catch(() => {
        });
    },
    handleEdit() {
      //修改
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: this.international.global.global_editNotChooseMore,
          center: true,
          type: "error",
        });
        return;
      }
      // this.$store.commit("changeEditId", this.multipleSelection[0].id);
      // this.$store.commit("changeIsShow", false);
      // this.$router.push("/addPlatformUser");
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path:"/addPlatformUser",
        query:{form:'edit',id:this.multipleSelection[0].id}
      });
    },
    handleSizeChange(val) {
      //每页多少条
      console.log(val);
      axios({
        method: "post",
        url:
          "/platform-base-service/platformUserAuthoritySetting/listPlatformUserAuthorityByPage",
        headers: this.headers,
        data: {
          email: this.e_mail,
          enterpriseId: "",
          enterpriseName: this.affiliation,
          userStatus: this.status,
          username: this.userName,
          currentPage: this.currentPage,
          pageSize: val,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.dataList = result.data.data.records;
          this.total = result.data.data.total;
          this.currentPage = result.data.data.current;
          this.pageSize = result.data.data.size;
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
    handleCurrentChange(val) {
      //第几页
      // console.log(val);
      axios({
        method: "post",
        url:
          "/platform-base-service/platformUserAuthoritySetting/listPlatformUserAuthorityByPage",
        headers: this.headers,
        data: {
          email: this.e_mail,
          enterpriseId: "",
          enterpriseName: this.affiliation,
          userStatus: this.status,
          username: this.userName,
          currentPage: val,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.dataList = result.data.data.records;
          this.total = result.data.data.total;
          this.currentPage = result.data.data.current;
          this.pageSize = result.data.data.size;
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
    handleClose(done) {
      //关闭弹框前
      done();
    },
    getDataList() {
      axios({
        method: "post",
        url:
          "/platform-base-service/platformUserAuthoritySetting/listPlatformUserAuthorityByPage",
        headers: this.headers,
        data: {
          email: this.e_mail,
          enterpriseId: "",
          enterpriseName: this.affiliation,
          userStatus: this.status,
          username: this.userName,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.loading = false;
          this.dataList = result.data.data.records;
          this.total = result.data.data.total;
          this.currentPage = result.data.data.current;
          this.pageSize = result.data.data.size;
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
    this.getDataList();
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
            if (item.name == this.international.global.global_funcDistribut)
              this.funcBtn = true;
            if (item.name == this.international.global.global_dataDistribut)
              this.dataBtn = true;
          });
        }
      },
      immediate: true,
      deep: true,
    },
    "$store.getters.isStatus": function () {
      if (this.$store.state.isStatus == true && this.$route.path == '/addPlatformUser') {
        this.getDataList();
      }
    },
  },
};
</script>
<style scoped>
/* ------------ header -------------- */
#header {
  width: 100%;
  height: calc(100% - 76px);
}
.header {
  width: 100%;
  height: 66px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  margin-bottom: 16px;
}
.headerTop {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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
.dialogVisibleHeader {
  margin-bottom: 10px;
}
.dialogVisibleHeader .diaMeg {
  color: #000000;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 12px;
  line-height: 18px;
  margin-left: 55px;
  margin-right: 5px;
}
.dialogVisibleHeader .el-input {
  width: 160px;
}
.search {
  background: #368cfe !important;
  margin-left: 10px;
}
.reset {
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1) !important;
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
  height: calc(100% - 66px);
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
/* .footerBottom .el-button:nth-child(1) {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
} */
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
  margin-left: 220px!important;
  background: #368cfe !important;
}
.confirm:hover {
  color: #fff !important;
  background: #409eff !important;
}
.cancel {
  margin-right: 220px;
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1);
}
.cancel:hover {
  color: #fff !important;
  background: #368cfe !important;
}
</style>
