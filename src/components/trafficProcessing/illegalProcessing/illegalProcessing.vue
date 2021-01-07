<template>
  <div id="illegalProcessing" v-loading="loading">
    <div class="headerTop">
      <div class="nav">
        <span class="demonstration" style="margin-right: 12px;">&nbsp;&nbsp;&nbsp;新增来源</span>
        <el-select v-model="newSource" clearable="" size="small" placeholder=''>
          <el-option value="0" label="手动"></el-option>
          <el-option value="1" label="自动"></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">所属公司</span>
        <el-select filterable clearable size="small"  v-model="belongCompany" placeholder=''>
          <el-option
            v-for="item in belongCompanyList "
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">车牌号码</span>
        <el-input maxlength="50" size="small" v-model="idCar" placeholder=''></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">合同编号</span>
        <el-input maxlength="50" size="small" v-model="contractNumber" placeholder=''></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">所属业务员</span>
        <el-select clearable size="small" v-model="merchandiser" placeholder=''>
          <el-option
            v-for="item in merchandiserList"
            :key="item.id"
            :label="item.salesmanName"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">处理状态</span>
        <el-select clearable size="small"  v-model="handleStatus" placeholder=''>
          <el-option
            v-for="item in handleStatusList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">处理用时</span>
        <el-select clearable size="small" v-model="handleTime" placeholder=''>
          <el-option
            v-for="item in handleTimeList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">处理来源</span>
        <el-select clearable size="small" v-model="handleSource" placeholder=''>
          <el-option
            v-for="item in handleSourceList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav illegalTime">
        <span class="demonstration">&nbsp;&nbsp;&nbsp;&nbsp;违章时段</span>
        <el-date-picker
          size="small"
          v-model="illegalTime"
          type="datetimerange"
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
          手动新增
        </el-button>
        <el-button size="small" v-if="editBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="editAction">
          <i class="iconfont icon-edit"></i>
          修改
        </el-button>
        <el-button size="small" v-if="dealWithBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="handleAction">
          <i class="iconfont icon-chuli"></i>
          处理
        </el-button>
        <el-button size="small" v-if="auditBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="auditAction">
          <i class="iconfont icon-shenhe"></i>
          审核
        </el-button>
        <el-button size="small" v-if="checkBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="checkAction">
          <i class="iconfont icon-chakan"></i>
          查看
        </el-button>
        <el-button size="small" class="active" @click="illegalSearch">
          <i class="iconfont icon-chengxinchaxun"></i>
          违章查询
        </el-button>

        <!-- <el-button size="small">
          <i class="iconfont icon-daoru"></i>
          导入
        </el-button> -->
      </div>
      <div class="bottom">
        <div class="footerTable">
          <el-table border stripe :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small" :data="tableData" @selection-change="handleSelectionChange" :height="tableHeight"
            style="width: 100%; height: 100%;" >
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column prop="newSource" label="新增来源"></el-table-column>
            <el-table-column prop="enterpriseName" label="所属公司" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="vehicleNo" label="车牌号码" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractCode" label="合同编号" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" label="所属业务员" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="violationTimeStr" label="违章时间" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="violationStatusStr" label="状态" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="violationPlace" label="违章地点" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="violationType" label="违章行为" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="violationScore" label="扣分" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.violationScore + '分'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="violationFine" label="罚款" width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.violationFine + '元'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="customerContacts" label="客户联系人" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="violators" label="违章人" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="handlers" label="处理人" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="processingTime" label="处理用时" width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <span >{{scope.row.processingTime != null ? scope.row.processingTime + '天':''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop label="处理凭证" width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="lookFile" @click="lookFeilAction(scope.row.efileIdCode)">查看附件</span>
              </template>
            </el-table-column>
            <el-table-column prop="violationSourceStr" label="处理来源" min-width="90" show-overflow-tooltip></el-table-column>
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
import {getEnterpriseList,getSalesmanList,getIllegalData,getImgsrcList} from '../../../api/trafficProcessing/api'
import {getCookie,setCookie,removeCookie,getMenuBtnList} from "../../../public";
export default {
  name: "illegalProcessing",
  data() {
    return {
      loading:false,//是否显示loading
      isDisable: true, //是否禁用修改、处理、审核、查看按钮
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      newSource:null,
      belongCompany:'',
      idCar:'',
      contractNumber:'',
      merchandiser:'',
      handleStatus:'',
      handleTime:'',
      handleSource:'',
      illegalTime:'',//违章时段
      belongCompanyList:[],
      handleStatusList: [
        {
          id: 0,
          value: "待处理",
        },
        {
          id: 1,
          value: "处理待审核",
        },
        {
          id: 2,
          value: "审核通过",
        },
        {
          id: 3,
          value: "审核未通过",
        },
      ], //处理状态
      merchandiserList: [], //所属业务员
      handleSourceList: [
        {
          id: 0,
          value: "Web后台",
        },
        {
          id: 1,
          value: "App提交",
        },
      ], //处理来源
      handleTimeList: [
        {
          id: 1,
          value: "0-5天",
        },
        {
          id: 2,
          value: "6-10天",
        },
        {
          id: 3,
          value: "11-30天",
        },
        {
          id: 4,
          value: "超过30天",
        }
      ], //处理时间
      tableData: [], //表格数据
      selectData:[],//选中表格的数据
      dialogVisible:false,
      imageUrlList:[],
      searchBtn:false,//查询按钮是否有权限显示
      addBtn:false,//新增按钮是否有权限显示
      editBtn:false,//修改按钮是否有权限显示
      dealWithBtn:false,//处理按钮是否有权限显示
      auditBtn:false,//审核按钮是否有权限显示
      checkBtn:false,//查看按钮是否有权限显示
      tableHeight: window.innerHeight - 445 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    getIllegalDataList(){
      this.loading = true
      let params = {
        contractCode: this.contractNumber,
        enterpriseIdList:this.belongCompany != '' ? [this.belongCompany]:[] ,
        processingTime: this.handleTime,
        userId: this.merchandiser,
        vehicleNo: this.idCar,
        violationSource: this.handleSource,
        violationStatus: this.handleStatus,
        violationTimeEndStr:this.illegalTime[1] ? (this.illegalTime[1] + ' '+ '00:00') : '',
        violationTimeStartStr:this.illegalTime[0] ? (this.illegalTime[0] +' '+ '00:00') : '',
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        newSource:this.newSource
      }
      getIllegalData(params,this.headers).then(res=>{
        this.loading = false
        if(res.status == 0){
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
    // 获取下拉列表信息
    getListInfo(){
      // 所属公司列表
      getEnterpriseList({},this.headers).then(res=>{
        if(res.status == 0){
          this.belongCompanyList = res.data
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{console.log(err)})
      // 所属业务员列表
      getSalesmanList({},this.headers).then(res=>{
        if(res.status == 0){
          this.merchandiserList = res.data
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{console.log(err)})
    },
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getIllegalDataList()
    },
    // 重置
    resetAction(){
        this.contractNumber = ''
        this.belongCompany = '' ,
        this.handleTime = '',
        this.merchandiser = '',
        this.idCar = '',
        this.handleSource = '',
        this.handleStatus = '',
        this.illegalTime = '',
        this.illegalTime = '',
        this.currentPage = 1,
        this.pageSize = 10
        this.newSource = ""
        this.getIllegalDataList()
    },
    // 新增
    addAction(){
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
          path:'/addillegal',
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
      if(this.selectData[0].violationStatus != 0){
          this.$message.warning({
              message:'违章已处理，不可修改',
              center:true
          })
          return
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
          path:'/addillegal',
          query:{from:'edit',id:this.selectData[0].id}
      });
    },
    // 处理
    handleAction(){
      this.$store.commit("changeIsStatus", false);
      if(this.selectData.length > 1){
          this.$message.warning({
              message:'处理不能多选',
              center:true
          })
          return
      }
      if(this.selectData[0].violationStatus == 1){
          this.$message.warning({
              message:'该记录已被处理,不可再处理',
              center:true
          })
          return
      }
      if(this.selectData[0].violationStatus == 2){
          this.$message.warning({
              message:'已审核通过，不可再处理',
              center:true
          })
          return
      }
      this.$router.push({
          path:'/dealWithillegal',
          query:{from:'dealWith',id:this.selectData[0].id}
      });
    },
    // 审核
    auditAction(){
      if(this.selectData.length > 1){
          this.$message.warning({
              message:'审核不能多选',
              center:true
          })
          return
      }
      if(this.selectData[0].violationStatus == 0){
          this.$message.warning({
              message:'还未处理，不能审核',
              center:true
          })
          return
      }
      if(this.selectData[0].violationStatus == 2 || this.selectData[0].violationStatus == 3){
          this.$message.warning({
              message:'该记录已被审核，不可再审核',
              center:true
          })
          return
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
          path:'/auditillegal',
          query:{from:'audit',id:this.selectData[0].id}
      });
    },
    // 查看
    checkAction(){
      if(this.selectData.length > 1){
          this.$message.warning({
              message:'查看不能多选',
              center:true
          })
          return
      }
      // this.$store.commit("changeIsStatus", false);
      this.$router.push({
          path:'/auditillegal',
          query:{from:'look',id:this.selectData[0].id}
      });
    },
    // 查看附件
    lookFeilAction(imgCode){
      let params = {
        idCode:imgCode
      }
      getImgsrcList(params,this.headers).then(res=>{
        if(res.status == 0){
          this.imageUrlList =res.data
          if(this.imageUrlList<1){
            this.$message.warning({
              message:'暂无附件',
              center:true
            })
          }else{
            this.dialogVisible =true
          }
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{console.log(err)})
    },
    //   表格选择则
    handleSelectionChange(val) {
      this.selectData = val
      // this.ids = [];
      this.isDisable = val.length < 1 ? true : false;
      // if (val.length == 1) this.editform = Object.assign({}, val[0]);
      // val.map((item) => {
      //   this.ids.push(item.id);
      // });
    },
    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getIllegalDataList()
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getIllegalDataList()
    },
    // 违章查询
    illegalSearch(){
      window.open('https://gd.122.gov.cn/views/inquiry.html', '_blank');
    }
  },
  mounted() {
    this.getIllegalDataList()
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
  watch:{
      // 监听菜单按钮变化并控制页面按钮显示
      menuDataList:{
        handler(data){
            let btns =  getMenuBtnList(data,this.$route.path)
            btns.map(item=>{
                if(item.name == '查询') this.searchBtn = true
                if(item.name == '新增') this.addBtn = true
                if(item.name == '修改') this.editBtn = true
                if(item.name == '处理') this.dealWithBtn = true
                if(item.name == '审核') this.auditBtn = true
                if(item.name == '查看') this.checkBtn = true
            })
        },
        immediate:true,
        deep:true
      },
      "$store.getters.isStatus": function () {
          if (this.$store.state.isStatus == true && (this.$route.path == '/addillegal' || this.$route.path == '/dealWithillegal' ||  this.$route.path == '/auditillegal')) {
              this.getIllegalDataList();
          }
      },
  }
};
</script>

<style scoped>
#illegalProcessing {
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
.illegalTime >>> .el-input__icon{
  display: none;
}
.illegalTime .el-input__inner {
  width: 210px;
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
  height: calc(100% - 155px);
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
/* .footer .top .el-button:last-child{
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
} */
.footer .top .el-button:nth-child(1):hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
/* .footer .top .el-button:last-child:hover{
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
} */

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
#illegalProcessing >>> .el-dialog__body{
  padding: 0;
}
#illegalProcessing >>> .el-dialog__header{
  padding: 0;
}
#illegalProcessing >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
#illegalProcessing>>> .el-dialog__close{
  color: #fff;
}
#illegalProcessing >>>.el-carousel__button{
  width: 12px;
}
.imgList{
  width: 100%;
  height: 400px;
  display: block;
}
</style>
