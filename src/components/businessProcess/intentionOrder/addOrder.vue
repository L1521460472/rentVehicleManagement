<template>
  <div id="addOrder">
    <div class="header scoped">
      <span>{{showMes}}</span>
    </div>
    <div class="footer" v-if="international.title">
      <div class="footerTop">
        <div class="footerTitle">
          <span>客户信息</span>
        </div>
        <div class="footerNav">
          <el-form ref="form" :model="form" label-width="130px" label-position="right">
            <el-form-item class="formItem" label="客户类型">
              <el-select
                size="small"
                v-model="form.customerType"
                @change="changeCustomerType"
                placeholder
              >
                <el-option
                  v-for="item in customerTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="formItem"
              :class="showCompany ? '':'closeCompany'"
              prop="customerId"
              :rules="[{ required: required,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="客户名称"
            >
              <el-select
                filterable
                size="small"
                v-model="form.customerId"
                @change="selectCustomer"
                placeholder
              >
                <el-option
                  v-for="item in customerData"
                  :key="item.id"
                  :label="item.customerName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="formItem"
              :class="showCompany ? '':'closeCompany'"
              prop="busilicNo"
              label="营业执照号"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.busilicNo"></el-input>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="contact"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="联系人姓名"
            >
              <el-select
                size="small"
                filterable
                v-model="form.contact"
                @change="selectContact"
                placeholder
              >
                <el-option
                  v-for="item in customerData"
                  :key="item.id"
                  :label="item.personInCharge"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="formItem"
              prop="phone"
              :rules="[{ required: true,message:international.global.global_contNotEmpty, trigger: 'blur'}]"
              label="联系电话"
            >
              <el-input maxlength="100" disabled size="small" v-model="form.phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerTitle orderInfo">
          <span>订单信息</span>
          <div class="orderInfoBtn">
            <el-button type="primary" size="small" @click="addAction">新增</el-button>
            <el-button type="primary" :disabled="isDisabled" size="small" @click="deleteAction">删除</el-button>
          </div>
        </div>
        <div class="footerNav">
          <el-form :model="form" label-width="130px" label-position="right">
            <el-form-item class="formItem" :class="showOrderTip ? '':'closeOrderTip'" label="订单时间">
              <el-input maxlength="100" disabled size="small" v-model="form.orderTime"></el-input>
            </el-form-item>
            <el-form-item class="formItem" :class="showOrderTip ? '':'closeOrderTip'" label="订单来源">
              <el-input maxlength="100" disabled size="small" v-model="form.orderSourceStr"></el-input>
            </el-form-item>
            <el-form-item class="formItem" :class="showOrderTip ? '':'closeOrderTip'" label="操作账号">
              <el-input maxlength="100" disabled size="small" v-model="form.loginName"></el-input>
            </el-form-item>
            <el-form-item class="formItem" :class="showOrderTip ? '':'closeOrderTip'" label="订单编号">
              <el-input maxlength="100" disabled size="small" v-model="form.orderNo"></el-input>
            </el-form-item>
            <el-form-item
              :rules="[{ required: true, message: '请选择时间', trigger: 'change' }]"
              class="formItem"
              label="期望提车日期"
            >
              <el-date-picker
                size="small"
                v-model="form.expectDate"
                prefix-icon="el-icon-time2"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder
              ></el-date-picker>
            </el-form-item>
            <el-table
              class="table"
              border
              stripe
              :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
              size="small"
              :data="tableData"
              @select="handleSelectionChange"
              style="width: 100%; height: 100%;"
            >
              <el-table-column type="selection" align="center" width="60"></el-table-column>
              <el-table-column
                prop="id"
                :label="international.field.field_departmentArchivesList_serialNumber"
                align="center"
                width="60"
              >
                <template slot-scope="scope">{{ scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column  label="车辆品牌*">
                <template slot-scope="scope">
                  <el-select
                    size="small"
                    v-model="scope.row.brandId"
                    @change="selectBrand(scope.$index, scope.row.brandId)"
                    placeholder
                  >
                    <el-option
                      v-for="item in scope.row.vehicleBrandList"
                      :key="item.id"
                      :label="item.brandName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="车型*" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-select
                    size="small"
                    v-model="scope.row.vehicleTypeId"
                    @change="selectModels(scope.$index, scope.row.vehicleTypeId)"
                    placeholder
                  >
                    <el-option
                      v-for="item in scope.row.vehicleModelsList"
                      :key="item.id"
                      :label="item.vehicleTypeName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column  label="数量*" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.number" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="租赁时长（月）*" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.leaseDuration" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="月租金（元）/辆/月" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.monthlyRent" disabled size="small"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>
      <div class="footerButton">
        <el-button
          type="primary"
          size="small"
          @click="$route.query.from == 'add' ? addConfirm():editConfirm()"
        >提交</el-button>
        <el-button size="small" @click="cancel">{{international.global.global_cancel}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getCustomerData,
  addOrder,
  editOrder,
  brandList,
  searchModelsList,
  getOrderDetail,
} from "../../../api/businessProcess/api";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
  formatJE
} from "../../../public";
export default {
  name: "addOrder",
  data() {
    return {
      form: {
        customerId: "", //客户id
        customerType: 2, //客户类型
        // customerName: "", //客户名称
        busilicNo: "", //营业执照编号
        contact: "", //联系人
        phone: "", //联系人电话
        orderTime: "", //订单时间
        orderSourceStr: "",
        loginName: '',
        orderNo: "", //订单编号
        expectDate: "", //期望提车日期
      }, //新增数据
      customerTypeList: [
        {
          id: 1,
          value: "个人",
        },
        {
          id: 2,
          value: "企业",
        },
      ], //客户类型
      customerNameList: [], //客户名称列表
      contactList: [], //联系人列表
      customerDataList: [], //未根据客户类型过滤数据
      customerData: [], //过滤后客户信息列表
      showMes: "", //新增修改标题
      showCompany: true, //是否显示客户名称和营业执照编号
      required: true, //客户名称
      isDisabled: true, //是否禁用订单信息删除
      showOrderTip: true, //是否显示订单时间，订单来源，操作账号
      selectData: [], //表格选择数据
      brandList: [], //车辆品牌列表
      tableData1: {}, //后台获取的表格数据，保存一份避免数据删除完二次请求问题
      tableData: [],
      deleteData:[],
      international: {},
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    addConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.expectDate == "") {
            this.$message.error({
              message: "期望提车日期不能为空",
              center: true,
            });
            return;
          }
          let leaseOrderDate = [];
          for (let i = 0; i < this.tableData.length; i++) {
            if(this.tableData[i].brandId == ""){
              this.$message.error({
                message: "车辆品牌不能为空",
                center: true,
              });
              return;
            }
            if (this.tableData[i].vehicleTypeId == "") {
              this.$message.error({
                message: "车型不能为空",
                center: true,
              });
              return;
            }
            if (this.tableData[i].number == "") {
              this.$message.error({
                message: "数量不能为空",
                center: true,
              });
              return;
            }
            if (this.tableData[i].leaseDuration == "") {
              this.$message.error({
                message: "租赁时长不能为空",
                center: true,
              });
              return;
            }
            let obj = {};
            obj.leaseDuration = this.tableData[i].leaseDuration;
            obj.number = this.tableData[i].number;
            obj.typeId = this.tableData[i].vehicleTypeId;
            leaseOrderDate.push(obj);
          }
          let params = {
            customerId: this.form.customerId,
            expectedDate: this.form.expectDate,
            leaseOrderDetailInsertDtos: leaseOrderDate,
            orderSource: 0,
          };
          addOrder(params, this.headers)
            .then((res) => {
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: "新增成功",
                  center: true,
                });
                this.$router.back();
              } else {
                this.$message.error({
                  message: res.message,
                  center: true,
                });
              }
            })
            .catch((err) => {
              this.$message.error({
                message: res.message,
                center: true,
              });
            });
        }
      });
    },
    editConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.expectDate == "") {
            this.$message.error({
              message: "期望提车日期不能为空",
              center: true,
            });
            return;
          }
          let leaseOrderDate = [];
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].vehicleTypeId == "") {
              this.$message.error({
                message: "车型不能为空",
                center: true,
              });
              return;
            }
            if (this.tableData[i].number == "") {
              this.$message.error({
                message: "数量不能为空",
                center: true,
              });
              return;
            }
            if (this.tableData[i].leaseDuration == "") {
              this.$message.error({
                message: "租赁时长不能为空",
                center: true,
              });
              return;
            }
            let obj = {};
            obj.id = this.tableData[i].id || null
            obj.leaseDuration = this.tableData[i].leaseDuration;
            obj.number = this.tableData[i].number;
            obj.typeId = this.tableData[i].vehicleTypeId;
            obj.modifyFlag = this.tableData[i].modifyFlag
            leaseOrderDate.push(obj);
          }
          this.deleteData.map(item=>{
            if(item.modifyFlag == 2){
              let obj2 ={}
              obj2.id = item.id
              obj2.leaseDuration = item.leaseDuration;
              obj2.number = item.number;
              obj2.typeId = item.vehicleTypeId;
              obj2.modifyFlag =item.modifyFlag
              leaseOrderDate.push(obj2)
            }
          })
          let params = {
            customerId: this.form.customerId,
            expectedDate: this.form.expectDate,
            leaseOrderDetailUpdateDtos: leaseOrderDate,
            id: this.$route.query.id,
          };
          editOrder(params, this.headers)
            .then((res) => {
              if (res.status == 0) {
                this.$store.commit("changeIsStatus", true);
                this.$message.success({
                  message: "修改成功",
                  center: true,
                });
                this.$router.back();
              } else {
                this.$message.error({
                  message: res.message,
                  center: true,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    // 获取车辆信息列表
    getCarListData() {
      brandList({}, this.headers)
        .then((res) => {
          this.tableData = [
            {
              index: 0,
              brandId: "", //品牌
              vehicleTypeId: "", //车型
              vehicleBrandList: res.data, //品牌列表
              vehicleModelsList: [], //车型列表
              number: "", //数量
              leaseDuration: "", //租赁时长
              monthlyRent: "", //租赁价格
            },
          ];
          this.brandList = res.data
          this.tableData.map(item=>{
            item.vehicleBrandList = res.data
          })//防止编辑先返回详情，再返回品牌时异步问题
          this.tableData1 = Object.assign({}, this.tableData[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 改变客户类型
    changeCustomerType(val) {
      this.showCompany = val == 2 ? true : false;
      this.required = val == 1 ? false : true;
      this.customerData = this.customerDataList.filter((item) => {
        return item.customerType == val;
      });
      this.form.busilicNo = "";
      this.form.contact = "";
      this.form.phone = "";
      this.form.customerName = "";
      this.form.customerId = "";
    },
    // 选择客户名称
    selectCustomer(val) {
      let i;
      this.customerData.map((item, index) => {
        if (item.id == val) {
          i = index;
          return;
        }
      });
      this.form.customerId = val;
      this.form.busilicNo = this.customerData[i].busilicNo, //营业执照编号
      this.form.contact = val, //联系人
      this.form.phone = this.customerData[i].phoneNumber; //联系人电话
    },
    // 选择联系人名字
    selectContact(val) {
      let i;
      this.customerData.map((item, index) => {
        if (item.id == val) {
          i = index;
          return;
        }
      });
      this.form.customerId = val;
      (this.form.busilicNo = this.customerData[i].busilicNo), //营业执照编号
        (this.form.customerName = val), //客户名称
        (this.form.phone = this.customerData[i].phoneNumber); //联系人电话
    },
    //选择订单信息
    handleSelectionChange(val, index) {
      // console.log(val,index)
      this.selectData = val;
      this.isDisabled = val.length < 1 ? true : false;
    },
    // 订单信息新增
    addAction() {
      if(this.tableData.length > 10){
        this.$message.error({
          message:'意向订单数据最多10条',
          center:true
        })
        return
      }
      let obj = Object.assign({}, this.tableData1);
      obj.modifyFlag = 0
      this.tableData.push(obj);
      this.tableData.map((item, index) => {
        item.index = index;
      });
    },
    // 订单信息删除
    deleteAction() {
      if (this.selectData.length > 1) {
        this.$message.warning({
          message: "删除不能多选！",
          center: true,
        });
        return;
      }
      if(this.tableData.length == 1){
        this.$message.error({
          message:'意向订单数据最少1条',
          center:true
        })
        return
      }
      this.$confirm("确认删除该条数据？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          let index3;
          this.tableData.map((item, index2) => {
            if (item.index == this.selectData[0].index) {
              index3 = index2;
              return;
            }
          });
          this.tableData.splice(index3, 1);
          this.tableData.map((item, index) => {
            item.index = index;
          });
          if(this.$route.query.from == 'edit'){
            this.deleteData.map(item=>{
              if(this.selectData[0].id == item.id){
                item.modifyFlag = 2
              }
            })
          }
        })
        .catch(() => {
          console.log("取消");
        });
    },
    // 选择品牌
    selectBrand(index, id) {
      this.tableData[index].vehicleTypeId = ''
      let arr =[]
      searchModelsList({ id: id }, this.headers)
        .then((res) => {
          this.tableData[index].vehicleModelsList = JSON.parse(JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 选择车型
    selectModels(index, id) {
      let monthlyRent = "";
      this.tableData[index].vehicleModelsList.map((item) => {
        if (item.id == id) {
          monthlyRent = formatJE(item.monthlyRent);
          return;
        }
      });
      this.tableData[index].monthlyRent = monthlyRent;
    },
  },
  mounted() {
    // 获取客户信息
    this.getCarListData();
    let params = {
      currentPage: 1,
      pageSize: 1000,
    };
    getCustomerData(params, this.headers)
      .then((res) => {
        if (res.status == 0) {
          this.customerDataList = res.data.records;
          this.customerData = res.data.records.filter((item) => {
            return item.customerType == 2;
          });
        } else {
          this.$message.error({
            message: res.message,
            center: true,
          });
        }
        if (this.$route.query.from == "add") {
          this.showMes = "新增意向订单";
          this.showCompany = true;
          this.required = true;
          this.showOrderTip = false;
        } else {
          this.showMes = "修改意向订单";
          this.showOrderTip = true;
          getOrderDetail({ id: this.$route.query.id }, this.headers)
            .then((res2) => {
              if (res.status == 0) {
                this.showCompany = res2.data.customerType == 2 ? true : false;
                this.required = res2.data.customerType == 1 ? false : true;
                this.form.customerId = res2.data.customerId,
                this.form.customerType = res2.data.customerType, 
                this.form.busilicNo =res2.data.busilicNo, //营业执照编号
                this.form.contact =res2.data.personInCharge, //联系人
                this.form.phone =res2.data.phoneNumber, //联系人电话
                this.form.orderTime =res2.data.orderTimeStr, //订单时间
                this.form.orderSourceStr =res2.data.orderSourceStr,
                this.form.loginName = res2.data.operationAccount,
                this.form.orderNo =res2.data.orderNumber, //订单编号
                this.form.expectDate =res2.data.expectedDateStr //期望提车日期
                res2.data.leaseOrderDetailInfoVOS.map((item,index)=>{
                  item.vehicleBrandList = this.brandList
                  item.vehicleModelsList = []
                  item.brandId = parseInt(item.brandId)
                  item.vehicleTypeId = parseInt(item.vehicleTypeId)
                  item.modifyFlag = 1
                  item.monthlyRent = formatJE(item.monthlyRent)
                })//防止编辑先返回品牌，再返回详情时异步问题
                this.tableData = res2.data.leaseOrderDetailInfoVOS
                this.deleteData = JSON.parse(JSON.stringify(res2.data.leaseOrderDetailInfoVOS))
                this.tableData.map((item,index)=>{
                  searchModelsList({ id: item.brandId }, this.headers)
                    .then((res) => {
                      this.tableData[index].vehicleModelsList = res.data;
                    })
                    .catch((err) => {
                      console.log(err);
                    });

                })
                if (res2.data.customerType == 1) {
                  this.customerData = this.customerDataList.filter((item) => {
                    return item.customerType == 1;
                  });
                }
              } else {
                this.$message({
                  message: res.message,
                  center: true,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              this.$message({
                message: err.response.data.message,
                center: true,
                type: "error",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    // 计算国际化标题和按钮
    internationalTitle() {
      return this.$store.state.languageTitle;
    },
  },
  watch: {
    // 监听国际化标题和按钮变化
    internationalTitle: {
      handler(data) {
        this.international = data;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style scoped>
#addOrder {
  width: 100%;
  height: calc(100% - 76px);
}
.header {
  width: 100%;
  height: 26px;
  box-sizing: border-box;
  padding-left: 40px;
  margin-bottom: 16px;
}
.header span {
  color: rgba(51, 51, 51, 1);
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 16px;
  line-height: normal;
}
.footer {
  width: 100%;
  height: calc(100% - 26px);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.footerTitle {
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding-left: 40px;
  background-color: #f5f7fa;
}
.footerTitle span {
  color: #368cfe;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 16px;
}
.orderInfo {
  display: flex;
  justify-content: space-between;
}
.orderInfoBtn {
  margin-right: 10px;
}
.footerNav {
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  overflow: hidden;
}
.last_footerNav {
  overflow: initial;
}
.footerTop {
  width: 100%;
  height: calc(100% - 56px);
  overflow: auto;
}
.el-form {
  overflow: hidden;
}
.formItem {
  float: left;
}
.closeCompany {
  display: none;
}
.leftLable {
  display: inline-block;
  width: 130px;
  text-align: right;
  font-size: 14px;
  color: #606266;
  padding-right: 12px;
  box-sizing: border-box;
  margin-bottom: 22px;
}
.rightValue {
  display: inline-block;
  width: 160px;
  font-size: 14px;
  color: #606266;
  margin-bottom: 22px;
}
.title {
  color: #333333;
  font-family: Microsoft YaHei;
  font-weight: regular;
  font-size: 16px;
}
.footerButton {
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  padding-top: 12px;
  padding-left: 44%;
  border-top: 1px solid #e5e5e5;
  /* border-bottom: 1px solid #e5e5e5; */
}
.footerNav .el-input {
  width: 160px;
}
.footerNav .el-input__inner {
  width: 160px;
}
.footerNav >>> .el-input--suffix {
  width: 160px;
}
.footerNav >>> .el-input--prefix .el-input__inner {
  padding: 0 15px !important;
}
.table >>> .el-input {
  width: 100%;
}
.closeOrderTip {
  display: none;
}
</style>
