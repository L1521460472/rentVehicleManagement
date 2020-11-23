<template>
  <div
    id="header"
    v-loading="loading"
  >
    <div class="header">
      <div class="headerTop">
        <div class="nav">
          <span class="demonstration">推荐状态</span>
          <el-select clearable v-model="searchdata.recommendStstus" size="small"  placeholder="请选择" >
            <el-option v-for="item in shangjiastates" :key="item.value" :label="item.name" :value="item.value" ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">所属公司</span>
          <el-select  clearable v-model="searchdata.enterpriseId" size="small" placeholder="请选择"   @change="changecompanyname">
            <el-option v-for="item in companyOptions" :key="item.id" :label="item.name" :value="item.id" > </el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">品牌</span>
          <el-select clearable v-model="searchdata.brandId" size="small" placeholder="请选择" @change="changebrandName">
            <el-option v-for="item in brandNameOptions" :key="item.id" :label="item.brandName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="headerBotton" style="margin-left: 45px;">
          <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
          <el-button class="reset" size="small" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button @click="shangjia" size="small" v-if="upBtn" :class="{ active: upclass }" :disabled="!upclass" >
         上架
        </el-button>
        <el-button @click="xiajia" size="small" v-if="downBtn" :class="{ active: downclass }" :disabled="!downclass" >
         下架
        </el-button>
        <el-checkbox
          v-model="specialType"
         v-if="upBtn"
         :disabled="!upclass"
         style="margin-left: 10px;margin-right: 10px;"><span style="font-size: 12px;">推荐为定制APP</span></el-checkbox>
        <el-input
        :disabled="!upclass"
          size="mini"
          style="width: 170px;"
          v-model="specialTypeValue"
          v-if="specialType" placeholder="请输入定制版APP标识码"  onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
      </div>
      <el-table :data="dataList"  border stripe :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
        size="small" style="width: 100%; height: 100%;" height="100%" @selection-change="handleSelectionChange" >
        <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
        <el-table-column prop width="60" label="序号" align="center">
          <template slot-scope="scope">{{ scope.$index + (searchdata.currentPage - 1) * searchdata.pageSize + 1 }}</template>
        </el-table-column>
        <el-table-column prop="recommendStatusStr" label="推荐状态"></el-table-column>
        <el-table-column prop="enterpriseName"  label="公司"></el-table-column>
        <el-table-column prop="brandName" label="品牌" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="vehicleTypeName" label="车型"></el-table-column>
        <el-table-column prop="monthRent" label="月租金(元/辆/月)"></el-table-column>
      </el-table>
      <div class="footer_page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.searchdata.currentPage"
          :page-sizes="[10, 20, 30, 40, 50]" :page-size="this.searchdata.pageSize" :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString, getMenuBtnList,formatJE } from "@/public";
