<template>
  <div>
    <div class="header scoped">
      <div class="headerTop">
      <div class="nav">
          <span class="demonstration">所属公司</span>
          <getEnterpriseBox v-model="enterpriseId"></getEnterpriseBox>
      </div>
        <div class="nav">
          <span class="demonstration">合同编号</span>
          <el-input maxlength="50" size="small" v-model="searchform.contractCode" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号</span>
          <el-input maxlength="50" size="small" v-model="searchform.vehicleNo" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">联系人姓名</span>
          <el-input maxlength="50" size="small" v-model="searchform.customerContacts" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">联系人手机号</span>
          <el-input maxlength="50" size="small" v-model="searchform.contactsPhoneNumber" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">抵扣审核状态</span>
          <makeSelect v-model="searchform.auditStatus" :options='[{value: 0,name: "待审核"}, {value: 1,name: "审核通过"},
          {value: 2,name: "审核不通过"}]'></makeSelect>
        </div>
        <div class="nav">
          <span class="demonstration">抵扣类型</span>
          <makeSelect v-model="searchform.reductionType" :options="[{name:'故障/维修抵扣',value:1},{
           name:'事故/出险抵扣',value:2}, { name:'自行保养抵扣',value:3 }]"></makeSelect>
        </div>
        <div class="nav">
          <span class="demonstration">所属业务员</span>
          <getSalesmanBox v-model="searchform.userId"></getSalesmanBox>
        </div>
        <div class="nav orderTime">
          <span class="demonstration">抵扣时段</span>
          <el-date-picker size="small" v-model="payTime" type="daterange" format="yyyy-MM-dd"
            value-format="yyyy-MM-dd" range-separator="~"  start-placeholder clearable
            end-placeholder ></el-date-picker>
        </div>
        <el-button class="search" type="primary" size="small" @click="search">查询</el-button>
        <el-button class="reset" type="primary" size="small" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="footer" >
        <el-button @click="dkshenhe" :class="{active:!disabled}" style="margin: 10px 10px;" :disabled="disabled" v-if="btn1">抵扣审核</el-button>
        <el-table v-loading="loading"  border  stripe :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
          size="small" :data="tableData" :height="tableHeight" style="width: 100%;" @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
          <el-table-column prop="contractCode" label="合同编号" width="150"></el-table-column>
          <el-table-column prop="enterpriseName" label="所属公司" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="customerContacts" label="联系人姓名" width="100"></el-table-column>
          <el-table-column prop="contactsPhoneNumber" label="联系人手机号" width="120"></el-table-column>
          <el-table-column prop="billPeriods" label="抵扣期数" ></el-table-column>
           <el-table-column prop="rentMoney" label="抵扣金额" ></el-table-column>
          <el-table-column prop="collectionCode" label="抵扣记录编号" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="auditStatusStr" label="审核状态" width="120" ></el-table-column>
          <el-table-column prop="rentTimeStr" label="抵扣时间"  width="150"></el-table-column>
          <el-table-column prop="reductionTypeStr" label="抵扣类型"  width="120"></el-table-column>
          <el-table-column  label="附件" width="80" >
            <template slot-scope="scope">
              <span class="lookFile" @click="lookFeilAction(scope.row.efileIdCode)">查看附件</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vehicleNo" label="关联车牌号" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="userName"
            label="所属业务员"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div class="footer_page">
          <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange" style="margin:10px 10px"
            :current-page="searchform.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="searchform.pageSize"
            :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
        <!-- 查看附件 -->
       <div class="showimage" style="position: absolute;width: 0px; height: 0px">
        <el-image ref="showimage" style="width: 0px; height: 0px" :src="currentimage"  :preview-src-list="imageUrlList"></el-image>
       </div>
    </div>
  </div>
</template>

