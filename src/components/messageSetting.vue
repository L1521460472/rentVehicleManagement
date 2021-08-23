<template>
  <div>
    <div class="table">
      <div class='header scoped'>
        <div>类型</div>
        <div>提醒事件</div>
        <div>规则单位</div>
        <div>提前规则<i title="提前规则设置" class="el-icon-edit-outline"></i></div>
        <div>客户提醒方式</div>
        <div>提醒消息模板</div>
      </div>
      <div class="tbody" v-for="(remindType,i) in records">
        <div>{{remindType.remindRuleTypeStr}}</div>
        <div>{{remindType.remindEventTypeStr}}</div>
        <div>{{remindType.ruleUnitStr}}</div>
        <div @blur="saveday(remindType.id)" :id="'_'+remindType.id" @keydown="noentereventfunc">
         {{remindType.ruleValue}}
        </div>
        <div class="checkitem">
          <span  v-for="(remindEventType,t) in remindType.remindModeList">
            <el-checkbox v-model='remindEventType.isChecked' @change="saveday(remindType.id,'Checked')">
              {{remindEventType.remindModeStr}}
            </el-checkbox>
          </span>
        </div>
        <div><a @click="editmuban(remindType.id)"><i class="el-icon-edit-outline"></i>编辑模板</a></div>
      </div>
    </div>
    <!--编辑框-->
    <el-dialog title="模板编辑" :close-on-click-modal="false" :visible.sync="dialogFormVisible" @close="reset">
      <el-form :model="form" ref="form">
        <el-form-item label="消息标题" :required='true' :show-message="false" prop="title">
          <el-input v-model="form.title" autocomplete="off" style="width: 590px;"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" :required='true' :show-message="false" prop="content">
          <el-input type="textarea" rows="5" v-model="form.content" autocomplete="off" style="width: 590px;"></el-input>
        </el-form-item>
        <el-form-item label="短信模板" class='duanxmb' prop="messageMuban">
          <el-input type="textarea" rows="5" v-model="form.messageMuban" autocomplete="off" style="width: 590px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="dialogFormConfirm" :disabled="confirmdisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from "axios";
  import {
    getCookie
  } from "../public";
  export default {
    name: 'messageSetting',
    data() {
      return {
        queryurl:'/vehicle-service/remindRuleInfo/remindRulePageQuery',
        savedayurl:'/vehicle-service/remindRuleInfo/modifyRemindRuleInfo',
        savemsgurl:'/vehicle-service/remindRuleTemplateInfo/modifyRemindRuleTemplate',
        getmubaninfourl:'/vehicle-service/remindRuleTemplateInfo/ruleTemplateDetail?id=',
        dialogFormVisible: false,
        onemsgbox:true,
        form: {
          remindtypeId:'',
          title: '',
          content: '',
          messageMuban:''
        },
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        confirmdisabled: false,
        records:[]
      }
    },
    methods: {
      noentereventfunc(event){
        if(event.keyCode==13){
          event.target.blur();
          event.preventDefault();
        }
        if(event.target.innerText.length==10
        &&event.keyCode!=8&&event.keyCode!=46
        &&event.keyCode!=37&&event.keyCode!=39){
           event.preventDefault();
        }
      },
      closeDialog() {
        this.dialogFormVisible=false
        this.$refs['form'].resetFields();
      },
      reset(){
         this.$refs['form'].resetFields();
      },
      editmuban(id) {
        this.dialogFormVisible = true
        this.form.remindtypeId=id;
        axios({
            method: "get",
            url: this.getmubaninfourl+id,
            headers: this.headers,
          })
          .then((result) => {
            console.log(result.data);
            if (result.data.status == 0) {
              let data=result.data.data;
              this.form.content=data.templateText
              this.form.title=data.templateTitle
              this.form.messageMuban=data.messageTemplate
            }
          })
          .catch((err) => {
            this.$message({
              message: '服务器繁忙，请稍后再试',
              center: true,
              type: "error",
            });
          });
      },
      dialogFormCancel() {
        this.closeDialog();
      },
      dialogFormConfirm() {
        this.confirmdisabled = true
        this.form.title = this.form.title.replace(/(^\s*)|(\s*$)/g, "");
        this.form.content = this.form.content.replace(/(^\s*)|(\s*$)/g, "");
        if (this.form.title == "") {
          this.$message({
            message: '消息标题不能为空',
            type: 'error'
          });
          this.confirmdisabled = false
          return
        }
        if (this.form.content == "") {
          this.$message({
            message: '消息内容不能为空',
            type: 'error'
          });
          this.confirmdisabled = false
          return
        }
        //提交
        axios({
            method: "post",
            url: this.savemsgurl,
            headers: this.headers,
            data: {
                    "id": this.form.remindtypeId,
                    "messageTemplate": this.form.messageMuban,
                    "templateText": this.form.content,
                    "templateTitle": this.form.title
                  },
          })
          .then((result) => {
            console.log(result.data);
            if (result.data.status == 0) {
              this.$message({
                message: '修改成功',
                center: true,
                type: "success",
              });
              this.closeDialog();
            }
            this.confirmdisabled = false
          })
          .catch((err) => {
            this.confirmdisabled = false
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      },
      getparam(remindtype){
        let data = {
          id:'',//提醒规则id
          remindMode:'',//规则提醒方式字符串
          ruleUnit:'',//规则单位(0-天 1-月
          ruleValue:''//规则数值
        }
        data.id=remindtype.id;
        data.ruleUnit=remindtype.ruleUnit;
        data.ruleValue=remindtype.ruleValue;
        for(let item of remindtype.remindModeList){
          if(item.isChecked){
            data.remindMode+=item.id+"-1,"
          }
          else{
            data.remindMode+=item.id+"-0,"
          }
        }
        data.remindMode=data.remindMode.substring(0,data.remindMode.length-1);
        return data;
      },
      getremindType(id){
        let remindtype=null
        for(let item of this.records){
          if(item["id"]==id){
            remindtype=item
          }
        }
        return remindtype;
      },
      saveday(id,Checked){
        var elm=document.getElementById('_'+id)
        let remindtype=this.getremindType(id);
        if(!Checked){
          try{
            let val=this.formatNum(elm.innerText)
            if(val==''||val==remindtype.ruleValue){
              elm.innerText=remindtype.ruleValue
              return
            }
            else{
              remindtype.ruleValue=val;
              elm.innerText=remindtype.ruleValue
            }
          }
          catch(e){
            if(elm)
            {
              elm.innerText=remindtype.ruleValue
            }
            return
          }
        }
        //提交
        axios({
            method: "post",
            url: this.savedayurl,
            headers: this.headers,
            data: this.getparam(remindtype),
          })
          .then((result) => {
            console.log(result);
            if (result.data.status == 0) {
              let $this=this
              if(this.onemsgbox){
                this.onemsgbox=false
                this.$message({
                  message: '修改成功',
                  center: true,
                  type: "success",
                  onClose:function(){
                   $this.onemsgbox=true
                  }
                });
              }
            }
          })
          .catch((err) => {
            this.$message({
              message: err.response.data.message,
              center: true,
              type: "error",
            });
          });
      },
      formatNum(val){
        if(isNaN(val)){
          return '';
        }
        else if(val.indexOf('.')){
          val=val.split('.')[0]
        }
        return val;
      }
    },
    mounted() {
        setTimeout(() => {
            window.onload()
          }, 10)
      //加载数据
      axios({
          method: "post",
          url: this.queryurl,
          headers: this.headers,
          data: {
                  "currentPage": 1,
                  "pageSize": 100
                },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.status == 0) {
            for(let item of result.data.data.records){
              for(let remindModeListitem of item.remindModeList){
                let flag = remindModeListitem.isChecked==0?false:true
                this.$set(remindModeListitem,'isChecked',flag)
              }
            }
            this.records=result.data.data.records;
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: '服务器繁忙，请稍后再试',
            center: true,
            type: "error",
          });
        });
    },
    updated() {
      let tbody = document.getElementsByClassName('tbody');
      for (let item of tbody) {
        let child = item.children[3];
        child.contentEditable = true;
      }
    }
  }
