<template>
  <div>
      <!-- 保养统计 -->
      <div id="header" v-loading="loading">
        <div class="header scoped">
          <div class="headerTop">
            <div class="nav">
              <span class="demonstration">所属公司</span>
              <company v-model="searchData.enterpriseId"></company>
            </div>
            <div class="nav">
              <span class="demonstration">保养日期</span>
              <el-date-picker
                style="width:250px"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                v-model="time">
              </el-date-picker>
            </div>
            <div class="nav">
              <span class="demonstration">品牌</span>
              <getBrandInfo v-model='searchData.brandId' ></getBrandInfo>
            </div>
            <div class="nav">
              <span class="demonstration">车型</span>
               <getvehicleType v-model='searchData.vehicleTypeId' :brandId='searchData.brandId'></getvehicleType>
            </div>
            <div class="nav">
              <span class="demonstration">车牌号码</span>
              <el-input v-model="searchData.vehicleNo"></el-input>
            </div>
            <div class="nav" style="margin-left: 23px;">
              <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search" >查询</el-button>
              <el-button class="reset" size="small" v-if="btn1" plain @click="exportRepost" >导出Excel</el-button>
            </div>
          </div>
        </div>
        <div class="tips" v-if="btn2">
          累计保养 <span>{{maintenanceTimes}} </span>次，费用<span> {{maintenanceCounts}} </span>元，最近一次保养时间<span> {{lastTime}}</span>
        </div>
        <div class="footerBottom">
          <el-table
            :data="tableList"
            border
            stripe
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            size="small"
            style="width: 100%; height: 100%;"
            :height="tableHeight">
                <el-table-column prop="enterpriseName" label="所属公司" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="brandName"  label="品牌"></el-table-column>
                <el-table-column prop="vehicleTypeName" label="车型"></el-table-column>
                <el-table-column prop="vehicleNo" label="车牌号码" width="100"></el-table-column>
                <el-table-column prop="maintainTime" label="保养日期" width="140"></el-table-column>
                <el-table-column prop="maintainMileage" label="保养时里程（公里）" width="130"></el-table-column>
                <el-table-column prop="maintainItemsDesc" label="保养项目" width="160" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="repairer" label="修理厂" width="160" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="totalFee" label="费用合计（元）" width="120"></el-table-column>
                <el-table-column prop="payFee" label="实际支付费用（元）" width="130"></el-table-column>
                <el-table-column prop="nextMaintainTime" label="下次保养日期" width="140"></el-table-column>
                <el-table-column prop="nextMaintainMileage" label="下次保养里程（千米）" width="145"></el-table-column>
                <el-table-column prop="createByStr" label="添加人"></el-table-column>
                <el-table-column prop="createdTime" label="添加时间" width="140"></el-table-column>
                <el-table-column prop="auditUserIdStr" label="核实人"></el-table-column>
                <el-table-column prop="auditTime" label="核实时间" width="140"></el-table-column>
          </el-table>
        </div>
        <div class="footer_page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage"
            :page-sizes="[10, 20, 50, 100, 200]" :page-size="page.pageSize" :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper" :total="page.total" ></el-pagination>
        </div>
      </div>
  </div>
</template>
<script>
import company from "@/components/aacommon/getEnterpriseBox.vue"
import axios from "axios"
import { getCookie, dateToString, getMenuBtnList } from "@/public"

