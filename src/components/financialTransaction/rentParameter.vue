<template>
  <!--
  不要随意进行代码换行，一目十行代码不香吗，一句代码分开几行显示看着都累
  -->
  <div id="header" v-loading="loading">
    <div class="header">
      <div class="headerTop scoped">
      <div class="nav">
          <span class="demonstration">所属公司</span>
          <company v-model="enterpriseId"></company>
      </div>
        <div class="nav">
          <span class="demonstration">品牌</span>
          <el-select clearable v-model="brandName" size="small" @change="getVehicleType">
            <el-option v-for="item in brandNameOptions" :key="item.id" :label="item.brandName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">车型</span>
          <el-select clearable v-model="vehicleTypeName" size="small" >
            <el-option v-for="item in vehicleTypeNameOptions" :key="item.id" :label="item.vehicleTypeName" :value="item.id" ></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">承租方</span>
          <el-input v-model="chengzufang" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">所属业务员</span>
          <el-select clearable v-model="userId" size="small" placeholder>
            <el-option v-for="item in userIdOptions" :key="item.id" :label="item.salesmanName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">合同类型</span>
          <el-select clearable v-model="contractType" size="small" placeholder>
            <el-option v-for="item in contractTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">合同编号</span>
          <el-input v-model="contractCode" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">车牌号</span>
          <el-input v-model="vehicleNo" size="small" maxlength="50" placeholder></el-input>
        </div>
        <div class="nav">
          <span class="demonstration">应收月份</span>
          <el-select clearable v-model="yuefenvalue" size="small" placeholder>
            <el-option v-for="item in yuefen" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">合同状态</span>
          <el-select clearable v-model="contractStatus" size="small" placeholder>
            <el-option v-for="item in contractStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">退车审核状态</span>
          <el-select clearable v-model="auditBackStatus" size="small" placeholder>
            <el-option v-for="item in auditStatus2Options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="nav">
          <span class="demonstration">锁车审核状态</span>
          <el-select clearable v-model="auditLockStatus" size="small" placeholder>
            <el-option v-for="item in auditStatus1Options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
          </el-select>
        </div>
        <div class="nav illegalTime">
          <span class="demonstration">合同时段</span>
          <el-date-picker size="small" v-model="dateValue" type="daterange" format="yyyy-MM-dd"
            value-format="yyyy-MM-dd" range-separator="~" start-placeholder
            clearable end-placeholder></el-date-picker>
        </div>
        <div class="headerBotton" style="margin-left: 45px;">
            <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="search">查询</el-button>
            <el-button size="small" type="primary" v-if="searchBtn" class="search" @click="yanjingdaijiao">押金待交</el-button>
            <el-button class="reset" size="small" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBottom">
        <el-button @click="handleAdd" size="small" v-if="payAuditBtn" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-shenhe"></i>缴费审核
        </el-button>
        <el-button @click="handleEdit"  size="small" v-if="checkPayRecordBtn" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-chakan"></i>查看合同缴费记录
        </el-button>
        <el-button @click="handleExamine" v-if="checkCarRecordBtn" size="small" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-chakan"></i>查看合同车辆记录
        </el-button>
        <el-button @click="handleImport" size="small" v-if="settleBtn" :class="{ active: !isDisable }"
          :disabled="isDisable">
          <i class="iconfont icon-huikuan"></i>退车结算
        </el-button>
        <el-button @click="handleExport" size="small" v-if="settleAuditBtn" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-shenhe"></i>退车结算审核
        </el-button>
        <el-button @click="xiangqing" size="small" v-if="xiangqingBtn" :class="{ active: !isDisable }" :disabled="isDisable">
          <i class="iconfont icon-huikuan"></i>退车结算详情
        </el-button>
        <el-button @click="yajinyanqi" size="small" v-if="yajinyanqiBtn" :class="{ active: !iscanyanqi }" :disabled="iscanyanqi">
          <i class="iconfont icon-huikuan"></i>押金延期
        </el-button>
        <el-button class='exportBtn' @click="handleInsurance" size="small" v-if="exportBtn">
          <i class="iconfont icon-daochu"></i>导出
        </el-button>
        <el-button class="exportBtn" @click="handleInsurance(1)" size="small" v-if="exportmingxiBtn">
          <i class="iconfont icon-daochu"></i>导出明细
        </el-button>
      </div>
      <div class="footerTable">
        <el-table :data="dataList" border stripe :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
          size="small" style="width: 100%; height: 100%;" :height="tableHeight"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="id" align="center" width="60"></el-table-column>
          <el-table-column prop width="60" label="序号" align="center">
            <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * pageSize + 1 }}</template>
          </el-table-column>
          <el-table-column prop="enterpriseName" label="所属公司" width="140" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="orderNo" width="140" label="订单编号" :show-overflow-tooltip="true"></el-table-column> -->
          <el-table-column prop="userName" width="100" label="业务员" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="contractType" width="100" label="合同类型"></el-table-column>
          <el-table-column prop="contractCode" width="150" label="合同编号"></el-table-column>
          <el-table-column prop="customerName" width="120" label="承租方"></el-table-column>
          <!-- <el-table-column prop="customerContacts" width="100" label="联系人姓名"></el-table-column> -->
          <el-table-column prop="rentStartDateStr" width="100" label="租赁开始日"></el-table-column>
          <el-table-column prop="rentEndDateStr" width="100" label="租赁到期日"></el-table-column>
          <el-table-column prop="rentMonths" width="80" label="租赁月数"></el-table-column>
          <el-table-column prop="vehicleNum" width="80" label="车辆数"></el-table-column>
          <!-- <el-table-column prop="chargingPileNum" width="80" label="充电桩数"></el-table-column> -->
          <el-table-column prop="deposit" width="90" label="合同总押金"></el-table-column>
          <!-- <el-table-column prop="vehicleRent" width="110" label="合同月租(汇总)"></el-table-column> -->
          <el-table-column prop="billPeriods" width="80" label="当前期数">
            <template slot-scope="scope">
              <span v-if="scope.row.billPeriods == 0">押金</span>
              <span v-else>{{scope.row.billPeriods}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="receivableMonth" width="90" label="应收月份"></el-table-column>
          <el-table-column prop="receivableMoney" width="100" label="当期应收金额"></el-table-column>
          <el-table-column prop="receivedMoney" width="100" label="当期已收金额"></el-table-column>
          <el-table-column prop="receivedDate" width="100" label="当期已收日期"></el-table-column>
          <el-table-column prop="toCollectedMoney" width="100" label="当期待收金额"></el-table-column>
          <el-table-column prop="lateFee" width="90" label="当期滞纳金"></el-table-column>
          <el-table-column prop="collectionStatusStr" width="90" label="当期状态"></el-table-column>
          <el-table-column prop="contractStatusStr" min-width="100" label="合同状态"></el-table-column>
          <!-- <el-table-column prop="collectionStatusStr" width="100" label="当期状态"></el-table-column> -->
          <!-- <el-table-column prop="auditLockStatusStr" width="100" label="锁车审核状态"></el-table-column> -->
          <!-- <el-table-column prop="auditBackStatusStr" min-width="100" label="退车审核状态"></el-table-column> -->
        </el-table>
        <div class="footer_page">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize"
            :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getCookie, dateToString, getMenuBtnList,formatJE } from "../../public";
