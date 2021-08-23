<template>
  <div class="mycenter" v-loading="isloading">
    <div class="container scoped">
      <div class="container-l">
         <div class="form2">
            <div class="item2">
              <label>原车牌号</label>
              <span>{{vehicle.vehicleNo}}</span>
            </div>
            <div class="item2">
              <label><span style="color: red;">*</span>新车牌号</label>
              <el-input v-model="vehicle.newVehicleNo" ref="newVehicleNo"></el-input>
            </div>
            <div class="item2">
              <label><span style="color: red;">*</span>变更日期</label>
              <el-date-picker
                v-model="vehicle.vehicleNoChangeDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="item2">
              <label><span style="color: red;">*</span>变更原因</label>
              <el-input ref="vehicleNoChangeReason" v-model="vehicle.vehicleNoChangeReason"
              type="textarea" :rows="3" placeholder="请输入变更原因"></el-input>
            </div>
            <div class="item2" style="justify-content: center;">
              <el-button type="primary" v-if="btn1" @click="onchange" :disabled="disabled">{{tijiao}}</el-button>
            </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getCookie,getMenuBtnList} from "@/public";
  import axios from 'axios';
  export default{
    name:'changeVehicleNo',
    data(){
      return {
          tijiao:'保存',
          isloading:false,
          headers: {
            Authorization: getCookie("HTBD_PASS"),
            language: this.$store.state.language,
          },
           vehicle:{
              "newVehicleNo": "",
              "vehicleId": this.id,
              "vehicleNo": this.vehicleno,
              "vehicleNoChangeDate": "",
              "vehicleNoChangeReason": ""
          },
          btn1:false,
          disabled:false
      }
    },
    props:{
      id:{
        type:[String,Number],
        default(){
          return ""
        }
      },
      vehicleno:{
        type:String,
        default(){
          return ""
        }
      }
    },
    methods:{
      onchange(){
        if(!this.vehicle.newVehicleNo){
          this.$message.info("请填新车牌号")
          this.$refs.newVehicleNo.focus()
          return
        }
        if(!this.vehicle.vehicleNoChangeDate){
          this.$message.info("请填变更日期")
          return
        }
        if(!this.vehicle.vehicleNoChangeReason){
          this.$message.info("请填变更原因")
          this.$refs.vehicleNoChangeReason.focus()
          return
        }
           this.$confirm('确定变更车牌号吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.isloading=true
              this.disabled=true
              this.tijiao='正在保存..'
              axios({
                method:'post',
                url:"/vehicle-service/vehicleInfo/vehicleNoChange",
                data:this.vehicle,
                headers:this.headers
              })
              .then((respone)=>{
                if(respone.data&&respone.data.status==0){
                  this.$message.success("保存成功")
                  this.$emit("callback",this.vehicle.newVehicleNo)
                }
                else{
                  this.$message.error(respone.data.message)
                  this.disabled=false
                  this.tijiao='保存'
                }
                this.isloading=false;
              })
              .catch(()=>{
                this.$message.info("服务器繁忙，请稍后再试")
                this.isloading=false;
                this.disabled=false
                this.tijiao='保存'
              })
            }).catch(() => {
              console.log("用户已取消发送锁车")
            });
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
      },
    },
    watch:{
      menuDataList:{
        handler(data){
            let btns = getMenuBtnList(data,"/vehicleManagement")
            btns.map(item=>{
              if(item.name == '换牌') this.btn1 = true
            })
        },
        immediate:true,
        deep:true
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
      min-width: 80px;
      max-width: 80px;
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
