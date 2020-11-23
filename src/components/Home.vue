<template>
  <div id="home">
    <el-container>
      <el-header>
        <div class="top-bar">
          <div class="logo">
            <h1>
              <img :src="$store.state.logoAddress" alt="" v-if="$store.state.logoAddress">
              <img src="../assets/logo.png" alt="" v-else>
              租车管理系统
            </h1>
          </div>
          <div class="isMenu" @click="changeIsCollapse">
            <el-radio-group v-model="isCollapse">
            <img v-if="!isCollapse" src="../assets/Frame@1x-8.png" alt="">
            <img v-else src="../assets/Frame@1x-9.png" alt="">
            </el-radio-group>
          </div>
          <div class="setting-btn">
            <el-popover ref="setting-btn-popover" width="60" placement="bottom" trigger="hover" style="min-width: 60px;">
              <el-button type="text" class='setting-popover-item' @click="jumptomycenter">个人中心</el-button>
              <el-button type="text" class='setting-popover-item' @click="changePassword">修改密码</el-button>
              <el-button type="text" class="setting-popover-item" @click="logout">退出</el-button>
            </el-popover>
            <el-button type="text" v-popover:setting-btn-popover class="logout"> {{userName}} <i class="el-icon-arrow-down"/></el-button>
          </div>
        </div>
      </el-header>
      <el-container style="height: calc(100% - 48px);">
        <el-aside width="null">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            unique-opened
            :default-openeds="openeds_value"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#FAFAFA"
            text-color="#333333"
            active-text-color="#368CFE"
            router
          >
            <!-- 一级菜单 -->
            <template v-for="item in menuItems">
              <el-submenu
                v-if="item.children && item.children.length && item.show"
                :index="item.url"
                :key="item.id"
              >
                <template slot="title">
                  <i :class="'iconfont ' + item.icon"></i>
                  <span>{{ item.name }}</span>
                </template>
                <!-- 二级菜单 -->
                <template v-for="subItem in item.children" @click="addTable(subItem)">
                  <el-submenu
                    v-if="subItem.children && subItem.children.length && subItem.show"
                    :index="subItem.url"
                    :key="subItem.id"
                  >
                    <template slot="title">
                      <i :class="'iconfont ' + subItem.icon"></i>
                      <span>{{ subItem.name }}</span>
                    </template>

                    <!-- 三级菜单 -->
                    <el-menu-item
                      class="threeMenu"
                      v-for="threeItem in subItem.children"
                      :index="threeItem.url"
                      :key="threeItem.id"
                      @click="addTable(threeItem)"
                      ><i :class="'iconfont ' + threeItem.icon"></i
                      ><span slot="title">{{
                        threeItem.name
                      }}</span></el-menu-item
                    >
                  </el-submenu>

                  <el-menu-item v-else :index="subItem.url" :key="subItem.id" @click="addTable(subItem)"
                    ><i :class="'iconfont ' + subItem.icon"></i
                    ><span slot="title">{{ subItem.name }}</span></el-menu-item
                  >
                </template>
              </el-submenu>

              <el-menu-item v-else :index="item.url" :key="item.id"
                ><i :class="'iconfont ' + item.icon"></i
                ><span slot="title">{{ item.name }}</span></el-menu-item
              >
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="mainHerder">
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              @tab-click="tabClick"
              closable
              @tab-remove="removeTab"
            >
              <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
              </el-tab-pane>
            </el-tabs>
          </div>
          <keep-alive
          :include=includeList
          exclude="addOperationUser,addPlatformUser,addDepartment,addOrganization,addOperation,addFunSetting,addAppUserSetting,addUserArchives,addDataPermission,editDataPermission,addillegal,dealWithillegal,auditillegal,addCustomerInfo,addOrder,auditOrder,addInfo,addVehicleMaintenance,addVehicleManagement,addInsurance,addAS,planRegister,checkContract,payFee,planChange,planAudit,planLook,addAccount,audit,lookContractPayment,advancesReceived,backVehicle,backVehicleAudit,lookVehicle,vehicleMonitoring,backLookVehicle,mainWorkDesk,vehicleWorkDesk,businessWorkDesk,financialWorkDesk" v-if="isKeep">
            <router-view v-if="isRouterAlive" />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { getCookie, setCookie, removeCookie, getMenuBtnList,openNewTab } from "../public";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {
      value: "zh-cn",
      options: [],
      userName:'',
      isKeep:true,
      openeds_value: ['vehicleMonitoring'],//"ccc", "ces98"
      menuItems: [],
      // languageTitle:{},
      isCollapse: false,
      isRouterAlive: true,
      //tabs
      editableTabsValue: "2",
      editableTabs: [
        // {
        //   title: "菜单按钮管理",
        //   name: "/button_menu_url",
        // },
      ],
      tabIndex: 2,
      includeList:[]//需要缓存的组件名
    };
  },
  methods: {
    changeIsCollapse(){//展开,收缩
      this.isCollapse = !this.isCollapse;
    },
    getRouter() {
      axios({
        method: "get",
        url: "/platform-base-service/platformBaseMenu/listMenuButtonByUserId",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.menuItems = result.data.data;
          // this.setMenuData({menuData: result.data.data});
          // this.updateMenuData(result.data.data)
          this.$store.state.menuData = result.data.data;
          // openNewTab(this, result.data.data[0].children[0].children[0].name, result.data.data[0].children[0].children[0].url);
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    //点击Tabs
    tabClick(tab) {
      this.$router.push({
        path: this.editableTabsValue,
      });
    },
    //增加tabs
    addTable(menu,flag) {
      // console.log(menu);
      var isTabs = false;
      for (var i = 0; i < this.editableTabs.length; i++) {
        if (menu.name == this.editableTabs[i].title) {
          isTabs = true;
          break;
        }
      }
      if (isTabs == true) {
        this.editableTabsValue = menu.url;
        if(flag){
           this.$router.push({ path: menu.url, query: menu.params})
        }
        return;
      }
      this.tabIndex = menu.url;
      this.editableTabs.push({
        title: menu.name,
        name: menu.url,
      });
      this.editableTabsValue = menu.url;
      if(this.includeList.indexOf(this.$route.name) == -1){
        this.includeList.push(this.$route.name)
      }
      if(flag){
         this.$router.push({ path: menu.url, query: menu.params})
      }
    },
    //删除tabs
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
        this.$router.go(-1);
      }
      // console.log(this.$route.path)
      // console.log(this.$router.history.current.name)
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      // this.$destroy();
      let componentName = targetName.substring(1)
      this.includeList.splice(this.includeList.indexOf(componentName),1)

    },
    logout() {
      this.$router.push("/");
    },
    //修改密码
    changePassword(){
      openNewTab(this,"修改密码","/changePassword")
    },
    getLanguage() {
      // console.log(this.$store.state.language)
      axios({
        method: "get",
        url: "/platform-base-service/langConf/list",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.options = result.data.data;
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    // 获取国际化标题按钮等
    getInternationalTitle() {
      axios({
        method: "get",
        url: "/platform-base-service/lang/listFieldGlobal",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((res) => {
          // this.languageTitle = res.data.data
          this.$store.state.languageTitle = res.data.data;
          this.getRouter();
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    changeValue() {
      //简体中文，繁体中文，英文切换
      this.$store.commit("changeValue", this.value);
      this.getInternationalTitle();
      this.getLanguage();
      this.editableTabs = [];
      this.isKeep = false;
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
        this.isKeep = true;
      });
    },
    //个人中心
    jumptomycenter(){
        openNewTab(this,"个人中心","/myCenter")
    }
  },
  beforeMount() {
    this.getInternationalTitle();
  },
  mounted() {
    this.getLanguage();
    this.userName = getCookie("HTBD_UserName");
    this.$store.commit("changeValue", this.value);
    // this.$router.push("/contractRegistration");
    this.includeList.push(this.$route.name);
  },
  computed:{
    openNewTab:function(){
      return this.$store.state.openNewTab;
    }
  },
  watch: {
     openNewTab:function(router){
      this.addTable(router,true);
    }
  },
};
</script>

<style>
#home {
  width: 100%;
  min-width: 1440px;
  height: 100%;
  min-height: 700px;
}
.left-bar {
  float: left;
  width: 200px;
  height: 100%;
  background: rgb(226, 224, 224);
}
h1,
b,
strong {
  font-weight: normal;
  font-size: 100%;
}
li {
  list-style: none;
}
.right-content {
  overflow: hidden;
  height: 100%;
  padding: 30px;
}
#home {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.root-container {
  position: relative;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  height: 48px !important;
  padding: 0 !important;
  background: #00284d;
  border-bottom: 1px solid #00284d;
}
.el-aside {
  height: 100%;
  float: left;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  float: left;
  background: #FAFAFA;
}
.el-menu-vertical-demo {
  height: 100%;
  float: left;
}
.el-main{
  padding: 20px;
  float: left;
}
.el-submenu__title{
  border-bottom: 1px solid #DEE4F0 !important;
}
.el-submenu__title:hover {
  background-color: rgba(54, 140, 254, 0.1) !important;
  color: #368cfe !important;
}
.el-menu-item:hover {
  background-color: rgba(54, 140, 254, 0.1) !important;
  color: #368cfe !important;
}
.el-menu-item {
  background-color: #fff !important;
  border-bottom: 1px solid #DEE4F0;
}
.el-menu-item.is-active{
  background-color: rgba(54, 140, 254, 0.1) !important;
  padding: 0 !important;
  border-left: 4px solid #368CFE !important;
}
/* .el-main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
} */
.mainHerder{
  width: 100%;
  height: 60px;
}
.content-body {
  height: 100%;
}
.top-bar {
  width: 100%;
  /* min-width:1316px; */
  height: 100%;
  height: 48px;
  /* background: #212121; */
}
.top-bar .el-button {
  /* color: #000 !important; */
  /* border: 1px solid #212121 !important; */
}
.el-tabs__item{
  color: #333333;
}
.el-submenu .el-menu--inline .el-menu-item span{
  color: #666666;
}
.el-menu-item.is-active span{
  color: #368cfe !important;
  padding-left: 36px !important;
}
.threeMenu.is-active span{
  padding-left: 56px !important;
}
.language {
  float: right;
  margin-top: 3px;
  margin-right: 20px;
}
.language .el-input {
  width: 150px !important;
  margin-top: 5px;
}
/* .language .el-input .el-input--suffix{
  width: 100px !important;
} */
.logo {
  width: 200px;
  box-sizing: border-box;
  padding-left: 20px;
  height: 100%;
  float: left;
  font-size: 24px;
  color: #fff;
  display: flex;
  align-items: center;
}
.logo h1{
  font-size: 18px;
  display: flex;
  align-items: center;
}
.logo h1 img{
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-right: 5px;
}
.isMenu{
  width: 48px;
  height: 48px;
  float: left;
  line-height: 48px;
  cursor: pointer;
}
.setting-btn {
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
}
.logout {
  margin-right: 35px !important;
  color: #fff !important;
}
/* .el-button {
 margin-right: 35px;
} */
.logout:hover {
  color: #fbd198 !important;
}
.el-popover {
  min-width: 60px !important;
 /* padding: 0 12px !important;
  text-align: center !important; */
  /* background: #313131 !important; */
}
.setting-popover-item {
  display: block !important;
  line-height: 10px !important;
  /* border: 1px solid #212121 !important; */
}
.el-popover .el-button--text {
  color: #333 !important;
  /* border: 1px solid #212121 !important; */
}
.el-popover .el-button--text:hover {
  color: #666 !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-table::before {
  height: 0;
}
/* 表格状态的颜色/ */
.activeStatus{
    color: #25A092;
}
.deactiveStatus{
    color: #FF4444;
}
/* 按钮icon */
.el-button--small i{
    font-size: 12px;
    margin-right: 2px;
}

/* 弹框 */
.messageBox-prompt-test .el-message-box__input{
  width: 200px !important;
  padding: 0 !important;
  display: inline-block;
  /* float: left; */
}
.messageBox-prompt-test .el-message-box__container{
  width: 80px !important;
  display: inline-block;
  /* float: left; */
}
</style>
<style scoped>

  .el-button+.el-button {
      margin-left: unset!important;
  }
</style>
