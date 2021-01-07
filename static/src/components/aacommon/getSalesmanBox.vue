<template>
  <el-select class="getSalesmanBox" clearable v-model="userId" size="small" placeholder>
    <el-option
      v-for="item in userIdOptions"
      :key="item.id"
      :label="item.salesmanName"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
  import axios from 'axios'
  import { getCookie} from "@/public";
  export default{
    name:'getSalesmanBox',
   data() {
   	return {
   		userId:this.value,
   		userIdOptions: [],
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
   			return ""
   		}
   	}
   },
   watch:{
   	value(val){
   		this.userId=val
   	},
   	userId(val){
   		this.$emit('input', val)
   	}
   },
   mounted() {
   	axios({ method: "get", url: "/vehicle-service/comboBoxController/getSalesmanBox", headers: this.headers})
   	  .then((result) => {
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
  }
  }
</script>

<style scoped>
 .getSalesmanBox{
   display: inline-block;
 }
</style>
