<template>
    <div id="languageConfiguration" v-loading="loading"  element-loading-text="loading">
        <div class="header" v-if="international.global">
            <div class="headerTop scoped">
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageConfiguration_name}}</span>
                    <el-input size="small" maxlength="50"  v-model="searchCont" :placeholder="international.content.content_languageConfiguration_name"></el-input>
                </div>
                <el-button class="search" type="primary" size="small" v-if="searchBtn"  @click="search">{{international.global.global_search }}</el-button>
                <el-button class="reset" type="primary" size="small"  @click="refresh">{{international.global.global_reset}}</el-button>
            </div>
            <!-- <el-button @click="deleteAction" :disabled="isDisable">删除</el-button> -->
        </div>
        <div class="footer" v-if="international.field">
            <div class="top">
                <el-button v-if="addBtn" @click="addAction" size="small">
                    <i class="iconfont icon-add"></i>
                    {{international.global.global_add}}
                </el-button>
                <el-button :class="{ 'active': !isDisable }" :disabled="isDisable" v-if="editBtn" @click="edit" size="small">
                    <i class="iconfont icon-edit"></i>
                    {{international.global.global_edit}}
                </el-button>
                <el-button :class="{ 'active': !isDisable }" v-if="publishBtn" :disabled="isDisable"  size="small" @click="handlePublic">
                    <i class="iconfont icon-fabu"></i>
                    {{international.global.global_publish}}
                </el-button>
                <el-button :class="{ 'active': !isDisable }" v-if="deleteBtn"  :disabled="isDisable" @click="handleDelete"  size="small">
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
                        prop="name"
                        :label="international.field.field_languageConfigurationList_language"
                        width="240">
                        </el-table-column>
                        <el-table-column
                        prop="code"
                        width="160"
                        :label="international.field.field_languageConfigurationList_code">
                        </el-table-column>
                        <el-table-column
                        :label="international.field.field_languageConfigurationList_complete"
                        width="200"
                        align="center">
                            <template slot-scope="scope">
                                <el-progress :text-inside="true" :stroke-width="16" :percentage="scope.row.finishRate"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="publicStatus"
                        width="200"
                        :label="international.field.field_languageConfigurationList_status"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="creatorName"
                        min-width="200"
                        :label="international.field.field_languageConfigurationList_publisher"
                        show-overflow-tooltip>
                        </el-table-column>
                        <!-- <el-table-column
                        :label="international.field.field_languageConfigurationList_handle"
                        align="center"
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button v-if="publishBtn" type="text" :disabled="scope.row.status == 1" size="small" @click="handlePublic(scope.row)">{{international.global.global_publish}}</el-button>
                                <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button v-if="deleteBtn" @click="handleDelete(scope.row)"    type="text" size="small">{{international.global.global_delete}}</el-button>
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
            :close-on-click-modal="false"
            width="700px"
            top="15%"
            >
            <el-form ref="addform"  :model="addform" label-width="140px" class="from"  label-position="right">
                <div class="formItem">
                    <el-form-item prop="selectLang" :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'change'}]" :label="international.content.content_languageConfiguration_pleaseSelectLanguage" >
                        <el-select size="small" placeholder=""  v-model="addform.selectLang" value-key="name"  style="width:160px" >
                            <el-option
                            v-for="item in langusgeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="formItem">
                    <el-form-item prop="transLang" :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]" :label="international.content.content_languageKeySettings_translationLanguage" >
                        <el-input maxlength="100" size="small" v-model="addform.transLang" style="width:160px"></el-input>
                    </el-form-item>
                </div>
                <div class="formItem" v-for="(item,index) in addform.existLanguageList" :key="index">
                    <el-form-item
                    :label="item.value"
                    :prop="'existLanguageList.' + index +'.transLationLan'"
                    :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]">
                        <el-input maxlength="100" size="small" style="width:160px" v-model="item.transLationLan" ></el-input>
                    </el-form-item>
                </div>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="confirm">{{international.global.global_confirm}}</el-button>
                <el-button size="small"  @click="showAddToast = false">{{international.global.global_cancel}}</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog
            v-if="international.global"
            :title="international.global.global_edit"
            :visible.sync="editToast"
            :close-on-click-modal="false"
            width="700px"
            top="15%"
            >
            <el-form ref="editform"   :model="editform" label-width="140px" class="from"  label-position="right">
                <div class="formItem" v-for="(item,index) in editform.langList" :key="index">
                    <el-form-item :label="item.name"
                        :prop="'langList.' + index +'.value'"
                        :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]">
                        <el-input maxlength="100" size="small" style="width:160px" v-model="item.value" ></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="editConfirm">{{international.global.global_confirm}}</el-button>
                <el-button size="small"  @click="editToast = false">{{international.global.global_cancel}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getCookie, setCookie, removeCookie,getMenuBtnList} from "../../public";
