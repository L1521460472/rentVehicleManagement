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
            <div class="headerTop">
              <div class="nav">
                <span
                  >{{
                    international.content
                      .content_dataPermissionSettingsList_role
                  }}*</span
                >
                <el-input
                  v-model="name"
                  size="small"
                  maxlength="50"
                  :placeholder="
                    international.content
                      .content_dataPermissionSettingsList_role
                  "
                ></el-input>
              </div>
              <div class="nav">
                <span>{{
                  international.field.field_dataPermissionSettingsList_content
                }}</span>
                <el-input
                  v-model="content"
                  size="small"
                  maxlength="300"
                  :placeholder="
                    international.field.field_dataPermissionSettingsList_content
                  "
                ></el-input>
              </div>
            </div>
            <!-- 按钮 -->
            <div class="mianButton">
              <el-button size="small" @click="addRuleData">{{
                international.global.global_add
              }}</el-button>
              <el-button :class="{ active: !isDisable }" :disabled="isDisable" size="small" @click="handleEditDictionary">{{
                international.global.global_update
              }}</el-button>
              <el-button :class="{ active: !isDisable }" :disabled="isDisable" size="small" @click="handleDeleteDictionary">{{
                international.global.global_delete
              }}</el-button>
            </div>
            <!-- 表格 -->
            <el-table
              :data="addDataList"
              @selection-change="handleSelectionChange"
              ref="multipleTable"
              size="small"
              border
              stripe
              :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
              tooltip-effect="dark"
              style="width: 100%;"
            >
              <el-table-column
                type="selection"
                prop="id"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column
                property="id"
                :label="
                  international.field.field_dataPermissionSettingsList_number
                "
                width="60"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                property="menuName"
                width="150"
                show-overflow-tooltip
                :label="
                  international.field.field_dataPermissionSettingsList_type
                "
              ></el-table-column>
              <el-table-column
                property="ruleName"
                width="220"
                show-overflow-tooltip
                :label="
                  international.field.field_dataPermissionSettingsList_rule
                "
              ></el-table-column>
              <el-table-column
                property="businessNameStr"
                min-width="200"
                show-overflow-tooltip
                :label="
                  international.field.field_dataPermissionSettingsList_value
                "
              ></el-table-column>
            </el-table>
          </div>
          <div class="footerButton" v-if="international.content">
            <!-- <el-form-item> -->
            <el-button
              type="primary"
              size="small"
              v-if="showButton"
              @click="confirm"
              >{{ international.global.global_confirm }}</el-button
            >
            <el-button size="small" @click="cancel">{{
              international.global.global_cancel
            }}</el-button>
            <!-- </el-form-item> -->
          </div>
        </el-form>
      </div>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      :title="international.title.title_dataPermissionSettings_setRule"
      width="800px"
      :visible.sync="dialogRuleVisible"
      :before-close="handleClose"
    >
      <div class="menu_block">
        <div class="nav">
          <span
            >*{{
              international.field.field_dataPermissionSettingsList_type
            }}</span
          >
          <el-select size="small" v-model="ruleTypeValue" placeholder="">
            <el-option
              v-for="item in optionsTypeRule"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button size="small" @click="addRuleTableData">{{
            international.global.global_add
          }}</el-button>
          <!-- <el-button size="small" @click="deleteRule">{{
                    international.global.global_delete
                  }}</el-button> -->
        </div>
      </div>
      <div class="footerTable">
        <div class="footer_infomatian">
          <el-table
            :data="ruleTableData"
            ref="multipleTable"
            size="small"
            border
            stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" prop="id" width="60">
            </el-table-column>
            <el-table-column
              prop="id"
              :label="international.field.field_userProfileList_number"
              align="center"
              width="60"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="rule"
              :label="international.field.field_dataPermissionSettingsList_rule"
              width="150"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="ruleTableData[scope.$index].dataType"
                  ref="changeRuleValue"
                  size="small"
                  @change="changeRuleButton(scope.$index, scope.row)"
                  placeholder=""
                >
                  <el-option
                    v-for="item in optionsRule"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              :label="
                international.field.field_dataPermissionSettingsList_value
              "
              width="390"
            >
              <template slot-scope="scope">
                <div class="tableSelect">
                  <el-select
                    v-model="ruleTableData[scope.$index].businessIdList"
                    @focus="changeRule(scope.$index, scope.row)"
                    multiple
                    size="small"
                  >
                    <span v-if="scope.$index == 0">
                      <el-option
                        v-for="item in optionsValue0"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </span>
                    <span v-if="scope.$index == 1">
                      <el-option
                        v-for="item in optionsValue1"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 2">
                      <el-option
                        v-for="item in optionsValue2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 3">
                      <el-option
                        v-for="item in optionsValue3"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 4">
                      <el-option
                        v-for="item in optionsValue4"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 5">
                      <el-option
                        v-for="item in optionsValue5"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 6">
                      <el-option
                        v-for="item in optionsValue6"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 7">
                      <el-option
                        v-for="item in optionsValue7"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 8">
                      <el-option
                        v-for="item in optionsValue8"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 9">
                      <el-option
                        v-for="item in optionsValue9"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option> </span
                    ><span v-if="scope.$index == 10">
                      <el-option
                        v-for="item in optionsValue10"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </span>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="deleteRule(scope.$index, scope.row)"
                  >{{ international.global.global_delete }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="margin-top: 10px;" v-if="showRule">
        <el-button class="confirm" size="small" @click="confirmAddRule">{{
          international.global.global_confirm
        }}</el-button>
        <el-button class="cancel" size="small" @click="cancelRule">{{
          international.global.global_cancel
        }}</el-button>
      </div>
      <div style="margin-top: 10px;" v-else>
        <el-button class="confirm" size="small" @click="confirmEditRule">{{
          international.global.global_confirm
        }}</el-button>
        <el-button class="cancel" size="small" @click="cancelRule">{{
          international.global.global_cancel
        }}</el-button>
      </div>
    </el-dialog>
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
      name: "", //角色名称
      content: "", //描述
      addDataList: [],
      international: {},
      showMes: "", //新增修改标题
      dialogRuleVisible: false,
      form: {
        username: "",
        enterpriseId: "",
        email: "",
        mobile: "",
        password: "",
        userStatus: "",
        content: "",
      },
      roleName: "",
      isDisable: true, //禁用菜单样式
      content: "",
      name: "",
      showButton: false,
      showDialog: false,
      ruleTypeValue: "", //一级菜单
      ruleValue: "", //二级菜单
      status: "",
      activate: "",
      disabled: "",
      optionsTypeRule: [], //一级菜单下拉
      optionsRule: [], //二级菜单下拉（规则）
      optionsValue0: [], //三级菜单下拉（值）
      optionsValue1: [], //三级菜单下拉（值）
      optionsValue2: [], //三级菜单下拉（值）
      optionsValue3: [], //三级菜单下拉（值）
      optionsValue4: [], //三级菜单下拉（值）
      optionsValue5: [], //三级菜单下拉（值）
      optionsValue6: [], //三级菜单下拉（值）
      optionsValue7: [], //三级菜单下拉（值）
      optionsValue8: [], //三级菜单下拉（值）
      optionsValue9: [], //三级菜单下拉（值）
      optionsValue10: [], //三级菜单下拉（值）
      optionsStatus: [],
      multipleSelection: [], //选中框
      input1: "",
      dialogTableVisibles: false,
      value_start: "",
      value_end: "",
      dataList: [],
      brr: [], //
      idStr: "",
      addDataList: [],
      addRuleDataList: [],
      ruleTableData: [{ dataType: "", businessIdList: [] }],
      currentPage: 1,
      pagesize: 10,
      loading: true,
      showRule: false, //是新增规则还是修改规则
      total: 10,
      international: {}, //国际化标题按钮
      searchBtn: false, //查询按钮是否显示
      addBtn: false, //新增按钮是否显示
      editBtn: false, //编辑按钮是否显示
      deactiveBtn: false, //失效按钮是否显示
      activeBtn: false, //激活按钮是否显示
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
    confirm() {
      //新增确定
      if(this.name == ''){
        this.$message({
          message: this.international.global.global_requiredNotEmpty,
          center: true,
          type: "error",
        });
        return;
      }
      var idList = [];
      this.addDataList.map((res) => {
        res.idStr.split(",").map((res2) => {
          idList.push(res2);
        });
      });
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/insertDataBaseRole",
        headers: this.headers,
        data: {
          content: this.content,
          roleName: this.name,
          ruleIdList: idList,
        },
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
    addRuleData() {
      //新增规则
      this.dialogRuleVisible = true;
      (this.ruleTableData = [{ dataType: "", businessIdList: [] }]),
        (this.showRule = true);
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseRole/selectAddDataRoleParamMenu",
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.optionsTypeRule = result.data.data;
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
    handleEditDictionary() {
      //新增修改规则按钮
      this.dialogRuleVisible = true;
      this.showRule = false;
      console.log(this.multipleSelection);
      var idStrArr = [];
      if (this.multipleSelection[0].idStr.indexOf(",") == -1) {
        idStrArr.push(this.multipleSelection[0].idStr);
      } else {
        idStrArr = this.multipleSelection[0].idStr.split(",");
      }
      //类型下拉列表
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseRole/selectAddDataRoleParamMenu",
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.optionsTypeRule = result.data.data;
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
        method: "post",
        url: "/platform-base-service/platformRoleDataOperate/queryDataById",
        headers: this.headers,
        data: {
          idList: idStrArr,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.ruleTableData = result.data.data;
          this.ruleTypeValue = result.data.data[0].menuId;
          for (let i = 0; i < result.data.data.length; i++) {
            if (i == 0) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[0].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue0 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 1) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[1].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue1 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 2) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[2].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue2 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 3) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[3].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue3 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 4) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[4].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue4 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 5) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[5].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue5 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 6) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[6].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue6 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 7) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[7].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue7 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 8) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[8].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue8 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 9) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[9].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue9 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            } else if (i == 10) {
              axios({
                method: "post",
                url:
                  "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
                headers: this.headers,
                data: {
                  id: result.data.data[10].dataType,
                },
              })
                .then((result) => {
                  this.optionsValue10 = result.data.data;
                })
                .catch((err) => {
                  console.error(err);
                });
            }
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
    handleDeleteDictionary() {
      //删除
      this.$confirm(this.international.global.global_deleteTip, {
        confirmButtonText: this.international.global.global_confirm,
        cancelButtonText: this.international.global.global_cancel,
      })
        .then(() => {
          var idStrArr = [];
          if (this.multipleSelection[0].idStr.indexOf(",") == -1) {
            idStrArr.push(this.multipleSelection[0].idStr);
          } else {
            idStrArr = this.multipleSelection[0].idStr.split(",");
          }
          // console.log(idStrArr);
          // console.log(this.brr);
          axios({
            method: "post",
            url:
              "/platform-base-service/platformRoleDataOperate/deleteDataRoleRule",
            headers: this.headers,
            data: {
              idList: idStrArr,
            },
          })
            .then((result) => {
              // console.log(result.data);
              this.searchRule();
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    addRuleTableData() {
      //新增规则列表
      this.ruleTableData.push({ dataType: "", businessIdList: [] });
    },
    changeRuleButton(index, row) {
      //置空table的值
      // console.log(index, row);
      row.businessIdList = [];
    },
    changeRule(index, row) {
      //获取optionsValue
      console.log(index, row);
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseRole/selectAddDataRoleParamValue",
        headers: this.headers,
        data: {
          id: row.dataType,
        },
      })
        .then((result) => {
          console.log(result.data);
          if (index == 0) {
            this.optionsValue0 = result.data.data;
          } else if (index == 1) {
            this.optionsValue1 = result.data.data;
          } else if (index == 2) {
            this.optionsValue2 = result.data.data;
          } else if (index == 3) {
            this.optionsValue3 = result.data.data;
          } else if (index == 4) {
            this.optionsValue4 = result.data.data;
          } else if (index == 5) {
            this.optionsValue5 = result.data.data;
          } else if (index == 6) {
            this.optionsValue6 = result.data.data;
          } else if (index == 7) {
            this.optionsValue7 = result.data.data;
          } else if (index == 8) {
            this.optionsValue8 = result.data.data;
          } else if (index == 9) {
            this.optionsValue9 = result.data.data;
          } else if (index == 10) {
            this.optionsValue10 = result.data.data;
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
    deleteRule(index, row) {
      //删除规则
      let _this = this;
      // console.log(index, row);
      this.$confirm(this.international.global.global_deleteTip, {
        confirmButtonText: this.international.global.global_confirm,
        cancelButtonText: this.international.global.global_cancel,
      })
        .then(() => {
          axios({
            method: "post",
            url:
              "/platform-base-service/platformRoleDataOperate/deleteDataRuleById",
            headers: this.headers,
            data: {
              id: row.id,
            },
          })
            .then((result) => {
              // console.log(result.data);
              this.ruleTableData.splice(index, 1);
            })
            .catch((err) => {
              console.error(err);
              this.$message({
                message: err.response.data.message,
                center: true,
                type: "error",
              });
            });
          this.$message({
            type: "success",
            message: _this.international.global.global_deleteSuccess,
          });
        })
        .catch(() => {});
    },
    confirmAddRule() {
      //确定新增规则
      // console.log(this.ruleTableData);
      let arr = [];
      let obj = {};
      for (var i = 0; i < this.ruleTableData.length; i++) {
        obj = {
          businessIdList: this.ruleTableData[i].businessIdList,
          dataType: this.ruleTableData[i].dataType,
          menuId: this.ruleTypeValue,
          roleId: this.ruleTableData[i].id,
        };
        arr.push(obj);
      }
      axios({
        method: "post",
        url: "/platform-base-service/platformRoleDataOperate/addDataRuleBy",
        headers: this.headers,
        data: arr,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            result.data.data.map((res) => {
              if (res.id) {
                this.brr.push(res.id);
              }
              return this.brr;
            });
            this.searchRule();
            this.ruleTableData = [];
            this.ruleTypeValue = "";
            this.dialogRuleVisible = false;
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
    confirmEditRule() {
      //确定修改规则
      let crr = [];
      let objCrr = {};
      for (var i = 0; i < this.ruleTableData.length; i++) {
        objCrr = {
          businessIdList: this.ruleTableData[i].businessIdList,
          dataType: this.ruleTableData[i].dataType,
          menuId: this.ruleTypeValue,
          id: this.ruleTableData[i].id,
          roleId: this.ruleTableData[i].id,
        };
        crr.push(objCrr);
      }
      axios({
        method: "post",
        url: "/platform-base-service/platformRoleDataOperate/updateDataRule",
        headers: this.headers,
        data: crr,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 0) {
            result.data.data.map((res) => {
              if (res.id) {
                this.brr.push(res.id);
              }
              return this.brr;
            });
            this.searchRule();
            this.ruleTableData = [];
            this.ruleTypeValue = "";
            this.dialogRuleVisible = false;
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
    cancelRule() {
      //取消新增修改规则
      this.dialogRuleVisible = false;
      this.ruleTableData = [];
      this.ruleTypeValue = "";
      this.searchRule();
    },
    searchRule() {
      //查询分页规则
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/queryRulesByRuleIdList",
        headers: this.headers,
        data: this.brr,
      })
        .then((result) => {
          // console.log(result.data);
          this.addDataList = result.data.data.userDataRoleRuleList;
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
    this.showButton = true;
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
        if (this.$route.query.form == "add") {
          this.showMes = this.international.title
            ? this.international.title.title_dataPermissionSettings_addDataRol
            : "";
        } else {
          this.showMes = this.international.title
            ? this.international.title.title_dataPermissionSettings_editDataRol
            : "";
        }
      },
      immediate: true,
      deep: true,
    },
    ruleTypeValue: function () {
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseRole/selectAddDataRoleParamRule",
        headers: this.headers,
        data: {
          id: this.ruleTypeValue,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.optionsRule = result.data.data;
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
.headerTop {
  width: 100%;
  height: 80px;
  /* height: 100%;
  display: flex;
  align-items: center; */
}
.nav {
  float: left;
  margin-left: 40px;
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
.mianButton {
  margin-left: 60px;
  margin-bottom: 20px;
}
/* .mianButton .el-button {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
} */
.menu_block .nav {
  margin-bottom: 20px;
}
.tableSelect >>> .el-selete {
  width: 200px;
}
.tableSelect >>> .el-input--suffix {
  width: 370px;
}
.mianButton .el-button:nth-child(1) {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.mianButton .el-button:nth-child(1):hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.mianButton .el-button:hover {
  color: #c0c4cc !important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.mianButton .active:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.menu_block .nav .el-button{
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.confirm {
  float: left;
  color: #fff;
  margin-left: 310px;
  background: #368cfe !important;
}
.confirm:hover {
  color: #fff !important;
  background: #409eff !important;
}
.cancel {
  margin-right: 310px;
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1);
}
.cancel:hover {
  color: #fff !important;
  background: #368cfe !important;
}
</style>
