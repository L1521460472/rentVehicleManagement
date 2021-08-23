<template>
  <div class="mycenter">
    <div class="center">新增保养管理</div>
    <div class="container scoped">
        <div class="item" style="margin-bottom: 40px;">
          <label style="font-size: 21px;"><span class="redstar">*</span>车牌号码</label>
          <getVehicle v-model='adddata.vehicleId' @onchange='gethetonginfo' :clearable="false"></getVehicle>
        </div>
        <div class="item">
          <div class="itemtitle">车辆信息</div>
          <div class="itemcontant">
              <div class="itemitem">
                <div class="itemitem-1">合同编号</div>
                <div class="itemitem-r">
                  <el-input v-model="hetonginfo.contractCode" :disabled="true"></el-input>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">所属业务员</div>
                <div class="itemitem-r">
                  <el-input v-model="hetonginfo.contacts" :disabled="true"></el-input>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">保单编号</div>
                <div class="itemitem-r">
                  <el-input v-model="hetonginfo.policyNo" :disabled="true"></el-input>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">客户联系人</div>
                <div class="itemitem-r">
                  <el-input v-model="hetonginfo.contacts" :disabled="true"></el-input>
                </div>
              </div>
              <div class="itemitem">
                <div class="itemitem-1">联系人电话</div>
                <div class="itemitem-r">
                  <el-input v-model="hetonginfo.contactNumber" :disabled="true"></el-input>
                </div>
              </div>
          </div>
        </div>
        <div class="item">
          <div class="itemtitle">保养信息</div>
          <div class="itemcontant">
              <div class="itemitem">
                <div class="itemitem-1"><span class="redstar">*</span>保养时间</div>
                <div class="itemitem-r">
                  <el-date-picker style="width:200px"
                      v-model="adddata.maintainTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1"><span class="redstar">*</span>保养时里程</div>
                <div class="itemitem-r" >
                  <el-input v-model="adddata.maintainMileage"></el-input>
                </div> km
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1">维修厂名称</div>
                <div class="itemitem-r">
                  <el-input v-model="adddata.repairer"></el-input>
                </div>
              </div>
              <div class="itemitem2">
                <div class="itemitem-1" >基础维护</div>
                <div class="itemitem-r2">
                  <div class="itemcontant2">
                    <div class="itemitem" style="width: 250px;" v-for="item in changguiitems" :key="item.type">
                      <div class="itemitem-1 itemitem-12">
                         <el-checkbox v-model="item.checked" @change="showorhidden">{{item.name}}</el-checkbox>
                      </div>
                      <div class="itemitem-r itemitem-r3">
                        <div class="itemitem-r3-v">
                          <el-input style="width: 100px;" v-model="item.count" @change='checkmoney(item,"count")'></el-input> 元
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="itemitem2">
                <div class="itemitem-1" >深度维护</div>
                <div class="itemitem-r2">
                  <div class="itemcontant2">
                    <div class="itemitem"  style="width: 250px;" v-for="item in qitaweixiuitems" :key="item.type">
                      <div class="itemitem-1 itemitem-12">
                        <el-checkbox v-model="item.checked" @change="showorhidden">{{item.name}}</el-checkbox>
                      </div>
                      <div class="itemitem-r itemitem-r3">
                        <div class="itemitem-r3-v">
                          <el-input  style="width: 100px;" v-model="item.count" @change='checkmoney(item,"count")'></el-input> 元
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="itemitem2">
                <div class="itemitem-1" >清洁保养</div>
                <div class="itemitem-r2">
                  <div class="itemcontant2">
                    <div class="itemitem"  style="width: 250px;" v-for="item in cleanList" :key="item.type">
                      <div class="itemitem-1 itemitem-12">
                        <el-checkbox v-model="item.checked" @change="showorhidden">{{item.name}}</el-checkbox>
                      </div>
                      <div class="itemitem-r itemitem-r3">
                        <div class="itemitem-r3-v">
                          <el-input  style="width: 100px;" v-model="item.count" @change='checkmoney(item,"count")'></el-input> 元
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
                          <el-input v-model="item.name" placeholder="请输入维修项目"></el-input>
                          <el-input class="last-child" v-model="item.count" placeholder="请输入费用"
                           @change='checkmoney(item,"count")'></el-input> 元
                          <a class="del" href="javascript:;" title="删除当前行" @click="closeitem(item,$event)">X</a>
                        </div>
                    </div>
                    <div class="addnew" @click="addnewitem"><i class="iconfont icon-add"></i>添加新项目</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="item">
          <div class="itemcontant">
              <div class="itemitem">
                <div class="itemitem-1" style="text-align:right;width: 110px;">费用合计</div>
                <div class="itemitem-r">
                  <el-input v-model="adddata.totalFee" :disabled="true"
                  placeholder="自动计算总花费" style="width:200px;margin-right:5px;"></el-input>元
                </div>
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1" style="text-align:right;width: 110px;">实际支付费用</div>
                <div class="itemitem-r">
                  <el-input v-model="adddata.payFee" @change="checkmoney(adddata,'payFee')"
                  placeholder="请输入实际支付费用" style="width:200px;margin-right:5px"></el-input>元
                </div>
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1" style="text-align:right;width: 110px;"><span class="redstar">*</span>下次保养日期</div>
                <div class="itemitem-r">
                  <el-date-picker style="width:200px"
                      v-model="adddata.nextMaintainTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1" style="text-align:right;width: 110px;"><span class="redstar">*</span>下次保养时里程</div>
                <div class="itemitem-r">
                  <el-input v-model="adddata.nextMaintainMileage"  style="width:200px;margin-right:5px"></el-input>km
                </div>
              </div>
              <br>
              <div class="itemitem">
                <div class="itemitem-1" style="text-align:right;width: 110px;vertical-align: top;">备注</div>
                <div class="itemitem-r">
                  <el-input
                    type="textarea"
                    style="width:500px"
                    placeholder="请输入备注（100字以内）"
                    maxlength="100"
                    :autosize="{ minRows: 4, maxRows: 6 }"
                    show-word-limit
                    v-model="adddata.remark"
                  ></el-input>
                </div>
              </div>
              <br>
              <div class="itemitem" style="margin-bottom: 25px;">
                <div class="itemitem-1" style="text-align:right;width: 110px;vertical-align: top;">照片</div>
                <div class="itemitem-r">
                  <el-upload
                    action="/vehicle-service/efileInfo/uploadImgFile?fileType=8"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture"
                    :headers="headers"
                    :on-success="handleUploadSuccess">
                    <el-button size="small" type="primary">点击上传相关凭证</el-button>
                  </el-upload>
                </div>
              </div>
              <br>
              <div class="itemitem" style="margin-bottom: 25px;display: block;">
                <div style="width: 100%;text-align: center;">
                  <el-button type="primary" @click="submmit()"  :disabled="cantijiao">确认</el-button>
                  <el-button @click="cancel()">取消</el-button>
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
    name:'addUpkeep',
    data(){
      return {
          //合同信息
          hetonginfo:{
            "contactNumber": "",
            "contacts": "",
            "contractCode": "",
            "policyNo": "",
            "userId": null,
            "userName": ""
          },
          //常规维修(0-无 1-补胎 2-换胎 3-检查轮胎 4-轮胎拆装 5-钣金喷漆 6-换保险杠)
          changguiitems:[
            {checked:false,type:1,name:'发动机机油',count:null},
            {checked:false,type:2,name:'机油滤清器',count:null},
            {checked:false,type:3,name:'空气滤清器',count:null},
            {checked:false,type:4,name:'火花塞',count:null},
            {checked:false,type:5,name:'雨刷',count:null},
            {checked:false,type:6,name:'空调制冷液',count:null},
            {checked:false,type:7,name:'空调滤清器',count:null},
            {checked:false,type:8,name:'更换防冻液',count:null},
            {checked:false,type:9,name:'燃油滤清器',count:null},
            {checked:false,type:10,name:'Pm2.5滤芯',count:null},
            {checked:false,type:11,name:'玻璃水',count:null}
          ],
          //其他维修(0-无 1-修门窗锁 2-更换大灯 3-更换刹车片 4-更换刹车盘 5-调整更换后视镜 6-修换发动机 7-更换电瓶)
          qitaweixiuitems:[
            {checked:false,type:1,name:'刹车油',count:null},
            {checked:false,type:2,name:'刹车片',count:null},
            {checked:false,type:3,name:'刹车盘',count:null},
            {checked:false,type:4,name:'轮胎',count:null},
            {checked:false,type:5,name:'蓄电池',count:null},
            {checked:false,type:6,name:'大灯',count:null},
            {checked:false,type:7,name:'雾灯',count:null}
          ],
          cleanList:[
            {checked:false,type:1,name:'发动机清洗',count:null},
            {checked:false,type:2,name:'燃油系统养护',count:null},
            {checked:false,type:3,name:'刹车系统养护',count:null},
            {checked:false,type:4,name:'空调管路清洗',count:null},
            {checked:false,type:5,name:'冷却系统养护',count:null},
            {checked:false,type:6,name:'水箱清洗',count:null},
            {checked:false,type:7,name:'进气系统清洗',count:null},
            {checked:false,type:8,name:'三元催化清洗',count:null},
            {checked:false,type:9,name:'喷油嘴清洗',count:null},
            {checked:false,type:10,name:'底盘装甲',count:null},
            {checked:false,type:11,name:'润滑系统清洗',count:null},
            {checked:false,type:12,name:'节气门清洗',count:null},
          ],
          zidingyiitems:[],
          btn1:false,
          addurl:"/vehicle-service/maintainManagement/insertMaintain",
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
          adddata:{
            contractId:null,
            enterpriseId:null,
            ids:[],
            insertMaintainBasicsList: [],
            insertMaintainCustomList: [],
            insertMaintainDeepList: [],
            insertMaintainCleanList:[],
            maintainMileage: null,
            maintainTime: null,
            nextMaintainMileage: null,
            nextMaintainTime: null,
            payFee: 0,
            remark: null,
            repairer: null,
            totalFee: 0,
            vehicleId: null,
            vehicleNo: null
          },
          vehicledata:[],
          fileList:[],
          indexkey:-1,
          dialogImageUrl:'',
          dialogVisible:false,
          cantijiao:false
      }
    },
    methods:{
      // 点击放大图片
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUploadSuccess(response, file, fileList) {
        if(response.status == 0){
          this.adddata.ids.push(response.data.id);
        }else{
          this.$message.error({
            message:'附件上传失败，请上传png/jpg格式的图片',
            center:true
          })
        }
      },
      checkmoney(item,name){
        if(isNaN(item[name])){
          item[name]=null
          this.$message.info('请输入正确的数字！')
        }
        else{
          item[name]=Number(item[name]).toFixed(2)
        }
      },
      gethetonginfo(val){
        this.adddata.vehicleNo=val.vehicleNo
        this.adddata.enterpriseId = val.enterpriseId
        this.$axios.get(`/vehicle-service/leaseContractInfo/queryContractInfoByVehicleId?id=${val.vehicleId}`,{headers:this.headers})
        .then((res)=>{
          if(res.data.data){
            this.hetonginfo=res.data.data
            this.adddata.contractId=res.data.data.contractId

          }else{
            for(let name in this.hetonginfo){
              this.hetonginfo[name]=''
            }
            this.$message.info('该车没有合同信息！')
          }
        })
        .catch((err)=>{
          this.$message.error(err.message)
        })
      },
    showorhidden(flag,e){
        if(flag){
          e.target.parentNode.parentNode.parentNode.parentNode.childNodes[2].childNodes[0].className='itemitem-r3-v4'
        }
        else{
          e.target.parentNode.parentNode.parentNode.parentNode.childNodes[2].childNodes[0].className='itemitem-r3-v'
        }
    },
		closeitem(item,e){
        if(this.indexkey==-1){
          e.target.parentNode.className='zidingyiitem2'
          this.indexkey=setTimeout(()=>{
            let t=-1;
            for(let i=0;i<this.zidingyiitems.length;++i){
            	if(item.id==this.zidingyiitems[i].id){
            		 t=i;
                 break;
            	}
            }
            this.zidingyiitems.splice(t,1);
            this.indexkey=-1
          },600)
        }
		},
      addnewitem(){
        if(this.zidingyiitems.length<10){
          this.zidingyiitems.push({name:'',count:'',id:newGuid(6)})
        }
        else{
          this.$message.info('最多只能添加十条记录！')
        }
      },
      handleRemove(file, fileList) {
        let index = this.adddata.ids.indexOf(
          file.response ? file.response.data.id : file.id
        );
        this.adddata.ids.splice(index, 1);
      },
      submmit(){
        this.cantijiao=true//防止重复提交
        if(this.adddata.vehicleId){
          if(!this.adddata.maintainTime){
            this.$message.error('请填写保养时间！')
            this.cantijiao=false
            return
          }
          if(!this.adddata.maintainMileage){
            this.$message.error('请填写保养时里程！')
            this.cantijiao=false
            return
          }
          if(!(new RegExp("^[1-9][0-9]*$").test(this.adddata.maintainMileage))){
            this.$message.error('保养时里程为正整数！')
            this.cantijiao=false
            return
          }
          this.adddata.insertMaintainBasicsList=[] //基础维护
          this.adddata.insertMaintainCustomList=[] //自定义保养
          this.adddata.insertMaintainDeepList=[] //深度维护
          this.adddata.insertMaintainCleanList=[] //清洁保养
          for(let item of this.changguiitems){
            if(item.checked&&item.count){
               this.adddata.insertMaintainBasicsList.push({"basicsMaintain": item.type,"basicsMaintainCost": item.count})
            }
          }
          for(let item of this.qitaweixiuitems){
            if(item.checked&&item.count){
              this.adddata.insertMaintainDeepList.push({"deepMaintain": item.type,"deepMaintainCost": item.count})
            }
          }
          for(let item of this.cleanList){
            if(item.checked&&item.count){ 
              this.adddata.insertMaintainCleanList.push({"cleanMaintain": item.type,"cleanMaintainCost": item.count})
            }
          }
          for(let item of this.zidingyiitems){
            this.adddata.insertMaintainCustomList.push({"customMaintain": item.name,"customMaintainCost": item.count})
          }
          if(this.adddata.totalFee==0){
            this.$message.error('请添加保养项目！')
            this.cantijiao=false
            return
          }
          if(!this.adddata.nextMaintainTime){
            this.$message.error('请填写下次保养时间！')
            this.cantijiao=false
            return
          }
          if(!this.adddata.nextMaintainMileage){
            this.$message.error('请填写下次保养时里程！')
            this.cantijiao=false
            return
          }
          if(!(new RegExp("^[1-9][0-9]*$").test(this.adddata.nextMaintainMileage))){
            this.$message.error('下次保养时里程为正整数！')
            this.cantijiao=false
            return
          }
          if(new Date(this.adddata.maintainTime) >= new Date(this.adddata.nextMaintainTime)){
            this.$message.error('下次保养时间应大于保养时间！')
            this.cantijiao=false
            return
          }
          if(Number(this.adddata.maintainMileage) >= Number(this.adddata.nextMaintainMileage)){
            this.$message.error('下次保养时里程应大于保养时里程！')
            this.cantijiao=false
            return
          }
          axios({method:'post', url:this.addurl, data:this.adddata, headers:this.headers})
          .then((respone)=>{
            if(respone.data.status==0){
              this.$store.commit("changeIsStatus", true);
              this.$message.success("提交成功")
              this.cantijiao=false
              this.$router.back()
            }
            else{
              this.cantijiao=false
              this.$message.info(`提交失败，${respone.data.message}`)
            }
          })
          .catch(()=>{
            this.cantijiao=false
            this.$message.info("服务器繁忙，请稍后再试")
          })
        }
        else{
          this.cantijiao=false
          this.$message.error('请选择车辆！')
        }
      },
      cancel(){
        this.$router.back()
      },
      ontatol(){
        let total=0;
        for(let item of this.changguiitems){
            total+=Number(item.count)
        }
        for(let item of this.qitaweixiuitems){
            total+=Number(item.count)
        }
        for(let item of this.zidingyiitems){
            total+=Number(item.count)
        }
        for(let item of this.cleanList){
            total+=Number(item.count)
        }
        this.adddata.totalFee=total.toFixed(2)
      }
    },
    mounted(){
        setTimeout(() => {
            window.onload()
          }, 10)
    },
    computed: {
      menuDataList() {
        return this.$store.state.menuData;
      }
    },
    watch:{
      '$route'(to, from){ this.$router.go(0);  },
      menuDataList:{
        handler(data){
            let btns =  getMenuBtnList(data,"/upkeep")
            btns.map(item=>{
              if(item.name == '新增') this.btn1 = true
            })
        },
        immediate:true,
        deep:true
      },
      changguiitems:{
        handler(data){
          this.ontatol()
        },
        deep:true
      },
      qitaweixiuitems:{
        handler(data){
          this.ontatol()
        },
        deep:true
      },
      zidingyiitems:{
        handler(data){
          this.ontatol()
        },
        deep:true
      },
      cleanList:{
        handler(data){
          this.ontatol()
        },
        deep:true
      }
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
     margin-left: -150px;
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
    width: 100%;
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
</style>
