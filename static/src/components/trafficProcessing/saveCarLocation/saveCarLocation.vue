<template>
  <div
    id="header"
    v-loading="loading"
  >
    <div class="header">
      <div class="headerTop scoped">
      <div class="nav">
          <span>所属公司</span>
          <company v-model="enterpriseId"></company>
        </div>
        <div class="nav">
          <span>地点关键字</span>
          <el-input
            v-model="value"
            size="small"
            maxlength="50"
            placeholder=""
          ></el-input>
        </div>
        <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search"
          >查询</el-button
        >
        <el-button
          class="reset"
          size="small"
          type="primary"
          plain
          @click="reset"
          >重置</el-button
        >
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button @click="handleAdd" size="small" v-if="addBtn">
          <i class="iconfont icon-add"></i>新增
        </el-button>
        <el-button
          @click="handleEdit"
          size="small"
          v-if="editBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-edit"></i>修改
        </el-button>
        <el-button
          @click="handleDelete"
          size="small"
          v-if="deleteBtn"
          :class="{ active: !isDisable }"
          :disabled="isDisable"
        >
          <i class="iconfont icon-shanchu"></i>删除
        </el-button>
      </div>
      <div class="footerTable">
        <div class="">
          <el-table
            :data="dataList"
            border
            stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            size="small"
            style="width: 100%; height: 100%;"
            @selection-change="handleSelectionChange"
            :height="tableHeight"
          >
            <el-table-column
              type="selection"
              prop="id"
              align="center"
              width="60"
            ></el-table-column>
            <el-table-column prop="enterpriseName" label="所属公司" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" width="60" label="序号" align="center">
              <template slot-scope="scope">
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="parkingLotName"
              min-width="200"
              label="地点名称"
              :show-overflow-tooltip="true"
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
import { getCookie, dateToString, getMenuBtnList } from "../../../public";
import company from "@/components/aacommon/getEnterpriseBox.vue"
export default {
  name: "saveCarLocation",
    components:{
      company
    },
  data() {
    return {
      enterpriseId:"",
      loading: false,
      value: "", //车型关键字
      addBtn: true,
      editBtn: true,
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      mgs: "",
      isDisable: true,
      searchBtn : false, //查询权限按钮
      addBtn : false, //新增权限按钮
      editBtn : false, // 修改权限按钮
      deleteBtn:false,//删除权限按钮
      tableHeight: window.innerHeight - 356 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/parkingLotInfo/parkingLotInfoPageQuery",
        headers: this.headers,
        data: {
          parkingName: this.value,
          currentPage: this.currentPage,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          pageSize: val,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
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
    },
    handleCurrentChange(val) {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/parkingLotInfo/parkingLotInfoPageQuery",
        headers: this.headers,
        data: {
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          parkingName: this.value,
          currentPage: val,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
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
      // console.log(val)
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    search() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/parkingLotInfo/parkingLotInfoPageQuery",
        headers: this.headers,
        data: {
         enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          parkingName: this.value,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          // console.log(result.data);
          if (result.data.status == 0) {
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
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
    reset() {
      this.enterpriseId="";
      this.initData();
      this.value = "";
    },
    handleAdd() {
      //新增
      this.$prompt("地点名称", "新增地点", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal:false,
        customClass: 'messageBox-prompt-test'
      })
        .then(({ value }) => {
          axios({
            method: "get",
            url:
              "/vehicle-service/parkingLotInfo/insertParkingLotInfo?name=" +
              value,
            headers: this.headers,
          })
            .then((result) => {
              // console.log(result.data);
              if (result.data.status == 0) {
                this.$message({
                  type: "success",
                  message: "新增成功!",
                  center: true,
                });
                this.initData();
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消新增",
          });
        });
    },
    handleEdit() {
      //修改
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "编辑不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      axios({
        method: "get",
        url:
          "/vehicle-service/parkingLotInfo/parkingLotInfo?id=" +
          this.multipleSelection[0].id,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.$prompt("地点名称", "编辑地点", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal:false,
            customClass: 'messageBox-prompt-test',
            inputValue: result.data.data.parkingLotName,
          })
            .then(({ value }) => {
              axios({
                method: "post",
                url: "/vehicle-service/parkingLotInfo/modifyParkingLotInfo",
                headers: this.headers,
                data: {
                  enterpriseId:this.multipleSelection[0].enterpriseId,
                  id: this.multipleSelection[0].id,
                  name: value,
                },
              })
                .then((result) => {
                  // console.log(result.data);
                  if (result.data.status == 0) {
                    this.$message({
                      type: "success",
                      message: "编辑成功!",
                      center: true,
                    });
                    this.initData();
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
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消编辑",
              });
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
    handleDelete() {
      //删除
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "删除不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$confirm(
        "是否删除此地点？有车辆登记关联此存车地点，则不能删除。",
        "删除地点",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          axios({
            method: "get",
            url:
              "/vehicle-service/parkingLotInfo/delParkingLotInfo?id=" +
              this.multipleSelection[0].id,
            headers: this.headers,
          })
            .then((result) => {
              // console.log(result.data);
              if (result.data.status == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                  center: true,
                });
                this.initData();
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    initData() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/parkingLotInfo/parkingLotInfoPageQuery",
        headers: this.headers,
        data: {
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          parkingName: "",
          currentPage: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          this.loading = false
          if(result.data.status == 0){
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
          }else{
            this.$message.error({
              message:result.data.message,
              center:true
            })
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
    this.initData();
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
    // 监听菜单按钮变化并控制页面按钮显示
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '查询') this.searchBtn = true
            if(item.name == '新增') this.addBtn = true
            if(item.name == '修改') this.editBtn = true
            if(item.name == '删除') this.deleteBtn = true
          })
      },
      immediate:true,
      deep:true
    },
    "$store.getters.isStatus": function () {
      if (
        this.$store.state.isStatus == true &&
        this.$route.path == "/addVehicleMaintenance"
      ) {
        this.initData();
      }
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
  width: 80px;
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
  background: rgba(54, 140, 254, 0.1) !important;
}
.search:hover {
  color: #fff !important;
  background: #409eff !important;
}
.reset:hover {
  color: #fff !important;
  background: #368cfe !important;
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
.demonstration {
  display: inline-block;
  width: 80px;
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
