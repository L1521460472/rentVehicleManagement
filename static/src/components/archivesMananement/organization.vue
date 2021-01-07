<template>
  <div id="organization" v-loading="loading"  element-loading-text="loading">
      <div class="header" v-if="international.global">
        <div class="headerTop scoped">
            <div class="nav">
                <span class="demonstration">{{international.content.content_organization_organizationCode}}</span>
                <el-input maxlength="50" size="small" v-model="searchCode"
                :placeholder="international.content.content_organization_organizationCode"></el-input>
            </div>
            <div class="nav">
                <span class="demonstration">{{international.content.content_organization_organizationName}}</span>
                <el-input maxlength="50" size="small" v-model="searchName"
                 :placeholder="international.content.content_organization_organizationName"></el-input>
            </div>
            <div class="nav">
                <span class="demonstration">{{international.content.content_organization_status}}</span>
                <el-select clearable  size="small" v-model="status" value-key="value"
                :placeholder="international.content.content_organization_status" >
                    <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
            <el-button class="search" type="primary" size="small" v-if="searchBtn"
             @click="search">{{international.global.global_search}}</el-button>
            <el-button class="reset" type="primary" size="small" @click="reset">{{international.global.global_reset}}</el-button>
        </div>
      </div>
      <div class="footer" v-if="international.field">
        <div class="top">
            <el-button size="small" v-if="addBtn" @click="addAction">
                <i class="iconfont icon-add"></i>
                {{international.global.global_add}}
            </el-button>
            <el-button size="small" :class="{ 'active': !isDisable }" v-if="editBtn"  :disabled="isDisable" @click="handleEdit">
                <i class="iconfont icon-edit"></i>
                {{international.global.global_edit}}
            </el-button>
            <el-button size="small" :class="{ 'active': !isDisable }" v-if="deactiveBtn" :disabled="isDisable" @click="loseEefficacy"  >
                <i class="iconfont icon-stop"></i>
                {{international.global.global_disabled}}
            </el-button>
            <el-button size="small" :class="{ 'active': !isDisable }" v-if="activeBtn" :disabled="isDisable" @click="handleActive" >
                <i class="iconfont icon-wanchengyunda"></i>
                {{international.global.global_enable}}
            </el-button>
        </div>
        <div class="bottom">
            <div class="footerTable">
                <el-table border stripe :header-cell-style="{background:'#F5F7FA',color:'#333333'}" size="small" :data="tableData"
                @selection-change="handleSelectionChange" style="width: 100%; height: 100%;" :height="tableHeight">
                    <el-table-column type="selection"  align="center" width="60"></el-table-column>
                    <el-table-column prop="id" :label="international.field.field_organizationList_serialNumber"
                    align="center" width="60">
                        <template slot-scope="scope">
                            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="enterpriseCode" :label="international.field.field_organizationList_organizationCode"
                     width="140"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column  prop="enterpriseName" :label="international.field.field_organizationList_organizationName"
                     width="180"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="statusText" :label="international.field.field_organizationList_status" align="center"
                    width="80" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span :class="scope.row.enterpriseStatus == 230 ? 'activeStatus':'deactiveStatus'">
                            {{scope.row.statusText}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="parentEnterpriseName"
                    :label="international.field.field_organizationList_belongOrganization"
                    width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column  prop="headOfPerson" :label="international.field.field_organizationList_principal"
                    width="130" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="accountBalance" label="企业余额"></el-table-column>
                    <el-table-column prop="mobile" :label="international.field.field_organizationList_phone"
                    width="130" show-overflow-tooltip>
                    </el-table-column>
                   <!-- <el-table-column prop="email" :label="international.field.field_organizationList_email"
                    min-width="160" show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column prop="dueDate" label="到期时间" min-width="120" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="openAccounts" label="可开账号个数" min-width="100" show-overflow-tooltip align="center">
                      <template slot-scope="scope">
                          <span v-html="scope.row.openAccounts==0?'无限制':scope.row.openAccounts"></span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="openedAccounts" label="已开账号个数" min-width="100" show-overflow-tooltip align="center">                    </el-table-column>
                    <el-table-column prop="" label="操作人" width="80" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span v-if="scope.row.updatedByStr">{{scope.row.updatedByStr}}</span>
                        <span v-else>{{scope.row.createdByStr}}</span>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="footer_page">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="pageSize" :pager-count="5"
                    layout="total, sizes, prev, pager, next ,jumper" :total="total" >
                </el-pagination>
            </div>
        </div>
      </div>

  </div>
</template>

<script>
import { getCookie, setCookie, removeCookie ,getMenuBtnList,formatDate,formatJE} from "../../public";
import {getOrganizationData,getStatusList ,activeOrganization,loseEefficacyOrganization} from '../../api/fileManagement/api'
export default {
    name:'organization',
    data() {
        return {
            total:0, //数据总条数
            currentPage:1,//当前页数
            pageSize:10, //每页长度
            searchCode:'',//机构编码
            searchName:'',//机构名称
            status:'',//状态
            isDisable:true,//是否禁用按钮
            statusList:[],//状态列表
            belongList:[],//机构归属列表
            rentStatusList:[],//租用状态列表
            managementUserlist:[],//负责人列表
            tableData:[],
            ids:[],//表格选中id的集合
            showAddToast:false, //是否显示新增弹窗
            showEditToast:false,//是否显示编辑弹窗
            loading:false, //是否显示loading
            international:{},//国际化标题按钮
            searchBtn:false, //查询按钮是否显示
            addBtn:false, //新增按钮是否显示
            editBtn:false, //编辑按钮是否显示
            deactiveBtn:false, //失效按钮是否显示
            activeBtn:false, //激活按钮是否显示
            tableHeight: window.innerHeight - 356 +'',
            headers:{
                Authorization: getCookie("HTBD_PASS"),
                language:this.$store.state.language
            }//请求头

        }
    },
    methods: {
        // 获取分页数据
        getListData(){
            this.loading = true
            let params = {
                enterpriseCode: this.searchCode,
                enterpriseName: this.searchName,
                enterpriseStatus: this.status.id,
                queryType: 1,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            }
            getOrganizationData(params,this.headers).then(res=>{
                this.loading = false
                this.total = res.data.total
                this.tableData = res.data.records
                if(this.tableData){
                  for(let item of this.tableData){
                    for(let pname in item){
                      if(pname=="dueDate")
                      {
                        item.dueDate=formatDate(item.dueDate,'yyyy-MM-dd');
                      }
                      if(pname=="accountBalance"){
                         item.accountBalance=formatJE(item.accountBalance);
                      }
                    }
                  }
                }
            }).catch(err=>{
                this.loading = false
                console.log(err)
            })
        },
        // 获取状态列表和归属机构列表
        getStatusListData(){
            // 获取状态列表
            getStatusList({type:'enterpriseStatus'},this.headers).then(res=>{
                this.statusList = res.data
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
            this.searchCode = '',
            this.searchName= '',
            this.currentPage = 1,
            this.pageSize = 10,
            this.status = ''
            this.getListData()
        },
        // 激活状态
        handleActive(){
            let params = this.ids
            this.$confirm(this.international.global.global_confirmActive,{
                confirmButtonText: this.international.global.global_confirm,
                cancelButtonText: this.international.global.global_cancel,
            }).then(()=>{
                activeOrganization(params,this.headers).then(res=>{
                    if(res.status == 0){
                        this.$message.success({
                            message:this.international.global.global_changeStatusSuccess,
                            center:true
                        })
                        this.getListData()
                    }else{
                        this.$message.error({
                            message:res.message,
                            center:true
                        })
                    }
                }).catch(err=>{console.log(err)})
            }).catch(()=>{

            })
        },
        // 失效状态
        loseEefficacy(){
            let params = this.ids
            this.$confirm(this.international.global.global_confirmDeactive,{
                confirmButtonText: this.international.global.global_confirm,
                cancelButtonText: this.international.global.global_cancel,
            }).then(()=>{
                loseEefficacyOrganization(params,this.headers).then(res=>{
                    if(res.status == 0){
                        this.$message.success({
                            message:this.international.global.global_changeStatusSuccess,
                            center:true
                        })
                        this.getListData()
                    }else{
                        this.$message.error({
                            message:res.message,
                            center:true
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }).catch(()=>{
                console.log('取消')
            })
        },
        // 新增
        addAction(){
            this.$store.commit("changeIsStatus", false);
            this.$router.push({
                path:'/addOrganization',
                query:{from:'add'}
            });

        },
        // 编辑
        handleEdit(row){
            // this.editform = Object.assign({}, row);
            if(this.ids.length == 1){
                // this.showEditToast = true
                this.$store.commit("changeIsStatus", false);
                this.$router.push({
                    path:'/addOrganization',
                    query:{from:'edit',id:this.ids[0]}
                });
            }else{
                this.$message.warning({
                    message:this.international.global.global_editNotChooseMore,
                    center:true
                })
            }
        },
        // 表格选择
        handleSelectionChange(val){
            this.ids = []
            this.isDisable = val.length < 1 ? true:false
            // if(val.length == 1) this.editform = Object.assign({}, val[0]);
            val.map(item=>{
                this.ids.push(item.id)
            })
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
                if(this.international.global){
                    btns.map(item=>{
                        if(item.name == this.international.global.global_search) this.searchBtn = true
                        if(item.name == this.international.global.global_add) this.addBtn = true
                        if(item.name == this.international.global.global_edit) this.editBtn = true
                        if(item.name == this.international.global.global_disabled) this.deactiveBtn = true
                        if(item.name == this.international.global.global_enable) this.activeBtn = true

                    })
                }
            },
            immediate:true,
            deep:true
        },
        "$store.getters.isStatus": function () {
            if (this.$store.state.isStatus == true && this.$route.path == '/addOrganization') {
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
#organization {
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
  /* width: 20%; */
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
.formItem{
    /* float: left; */
}
.formItem >>> .el-form-item{
    float: left;
    margin-left: 25px;
}
#organization >>> .el-dialog__footer{
    text-align: center ;
}
</style>