export default {
  name: "recommendVehicleType",
  data() {
    return {
        loading:false,
        searchdata:{
             "currentPage": 1,
             "pageSize": 10,
             "recommendStstus": null,//推荐状态
             "enterpriseId": '',//企业ID
             "enterpriseName": "",//企业名称
             "storeId": '',
             "storeName": "",
             "brandId": null,
             "brandName": ''//品牌
        },
        shangjiastates:[
          {name:'上架中',value:1},
          {name:'下架中',value:0}
        ],
        dataList: [],
        brandNameOptions:[],//品牌
        companyOptions:[],//公司
        total: 0,
        searchBtn : false,//查询权限按钮
        upBtn : false,//上架
        downBtn : false,//下架
        tableHeight: window.innerHeight - 445 +'',
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        upclass:false,
        downclass:false,
        vehicletypeids:[],
        specialType:false,
        specialTypeValue:null//推荐appid ,默认是0
    };
  },
  methods: {
    commitdata(type){
      if(this.vehicletypeids.length>0){
        let data={
              specialType:this.specialTypeValue?Number(this.specialTypeValue):0,
              type: type,
              vehicleTypeIds: this.vehicletypeids
        }
        this.$confirm('是否对所选车型，进行上架操作？', '车辆上架', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                   axios({
                     method: "post",
                     url: "/vehicle-service/recommendVehicleTypeInfo/vehicleTypeRecommend",
                     headers: this.headers,
                     data:data,
                   })
                     .then((result) => {
                       if (result.data.status == 0) {
                        this.$message({
                          message: type==1?"上架成功":"下架成功",
                          center: true,
                          type: "info",
                        });
                        this.getlist()
                       } else {
                         this.$message({
                           message: result.data.message,
                           center: true,
                           type: "error",
                         });
                       }
                     })
                     .catch((err) => {
                       this.loading = false
                       this.$message({
                         message: "上架失败，请稍后再试",
                         center: true,
                         type: "error",
                       });
                     });
                }).catch(() => {

        });
      }
    },
    shangjia(){
      this.commitdata(1)//上架
    },
    xiajia(){
      this.commitdata(0)//下架
    },
    changecompanyname(val){
     if(this.companyOptions&&this.companyOptions.length){
       for(let item of this.companyOptions){
         if(item.id==val){
           this.searchdata.enterpriseName=item.name
           break
         }
       }
     }
    },
    changebrandName(val){
      if(this.brandNameOptions&&this.brandNameOptions.length){
        for(let item of this.brandNameOptions){
          if(item.id==val){
            this.searchdata.brandName=item.brandName
            break
          }
        }
      }
    },
    handleSizeChange(val) {
       this.searchdata.pageSize=val;
       this.getlist();
    },
    handleCurrentChange(val) {
      this.searchdata.currentPage=val
      this.getlist();
    },
    handleSelectionChange(val) {
      this.vehicletypeids=[];
      this.multipleSelection = val;
      let shangjiaflag=false
      let xiajiaflag=false
      for(let item of this.multipleSelection){
          if(item.recommendStatus==1){
            shangjiaflag=true
          }
         if(item.recommendStatus==0){
           xiajiaflag=true
         }
         this.vehicletypeids.push(item.vehicleTypeId)
      }
      if(shangjiaflag&&xiajiaflag){
        this.upclass=false
        this.downclass=false
      }
      else if(shangjiaflag){
        this.upclass=false
        this.downclass=true
      }
      else if(xiajiaflag){
        this.upclass=true
        this.downclass=false
      }
      else{
        this.upclass=false
        this.downclass=false
      }
    },
    search() {
      this.currentPage=1;
      this.getlist();
    },
    getlist(){
      this.loading = true
      axios({
        method: "post",
        url: "/vehicle-service/recommendVehicleTypeInfo/queryPageRecommendVehicleType",
        headers: this.headers,
        data:this.searchdata,
      })
        .then((result) => {
         this.loading = false
          if (result.data.status == 0) {
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            this.currentPage = result.data.data.current;
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.loading = false
          this.$message({
            message: "拉取推荐车型列表数据失败，请稍后再试",
            center: true,
            type: "error",
          });
        });
    },
    reset() {
       for(let pname in this.searchdata){
         if(pname!='currentPage'&&pname!='pageSize'){
            this.searchdata[pname]=''
         }
       }
    },
  },
  mounted() {
    this.getlist();
    axios({
      //品牌
      method: "post",
      url: "/vehicle-service/brandInfo/brandInfoListQuery",
      headers: this.headers,
    })
      .then((result) => {
        this.brandNameOptions = result.data.data;
      })
      .catch((err) => {
        console.error(err);
        this.$message({
          message: err.response.data.message,
          center: true,
          type: "error",
        });
      });
    axios({//公司
        method: "get",
        url: "/vehicle-service/comboBoxController/getEnterpriseBox",
        headers: this.headers,
      })
        .then((result) => {
          this.companyOptions = result.data.data;
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
  },
    computed: {
    // 计算菜单页面按钮
    menuDataList() {
      return this.$store.state.menuData;
    },
  },

  watch: {
    // 监听菜单按钮变化并控制页面按钮显示
    menuDataList:{
      handler(data){
          let btns =  getMenuBtnList(data,this.$route.path)
          btns.map(item=>{
            if(item.name == '查询') this.searchBtn = true
            if(item.name == '上架') this.upBtn = true
            if(item.name == '下架') this.downBtn = true
          })
      },
      immediate:true,
      deep:true
    }
  }
};
</script>
<style scoped>
#header {
  width: 100%;
  height: calc(100% - 76px);
}
.header {
  width: 100%;
  box-sizing: border-box;
  /* border: 1px solid #e5e5e5; */
  margin-bottom: 16px;
}
.headerTop {
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  overflow: hidden;
  /* padding-bottom: 15px; */
  margin-bottom: 16px;
}
.demonstration {
  display: inline-block;
  width: 80px;
  font-size: 12px;
  margin-left: 20px;
  margin-right: 10px;
  text-align: right;
  color: #333333;
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

.p .el-input {
  width: 202px !important;
}
.p >>> .el-input--suffix {
  width: 202px !important;
}
.tableSelect .el-input {
  width: 350px !important;
}
.tableSelect >>> .el-input--suffix {
  width: 350px !important;
}
.headerBotton {
  height: 60px;
  display: flex;
  align-items: center;
  float: left;
}
/* ------------ footer -------------- */
.footer {
  width: 100%;
  height: calc(100% - 60px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footerBottom {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
}

.footerBottom .el-button:hover  {
  color: #c0c4cc !important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .active:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerTable {
  width: 100%;
  height: calc(100% - 68px);
}
.el-table {
  color: #333333;
}
.footer_informatian {
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: auto;
}
.footer_page {
  width: 100%;
  height: 45px;
  display: flex;
  border-top: 1px solid #e5e5e5;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.footer_informatian .el-table {
  overflow: auto;
}
.confirm {
  float: left;
  margin-left: 220px;
  background: #368cfe !important;
}
.confirm:hover {
  color: #fff !important;
  background: #409eff !important;
}
.cancel {
  margin-right: 220px;
  color: #368cfe !important;
  background: rgba(54, 140, 254, 0.1);
}
.cancel:hover {
  color: #fff !important;
  background: #368cfe !important;
}

.illegalTime >>> .el-input__icon {
  display: none;
}
.illegalTime >>> .el-input__inner {
  width: 210px !important;
}
.el-table{
  height: calc(100% - 95px)!important;
  overflow: auto;
}
</style>
