<template>
  <el-select class="getTianjiaren" :clearable="clearable" v-model="id" size="small" placeholder='请选择'>
    <el-option v-for="item in data" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
  </el-select>
</template>

<script>
  import axios from 'axios'
  import { getCookie} from "@/public";
  export default{
    name:'getTianjiaren',
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
     
   },
   mounted() {
   	axios({ method: "get", url: "/vehicle-service/repairManagement/queryUserInfo",
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
 .getTianjiaren{
   display: inline-block;
 }
</style>
