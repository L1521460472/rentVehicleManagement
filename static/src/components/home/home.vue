<template>
  <div id="homeIndex" ref="contentHeight" v-loading="loading" element-loading-text="loading">
    <div class="headerTop">
      <el-input maxlength="50" size="small" v-model="contractCode" placeholder></el-input>
      <el-button class="search" type="primary" size="small">查询</el-button>
      <el-button class="sign" type="primary" size="small">签约</el-button>
      <el-button class="settle" type="primary" size="small">结算</el-button>
    </div>
    <div class="vehicleOverview">
        <p>车辆总览</p>
        <div class="haveRent">
            <img src=""  >
        </div>
    </div>
  </div>
</template>

<script>
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
} from "../../public";
import {} from "../../api/businessProcess/api";
export default {
  name: "homeIndex",
  data() {
    return {
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      }, //请求头
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
#homeIndex {
  width: 100%;
  height: calc(100% - 76px);
}
.headerTop {
  border: 1px solid #e5e5e5;
  height: 66px;
  box-sizing: border-box;
  padding-left: 21px;
}
#homeIndex .el-input {
  width: 524px;
}
.search {
  width: 80px;
  height: 34px;
  margin-left: 10px;
  margin-top: 15px;
  background: #368cfe !important;
}
.sign {
  border-radius: 50px;
  width: 80px;
  height: 34px;
  background: linear-gradient(180deg, #7db5ff 0%, #166de1 100%) !important;
  border: none;
}
.settle {
  border-radius: 50px;
  width: 80px;
  height: 34px;
  background: linear-gradient(180deg, #48e3dc 0%, #009f98 100%) !important;
  border: none;
}
</style>