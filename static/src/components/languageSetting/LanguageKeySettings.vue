<template>
    <div id="LanguageKeySettings" v-loading="loading"  element-loading-text="loading">
        <div class="header" v-if="international.global">
            <div class="headerTop scoped">
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageKeySettings_name}}</span>
                    <el-input size="small" maxlength="50" class="headerItem"  v-model="searchCont" :placeholder="international.content.content_languageKeySettings_name"></el-input>
                </div>
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageKeySettings_code}}</span>
                    <el-input size="small" maxlength="50" class="headerItem"  v-model="searchCode" :placeholder="international.content.content_languageKeySettings_code"></el-input>
                </div>
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageKeySettings_type}}</span>
                    <el-select size="small" clearable  v-model="type" value-key='value' placeholder="" >
                        <el-option
                        v-for="item in allTypeList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageKeySettings_belongPage}}</span>
                    <el-select size="small" clearable  v-model="menuId" value-key='menuName' placeholder="" >
                        <el-option
                        v-for="item in menuList"
                        :key="item.id"
                        :label="item.menuName"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <el-button class="search" size="small" type="primary" v-if="searchBtn"  @click="search">{{international.global.global_search }}</el-button>
                <el-button class="reset" size="small" type="primary"  @click="refresh">{{international.global.global_reset}}</el-button>
            </div>
        </div>
        <div class="footer" v-if="international.field">
            <div class="top">
                <el-button size="small" v-if="addBtn"  @click="addAction">
                    <i class="iconfont icon-add"></i>
                    {{international.global.global_add}}
                </el-button>
                <el-button size="small" :class="{ 'active': !isDisable }" v-if="editBtn"  @click="handleEdit" :disabled="isDisable">
                    <i class="iconfont icon-edit"></i>
                    {{international.global.global_edit}}
                </el-button>
                <el-button size="small" :class="{ 'active': !isDisable }" v-if="deleteBtn"  @click="deleteAction" :disabled="isDisable">
                    <i class="iconfont icon-shanchu"></i>
                    {{international.global.global_delete}}
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
                    >
                        <el-table-column
                        type="selection"
                        align="center"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="field"
                        width="380"
                        :label="international.field.field_languageKeySettingsList_code"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="value"
                        width="320"
                        :label="international.field.field_languageKeySettingsList_translationLanguage"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="typeStr"
                        min-width="180"
                        :label="international.field.field_languageKeySettingsList_type"
                        show-overflow-tooltip>
                        </el-table-column>
                        <!-- <el-table-column
                        :label="international.field.field_languageKeySettingsList_handle"
                        align="center"
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button type="text" v-if="editBtn" size="small" @click="handleEdit(scope.row)">{{international.global.global_edit}}</el-button>
                                <el-button v-if="deleteBtn" @click="handleDelete(scope.row)" type="text" size="small">{{international.global.global_delete}}</el-button>
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
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 新增弹窗 -->
        <el-dialog
            v-if="international.global"
            :title="international.global.global_add"
            :visible.sync="showAddToast"
            width="600px"
            >
            <el-form ref="addform"  :model="addform" label-width="140px" label-position="right">
                <el-form-item
                prop="name"
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
                :label="international.content.content_languageKeySettings_translationLanguage">
                    <el-input maxlength="100" size="small" style="width:260px;" v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item
                prop="editCode"
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
                :label="international.content.content_languageKeySettings_code">
                    <el-input maxlength="100" size="small" style="width:260px;" v-model="addform.editCode"></el-input>
                </el-form-item>
                <el-form-item
                prop="type"
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
                :label="international.content.content_languageKeySettings_type">
                    <el-select size="small" placeholder="" v-model="addform.type" @change="changeSelect"  value-key='value'  style="width:260px;">
                        <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                 prop="menuName"
                 :label="international.content.content_languageKeySettings_belongPage">
                    <el-select size="small" clearable   v-model="addform.menuName" placeholder=""     style="width:260px;">
                        <el-option
                        v-for="item in menuList"
                        :key="item.id"
                        :label="item.menuName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="addConfirm">{{international.global.global_confirm}}</el-button>
                <el-button size="small"  @click="showAddToast = false">{{international.global.global_cancel}}</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog
            v-if="international.global"
            :title="international.global.global_edit"
            :visible.sync="showEditToast"
            width="600px"
            >
            <el-form class="editInput" ref="editform"  :model="editform" label-width="140px" label-position="right">
                <el-form-item
                prop="value"
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
                :label="international.content.content_languageKeySettings_translationLanguage">
                    <el-input maxlength="100" size="small" style="width:260px;" v-model="editform.value"></el-input>
                </el-form-item>
                <el-form-item
                prop="simplifyField"
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
                :label="international.content.content_languageKeySettings_code">
                    <el-input maxlength="100" size="small" style="width:260px;"  v-model="editform.simplifyField"></el-input>
                </el-form-item>
                <el-form-item
                prop="typeStr"
                :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]"
                :label="international.content.content_languageKeySettings_type">
                    <el-select  size="small"  v-model="editform.typeStr"  value-key="value"  style="width:260px;">
                        <el-option
                        @click.native="changeType(item.id)"
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                prop="menuName"
                 :label="international.content.content_languageKeySettings_belongPage">
                    <el-select  size="small" clearable    v-model="editform.menuId"   style="width:260px;">
                        <el-option
                        v-for="item in menuList"
                        :key="item.id"
                        :label="item.menuName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="editConfirm">{{international.global.global_confirm}}</el-button>
                <el-button size="small"  @click="showEditToast = false">{{international.global.global_cancel}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// import { appendFile } from 'fs';
import { getCookie, setCookie, removeCookie ,getMenuBtnList} from "../../public";
import {getKeyPageInfo ,getAllLanguageType,getLanguageType,addLangKey,deleteLangKey,editLangKey,getMenuList} from '../../api/multilingualSettings/api'
export default {
    name:'LanguageKeySettings',
    data() {
        return {
            loading:false, //是否显示加载中
            type:'',
            typeList:[],
            allTypeList:[],
            menuList:[],
            tableData:[],
            isDisable:true,
            showAddToast:false,
            showEditToast:false,
            addform:{
                name:'',
                editCode:'',
                long:'',
                typeCode:'',
                type:'',
                menuName:''
            },
            editform:{
            },
            // rules:{
            //     name:[{ required: true, message:this.international.global ? this.international.global.global_contNotEmpty : '', trigger: 'blur' }],
            //     editCode:[{ required: true,  trigger: 'blur' }],
            //     type:[{ required: true, trigger: 'change' }],
            //     value:[{ required: true,  trigger: 'blur' }],
            //     typeStr:[{ required: true,  trigger: 'change' }],
            //     // menuName:[{ required: true,  trigger: 'change' }],
            //     simplifyField:[{ required: true,  trigger: 'change' }]
            // },
            currentPage:1, //当前页数
            pageSize:10, //每页长度
            total:0, //数据总条数
            searchCont:'', //查询名称
            searchCode:'',//查询code
            menuId:'',//菜单筛选
            international:{},//国际化标题按钮等
            ids:[],
            searchBtn:false, //查询按钮是否显示
            addBtn:false, //新增按钮是否显示
            editBtn:false, //编辑按钮是否显示
            deleteBtn:false, //删除按钮是否显示
            headers:{
                Authorization: getCookie("HTBD_PASS"),
                language:this.$store.state.language
            }//请求头

        }
    },
    methods: {
        // 获取分页数据列表
        getDataList(){
            this.loading = true
            let params = {
                code:this.searchCode,
                currentPage:this.currentPage,
                menuId:this.menuId.id,
                name:this.searchCont,
                pageSize:this.pageSize,
                type: this.type.id
            }
            getKeyPageInfo(params,this.headers).then(res=>{
                this.loading = false
                this.total = res.data.total
                this.tableData = res.data.records
            }).catch(err=>{
                this.loading = false
                console.log(err)
            })
        },
        // 获取语言类型列表
        getTypeList(){
            // 所有类型列表，用于筛选
            getAllLanguageType({type:'langKeyType'},this.headers).then(res=>{
                this.allTypeList = res.data
            }).catch(err=>{console.log(err)})
            // 部分类型列表，用于新增
            getLanguageType({},this.headers).then(res=>{
                this.typeList = res.data
            }).catch(err=>{
                console.log(err)
            })
            getMenuList({},this.headers).then(res=>{
                this.menuList = res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        // 查询
        search(){
            this.currentPage = 1
            this.getDataList()
        },
        // 新增
        addAction(){
            this.addform = {
                name:'',
                editCode:'',
                long:'',
                typeCode:'',
                type:'',
                menuName:''
            },
            this.showAddToast = true
        },
        // 新增确认
        addConfirm(){
            this.$refs.addform.validate((valid)=>{
                if(valid){
                    let params = {
                        field:this.addform.editCode,
                        name: this.addform.name,
                        type: this.addform.type.id,
                        menuId:this.addform.menuName
                    }
                    addLangKey(params,this.headers).then(res=>{
                        this.showAddToast = false
                        if(res.status == 0){
                            this.$message.success({
                                message:this.international.global.global_addSuccess,
                                center:true
                            });
                            this.searchCont = '', //查询名称
                            this.searchCode = '',//查询code
                            this.type = '',//类型置空
                            this.getDataList()
                        }else{
                            this.$message.error({
                                message:res.message,
                                center:true
                            })
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            })
        },
        // 删除
        deleteAction(){
            let _this = this
            this.$confirm(this.international.global.global_deleteTip, {
                    confirmButtonText: this.international.global.global_confirm,
                    cancelButtonText: this.international.global.global_cancel,
            }).then(()=>{
                let params = _this.ids
                deleteLangKey(params,this.headers).then(res=>{
                    if(res.status == 0){
                        this.$message.success({
                            message:this.international.global.global_deleteSuccess,
                            center:true
                        });
                        _this.getDataList()
                    }else{
                        this.$message.error({
                            message:res.message,
                            center:true
                        });
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }).catch(()=>{
                console.log('取消')
            })
        },
        // 重置
        refresh(){
            this.currentPage = 1, //当前页数
            this.pageSize =10, //每页长度
            this.searchCont = '', //查询名称
            this.searchCode = '',//查询code
            this.type = '',//类型置空
            this.menuId = '' ,//归属页面置空
            this.getDataList()
        },
        // 改变编辑选择框
        changeAction(e){
            this.editform.type = e
        },
        // 编辑
        handleEdit(row){
            // this.editform = Object.assign({}, row);
            if(this.ids.length == 1){
                this.showEditToast = true
            }else{
                this.$message.warning({
                    message:this.international.global.global_editNotChooseMore,
                    center:true
                })
            }
        },
        // 编辑时改变type
        changeType(type){
            this.editform.type = type
        },
        // 改变归属页面
        // changeMenuId(menuId){
        //     this.editform.menuId = menuId
        // },
        // 编辑确认
        editConfirm(){
            this.$refs.editform.validate((valid)=>{
                if(valid){
                    let params = {
                        simplifyField:this.editform.simplifyField,
                        id: this.editform.id,
                        name: this.editform.value,
                        type: this.editform.type,
                        menuId:this.editform.menuId
                    }
                    editLangKey(params,this.headers).then(res=>{
                        this.showEditToast = false
                        if(res.status == 0){
                            this.$message.success({
                                message:this.international.global.global_changeSuccess,
                                center:true
                            });
                            this.searchCont = '', //查询名称
                            this.searchCode = '',//查询code
                            this.type = '',//类型置空
                            this.getDataList()
                        }else{
                            this.$message.error({
                                message:res.message,
                                center:true
                            })
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            })

        },
        // 改变下拉框
        changeSelect(val){
            console.log(val)
        },
        // 表格中的删除
        // handleDelete(val){
        //     this.ids = [] //删除语言id先置空
        //     this.ids.push(val.id) //要删除的id
        //     this.deleteAction() //触发删除事件
        // },
        // 表格选择
        handleSelectionChange(val){
            this.ids = []
            this.isDisable = val.length < 1 ? true:false
            if(val.length == 1) this.editform = Object.assign({}, val[0]);
            val.map(item=>{
                this.ids.push(item.id)
            })
        },
        //每页多少条
        handleSizeChange(val) {
            this.pageSize = val
            this.getDataList()
        },
        //选择页数
        handleCurrentChange(val) {
            this.currentPage = val
            this.getDataList()
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
                        if(item.name == this.international.global.global_delete) this.deleteBtn = true
                    })
                }
            },
            immediate:true,
            deep:true
        }
    },
    mounted() {
        this.getDataList()
        this.getTypeList()
    },
}
</script>
<style scoped>
/* ------------ header -------------- */
#LanguageKeySettings {
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
  text-align: left;
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
.footer .top .el-button:nth-child(1):hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}

.footer .top  .el-button:hover{
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
#LanguageKeySettings /deep/ .el-dialog__body{
    /* text-align: center; */
    margin: 0 7%;
}
#LanguageKeySettings >>> .el-dialog__footer{
    text-align: center ;
}

</style>
