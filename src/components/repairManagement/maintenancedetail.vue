<template>
  <div class="mycenter">
    <div class="center">维修管理-查看</div>
    <div class="container scoped">
        <div class="item" style="margin-bottom: 40px;">
          <label style="font-size: 21px;margin-right: 18px;">车牌号码</label>
          <el-input v-model="data.repairManagement.vehicleNo" :disabled="true" style="width: 200px;"></el-input>
        </div>
        <div class="item">
          <div class="itemtitle">车辆信息</div>
          <div class="itemcontant">
              <div class="itemitem">
                <div class="itemitem-1">合同编号</div>
                <div class="itemitem-r">
                  <el-input v-model="data.queryContractInfoByVehicleIdVO.contractCode" :disabled="true"></el-input>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">所属业务员</div>
                <div class="itemitem-r">
                  <el-input v-model="data.queryContractInfoByVehicleIdVO.contacts" :disabled="true"></el-input>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">保单编号</div>
                <div class="itemitem-r">
                  <el-input v-model="data.queryContractInfoByVehicleIdVO.policyNo" :disabled="true"></el-input>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">客户联系人</div>
                <div class="itemitem-r">
                  <el-input v-model="data.queryContractInfoByVehicleIdVO.contacts" :disabled="true"></el-input>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">联系人电话</div>
                <div class="itemitem-r">
                  <el-input v-model="data.queryContractInfoByVehicleIdVO.contactNumber" :disabled="true"></el-input>
                </div>
              </div>
          </div>
        </div>
        <div class="item">
          <div class="itemtitle">维修信息</div>
          <div class="itemcontant">
              <div class="itemitem">
                <div class="itemitem-1"><span class="redstar">*</span>维修时间</div>
                <div class="itemitem-r">
                  <el-date-picker style="width:200px"
                        v-model="data.repairManagement.repairTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期" :disabled="true">
                      </el-date-picker>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">故障编码</div>
                <div class="itemitem-r">
                  <el-input v-model="data.repairManagement.errorCode" :disabled="true"></el-input>
                </div>
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1"><span class="redstar">*</span>维修时里程</div>
                <div class="itemitem-r" >
                  <el-input v-model="data.repairManagement.repairMileage" :disabled="true"></el-input>
                </div> km
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1">维修厂名称</div>
                <div class="itemitem-r">
                  <el-input v-model="data.repairManagement.repairer" :disabled="true"></el-input>
                </div>
              </div>
              <br>
              <div class="itemitem2">
                <div class="itemitem-1" style="width: 146px;">常规维修</div>
                <div class="itemitem-r2">
                  <div class="itemcontant2">
                    <div class="itemitem" style="width: 250px;" v-for="item in changguiitems" :key="item.type">
                      <div class="itemitem-1 itemitem-12">
                         <el-checkbox v-model="item.checked" ref='changguiitems' :disabled="true">{{item.name}}</el-checkbox>
                      </div>
                      <div class="itemitem-r itemitem-r3">
                        <div :class="item.checked?'itemitem-r3-v4':'itemitem-r3-v'">
                          <el-input  style="width: 100px;" v-model="item.count" :disabled="true"></el-input> 元
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="itemitem2">
                <div class="itemitem-1" style="width: 170px;">其他维修</div>
                <div class="itemitem-r2">
                  <div class="itemcontant2">
                    <div class="itemitem"  style="width: 250px;" v-for="item in qitaweixiuitems" :key="item.type">
                      <div class="itemitem-1 itemitem-12">
                        <el-checkbox v-model="item.checked" :disabled="true">{{item.name}}</el-checkbox>
                      </div>
                      <div class="itemitem-r itemitem-r3">
                         <div :class="item.checked?'itemitem-r3-v4':'itemitem-r3-v'">
                          <el-input   style="width: 100px;" v-model="item.count" :disabled="true"></el-input> 元
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="itemitem2">
                <div class="itemitem-1" style="width:79px">自定义<br>维修项目</div>
                <div class="itemitem-r2">
                  <div class="itemcontant2">
                    <div class="itemitem-14">
                        <div class="zidingyiitem" v-for="(item,index) in zidingyiitems" :key="item.id">
                          <el-input v-model="item.name" :disabled="true"></el-input>
                          <el-input class="last-child" v-model="item.count" :disabled="true"></el-input> 元
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="item">
          <div class="itemcontant">
              <div class="itemitem">
                <div class="itemitem-1" style="text-align:right;width: 90px;">费用合计</div>
                <div class="itemitem-r">
                  <el-input v-model="data.repairManagement.totalFee" :disabled="true"
                   style="width:150px;margin-right:5px;"></el-input>元
                </div>
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1" style="text-align:right;width: 90px;">实际支付费用</div>
                <div class="itemitem-r">
                  <el-input v-model="data.repairManagement.payFee" :disabled="true"
                   style="width:150px;margin-right:5px"></el-input>元
                </div>
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1" style="text-align:right;width: 90px;vertical-align: top;">备注</div>
                <div class="itemitem-r">
                  <el-input v-model="data.repairManagement.remark"  type="textarea" :disabled="true"
                  placeholder="" style="width:500px" :autosize="true"></el-input>
                </div>
              </div>
              <br>
              <div class="itemitem" style="margin-bottom: 25px;">
                <div class="itemitem-1" style="text-align:right;width: 90px;vertical-align: top;">照片</div>
                <div class="itemitem-r">
                  <el-upload action="" :on-preview="handlePreview" :file-list="fileList"
                    :before-remove="handleRemove" list-type="picture"  >
                  </el-upload>
                </div>
              </div>
          </div>
        </div>
        <div class="item">
          <div class="itemtitle">核实状态</div>
          <div class="itemcontant">
            <div class="itemitem">
              <div class="itemitem-1">核实结果</div>
              <div class="itemitem-r">
                <el-input v-model="data.repairManagement.auditStatusStr" :disabled="true"></el-input>
              </div>
            </div>
            <br>
            <div class="itemitem">
              <div class="itemitem-1">核实意见</div>
              <div class="itemitem-r">
               <el-input v-model="data.repairManagement.auditSuggestion"  type="textarea" :disabled="true"
                style="width:500px" :autosize="true"></el-input>
              </div>
            </div>
            <br>
            <div class="itemitem" style="margin-bottom: 25px;margin-top: 25px;display: block;">
              <div style="width: 100%;text-align: center;">
                <el-button @click="cancel()">返回</el-button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- 图片放大弹窗 -->
    <el-dialog class="imgSrc" :visible.sync="dialogVisible" width="500px">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import { getCookie,formatJE,getMenuBtnList,newGuid} from "@/public";
  import axios from 'axios';
  export default{
    name:'maintenancedetail',
    data(){
      return {
          //常规维修(0-无 1-补胎 2-换胎 3-检查轮胎 4-轮胎拆装 5-钣金喷漆 6-换保险杠)
          changguiitems:[
            {checked:false,type:1,name:'补胎',count:null},
            {checked:false,type:2,name:'换胎',count:null},
            {checked:false,type:3,name:'检查轮胎',count:null},
            {checked:false,type:4,name:'轮胎拆装',count:null},
            {checked:false,type:5,name:'钣金喷漆',count:null},
            {checked:false,type:6,name:'换保险杠',count:null}
          ],
          //其他维修(0-无 1-修门窗锁 2-更换大灯 3-更换刹车片 4-更换刹车盘 5-调整更换后视镜 6-修换发动机 7-更换电瓶)
          qitaweixiuitems:[
            {checked:false,type:1,name:'修门窗锁',count:null},
            {checked:false,type:2,name:'更换大灯',count:null},
            {checked:false,type:3,name:'更换刹车片',count:null},
            {checked:false,type:4,name:'更换刹车盘',count:null},
            {checked:false,type:5,name:'调整更换后视镜',count:null},
            {checked:false,type:6,name:'修换发动机',count:null},
            {checked:false,type:7,name:'更换电瓶',count:null}
          ],
          zidingyiitems:[],
          btn1:false,
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
          data:{
             adds:[],
             queryContractInfoByVehicleIdVO:{},
             repairManagement:{},
             repairManagementCustomrepairList:[],
             repairManagementDetailList:[],
             repairManagementOtherrepairList:[]
          },
          vehicledata:[],
          fileList:[],
          indexkey:-1,
          dialogImageUrl:'',
          dialogVisible:false
      }
    },
    methods:{
      handleRemove(){
        return false
      },
      // 点击放大图片
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      cancel(){
        this.$router.back()
      },
    },
    mounted(){
      this.$axios.get(`/vehicle-service/repairManagement/queryRepairRecord?id=${this.$route.query.id}`,{headers:this.headers})
      .then((res)=>{
          setTimeout(() => {
            window.onload()
          }, 10)
        let data=res.data.data
        if(data){
          if(data.queryContractInfoByVehicleIdVO){
            this.data.queryContractInfoByVehicleIdVO=data.queryContractInfoByVehicleIdVO
          }
          if(data.repairManagement){
            this.data.repairManagement=data.repairManagement
            data.repairManagement.totalFee=formatJE(data.repairManagement.totalFee)
            data.repairManagement.payFee=formatJE(data.repairManagement.payFee)
            if(data.repairManagement.auditStatus==0){
              data.repairManagement.auditStatusStr='待核实'
            }
            else if(data.repairManagement.auditStatus==1){
              data.repairManagement.auditStatusStr='核实通过'
            }
            else{
              data.repairManagement.auditStatusStr='核实未通过'
            }
          }
          if(data.repairManagementCustomrepairList){
            let datarry = this.data.repairManagementCustomrepairList=data.repairManagementCustomrepairList
            let citems=null
            for(let item of datarry){
              this.zidingyiitems.push({name:item.customRepair,count:formatJE(item.customRepairCost),id:newGuid(6)})
            }
          }
          if(data.repairManagementDetailList){
            let datarry = this.data.repairManagementDetailList=data.repairManagementDetailList
            let citems=null
            for(let item of datarry){
              citems=this.changguiitems[item.commonRepair-1]
              if(item.commonRepairCost&&item.commonRepairCost>0)
              {
                citems.count=formatJE(item.commonRepairCost)
                 citems.checked=true
              }
            }
          }
          if(data.repairManagementOtherrepairList){
            let datarry = this.data.repairManagementOtherrepairList=data.repairManagementOtherrepairList
            let citems=null
            for(let item of datarry){
              citems=this.qitaweixiuitems[item.otherRepair-1]
              if(item.otherRepairCost&&item.otherRepairCost>0)
              {
                 citems.count=formatJE(item.otherRepairCost)
                 citems.checked=true
              }
            }
          }
          if(data.adds){
            data.adds.map((item)=>{
              this.fileList.push({name:item.efileName,url:item.url})
            })
          }
        }
        else{
          this.$message.error('暂无数据！')
        }
      })
      .catch((err)=>{
        this.$message.error(err.message)
      })
    },
    computed: {
      menuDataList() {
        return this.$store.state.menuData;
      }
    },
    watch:{
      '$route'(to, from){ this.$router.go(0);  },
      menuDataList:{  }
    }
  }
