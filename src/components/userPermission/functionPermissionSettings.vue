<template>
  <div id="functionPermissionSettings" v-loading="loading"  element-loading-text="loading">
      <div class="header" v-if="international.global">
        <div class="headerTop">
            <div class="nav">
                <span class="demonstration">{{international.content.content_functionPermissionSettings_role}}</span>
                <el-input maxlength="50" size="small" v-model="roleName" :placeholder="international.content.content_functionPermissionSettings_role"></el-input>
            </div>
            <div class="nav">
                <span class="demonstration">{{international.content.content_functionPermissionSettings_roleType}}</span>
                <el-select clearable  size="small" v-model="roleType" value-key="value"  :placeholder="international.content.content_functionPermissionSettings_roleType" >
                    <el-option
                    v-for="item in roleTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="nav">
                <span class="demonstration">{{international.content.content_functionPermissionSettings_status}}</span>
                <el-select clearable  size="small" v-model="status" value-key="value"  :placeholder="international.content.content_functionPermissionSettings_status" >
                    <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
            <el-button class="search" type="primary" size="small" v-if="searchBtn" @click="search">{{international.global.global_search}}</el-button>
            <el-button class="reset" type="primary" size="small" @click="reset">{{international.global.global_reset}}</el-button>
        </div>

      </div>
      <div class="footer" v-if="international.field">
          <div class="top">
            <el-button v-if="addBtn" size="small"  @click="addAction">
                <i class="iconfont icon-add"></i>
                {{international.global.global_add}}
            </el-button>
            <el-button v-if="editBtn" :class="{ 'active': !isDisable }"  size="small" :disabled="isDisable" @click="handleEdit">
                <i class="iconfont icon-edit"></i>
                {{international.global.global_edit}}
            </el-button>
            <el-button v-if="deactiveBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="loseEfficacyStatus"  size="small">
                <i class="iconfont icon-stop"></i>
                {{international.global.global_disabled}}
            </el-button>
            <el-button v-if="activeBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="changeStatus"  size="small">
                <i class="iconfont icon-wanchengyunda"></i>
                {{international.global.global_enable}}
            </el-button>
            <el-button v-if="funcBtn" :class="{ 'active': !isDisable }" size="small" @click="functionAction" :disabled="isDisable">
                <i class="iconfont icon-gongneng-"></i>
                {{international.global.global_authorityDistribut}}
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
                style="width: 100%; height: 100%;"
                :height="tableHeight"
                >
                    <el-table-column
                    type="selection"
                    align="center"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="id"
                    :label="international.field.field_functionPermissionSettingsList_serialNumber"
                    align="center"
                    width="60">
                        <template slot-scope="scope">
                            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="roleName"
                    :label="international.field.field_functionPermissionSettingsList_roleName"
                    width="160"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="roleTypeStr"
                    :label="international.field.field_functionPermissionSettingsList_roleType"
                    width="120"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    :label="international.field.field_functionPermissionSettingsList_status"
                    width="100"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span :class="scope.row.roleStatus == 232 ? 'activeStatus':'deactiveStatus'">{{scope.row.roleStatusStr}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="creatorName"
                    :label="international.field.field_functionPermissionSettingsList_creator"
                    width="180"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="creatorTimeStr"
                    :label="international.field.field_functionPermissionSettingsList_createTime"
                    min-width="220"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column
                    :label="international.field.field_functionPermissionSettingsList_handle"
                    align="center"
                    min-width="180"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button v-if="editBtn" type="text" size="small" @click="handleEdit(scope.row)">{{international.global.global_edit}}</el-button>
                            <el-button v-if="deactiveBtn" @click="loseEfficacyStatus(scope.row)" type="text" size="small">{{international.global.global_disabled}}</el-button>
                            <el-button v-if="activeBtn" @click="changeStatus(scope.row)" type="text" size="small">{{international.global.global_enable}}</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
            <div class="footer_page">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next ,jumper"
                :total="total"
                >
                </el-pagination>
            </div>
          </div>
      </div>
      <!-- 新增弹窗 -->
    <!-- <el-dialog
        v-if="international.content"
        :title="international.title.title_functionPermissionSettings_addFunctionRole"
        :visible.sync="showAddToast"
        width="800px"
        >
        <el-form ref="addform" label-width="140px" :model="addform"  class="from" label-position="right">
            <div class="formItem">
                <el-form-item 
                prop="roleName" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
                :label="international.content.content_functionPermissionSettings_role" >
                    <el-input maxlength="100" size="small" style="width:180px;" v-model="addform.roleName"></el-input>
                </el-form-item>
                <el-form-item 
                prop="roleType" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
                :label="international.content.content_functionPermissionSettings_roleType">
                    <el-select size="small" v-model="addform.roleType" value-key='value'  style="width:180px">
                        <el-option
                        v-for="item in roleTypeList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="formItem">
                <el-form-item :label="international.content.content_functionPermissionSettings_content">
                    <el-input maxlength="300" size="small"   style="width:180px" v-model="addform.content"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="addConfirm">{{international.global.global_confirm}}</el-button>
            <el-button size="small"  @click="showAddToast = false">{{international.global.global_cancel}}</el-button>
        </span>
    </el-dialog> -->
    <!-- 编辑弹窗 -->
    <!-- <el-dialog
        v-if="international.content"
        :title="international.title.title_functionPermissionSettings_editFunctionRolr"
        :visible.sync="showEditToast"
        width="800px"
        >
        <el-form ref="editform" label-width="140px" :model="editform"  class="from" label-position="right">
            <div class="formItem">
                <el-form-item 
                prop="roleName" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
                :label="international.content.content_functionPermissionSettings_role" >
                    <el-input maxlength="100" size="small" style="width:180px;" v-model="editform.roleName"></el-input>
                </el-form-item>
                <el-form-item 
                prop="roleTypeStr" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
                :label="international.content.content_functionPermissionSettings_roleType">
                    <el-select size="small" v-model="editform.roleTypeStr" value-key='value'  style="width:180px">
                        <el-option
                        @click.native="changeEditRoleType(item.id)"
                        v-for="item in roleTypeList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="formItem">
                <el-form-item :label="international.content.content_functionPermissionSettings_content">
                    <el-input maxlength="300" size="small"  style="width:180px" v-model="editform.content"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary"  @click="editConfirm">{{international.global.global_confirm}}</el-button>
            <el-button size="small"  @click="showEditToast = false">{{international.global.global_cancel}}</el-button>
        </span>
    </el-dialog> -->
    <!-- 功能权限分配 -->
    <el-dialog
        v-if="international.content"
        :title="international.global.global_authorityDistribut"
        :visible.sync="showFunctionToast"
        width="60%"
        >
        <tree-transfer
        :title="title"
        pid="parentId"
        :from_data='undistributeList' 
        :to_data='distributeList' 
        :defaultProps="{label:'name'}" 
        @addBtn='addFuncBtn' 
        @removeBtn='removeFuncBtn'
        :mode='mode' 
        height='450px' 
        openAll
        >
        </tree-transfer>
        <span slot="footer" class="dialog-footer" >
            <el-button size="small" type="primary" @click="confirmFun">{{international.global.global_confirm}}</el-button>
            <el-button size="small"  @click="showFunctionToast = false">{{international.global.global_cancel}}</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer'
import { getCookie, setCookie, removeCookie ,getMenuBtnList} from "../../public";
import {getFunctionsettingList,funcDeactiveStatus,funcActiveStatus,getFunDeail,addFunSetting,editFunSetting,getTypeList,getLoseEfficacyTip,getUndistribute,getDistribute,distributeFun} from '../../api/userPermissions/api'
export default {
    name:'functionPermissionSettings',
    components:{ treeTransfer },
    data() {
        return {
            mode: "transfer",
            total:0, //数据总条数
            currentPage:1,//当前页数
            pageSize:10, //每页长度
            roleName:'',//角色
            status:'',//状态
            roleType:'',//角色类型
            statusList:[],//状态列表
            roleTypeList:[],//角色类型列表
            tableData:[],
            addform:{
                content: '',
                roleName:'',
                roleType:''
            },//新增数据
            editform:{}, //编辑数据
            // rules:{
            //     roleName:[{ required: true,  trigger: 'blur' }],
            //     roleType:[{ required: true,  trigger: 'change' }],
            //     roleTypeStr:[{ required: true, trigger: 'change' }]
            // },
            showAddToast:false, //是否显示新增弹窗
            showEditToast:false,//是否显示编辑弹窗
            loading:false, //是否显示loading
            isDisable:true, //是否禁用权限分配按钮
            showFunctionToast:false, // 是否显示功能权限弹窗
            ids:[],//表格选中数据id集合
            // roleId:'',//表格选择角色id
            btnsId:[],//权限分配按钮id
            undistributeList:[],//待分配权限列表
            distributeList:[],//已分配全新列表
            title:[],
            international:{},//国际化标题按钮
            searchBtn:false, //查询按钮是否显示
            addBtn:false, //新增按钮是否显示
            funcBtn:false,//功能权限分配是否显示
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
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                roleName: this.roleName,
                roleStatus:this.status.id,
                roleType:this.roleType.id
            }
            getFunctionsettingList(params,this.headers).then(res=>{
                this.loading = false
                this.total = res.data.total
                this.tableData = res.data.records
            }).catch(err=>{
                this.loading = false
            })
        },
        // 获取下拉框的状态列表以及角色列表
        getTypeListData(){
            let params = ['status','roleType']
            getTypeList(params,this.headers).then(res=>{
                this.statusList = res.data.status
                this.roleTypeList = res.data.roleType
            }).catch(err=>{console.log(err)})
        },
        // 查询
        search(){
            this.currentPage = 1
            this.getListData()
        },
        // 重置
        reset(){
            //数据置空
            this.roleName = '',
            this.currentPage = 1,
            this.pageSize = 10,
            this.status = '',
            this.roleType = '',
            this.getListData()
        },
        // 新增
        addAction(){
            // this.addform.content = '',
            // this.addform.roleName = '',
            // this.addform.roleType = ''
            // this.showAddToast = true
            this.$store.commit("changeIsStatus", false);
            this.$router.push({
                path:'/addFunSetting',
                query:{from:'add'}
            });

        },
        // 新增提交
        // addConfirm(){
        //     this.$refs.addform.validate((valid)=>{
        //         if(valid){
        //             this.showAddToast = false
        //             let params = {
        //                 content: this.addform.content,
        //                 roleName: this.addform.roleName,
        //                 roleType: this.addform.roleType.id
        //             }
        //             addFunSetting(params,this.headers).then(res=>{
        //                 if(res.status == 0){
        //                     this.$message.success(this.international.global.global_addSuccess)
        //                     this.roleName = '',
        //                     this.status = ''
        //                     this.getListData()
        //                 }else{
        //                     this.$message.error(this.international.global.global_addFailure)
        //                 }
        //             }).catch(err=>{
        //                 console.log(err)
        //             })
        //         }
        //     })
        // },
        // 编辑
        handleEdit(row){
            if(this.ids.length == 1){
                // this.showEditToast = true
                this.$store.commit("changeIsStatus", false);
                this.$router.push({
                    path:'/addFunSetting',
                    query:{from:'edit',id:this.ids[0]}
                });
            }else{
                this.$message.warning({
                    message:this.international.global.global_editNotChooseMore,
                    center:true
                })
            }
        },
        // 编辑时改变角色类型
        // changeEditRoleType(status){
        //     this.editform.roleType = status
        // },
        // 状态激活
        changeStatus(row){
            let params = {ids:this.ids}
            this.$confirm(this.international.global.global_confirmActive,{
                confirmButtonText: this.international.global.global_confirm,
                cancelButtonText: this.international.global.global_cancel,
            }).then(()=>{
                funcActiveStatus(params,this.headers).then(res=>{
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
        // 状态失效
        loseEfficacyStatus(row){
            let params = {ids:this.ids}
            let _this = this
            getLoseEfficacyTip(params,this.headers).then(res=>{
                this.$confirm(res.message, {
                    confirmButtonText: this.international.global.global_confirm,
                    cancelButtonText: this.international.global.global_cancel,
                }).then(()=>{
                    funcDeactiveStatus(params,this.headers).then(res=>{
                        if(res.status == 0){
                            _this.$message.success({
                                message:_this.international.global.global_changeStatusSuccess,
                                center:true
                            })
                            _this.getListData()
                        }else{
                            _this.$message.error({
                                message:res.message,
                                center:true
                            })
                        }
                    }).catch(err=>{console.log(err)})
                }).catch(()=>{
                    console.log('取消')
                })
            }).catch(err=>{
                console.log(err)
            })
        },
        // 编辑确认提交
        // editConfirm(){
        //     this.$refs.editform.validate((valid)=>{
        //         if(valid){
        //             this.showEditToast =false
        //             let params = {
        //                 content: this.editform.content,
        //                 id: this.editform.id,
        //                 roleName: this.editform.roleName,
        //                 roleType: this.editform.roleType
        //             }
        //             editFunSetting(params,this.headers).then(res=>{
        //                 if(res.status == 0){
        //                     this.$message.success(this.international.global.global_changeSuccess)
        //                     this.roleName = '',
        //                     this.status = ''
        //                     this.getListData()
        //                 }else{
        //                     this.$message.success(this.international.global.global_changeFailure)
        //                 }
        //             }).catch(err=>{
        //                 console.log(err)
        //             })
        //         }
        //     })
        // },
        // 表格选择
        handleSelectionChange(val){
            this.ids = []
            this.isDisable = val.length < 1 ? true:false
            if(val.length == 1) this.editform = Object.assign({}, val[0]);
            val.map(item=>{
                this.ids.push(item.id)
            })
            this.roleId = val.length == 1 ? val[0].id : ''
        },
        // 点击权限分配
        functionAction(){
            if(this.ids.length == 1){
                let params = {roleId:this.roleId}
                // 获取待分配权限列表
                getUndistribute(params,this.headers).then(res=>{
                    this.undistributeList = res.data
                }).catch(err=>{
                    console.log(err)
                })
                // 获取已分配权限列表
                getDistribute(params,this.headers).then(res=>{
                    this.distributeList = res.data
                    let ids = []
                    res.data.map(item=>{
                        if(item.type == 2){ids.push(Math.abs(item.id))}
                        item.children.map(item2=>{
                            if(item2.type == 2){ids.push(Math.abs(item2.id))}
                            item2.children.map(item3=>{
                                if(item3.type == 2){ids.push(Math.abs(item3.id))}
                                item3.children.map(item4=>{
                                    ids.push(Math.abs(item4.id))
                                })
                            })
                        })
                    })
                    this.btnsId = ids
                }).catch(err=>{
                    console.log(err)
                })
                this.showFunctionToast = true
            }else{
                this.$message.warning({
                    message:this.international.content.content_functionPermissionSetting_DistributNotMoreChoose,
                    center:true
                })
            }
        },
        // 添加功能权限
        addFuncBtn(fromData,toData,obj){
            let ids = []
            toData.map(item=>{
                if(item.type == 2){ids.push(Math.abs(item.id))}
                item.children.map(item2=>{
                    if(item2.type == 2){ids.push(Math.abs(item2.id))}
                    item2.children.map(item3=>{
                        if(item3.type == 2){ids.push(Math.abs(item3.id))}
                        item3.children.map(item4=>{
                            ids.push(Math.abs(item4.id))
                        })
                    })
                })
            })
            this.btnsId = ids
        },
        // 移除功能权限
        removeFuncBtn(fromData,toData,obj){
            let ids = []
            toData.map(item=>{
                if(item.type == 2){ids.push(Math.abs(item.id))}
                item.children.map(item2=>{
                    if(item2.type == 2){ids.push(Math.abs(item2.id))}
                    item2.children.map(item3=>{
                        if(item3.type == 2){ids.push(Math.abs(item3.id))}
                        item3.children.map(item4=>{
                            ids.push(Math.abs(item4.id))
                        })
                    })
                })
            })
            this.btnsId = ids
        },
        confirmFun(){
            let params = {
                buttonIdSet: this.btnsId,
                roleId: this.roleId
            }
            distributeFun(params,this.headers).then(res=>{
                this.showFunctionToast = false
                if(res.status == 0){
                    this.$message.success({
                        message:this.international.global.global_funcDistributSuccess,
                        center:true
                    })
                }else{
                    this.$message.error({
                        message:res.message,
                        center:true
                    })
                }
            }).catch(err=>{console.log(err)})
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
                        if(item.name == this.international.global.global_authorityDistribut) this.funcBtn = true
                    })
                }
            },
            immediate:true,
            deep:true
        },
        "$store.getters.isStatus": function () {
            if (this.$store.state.isStatus == true && this.$route.path == '/addFunSetting') {
                this.getListData();
            }
        },

    },
    mounted(){
        this.getListData()
        this.getTypeListData()
    }
}
</script>

<style scoped>
/* ------------ header -------------- */
#functionPermissionSettings {
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
  background: rgba(54,140,254,0.1);
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
.toastHeader{
    margin-bottom: 20px;
}
#functionPermissionSettings >>> .el-dialog__footer{
    text-align: center ;
}
</style>