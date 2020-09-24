<template>
    <div id="languageTranslation" v-loading="loading"  element-loading-text="loading">
        <div class="header" v-if="international.global">
            <div class="headerTop">
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageTranslation_referenceLanguage}}</span>
                    <el-select size="small" clearable  v-model="baseLang" value-key="value" placeholder="" style="width:150px">
                        <el-option
                        v-for="(item,index) in languageList"
                        :key="index"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageTranslation_translationLanguage}}</span>
                    <el-select size="small"  clearable v-model="updateLang" value-key="value"  placeholder="" style="width:150px">
                        <el-option
                        v-for="(item,index) in languageList"
                        :key="index"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageTranslation_referenceLanguage}}</span>
                    <el-input size="small" v-model="searchLang" :placeholder="international.content.content_languageTranslation_referenceLanguage" style="width:150px"></el-input>
                </div>
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageTranslation_type}}</span>
                    <el-select size="small" clearable  v-model="type" placeholder="" value-key='value' style="width:150px">
                        <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageTranslation_showType}}</span>
                    <el-select size="small" clearable  v-model="showType" placeholder="" value-key='value' style="width:150px">
                        <el-option
                        v-for="item in showTypeList"
                        :key="item.id"
                        :label="item.value"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="nav">
                    <span class="demonstration">{{international.content.content_languageTranslation_belongPage}}</span>
                    <el-select size="small" clearable  v-model="menuName" placeholder="" value-key='menuName' style="width:150px">
                        <el-option
                        v-for="item in menuList"
                        :key="item.id"
                        :label="item.menuName"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <el-button class="search" size="small" type="primary" v-if="searchBtn"  @click="search">{{international.global.global_search }}</el-button>
                <el-button class="reset" size="small" type="primary"  @click="refresh">{{international.global.global_reset }}</el-button>
                <el-button class="save" size="small" type="primary" v-if="save"  @click="save" >{{international.global.global_save }}</el-button>
            </div>
        </div>
        <div class="footer" v-if="international.field">
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
                    prop="baseLang"
                    width="360"
                    :label="international.field.field_languageTranslationList_referenceLanguage">
                    </el-table-column>
                    <el-table-column
                    width="360"
                    :label="international.field.field_languageTranslationList_translationLanguage"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.updateLang" :disabled="scope.row.checkBox"  size="small"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="typeStr"
                    min-width="200"
                    :label="international.content.content_languageTranslation_type">
                    </el-table-column>
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
</template>
<script>
import { getCookie, setCookie, removeCookie,getMenuBtnList } from "../../public";
import {getTranslationData,getLangList,getAllLanguageType ,getShowTypeList,saveTranslation,getMenuList,getAllLangList} from '../../api/multilingualSettings/api'
export default {
    name:'languageTranslation',
    data() {
        return {
            languageList:[],
            type:'',
            typeList:[],
            menuList:[],
            menuName:'',
            showType:'',
            showTypeList:[],
            formData:{},
            tableData:[],
            currentPage:1, //当前页数
            pageSize:10, //每页长度
            total:0, //数据总条数
            baseLang:'zh-cn', //参照语言信息
            menuId:'',//菜单筛选
            updateLang:'', //翻译语言信息
            searchLang:'', //输入框输入的翻译语言
            searchCode:'',//查询code
            changeData:[],//更改的数据
            international:{},//国际化标题按钮
            searchBtn:false, //查询按钮是否显示
            saveBtn:false, //保存按钮是否显示

            loading:false,
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
                baseLang: this.baseLang.code || this.baseLang,
                currentPage: this.currentPage,
                lang:this.searchLang,
                pageSize: this.pageSize,
                menuId:this.menuName.id,
                showType: this.showType.code,
                type: this.type.id,
                updateLang: this.updateLang.code
            }
            getTranslationData(params,this.headers).then(res=>{
                this.loading = false
                this.total = res.data.total
                res.data.records.map(item=>{
                    item.checkBox = true
                })
                this.tableData = res.data.records
            }).catch(err=>{
                this.loading = false
                console.log(err)
            })
        },
        // 获取类型列表
        getTypeList(){
          getAllLangList({},this.headers).then(res=>{
                this.languageList = res.data
                this.baseLang = res.data[0]
            }).catch(err=>{
                console.log(err)
            })
            getAllLanguageType({type:'langKeyType'},this.headers).then(res=>{
                this.typeList = res.data
            }).catch(err=>{
                console.log(err)
            })
            getShowTypeList({type:'langShowType'},this.headers).then(res=>{
                this.showTypeList = res.data
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
            this.currentPage =1
            this.getDataList()
        },
        // 保存
        save(){
            if(this.updateLang != ''){
                let data = []
                this.changeData.map(item=>{
                    let obj = {}
                    obj.code = this.updateLang.code || ''
                    obj.langKeyId = item.langKeyId
                    obj.value = item.updateLang || ''
                    data.push(obj)
                })
                let params = data
                saveTranslation(params,this.headers).then(res=>{
                    if(res.status == 0){
                        this.$message.success({
                            message:this.international.global.global_saveSuccess,
                            center:true
                        })
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
            }else{
                this.$message(this.international.global.global_selectTranslation)
            }
        },
        // 重置
        refresh(){
            //重置前参数置空
            this.currentPage = 1, 
            this.pageSize = 10, 
            this.type = '',
            this.showType= '',
            this.baseLang= ''
            this.updateLang = '',
            this.searchCode = '',
            this.menuName = '',
            this.getDataList()
        },
        // 表格选择
        handleSelectionChange(val){
            this.tableData.map(item=>{
                item.checkBox = true
            })
            val.map(item=>{
                item.checkBox = false
            })
            this.changeData = val
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
                        if(item.name == this.international.global.global_save) this.saveBtn = true
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
#languageTranslation{
  width: 100%;
  height: calc(100% - 76px);
}
.header {
  width: 100%;
  padding-bottom: 15px;
  /* height: 66px; */
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  margin-bottom: 16px;
}
.headerTop {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* display: flex;
  align-items: center; */
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
  margin-top: 15px;
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
    margin-left:20px ;
    margin-top: 15px;
  background: #368CFE !important;
  float: left;
}
.reset,.save {
    margin-top: 15px;
    float: left;
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
.save:hover{
  color: #fff !important;
  background: #368CFE !important;
}
/* ------------ footer -------------- */
.footer {
  width: 100%;
  height: calc(100% - 109px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footer .bottom{
  width: 100%;
  height: 100%;
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
.footerTable >>> .el-input__inner{
    border: none;
}
.footerTable >>> .el-input.is-disabled .el-input__inner{
    background-color: #fff;
}
.el-pagination {
  float: right;
}
#languageTranslation >>> .el-dialog__footer{
    text-align: center ;
}

</style>
