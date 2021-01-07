<template>
  <div id="admin">
    <div v-if="international.global">
      <el-button
        v-if="addBtn"
        size="small"
        @click="addJurisdiction"
        style="margin-bottom: 20px;"
      ><i class="iconfont icon-add"></i>
      {{international.global.global_add}}</el-button>
      <el-dialog :title="meg" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" :before-close="handleClose">
        <div>
          <span class="demonstration">{{international.content.content_menuButton_type}}</span>
          <el-radio :disabled="isShow" v-model="radio" label="1">{{international.content.content_menuButton_menu}}</el-radio>
          <el-radio :disabled="isShow" v-model="radio" label="2">{{international.content.content_menuButton_button}}</el-radio>
        </div>
        <div class="menu_block" v-if="falg01">
          <input type="hidden" v-model="valueId" />
          <div class="p p_language">
            <span class="demonstration">*{{international.content.content_menuButton_name}}</span>
            <el-input size="small" v-model="name" :placeholder="international.content.content_menuButton_name"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">{{international.content.content_menuButton_topMenu}}</span>
            <span @click="getMenuButton">
              <el-cascader
                placeholder=""
                v-model="topMenu"
                :options="options"
                size="small"
                :props="defaultParams"
                ref="refHandle"
                :show-all-levels="false"
                clearCheckedNodes
                @change="handleChange"
                clearable
              ></el-cascader>
            </span>
          </div>
          <div class="p">
            <span class="demonstration">*{{international.content.content_menuButton_router}}</span>
            <el-input size="small" v-model="route" :placeholder="international.content.content_menuButton_inputDescribe"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*{{international.content.content_menuButton_code}}</span>
            <el-input size="small" v-model="code" :placeholder="international.content.content_menuButton_inputDescribe"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*{{international.content.content_menuButton_rank}}</span>
            <el-input-number
              v-model="number"
              size="small"
              controls-position="right"
              @change="handleChange"
              class="p_input"
              :min="1"
              :max="50"
            ></el-input-number>
          </div>
          <div class="p">
            <span class="demonstration">{{international.content.content_menuButton_content}}</span>
            <el-input size="small" v-model="remarks" :placeholder="international.content.content_menuButton_inputDescribe"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">{{international.content.content_menuButton_rule}}</span>
            <el-button @click="add" size="mini">{{international.content.content_menuButton_add}}</el-button>
            <el-table :data="data">
              <el-table-column prop="ruleName">
                <template slot-scope="scope">
                  <el-input v-model="data[scope.$index].id" type="hidden"></el-input>
                </template>
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="data[scope.$index].ruleName"
                    :placeholder="international.content.content_menuButton_pleaseInput + 'ruleName'"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="ruleType">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    @change="changeRuleType"
                    v-model="data[scope.$index].ruleType"
                    :placeholder="international.content.content_menuButton_pleaseInput + 'ruleType'"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button size="small" @click="deleteRow(scope.$index)">{{international.global.global_delete}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="button_block" v-if="falg02">
          <input type="hidden" v-model="valueId" />
          <div class="p">
            <span class="demonstration">*{{international.content.content_menuButton_topMenu}}</span>
            <span @click="getMenuButton">
              <el-cascader
                size="small"
                v-model="topMenu"
                :options="options"
                ref="refHandle"
                :props="defaultParams"
                :show-all-levels="false"
                @change="handleChange"
                clearable
              ></el-cascader>
            </span>
          </div>
          <div class="p">
            <span class="demonstration">*{{international.content.content_menuButton_name}}</span>
            <el-input size="small" v-model="name" :placeholder="international.content.content_menuButton_pleaseInput + international.content.content_menuButton_name"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">{{international.content.content_menuButton_content}}</span>
            <el-input size="small" v-model="remarks" :placeholder="international.content.content_menuButton_inputDescribe"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*{{international.content.content_menuButton_code}}</span>
            <el-input size="small" v-model="code" :placeholder="international.content.content_menuButton_pleaseInput + international.content.content_menuButton_code"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*API</span>
            <el-input size="small" v-model="api" :placeholder="international.content.content_menuButton_pleaseInput + 'API'"></el-input>
          </div>
        </div>
        <div class="button_block" v-if="falg03">
          <input type="hidden" v-model="valueId" />
          <div class="p">
            <span class="demonstration">*{{international.content.content_menuButton_topMenu}}</span>
            <span @click="getMenuButton">
              <el-cascader
                size="small"
                v-model="topMenu"
                :options="options"
                ref="refHandle"
                :props="defaultParams"
                :show-all-levels="false"
                @change="handleChange"
                clearable
              ></el-cascader>
            </span>
            <el-button @click="addButtonData" size="small">{{international.content.content_menuButton_add}}</el-button>
          </div>
          <el-table :data="buttonData">
            <el-table-column prop="name" :label="international.content.content_menuButton_name" align="center">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="buttonData[scope.$index].name"
                  :placeholder="international.content.content_menuButton_pleaseInput + 'ruleName'"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="code" :label="international.content.content_menuButton_code" align="center">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="buttonData[scope.$index].code"
                  :placeholder="international.content.content_menuButton_pleaseInput + 'ruleCode'"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="api" label="API" align="center">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="buttonData[scope.$index].api"
                  :placeholder="international.content.content_menuButton_pleaseInput + 'ruleAPI'"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="content" :label="international.content.content_menuButton_content" align="center">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="buttonData[scope.$index].content"
                  :placeholder="international.content.content_menuButton_pleaseInput + 'ruleContent'"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="small" @click="deleteButtonData(scope.$index)">{{international.global.global_delete}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" v-if="showMenu" class="dialog-footer">
          <el-button size="small" @click="cancel">{{international.global.global_cancel}}</el-button>
          <el-button size="small" type="primary" @click="confirm">{{international.global.global_confirm}}</el-button>
        </span>
        <span slot="footer" v-else-if="showButton" class="dialog-footer">
          <el-button size="small" @click="cancel">{{international.global.global_cancel}}</el-button>
          <el-button size="small" type="primary" @click="confirmButton">{{international.global.global_confirm}}</el-button>
        </span>
        <span slot="footer" v-else class="dialog-footer">
          <el-button size="small" @click="cancel">{{international.global.global_cancel}}</el-button>
          <el-button size="small" type="primary" @click="modification">{{international.global.global_confirm}}</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="international.title.title_organization_globalLangusge" :visible.sync="dialogVisibleLanguage" width="600px">
        <div class="dataLanguage">
          <el-table :data="dataLanguage">
            <el-table-column prop="name" min-width="100">
              <template slot-scope="scope">
                <el-input v-model="dataLanguage[scope.$index].langKeyId" type="hidden"></el-input>
              </template>
              <template slot-scope="scope">
                <el-input v-model="dataLanguage[scope.$index].code" type="hidden"></el-input>
              </template>
              <template slot-scope="scope">
                <el-input size="small" v-model="dataLanguage[scope.$index].name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="dataLanguage[scope.$index].value"
                  :placeholder="international.content.content_menuButton_pleaseInput + 'value'"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="cancelLanguage">{{international.global.global_cancel}}</el-button>
          <el-button size="small" type="primary" @click="confirmLanguage">{{international.global.global_confirm}}</el-button>
        </span>
      </el-dialog>
    </div>


    <div class="footer" v-if="international.field">
      <el-table
        :data="tableData"
        size="small"
        border
        stripe
        :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
        row-key="code"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        style="width: 100%;height:100%;"
       >
        <el-table-column prop="name" show-overflow-tooltip :label="international.field.field_menuButtonList_name" width="180"></el-table-column>
        <el-table-column prop="type" show-overflow-tooltip :label="international.field.field_menuButtonList_type" align="center" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">{{international.content.content_menuButton_menu}}</span>
            <span v-if="scope.row.type == 2">{{international.content.content_menuButton_button}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rank" show-overflow-tooltip :label="international.field.field_menuButtonList_rank" align="center" width="80"></el-table-column>
        <el-table-column prop="code" show-overflow-tooltip :label="international.field.field_menuButtonList_code" width="150"></el-table-column>
        <el-table-column prop="api" show-overflow-tooltip :label="international.field.field_menuButtonList_API" width="150"></el-table-column>
        <el-table-column prop="url" show-overflow-tooltip :label="international.field.field_menuButtonList_router" width="180"></el-table-column>
        <el-table-column prop="content" show-overflow-tooltip :label="international.field.field_menuButtonList_content" width="150"></el-table-column>
        <el-table-column :label="international.field.field_menuButtonList_handle" min-width="160">
          <template slot-scope="scope">
            <el-button
              v-if="editBtn"
              @click="handleClick(scope.row)"
              type="text"
            >{{international.global.global_update}}</el-button>
            <el-button
              v-if="deleteBtn"
              @click="handleDelete(scope.row)"
              type="text"
            >{{international.global.global_delete}}</el-button>
            <el-button
              v-if="globalBtn"
              @click="handleLanguage(scope.row)"
              type="text"
            >{{international.global.global_language}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getCookie, setCookie, removeCookie, getMenuBtnList } from "../public";
import ElementUI from "element-ui";
import { mapGetters } from "vuex";
export default {
  name: "menuButton",
  data() {
    return {
      tableData: [],
      meg: "",
      dialogVisible: false,
      dialogVisibleLanguage: false,
      valueId: "",
      radio: "1", //类型
      falg01: true, //菜单显示隐藏
      falg02: false, //按钮显示隐藏
      falg03: false,
      topMenu: [], //上级菜单
      name: "", //名称
      route: "", //路由
      remarks: "", //描述
      code: "", //编号
      api: "", //API
      options: [], //
      valueLanguage: "",
      defaultParams: {
        label: "name",
        value: "id",
        children: "children",
        checkStrictly: true, //可以选父节点
        emitPath: false, //是否返回由该节点所在的各级菜单的值所组成的数组,设置 false，则只返回该节点的值
      },
      number: 1, //排序
      isShow: false, //是否禁用类型
      sign: false, //新增修改按钮控制,true新增,false修改
      showButton: false, //新增按钮控制
      showMenu: false, //新增菜单控制
      // data: [{ ruleName: "", ruleType: "" }], //规则
      data: [], //规则
      buttonData: [], //添加按钮
      dataLanguage: [],
      international: {}, //国际化标题按钮
      addBtn: false, //新增按钮是否显示
      editBtn: false, //修改按钮是否显示
      deleteBtn: false, //删除按钮是否显示
      globalBtn: false, // 国际化按钮是否显示
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //初始化数据
      axios({
        method: "get",
        url: "/platform-base-service/platformBaseMenu/listMenuButton",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.tableData = result.data.data;
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
    changeRuleType() {
      this.data.map((item) => {
        if (item.ruleType <= -128 || item.ruleType >= 127) {
          console.log(1111);
        }
      });
    },
    handleClick(row) {
      //修改
      this.dialogVisible = true;
      this.meg = this.international.global.global_update;
      this.isShow = true; //禁用类型
      this.sign = false; //true新增按钮,false修改按钮
      // this.falg01 = false;
      // this.falg02 = true;
      // this.falg03 = false;
      this.showButton = false;
      this.showMenu = false;
      this.radio = row.type.toString();
      // console.log(row);
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseMenu/getMenuButtonDetail",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          id: row.id,
          menuType: row.type,
        },
      })
        .then((result) => {
          this.getMenuList();
          this.valueId = result.data.data.id; //id
          this.name = result.data.data.name; //简体名称
          this.route = result.data.data.url; //路由
          this.remarks = result.data.data.content; //描述
          this.code = result.data.data.code; //编号
          this.api = result.data.data.api; //API
          this.topMenu = result.data.data.parentId; //父id
          this.number = Number(result.data.data.menuRank); //排序
          this.data = result.data.data.menuRuleDetailVOList; //规则
          // console.log(result.data);
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
    handleDelete(row) {
      //删除
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseMenu/getDeleteDetail",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          id: row.id,
          menuType: row.type,
        },
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status == 0) {
            //没有就直接删除
            this.delete(row);
          } else {
            //如果有子菜单，就给个提示再确定删除
            this.$confirm(result.data.message)
              .then(() => {
                this.delete(row);
              })
              .catch(() => {});
          }
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    delete(row) {
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseMenu/menu/button/delete",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          id: row.id,
          menuType: row.type,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.getData();
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleLanguage(row) {
      //国际化
      // console.log("选择语言");
      this.dialogVisibleLanguage = true;
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseMenu/getInternationalDetail",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          code: row.code,
          menuType: row.type,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.dataLanguage = result.data.data;
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleChange(value) {
      //选择上级菜单
      // console.log(value);
    },
    getMenuButton() {
      //点击上级菜单
    },
    getRouter() {
      //左侧导航栏
      axios({
        method: "get",
        url: "/platform-base-service/platformBaseMenu/listMenuButtonByUserId",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.menuItems = result.data.data;
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleClose(done) {
      //关闭弹出窗口
      done();
    },
    addJurisdiction() {
      //新增
      this.dialogVisible = true;
      this.isShow = false;
      this.falg01 = true;
      this.falg02 = false;
      this.falg03 = false;
      this.meg = this.international.global.global_add;
      this.radio = "1";
      this.sign = true;
      this.showMenu = true;
      this.empty();
      this.getMenuList();
    },
    getMenuList() {
      //获取菜单按钮列表
      axios({
        method: "get",
        url: "/platform-base-service/platformBaseMenu/listMenu",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.options = this.getTreeData(result.data.data);
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    confirm() {
      //确定新增菜单
      if (
          this.name == "" ||
          this.route == "" ||
          this.number == "" ||
          this.code == ""
        ) {
          this.$message({
            message: this.international.global.global_requiredNotEmpty,
            center: true,
            type: "warning",
          });
          return;
        }
      // console.log(this.value01);
      if (this.topMenu.length == 0 || this.topMenu == null) {
        this.topMenu = "";
      }
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseMenu/menu/save",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          code: this.code,
          name: this.name,
          content: this.remarks,
          menuRank: this.number,
          menuRuleAddDTOList: this.data,
          parentId: (this.topMenu = null ? "" : this.topMenu),
          url: this.route,
        },
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status == 0) {
            this.dialogVisible = false;
            this.getData();
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
    confirmButton() {
      let checked=false;//检查必填项
      if(this.buttonData&&this.buttonData.length>0){
        for(let item of this.buttonData){
          if(item.name==""||item.code==""||item.api==""){
            checked=true;
            break;
          }
        }
      }
      else{
        checked=true;
      }
      //确定按钮新增
      if ( checked|| this.topMenu == "" ) {
          this.$message({
            message: this.international.global.global_requiredNotEmpty,
            center: true,
            type: "warning",
          });
          return;
        }
      let buttonListData = {
        parentId: (this.topMenu = null ? "" : this.topMenu),
        list: this.buttonData,
      };
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseMenu/button/save",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: buttonListData,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status == 0) {
            this.dialogVisible = false;
            this.getData();
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
    cancel() {
      //取消新增
      this.dialogVisible = false;
      this.empty();
    },
    confirmLanguage() {
      //确定国际化
      axios({
        method: "post",
        url:
          "/platform-base-service/platformBaseMenu/saveOrUpdateInternational",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: this.dataLanguage,
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status == 0) {
            this.dialogVisibleLanguage = false;
            this.getData();
            this.getRouter();
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
    cancelLanguage() {
      //取消国际化
      this.dialogVisibleLanguage = false;
      this.empty();
    },
    modification() {
      //确定修改
      if (
          this.name == "" ||
          this.code == "" ||
          this.api == '' ||
          this.menuRank == ''
        ) {
          this.$message({
            message: this.international.global.global_requiredNotEmpty,
            center: true,
            type: "warning",
          });
          return;
        }
      axios({
        method: "post",
        url: "/platform-base-service/platformBaseMenu/menu/button/update",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          api: this.api,
          code: this.code,
          name: this.name,
          content: this.remarks,
          menuRank: this.number,
          id: this.valueId,
          menuRuleAddDTOList: this.data,
          menuType: Number(this.radio),
          parentId: (this.topMenu = null ? "" : this.topMenu),
          url: this.route,
        },
      })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status == 0) {
            this.dialogVisible = false;
            this.getData();
          } else {
            this.$confirm(result.data.message)
              .then(() => {
                return;
              })
              .catch(() => {});
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    add() {
      //规则新增
      if (this.data == []) {
        this.data.push({ ruleName: "", ruleType: "" });
      } else {
        this.data.push({});
      }
    },
    addButtonData() {
      if (this.buttonData instanceof  Array) {
        this.buttonData.push({ name: "", cede: "", api: "", content: "" });
      } else {
        this.buttonData.push({});
      }
    },
    deleteRow(index) {
      //规则删除
      this.data.splice(index, 1);
    },
    deleteButtonData(index) {
      //规则删除
      this.buttonData.splice(index, 1);
    },
    empty() {
      //置空
      this.name = ""; //名称
      this.route = ""; //路由
      this.remarks = ""; //描述
      this.code = ""; //编号
      this.api = ""; //API
      this.topMenu = [];
      this.number = 1; //排序
      // this.data = [{ ruleName: "", ruleType: "" }]; //规则
      this.data = []; //规则
      this.buttonData = [];
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
    radio: function () {
      if (this.radio == "1") {
        this.falg01 = true;
        this.falg02 = false;
        this.falg03 = false;
        this.empty();
        this.getMenuList();
      } else {
        if (this.sign == true) {
          this.falg01 = false;
          this.falg02 = false;
          this.falg03 = true;
          this.showButton = true;
          this.showMenu = false;
          this.empty();
          this.getMenuList();
        } else {
          this.falg01 = false;
          this.falg02 = true;
          this.falg03 = false;
          this.showButton = false;
          this.showMenu = false;
          this.empty();
          this.getMenuList();
        }
      }
    },
    topMenu() {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
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
            if (item.name == this.international.global.global_add) this.addBtn = true;
            if (item.name == this.international.global.global_update) this.editBtn = true;
            if (item.name == this.international.global.global_delete) this.deleteBtn = true;
            if (item.name == this.international.global.global_language) this.globalBtn = true;
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
#admin{
  width: 100%;
  height: calc(100% - 60px);
}
.p .el-input {
  width: calc(100% - 120px) !important;
}
.p > .el-table {
  box-sizing: border-box;
  padding-left: 95px;
}
.p > .el-table::before {
  height: 0 !important;
}
.p > .el-table .el-input {
  width: 100% !important;
}
.p > .el-table td {
  border-bottom: none !important;
}
.p .has-gutter {
  display: none;
}
.el-dialog .language .has-gutter {
  display: none;
}
.el-cascader .el-input {
  width: 180px !important;
}
.el-dialog__footer .el-button {
  margin-right: 0;
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
  width: 130px !important;
}
/* -------------footer ------------- */
.footer {
  width: 100%;
  height: calc(100% - 66px);
  box-sizing: border-box;
  overflow-y: auto;
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
.footer .el-table {
  overflow: auto;
}
.footer >>> .el-table .el-button{
  padding: 0 !important;
}
/* .footer >>> .el-table .cell{
  line-height: 23px;
}
.footer >>> .el-table .el-table__row td{
  height: 34px !important;
  padding: 0 !important;
} */
</style>
