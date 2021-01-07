<template>
  <div class="container scoped">
      <div class="search">
      <div v-show="showmsg" class="msg">
        <div ref="msg" style="min-width: 800px;margin-left: 0px;">{{message}}</div>
      </div>
        <div class="searchitem">
          <label style="min-width: 185px;">根据车牌号码查询：</label>
           <el-input size="small" v-model="search.vehicleNo" style="width: 175px;"></el-input>
        </div>
        <div class="searchitem">
          <label style="min-width: 185px;">根据合同联系人手机号查询：</label>
          <el-input size="small" v-model="search.phone" style="width: 175px;"></el-input>
        </div>
        <div class="searchitem">
          <label style="min-width: 185px;">根据车辆条件查询：</label>
          <div class="subsearchitem">
            <div>
              <label>使用方式：</label>
              <el-select size="small" v-model="search.vehicleUsageMode" clearable>
                <el-option value="0" label="租赁车"></el-option>
                <el-option value="1" label="替换车"></el-option>
                <el-option value="2" label="样车"></el-option>
              </el-select>
            </div>
             <div>
               <label>出租状态：</label>
               <el-select size="small" v-model="search.vehicleUsageStatus" clearable>
                 <el-option value="1" label="待租"></el-option>
                 <el-option value="0" label="已租"></el-option>
               </el-select>
             </div>
             <div>
               <label>品牌：</label>
               <el-select size="small" v-model="search.brandId" @change="getVehicleType()" clearable>
                <el-option v-for="item in brandNameOptions" :key="item.id" :label="item.brandName" :value="item.id"></el-option>
               </el-select>
             </div>
             <div>
               <label>车型：</label>
               <el-select size="small" v-model="search.typeId" clearable>
                 <el-option  v-for="item in vehicleTypeNameOptions"
                 :key="item.id" :label="item.vehicleTypeName" :value="item.id"></el-option>
               </el-select>
             </div>
          </div>
        </div>
        <div style="margin-left: 10px;">
          <el-button type="primary" size="small" @click="onsearch" v-if="searchbtn">筛选</el-button>
          <el-button type="" size="small" @click="reset" v-if="searchbtn">重置</el-button>
        </div>
      </div>
      <div class="tablecontainer">
        <div style="padding: 10px 20px;">
          <div>* 系统只能查询到已存在于当前公司的有正确车架号、发动机号、车辆类型的车辆；</div>
          <div> * 本月可免费批量查询总次数为3次，剩余<span v-html="lastcount"></span>次，超出免费次数单次查询费用为0.15元/条，企业余额不足，点击此处
            <a href="javascript:;" @click="jumptopay" style="color: rgb(22, 155, 213);text-decoration: none;">充值>></a>
          </div>
        </div>
          <div class="bar">
              <el-button v-if="submitBatchbtn" type="primary" class="barbtn" size="small" @click="confirm(0)"
               :class="{ active: !isDisable }" :disabled="isDisable">
                <i class="iconfont icon-daochu"></i>
               提交批次
               </el-button>
               <el-button v-if="submitBatchbtn" type="primary" class="barbtn" size="small" @click="confirm(1)">
                 <i class="iconfont icon-daochu"></i>
                提交全部车辆批次
                </el-button>
              <el-button  v-if="batchQuerybtn" type="primary" class="barbtn"  size="small" @click="batchQuery">
                <i class="iconfont icon-chakan"></i>
                批次查询
                </el-button>
              <el-button v-if="exportlistbtn" type="primary" class="barbtn" size="small" @click="exportlist">
                <i class="iconfont icon-chuli"></i>
                结果汇总
                </el-button>
          </div>
          <el-table :data="dataList" border stripe :height="tableHeight" size="small"
            :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
            v-loading="loading" fit  @selection-change="handleSelectionChange">
            <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
            <el-table-column prop="" width="60" label="序号" align="center">
              <template slot-scope="scope">{{ scope.$index + (search.currentPage - 1) * search.pageSize + 1 }}</template>
            </el-table-column>
            <el-table-column prop="enterpriseName" label="公司名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="vehicleNo" label="车牌号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="vinNo" label="车架号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="engineNo" label="发动机号（电机号）"></el-table-column>
            <el-table-column prop="vehicleType" label="车辆类型"></el-table-column>
            <el-table-column prop="customerName" label="承租方"></el-table-column>
            <el-table-column prop="contactsPhoneNumber"  label="联系人手机号"></el-table-column>
          </el-table>
          <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange" style="margin:10px 10px"
          :current-page="search.currentPage" :page-sizes="[50, 100, 200, 300, 500]" :page-size="search.pageSize"
          :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
