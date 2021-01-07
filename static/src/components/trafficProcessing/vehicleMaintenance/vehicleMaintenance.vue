<template>
  <div id="header" v-loading="loading">
    <div class="header">
      <div class="headerTop scoped">
        <div class="nav">
          <span>所属公司</span>
          <company v-model="enterpriseId"></company>
        </div>
        <div class="nav">
          <span>品牌</span>
          <el-select clearable v-model="brandValue" size="small" placeholder="">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.brandName"
              :value="item.brandName"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span>车型关键字</span>
          <el-input
            v-model="value"
            size="small"
            maxlength="50"
            placeholder=""
          ></el-input>
        </div>
        <el-button size="small" v-if="searchBtn" type="primary" class="search" @click="search"
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
        <el-button @click="handleAdd" v-if="addBtn" size="small">
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
      </div>
      <div class="footerTable">
        <div class="">
          <el-table
            :data="dataList"
            border
            stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            size="small"
            :cell-class-name="cell"
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
              prop="brandName"
              width="120"
              label="品牌"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="vehicleTypeName"
              width="100"
              label="车型"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="ls_EfileIdCodeAddr" width="120" label="图片">
              <template slot-scope="scope">
                <el-image v-for="(item, index) in scope.row.ls_EfileIdCodeAddr" @click="lookFeilAction(scope.row.ls_EfileIdCodeAddr,index)" :key='index' style="width: 16px; height: 16px" :src="item.url" ></el-image>
                <!-- <el-image v-for="(item, index) in scope.row.ls_EfileIdCodeAddr" :key='index' style="width: 16px; height: 16px" :src="item.url" :preview-src-list="[item.url]"></el-image> -->
                <!-- <span class="lookFile" @click="lookFeilAction(scope.row.ls_EfileIdCodeAddr)">查看图片</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="product" width="120" label="车身尺寸">
              <template slot-scope="scope">
                <span>{{scope.row.vehicleLength + "*" + scope.row.width + "*" + scope.row.height}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="maxLoad" width="90" label="额定载质量">
            </el-table-column>
            <el-table-column
              prop="maxPassengers"
              width="100"
              label="额定乘坐人数"
            >
            </el-table-column>
            <el-table-column prop="maxSpeed" width="110" label="最高车速(km/h)">
            </el-table-column>
            <el-table-column prop="vehicleRange" width="80" label="续航里程">
            </el-table-column>
            <el-table-column prop="chargingTime" width="90" label="充电时间(h)">
            </el-table-column>
            <el-table-column
              prop="batteryCapacity"
              min-width="100"
              label="电池容量"
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
      <!-- 查看图片 -->
        <el-dialog :visible.sync="dialogVisible" width="500px">
          <el-carousel :initial-index="initialIndex" trigger="click" height="400px" >
            <el-carousel-item v-for="item in imageUrlList" :key="item.id">
              <img class="imgList" :src="item.efileAddr" alt="" srcset="">
            </el-carousel-item>
          </el-carousel>
        </el-dialog>

      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString, getMenuBtnList } from "../../../public";
import company from "@/components/aacommon/getEnterpriseBox.vue"
export default {
  name: "vehicleMaintenance",
    components:{
      company
    },
  data() {
    return {
      enterpriseId:"",
      loading: false,
      value: null, //车型关键字
      brandValue: null, //品牌
      options: [],
      addBtn: true,
      editBtn: true,
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      isDisable: true,
      imageUrlList:[],//查看图片地址
      initialIndex:0,
      dialogVisible:false,//查看图片弹窗
      searchBtn : false, //查询权限按钮
      addBtn : false, //新增权限按钮
      editBtn : false, // 修改权限按钮
      tableHeight: window.innerHeight - 356 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    cell({row, column, rowIndex, columnIndex}) {
      //第八列添加 red 类
        if(columnIndex == 4){
          return 'formItem'
        }
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/vehicleTypeInfo/vehicleTypePageQuery",
        headers: this.headers,
        data: {
          brandName: this.brandValue,
          vehicleTypeName: this.value,
          currentPage: 1,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          pageSize: val,
        },
      })
        .then((result) => {
          this.loading = false
          if(result.status == 0){
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
    handleCurrentChange(val) {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/vehicleTypeInfo/vehicleTypePageQuery",
        headers: this.headers,
        data: {
          brandName: this.brandValue,
          vehicleTypeName: this.value,
          currentPage: val,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          pageSize: 10,
        },
      })
        .then((result) => {
          this.loading = false
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
    },
    search() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/vehicleTypeInfo/vehicleTypePageQuery",
        headers: this.headers,
        data: {
          brandName: this.brandValue,
          vehicleTypeName: this.value,
          currentPage: 1,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            this.dataList = result.data.data.records
            // .map((item) => {
            //   return {
            //     ...item,
            //     product:
            //       item.vehicleLength + "*" + item.width + "*" + item.height,
            //   };
            // });
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
            this.pageSize = result.data.data.size;
          } else {
            this.$message({
              message: res.data.message,
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
      this.brandValue = "";
    },
    handleAdd() {
      this.$router.push({
        path: "/addVehicleMaintenance",
        query: { form: "add" },
      });
    },
    handleEdit() {
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "编辑不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/addVehicleMaintenance",
        query: { form: "edit", id: this.multipleSelection[0].id },
      });
    },
    // 查看图片
    lookFeilAction(imgList,index){
      this.imageUrlList = []
      if(imgList) this.imageUrlList = imgList
      if(this.imageUrlList<1){
        this.$message.warning({
          message:'暂无图片',
          center:true
        })
      }else{
        this.initialIndex = index
        this.dialogVisible =true
      }
    },

    initData() {
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/vehicleTypeInfo/vehicleTypePageQuery",
        headers: this.headers,
        data: {
          brandName: null,
          vehicleTypeName: null,
          currentPage: this.currentPage,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          pageSize: this.pageSize,
        },
      })
        .then((result) => {
          this.loading = false
          if (result.data.status == 0) {
            this.dataList = result.data.data.records
            // .map((item) => {
            //   return {
            //     ...item,
            //     product:
            //       item.vehicleLength + "*" + item.width + "*" + item.height,
            //   };
            // });
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
      // 下拉菜单
      axios({
        method: "post",
        url: "/vehicle-service/brandInfo/brandInfoListQuery",
        headers: this.headers,
      })
        .then((result) => {
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
.lookFile {
  color: #0000ff;
  cursor: pointer;
}

#header >>> .el-dialog__body{
  padding: 0;
}
#header >>> .el-dialog__header{
  padding: 0;
}
#header >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#header>>> .el-dialog__close{
  color: #fff;
}
#header >>>.el-carousel__button{
  width: 12px;
}
.imgList{
  width: 100%;
  height: 400px;
  display: block;
}

</style>