import company from "@/components/aacommon/getEnterpriseBox.vue"
export default {
  name: "rentParameter",
    components:{
      company
    },
  data() {
    return {
      enterpriseId:"",
      contractType:'',
      contractTypes:[
        {value:1,label:'新签'}, {value:2,label:'续签'}
      ],
      brandName:'',//品牌
      vehicleTypeName:'',//车型
      loading: false,
      orderNo: "", //订单编号
      customerContacts: "", //联系人姓名
      contactsPhoneNumber: "", //联系人手机
      userId: "", //所属业务员
      contractCode: "", //合同编号
      vehicleNo: "", //车牌号
      contractStatus: "", //合同状态
      auditLockStatus: "", //锁车审核状态
      auditBackStatus: "", //退车审核状态
      dateValue: "", //合同时段
      userIdOptions: [], //所属业务员
      chengzufang:'',//承租方
      yuefenvalue:'',//应收月份
      yuefen:[1,2,3,4,5,6,7,8,9,10,11,12],
      brandNameOptions: [
        //品牌
      ],
      vehicleTypeNameOptions: [
        //车型
      ],
      contractStatusOptions: [
        // {
        //   value: "0",
        //   label: "待登记",
        // },
        {
          value: "1",
          label: "正常进行中",
          disabled: true,
        },
        {
          value: "2",
          label: "逾期待处理",
        },
        {
          value: "3",
          label: "逾期锁车",
        },
        {
          value: "4",
          label: "退车完结",
        },
      ], //合同状态
      auditStatus1Options: [
        {
          value: "0",
          label: "锁车待审核",
        },
        {
          value: "1",
          label: "锁车通过",
        },
        {
          value: "2",
          label: "锁车不通过",
        },
      ], //锁车审核状态
      auditStatus2Options: [
        {
          value: "0",
          label: "退车待审核",
        },
        {
          value: "1",
          label: "退车通过",
        },
        {
          value: "2",
          label: "退车不通过",
        },
      ], //锁车审核状态
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isDisable: true,
      searchBtn : false,//查询权限按钮
      payAuditBtn : false,//缴费审核权限按钮
      checkPayRecordBtn : false,//查看合同缴费记录权限按钮
      settleBtn : false,//退车结算权限按钮
      settleAuditBtn : false,//退车结算审核权限按钮
      checkCarRecordBtn : false,//查看合同车辆记录按钮
      exportBtn : false, //导出按钮权限
      exportmingxiBtn : false, //导出明细按钮权限
      yajinyanqiBtn:false,//押金延期
      issearchforyajindaijiao:false,//标记当前是否是查押金待交的
      iscanyanqi:true,//是否可以进行延期操作
      xiangqingBtn:false,//退车详情
      tableHeight: window.innerHeight - 445 +'',
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    //押金待交查询
    yanjingdaijiao(){
        this.issearchforyajindaijiao=true
        this.getdatalist(1)
    },
    //押金延期操作
    yajinyanqi(){
      if(this.multipleSelection.length>1){
        this.$message({ message: "不能多选，请选择单条数据进行延期押金", center: true, type: "error", });
        return
      }
      const h = this.$createElement;
              this.$msgbox({
                title: '押金延期',
                message: h('div', null, [
                  h('h4', { style: 'margin: 10px 0px;' }, '是否跳过合同押金期？ '),
                  h('p', null, '目前客户和业务员都可以提交押金，'),
                   h('p', null, '选择跳过后，将从第1期租金开始交租金，'),
                    h('p', null, '后续需由业务员对剩余未交押金进行“补交押金”操作。')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定延期',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                      instance.confirmButtonLoading = true;
                      instance.confirmButtonText = '执行中...';

                      let contractRentId=this.multipleSelection[0].contractRentId
                      axios({
                        method: "get",
                        url: "/vehicle-service/rentCollectionInfo/delay?contractRentId=" + contractRentId,
                        headers: this.headers,
                      })
                        .then((result) => {
                           if(result.data.status==0){
                             this.$message({
                               message: "操作成功，押金已延期",
                               center: true,
                               type: "success",
                             });
                             instance.confirmButtonLoading = false;
                             instance.confirmButtonText = '确定延期';
                             done();
                             this.getdatalist(1)//刷新列表
                           }
                        })
                        .catch((err) => {
                          instance.confirmButtonLoading = false;
                          instance.confirmButtonText = '确定延期';
                          done();
                          this.$message({
                            message: "服务器繁忙，请稍后再试",
                            center: true,
                            type: "error",
                          });
                        });
                  }
                  else{
                    if(instance.confirmButtonLoading){
                      this.$message({
                        message: "正在押金已延期操作...",
                        center: true,
                        type: "info",
                      });
                    }
                    else{
                      done()
                    }
                  }
                }
              })
    },
    getVehicleType() {
      //获取车型
      axios({
        method: "get",
        url: "/vehicle-service/vehicleTypeInfo/queryVehicleTypeListByBrandId?id=" + this.brandName,
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
          this.vehicleTypeName = '';
          this.vehicleTypeNameOptions = result.data.data;
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
    getsearchparams(){
      let exportType=this.issearchforyajindaijiao?1:0
      return {
          enterpriseIdList:this.enterpriseId?[this.enterpriseId]:[],
          auditBackStatus:this.auditBackStatus,
          auditLockStatus: this.auditLockStatus,
          contactsPhoneNumber: this.contactsPhoneNumber,
          contractCode: this.contractCode,
          contractStatus: this.contractStatus,
          customerContacts: this.customerContacts,
          endContractMode: this.endContractMode,
          contractType:this.contractType,
          id: null,
          orderNo: this.orderNo,
          rentStartDateStr: this.dateValue[0] ? this.dateValue[0] : "",
          rentEndDateStr: this.dateValue[1] ? this.dateValue[1] : "",
          userId: this.userId,
          vehicleNo: this.vehicleNo,
          userName: null,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          brandId:this.brandName,
          vehicleTypeId:this.vehicleTypeName,
          customerName:this.chengzufang,
          receivableMonth:this.yuefenvalue,
          exportType:exportType //导出类型(0-导出查询数据 1-导出押金待交查询数据
        }
    },
    getdatalist(currentPage,currentPageSize){
      this.loading = true
      if(currentPage){
        this.currentPage=currentPage
      }
      if(currentPageSize){
        this.pageSize=currentPageSize
      }
      let searchurl="/vehicle-service/rentCollectionInfo/queryPageRentParameter"
      if(this.issearchforyajindaijiao){
        searchurl="/vehicle-service/rentCollectionInfo/depositDelay"
      }
      axios({
        method: "post",
        url: searchurl,
        headers: this.headers,
        data: this.getsearchparams(),
      })
        .then((result) => {
         this.loading = false
          if (result.data.status == 0) {
              setTimeout(() => {
            window.onload()
          }, 10)
            result.data.data.records.map(item=>{
              item.deposit = formatJE(item.deposit)
              item.receivableMoney = formatJE(item.receivableMoney)
              item.receivedMoney = formatJE(item.receivedMoney)
              item.toCollectedMoney = formatJE(item.toCollectedMoney)
              item.lateFee = formatJE(item.lateFee)
            })
            this.dataList = result.data.data.records;
            this.total = result.data.data.total;
            if(this.issearchforyajindaijiao){
              if(result.data.data&&result.data.data.records&&result.data.data.records.length==0){
                this.$message({
                  message: "当前没有待交押金数据，请重新查询",
                  center: true,
                  type: "info",
                });
              }
            }
          } else {
            this.$message({
              message: result.data.message,
              center: true,
              type: "error",
            });
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
    handleSizeChange(val) {
      this.getdatalist(1,val)
    },
    handleCurrentChange(val) {
      this.getdatalist(val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.isDisable = this.multipleSelection.length < 1 ? true : false;
      if(!this.issearchforyajindaijiao){
        this.iscanyanqi = this.multipleSelection.length < 1 ? true : false;
        if(!this.isDisable){
          let cyq=true
          for(let item of this.multipleSelection){
            if(item.billPeriods!=0){
              cyq=false;
              break;
            }
          }
          if(cyq){
            this.iscanyanqi=false
          }
          else{
             this.iscanyanqi=true
          }
        }
      }
      else{
        this.iscanyanqi =true
      }
    },
    search() {
      this.issearchforyajindaijiao=false
      this.getdatalist(1)
    },
    reset() {
      this.auditBackStatus = '',
      this.auditLockStatus = '',
      this.contactsPhoneNumber = "";
      this.contractCode = "";
      this.contractStatus = "";
      this.customerContacts = "";
      this.endContractMode = "";
      this.orderNo = "";
      this.userId = "";
      this.dateValue = "";
      this.vehicleNo = "";
      this.brandName='',
      this.vehicleTypeName='',
      this.chengzufang='',
      this.yuefenvalue='',
      this.contractType=''
      this.issearchforyajindaijiao=false
      this.enterpriseId=""
      this.getdatalist(1);
    },
    handleEdit() {
      //查看合同缴费记录
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "查看合同缴费记录不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/lookContractPayment",
        query: { form: "look", id: this.multipleSelection[0].id },
      });
    },
    xiangqing(){
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "退车结算详情不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$router.push({
        path: "/backVehicleDetail",
        query: { id: this.multipleSelection[0].id },
      });
    },
    handleImport() {
      //退车结算
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "退车结算不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      if (this.multipleSelection[0].auditBackStatus === 0 || this.multipleSelection[0].auditBackStatus === 1) {
        this.$message({
          message: "不可进行退车结算操作!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/backVehicle",
        query: { form: "backVehicle", id: this.multipleSelection[0].id },
      });
    },
    handleExport() {
      //退车结算审核
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "退车结算审核不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      if (this.multipleSelection[0].auditBackStatus != 0) {
        this.$message({
          message: "不可进行退车结算审核操作!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/backVehicleAudit",
        query: { form: "audit", id: this.multipleSelection[0].id },
      });
    },
    handleExamine() {
      //查看合同车辆记录
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "查看合同车辆记录不能多选!",
          center: true,
          type: "error",
        });
        return;
      }
      this.$store.commit("changeIsStatus", false);
      this.$router.push({
        path: "/lookVehicle",
        query: { form: "look", id: this.multipleSelection[0].id },
      });
    },
    handleInsurance(flag) {
       let filename="收租台账信息.xls"
      let path="/vehicle-service/rentCollectionInfo/exportRentParameterInfo"//导出
      if(flag==1){
        path="/vehicle-service/rentCollectionInfo/exportRentParameterDetailInfo"//导出明细
        filename="收租台账信息明细.xls"
      }
      //导出
      axios({
        method: "post",
        url: path,
        headers: this.headers,
        data: this.getsearchparams(),
        responseType: 'blob'
      })
        .then((result) => {
          if (result.data.type === "application/json") {
              this.$message({
                type: "error",
                message: "下载失败，文件不存在或权限不足"
              });
            } else {
              let blob = new Blob([result.data]);
              if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob,);//blob,file.fileName
              } else {
                let link = document.createElement("a");
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, false);
                link.href = URL.createObjectURL(blob);
                link.download = filename
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(link.href);
              }
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
  },
  mounted() {
    let query=this.$router.currentRoute.query;
    if(query&&query.vehicleNo)
    {
      this.vehicleNo=query.vehicleNo;
    }
    this.getdatalist(1);
    axios({
      method: "get",
      url: "/vehicle-service/comboBoxController/getSalesmanBox",
      headers: this.headers,
    })
      .then((result) => {
        // console.log(result.data);
        this.userIdOptions = result.data.data;
      })
      .catch((err) => {
        console.error(err);
        this.$message({
          message: err.response.data.message,
          center: true,
          type: "error",
        });
      });
      axios({
        //品牌
        method: "post",
        url: "/vehicle-service/brandInfo/brandInfoListQuery",
        headers: this.headers,
      })
        .then((result) => {
          // console.log(result.data);
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
    computed: {
    // 计算国际化标题和按钮
    // internationalTitle() {
    //   return this.$store.state.languageTitle;
    // },
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
            if(item.name == '缴费审核') this.payAuditBtn = true
            if(item.name == '查看合同缴费记录') this.checkPayRecordBtn = true
            if(item.name == '退车结算') this.settleBtn = true
            if(item.name == '退车结算审核') this.settleAuditBtn = true
            if(item.name == '查看合同车辆记录') this.checkCarRecordBtn = true
            if(item.name == '导出') this.exportBtn = true
            if(item.name == '导出明细') this.exportmingxiBtn = true
            if(item.name == '押金延期') this.yajinyanqiBtn = true
            if(item.name == '退车结算详情') this.xiangqingBtn = true

          })
      },
      immediate:true,
      deep:true
    },

    "$store.getters.isStatus": function () {
      if (this.$store.state.isStatus == true) {
        this.getdatalist();
      }
    },
  },
};
</script>
<style scoped>
#header {
  width: 100%;
  height: calc(100% - 76px);
}
.header {
  width: 100%;
  height: 205px;
  box-sizing: border-box;
  /* border: 1px solid #e5e5e5; */
  margin-bottom: 16px;
}
.headerTop { 
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
  height: calc(100% - 205px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footerBottom {
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
}
.footerBottom .el-button:last-child,.footerBottom .exportBtn {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:last-child:hover,.footerBottom .exportBtn:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:hover  {
  /* color: #C0C4CC !important; */
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
  height: 56px;
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
  height: calc(100% - 56px)!important;
}
</style>