</script>

<style scoped>
  .del{
    font-size: 18px;
    font-weight: 600;
    color: red;
    text-decoration: none;
    vertical-align: middle;
    margin-left: 10px;
  }
  .zidingyiitem{
    margin: 10px 20px;
    animation-name: zidingyiitem;
    animation-duration: .5s;
  }
  .zidingyiitem2{
    margin: 10px 20px;
    animation-name: zidingyiitem2;
    animation-duration: .5s;
    margin-left: -600px;
  }
  @keyframes zidingyiitem{
    from{margin-left: -600px;}
    to{margin-left: 20px;}
  }
  @keyframes zidingyiitem2{
    from{margin-left: 20px;}
    to{margin-left: -600px;}
  }
  .zidingyiitem .el-input,.zidingyiitem2 .el-input{
    width: 250px;
  }
  .zidingyiitem  .last-child,.zidingyiitem2  .last-child{
    width: 100px!important;
  }
  .addnew{
        width: 90px;
        margin: 20px;
        border: 1px solid #40aaff;
        padding: 5px 8px;
        border-radius: 5px;
        cursor: pointer;
  }
  .itemitem-14{
    min-height: 100px;
    overflow: hidden;
    transition:height .6s,
  }
   .itemitem-r3{
     vertical-align: middle;
     overflow: hidden;
     width: 125px;
   }
   .itemitem-r3-v{
     margin-left: -100px;
     animation-name: r3;
     animation-duration: .4s;
   }
   .itemitem-r3-v4{
     margin-left: 0px;
     animation-name: r4;
     animation-duration: .4s;
   }
   @keyframes r3{
     from{margin-left: 0px;}
     to{margin-left: -100px;}
   }
   @keyframes r4{
     from{margin-left: -100px;}
     to{margin-left: 0px}
   }

  .itemitem-r3 .el-input{
    width: 80px;
  }
  .itemitem-r2{
    display: inline-block;
    flex-grow: 1;
  }
  .itemitem-r{
    display: inline-block;
  }
  .itemitem-1{
    display: inline-block;
    text-align: left;
    width: 80px;
  }
  .itemitem-12{
    width: 120px;
  }
  .itemitem{
    padding: 10px 20px;
    display: inline-block;
  }
  .itemitem2{
    padding: 10px 20px;
    display: flex;
  }
  .itemcontant{
    margin-top: 20px;
   border: 1px solid #d3d3d3!important;
    width: calc(100% - 80px);
  }
  .itemcontant2{
     border: 1px solid #E5E5E5!important;
      width: 100%;
      margin-left: 5px;
  }
  .mycenter{
    font-size: 14px;
     border:1px solid #E5E5E5;
     padding-bottom: 0px;
     height: calc(100% - 65px);
     overflow: auto;
  }
  .center{
        color: #333333;
        font-family: Microsoft YaHei;
        font-size: 18px;
        line-height: 40px;
        letter-spacing: 0.2px;
        text-align: left;
        height: 40px;
        background-color: rgba(245, 247, 250, 1);
        padding: 0px 20px;
  }
  .item{
    margin:20px 20px;
  }
  .redstar{
    color: red;
  }
  .itemtitle{
    font-size: 18px;
    font-weight: 600;
  }
  .imgSrc >>> .el-dialog__body {
    padding: 0;
  }
  .imgSrc >>> .el-dialog__header {
    padding: 0;
  }
  .imgSrc >>> .el-dialog__headerbtn {
    top: -11px;
    right: -15px;
    color: #fff;
    opacity: 1;
  }
  /deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
      border-color: #606266;
  }
  /deep/ .el-checkbox__input.is-disabled+span.el-checkbox__label {
    color: #606266;
    cursor: not-allowed;
}
/deep/ .el-icon-close{
  display: none!important;
}
</style>