import { getCookie,openNewTab,getMenuBtnList } from "@/public";
  export default{
    name:'illegalVehicle',
    data(){
      return {
        search:{
          "vehicleNo": "",
          "phone": "",
          "brandId": null,
          "typeId": null,
          "vehicleUsageMode": null,
          "vehicleUsageStatus": null,
          "enterpriseId": null,
          "currentPage": 1,
          "pageSize": 50
        },
        multipleSelection:[],
        brandNameOptions:[],
        vehicleTypeNameOptions:[],
        loading:false,
        dataList:null,
        total:0,
        lastcount:"*",
        isDisable:true,
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        tableHeight: window.innerHeight - 510 +'',
        showmsg:false,
        message:"",
        searchbtn:false,
        submitBatchbtn:false,
        batchQuerybtn:false,
        exportlistbtn:false
      }
    },
    methods:{
      reset(){
        for(let item in this.search){
          if(item!="currentPage"&&item!="pageSize"){
            this.search[item]=""
          }
        }
      },
      jumptopay(){
        openNewTab(this,"账户充值",'/pay')
      },
      onsearch(){
        this.search.currentPage=1
        this.getlist()
      },
      batchQuery(){
        openNewTab(this,"批次查询",'/illegalbatchQuery')
      },
      exportlist(){
        openNewTab(this,"结果汇总",'/illegalResult')
      },
	  confirm(checkAll){
		  let msg=""
		  if(checkAll==0){
			 msg=this.multipleSelection.length
		  }
		  else{
			   msg=`全部${this.total}`
		  }
		  this.$confirm(`当前选择了${msg}辆车，确定提交查询批次吗？`,'提示',{
		  				 confirmButtonText:"提交",
		  				 cancelButtonText:'取消',
		  				 type:'info'
		  }).then(()=>{
		  	 this.submitBatch(checkAll)
		  }).catch(()=>{
			 console.log("用户取消提交批次")
		  })
	  },
      submitBatch(checkAll){
        let data={
            enterpriseId:"",
            vehicleNum:null,
            vehicleIds:[],
            checkAll:checkAll
        }
        if(checkAll==0){
              data["enterpriseId"]= this.multipleSelection[0].enterpriseId
              data["vehicleNum"]= this.multipleSelection.length
              data["vehicleIds"]= this.multipleSelection.map((item)=>{
                    return item.id
              })
        }
        else if(this.dataList&&this.dataList.length>0){
            data["enterpriseId"]= this.dataList[0].enterpriseId
        }
        else{
          this.$message.error("当前没有可查车辆")
          return
        }
        //提交批次
        axios({
          method: "post",
          url: '/vehicle-service/violationBatch/submitBatch',
          headers: this.headers,
          data: data
          })
          .then((result) => {
            if(result.data.status==0){
              this.batchQuery()
              this.$message({
                message: "提交批次成功",
                center: true,
                type: "success",
              });
            }
            else{
              this.$message.error(result.data.message)
            }
          })
          .catch((err) => {
            console.error(err);
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      },
      handleSizeChange(val){
         this.search.pageSize=val
         this.getlist()
      },
      handleCurrentChange(val){
          this.search.currentPage=val
         this.getlist()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.isDisable = this.multipleSelection.length < 1 ? true : false;
        let flag=true
        let enterpriseId=this.multipleSelection[0].enterpriseId
        for(let item of this.multipleSelection){
          if(item.enterpriseId!=enterpriseId){
            flag=false
            break
          }
        }
        if(!flag){
          this.isDisable=true
          this.$message({
            message: "所选批次仅限同一公司",
            center: true,
            type: "error",
          });
        }
      },
      getlist(){
          this.loading=true
          axios({
            method: "post",
            url:'/vehicle-service/vehicleInfo/screenVehicle',
            data:this.search,
            headers:this.headers
          })
          .then((result)=>{
            this.loading=false
            if(result.data&&result.data.data){
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
      },
      getPinPai(){
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
      },
      getVehicleType() {
        //获取车型
        axios({
          method: "get",
          url: "/vehicle-service/vehicleTypeInfo/queryVehicleTypeListByBrandId?id=" + this.search.brandId,
          headers: this.headers,
        })
          .then((result) => {
            this.search.typeId=""
            this.vehicleTypeNameOptions = result.data.data;
          })
          .catch((err) => {
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      },
      getmsg(){
        axios({
          method: "get",
          url: "/vehicle-service/noticeInfo/queryNoticeInfo",
          headers: this.headers,
        })
          .then((result) => {
            if(result.data.data){
              this.message=result.data.data
              this.showmsg=true;
            }
          })
          .catch((err) => {
          });
      },
      getlastcount(){
        axios({
          method: "post",
          url: "/vehicle-service/violationBatch/getViolationFreeNum",
          headers: this.headers,
        })
          .then((result) => {
            if(result.data.data!=null){
              this.lastcount=result.data.data
            }
          })
          .catch((err) => {
          });
      }
    },
    mounted(){
      this.getlist()
      this.getPinPai()
      this.getmsg()
      this.getlastcount()
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
              if(item.name == '筛选') this.searchbtn = true
              if(item.name == '提交批次') this.submitBatchbtn = true
              if(item.name == '批次查询') this.batchQuerybtn = true
              if(item.name == '结果汇总') this.exportlistbtn = true
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
    height: calc(100% - 103px);
    font-size: 12px;
  }
  .tablecontainer{
     padding: 10px 0px;
     border: 1px solid #E5E5E5;
     padding-top: 0px;
     height: calc(100% - 187px);
  }
.title{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 10px;
}
.search{
  padding: 10px 20px;
  border: 1px solid #E5E5E5;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-top: 0px;
  flex-direction: column;
}
.searchitem{
  display: flex;
  justify-content: flex-start;
  margin:5px 10px;
}
.searchitem label{
  min-width: 70px;
  line-height: 32px;
  font-size: 14px;
}
.bar{
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 20px;
}
.goback{
    color: rgb(22, 155, 213);
    text-decoration: none;
    float: left;
    font-weight: 500;
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid #dddddd;
}
.subsearchitem{
  display: flex;
  justify-content: flex-start;
  flex: 1;
}
.subsearchitem > div{
  display: flex;
  justify-content: flex-start;
  flex: 1;
}
.subsearchitem > div > label{
  width: 150px;
  font-size: 12px!important;
  text-align: center!important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
/deep/ .barbtn{
  background-color:white;
  color:#3a8ee6;
}
/deep/ .barbtn:hover{
  background-color:#ecf5ff!important;
  color:#3a8ee6!important;
}
/deep/ .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #C0C4CC!important;
    cursor: not-allowed;
    background-image: none;
    background-color: #FFF;
    border-color: #EBEEF5;
}
.msg{
  font-size: 14px;
  color: #A30014;
  padding: 0px 10px;
  overflow: hidden;
  width: 800px;
  min-width: 800px;
}
</style>
