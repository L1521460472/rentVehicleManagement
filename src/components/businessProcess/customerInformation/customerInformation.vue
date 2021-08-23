<template>
  <div id="customerInformation" v-loading="loading">
    <div class="headerTop">
      <div class="nav">
          <span class="demonstration" style="margin-left: 31px;">所属公司</span>
          <company v-model="enterpriseId"></company>
      </div>
      <div class="nav">
        <span class="demonstration">客户类型</span>
        <el-select clearable size="small"  v-model="customerType" placeholder=''>
          <el-option
            v-for="item in customerTypeList "
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">客户名称关键字</span>
        <el-input maxlength="50" size="small" v-model="customerNameKey" placeholder=''></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">联系人姓名</span>
        <el-input maxlength="50" size="small" v-model="contact" placeholder=''></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">联系人电话</span>
        <el-input maxlength="50" size="small" v-model="phone" placeholder=''></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">客户来源</span>
        <el-select clearable size="small" v-model="customerSource" placeholder=''>
          <el-option
            v-for="item in customerSourceList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
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
        <el-button size="small" v-if="editBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="editAction">
          <i class="iconfont icon-edit"></i>
          修改
        </el-button>
        <el-button size="small" v-if="editBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="detailAction">
          <i class="iconfont icon-chakan"></i>
          详情
        </el-button>
        <el-button size="small" v-if="delBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="delAction">
          <i class="iconfont icon-shanchu"></i>
          删除
        </el-button>
        <el-button size="small" class="active" @click="brokenPromises">
          <i class="iconfont icon-chengxinchaxun"></i>
          失信查询
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
            :height="tableHeight"
            @selection-change="handleSelectionChange"
            style="width: 100%; height: 100%;"
          >
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column prop="enterpriseName" label="所属公司" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerSourceStr" label="客户来源" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerTypeStr" label="客户类型" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerName" label="客户名称" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="busilicNo" label="营业执照编号" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personInCharge" label="联系人" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phoneNumber" label="联系电话" min-width="140" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column label="附件资料" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="lookFile" @click="lookFeilAction(scope.row)">查看附件</span>
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
          ></el-pagination>
        </div>
        <!-- 查看附件 -->
        <el-dialog :visible.sync="dialogVisible" width="500px">
          <el-carousel trigger="click" height="400px" >
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
import axios from 'axios'
import {getCustomerData} from '../../../api/businessProcess/api'
import {getCookie,setCookie,removeCookie,getMenuBtnList} from "../../../public";
import company from "@/components/aacommon/getEnterpriseBox.vue"
export default {
  name: "customerInformation",
    components:{
      company
    },
  data() {
    return {
      enterpriseId:"",
      loading:false,//是否显示loading
      isDisable: true, //是否禁用修改、处理、审核、查看按钮
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      tableData: [], //表格数据
      selectData:[],//选中表格的数据
      dialogVisible:false,
      customerType:'',//客户类型
      customerNameKey:'',//客户名称关键字
      customerSource:'',//客户来源
      contact:'',//联系人
      phone:'',//联系人电话
      imageUrlList:[],
      customerTypeList:[
        {
          id:1,
          value:'个人'
        },
        {
          id:2,
          value:'企业'
        }
      ],//客户类型
      customerSourceList:[
        {
          id:1,
          value:'web录入'
        },
        {
          id:2,
          value:'app提交'
        }
      ],
      searchBtn:false,//查询按钮是否有权限显示
      addBtn:false,//新增按钮是否有权限显示
      editBtn:false,//修改按钮是否有权限显示
      delBtn:false,
      tableHeight: window.innerHeight - 400 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    getListData(){
      this.loading = true
      let params = {
        customerName: this.customerNameKey !== "" ? this.customerNameKey:null,
        customerSource: this.customerSource !== "" ? this.customerSource:null,
        customerType: this.customerType !== "" ? this.customerType:null,
        personInCharge: this.contact !== "" ? this.contact:null,
        phoneNumber: this.phone !== "" ? this.phone:null,
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      getCustomerData(params,this.headers).then(res=>{
        this.loading = false
        if(res.status == 0){
            setTimeout(() => {
            window.onload()
          }, 10)
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
      })
    },
    // 查询
    searchAction(){
      this.currentPage =1
      this.getListData()
    },
    // 重置
    resetAction(){
      this.enterpriseId="",
      this.customerType ='',
      this.customerNameKey ='',
      this.customerSource ='',
      this.contact ='',
      this.phone ='',
      this.currentPage = 1,
      this.pageSize = 10
      this.getListData()
    },
    // 新增
    addAction(){
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
          path:'/addCustomerInfo',
          query:{from:'add'}
      });
    },
    // 编辑
    editAction(){
      if(this.selectData.length > 1){
          this.$message.warning({
              message:'修改不能多选',
              center:true
          })
          return
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
          path:'/addCustomerInfo',
          query:{from:'edit',id:this.selectData[0].id}
      });
    },
    detailAction(){
      if(this.selectData.length > 1){
          this.$message.warning({
              message:'详情不能多选',
              center:true
          })
          return
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
          path:'/addCustomerInfo',
          query:{from:'detail',id:this.selectData[0].id}
      });
    },
    delAction(){
       let caldel=true;
       let str=""
         let ids=this.selectData.map((item)=>{
         if(item.isCanDeleteFlag==1){
           caldel=false
           if(item.customerName){
             str+=item.customerName+","
           }
         }
         return item.id
       })
       if(!caldel){
         this.$message({
           message: str+"客户信息不能删除！",
           center: true,
           type: "error",
         });
         return
       }
         this.$confirm('确定删除所选的客户信息？', '删除客户信息', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                 }).then(() => {
                   axios({
                     method:'post',
                     url:'/vehicle-service/customerInfo/deleteCustomer',
                     data:{
                       "customerIds":ids
                     },
                     headers:this.headers
                   }).then((result)=>{
                     if (result.data.status == 0) {
                       this.$message({
                         message: '删除成功',
                         center: true,
                         type: "success",
                       });
                       this.currentPage=1
                       this.searchAction()
                     } else {
                       this.$message({
                         message: result.data.message,
                         center: true,
                         type: "error",
                       });
                     }
                   }).catch((err)=>{
                     this.$message({
                       message: "服务器繁忙，请稍后再试",
                       center: true,
                       type: "error",
                     });
                   })
                 })
                 .catch(()=>{

                 })
    },
    // 失信查询
    brokenPromises(){
      window.open('http://zxgk.court.gov.cn/zhzxgk/', '_blank');
    },
    // 查看附件
    lookFeilAction(row){
      this.imageUrlList = []
      if(row.ls_IdcardProsIdAddr) this.imageUrlList.push(...row.ls_IdcardProsIdAddr)
      if(row.ls_IdcardConsIdAddr) this.imageUrlList.push(...row.ls_IdcardConsIdAddr)
      if(row.ls_DriverLicenseIdAddr) this.imageUrlList.push(...row.ls_DriverLicenseIdAddr)
      if(row.ls_EfileBusilicIdAddr) this.imageUrlList.push(...row.ls_EfileBusilicIdAddr)
      if(this.imageUrlList.length<1){
        this.$message.warning({
          message:'该客户暂未上传附件',
          center:true
        })
        return
      }
      this.dialogVisible =true
    },
    //   表格选择则
    handleSelectionChange(val) {
      this.selectData = val
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
    this.getListData()
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
      // 监听菜单按钮变化并控制页面按钮显示
      menuDataList:{
        handler(data){
            let btns =  getMenuBtnList(data,this.$route.path)
            btns.map(item=>{
              if(item.name == '查询') this.searchBtn = true
              if(item.name == '新增') this.addBtn = true
              if(item.name == '修改') this.editBtn = true
              if(item.name == '删除') this.delBtn = true
            })
        },
        immediate:true,
        deep:true
      },
      "$store.getters.isStatus": function () {
          if (this.$store.state.isStatus == true && this.$route.path == '/addCustomerInfo') {
              this.getListData();
          }
      },
  }
};
</script>

<style scoped>
#customerInformation {
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
  /* width: 60px; */
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
  height: calc(100% - 110px);
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
.lookFile {
  color: #0000ff;
  cursor: pointer;
}
#customerInformation >>> .el-dialog__body{
  padding: 0;
}
#customerInformation >>> .el-dialog__header{
  padding: 0;
}
#customerInformation >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#customerInformation>>> .el-dialog__close{
  color: #fff;
}
#customerInformation >>>.el-carousel__button{
  width: 12px;
}
.imgList{
  width: 100%;
  height: 400px;
  display: block;
}
</style>
