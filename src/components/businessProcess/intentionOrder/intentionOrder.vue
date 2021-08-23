<template>
  <div id="intentionOrder" v-loading="loading">
    <div class="headerTop">
      <div class="nav">
        <span class="demonstration">所属分公司</span>
        <el-select clearable size="small" filterable v-model="belongCompany" placeholder>
          <el-option
            v-for="item in belongCompanyList "
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">订单编号</span>
        <el-input maxlength="50" size="small" v-model="orderNo" placeholder></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">品牌</span>
        <el-select clearable size="small" v-model="brand" placeholder>
          <el-option
            v-for="item in brandList"
            :key="item.id"
            :label="item.brandName"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">车型</span>
        <el-select clearable size="small" v-model="models" placeholder>
          <el-option
            v-for="item in modelsList"
            :key="item.id"
            :label="item.vehicleTypeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">客户类型</span>
        <el-select clearable size="small" v-model="customerType" placeholder>
          <el-option
            v-for="item in customerTypeList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">联系人姓名</span>
        <el-input maxlength="50" size="small" v-model="contact" placeholder></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">联系电话</span>
        <el-input maxlength="50" size="small" v-model="phone" placeholder></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">订单状态</span>
        <el-select clearable size="small" v-model="orderStatus" placeholder>
          <el-option
            v-for="item in orderStatusList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">订单来源</span>
        <el-select clearable size="small" v-model="orderSource" placeholder>
          <el-option
            v-for="item in orderSourceList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav orderTime">
        <span class="demonstration">下单时间</span>
        <el-date-picker
          size="small"
          v-model="orderTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="~"
          start-placeholder=''
          clearable
          end-placeholder=''
        ></el-date-picker>
      </div>
      <el-button class="search" type="primary" v-if="searchBtn" size="small" @click="searchAction">查询</el-button>
      <el-button class="reset" type="primary"  size="small" @click="resetAction">重置</el-button>
    </div>
    <div class="footer">
      <div class="top">
        <el-button size="small" @click="addAction" v-if="addBtn">
          <i class="iconfont icon-add"></i>
          新增
        </el-button>
        <el-button size="small" v-if="addBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="editAction">
          <i class="iconfont icon-edit"></i>
          修改
        </el-button>
        <el-button
          size="small" v-if="distributBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="distributActrion">
          <i class="iconfont icon-distribution"></i>
          分配业务员
        </el-button>
        <el-button
          size="small" v-if="addInfoBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="addInfoAction">
          <i class="iconfont icon-buchongcailiao"></i>
          补充资料
        </el-button>
        <el-button
          size="small" :class="{ 'active': !isDisable }" v-if="auditBtn" :disabled="isDisable" @click="auditAction">
          <i class="iconfont icon-shenhe"></i>
          审核
        </el-button>
        <el-button size="small" v-if="detailBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="detailAction">
          <i class="iconfont icon-chakan"></i>
          详情
        </el-button>
        <el-button size="small" v-if="deleteBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="deleteAction">
          <i class="iconfont icon-shanchu"></i>
          删除
        </el-button>

      </div>
      <div class="bottom">
        <div class="footerTable">
          <el-table
            border
            stripe
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            :data="tableData"
            @selection-change="handleSelectionChange"
            style="width: 100%"
            :height="tableHeight"
          >
            <el-table-column  type="selection" align="center" width="60"></el-table-column>
            <el-table-column prop="enterpriseName" label="所属分公司" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderTimeStr" label="下单时间" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderNumber" label="订单编号" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerTypeStr" label="客户类型" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" label="业务员" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ls_orderDetailStr" label="意向品牌车型信息" width="250" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" v-for="(item,index) in  scope.row.ls_orderDetailStr" :key="index" effect="dark" :content="item" placement="top">
                  <p class="orderBorder" >{{item}}</p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="expectedDateStr" label="期望提车日" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderSourceStr" label="订单来源" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="operationAccount" label="操作账号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personInCharge" label="客户联系人姓名" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phoneNumber" label="电话" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderStatusStr" label="订单状态" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updatedTimeStr" label="更新时间" min-width="140" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="footer_page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            :pager-count="5"
            layout="total, sizes, prev, pager, next ,jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 分配业务员 -->
        <el-dialog
        :visible.sync="dialogVisible"
        title="分配业务员"
        top="200px"
        width="500px">
          <div class="">
            <span>给选中的意向订单分配业务员为：</span>
            <el-select clearable size="small" v-model="salesman" placeholder>
              <el-option
                v-for="item in salesmanList "
                :key="item.id"
                :label="item.salesmanName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="distributConfirm">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { intenaionOrderData, getEnterpriseList,brandList,modelsList,distriSaleman,getSalesmanList} from "../../../api/businessProcess/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
} from "../../../public";
import axios from "axios";
export default {
  name: "intentionOrder",
  data() {
    return {
      loading: false, //是否显示loading
      isDisable: true, //是否禁用修改、处理、审核、查看按钮
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      tableData: [], //表格数据
      selectData: [], //选中表格的数据
      dialogVisible: false,
      belongCompany:'',//所属公司
      orderNo:'',//订单编号
      brand:'',//品牌
      models:'',//车型
      customerType:'',
      contact: "", //联系人
      phone: "", //联系人电话
      orderStatus:'',//订单状态
      orderSource:'',//订单来源
      orderTime:'',//下单时间
      belongCompanyList:[],//所属公司列表
      brandList:[],//品牌列表
      modelsList:[],//车型
      customerTypeList: [
        {
          id: 1,
          value: "个人",
        },
        {
          id: 2,
          value: "企业",
        },
      ], //客户类型
      orderStatusList:[
        {
          id:0,
          value:'待分配业务员'
        },
        {
          id:1,
          value:'待补充签约资料'
        },
        {
          id:2,
          value:'签约审核中'
        },
        {
          id:3,
          value:'审核通过'
        },
        {
          id:4,
          value:'审核不通过'
        }
      ],//订单状态列表
      orderSourceList: [
        {
          id: 0,
          value: "Web后台",
        },
        {
          id: 1,
          value: "App下单",
        },
      ],//订单来源列表
      salesman:'',//业务员
      salesmanList:[],//业务员列表
      searchBtn:false,//查询按钮是否有权限显示
      addBtn:false,//新增按钮是否有权限显示
      editBtn:false,//修改按钮是否有权限显示
      distributBtn:false,//分配业务员按钮是否有权限显示
      addInfoBtn:false,//补充资料按钮是否有权限显示
      auditBtn:false,//审核按钮是否有权限显示
      detailBtn:false,//详情按钮是否有权限显示
      deleteBtn:false,//显示删除按钮
      tableHeight: window.innerHeight - 447 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    getListData() {
      this.loading = true;
      let params = {
        enterpriseId: this.belongCompany !=='' ? this.belongCompany: null,
        orderNumber: this.orderNo !== '' ? this.orderNo: null,
        brandId: this.brand !== '' ? this.brand: null,
        vehicleTypeId: this.models !== '' ? this.models: null,
        orderEndTime:this.orderTime[1] ? this.orderTime[1] : null,
        orderStartTime:this.orderTime[0] ? this.orderTime[0] : null,
        customerType: this.customerType !== '' ? this.customerType: null,
        personInCharge: this.contact !== '' ? this.contact: null,
        phoneNumber: this.phone !== '' ? this.phone: null,
        orderStatus: this.orderStatus !== '' ? this.orderStatus: null,
        orderSource: this.orderSource !== '' ? this.orderSource: null,
        currentPag: this.currentPage,
        pageSize: this.pageSize
      };
      intenaionOrderData(params, this.headers)
        .then((res) => {
          this.loading = false;
          if (res.status == 0) {
              setTimeout(() => {
            window.onload()
          }, 10)
            this.total = res.data.total;
            this.tableData = res.data.records;
          } else {
            this.$message.error({
              message: res.message,
              center: true,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // 获取下拉列表信息
    getListInfo() {
      // 查询所属公司列表
      getEnterpriseList({},this.headers).then(res=>{
        if(res.status == 0){
          this.belongCompanyList = res.data
        }else{
          this.$message.error({
            message: res.message,
            center: true,
          });
        }
      }).catch(err=>{console.log(err)})
      // 查询品牌列表
      brandList({},this.headers).then(res=>{
        if(res.status == 0){
          this.brandList = res.data
        }else{
          this.$message.error({
            message: res.message,
            center: true,
          });
        }
      }).catch(err=>{console.log(err)})
      // 查询车型列表
      let params2 = {
        currentPage: 1,
        pageSize: 1000
      }
      modelsList(params2,this.headers).then(res=>{
        if(res.status == 0){
          this.modelsList = res.data.records
        }else{
          this.$message.error({
            message: res.message,
            center: true,
          });
        }
      }).catch(err=>{console.log(err)})
    },
    // 查询
    searchAction() {
      this.currentPage = 1
      this.getListData();
    },
    // 重置
    resetAction() {
      this.belongCompany = '',//所属公司
      this.orderNo = '',//订单编号
      this.brand = '',//品牌
      this.models = '',//车型
      this.customerType = '',
      this.contact = '', //联系人
      this.phone = '', //联系人电话
      this.orderStatus = '',//订单状态
      this.orderSource = '',//订单来源
      this.orderTime = '',//下单时间
      this.currentPage = 1,
      this.pageSize = 10;
      this.getListData();
    },
    // 新增
    addAction() {
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/addOrder",
        query: { from: "add" },
      });
    },
    // 编辑
    editAction() {
      if (this.selectData.length > 1) {
        this.$message.warning({
          message: "修改不能多选",
          center: true,
        });
        return;
      }
      if (this.selectData[0].orderStatus != 0) {
        this.$message.warning({
          message: "已分配业务员，不可修改",
          center: true,
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/addOrder",
        query: { from: "edit", id: this.selectData[0].id },
      });
    },
    // 分配业务员
    distributActrion(){
      if (this.selectData.length > 1) {
        this.$message.warning({
          message: "分配业务员不能多选",
          center: true,
        });
        return;
      }
      if (this.selectData[0].orderStatus != 0 && this.selectData[0].orderStatus != 1) {
        this.$message.warning({
          message: "已补充资料完成，不可分配业务员",
          center: true,
        });
        return;
      }
      this.salesman = ''
      getSalesmanList({},this.headers).then(res=>{
        this.salesmanList = res.data
      }).catch(err=>{console.log(err)})
      this.dialogVisible = true

    },
    // 分配业务员确认
    distributConfirm(){
      let params = {
        id:this.selectData[0].id,
        userId:this.salesman,
      }
      distriSaleman(params,this.headers).then(res=>{
        this.dialogVisible = false
        if(res.status == 0){
          this.$message.success({
            message:'分配业务员成功',
            center:true
          })
          this.getListData()
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch()
    },
    // 补充资料
    addInfoAction(){
      if (this.selectData.length > 1) {
        this.$message.warning({
          message: "补充资料不能多选",
          center: true,
        });
        return;
      }
      if (this.selectData[0].orderStatus == 0 ) {
        this.$message.warning({
          message: "请先分配业务员",
          center: true,
        });
        return;
      }
      if(this.selectData[0].orderStatus > 2){
        this.$message.warning({
          message: "已审核，不可再补充资料",
          center: true,
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/addInfo",
        query: { from: "addInfo", id: this.selectData[0].id },
      });
    },
    // 审核
    auditAction(){
      if (this.selectData.length > 1) {
        this.$message.warning({
          message: "审核不能多选",
          center: true,
        });
        return;
      }
      if (this.selectData[0].orderStatus == 0 ) {
        this.$message.warning({
          message: "请先分配业务员",
          center: true,
        });
        return;
      }
      if (this.selectData[0].orderStatus == 1 ) {
        this.$message.warning({
          message: "请先补充资料",
          center: true,
        });
        return;
      }
      if(this.selectData[0].orderStatus > 2){
        this.$message.warning({
          message: "审核已完成，不可再审核",
          center: true,
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/auditOrder",
        query: { from: "audit", id: this.selectData[0].id },
      });
    },
    // 详情
    detailAction(){
      if (this.selectData.length > 1) {
        this.$message.warning({
          message: "详情不能多选",
          center: true,
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/auditOrder",
        query: { from: "detail", id: this.selectData[0].id },
      });
    },
    deleteAction(){
      if (this.selectData.length > 1) {
        this.$message.warning({
          message: "删除不能多选",
          center: true,
        });
        return;
      }
      if(this.selectData[0].orderStatusStr=="审核通过"){
        this.$message.warning({
          message: "该订单已审核通过，不能删除",
          center: true,
        });
        return;
      }
      this.$confirm('请确认删除该意向订单？', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios({
                method: "post",
                url: '/vehicle-service/leaseOrderInfo/delLeaseOrderInfo?id='+this.selectData[0].id ,
                headers: this.headers,
                data: null,
              })
              .then((result) => {
                // console.log(result.data)
                if(result.data.status==0){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getListData();
                }
              })
              .catch((err) => {
                this.$message({
                  message: err.message,
                  center: true,
                  type: "error",
                });
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
    },
    //   表格选择
    handleSelectionChange(val) {
      this.selectData = val;
      this.isDisable = val.length < 1 ? true : false;
    },
    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getListData()
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData()
    },
  },
  mounted() {
    this.getListData();
    this.getListInfo()
  },
  computed:{
      // 计算国际化标题和按钮
      internationalTitle(){
          return this.$store.state.languageTitle
      },
      // 计算菜单页面按钮
      menuDataList(){
          return this.$store.state.menuData
      }
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
                if(item.name == '分配业务员') this.distributBtn = true
                if(item.name == '补充资料') this.addInfoBtn = true
                if(item.name == '审核') this.auditBtn = true
                if(item.name == '详情') this.detailBtn = true
                if(item.name == '删除') this.deleteBtn = true
              })
          },
          immediate:true,
          deep:true
      },
    "$store.getters.isStatus": function () {
      if (
        this.$store.state.isStatus == true &&
        (this.$route.path == "/addOrder" || this.$route.path == "/addInfo" || this.$route.path == "/auditOrder")
      ) {
        this.getListData();
      }
    },
  },
};
</script>

<style scoped>
#intentionOrder {
  width: 100%;
  height: calc(100% - 76px);
}
.headerTop {
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 15px;
  margin-bottom: 16px;
}
.nav {
  float: left;
  margin-top: 15px;
}
.demonstration {
  display: inline-block;
  width: 60px;
  font-size: 12px;
  margin-left: 20px;
  margin-right: 10px;
  text-align: right;
  color: #333333;
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
.orderTime >>> .el-input__icon{
  display: none;
}
.orderTime .el-input__inner {
  width: 220px;
}

.search {
  margin-left: 20px;
  margin-top: 15px;
  background: #368cfe !important;
  float: left;
}
.reset {
  margin-top: 15px;
  float: left;
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1) !important;
  border-color: #b3d8ff;
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
  height: calc(100% - 157px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footer .top {
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
}
.footer .top .el-button:nth-child(1) {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footer .top .el-button:nth-child(1):hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}

.top .el-button:hover {
  color: #c0c4cc !important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footer .top .active:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footer .bottom {
  width: 100%;
  height: calc(100% - 68px);
}
.el-table {
  color: #333333;
}
.footerTable {
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: auto;
  overflow-x:auto
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
.footerTable .el-table {
  overflow: auto;
}
.orderBorder{
  width: 210px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #eee;
  background-color: #f4f4f5;
  border-radius: 4px;
  padding: 0 5px;
  overflow:hidden;
	white-space:nowrap;
	text-overflow: ellipsis;

}
</style>