import {getListPageInfo , getLangDetail,editLanguage, getLanguageListInfo ,addLanguage ,publicLanguage ,getTipInfo ,deleteLanguage,getLangList,getAllLangList} from '../../api/multilingualSettings/api'
export default {
    name:'languageConfiguration',
    // props:['menuData'],
    data() {
        return {
            showAddToast:false, //是否显示新增弹窗
            editToast:false, //编辑
            isDisable:true, // 是否禁用编辑按钮
            language:'',
            langusgeList:[],
            existLanguageList:[],//已拥有的语言列表
            tableData:[],
            currentPage:1, //当前页数
            pageSize:10, //每页长度
            total:0, //数据总条数
            searchCont:'', //查询内容
            matchingTranslate:'',//添加语言时手动将语言翻译成对应语言名
            loading:false, //是否显示loading
            ids:[], //要删除的语言id集合
            addform:{
                selectLang:'',
                transLang:'',
                existLanguageList:this.existLanguageList
            },
            editform:{
                langList:[]
            },
            international:{},//国际化标题
            searchBtn:false, //查询按钮是否显示
            addBtn:false, //新增按钮是否显示
            editBtn:false, //编辑按钮是否显示
            publishBtn:false, //发布按钮是否显示
            deleteBtn:false, //删除按钮是否显示
            headers:{
                Authorization: getCookie("HTBD_PASS"),
                language:this.$store.state.language
            }//请求头
        }
    },
    methods: {
        //获取页面数据
        getListData(){
            this.loading = true
            let params = {
                currentPage: this.currentPage,
                name: this.searchCont,
                pageSize: this.pageSize
            }
            getListPageInfo(params,this.headers).then(res=>{
                this.loading = false
                this.total = res.data.total
                this.tableData = res.data.records
            }).catch(err=>{
                console.log(err)
            })
        },
        // 获取语言列表
        getLanguageList(){
            // 获取所有语言列表
            getLanguageListInfo({},this.headers).then(res=>{
                this.langusgeList = res.data
            }).catch(err=>{
                console.log(err)
            })
            // 获取已添加语言列表
          getAllLangList({},this.headers).then(res=>{
                res.data.map(item=>{
                    item.transLationLan = ''
                    // return item.code != 'zh-cn' && item.code != 'zh-tw' && item.code != 'en-us'
               })
                this.existLanguageList = res.data
                this.showAddToast = true
                this.matchingTranslate = ''
                this.addform.selectLang='',
                this.addform.transLang = '',
                this.existLanguageList.map(item=>{
                    item.transLationLan = ''
                })
                this.addform.existLanguageList = this.existLanguageList

            }).catch(err=>{
                console.log(err)
            })

        },
        // 查询
        search(){
            this.currentPage =1
            this.getListData()
        },
        // 新增
        addAction(){
            this.getLanguageList()
        },
        // 新增确认
        confirm(){
            // if(this.matchingTranslate == ''){
            //     this.$message('请将要添加的语言先翻译成对应语言名')
            //     return
            // }
            this.$refs.addform.validate((valid)=>{
                if(valid){
                    let params =[{code:this.addform.selectLang.code,name:this.addform.transLang}]
                    this.addform.existLanguageList.map(item=>{
                        let obj = {}
                        obj.code = item.code
                        obj.name = item.transLationLan
                        params.push(obj)
                    })
                    addLanguage(params,this.headers).then(res=>{
                        this.showAddToast = false
                        if(res.status == 0){
                            this.$message.success({
                                message:this.international.global.global_addSuccess,
                                center:true
                            });
                            this.searchCont = ''
                            this.getListData()
                        }else{
                            this.$message.error({
                                message:res.message,
                                center:true
                            })
                        }
                    }).catch(err=>{console.log(err)})

                }
            })
            // let params =[{code:this.addform.selectLang.code,name:this.addform.transLang}]
            // this.addform.existLanguageList.map(item=>{
            //     let obj = {}
            //     obj.code = item.code
            //     obj.name = item.transLationLan
            //     params.push(obj)
            // })
            // for(let i = 0; i < params.length;i++){
            //     if(params[i].name == ''){
            //         this.$message('输入框不能为空')
            //         return
            //     }
            // }

            // // let params = [{
            // //     code:this.language.code,
            // //     name:this.matchingTranslate
            // // }]
            // addLanguage(params,this.headers).then(res=>{
            //     this.showAddToast = false
            //     if(res.status == 0){
            //         this.$message.success(this.international.global.global_addSuccess);
            //         this.searchCont = ''
            //         this.getListData()
            //     }else{
            //         this.$message.error(this.international.global.global_addFailure)
            //     }
            // }).catch(err=>{console.log(err)})
        },
        // 表格选择
        handleSelectionChange(val){
            this.ids = []
            this.isDisable = val.length < 1 ? true:false
            val.map(item=>{
                this.ids.push(item.id)
            })
        },
        // 发布
        handlePublic(){
            // 发布确认弹窗
            // this.$confirm('确定发布该语言吗?', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            // }).then(()=>{
                if(this.ids.length == 1){
                    let params = {id:this.ids[0]}
                    publicLanguage(params,this.headers).then(res=>{
                        if(res.status == 0){
                            this.$message.success({
                                message:this.international.global.global_publishSuccess,
                                center:true
                            });
                            this.getListData()
                        }else{
                            this.$message.error({
                                message:res.message,
                                center:true
                            });
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.$message.warning({
                        message:this.international.global.global_publishNotChooseMore,
                        center:true
                    })
                }
            // }).catch(()=>{console.log('取消')})
        },
        // 编辑
        edit(){
            // this.$router.push('/language_translation_url')
            if(this.ids.length == 1){
                this.editToast = true
                let id =  {id:this.ids[0]}
                getLangDetail(id,this.headers).then(res=>{
                    this.editform.langList = res.data
                }).catch(er=>{console.log(err)})
            }else{
                this.$message.warning({
                    message:this.international.global.global_editNotChooseMore,
                    center:true
                })
            }
        },
        // 编辑确认
        editConfirm(){
            this.$refs.editform.validate((valid)=>{
                if(valid){
                    this.editToast = false
                    let params = this.editform.langList
                    editLanguage(params,this.headers).then(res=>{
                        if(res.status == 0){
                            this.getListData()
                        this.$message.success({
                            message:this.international.global.global_changeSuccess,
                            center:true
                        })
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
        handleDelete(){
            // this.ids = [] //删除语言id先置空
            // this.ids.push(val.id) //要删除的id
            // this.deleteAction() //触发删除事件
            // 删除前请求获取删除提示信息
            if(this.ids.length == 1){
                let params = {ids:this.ids[0]}
                getTipInfo(params,this.headers).then(res=>{
                    // 删除提示确认弹窗
                    this.$confirm(res.message, {
                        confirmButtonText: this.international.global.global_confirm,
                        cancelButtonText: this.international.global.global_cancel,
                        confirmButtonClass:'confirmButton',
                        cancelButtonClass:'cancelButton'
                    }).then(()=>{
                        //请求删除语言接口
                        deleteLanguage(params,this.headers).then(res=>{
                            if(res.status == 0){
                                this.$message.success({
                                    message:this.international.global.global_deleteSuccess,
                                    center:true
                                });
                                this.getListData()
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
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.$message.warning({
                    message:this.international.global.global_deleteNotChooseMore,
                    center:true
                })
            }
        },
        // 重置
        refresh(){
            this.searchCont = ''
            this.pageSize = 10
            this.currentPage =1
            this.getListData()
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
                        if(item.name == this.international.global.global_publish) this.publishBtn = true
                        if(item.name == this.international.global.global_delete) this.deleteBtn = true
                    })
                }
            },
            immediate:true,
            deep:true
        }
    },
    mounted() {
        this.getListData()
        // this.getLanguageList()
    },
}
</script>
<style scoped>
/* ------------ header -------------- */
#languageConfiguration {
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
.from{
    overflow: hidden;
}
.formItem{
    float: left;
}
#languageConfiguration >>> .el-dialog__footer{
    text-align: center ;
}
</style>