export default {
  name:'upkeepStatistic',
  components:{
    company
  },
  data() {
    return {
      loading: false,
      searchData: {
        enterpriseId: '', // 公司id
        brandId: '', // 品牌
        vehicleTypeId: '', // 车型
        vehicleNo: '',  // 车牌号码
        maintainStartDate: '', // 开始时间
        maintainEndDate: '', // 结束时间
      },
      time: [],
      maintenanceTimes: null, // 保养次数
      maintenanceCounts: null, // 保养费用
      lastTime: null, // 最近一次时间
      brandOptions: [
        {
          label: '品牌一',
          value: 1
        },
        {
          label: '品牌二',
          value: 2
        },
        {
          label: '品牌三',
          value: 3
        }
      ],
      tableList: [],
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
      tableHeight: window.innerHeight - 350 +'',
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      searchBtn:false,
      btn1:false,
      btn2:false
    };
  },
  watch: {
    time() {
      if (this.time.length > 0) {
        this.searchData.maintainStartDate = this.time[0]
        this.searchData.maintainEndDate = this.time[1]
      } else {
        this.searchData.maintainStartDate = ''
        this.searchData.maintainEndDate = ''
      }
    },
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '查询') this.searchBtn = true
            if(item.name == '统计查询') this.btn2 = true
            if(item.name == '导出') this.btn1 = true
          })
      },
      immediate:true,
      deep:true
    },

  },
  computed: {
    menuDataList() {
      return this.$store.state.menuData;
    },
  },
  methods: {
    // 获取表格事件
    getTableList() {
      this.loading = true
      const data = {}
      Object.assign(data, this.searchData, this.page)
      delete(data.total)
      axios({
        method: "post",
        url: "/vehicle-service/maintainManagement/maintainManagementPageQuery",
        headers: this.headers,
        data: data,
      }).then((result) => {
        this.loading = false
        if (result.data.status == 0) {
            setTimeout(() => {
            window.onload()
          }, 10)
          this.tableList = result.data.data.records
          this.page.total = result.data.data.total
          this.getTotalData()
        } else {
          this.$message({
            message: result.data.message,
            center: true,
            type: "error"
          })
        }
      }).catch((err) => {
          this.loading = false
          this.$message({
            // message: err,
            message: "获取保养统计列表数据失败，请稍后再试",
            center: true,
            type: "error",
          });
        });
    },
    getTotalData(){
      axios({
        method: "post",
        url: "/vehicle-service/maintainManagement/cumulativeStatistics",
        headers: this.headers,
        data: this.searchData,
      }).then((result)=>{
        if (result.data.status == 0) {
          this.maintenanceTimes = result.data.data.totalMaintainCounts, // 保养次数
          this.maintenanceCounts = result.data.data.totalMaintainCost, // 保养费用
          this.lastTime= result.data.data.latelyMaintainTime // 最近一次时间
        } else {
          this.$message({
            message: result.data.message,
            center: true,
            type: "error"
          })
        }
      }).catch(err=>{
        console.log(err)
          this.$message({
            // message: err,
            message: "获取保养统计数据失败，请稍后再试",
            center: true,
            type: "error",
          });
      })
    },

    // 搜索事件
    search() {
      this.page.currentPage=1;
      this.getTableList()
    },
    // 导出报表
    exportRepost() {
    //   this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/maintainManagement/maintainStatisticsExport",
        headers: this.headers,
        data: this.searchData,
        responseType: 'blob'
      }).then(res => {
        if (res.status == 200){
          let blob = new Blob([res.data]);
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob,);//blob,file.fileName
          } else {
            let link = document.createElement("a");
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);
            link.href = URL.createObjectURL(blob);
            link.download = "保养统计导出.xls"
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
        } else {
          this.$message({
            type: "error",
            message: "下载失败，文件不存在或权限不足"
          })
        }
      }).catch(error => {
        this.loading = false
        this.$message({
          message: error,
          // message: "获取保养统计列表数据失败，请稍后再试",
          center: true,
          type: "error",
        })
      })
    },
    // 获取累计保养次数，保养费用，最近一次保养时间
    getDetail() {
      axios({
        method: "post",
        url: "/vehicle-service/maintainManagement/cumulativeStatistics",
        headers: this.headers,
        data: this.searchData,
      }).then(result => {
        if (result.data.status == 0) {
          this.maintenanceTimes = result.data.data.totalMaintainCounts
          this.maintenanceCounts = result.data.data.totalMaintainCost
          this.lastTime = result.data.data.latelyMaintainTime
        } else {
          this.$message({
            message: result.data.message,
            center: true,
            type: "error"
          })
        }
      }).catch(error => {
        this.$message({
          message: error,
          center: true,
          type: "error",
        })
      })
    },
    // 页码数目切换
    handleSizeChange(val) {
       this.page.pageSize=val;
       this.getTableList();
    },
    // 页码切换
    handleCurrentChange(val) {
      this.page.currentPage=val
      this.getTableList();
    },
  },
  mounted() {
    this.getTableList()
    this.getDetail()
  }
};
</script>

<style  scoped>
#header {
  width: 100%;
  height: calc(100% - 120px);
}
.header {
  width: 100%;
  /* height: 180px; */
  box-sizing: border-box;
  /* border: 1px solid #e5e5e5; */
  margin-bottom: 16px;
}
.headerTop {
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 15px;
  margin-bottom: 16px;
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
.nav {
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
.nav span {
  color: #333333;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 12px;
  line-height: 18px;
  margin-left: 20px;
  margin-right: 5px;
}
.search {
  background: #368cfe !important;
  margin-left: 10px;
}
.reset {
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1) !important;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.search:hover {
  color: #fff !important;
  background: #409eff !important;
}
.reset:hover {
  color: #fff !important;
  background: #368cfe !important;
}
.tips {
  padding: 0 0 16px 0;
  font-size: 12px;
  color: #333333;
}
.tips span{
  color: #409eff;
}
.footer_page {
  width: 100%;
  height: 45px;
  display: flex;
  border-top: 1px solid #e5e5e5;
  align-items: center;
  text-align: left;
  justify-content: center;
}
</style>
