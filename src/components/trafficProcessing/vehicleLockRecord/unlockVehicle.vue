<template>
  <div class="mycenter" v-loading="isloading">
    <div class="container scoped">
      <div class="container-l">
         <div class="form2">
            <div class="item2">
              <label>所属公司</label>
              <span>{{vehicles.enterpriseName}}</span>
            </div>
            <div class="item2">
              <label>品牌</label>
              <span>{{vehicles.brandName}}</span>
            </div>
            <div class="item2">
              <label>车型</label>
              <span>{{vehicles.typeName}}</span>
            </div>
            <div class="item2">
              <label>车牌号</label>
              <span>{{vehicles.vehicleNo}}</span>
            </div>
            <div class="item2">
              <label>逾期状态</label>
              <span>{{vehicles.contractStatusStr}}</span>
            </div>
            <div class="item2">
              <label>解锁原因</label>
              <el-input ref="textarea1" v-model="textarea" type="textarea" :rows="3" :placeholder="reason"></el-input>
            </div>
            <div class="item2">
              <label>解锁材料</label>
              <el-upload
                class="upload-demo"
                action="/vehicle-service/efileInfo/uploadLeaseContractFile?fileType=13"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="5"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :on-success="handleSuccess"
                accept="image/png, image/jpeg">
                <a href="javascript:;" style="text-decoration: none;color:#409EFF">点击上传</a>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div> -->
              </el-upload>
            </div>
            <div class="item2" style="justify-content: center;">
              <el-button type="primary" v-if="btn1" @click="jiesuo" :disabled="disabled">解锁</el-button>
            </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getCookie,formatJE,getMenuBtnList} from "@/public";
  import axios from 'axios';
  export default{
    name:'unlockVehicle',
    data(){
      return {
          reason:"",
          isloading:false,
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
          btn1:false,
          textarea:"",
          fileList:[],
          fileListids:[],
          disabled:false
      }
    },
    props:{
      vehicles:{
        type:Object,
        default(){
          return null
        }
      },
      remark:{
        type:String,
        default(){
          return ""
        }
      }
    },
    methods:{
      deletefile(uid){
        for(let i=0;i<this.fileListids.length;++i){
          if(this.fileListids[i].uid==uid){
            this.fileListids.splice(i,1)
          }
        }
      },
      handleSuccess(response, file, fileList){
       if(response.status==0){
         this.fileListids.push({uid:file.uid,id:response.data.id})
       }
       else{
         this.$message.error("上传失败"+response.message)
         this.deletefile(file.uid)
       }
      },
      handleRemove(file, fileList) {
         this.deletefile(file.uid)
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，
        共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      jiesuo(){
        if(!this.textarea){
          this.$message.info("请填写解锁原因")
          this.$refs.textarea1.focus()
          return
        }
           this.$confirm('确定发送解锁指令吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.isloading=true
              this.disabled=true
              this.vehicles.applyReason=this.textarea
              this.vehicles.fileIdList=this.fileListids.map((item)=>{
                return item.id
              })
              this.vehicles.operateType=2
              this.vehicles.vehicleId=this.vehicles.id
              axios({
                method:'post',
                url:"/vehicle-service/vehicleLock/vehicleLock",
                data:this.vehicles,
                headers:this.headers
              })
              .then((respone)=>{
                if(respone.data&&respone.data.status==0){
                  this.$message.success("已发送解锁指令")
                  this.btn1=false
                  this.$emit("callback")
                }
                else{
                  this.$message.error("发送解锁指令失败，请稍后再试")
                  this.disabled=false
                }
                this.isloading=false;
              })
              .catch(()=>{
                this.$message.info("服务器繁忙，请稍后再试")
                this.isloading=false;
                  this.disabled=false
              })
            }).catch(() => {
              console.log("用户已取消发送解锁")
            });
      }
    },
    mounted(){

    },
    computed: {
      menuDataList() {
        return this.$store.state.menuData;
      },
    },
    watch:{
      menuDataList:{
        handler(data){
            let btns = getMenuBtnList(data,"/vehicleLockPageList")
            btns.map(item=>{
              if(item.name == '解锁') this.btn1 = true
            })
        },
        immediate:true,
        deep:true
      },
      remark(){
        this.reason=`请输入${this.remark}原因`
      }
    }
  }
</script>

<style scoped>
  .mycenter{
    font-size: 14px;
     border:1px solid #E5E5E5;
     padding-bottom: 0px;
     height: calc(100% - 97px);
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
