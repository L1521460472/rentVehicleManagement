<template>
  <el-select class="getEnterpriseBox" :clearable="clearable" v-model="enterpriseid" size="small" placeholder>
    <el-option
      v-for="item in enterpriseidOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
  import axios from 'axios'
  import { getCookie} from "@/public";
  export default{
    name:'getEnterpriseBox',
   data() {
   	return {
   		enterpriseid:null,
   		enterpriseidOptions: [],
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
   		this.enterpriseid=val
   	},
   	enterpriseid(val){
   		this.$emit('input', val)
   	}
   },
   mounted() {
   	axios({ method: "get", url: "/vehicle-service/comboBoxController/getEnterpriseBox", headers: this.headers})
   	  .then((result) => {
   	    this.enterpriseidOptions = result.data.data;
        this.enterpriseid=this.value?Number(this.value):""
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
 .getEnterpriseBox{
   display: inline-block;
 }
</style>
