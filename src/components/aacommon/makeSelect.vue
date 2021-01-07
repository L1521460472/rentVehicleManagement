<template>
  <el-select class="makeSelect" :clearable="clearable" v-model="value2" placeholder="">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
  export default{
    name:'makeSelect',
    data(){
      return {
        value2:this.value
      }
    },
    props: {
      options: {
        type:Array,
        default(){
          return []
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
    		this.value2=val
    	},
    	value2(val){
    		this.$emit('input', val)
    	}
    }
  }
</script>

<style scoped>
 .makeSelect{
   display: inline-block;
 }
</style>
