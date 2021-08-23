<template>
  <el-select class="getvehicleType" :clearable="clearable" v-model="vehicleTypeID" size="small" placeholder>
    <el-option
      v-for="item in vehicleTypeNameOptions"
      :key="item.id"
      :label="item.vehicleTypeName"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
  import axios from 'axios'
  import { getCookie} from "@/public";
  export default{
    name:'getvehicleType',
   data() {
   	return {
   		vehicleTypeID:this.value?Number(this.value):this.value,
   		vehicleTypeNameOptions: [],
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
   	}
   },
   props: {
    brandId:{
      type:[String,Number],
      default(){
        return null
      }
    },
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
   		this.vehicleTypeID=val
   	},
   	vehicleTypeID(val){
   		this.$emit('input', val)
   	},
    brandId(){
      axios({ method: "get", url: `/vehicle-service/vehicleTypeInfo/queryVehicleTypeListByBrandId?id=${this.brandId}`,
      headers: this.headers})
        .then((result) => {
          this.vehicleTypeNameOptions = result.data.data;
          this.vehicleTypeID=""
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err.data.message,
            center: true,
            type: "error",
          });
        });
    }
   }
  }
</script>

<style scoped>
 .getvehicleType{
   display: inline-block;
 }
</style>
