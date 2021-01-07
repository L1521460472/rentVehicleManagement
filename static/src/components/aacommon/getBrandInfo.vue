<template>
  <el-select class="getBrandInfo" :clearable="clearable" v-model="BrandInfoID" size="small" placeholder>
    <el-option
      v-for="item in BrandInfoOptions"
      :key="item.id"
      :label="item.brandName"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
  import axios from 'axios'
  import { getCookie} from "@/public";
  export default{
    name:'getBrandInfo',
   data() {
   	return {
   		BrandInfoID:this.value?Number(this.value):this.value,
   		BrandInfoOptions: [],
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
   		this.BrandInfoID=val
   	},
   	BrandInfoID(val){
   		this.$emit('input', val)
   	}
   },
   mounted() {
   	axios({ method: "post", url: "/vehicle-service/brandInfo/brandInfoListQuery", headers: this.headers})
   	  .then((result) => {
   	    this.BrandInfoOptions = result.data.data;
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
