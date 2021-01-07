<template>
  <div id="header">
    <div class="userRight">
      <div class="header" v-if="international.global">
        <div class="headerTop scoped">
          <div class="nav">
            <span>所属公司</span>
            <el-select  clearable v-model="enterpriseId" size="small" placeholder="请选择">
              <el-option v-for="item in companyOptions" :key="item.id" :label="item.name" :value="item.id" > </el-option>
            </el-select>
          </div>
          <div class="nav">
            <span>{{international.content.content_userProfile_userAccount}}</span>
            <el-input v-model="username" size="small" maxlength="50"
            :placeholder=" international.content.content_userProfile_userAccount " ></el-input>
          </div>
          <div class="nav">
            <span>用户姓名</span>
            <el-input v-model="xingming" size="small" maxlength="50" placeholder="用户姓名"></el-input>
          </div>
          <div class="nav">
            <span>{{ international.content.content_userProfile_status }}</span>
            <el-select v-model="status" clearable size="small" placeholder="">
              <el-option v-for="item in optionsStatusList" :key="item.id" :label="item.value" :value="item.id" ></el-option>
            </el-select>
          </div>
          <div style="display: block;">
            <el-button class="search" type="primary" @click="search" size="small" v-if="searchBtn">
            {{ international.global.global_search }}</el-button>
            <el-button class="reset" type="primary" plain @click="reset" size="small" >
            {{ international.global.global_reset }}</el-button >
          </div>
        </div>
      </div>
      <div class="footer" v-if="international.global">
        <div class="footerBottom">
          <el-button @click="handleAdd" size="small" v-if="addBtn">
            <i class="iconfont icon-add"></i>{{ international.global.global_add }}
            </el-button>
          <el-button @click="handleEdit" size="small" :class="{ active: !isDisable }" :disabled="isDisable" v-if="editBtn">
            <i class="iconfont icon-edit"></i>
            {{ international.global.global_edit }}
            </el-button>
          <el-button @click="handleDisable" size="small" :class="{ active: !isDisable }" :disabled="isDisable" v-if="deactiveBtn">
            <i class="iconfont icon-stop"></i>
            {{ international.global.global_disabled }}
            </el-button>
          <el-button @click="handleEnable" :class="{ active: !isDisable }" :disabled="isDisable" size="small" v-if="activeBtn">
            <i class="iconfont icon-wanchengyunda"></i>
            {{ international.global.global_enable }}
          </el-button>
          <el-button @click="handleReset" :class="{ active: !isDisable }" :disabled="isDisable" size="small" v-if="resetPasswordBtn">
            <i class="iconfont icon-zhongzhimima"></i>
            {{ international.global.global_resetPassword }}
            </el-button>
          <el-button @click="FunctionalAuthority" :class="{ active: !isaclBtnDisable }" :disabled="isaclBtnDisable"  v-if="roleallocdBtn"
           size="small"> <i class="iconfont icon-gongneng-"></i>分配角色</el-button>
        </div>
        <div class="footerTable">
          <div class="" v-if="international.field">
            <el-table ref="multipleTable" size="small" border stripe
              :data="tableData" :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
              tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange"
              :height="tableHeight" :default-sort="{ prop: 'date', order: 'descending' }">
              <el-table-column type="selection" align="center" width="60">
              </el-table-column>
              <el-table-column prop="id" :label="international.field.field_userProfileList_number"
                align="center" width="60">
                <template slot-scope="scope">
                  {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="enterpriseName" label="所属公司" show-overflow-tooltip >
              </el-table-column>
              <el-table-column prop="roleName" label="角色名称">
              </el-table-column>
              <el-table-column prop="loginName" :label="international.field.field_userProfileList_userAccount">
              </el-table-column>
              <el-table-column prop="username" :label="international.field.field_userProfileList_username">
              </el-table-column>
              <el-table-column prop="mobile" :label="international.field.field_userProfileList_iphone">
              </el-table-column>
              <el-table-column prop="statusText" :label="international.field.field_userProfileList_status" width="80">
                <template slot-scope="scope">
                  <span :class=" scope.row.userStatus == 232 ? 'activeStatus' : 'deactiveStatus'">
                  {{ scope.row.statusText }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer_page">
            <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"
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
      <el-dialog v-if="international.title" :title="international.title.title_appUserSettings_resetPassword"
        :visible.sync="showPassword" width="320px" top="30vh" @close="clearPassword">
        <el-form ref="editPassword" label-width="70px" class="from" label-position="left">
          <div class="formItem">
            <el-form-item :label="international.content.content_userProfile_resetPassword">
              <el-input size="small" type="password" maxlength="8" v-model="editPassword.resetPassStr1"></el-input>
            </el-form-item>
            <el-form-item :label="international.content.content_userProfile_repeatPassword">
              <el-input size="small" type="password" maxlength="8" v-model="editPassword.resetPassStr2"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" class="confirm" type="primary" @click="passwordConfirm" >
          {{ international.global.global_confirm }}</el-button>
          <el-button size="small" class="cancel" @click="showPassword = false">
          {{ international.global.global_cancel }}</el-button>
        </span>
      </el-dialog>
      <!-- 账号权限分配 -->
      <el-dialog v-if="international.global" :title="international.global.global_funcDistribut"
        :visible.sync="dialogVisibleFunction" width="600px" :close-on-click-modal="false" >
        <div class="dialogVisibleHeader">
          <span class="diaMeg">{{international.content.content_operationUserPermission_roleName }}</span>
          <el-input v-model="roleName" size="small" :placeholder="international.content.content_operationUserPermission_roleName">
          </el-input>
          <el-button size="small" type="primary" class="search" @click="handleFunctionSearch">
          {{ international.global.global_search }}</el-button>
          <el-button size="small" type="primary" class="reset" @click="handleFunctionReset">
          {{ international.global.global_reset }}</el-button>
        </div>
        <el-table :data="data" border size="mini" style="width: 80%; margin-left: 10%;"  ref="multipleTable"
          :height="300">
          <el-table-column :label="international.content.content_operationUserPermission_select" width="60" align="center">
            <template slot-scope="scope">
              <el-radio :label="scope.row.id" v-model="functionRadio"  @change.native="getCurrentRow(scope.row, 'function')">
                &nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="id" :label="international.content.content_operationUserPermission_sequence" width="60"
            align="center">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="roleName" :label="international.content.content_operationUserPermission_roleName"
            align="center" min-width="150">
          </el-table-column>
          <el-table-column prop="roleStatusStr" :label="international.content.content_operationUserPermission_status"
            width="100" align="center" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button class="cancel" size="small" @click="cancelFunction">
          {{international.global.global_cancel}}</el-button>
          <el-button class="confirm" size="small" type="primary" @click="confirmFunction">
          {{ international.global.global_confirm }}</el-button
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
  name: "accountManager",
  data() {
    return {
      total: 0, //数据总条数
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      enterpriseId:null,
      companyOptions:[],
      departmentId:null,
      departmentName: "", //部门名称
      username: "", //用户账号
      xingming:"",//用户姓名
      status: "", //状态
      userType: 234, //用户类型
      optionsStatusList: [], //状态列表
      isDisable: true,
      isaclBtnDisable:true,
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
        userType: 234,
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
      roleallocdBtn: true/*false*/, //分配角色
      dialogVisibleFunction:false,//是否显示角色分配对话框
      roleName:'',//角色分配对话框搜索角色
      functionRadio:'',//角色分配对话框
      functionRadio:null,//角色分配对话框
      userIds:[],//角色分配对话框
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
    //账号权限分配
    FunctionalAuthority() {
      this.data=[]
      this.dialogVisibleFunction = true;
      this.roleName = "";
      this.functionRadio = "";
      this.multipleSelection.map((res) => {
        this.userIds.push(res.id);
      });
      let enterpriseids=[]
      for(let item of this.multipleSelection){
        enterpriseids.push(item.enterpriseId)
      }
      axios({
        method: "post",
        url:"/platform-base-service/accountManage/listPlatformUserFunctionAuthorityByPage",
        headers: this.headers,
        data: {
          enterpriseIdList:enterpriseids,
          currentPage: 1,
          pageSize: 1000,
        },
      })
        .then((result) => {
          if(result.data.data&&result.data.data.records&&result.data.data.records.length>0){
           this.data = result.data.data.records;
         }
         else{
           this.$message({
             message: "该账户所属企业下没有数据",
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
    //关闭弹框前
    handleClose(done) {
      done();
    },
    //账号权限分配查询
    handleFunctionSearch() {
      let enterpriseids=[]
      for(let item of this.multipleSelection){
        enterpriseids.push(item.enterpriseId)
      }
      axios({
        method: "post",
        url:"/platform-base-service/accountManage/listPlatformUserFunctionAuthorityByPage",
        headers: this.headers,
        data: {
          enterpriseIdList:enterpriseids,
          roleName: this.roleName,
          roleStatus: "",
          currentPage: 1,
          pageSize: 1000,
        },
      })
        .then((result) => {
          if(result.data.data&&result.data.data.records&&result.data.data.records.length>0){
            this.data = result.data.data.records;
          }
          else{
            this.$message({
              message: "该账户所属企业下没有数据",
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
    //账号权限分配重置
    handleFunctionReset() {
      this.FunctionalAuthority();
    },
    //账号权限分配确定
    confirmFunction() {
      axios({
        method: "post",
        url: "/platform-base-service/accountManage/date/authority/bind",
        headers: this.headers,
        data: {
          roleId: this.functionRadio,
          userIds: this.userIds,
        },
      })
        .then((result) => {
          this.dialogVisibleFunction = false;
          this.$message({
              type: "success",
              message: "账号权限分配成功",
              center: true,
            });
          this.userIds = [];
           this.getListData()
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
    // 弹窗表格单选
    getCurrentRow(row, from) {
      if (from == "function") {
        this.functionRadio = row.id;
      } else if (from == "data") {
        this.dataRadio = row.id;
      }
    },
    //--------------------------------
    //重置密码框后清楚填写的重置密码
    clearPassword(){
      this.editPassword.id="";
      this.editPassword.resetPassStr1="";
      this.editPassword.resetPassStr2="";
    },
    // 获取初始数据
    getListData(currentPage,currentPageSize) {
      if(currentPage){
        this.currentPage=currentPage
      }
      if(currentPageSize){
        this.pageSize=currentPageSize
      }
      axios({
        //分页数据
        method: "post",
        url: "/platform-base-service/accountManage/userPageQuery",
        headers: this.headers,
        data: {
          "enterpriseId": this.enterpriseId,
          "queryType": 0,
          "username": this.username,
          "userStatus": this.status,
          "userType": this.userType,
          "name": this.xingming,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          if(result.data.data&&result.data.data.records){
            this.tableData = result.data.data.records;
            this.total = result.data.data.total;
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err.message,
            center: true,
            type: "error",
          });
        });
    },
    // 查询
    search() {
      this.getListData(1)
    },
    // 重置
    reset() {
      //数据置空
      this.departmentName = "";
      this.username = "";
      this.status = "";
      this.userType = 234;
      this.enterpriseId = null;
      this.departmentId = null
      this.xingming=null
      this.getListData();
    },
    handleAdd() {
      this.$store.commit("changeIsStatus", false);
      this.$router.push({ path: "/accountManagerAddUser", query: { form: "add" }});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
      this.isaclBtnDisable = this.multipleSelection.length == 1 ? false: true;
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
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/accountManagerAddUser",
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
              this.$message.success({
                message: this.international.global.global_changeStatusSuccess,
                center: true,
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
              this.$message.success({
                message: this.international.global.global_changeStatusSuccess,
                center: true,
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
        })
        .catch(() => {});
    },
    //每页多少条
    handleSizeChange(val) {
      this.getListData(1,val)
    },
    //选择页数
    handleCurrentChange(val) {
      this.getListData(val,null)
    },
    getSelete() {
      axios({
        //用户类型
        method: "get",
        url: "/platform-base-service/dictionaryType/listInternalLangByDictionaryType?type=roleType",
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
            if (item.name == '分配角色')
              this.roleallocdBtn = true;
          });
        }
      },
      immediate: true,
      deep: true,
    },
    "$store.getters.isStatus": function () {
      if (this.$store.state.isStatus == true)
      {
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

      axios({//公司
          method: "get",
          url: "/vehicle-service/comboBoxController/getEnterpriseBox",
          headers: this.headers,
        })
          .then((result) => {
            this.companyOptions = result.data.data;
          })
          .catch((err) => {
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
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  margin-bottom: 16px;
}
.headerTop {
  width: 100%;
  line-height: 40px;
  padding: 20px 0px;
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
  width: 100%;
  height: 100%;
  padding-left: 16px;
  box-sizing: border-box;
  float: left;
}
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
