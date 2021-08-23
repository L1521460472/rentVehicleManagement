<template>
  <div id="paymentAccount" v-loading="loading"  element-loading-text="loading">
      <div class="header" >
        <div class="headerTop scoped">
            <div class="nav">
                <span class="demonstration">所属公司</span>
                <el-select clearable  size="small" v-model="belongCompany"   placeholder="" >
                    <el-option
                    v-for="item in companyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="nav">
                <span class="demonstration">账号</span>
                <el-input maxlength="50" size="small" v-model="account" placeholder=""></el-input>
            </div>
            <el-button class="search" type="primary" size="small" v-if="searchBtn"  @click="search">查询</el-button>
            <el-button class="reset" type="primary" size="small" @click="reset">重置</el-button>
        </div>
      </div>
      <div class="footer" >
        <div class="top">
            <el-button size="small"  v-if="addBtn" @click="addAction">
                <i class="iconfont icon-add"></i>
                新增
            </el-button>
            <el-button size="small" v-if="editBtn" :class="{ 'active': !isDisable }"   :disabled="isDisable" @click="handleEdit">
                <i class="iconfont icon-edit"></i>
                修改
            </el-button>
			<a href="javascript:;" style="color: #368cfe;text-decoration: none;font-size: 14px;margin-left: 20px;" @click="jumpto">账户收款统计报表</a>
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
                style="width: 100%; height: 100%;"
                >
                    <el-table-column
                    type="selection"
                    align="center"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="enterpriseName"
                    label="所属公司"
                    width="140"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="accountDesc"
                    label="账号说明"
                    width="240"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
                    width="200"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="createdByAccount"
                    label="操作账号"
                    min-width="200"
                    show-overflow-tooltip>
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
                    layout="total, sizes, prev, pager, next ,jumper"
                    :total="total"
                    >
                </el-pagination>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { getCookie, setCookie, removeCookie ,getMenuBtnList,openNewTab} from "../../public";
import {getEnterpriseList,getAccountData} from '../../api/financialProcesses/api'
export default {
    name:'paymentAccount',
    data() {
        return {
            total:0, //数据总条数
            currentPage:1,//当前页数
            pageSize:10, //每页长度
            isDisable: true,
            companyList:[],//所属公司列表
            belongCompany:null,//所属公司
            account:null,//账号
            tableData:[],
            selectData:[],//表格选择数据
            loading:false,
            searchBtn:false,//查询按钮是否有权限显示
            addBtn:false,//新增按钮是否有权限显示
            editBtn:false,//修改按钮是否有权限显示
            headers:{
                Authorization: getCookie("HTBD_PASS"),
                language:this.$store.state.language
            }//请求头

        }
    },
    methods: {
		jumpto(){
      openNewTab(this,"渠道账户收款统计","/collectionAccountStatistics")
    },
        // 获取分页数据
        getListData(){
            this.loading = true
            let params = {
                accountNumber: this.account,
                enterpriseId: this.belongCompany,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            }
            getAccountData(params,this.headers).then(res=>{
              if(res.status == 0){
                  setTimeout(() => {
            window.onload()
          }, 10)
                this.loading = false
                this.total = res.data.total
                this.tableData = res.data.records
              }else{
                this.$message.error({
                  message:res.message,
                  center:true
                })
              }
            }).catch(err=>{
              this.loading = false
              this.$message.error({
                  message:err.message,
                  center:true
              })
            })
        },
        // 获取状态列表和归属机构列表
        getStatusListData(){
            // 获取状态列表
            getEnterpriseList({},this.headers).then(res=>{
                this.companyList = res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        // 查询
        search(){
            this.currentPage = 1
            this.getListData()
        },
        // 重置
        reset(){
            //数据置空
            this.belongCompany = null,//所属公司
            this.account = null,//账号
            this.currentPage = 1,
            this.pageSize = 10,
            this.getListData()
        },
        // 新增
        addAction(){
            this.$store.commit("changeIsStatus", false);
            this.$router.push({
                path:'/addAccount',
                query:{from:'add'}
            });

        },
        // 编辑
        handleEdit(row){
            if(this.selectData.length == 1){
                this.$store.commit("changeIsStatus", false);
                this.$router.push({
                    path:'/addAccount',
                    query:{from:'edit',id:this.selectData[0].id}
                });
            }else{
                this.$message.warning({
                    message:'编辑不能多选',
                    center:true
                })
            }
        },
        // 表格选择
        handleSelectionChange(val){
            this.selectData = val;
            this.isDisable = this.selectData.length < 1 ? true : false;
        },
        //每页多少条
        handleSizeChange(val) {
            this.pageSize = val
            this.getListData()
        },
        //选择页数
        handleCurrentChange(val) {
            this.currentPage = val
            this.getListData()
        },
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
    watch:{
      // 监听国际化标题和按钮变化
      internationalTitle:{
          handler(data){
              this.international = data
          },
          immediate:true,
          deep:true
      },
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
            if (this.$store.state.isStatus == true && this.$route.path == '/addAccount') {
                this.getListData();
            }
        },

    },
    mounted(){
        this.getListData()
        this.getStatusListData()
    }
}
</script>

<style scoped>
/* ------------ header -------------- */
#paymentAccount {
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
  /* width: 60px; */
  font-size: 12px;
  margin-left: 20px;
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
.search {
margin-left:10px ;
  background: #368CFE !important;
}
.reset {
  color: #368CFE !important;
  background: rgba(54,140,254,0.1) !important;
  border-color: #b3d8ff;

}
.search:hover {
    color: #fff !important;
}
.reset:hover {
  color: #fff !important;
  background: #368CFE !important;
}

/* ------------ footer -------------- */
.footer {
  width: 100%;
  height: calc(100% - 66px);
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
.footer .top  .el-button:nth-child(1){
  color: #368CFE;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
.footer .top  .el-button:nth-child(1):hover{
  color: #368CFE !important;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
 .top  .el-button:hover{
  color: #C0C4CC !important;
}
.active{
  color: #368CFE !important;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
.footer .top .active:hover{
  color: #368CFE !important;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
.footer .bottom{
  width: 100%;
  height: calc(100% - 68px);
}
.el-table{
  color: #333333;
}
.footerTable {
  width: 100%;
  height:calc(100% - 56px);
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
.footerTable .el-table {
  overflow: auto;
}
.from{
    overflow: hidden;
}
.formItem >>> .el-form-item{
    float: left;
    margin-left: 25px;
}
</style>
