<template>
 <el-select class="getContractStatus" clearable v-model="contractStatus" size="small" placeholder>
   <el-option
     v-for="item in contractStatusOptions"
     :key="item.value"
     :label="item.label"
     :value="item.value"
   ></el-option>
 </el-select>
</template>

<script>
  export default{
    name:'getContractStatus',
   data() {
   	return {
      contractStatusOptions: [
        {
          value: "0",
          label: "待登记",
        },
        {
          value: "1",
          label: "正常进行中", 
        },
        {
          value: "2",
          label: "逾期待处理",
        },
        {
          value: "3",
          label: "逾期锁车",
        },
        {
          value: "4",
          label: "退车完结",
        },
      ], //合同状态
   		contractStatus:this.value,
   	}
   },
   props: {
    uncontain:{
      type:Array,
    },
   	value:{
   		type:[String,Number],
   		default(){
   			return ""
   		}
   	}
   },
   watch:{
   	value(val){
   		this.contractStatus=val
   	},
   	contractStatus(val){
   		this.$emit('input', val)
   	}
   },
   methods:{
     AarryContain(item){
       for(let val of this.uncontain){
         if(item.value==val||item.label==val){
           return true
         }
       }
       return false
     },
   },
   mounted() {
   	 if(this.uncontain){
       let lastdata=[]
       for(let item of this.contractStatusOptions){
         if(!this.AarryContain(item)){
           lastdata.push(item)
         }
       }
       this.contractStatusOptions=lastdata
     }
    }
  }
</script>

<style scoped>
 .getContractStatus{
   display: inline-block;
 }
</style>
