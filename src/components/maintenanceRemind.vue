<template>
  <div>
    <div class="table">
      <div class="header scoped">
        <div>类型</div>
        <div>提醒事件</div>
        <div>规则单位</div>
        <div>提前规则<i title="提前规则设置" class="el-icon-edit-outline"></i></div>
        <div>客户提醒方式</div>
        <div>提醒消息模板</div>
      </div>
      <div class="tbody" v-for="(item, index) in tableData" :key="index">
        <div>{{item.remindRuleTypeStr}}</div>
        <div>{{item.remindEventTypeStr}}</div>
        <div>{{item.ruleUnitStr}}</div>
        <div>{{item.ruleValue}}</div>
        <div class="checkitem">
          <el-checkbox v-for="(ele, index) in item.remindModeList" :key="index" :label="ele.id" :checked="ele.isChecked">{{ele.remindModeStr}}</el-checkbox>
        </div>
        <div><a @click="editTemplate(item, index)"><i class="el-icon-edit-outline"></i>编辑模板</a></div>
      </div>
    </div>
    <!--编辑框-->
    <el-dialog title="模板编辑" :close-on-click-modal="false" :visible.sync="dialogFormVisible" @close="reset">
      <el-form :model="form" ref="form" :rules="rules" label-width="90px">
        <el-form-item label="消息标题"  prop="title">
          <el-input v-model="form.title" autocomplete="off" style="width: 590px;"></el-input>
        </el-form-item>
        <el-form-item label="消息内容"  prop="content">
          <el-input type="textarea" rows="5" v-model="form.content" autocomplete="off" style="width: 590px;"></el-input>
        </el-form-item>
        <el-form-item label="短信模板" prop="messageMuban">
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
import axios from "axios"
import { getCookie, dateToString, getMenuBtnList } from "@/public"

export default {
  data() {
    return {
      tableData: [
        {
          remindRuleTypeStr: '保养',
          remindEventTypeStr: '保养提醒日',
          ruleUnitStr: '天',
          ruleValue: '-30',
          remindModeList: [
            {
              id: 1,
              isChecked: true,
              remindModeId: 1,
              remindModeStr: 'AppPush-客户'
            },
            {
              id: 2,
              isChecked: true,
              remindModeId: 1,
              remindModeStr: '公司后台提醒'
            },
            {
              id: 3,
              isChecked: false,
              remindModeId: 1,
              remindModeStr: '手机短信-客户'
            },
            {
              id: 4,
              isChecked: true,
              remindModeId: 1,
              remindModeStr: '手机短信-业务员'
            },
          ],
        }
      ],
      dialogFormVisible: false, // 弹框控制标志
      form: {
        title: '',
        content: '',
        messageMuban: ''
      }, // 表单内容
      rules: {
        title: [
          {
           required: true, message: '请输入标题', trigger: 'blur'
          }
        ],
        content: [
          {
            required: true, message: '请输入消息内容', trigger: 'blur'
          }
        ],
        messageMuban: [
          {
            required: false
          }
        ]
      },
      confirmdisabled: false
    }
  },
  methods: {
    getTableList() {
      axios({

      })
    },
    editTemplate(item, index) {
      this.dialogFormVisible = true
    },
    // 关闭弹框
    reset() {
      this.$refs['form'].resetFields();
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.$refs['form'].resetFields();
    },
    dialogFormConfirm() {
      this.dialogFormVisible = false
    }
  },
  mounted() {
      setTimeout(() => {
            window.onload()
          }, 10)
  },
  created() {

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
