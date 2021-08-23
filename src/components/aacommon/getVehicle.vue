<template>
  <el-select class="getBrandInfo" :clearable="clearable" v-model="id" size="small" placeholder='请选择' @change="changeval">
    <el-option v-for="item in data" :key="item.vehicleId" :label="item.vehicleNo" :value="item.vehicleId"></el-option>
  </el-select>
</template>

<script>
  import axios from 'axios'
  import { getCookie} from "@/public";
  export default{
    name:'getVehicle',
   data() {
   	return {
   		id:this.value?Number(this.value):this.value,
   		data: [],
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
   	}
   },
   props: {
   	value:{
   		type:[String,Number],
   		default(){
   			return null
   		}
   	},
    clearable:{
      type:[Boolean],
      default(){
        return true
      }
    }
   },
   watch:{
   	value(val){
   		this.id=val
   	},
   	id(val){
   		this.$emit('input', val)
   	}
   },
   methods:{
     changeval(val){
       for(let item of this.data){
         if(item.vehicleId==val){
           this.$emit('onchange',item);
         }
       }
       
     }
   },
   mounted() {
   	axios({ method: "get", url: "/vehicle-service/vehicleInfo/currentEnterAndChildrenEnterVehicleInfo",
    headers: this.headers})
   	  .then((result) => {
   	    this.data = result.data.data;
   	  })
   	  .catch((err) => {
   	    console.error(err);
   	    this.$message({
   	      message: err.response.data.message,
   	      center: true,
   	      type: "error",
   	    });
   	  });
  }
  }
</script>

<style scoped>
 .getBrandInfo{
   display: inline-block;
 }
</style>
