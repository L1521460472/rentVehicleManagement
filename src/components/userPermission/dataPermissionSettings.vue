<template>
  <div id="header" v-loading="loading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading">
    <div class="header" v-if="international.global">
            <div class="headerTop scoped">
        <div class="nav">
          <span>{{
            international.content.content_dataPermissionSettingsList_role
          }}</span>
          <el-input
                v-model="roleName"
                size="small"
            maxlength="50"
                :placeholder="
                  international.content.content_dataPermissionSettingsList_role
                "
              ></el-input>
        </div>
        <div class="nav">
          <span>{{
            international.content.content_operationUserPermission_status
          }}</span>
          <el-select v-model="status" size="small" placeholder="">
            <el-option
              v-for="item in optionsStatus"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-button size="small" type="primary" class="search" @click="search" v-if="searchBtn">{{
                international.global.global_search
              }}</el-button>
              <el-button class="reset" size="small" type="primary" plain @click="reset">{{
                international.global.global_reset
              }}</el-button>
      </div>
            <!-- 新增弹框 -->
            <el-dialog
              :title="
                international.title.title_dataPermissionSettings_addDataRole
              "
              :visible.sync="dialogTableVisible"
              :before-close="handleClose"
            >
              <div class="menu_block">
                <div class="p">
                  <span class="demonstrations"
                    >*{{
                      international.content
                        .content_dataPermissionSettingsList_role
                    }}</span
                  >
                  <el-input
                    v-model="name"
                    :placeholder="
                      international.content
                        .content_dataPermissionSettingsList_role
                    "
                  ></el-input>
                  <span class="demonstrations"
                    >*{{
                      international.field
                        .field_dataPermissionSettingsList_content
                    }}</span
                  >
                  <el-input
                    v-model="content"
                    :placeholder="
                      international.content
                        .field_dataPermissionSettingsList_content
                    "
                  ></el-input>
                </div>
              </div>
              <div class="p">
                <el-button @click="addRuleData">{{
                  international.global.global_add
                }}</el-button>
                <el-button @click="handleEditDictionary">{{
                  international.global.global_update
                }}</el-button>
                <el-button @click="handleDeleteDictionary">{{
                  international.global.global_delete
                }}</el-button>
              </div>
              <el-table
                :data="addDataList"
                @selection-change="handleSelectionChange"
                ref="multipleTable"
              >
                <el-table-column type="selection" prop="id" min-width="55">
                </el-table-column>
                <el-table-column
                  property="name"
                  :label="
                    international.field.field_dataPermissionSettingsList_number
                  "
                  width="80"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column
                  property="menuName"
                  width="90"
                  align="center"
                  :label="
                    international.field.field_dataPermissionSettingsList_type
                  "
                ></el-table-column>
                <el-table-column
                  property="ruleName"
                  min-width="100"
                  show-overflow-tooltip
                  align="center"
                  :label="
                    international.field.field_dataPermissionSettingsList_rule
                  "
                ></el-table-column>
                <el-table-column
                  property="businessNameStr"
                  min-width="200"
                  show-overflow-tooltip
                  align="center"
                  :label="
                    international.field.field_dataPermissionSettingsList_value
                  "
                ></el-table-column>
              </el-table>
              <div style="margin-top: 10px;">
                <el-button @click="confirm">{{
                  international.global.global_confirm
                }}</el-button>
                <el-button @click="cancel">{{
                  international.global.global_cancel
                }}</el-button>
              </div>
            </el-dialog>
            <!-- 新增弹框再新增 -->
            <el-dialog
              :title="international.title.title_dataPermissionSettings_setRule"
              width="55%"
              :visible.sync="dialogRuleVisible"
              :before-close="handleClose"
            >
              <div class="menu_block">
                <div class="p">
                  <span class="demonstrations"
                    >*{{
                      international.field.field_dataPermissionSettingsList_type
                    }}</span
                  >
                  <el-select v-model="ruleTypeValue" placeholder="">
                    <el-option
                      v-for="item in optionsTypeRule"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-button @click="addRuleTableData">{{
                    international.global.global_add
                  }}</el-button>
                </div>
              </div>


              <el-table :data="ruleTableData">
                <el-table-column type="selection" prop="id" min-width="55">
                </el-table-column>
                <el-table-column
                  prop="rule"
                  :label="
                    international.field.field_dataPermissionSettingsList_rule
                  "
                  width="200"
                >
                  <template slot-scope="scope">
                    <el-select
                      v-model="ruleTableData[scope.$index].dataType"
                      ref="changeRuleValue"
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
              <div style="margin-top: 10px;" v-if="showRule">
                <el-button @click="confirmAddRule">{{
                  international.global.global_confirm
                }}</el-button>
                <el-button @click="cancelRule">{{
                  international.global.global_cancel
                }}</el-button>
              </div>
              <div style="margin-top: 10px;" v-else>
                <el-button @click="confirmEditRule">{{
                  international.global.global_confirm
                }}</el-button>
                <el-button @click="cancelRule">{{
                  international.global.global_cancel
                }}</el-button>
              </div>
            </el-dialog>
            <!-- 编辑 -->
            <dialoged v-if="showDialog"></dialoged>
    </div>


    <div class="footer">
      <div class="footerBottom">
        <el-button @click="addDataRole" size="small" v-if="addBtn">
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
          @click="handleDisable(233)"
          size="small"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
          v-if="deactiveBtn"
          >
          <i class="iconfont icon-stop"></i>
          {{ international.global.global_disabled }}</el-button
        >
        <el-button
          @click="handleEnable(232)"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
          size="small"
          v-if="activeBtn"
          >
          <i class="iconfont icon-wanchengyunda"></i>
          {{ international.global.global_enable }}</el-button
        >
      </div>
      <div class="footerTable">
        <div class="" v-if="international.field">
          <el-table
          :data="dataList"
          border
            stripe
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            style="width: 100%; height: 100%;"
             @selection-change="handleSelectionChange"
        >
        <el-table-column
              type="selection"
              prop="id"
              align="center"
              width="60"
            ></el-table-column>
          <el-table-column
            prop=""
            width="60"
            :label="international.field.field_dataPermissionSettingsList_number"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.$index + (currentPage - 1) * pagesize + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="roleName"
            width="150"
            :label="
              international.field.field_dataPermissionSettingsList_roleName
            "
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="roleStatus"
            width="80"
            :label="international.field.field_dataPermissionSettingsList_status"
          >
            <template slot-scope="scope">
              <span class="activeStatus" v-if="scope.row.roleStatus == 232"
                >{{ international.global.global_enable }}
              </span>
              <span class="deactiveStatus" v-if="scope.row.roleStatus == 233"
                >{{ international.global.global_disabled }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            width="150"
            :label="
              international.field.field_dataPermissionSettingsList_creator
            "
          >
          </el-table-column>
          <el-table-column
            prop="createTimeStr"
            min-width="150"
            :label="
              international.field.field_dataPermissionSettingsList_createTime
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
            :page-size="pagesize"
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
import { mapActions } from "vuex";
import { getCookie, dateToString, getMenuBtnList } from "../../public";
import dialoged from "./dialoged";
export default {
  name: "dataPermissionSettings",
  data() {
    return {
      dialogTableVisible: false,
      dialogRuleVisible: false,
      roleName: "",
      isDisable: true,//禁用菜单样式
      content: "",
      name: "",
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
      ruleTableData: [],
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
      done();
    },
    handleSizeChange(val) {
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/dataBaseRolePageQuery",
        headers: this.headers,
        data: {
          currentPage: 1,
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
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/dataBaseRolePageQuery",
        headers: this.headers,
        data: {
          currentPage: val,
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
    addDataRole() {
      //新增
      // this.dialogTableVisible = true;
      // this.brr = [];
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path:"/addDataPermission",
        query:{form:'add'}
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    confirm() {
      //新增确定
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
          this.dialogTableVisible = false;
          this.content = "";
          this.name = "";
          this.addDataList = [];
          this.getData();
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
      //新增取消
      this.dialogTableVisible = false;
      this.addDataList = [];
      this.name = "";
      this.content = "";
    },
    handleEdit() {
      //修改
      // console.log(row);
      // this.showDialog = true;
      // this.$store.commit("changeShow", true);
      // this.$store.commit("changeId", this.multipleSelection[0].id);
      if (this.multipleSelection.length > 1) {
        this.$message.warning({
            message:this.international.global.global_editNotChooseMore,
            center:true
        })
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path:"/editDataPermission",
        query:{form:'edit',id:this.multipleSelection[0].id}
      });
    },
    addRuleData() {
      //新增规则
      this.dialogRuleVisible = true;
      this.showRule = true;
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
    handleSelectionChange(val) {
      //功能权限分配表格选中
      this.multipleSelection = val;
      // let ids = [];
      // this.multipleSelection.map((res) => {
      //   ids.push(res.id);
      // });
      // this.userIds = ids;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    handleDeleteDictionary() {
      //新增删除按钮
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
    changeRuleButton(index, row) {
      // console.log(index, row);
      row.businessIdList = [];
    },
    addRuleTableData() {
      //新增规则列表
      this.ruleTableData.push({ dataType: "", businessIdList: [] });
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
    cancelRule() {
      //取消新增修改规则
      this.dialogRuleVisible = false;
      this.ruleTableData = [];
      this.ruleTypeValue = "";
      this.searchRule();
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
        .catch(() => {
        });
    },
    search() {
      //查询
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/dataBaseRolePageQuery",
        headers: this.headers,
        data: {
          currentPage: 1,
          pageSize: 10,
          roleName: this.roleName,
          roleStatus: this.status,
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
      this.getData();
      this.roleName = "";
      this.status = "";
    },
    handleDisable(val) {
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
        url: "/platform-base-service/platformBaseRole/setBaseRoleStatus",
        headers: this.headers,
        data: {
          id: this.multipleSelection[0].id,
          roleStatus: val,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.getData();
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
    handleEnable(val) {
      //启用
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
        url: "/platform-base-service/platformBaseRole/setBaseRoleStatus",
        headers: this.headers,
        data: {
          id: this.multipleSelection[0].id,
          roleStatus: val,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.getData();
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
    getData() {
      //初始数据
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/dataBaseRolePageQuery",
        headers: this.headers,
        data: {
          currentPage: 1,
          pageSize: 10,
          roleName: "",
          roleStatus: "",
        },
      })
        .then((result) => {
            setTimeout(() => {
            window.onload()
          }, 10)
          // console.log(result.data);
          this.dataList = result.data.data.records;
          this.total = result.data.data.total;
          this.currentPage = result.data.data.current;
          this.pageSize = result.data.data.size;
          this.loading = false;
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
    // console.log(this.$route);
    this.getData();
    axios({
      method: "get",
      url:
        "/platform-base-service/dictionaryType/listInternalLangByDictionaryType?type=status",
      headers: this.headers,
    })
      .then((result) => {
        // console.log(result.data);
        this.optionsStatus = result.data.data;
        for (let index = 0; index < result.data.data.length; index++) {
          this.activate = result.data.data[0].value; //激活
          this.disabled = result.data.data[1].value; //失效
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
    "$store.getters.dialogTableVisibles": function () {
      if (this.dialogTableVisibles == false) {
        this.getData();
      }
    },
    "$store.getters.isStatus": function () {
      if (this.$store.state.isStatus == true && this.$route.path == '/addDataPermission') {
        this.getData();
      }
    },
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
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    dialoged,
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
.nav span{
  color: #333333;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 12px;
  line-height: 18px;
  margin-left: 20px;
  margin-right: 5px;
}
.search {
  background: #368CFE !important;
  margin-left: 10px;
}
.reset {
  color: #368CFE !important;
  background: rgba(54,140,254,0.1);
}
.search:hover {
  color: #fff !important;
  background: #409EFF !important;
}
.reset:hover {
  color: #fff !important;
  background: #368CFE !important;
}



.p .el-input {
  width: 202px !important;
}
.p >>> .el-input--suffix {
  width: 202px !important;
}
.tableSelect .el-input {
  width: 350px !important;
}
.tableSelect >>> .el-input--suffix {
  width: 350px !important;
}
.header_navButtom {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 40px;
}
.header_navButtom button {
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
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
.footerBottom .el-button:nth-child(1){
  color: #368CFE;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
.footerBottom .el-button:nth-child(1):hover{
  color: #368CFE !important;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
.footerBottom .el-button:hover{
  color: #c0c4cc !important;
}
.active{
  color: #368CFE !important;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
.footerBottom .active:hover{
  color: #368CFE !important;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
.footerTable{
  width: 100%;
  height: calc(100% - 68px);
}
.el-table{
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

.confirm{
  float: left;
  margin-left: 220px;
  background: #368CFE !important;
}
.confirm:hover{
  color: #fff !important;
  background: #409EFF !important;
}
.cancel{
  margin-right: 220px;
  color: #368CFE !important;
  background: rgba(54,140,254,0.1);
}
.cancel:hover{
  color: #fff !important;
  background: #368CFE !important;
}
.demonstration {
  display: inline-block;
  width: 90px;
  margin-right: 10px;
  text-align: right;
}
.p {
  width: 100%;
  margin-top: 20px;
}
.p_input .el-input__inner {
  width: 202px !important;
}
</style>
