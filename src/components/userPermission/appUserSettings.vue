<template>
  <div id="appUserSettings" v-loading="loading"  element-loading-text="loading">
      <div class="header" v-if="international.global">
        <div class="headerTop">
            <div class="nav">
                <span class="demonstration">{{international.content.content_appUserSettings_userAccount}}</span>
                <el-input maxlength="50" size="small" v-model="userAccount" :placeholder="international.content.content_appUserSettings_userAccount"></el-input>
            </div>
            <div class="nav">
                <span class="demonstration">{{international.content.content_appUserSettings_institutional}}</span>
                <el-input maxlength="50" size="small" v-model="organization" :placeholder="international.content.content_appUserSettings_institutional"></el-input>
            </div>
            <div class="nav">
                <span class="demonstration">{{international.content.content_appUserSettings_status}}</span>
                <el-select size="small" clearable v-model="status" value-key="value"  :placeholder="international.content.content_appUserSettings_status" >
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
          <div class="top" >
            <!-- <el-button  v-if="addBtn" size="small"  @click="addAction">
                <i class="iconfont icon-add"></i>
                {{international.global.global_add}}
            </el-button>
            <el-button v-if="editBtn"  :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" @click="handleEdit">
                <i class="iconfont icon-edit"></i>
                {{international.global.global_edit}}
            </el-button>
            <el-button v-if="deactiveBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" @click="loseEfficacyStatus"  >
                <i class="iconfont icon-stop"></i>
                {{international.global.global_disabled}}
            </el-button>
            <el-button v-if="activeBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" @click="activeStatus" >
                <i class="iconfont icon-wanchengyunda"></i>
                {{international.global.global_enable}}
            </el-button> -->
            <el-button v-if="funcBtn" size="small" :class="{ 'active': !isDisable }" @click="functionAction" :disabled="isDisable">
                <i class="iconfont icon-gongneng-"></i>
                {{international.global.global_funcDistribut}}
            </el-button>
            <el-button v-if="dataBtn" size="small" :class="{ 'active': !isDisable }" @click="dataAction" :disabled="isDisable">
                <i class="iconfont icon-shujuyuan"></i>
                {{international.global.global_dataDistribut}}
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
                :height="tableHeight"
                style="width: 100%; height: 100%;"
                >
                    <el-table-column
                    align="center"
                    type="selection"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="id"
                    :label="international.field.field_appUserSettingsList_serialNumber"
                    align="center"
                    width="60">
                        <template slot-scope="scope">
                            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="loginName"
                    :label="international.field.field_appUserSettingsList_userAccount"
                    width="140"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="username"
                    :label="international.field.field_appUserSettingsList_username"
                    width="100"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="userStatusStr"
                    :label="international.field.field_appUserSettingsList_status"
                    width="100"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span :class="scope.row.userStatus == 232 ? 'activeStatus':'deactiveStatus'">{{scope.row.userStatusStr}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    :label="international.field.field_appUserSettingsList_email"
                    width="160"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="enterpriseName"
                    :label="international.field.field_appUserSettingsList_institutional"
                    width="200"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="functionRoleName"
                    :label="international.field.field_appUserSettingsList_functionalRole"
                    width="160"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="dataRoleName"
                    :label="international.field.field_appUserSettingsList_dataAuthority"
                    min-width="160"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column
                    :label="international.field.field_appUserSettingsList_handle"
                    align="center"
                    min-width="180"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button v-if="editBtn" type="text" size="small" @click="handleEdit(scope.row)">{{international.global.global_edit}}</el-button>
                            <el-button v-if="deactiveBtn" @click="loseEfficacyStatus(scope.row)" type="text" size="small">{{international.global.global_disabled}}</el-button>
                            <el-button v-if="activeBtn" @click="activeStatus(scope.row)" type="text" size="small">{{international.global.global_enable}}</el-button>
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
                :page-size="pageSize"
                :pager-count="5"
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
        :title="international.title.title_appUserSettings_addAppUser"
        :visible.sync="showAddToast"
        width="800px"
        >
        <el-form ref="addform" label-width="140px" :model="addform"  class="from" label-position="right">
            <div class="formItem">
                <el-form-item 
                prop="username" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
                :label="international.content.content_appUserSettings_userAccount" >
                    <el-input maxlength="100" size="small" style="width:180px;" v-model="addform.username"></el-input>
                </el-form-item>
                <el-form-item 
                prop="password" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
                :label="international.content.content_appUserSettings_password">
                    <el-input maxlength="100" size="small" style="width:180px" v-model="addform.password"></el-input>
                </el-form-item>
            </div>
            <div class="formItem">
                <el-form-item 
                prop="email" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
                :label="international.content.content_appUserSettings_email">
                    <el-input maxlength="100" size="small" style="width:180px" v-model="addform.email"></el-input>
                </el-form-item>
                <el-form-item 
                prop="mobile" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
                :label="international.content.content_appUserSettings_phone">
                    <el-input maxlength="100" size="small" style="width:180px" v-model="addform.mobile"></el-input>
                </el-form-item>
            </div>
            <div class="formItem">
                <el-form-item :label="international.content.content_appUserSettings_status">
                    <el-select size="small" v-model="addform.userStatus" value-key='value'  style="width:180px">
                        <el-option
                        v-for="item in statusList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="international.content.content_appUserSettings_belongInstitutional">
                    <el-select size="small" v-model="addform.enterpriseId" value-key='enterpriseName'  style="width:180px">
                        <el-option
                        v-for="item in belongList"
                        :key="item.id"
                        :label="item.enterpriseName"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="formItem">
                <el-form-item :label="international.content.content_appUserSettings_remark">
                    <el-input maxlength="300" size="small" type="textarea" :autosize="{ minRows: 5, maxRows:8}" style="width:540px" v-model="addform.content"></el-input>
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
        :title="international.title.title_appUserSettings_editAppUser"
        :visible.sync="showEditToast"
        width="800px"
        >
        <el-form ref="editform" label-width="140px" :model="editform"  class="from" label-position="right">
            <div class="formItem">
                <el-form-item 
                prop="username" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
                :label="international.content.content_appUserSettings_userAccount" >
                    <el-input maxlength="100" size="small" style="width:180px;" v-model="editform.username"></el-input>
                </el-form-item>
            </div>
            <div class="formItem">
                <el-form-item 
                prop="email" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
                :label="international.content.content_appUserSettings_email">
                    <el-input maxlength="100" size="small" style="width:180px" v-model="editform.email"></el-input>
                </el-form-item>
                <el-form-item 
                prop="mobile" 
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" 
                :label="international.content.content_appUserSettings_phone">
                    <el-input maxlength="100" size="small" style="width:180px" v-model="editform.mobile"></el-input>
                </el-form-item>
            </div>
            <div class="formItem">
                <el-form-item :label="international.content.content_appUserSettings_status">
                    <el-select size="small" v-model="editform.userStatusStr" value-key='value'  style="width:180px">
                        <el-option
                        @click.native="changeEditStatus(item.id)"
                        v-for="item in statusList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="international.content.content_appUserSettings_belongInstitutional">
                    <el-select size="small" v-model="editform.enterpriseName" value-key='enterpriseName'  style="width:180px">
                        <el-option
                        @click.native="changeEnterpriseId(item.id)"
                        v-for="item in belongList"
                        :key="item.id"
                        :label="item.enterpriseName"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="formItem">
                <el-form-item :label="international.content.content_appUserSettings_remark">
                    <el-input maxlength="300" size="small" type="textarea" :autosize="{ minRows: 5, maxRows:8}" style="width:540px" v-model="editform.content"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="editConfirm">{{international.global.global_confirm}}</el-button>
            <el-button size="small"  @click="showEditToast = false">{{international.global.global_cancel}}</el-button>
        </span>
    </el-dialog> -->
    <!-- 功能权限分配 -->
    <el-dialog
        v-if="international.content"
        :title="international.global.global_funcDistribut"
        :visible.sync="showFunctionToast"
        width="600px"
        >
        <div class="toastHeader" >
            <span class="title">{{international.content.content_appUserSettings_roleName}}</span>
            <el-input maxlength="50" size="small" v-model="roleName" :placeholder="international.content.content_appUserSettings_roleName" style="width:200px;margin-right:10px"></el-input>
            <el-button size="small" @click="toastSearch('function')">{{international.global.global_search}}</el-button>
            <el-button size="small" @click="toastReset('function')">{{international.global.global_reset}}</el-button>
        </div>
        <el-table
            ref="multipleTable"
            size="mini"
            border
            :data="functionTableData"
            @selection-change="handleSelectionChange"
            tooltip-effect="dark"
            :height="300"
            style="width: 80%;margin-left:10%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column :label="international.content.content_appUserSettings_select" width="55">
                <template slot-scope="scope">
                    <el-radio :label="scope.row.id" v-model="functionRadio" @change.native="getCurrentRow(scope.row,'function')">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column
                prop="id"
                :label="international.content.content_appUserSettings_sequence"
                align="center"
                width="100">
                </el-table-column>
                <el-table-column
                prop="roleName"
                :label="international.content.content_appUserSettings_roleName"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="roleStatusStr"
                :label="international.content.content_appUserSettings_status"
                align="center"
                width="140"
               >
                </el-table-column>
        </el-table>
        <span slot="footer" style="text-align:center" class="dialog-footer">
            <el-button size="small" type="primary" @click="functionConfirm">{{international.global.global_confirm}}</el-button>
            <el-button size="small"  @click="showFunctionToast = false">{{international.global.global_cancel}}</el-button>
        </span>
    </el-dialog>
    <!-- 数据权限分配 -->
    <el-dialog
        v-if="international.content"
        :title="international.global.global_dataDistribut"
        :visible.sync="showDataToast"
        width="600px"
        >
        <div class="toastHeader">
            <span class="title">{{international.content.content_appUserSettings_roleName}}</span>
            <el-input maxlength="50" size="small" v-model="roleName2" :placeholder="international.content.content_appUserSettings_roleName" style="width:200px;margin-right:10px"></el-input>
            <el-button size="small" @click="toastSearch('data')">{{international.global.global_search}}</el-button>
            <el-button size="small" @click="toastReset('data')">{{international.global.global_reset}}</el-button>
        </div>
        <el-table
            ref="multipleTable"
            size="mini"
            border
            :data="dataTableData"
            @selection-change="handleSelectionChange"
            tooltip-effect="dark"
            style="width: 80%;margin-left:10%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
                <el-table-column :label="international.content.content_appUserSettings_select" width="55" align="center">
                    <template slot-scope="scope">
                        <el-radio :label="scope.row.id" v-model="dataRadio" @change.native="getCurrentRow(scope.row,'data')">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                prop="id"
                :label="international.content.content_appUserSettings_sequence"
                align="center"
                width="100">
                </el-table-column>
                <el-table-column
                prop="roleName"
                :label="international.content.content_appUserSettings_roleName"
                align="center"
                >
                </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="dataConfirm">{{international.global.global_confirm}}</el-button>
            <el-button size="small"  @click="showDataToast = false">{{international.global.global_cancel}}</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import bcryptjs from "bcryptjs";
import { getCookie, setCookie, removeCookie ,getMenuBtnList} from "../../public";
import {getAppUserSettingsData ,appDeactive, appAactive,appUserFuctionList,appUserDataList,distributeFunction,distributeData,getStatusList } from '../../api/userPermissions/api'
export default {
    name:'appUserSettings',
    data() {
        return {
            total:0, //数据总条数
            currentPage:1,//当前页数
            pageSize:10, //每页长度
            userAccount:'',//用户账号
            organization:'',//组织机构
            status:'',//状态
            statusList:[],//状态列表
            belongList:[], //归属管理机构列表
            tableData:[],
            addform:{
                content: "",
                email:"" ,
                enterpriseId: '',
                mobile: '',
                password: '',
                userStatus: '',
                username: ''
            },//新增数据
            editform:{}, //编辑数据
            // rules:{
            //     username:[{ required: true,  trigger: 'blur' }],
            //     password:[{ required: true,  trigger: 'blur' }],
            //     email:[{ required: true, trigger: 'blur' }],
            //     mobile:[{ required: true,  trigger: 'blur' }]
            // },
            showAddToast:false, //是否显示新增弹窗
            showEditToast:false,//是否显示编辑弹窗
            loading:false, //是否显示loading
            isDisable:true, //是否禁用功能权限分配和数据权限分配按钮
            showFunctionToast:false, // 是否显示功能权限弹窗
            showDataToast:false, // 是否数据权限弹窗
            functionTableData:[],//功能权限表格数据
            dataTableData:[],//数据权限表格数据
            roleName:'', //功能权限角色名称
            roleName2:'', //数据权限角色名称
            functionRadio:'',//功能权限分配单选
            dataRadio:'',//数据权限分配单选
            userIds:[],//表格选择的用户id
            international:{},//国际化标题按钮
            searchBtn:false, //查询按钮是否显示
            addBtn:false, //新增按钮是否显示
            funcBtn:false,//功能权限分配是否显示
            dataBtn:false,//数据权限分配是否显示
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
                email: "",
                enterpriseName:this.organization,
                pageSize: this.pageSize,
                userStatus: this.status.id,
                username: this.userAccount
            }
            getAppUserSettingsData(params,this.headers).then(res=>{
                this.loading = false
                this.total = res.data.total
                this.tableData = res.data.records
            }).catch(err=>{
                this.loading = false
                // console.log(err)
            })
        },
        // 获取归属管理机构列表和状态列表
        getBelongManagementList(){
            // 获取归属管理机构列表
            // getBelongList({enterpriseType:2},this.headers).then(res=>{
            //     this.belongList = res.data
            // }).catch(err=>{
            //     console.log(err)
            // })
            getStatusList({type:'status'},this.headers).then(res=>{
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
            this.userAccount = '',
            this.organization= '',
            this.currentPage = 1,
            this.pageSize = 10,
            this.status = ''
            this.getListData()
        },
        // 新增
        addAction(){
            // this.addform.content = '',
            // this.addform.email='',
            // this.addform.enterpriseId='',
            // this.addform.mobile='',
            // this.addform.password='',
            // this.addform.userStatus='',
            // this.addform.username=''
            // this.showAddToast = true
            this.$store.commit("changeIsStatus", false);
            this.$router.push({
                path:'/addAppUserSetting',
                query:{from:'add'}
            });

        },
        // 新增提交
        // addConfirm(){
        //     this.$refs.addform.validate((valid)=>{
        //         if(valid){
        //             this.showAddToast = false
        //             let salt = bcryptjs.genSaltSync(12); //定义密码加密的计算强度，默认10
        //             let hash = bcryptjs.hashSync("admin", salt); //进行加密
        //             let params = {
        //                 content: this.addform.content,
        //                 email: this.addform.email,
        //                 enterpriseId: this.addform.enterpriseId.id,
        //                 mobile: this.addform.mobile,
        //                 password: hash,
        //                 userStatus: this.addform.userStatus.id,
        //                 username: this.addform.username
        //             }
        //             addAppUserSetting(params,this.headers).then(res=>{
        //                 if(res.status == 0){
        //                     this.$message.success(this.international.global.global_addSuccess)
        //                     this.userAccount = '',
        //                     this.organization= '',
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
            if(this.userIds.length == 1){
                // this.showEditToast = true
                this.$store.commit("changeIsStatus", false);
                this.$router.push({
                    path:'/addAppUserSetting',
                    query:{from:'edit',id:this.userIds[0]}
                });

            }else{
                this.$message.warning({
                    message:this.international.global.global_editNotChooseMore,
                    center:true
                })
            }
        },
        // 编辑时下拉框改变状态
        // changeEditStatus(status){
        //     this.editform.userStatus = status
        // },
        // changeEnterpriseId(id){
        //     this.editform.enterpriseId = id
        // },
        // 失效状态
        loseEfficacyStatus(row){
            let params = {ids:this.userIds}
            this.$confirm(this.international.global.global_confirmDeactive,{
                confirmButtonText: this.international.global.global_confirm,
                cancelButtonText: this.international.global.global_cancel,
            }).then(()=>{
                appDeactive(params,this.headers).then(res=>{
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
        // 激活状态
        activeStatus(row){
            let params = {ids:this.userIds}
            this.$confirm(this.international.global.global_confirmActive,{
                confirmButtonText: this.international.global.global_confirm,
                cancelButtonText: this.international.global.global_cancel,
            }).then(()=>{
                appAactive(params,this.headers).then(res=>{
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
        // 编辑确认提交
        // editConfirm(){
        //     this.$refs.editform.validate((valid)=>{
        //         if(valid){
        //             this.showEditToast =false
        //             let params = {
        //                 content: this.editform.content || '',
        //                 email: this.editform.email,
        //                 enterpriseId: this.editform.enterpriseId,
        //                 id: this.editform.id,
        //                 mobile: this.editform.mobile,
        //                 // password: this.editform.password || '',
        //                 userStatus: this.editform.userStatus,
        //                 username: this.editform.username
        //             }
        //             editAppUserSetting(params,this.headers).then(res=>{
        //                 if(res.status == 0){
        //                     this.$message.success(this.international.global.global_changeSuccess)
        //                     this.userAccount = '',
        //                     this.organization= '',
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
            this.isDisable = val.length < 1 ? true:false
            if(val.length == 1) this.editform = Object.assign({}, val[0]);
            let ids = []
            val.map(item=>{
                ids.push(item.id)
            })
            this.userIds = ids
        },
        // 点击功能权限分配
        functionAction(){
            this.showFunctionToast = true
            this.functionRadio = ''
            let params = {
                currentPage: 1,
                pageSize: 1000,
                roleName: this.roleName
            }
            appUserFuctionList(params,this.headers).then(res=>{
                this.total2 = res.data.total
                this.functionTableData = res.data.records
            }).catch(err=>{
                console.log(err)
            })
        },
        // 点击数据权限分配
        dataAction(){
            this.showDataToast = true
            this.dataRadio = ''
            let params = {
                currentPage: 1,
                pageSize: 100,
                roleName: this.roleName2
            }
            appUserDataList(params,this.headers).then(res=>{
                this.total3 = res.data.total
                this.dataTableData = res.data.records
            }).catch(err=>{
                console.log(err)
            })
        },
        // 功能或权限查询
        toastSearch(from){
            if(from  == 'function'){
                this.functionAction()
            }else{
                this.dataAction()
            }
        },
        // 功能或数据权限重置
        toastReset(from){
            if(from == 'function'){
                this.currentPage2 = 1 
                this.roleName = ''
                this.functionAction()
            }else{
                this.currentPage3 = 1 
                this.roleName2 = ''
                this.dataAction()
            }
        },
        // 弹窗表格单选
        getCurrentRow(row,from){
            if(from == 'function'){
                this.functionRadio = row.id
            }else if(from == 'data'){
                this.dataRadio = row.id
            }
        },
        // 功能权限分配确认
        functionConfirm(){
            this.showFunctionToast = false
            let params = {
                roleId: this.functionRadio,
                userIds: this.userIds
            }
            distributeFunction(params,this.headers).then(res=>{
                if(res.status == 0){
                    this.$message.success({
                        message:this.international.global.global_funcDistributSuccess,
                        center: true
                    })
                    this.getListData()
                }else{
                    this.$message.error({
                        message:res.message,
                        center:true
                    })
                }
            }).catch(err=>{console.log(err)})
        },
        // 数据权限分配确认
        dataConfirm(){
            this.showDataToast = false
            let params = {
                roleId: this.dataRadio,
                userIds: this.userIds
            }
            distributeData(params,this.headers).then(res=>{
                if(res.status == 0){
                    this.$message.success({
                        message:this.international.global.global_dataDistributSuccess,
                        center:true
                    })
                    this.getListData()
                }else{
                    this.$message.success({
                        message:this.international.global.global_dataDistributFailure,
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
        // 功能权限分配选择页数
        // handleCurrentChange2(val){
        //     this.currentPage2 = val
        //     this.functionAction()
        // },
        // 数据权限分配选择页数
        // handleCurrentChange3(val){
        //     this.currentPage3 = val
        //     this.dataAction()
        // },
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
                        if(item.name == this.international.global.global_funcDistribut) this.funcBtn = true
                        if(item.name == this.international.global.global_dataDistribut) this.dataBtn = true
                    })
                }
            },
            immediate:true,
            deep:true
        },
        "$store.getters.isStatus": function () {
            if (this.$store.state.isStatus == true && this.$route.path =='/addAppUserSetting') {
                this.getListData();
            }
        },

    },
    mounted(){
        this.getListData()
        this.getBelongManagementList()
    }
}
</script>

<style scoped>
/* ------------ header -------------- */
#appUserSettings {
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
/* .footer .top  .el-button:nth-child(1){
  color: #368CFE;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
}
.footer .top  .el-button:nth-child(1):hover{
  color: #368CFE !important;
  border-radius: 4px;
  border: 1px solid rgba(54,140,254,0.5);
} */
 .top  .el-button:hover{
  color: #C0C4CC !important;
}

/* .footer .top .el-button[data-v-146e3eca]:nth-child(1) {
    color: #368CFE;
    border-radius: 4px;
    border: 1px solid rgba(54,140,254,0.5);
} */
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
    margin-left: 10%;
}
.toastHeader .title{
    margin-right: 10px;
}
#appUserSettings >>> .el-dialog__footer{
    text-align: center ;
}
</style>