<script>
import { getCookie,  formatJE,getMenuBtnList  } from "../../../public";
import {getImgsrcList} from '../../../api/businessProcess/api'
export default {
  name: "rentAudtingRecord",
  data() {
    return {
      disabled:true,
      btn1:false,
      searchform:{
        "auditStatus": null,
        "collectionType": 2,
        "contactsPhoneNumber": "",
        "contractCode": "",
        "customerContacts": "",
        "enterpriseIdList": [],
        "id": null,
        "payType": null,
        "reductionType": null,
        "rentEndDateStr": "",
        "rentStartDateStr": "",
        "userId": null,
        "userName": "",
        "vehicleNo": "",
        "currentPage": 1,
        "pageSize": 10
      },
      currentimage:"",
      tableHeight: window.innerHeight - 424 +'',
      tableData:null,
      enterpriseId:null,
      payTime:null,
      total: 0, //数据总条数
      imageUrlList:[],
      loading:false,
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      }, //请求头
      selection:null
    };
  },
  methods: {
    dkshenhe(){
      if (this.selection[0].auditStatus != 0 ) {
        this.$message({
          message: "已审核，不可再进行审核操作!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/rentAudting",
        query: {id: this.selection[0].id },
      });
    },
    handleSelectionChange(selection){
        if(selection.length!=1){
          this.disabled=true
        }
        else{
          this.disabled=false
        }
        this.selection=selection
    },
    // 获取分页数据
    getListData() {
      this.loading = true
      this.$axios.post("/vehicle-service/rentCollectionInfo/queryRentDeduction",this.searchform,{headers:this.headers}).then(res=>{
          setTimeout(() => {
            window.onload()
          }, 10)
          this.loading = false
          this.total = res.data.data.total
          res.data.data.records.map(item=>{
            item.rentMoney = formatJE(item.rentMoney)
            item.preCollectMoney = formatJE(item.preCollectMoney)
            item.writeOffMoney = formatJE(item.writeOffMoney)
          })
          this.tableData = res.data.data.records
      }).catch(err=>{
          this.loading = false
      })
    },
    // 查询
    search() {
      this.searchform.currentPage = 1;
      this.getListData();
    },
    // 重置
    reset() {
      for(let item in this.searchform){
        if(item!="currentPage"&&item!="pageSize"&&item!="enterpriseIdList"&&item!="collectionType"){
          this.searchform[item]=""
        }
      }
      this.searchform.currentPage=1
      this.enterpriseId=""
      this.searchform.enterpriseIdList=[]
      this.payTime=null
      this.getListData();
    },
    // 查看附件
    lookFeilAction(imgCode){
      let params = {
        idCode:imgCode
      }
      let msg=this.$message.success("正在加载附件...")
      getImgsrcList(params,this.headers).then(res=>{
        if(res.status == 0&&res.data&&res.data.length>0){
          this.imageUrlList =res.data.map((item)=>{
            return item.efileAddr
          })
          this.currentimage=this.imageUrlList[0]
          this.$refs.showimage.$el.children[0].click()
          msg.close()
        }else{
          this.$message.warning({
            message:'暂无附件',
            center:true
          })
        }
      }).catch(err=>{console.log(err)})
    },

    //每页多少条
    handleSizeChange(val) {
      this.searchform.pageSize = val;
      this.getListData();
    },
    //选择页数
    handleCurrentChange(val) {
      this.searchform.currentPage = val;
      this.getListData();
    },
  },
  watch: {
    payTime(){
      this.searchform.rentEndDateStr = this.payTime ?  (this.payTime[1] +" "+ '23:59:59'): null
      this.searchform.rentStartDateStr = this.payTime ?  this.payTime[0]: null
    },
    enterpriseId(){
        this.searchform.enterpriseIdList=this.enterpriseId?[this.enterpriseId]:[]
    },
    // 监听菜单按钮变化并控制页面按钮显示
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '抵扣审核') this.btn1 = true
          })
      },
      immediate:true,
      deep:true
    },
    "$store.getters.isStatus": function () {
      if (this.$store.state.isStatus == true) {
        this.getListData();
      }
    }
  },
  mounted() {
    this.getListData();
  },
  computed:{
    // 计算菜单页面按钮
    menuDataList(){
        return this.$store.state.menuData
    }
  }
};
</script>

<style scoped>
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
  width: 75px;
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
.orderTime >>> .el-input__icon {
  display: none;
}
.orderTime .el-input__inner {
  width: 230px;
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
  height: calc(100% - 258px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footer .top {
  width: 100%;
  /* height: 68px; */
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
  height: calc(100%);
}
.el-table {
  color: #333333;
}
.footerTable {
  width: 100%;
  height: calc(100% - 276px);
  overflow-y: auto;
}
.footer_page {
  width: 100%;
  height: 47px;
  display: flex;
  border-top: 1px solid #e5e5e5;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.footerTable .el-table {
  overflow: auto;
  height: 100%!important;
}
.from {
  overflow: hidden;
}
.formItem >>> .el-form-item {
  float: left;
  margin-left: 25px;
}
.lookFile {
  color: #0000ff;
  cursor: pointer;
}
</style>
