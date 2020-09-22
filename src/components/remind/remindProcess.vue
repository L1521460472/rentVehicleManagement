<template>
   <div>
       <div id="u243" class="ax_default shape">
           <div id="u243_div"></div>
           <div id="u243_test" class="text">
               <p>
                   <span>未查看</span>
               </p>
           </div>
       </div>
       <div id="u244" class="ax_default shape">
           <div id="244_div"></div>
           <div id="u244_text" class="text">
               <p>
                   <span>已查看</span>
               </p>
           </div>
       </div>
       <div id="u245" class="ax_default primary_button" style="cursor:pointer;">
           <div id="u245_text" class="text">
              <el-button
              size="small"
              type="primary"
              class="search"
              @click="search"
              >返回</el-button>
           </div>
       </div>
       <div id="body">
           <div v-for="v in remindData" v-bind:key="v.r+v.t" class="line">
               <div style="display:inline-block;width:20px;vertical-align: super;"><img src="v.src"/></div>
               <div style="display:inline-block;width:calc(100% - 30px);">
                  <div style="margin:0px;">
                      <span v-bind:class="{'fontColorW':isFontColorW,'fontColorB':isFontColorB}">{{v.t}}</span>
                      <span style="position: absolute;left:452px;">{{v.r}}</span>
                      <span style="position: absolute;left:592px">{{v.tm}}</span>
                  </div>
                  <div style="margin:0px;height:20px">
                      <p>{{v.msg}}</p>
                  </div>
               </div>
               <hr/>
           </div>
           
       </div>
       
       <div id="page">
          <el-pagination
            :current-page="1"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100"
          >
          </el-pagination>
       </div>
   </div>
</template>
<script>
export default {
    name: "remindProcess",
    data() {
        return {
            remindData : [
                {
                    id : 1,
                    t : "车辆年检到期",
                    r : "创建人：系统消息",
                    tm : "2020/07/23 15:00",
                    msg : "车牌：粤HJ938401 行驶证2020/04/07到期，还有2天",
                    src : "",
                },
                {
                    id : 2,
                    t : "车辆年检到期",
                    r : "创建人：系统消息",
                    tm : "2020/07/23 15:00",
                    msg : "车牌：粤HJ938401 行驶证2020/04/07到期，还有2天",
                    src : "",
                },
                {
                    id : 3,
                    t : "车辆年检到期",
                    r : "创建人：系统消息",
                    tm : "2020/07/23 15:00",
                    msg : "车牌：粤HJ938401 行驶证2020/04/07到期，还有2天",
                    src : "",
                },
                {
                    id : 4,
                    t : "车辆年检到期",
                    r : "创建人：系统消息",
                    tm : "2020/07/23 15:00",
                    msg : "车牌：粤HJ938401 行驶证2020/04/07到期，还有2天",
                    src : "",
                },
                {
                    id : 5,
                    t : "车辆年检到期",
                    r : "创建人：系统消息",
                    tm : "2020/07/23 15:00",
                    msg : "车牌：粤HJ938401 行驶证2020/04/07到期，还有2天",
                    src : "",
                },
            ],
            isFontColorW : true,
            isFontColorB : false,
        };
    },
    methods: {
        search() {
            var temp = this.isFontColorW;
            this.isFontColorW = this.isFontColorB;
            this.isFontColorB = temp;
        },
    },

};
</script>
<style scoped>
#u243 {
    border-width: 0px;
    position: absolute;
    left: 276px;
    top: 166px;
    width: 88px;
    height: 26px;
    display: flex;
    font-family: 'Microsoft YaHei ', 'Microsoft YaHei', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #409EFF;
    text-align: left;
}

#u243 .text {
    position: absolute;
    align-self: center;
    padding: 5px 16px 5px 16px;
    box-sizing: border-box;
    width: 100%;
}

#u244 {
    border-width: 0px;
    position: absolute;
    left: 364px;
    top: 166px;
    width: 88px;
    height: 26px;
    display: flex;
    font-family: 'Microsoft YaHei ', 'Microsoft YaHei', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #7F7F7F;
    text-align: left;
    line-height: 22px;
}

#u244 .text {
    position: absolute;
    align-self: center;
    padding: 5px 16px 5px 16px;
    box-sizing: border-box;
    width: 100%;
}

#u245 {
    border-width: 0px;
    position: absolute;
    left: 70%;
    top: 165px;
    width: 90px;
    height: 27px;
    display: flex;
}

#page {
    border-width: 0px;
    position: absolute;
    left: 30%;
    top: 640px;
    display: flex;
    font-size: 12px;
    color: #666666;
}

#body {
    border-width: 0px;
    position: absolute;
    left: 315px;
    top: 222px;
    width: 759px;
    height: 59px;
    font-family: 'Microsoft Tai Le', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.447058823529412);
    text-align: left;
}

#body .line {
    font-family: 'PingFangSC','PingFang SC',sans-serif;
    font-weight:650;
}
.fontColorW {
    color: black;
}
.fontColorB {
    color: yellow;
}

</style>