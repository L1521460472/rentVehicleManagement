<template>
  <div class="container">
      <div class="search scoped">
        <div class="searchitem">
          <label>所属公司</label>
          <getEnterpriseBox v-model="search.enterpriseId" :clearable="false"></getEnterpriseBox>
        </div>
        <div>
          <el-button type="primary" @click="onsearch">查询</el-button>
          <el-button  @click="onexport">导出</el-button>
        </div>
      </div>
     <el-table :data="dataList" border class="table" stripe :height="tableHeight" size="small"
      :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
      v-loading="loading">
      <el-table-column type="index" label="序号" width="50" align="center">
      	 <template slot-scope="scope">
      	        <span>{{(search.currentPage-1) * search.pageSize + scope.$index + 1}}</span>
      	 </template>
      </el-table-column>
       <el-table-column prop="parkingLotName" label="地点名称"></el-table-column>
       <el-table-column prop="vehicleNums" label="存放车辆数量"></el-table-column>
       <el-table-column prop="vehicleTypeNums" label="存放车型数量"></el-table-column>

     </el-table>
     <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange" style="margin:10px 10px"
       :current-page="search.currentPage" :page-sizes="[10, 20, 50, 100, 200]" :page-size="search.pageSize"
       :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
import { getCookie,getMenuBtnList,formatDate} from "@/public";
import getEnterpriseBox from '@/components/aacommon/getEnterpriseBox.vue'
  export default{
    name:'parkingLotVehicleNum',
    components:{
      getEnterpriseBox
    },
    data(){
      return {
        search:{
          "enterpriseId": getCookie("UserEnterpriseId"),
          "currentPage": 1,
          "pageSize": 10
        },
        loading:false,
        dataList:null,
        total:0,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        tableHeight: window.innerHeight - 276 +'',
        btn1:false,
        btn2:false
      }
    },
    methods:{
      onexport(){
        axios({ method: "get",
         url: `/vehicle-service/parkingLotInfo/brandVehicleTypeVehicleNumExport?enterpriseId=${this.search.enterpriseId}`,
         headers: this.headers, data:this.search, responseType: 'blob'})
          .then((result) => {
            if (result.data.type === "application/json") {
                this.$message({ type: "error", message: "导出失败，请稍后再试" });
              } else {
                let blob = new Blob([result.data]);
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `存车地点车辆数报表.xls`;
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(link.href);
                link.remove();
              }
          })
          .catch((err) => {
            if(typeof err =='object'){
              this.$message({
                message: err.message,
                center: true,
                type: "error",
              });
            }
            else{
              this.$message({
                message: err,
                center: true,
                type: "error",
              });
            }
          });
      },
      onsearch(){
        this.search.currentPage=1
        this.getlist()
      },
      handleSizeChange(val){
         this.search.pageSize=val
         this.getlist()
      },
      handleCurrentChange(val){
          this.search.currentPage=val
         this.getlist()
      },
      getlist(){
          this.loading=true
          axios({
            method: "post",
            url:'/vehicle-service/parkingLotInfo/parkingLotVehicleNum',
            data:this.search,
            headers:this.headers
          })
          .then((result)=>{
            this.loading=false
            if(result.data&&result.data.data){
                setTimeout(() => {
            window.onload()
          }, 10)
              this.dataList=result.data.data.records
              this.total=result.data.data.total
            }
          })
          .catch((err)=>{
            console.log(err)
            this.loading=false
            this.$message({
              message: "服务器繁忙，请稍后再试",
              center: true,
              type: "error",
            });
          })
      }
    },
    mounted(){
      this.getlist()
    },
    computed:{
      menuDataList(){
          return this.$store.state.menuData
      }
    },
    watch:{
      menuDataList:{
        handler(data){
            let btns =  getMenuBtnList(data,this.$route.path)
            btns.map(item=>{
              if(item.name == '查询') this.btn1 = true
              if(item.name == '导出') this.btn2 = true
            })
        },
        immediate:true,
        deep:true
      },
    }
  }
</script>

<style scoped>
  .container{
    padding: 20px;
    border: 1px solid #E5E5E5;
    height: calc(100% - 103px);
    font-size: 12px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .table{
    overflow: auto;
  }
.title{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 10px;
}
.search{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.searchitem{
  display: flex;
  justify-content: flex-start;
  margin-right: 10px;
  margin-left: 10px;
  width:auto;
}
.searchitem label{
  min-width: 70px;
  line-height: 32px;
  font-size: 12px;
  color: #333333;
}
.bar{
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
