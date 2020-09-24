<template>
  <div id="keyToUpload" v-loading="loading">
    <div class="headerTop">
      <div class="nav">
        <span class="demonstration">用户手机号</span>
        <el-input maxlength="50" size="small" v-model="userPhone" placeholder=''></el-input>
      </div>
      <div class="nav"> 
        <span class="demonstration">用户姓名</span>
        <el-input maxlength="50" size="small" v-model="userName" placeholder=''></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">车牌号</span>
        <el-input maxlength="50" size="small" v-model="vehicleNo" placeholder=''></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">合同号</span>
        <el-input maxlength="50" size="small" v-model="contractCode" placeholder=''></el-input>
      </div>
      <div class="nav">
        <span class="demonstration">上传类型</span>
        <el-select clearable size="small"  v-model="uploadType" placeholder=''>
          <el-option
            v-for="item in uploadTypeList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav">
        <span class="demonstration">反馈状态</span>
        <el-select clearable size="small" v-model="feedback" placeholder=''>
          <el-option 
            v-for="item in feedbackList" 
            :key="item.id" 
            :label="item.value" 
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="nav illegalTime">
        <span class="demonstration">上传时间</span>
        <el-date-picker
          size="small"
          v-model="unloadTime"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button size="small" v-if="dealWithBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="dealWithAction">
          <i class="iconfont icon-chuli"></i>
          处理
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
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column prop="reportTime" label="上传时间" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reportType" label="上传类型" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="vehicleNo" label="车牌号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractCode" label="合同号" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="feedBackStatus" label="处理状态" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phoneNumber" label="用户账号/手机号" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" label="用户姓名" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reportInfo" label="上传信息" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="violators" label="上传附件" width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-image v-for="item in scope.row.pefileUrls" :key='item.id' style="width: 16px; height: 16px" :src="item.efileAddr" :preview-src-list="[item.efileAddr]"></el-image>
                <!-- <el-image v-for="item in scope.row.pefileUrls" @click="lookImageAction(item.efileAddr)" :key='item.id' style="width: 16px; height: 16px" :src="item.efileAddr" ></el-image> -->
                <img v-for="item in scope.row.mefileUrls" @click="lookVideoAction(item.efileAddr)" :key='item.id' style="width: 16px; height: 16px" src="../../../assets/start.png" >
                <!-- <el-image v-for="item in scope.row.mefileUrls" @click="lookVideoAction(item.efileAddr)" :key='item.id' style="width: 16px; height: 16px" src="../../../assets/start.png" ></el-image> -->
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="处理备注" min-width="90" show-overflow-tooltip></el-table-column>
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
        <!-- 处理 -->
        <el-dialog class="dealWithToast" :visible.sync="dealWithToast" width="500px" title="处理备注">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="输入处理备注" v-model="processingNote"></el-input>
          <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="dealWithToast = false">取 消</el-button>
              <el-button size="small" type="primary" @click="dealWithConfirm">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 查看附件 -->
        <!-- <div class="lookImage">
          <el-dialog :visible.sync="dialogVisible" width="500px">
            <el-image class="imgList"  fit="scale-down" :src="imageUrl" ></el-image>
          </el-dialog>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {keyToUploadData,keyToUploadHandle} from '../../../api/trafficProcessing/api'
import {getCookie,setCookie,removeCookie,getMenuBtnList} from "../../../public";
export default {
  name: "keyToUpload",
  data() {
    return {
      loading:false,//是否显示loading
      isDisable: true, //是否禁用修改、处理、审核、查看按钮
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      userPhone : null,
      userName :null,
      vehicleNo :null,
      contractCode :null,
      uploadType :null,
      feedback :null,
      unloadTime :null,
      processingNote:null,//处理备注
      uploadTypeList:[
          {
              id:1,
              value:'故障登记'
          },
          {
              id:2,
              value:'事故登记'
          },
          {
              id:3,
              value:'公司保养预约'
          },
          {
              id:4,
              value:'自行保养登记'
          },
      ],//上传类型
      feedbackList:[
          {
              id:1,
              value:'待处理'
          },
          {
              id:2,
              value:'已处理'
          },

      ],//反馈状态
      tableData: [], //表格数据
      selectData:[],//选中表格的数据
      dealWithToast:false,//处理弹窗
      dialogVisible:false,
      imageUrl:'',
      searchBtn:false,//查询按钮是否有权限显示
      dealWithBtn:false,//处理按钮是否有权限显示
      tableHeight: window.innerHeight - 400 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    getDataList(){
      this.loading = true
      let params = {
        contractCode: this.contractCode,
        endTime: this.unloadTime ? this.unloadTime[1] :null,
        startTime: this.unloadTime ? this.unloadTime[0] :null ,
        feedBackStatus: this.feedback,
        phoneNumber: this.userPhone,
        reportType: this.uploadType,
        userName: this.userName,
        vehicleNo: this.vehicleNo,
        currentPage:this.currentPage,
        pageSize: this.pageSize
      }
      keyToUploadData(params,this.headers).then(res=>{
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
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getDataList()
    },
    // 重置
    resetAction(){
      this.contractCode = null,
      this.unloadTime = null,
      this.feedback = null,
      this.userPhone = null,
      this.uploadType = null,
      this.userName = null,
      this.vehicleNo = null,
      this.currentPage = 1,
      this.pageSize = 10
      this.getDataList()
    },
    // 处理
    dealWithAction(){
      if(this.selectData.length > 1){
          this.$message.warning({
              message:'处理不能多选',
              center:true
          })
          return
      }
      if(this.selectData[0].feedBackStatusCode != 1){
          this.$message.warning({
              message:'已处理,不可再操作！',
              center:true
          })
          return
      }
        this.processingNote = null
        this.dealWithToast = true
    },
    // 处理确认
    dealWithConfirm(){
      let params ={
        id:this.selectData[0].id,
        remark:this.processingNote
      }
      keyToUploadHandle(params,this.headers).then(res=>{
        this.dealWithToast = false
        if(res.status == 0){
          this.$message.success({
            message:'处理成功',
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
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 查看图片
    lookImageAction(url){
      this.imageUrl = url
      this.dialogVisible =true
    },
    // 查看视频
    lookVideoAction(url){
       window.open(url, '_blank');
    },
    //   表格选择则
    handleSelectionChange(val) {
      this.selectData = val
      this.isDisable = val.length < 1 ? true : false;
    },
    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataList()
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataList()
    },
  },
  mounted() {
    this.getDataList()
  },
  computed:{
      // 计算国际化标题和按钮
    //   internationalTitle(){
    //       return this.$store.state.languageTitle
    //   },
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
                if(item.name == '处理') this.dealWithBtn = true
            })
        },
        immediate:true,
        deep:true
      },
  }
};
</script>

<style scoped>
#keyToUpload {
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
.illegalTime >>> .el-input__icon{
  display: none !important;
}
.illegalTime .el-input__inner {
  width: 290px;
}
.illegalTime >>>  .el-range-input{
  width: 45% !important;
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
.dealWithToast >>> .el-dialog__body{
    padding: 20px;
}
.lookImage >>> .el-dialog__body{
  padding: 0;
}
.lookImage >>> .el-dialog__header{
  padding: 0;
}
.lookImage >>> .el-dialog__headerbtn{
  top: -11px;
  right: -15px;
  color: #fff;
  opacity: 1;
}
.lookImage>>> .el-dialog__close{
  color: #fff;
}
.lookImage >>>.el-carousel__button{
  width: 12px;
}
.imgList{
  width: 500px;
  height: 400px;
  display: block;
}
</style>