<template>
  <div class="mycenter" v-loading="isloading">
    <div class="container scoped">
      <div class="container-l">
         <div class="form2">
            <div class="item2">
              <label>所属公司</label>
              <span>{{datalist.enterpriseName}}</span>
            </div>
            <div class="item2">
              <label>品牌</label>
              <span>{{datalist.brandName}}</span>
            </div>
            <div class="item2">
              <label>车型</label>
              <span>{{datalist.typeName}}</span>
            </div>
            <div class="item2">
              <label>车牌号</label>
              <span>{{datalist.vehicleNo}}</span>
            </div>
            <div class="item2">
              <label>逾期状态</label>
              <span>{{datalist.contractStatusStr}}</span>
            </div>
            <div class="item2">
              <label>锁车原因</label>
              <span>{{datalist.applyReason}}</span>
            </div>
            <div class="item2">
              <label>申请材料</label>
              <div style="display: inline-block;">
                <div style="cursor: pointer;" title="点击查看"
                v-for="(item,index) in datalist.fileInfoVOS" :key="index" @click="preview(item)">
                  <span>{{item.efileName}}</span>
                </div>
              </div>
            </div>
            <div class="item2">
              <label>操作账号</label>
              <span>{{datalist.createdName}}</span>
            </div>
            <div class="item2">
              <label>操作时间</label>
              <span>{{datalist.createTimeStr}}</span>
            </div>
            <div class="item2">
              <label>操作类型</label>
              <span>{{datalist.operateTypeStr}}</span>&nbsp;&nbsp;
              <span>{{datalist.resultDataStr}}</span>
            </div>
         </div>
      </div>
    </div>
    <div class="showimage">
     <el-image ref="showimage" style="width: 0px; height: 0px" :src="currentimage"  :preview-src-list="srcList"></el-image>
    </div>
  </div>
</template>

<script>
  import { getCookie,formatJE,getMenuBtnList} from "@/public";
  import axios from 'axios';
  export default{
    name:'vehicleLockRecordDetail',
    data(){
      return {
          datalist:{
            enterpriseName:"",
            brandName:"",
            typeName:'',
            vehicleNo:"",
            contractStatusStr:'',
            applyReason:'',
            contractStatusStr:'',
            createdName:'',
            createTimeStr:'',
            fileInfoVOS:[]
          },
          isloading:false,
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
          currentimage:"",
          srcList:[]
      }
    },
    props:{
      id:{
        type:[String,Number],
        default(){
          return null
        }
      }
    },
    methods:{
      preview(item){
        console.log(item)
        this.currentimage=item.efileAddr
        this.$refs.showimage.$el.children[0].click()
      },
      getdata(){
        axios({
          method:'get',
          url:"/vehicle-service/vehicleLockRecord/vehicleLockRecordDetail?id="+this.id,
          headers:this.headers
        })
        .then((respone)=>{
          if(respone.data.status==0){
              setTimeout(() => {
            window.onload()
          }, 10)
            this.datalist=respone.data.data
            if(this.datalist.fileInfoVOS){
              this.currentimage=this.datalist.fileInfoVOS[0].efileAddr
              this.srcList=this.datalist.fileInfoVOS.map((item)=>{
                return item.efileAddr
              })
            }

          }
          else{
            this.$message.error("获取详情数据失败，请稍后再试")
          }
          this.isloading=false;
        })
        .catch(()=>{
          this.$message.info("服务器繁忙，请稍后再试")
          this.isloading=false;
        })
      }
    },
    mounted(){
      this.getdata()
    },
    computed: {
    },
    watch:{
      id(){
          this.getdata()
      }
    }
  }
</script>

<style scoped>
  .showimage{
    position: absolute;
    top: 0;
    text-align: center;
  }
  .currentimage{
    width: 100%;
  }
  .mycenter{
    font-size: 14px;
     border:1px solid #E5E5E5;
     padding-bottom: 0px;
     height: calc(100% - 97px);
     position: relative;
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
  .form,.form2{
    background-color: white;
    padding-bottom: 0px;
  }
  .form2{
        display: flex;
        flex-direction: column;
        padding: 20px;
  }
  .company{
    color: #169BD5;
    margin-left: 5px;
    border-left: 3px solid;
    padding-left: 10px;
  }
  .diliver{
     border: none;
     border-bottom:1px solid #E5E5E5;
  }
  .diliver2{
     margin: 0px 20px;
     margin-top: 1%;
     border-left: 1px solid #e5e5e5;
  }
  .item,.item2{
    display: flex;
  }
  .item > label,.item2>label{
    padding: 5px 10px;
    color: gray;
    text-align: right;
    display: inline-block;
    margin-right: 8px;
  }
  .item2>label{
      min-width: 60px;
      max-width: 60px;
  }
  .item> span,.item2>span{
    font-weight: 600;
    display: inline-block;
    line-height: 29px;
  }
  .item:last-child{
    margin-bottom: 0px;
  }
  .item2{
    margin-bottom: 10px;
  }
  /deep/ .item2 .el-input__inner{
    width: 215px!important;
  }
  .container{
    display: flex;
    justify-content: space-between;
  }
  .container-l{
    flex: 1;
  }
  .container-r{
    flex:1
  }
.zuofei{
        color: #409EFF!important;
        border-color: #c6e2ff!important;
        background-color: #ecf5ff!important;
  }
  .zuofei2{
        position: absolute;
        right: 20px;
        top: 18px;
        border: 1px solid gray;
        border-radius: 50%;
        height: 60px;
        width: 60px;
        line-height: 60px;
        text-align: center;
        transform: rotate(-21deg);
  }
</style>
