<template>
  <div v-if="international.global">
    <el-dialog
      :title="international.title.title_dataPermissionSettings_updateDataRole "
      :visible.sync="$store.state.dialogTableVisibles"
      :before-close="handleClose"
     >
      <div class="menu_block">
        <div class="p">
          <span class="demonstrations">*{{international.content.content_dataPermissionSettingsList_role}}</span>
          <el-input v-model="name" :placeholder="international.content.content_dataPermissionSettingsList_role"></el-input>
          <span class="demonstrations">*{{international.content.field_dataPermissionSettingsList_content}}</span>
          <el-input v-model="content" :placeholder="international.content.field_dataPermissionSettingsList_content"></el-input>
        </div>
      </div>
      <div class="p">
        <el-button @click="addRuleData">{{international.global.global_add}}</el-button>
        <el-button @click="handleEditDictionary">{{international.global.global_update}}</el-button>
        <el-button @click="handleDeleteDictionary">{{international.global.global_delete}}</el-button>
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
          :label="international.field.field_dataPermissionSettingsList_number"
          width="80"
        >
        <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
        </el-table-column>
        <el-table-column
          property="menuName"
          width="80"
          :label="international.field.field_dataPermissionSettingsList_type"
        ></el-table-column>
        <el-table-column
          property="ruleName"
          min-width="100"
          show-overflow-tooltip
          :label="international.field.field_dataPermissionSettingsList_rule"
        ></el-table-column>
        <el-table-column
          property="businessNameStr"
          min-width="200"
          show-overflow-tooltip
          :label="international.field.field_dataPermissionSettingsList_value"
        ></el-table-column>
      </el-table>
      <div style="margin-top: 10px;">
          <el-button @click="confirm">{{international.global.global_confirm}}</el-button>
          <el-button @click="cancel">{{international.global.global_cancel}}</el-button>
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
          <span class="demonstrations">*{{international.field.field_dataPermissionSettingsList_type}}</span>
          <el-select v-model="ruleTypeValue" placeholder="">
            <el-option
              v-for="item in optionsTypeRule"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button @click="addRuleTableData">{{international.global.global_add}}</el-button>
        </div>
      </div>
      <el-table :data="ruleTableData">
        <el-table-column type="selection" prop="id" min-width="55">
        </el-table-column>
        <el-table-column prop="rule" :label="international.field.field_dataPermissionSettingsList_rule" width="200">
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
        <el-table-column prop="value" :label="international.field.field_dataPermissionSettingsList_value" width="390">
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
            <el-button size="small" @click="deleteRule(scope.$index, scope.row)"
              >{{international.global.global_delete}}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;" v-if="showRule">
        <el-button @click="confirmAddRule">{{international.global.global_confirm}}</el-button>
        <el-button @click="cancelRule">{{international.global.global_cancel}}</el-button>
      </div>
      <div style="margin-top: 10px;" v-else>
        <el-button @click="confirmEditRule">{{international.global.global_confirm}}</el-button>
        <el-button @click="cancelRule">{{international.global.global_cancel}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString } from "../../public";
export default {
  name: "dialoged",
  data() {
    return {
      // dialogTableVisibles: false,
      dialogRuleVisible: false,
      roleName: "",
      content: "",
      name: "",
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
      loading: false,
      showRule: false, //是新增规则还是修改规则
      total: 10,
      international:{},//国际化标题按钮
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
          // console.log(result.data);
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
        url: "/platform-base-service/platformBaseRole/editDataBaseRole",
        headers: this.headers,
        data: {
          content: this.content,
          roleName: this.name,
          id: this.$store.state.id,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.$store.commit('changeShow', false);
          this.content = "";
          this.name = "";
          this.addDataList = [];
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
      this.$store.commit('changeShow', false);
      this.addDataList = [];
      this.name = "";
      this.content = "";
    },
    changeRuleButton(index,row){
      row.businessIdList = [];
    },
    changeRule(index, row) {
      //获取optionsValue
      // console.log(index, row);
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
          // console.log(result.data);
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
    addRuleTableData() {
      //新增规则列表
      this.ruleTableData.push({ dataType: "", businessIdList: [] });
    },
    deleteRule(index, row) {
      //删除规则
      let _this = this
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
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
          roleId: this.$store.state.id,
        };
        arr.push(obj);
      }
      console.log(arr);
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
    searchRule() {
      //查询分页规则

      axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/queryDataRoleRules",
        headers: this.headers,
        data: {
          id:this.$store.state.id,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.addDataList = result.data.data.userDataRoleRuleList;
          this.name = result.data.data.roleName;
          this.content = result.data.data.content;
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
    axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/queryDataRoleRules",
        headers: this.headers,
        data: {
          id:this.$store.state.id,
        },
      })
        .then((result) => {
            setTimeout(() => {
            window.onload()
          }, 10)
          // console.log(result.data);
          this.addDataList = result.data.data.userDataRoleRuleList;
          this.name = result.data.data.roleName;
          this.content = result.data.data.content;
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
  computed:{
        // 计算国际化标题和按钮
      internationalTitle(){
          return this.$store.state.languageTitle
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
    '$store.getters.dialogTableVisibles':function(){
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseRole/queryDataRoleRules",
        headers: this.headers,
        data: {
          id:this.$store.state.id,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.addDataList = result.data.data.userDataRoleRuleList;
          this.name = result.data.data.roleName;
          this.content = result.data.data.content;
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
    // 监听国际化标题和按钮变化
    internationalTitle:{
        handler(data){
            this.international = data
        },
        immediate:true,
        deep:true
    },

  },
};
</script>
<style scoped>
#header {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  min-width: 1116px;
  height: 150px;
  box-sizing: border-box;
  padding: 16px;
}
.el-row {
  width: 100%;
  height: 100%;
}
.el-col {
  width: 100%;
  height: 100%;
}
.header_nav {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.header_navTop {
  width: 100%;
  height: 50%;
}
.header .el-input {
  width: 202px;
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
  min-width: 1116px;
  height: calc(100% - 150px);
  box-sizing: border-box;
  padding: 0 16px 16px 16px;
}
.footer_nav {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow-y: auto;
}
.footer_informatian {
  width: 100%;
  height: 85%;
  overflow-y: auto;
}
.footer_page {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
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
