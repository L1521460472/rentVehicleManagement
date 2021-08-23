<template>
  <div class="mycenter">
   <div class="center">更换主题</div>
   <div class="cardcontain">
     <div ref="default" class="card default" @click="changetheme('default')">默认主题</div>
     <div ref="dartgray" class="card dartgray" @click="changetheme('dartgray')">灰色主题</div>
     <div ref="dark" class="card dark" @click="changetheme('dark')">黑色主题</div>
     <div ref="bluegray" class="card bluegray" @click="changetheme('bluegray')">蓝色主题</div>
     <div ref="teal" class="card teal" @click="changetheme('teal')">蓝绿色主题</div>
     <div ref="seagreen" class="card seagreen" @click="changetheme('seagreen')">绿色主题</div>
     <div ref="slategrey" class="card slategrey" @click="changetheme('slategrey')">石板灰主题</div>
     <div ref="steelblue" class="card steelblue" @click="changetheme('steelblue')">钢蓝色主题</div>
   </div>
  </div>
</template>

<script>
  import {getCookie,setCookie,openNewTab} from '@/public.js'
  export default{
    name:'theme',
    data(){
      return {
        theme:"dartgray",
        checkedDom:''
      }
    },
    methods:{
      createElm(html){
        let elm=document.createElement('div')
        elm.innerHTML=html
        return elm.firstElementChild
      },
      setcurrentTheme(currenttheme,flag){
        let oldtheme=this.theme
        this.theme=currenttheme
        for(let item in this.$refs){
          if(item==oldtheme){
            if(this.$refs[oldtheme].firstElementChild){
              this.$refs[oldtheme].firstElementChild.remove()
            }
          }
          if(item==currenttheme){
            let elm=this.createElm('<div>当前</div>')
            this.$refs[item].appendChild(elm)
            elm.className="ischecked-onlytheme"
            if(flag){
              location.reload()
            }
          }
        }
      },
      changetheme(currenttheme){
        setCookie("theme",currenttheme,365)
        this.setcurrentTheme(currenttheme,true)
      }
    },
    mounted(){
        let currenttheme=getCookie("theme")
        this.theme=currenttheme
        this.setcurrentTheme(currenttheme)
        openNewTab(this,"更换主题",'/theme')
    }
  }
</script>

<style scoped>
 .mycenter{
   font-size: 14px;
    border:1px solid #E5E5E5;
    padding: 20px;
    padding-bottom: 20px;
    height: calc(100% - 107px);
 }
 .center{
       color: #333333;
       font-family: Microsoft YaHei;
       font-size: 18px;
       line-height: normal;
       letter-spacing: 0.2px;
       text-align: left;
       margin-left: 9px;
 }
 .cardcontain{
   display: flex;
 }
 .card{
   height: 35px;
   line-height: 35px;
   width: 146px;
   text-align: center;
   margin: 20px 20px 20px 0px;
   position: relative;
   overflow: hidden;
   cursor: pointer;
 }
 .default{
   background-color:#f5f7fa;
   border: 1px solid #EBEEF5;
 }
 .dartgray{
   background-color:#e8e8e8;
   border: 1px solid #d3d3d3;
 }
 .bluegray{
   background-color:#1890FF;
   border: 1px solid #d3d3d3;
   color: white;
 }
 .dark{
   background-color:#000000;
   border: 1px solid #d3d3d3;
   color: white;
 }
 .teal{
   background-color:teal;
   border: 1px solid teal;
   color: white;
 }
 .seagreen{
   background-color:seagreen;
   border: 1px solid seagreen;
   color: white;
 }
 .slategrey{
   background-color:slategrey;
   border: 1px solid slategrey;
   color: white;
 }
 .steelblue{
   background-color:steelblue;
   border: 1px solid steelblue;
   color: white;
 }
</style>
<style>
  .ischecked-onlytheme{
     position: absolute;
     height: 35px;
     width: 51px;
     line-height: 53px;
     background-color: #c5432e;
     display: inline-block;
     top: -12px;
     right: -20px;
     font-size: 12px;
     color: white;
     transform: rotate(45deg);
  }
</style>
