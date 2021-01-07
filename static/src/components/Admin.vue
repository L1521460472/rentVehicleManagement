<template>
  <div id="dictionaries">
    <!-- <div class="header">
      <el-input v-model="input01" placeholder="字典名称"></el-input>
      <el-input v-model="input02" placeholder="字典类型"></el-input>
      <el-button @click="search">查询</el-button>
      <el-button @click="addDictionaries">新增</el-button>
      <el-button @click="detele_tatol">删除</el-button>
      <el-dialog
        :title="meg"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div class="menu_block">
          <el-button @click="addSex">新增</el-button>
          <div class="p">
            <span class="demonstration">*字典名称</span>
            <el-input
              size="small"
              v-model="input11"
              placeholder="简体名称"
            ></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*字典类型</span>
            <el-input
              size="small"
              v-model="input12"
              placeholder="请输入描述"
            ></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*排序</span>
            <el-input-number
              v-model="num01"
              size="small"
              controls-position="right"
              class="p_input"
              :min="1"
              :max="50"
            ></el-input-number>
          </div>
          <div class="p">
            <span class="demonstration">描述</span>
            <el-input
              size="small"
              v-model="input13"
              placeholder="请输入描述"
            ></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div> -->
    <div class="main">
      <el-table
        ref="multipleTable"
        border
        size="mini"
        align="center"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column 
          type="selection" 
          min-width="55"> 
        </el-table-column>
        <el-table-column 
          prop="date" 
          label="字典名称" 
          min-width="120" 
          sortable>
        </el-table-column>
        <el-table-column 
          prop="name" 
          label="字典类型" 
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="排序"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建时间"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text"
              >修改</el-button
            >
            <el-button
              @click="handleDelete(scope.$index, scope.row)"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "dictionaries",
  data() {
    return {
      input01: "", //字典名称
      input02: "", //字典类型
      num01: 1, //排序
      meg: "新增",
      input11: "", //新增字典名称
      input12: "", //新增字典类型
      input13: "", //新增字典描述
      dialogVisible: false,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
      currentPage: 1,
    };
  },
  methods: {
    search() {
      console.log(111);
    },
    addJurisdiction() {
      console.log(222);
    },
    detele_tatol() {
      console.log(333);
    },
    handleSizeChange(val) {
      //每页多少条
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //第几页
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      //修改
      console.log(index, row);
    },
    handleDelete(index, row) {
      //删除
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addDictionaries() {
      this.dialogVisible = true;
    },
    confirm() {
      //确定新增
      this.dialogVisible = false;
    },
    cancel() {
      //取消新增
      this.dialogVisible = false;
    },
    handleClose(done) {
      //关闭弹出窗口
      done();
    },
    addSex() {
      console.log("sex");
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
#dictionaries {
  width: 100%;
  height: 100%;
}
.header {
  margin-bottom: 20px;
}
.header .el-input {
  width: 202px;
}
.header .el-button {
  margin-right: 0px;
}
.header .el-button + .el-button {
  margin-left: 0px;
}
.el-pagination {
  float: right;
}
.main {
  margin-bottom: 20px;
}
</style>