</script>

<style scoped>
  .table {
    display: flex;
    flex-direction: column;
    margin: 20px 20px;
  }

  .table a {
    cursor: pointer;
  }

  .header,
  .tbody {
    display: flex;
    border-right: #dee4f0 1px solid;
  }

  .header {
    font-weight: 700;
    background-color: #f5f5f5;
  }

  .header div,
  .tbody div {
    display: inline-block;
    border: 1px solid;
    border-right: none;
    width: calc(100% / 6);
    height: 25px;
    line-height: 25px;
    text-align: left;
    padding: 10px 10px 10px 10px;
    padding-left: 10px;
    font-size: 14px;
    border-color: #dee4f0;
    color: rgb(51, 51, 51);
    ;
  }

  .tbody div {
    height: 100px !important;
    border-top: none;
    line-height: 100px;
  }

  .tbody>.checkitem {
    color: #409EFF;
    line-height: normal !important;
    font-weight: 700;
  }

  .tbody>.checkitem label:first-child {
    margin-top: 5px;
  }

  .tbody .el-checkbox {
    color: #409EFF !important;
  }

  .tbody div:last-child,
  .header div:last-child {
    color: #409EFF;
    text-align: center;
  }

  .tbody div:first-child,
  .header div:first-child {
    text-align: center;
  }

  .header div:last-child {
    color: rgb(51, 51, 51) !important;
  }
  .duanxmb{
    margin-left: 9px;
  }
</style>
