<template>
  <div id="header">
    <div class="header" v-if="international.global">
      <div class="headerTop">
        <div class="nav">
          <span>{{ international.content.content_dictianary_typeName }}</span>
          <el-input
            v-model="typeName"
            size="small"
            maxlength="50"
            :placeholder="international.content.content_dictianary_typeName"
          ></el-input>
        </div>
        <div class="nav">
          <span>{{ international.content.content_dictianary_typeCode }}</span>
          <el-input
            v-model="typeCode"
            size="small"
            maxlength="50"
            :placeholder="international.content.content_dictianary_typeCode"
          ></el-input>
        </div>
        <el-button
          size="small"
          type="primary"
          class="search"
          @click="search"
          v-if="searchBtn"
          >{{ international.global.global_search }}</el-button
        >
        <el-button
          class="reset"
          size="small"
          type="primary"
          plain
          @click="reset"
          >{{ international.global.global_reset }}</el-button
        >
      </div>
    </div>
    <!-- 国际化弹框 -->
    <el-dialog
      v-if="international.title"
      :title="international.title.title_organization_globalLangusge"
      :visible.sync="dialogVisibleLanguage"
      width="600px"
    >
      <el-table
        :data="dataLanguage"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          prop="id"
          min-width="55"
        ></el-table-column>
        <el-table-column prop="name" min-width="100">
          <template slot-scope="scope">
            <el-input
              v-model="dataLanguage[scope.$index].langKeyId"
              type="hidden"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <el-input
              v-model="dataLanguage[scope.$index].code"
              type="hidden"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="dataLanguage[scope.$index].name"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="value" v-if="international.content">
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="dataLanguage[scope.$index].value"
              :placeholder="
                international.content.content_menuButton_pleaseInput + 'value'
              "
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <!-- 国际化新增 -->
      <span slot="footer" v-if="showLanguage" class="dialog-footer">
        <el-button size="small" @click="cancelLanguage">{{
          international.global.global_cancel
        }}</el-button>
        <el-button size="small" type="primary" @click="confirmLanguage">{{
          international.global.global_confirm
        }}</el-button>
      </span>
      <!-- 国际化修改 -->
      <span slot="footer" v-else class="dialog-footer">
        <el-button size="small" @click="cancelLanguage">{{
          international.global.global_cancel
        }}</el-button>
        <el-button size="small" type="primary" @click="recomposeLanguage">{{
          international.global.global_confirm
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 管理国际化弹框 -->
    <el-dialog
    v-if="international.title"
      :title="international.title.title_organization_globalLangusge"
      :visible.sync="dialogVisibleDictionarieLanguage"
      width="600px"
    >
      <el-table
        :data="dataDictionarieLanguage"
        ref="multipleTableDictionarie"
        @selection-change="handleSelectionChangeDictionarie"
      >
        <el-table-column
          type="selection"
          prop="id"
          min-width="55"
        ></el-table-column>
        <el-table-column prop="name" min-width="100">
          <template slot-scope="scope">
            <el-input
              v-model="dataDictionarieLanguage[scope.$index].langKeyId"
              type="hidden"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <el-input
              v-model="dataDictionarieLanguage[scope.$index].code"
              type="hidden"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="dataDictionarieLanguage[scope.$index].name"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="value">
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="dataDictionarieLanguage[scope.$index].value"
              :placeholder="
                international.content.content_menuButton_pleaseInput + 'value'
              "
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <!-- 国际化新增 -->
      <span slot="footer" v-if="showAddLanguage" class="dialog-footer">
        <el-button size="small" @click="cancelDictionarieLanguage">{{
          international.global.global_cancel
        }}</el-button>
        <el-button size="small" type="primary" @click="confirmDictionarieLanguage">{{
          international.global.global_confirm
        }}</el-button>
      </span>
      <!-- 国际化修改 -->
      <span slot="footer" v-else class="dialog-footer">
        <el-button size="small" @click="cancelDictionarieLanguage">{{
          international.global.global_cancel
        }}</el-button>
        <el-button size="small" type="primary" @click="recomposeDictionarieLanguage">{{
          international.global.global_confirm
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 新增修改弹框 -->
    <el-dialog
      v-if="international.content"
      :title="meg"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div class="menu_block">
        <div class="p">
          <span class="demonstration"
            >{{ international.content.content_dictianary_typeName }}*</span
          >
          <el-input
            size="small"
            v-model="addTypeName"
            placeholder=""
          ></el-input>
        </div>
        <div class="p">
          <span class="demonstration"
            >{{ international.content.content_dictianary_typeCode }}*</span
          >
          <el-input
            size="small"
            v-model="addTypeCode"
            placeholder=""
          ></el-input>
        </div>
      </div>
      <span slot="footer" v-if="show" class="dialog-footer">
        <el-button @click="cancel" size="small">{{
          international.global.global_cancel
        }}</el-button>
        <el-button type="primary" @click="confirm" size="small">{{
          international.global.global_confirm
        }}</el-button>
      </span>
      <span slot="footer" v-else class="dialog-footer">
        <el-button @click="cancel" size="small">{{
          international.global.global_cancel
        }}</el-button>
        <el-button type="primary" @click="handleEditConfirm" size="small">{{
          international.global.global_confirm
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 管理弹框 -->
    <el-dialog
      v-if="international.title"
      :title="international.title.title_organization_info"
      :visible.sync="dialogTableVisible"
      :before-close="handleClose"
      width="700px"
    >
      <div class="header">
        <div class="headerTop">
          <div class="nav">
          <span
            >{{
              international.content.content_dictianaryManagement_dictionaryName
            }}</span
          >
          <el-input
            size="small"
            v-model="name"
            :placeholder="
              international.content.content_menuButton_pleaseInput +
              international.content.content_dictianaryManagement_dictionaryName
            "
          ></el-input>
        </div>
        <div class="nav">
          <span
            >{{
              international.content.content_dictianaryManagement_dictionaryCode
            }}</span
          >
          <el-input
            size="small"
            v-model="code"
            :placeholder="
              international.content.content_menuButton_pleaseInput +
              international.content.content_dictianaryManagement_dictionaryCode
            "
          ></el-input>
        </div>
        <el-button size="small" class="search" type="primary" @click="searchTable">{{
          international.global.global_search
        }}</el-button>
        <el-button size="small" type="primary" @click="addTableData">{{
          international.global.global_add
        }}</el-button>
        </div>
      </div>
      <div class="footer">
        <el-table :data="gridData" border
            stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            size="small">
        <el-table-column
          property="dictionaryName"
          :label="
            international.content.content_dictianaryManagement_dictionaryName
          "
          width="100"
        ></el-table-column>
        <el-table-column
          property="dictionaryCode"
          :label="
            international.content.content_dictianaryManagement_dictionaryCode
          "
          width="100"
        ></el-table-column>
        <el-table-column
          property="createTimeStr"
          width="150"
          :label="
            international.field.field_functionPermissionSettingsList_createTime
          "
        ></el-table-column>
        <el-table-column
          property="updateTimeStr"
          width="150"
          :label="international.field.field_dictianaryManagementList_updateTime"
        ></el-table-column>
        <el-table-column
          :label="
            international.field.field_functionPermissionSettingsList_handle
          "
          min-width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleEditDictionary(scope.$index, scope.row)"
              type="text"
              >{{ international.global.global_update }}</el-button
            >
            <el-button
              @click="handleDeleteDictionary(scope.$index, scope.row)"
              type="text"
              >{{ international.global.global_delete }}</el-button
            >
            <el-button
              @click="handleLanguageDictionary(scope.$index, scope.row)"
              type="text"
              >{{ international.global.global_language }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-dialog>
    <!-- 管理弹框的新增修改弹框 -->
    <el-dialog
      v-if="international.content"
      :title="meg"
      :visible.sync="dialogManagementVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div class="menu_block">
        <div class="p">
          <span class="demonstration"
            >*{{
              international.content.content_dictianaryManagement_dictionaryName
            }}</span
          >
          <el-input
            size="small"
            v-model="addName"
            :placeholder="
              international.content.content_menuButton_pleaseInput +
              international.content.content_dictianaryManagement_dictionaryName
            "
          ></el-input>
        </div>
        <div class="p">
          <span class="demonstration"
            >*{{
              international.content.content_dictianaryManagement_dictionaryCode
            }}</span
          >
          <el-input
            size="small"
            v-model="addCode"
            :placeholder="
              international.content.content_menuButton_pleaseInput +
              international.content.content_dictianaryManagement_dictionaryCode
            "
          ></el-input>
        </div>
        <div class="p">
          <span class="demonstration"
            >*{{
              international.content.content_dictianaryManagement_rank
            }}</span
          >
          <el-input
            size="small"
            type="number"
            validate-event
            v-model="addNumble"
            :placeholder="
              international.content.content_menuButton_pleaseInput +
              international.content.content_dictianaryManagement_rank
            "
          ></el-input>
        </div>
      </div>
      <span slot="footer" v-if="addShow" class="dialog-footer">
        <el-button  size="small" @click="cancelDictionaries">{{
          international.global.global_cancel
        }}</el-button>
        <el-button  size="small" type="primary" @click="confirmDictionaries">{{
          international.global.global_confirm
        }}</el-button>
      </span>
      <span slot="footer" v-else class="dialog-footer">
        <el-button  size="small" @click="cancelDictionaries">{{
          international.global.global_cancel
        }}</el-button>
        <el-button  size="small" type="primary" @click="handleEditConfirmDictionaries">{{
          international.global.global_confirm
        }}</el-button>
      </span>
    </el-dialog>


    <div class="footer" v-if="international.field">
      <div class="footerBottom">
        <el-button @click="addDictionaries" size="small" v-if="addBtn">
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
          {{ international.global.global_edit }}
          </el-button
        >
        <el-button
          @click="handleDelete"
          size="small"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
          v-if="deleteBtn"
          >
          <i class="iconfont icon-shanchu"></i>
          {{ international.global.global_delete }}</el-button
        >
        <el-button
          @click="handleLanguage"
          size="small"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
          v-if="globalBtn"
          >
          <i class="iconfont icon-guojihua"></i>
          {{ international.global.global_language }}</el-button
        >
        <el-button
          @click="administration"
          size="small"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
          v-if="managementBtn"
          >
          <i class="iconfont icon-guanli"></i>
          {{ international.global.global_manage }}</el-button
        >
      </div>
      <div class="footerTable">
        <div class="footer_informatian" v-if="international.field">
          <el-table
            ref="multipleTable"
            align="center"
            :data="tableData"
            border
            stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            size="small"
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
              :label="
                international.field.field_dataPermissionSettingsList_number
              "
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="typeName"
              :label="international.field.field_dictianaryList_typeName"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="typeCode"
              :label="international.field.field_dictianaryList_typecode"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTimeStr"
              :label="
                international.field.field_dictianaryManagementList_createTime
              "
              width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="updateTimeStr"
              :label="international.field.field_dictianaryList_updateTime"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
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
import { getCookie, setCookie, removeCookie, getMenuBtnList } from "../public";
import Admin from "./Admin";
export default {
  name: "dictionaries",
  data() {
    return {
      name: "",
      code: "",
      addName: "",
      addCode: "",
      addNumble: "",
      typeName: "", //类型名称
      typeCode: "", //类型编号
      meg: "新增",
      show: false,
      isDisable: true,
      addShow: false,
      showLanguage: false, //国际化新增
      showAddLanguage: false, //管理国际化新增
      addTypeName: "", //新增类型名称
      addTypeCode: "", //新增类型编号
      dialogVisible: false,
      dialogVisibleLanguage: false,
      dialogTableVisible: false,
      dialogManagementVisible: false,
      dialogVisibleDictionarieLanguage: false,
      tableData: [],
      dataLanguage: [],
      dataDictionarieLanguage: [],
      gridData: [],
      total: 1,
      totalTable: 1,
      id: null, //字典类型id
      valueId: null, //数据字典id
      pageSize: 10,
      pageTableSize: 10,
      multipleSelection: [],
      currentPage: 1,
      currentTablePage: 1,
      international: {}, //国际化标题按钮
      searchBtn: false, //查询按钮是否显示
      addBtn: false, //新增按钮是否显示
      editBtn: false, //修改按钮是否显示
      deleteBtn: false, //删除按钮是否显示
      globalBtn: false, // 国际化按钮是否显示
      managementBtn: false, //管理按钮是否显示
    };
  },
  methods: {
    search() {
      this.getListData();
    },
    reset() {
      this.typeName = '';
      this.typeCode = '';
      this.getListData();
    },
    administration() {
      //管理
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: this.international.content.content_dictianary_manageNotMoreChoose,
          center: true,
          type: "error",
        });
        return;
      }
      this.dialogTableVisible = true;
      this.id = this.multipleSelection[0].id;
      this.getTableData();
    },
    handleSizeChange(val) {
      //每页多少条
      axios({
        method: "post",
        url: "/platform-base-service/dictionaryType/dictionaryTypePageQuery",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          typeName: this.typeName,
          typeCode: this.typeCode,
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //第几页
      axios({
        method: "post",
        url: "/platform-base-service/dictionaryType/dictionaryTypePageQuery",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          typeName: this.typeName,
          typeCode: this.typeCode,
          currentPage: val,
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
      console.log(`当前页: ${val}`);
    },
    handleTableSizeChange(val) {
      //每页多少条
    },
    handleTableCurrentChange(val) {
      //第几页
    },
    handleEdit() {
      //修改
      if (this.multipleSelection.length > 1) {
        this.$message.warning({
            message:this.international.global.global_editNotChooseMore,
            center:true
        })
        return;
      }
      this.show = false;
      this.dialogVisible = true;
      this.id = this.multipleSelection[0].id;
      this.meg = this.international.global.global_update;
      this.addTypeName = this.multipleSelection[0].typeName;
      this.addTypeCode = this.multipleSelection[0].typeCode;
    },
    handleEditConfirm() {
      //确定修改
      axios({
        method: "post",
        url: "/platform-base-service/dictionaryType/editDictionaryType",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          id: this.id,
          typeName: this.addTypeName,
          typeCode: this.addTypeCode,
        },
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status == 0) {
            this.dialogVisible = false;
            this.getListData();
            this.$message({
              type: "success",
              message: this.international.global.global_changeStatusSuccess,
              center: true,
            });
            this.addTypeName = "";
            this.addTypeCode = "";
          } else {
            this.$confirm(result.data.message)
              .then(() => {
                return;
              })
              .catch(() => {});
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
    handleDelete() {
      //删除
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: this.international.global.global_deleteNotChooseMore,
          center: true,
          type: "error",
        });
        return;
      }
      this.$confirm(this.international.global.global_deleteTip)
        .then(() => {
          this.delete();
        })
        .catch(() => {});
    },
    delete() {
      axios({
        method: "get",
        url:
          "/platform-base-service/dictionaryType/delDictionaryType?id=" + this.multipleSelection[0].id,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.getListData();
          this.$message({
              type: "success",
              message: this.international.global.global_deleteSuccess,
              center: true,
            });
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    addTableData() {
      // 管理弹框新增按钮
      this.dialogManagementVisible = true;
      this.addShow = true;
      this.meg = this.international.global.global_add;
    },
    handleEditDictionary(index, row) {
      // 管理弹框修改按钮
      this.dialogManagementVisible = true;
      this.addShow = false;
      this.meg = this.international.global.global_update;
      this.valueId = row.id;
      axios({
        method: "get",
        url:
          "/platform-base-service/dictionary/dictionaryDetails?id=" +
          this.valueId,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.addName = result.data.data.dictionaryName;
          this.addCode = result.data.data.dictionaryCode;
          this.addNumble = result.data.data.dictionaryRank;
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
    handleDeleteDictionary(index, row) {
      // 管理弹框删除按钮
      this.$confirm(this.international.global.global_deleteTip)
        .then(() => {
          axios({
            method: "get",
            url: "/platform-base-service/dictionary/delDictionary?id=" + row.id,
            headers: {
              Authorization: getCookie("HTBD_PASS"),
              language: this.$store.state.language,
            },
          })
            .then((result) => {
              console.log(result.data);
              this.getTableData();
            })
            .catch((err) => {
              this.$message({
                message: err.response.data.message,
                center: true,
                type: "error",
              });
            });
        })
        .catch(() => {});
    },
    handleLanguageDictionary(index, row) {
      // 管理弹框国际化按钮
      this.dialogVisibleDictionarieLanguage = true;
      axios({
        method: "get",
        url:
          "/platform-base-service/dictionary/dictionaryMuliLangQuery?id=" +
          row.id,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.dataDictionarieLanguage = result.data.data;
          result.data.data.map((res) => {
            if (res.id == null) {
              this.showAddLanguage = true;
            } else {
              this.showAddLanguage = false;
            }
          });
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    confirmDictionarieLanguage() {
      // 确定管理弹框国际化新增
      axios({
        method: "post",
        url: "/platform-base-service/dictionary/dictionaryMuliLangAdd",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        // data:this.dataDictionarieLanguage,
        data: this.multipleSelection,
      })
        .then((result) => {
          console.log(result.data);
          this.dialogVisibleDictionarieLanguage = false;
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
    recomposeDictionarieLanguage() {
      // 确定管理弹框国际化修改
      axios({
        method: "post",
        url: "/platform-base-service/dictionary/dictionaryMuliLangModify",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: this.multipleSelection,
      })
        .then((result) => {
          console.log(result.data);
          this.dialogVisibleDictionarieLanguage = false;
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
    cancelDictionarieLanguage() {
      // 取消管理弹框国际化新增修改
      this.dialogVisibleDictionarieLanguage = false;
    },
    confirmDictionaries() {
      // 确定管理弹框新增
      if (this.addName == "" || this.addCode == "" || this.addNumble == "") {
        this.$message({
          message: this.international.global.global_requiredNotEmpty,
          center: true,
          type: "error",
        });
        return;
      }
      axios({
        method: "post",
        url: "/platform-base-service/dictionary/insertDictionary",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          dictionaryName: this.addName,
          dictionaryCode: this.addCode,
          dictionaryTypeId: this.id,
          dictionaryRank: this.addNumble,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.getTableData();
          this.addName = "";
          this.addCode = "";
          this.addNumble = "";
          this.dialogManagementVisible = false;
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
    handleEditConfirmDictionaries() {
      // 确定管理弹框修改
      this.dialogManagementVisible = false;
      axios({
        method: "post",
        url: "/platform-base-service/dictionary/editDictionary",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          dictionaryName: this.addName,
          dictionaryCode: this.addCode,
          id: this.valueId,
          dictionaryRank: this.addNumble,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.getTableData();
          this.dialogManagementVisible = false;
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
    cancelDictionaries() {
      // 取消管理弹框新增
      this.dialogManagementVisible = false;
      this.addName = "";
      this.addCode = "";
      this.addNumble = "";
    },
    searchTable() {
      axios({
        method: "post",
        url: "/platform-base-service/dictionary/dictionaryPageQuery",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          dictionaryName: this.name,
          dictionaryCode: this.code,
          dictionaryTypeId: this.id,
          currentPage: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.gridData = result.data.data.records;
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
    handleLanguage() {
      //国际化
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: this.international.content.content_dictianary_internatonalNotMoreChoose,
          center: true,
          type: "error",
        });
        return;
      }
      this.dialogVisibleLanguage = true;
      axios({
        method: "post",
        url: "/platform-base-service/dictionaryType/dictionaryDetailsOfType",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          id: this.multipleSelection[0].id,
          typeCode: this.multipleSelection[0].typeCode,
        },
      })
        .then((result) => {
          console.log(result.data.data);
          this.dataLanguage = result.data.data;
          result.data.data.map((res) => {
            if (res.id == null) {
              this.showLanguage = true;
            } else {
              this.showLanguage = false;
            }
          });
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    handleSelectionChangeDictionarie(val) {
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
      console.log(this.multipleSelection);
    },
    addDictionaries() {
      //新增
      this.dialogVisible = true;
      this.show = true;
      this.meg = this.international.global.global_add;
    },
    confirm() {
      //确定新增
      if (this.addTypeName == "" || this.addTypeCode == "") {
        this.$message({
          message: this.international.global.global_requiredNotEmpty,
          center: true,
          type: "error",
        });
        return;
      }
      axios({
        method: "post",
        url: "/platform-base-service/dictionaryType/insertDictionaryType",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          typeName: this.addTypeName,
          typeCode: this.addTypeCode,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.getListData();
          this.$message({
              type: "success",
              message: this.international.global.global_addSuccess,
              center: true,
            });
          this.dialogVisible = false;
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
    confirmLanguage() {
      //新增国际化
      axios({
        method: "post",
        url: "/platform-base-service/dictionaryType/dictionaryTypeMuliLangAdd",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        // data:this.dataLanguage,
        data: this.multipleSelection,
      })
        .then((result) => {
          console.log(result.data);
          this.dialogVisibleLanguage = false;
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
      //取消新增
      this.dialogVisible = false;
      this.addTypeName = "";
      this.addTypeCode = "";
    },
    recomposeLanguage() {
      //修改国际化
      axios({
        method: "post",
        url:
          "/platform-base-service/dictionaryType/dictionaryTypeMuliLangModify",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: this.multipleSelection,
      })
        .then((result) => {
          console.log(result.data);
          this.dialogVisibleLanguage = false;
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
    cancelLanguage() {
      this.dialogVisibleLanguage = false;
    },
    handleClose(done) {
      //关闭弹出窗口
      this.name = "";
      this.code = "";
      this.typeName = "";
      this.addTypeName = "";
      this.addTypeCode = "";
      this.addNumble = "";
      this.typeCode = "";
      this.addName = "";
      this.addCode = "";
      done();
    },
    getListData() {
      //初始化数据
      axios({
        method: "post",
        url: "/platform-base-service/dictionaryType/dictionaryTypePageQuery",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          typeName: this.typeName,
          typeCode: this.typeCode,
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
    },
    getTableData() {
      axios({
        method: "get",
        url:
          "/platform-base-service/dictionaryType/dictionaryTypeList?id=" +
          this.id,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          console.log(result.data);
          this.gridData = result.data.data;
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.getListData();
  },
  components: {
    Admin,
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
            if (item.name == this.international.global.global_update)
              this.editBtn = true;
            if (item.name == this.international.global.global_delete)
              this.deleteBtn = true;
            if (item.name == this.international.global.global_language)
              this.globalBtn = true;
            if (item.name == this.international.global.global_manage)
              this.managementBtn = true;
          });
        }
      },
      immediate: true,
      deep: true,
    },
    multipleSelection: function () {
      // this.showLanguage = false;
      // this.showAddLanguage = false;
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
  background: #409eff !important;
}
.reset:hover {
  color: #fff !important;
  background: #368cfe !important;
}
/* .header .el-button {
  margin-right: 0px;
} */
/* .header .el-button + .el-button {
  margin-left: 0px;
} */
.el-pagination {
  float: right;
}
.main {
  width: 100%;
  margin-bottom: 20px;
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
  margin-left: 220px;
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

/* .el-dialog .has-gutter {
  display: none;
} */
.menu_block .p {
  margin-top: 20px;
}
.menu_block .p .el-input {
  width: 160px;
}
.menu_block .p .demonstration {
  font-size: 12px;
  display: inline-block;
  width: 70px !important;
  font-family: Microsoft YaHei;
  font-weight: 400;
  margin-right: 10px;
  text-align: right;
}
.demonstrations {
  font-size: 12px;
  margin-right: 10px;
}
.addValue .el-button {
  margin-top: 20px;
  margin-bottom: 20px;
}
.footer >>> .el-table .el-button{
  padding: 0 !important;
}
.footer >>> .el-table .cell{
  line-height: 23px;
}
</style>
