import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Tips from '@/components/Tips'
import $ from "jquery"
import { getCookie } from '../public'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path:'/home',
    name:'home',
    component:Home,
    children:[
      {
        path: '/homeIndex',
        name: 'homeIndex',
        component: () => import('../components/home/home.vue')
      },
      {
        path: '/menuButton',
        name: 'menuButton',
        component: () => import('../components/menuButton.vue')
      },
      {
        path: '/dictionaries',
        name: 'dictionaries',
        component: () => import('../components/dictionaries.vue')
      },
      {
        path: '/messageSetting',
        name: 'messageSetting',
        component: () => import('../components/messageSetting.vue')
      },
      //多语言设置
      {
        path: '/languageConfiguration',
        name: 'languageConfiguration',
        component: () => import('../components/languageSetting/languageConfiguration.vue')
      },
      {
        path: '/LanguageKeySettings',
        name: 'LanguageKeySettings',
        component: () => import('../components/languageSetting/LanguageKeySettings.vue')
      },
      {
        path: '/languageTranslation',
        name: 'languageTranslation',
        component: () => import('../components/languageSetting/languageTranslation.vue')
      },
      // 档案管理
      {
        path: '/operationManagement',
        name: 'operationManagement',
        component: () => import('../components/archivesMananement/operationManagement.vue')
      },
      {
        path: '/addOperation',
        name: 'addOperation',
        component: () => import('../components/archivesMananement/addOperation.vue')
      },
      {
        path: '/organization',
        name: 'organization',
        component: () => import('../components/archivesMananement/organization.vue')
      },
      {
        path: '/addOrganization',
        name: 'addOrganization',
        component: () => import('../components/archivesMananement/addOrganization.vue')
      },

      {
        path: '/departmentArchives',
        name: 'departmentArchives',
        component: () => import('../components/archivesMananement/departmentArchives.vue')
      },
      {
        path: '/addDepartment',
        name: 'addDepartment',
        component: () => import('../components/archivesMananement/addDepartment.vue')
      },
      {
        path: '/userArchives',
        name: 'userArchives',
        component: () => import('../components/archivesMananement/userArchives.vue')
      },
      //用户权限
      {
        path: '/operationUserPermission',
        name: 'operationUserPermission',
        component: () => import('../components/userPermission/operationUserPermission.vue')
      },
      {
        path: '/platformUserPermissions',
        name: 'platformUserPermissions',
        component: () => import('../components/userPermission/platformUserPermissions.vue')
      },
      {
        path: '/appUserSettings',
        name: 'appUserSettings',
        component: () => import('../components/userPermission/appUserSettings.vue')
      },
      {
        path: '/addAppUserSetting',
        name: 'addAppUserSetting',
        component: () => import('../components/userPermission/addAppUserSetting.vue')
      },
      {
        path: '/functionPermissionSettings',
        name: 'functionPermissionSettings',
        component: () => import('../components/userPermission/functionPermissionSettings.vue')
      },
      {
        path: '/addFunSetting',
        name: 'addFunSetting',
        component: () => import('../components/userPermission/addFunSetting.vue')
      },
      {
        path: '/dataPermissionSettings',
        name: 'dataPermissionSettings',
        component: () => import('../components/userPermission/dataPermissionSettings.vue')
      },
      {
        path: '/addOperationUser',
        name: 'addOperationUser',
        component: () => import('../components/userPermission/addOperationUser.vue')
      },
      {
        path: '/addPlatformUser',
        name: 'addPlatformUser',
        component: () => import('../components/userPermission/addPlatformUser.vue')
      },
      {
        path: '/addUserArchives',
        name: 'addUserArchives',
        component: () => import('../components/archivesMananement/addUserArchives.vue')
      },
      {
        path: '/addDataPermission',
        name: 'addDataPermission',
        component: () => import('../components/userPermission/addDataPermission.vue')
      },
      {
        path: '/editDataPermission',
        name: 'editDataPermission',
        component: () => import('../components/userPermission/editDataPermission.vue')
      },
      // 监控中心
      {
        path:'/realTimemonitoring',
        name: 'realTimemonitoring',
        component: () => import('../components/monitorCenter/realTimemonitoring.vue')
      },
      {
        path:'/trackPlayback',
        name: 'trackPlayback',
        component: () => import('../components/monitorCenter/trackPlayback.vue')
      },
      // 违章处理
      {
        path:'/illegalProcessing',
        name: 'illegalProcessing',
        component: () => import('../components/trafficProcessing/illegalProcessing/illegalProcessing.vue')
      },
      {
        path:'/addillegal',
        name: 'addillegal',
        component: () => import('../components/trafficProcessing/illegalProcessing/addillegal.vue')
      },
      {
        path:'/dealWithillegal',
        name: 'dealWithillegal',
        component: () => import('../components/trafficProcessing/illegalProcessing/dealWithillegal.vue')
      },
      {
        path:'/auditillegal',
        name: 'auditillegal',
        component: () => import('../components/trafficProcessing/illegalProcessing/auditillegal.vue')
      },
      {
        path:'/illegalVehicle',
        name: 'illegalVehicle',
        component: () => import('../components/trafficProcessing/illegalProcessing/illegalVehicle.vue')
      },
      {
        path:'/illegalbatchQuery',
        name: 'illegalbatchQuery',
        component: () => import('../components/trafficProcessing/illegalProcessing/illegalbatchQuery.vue')
      },
      {
        path:'/illegalDetail',
        name: 'illegalDetail',
        component: () => import('../components/trafficProcessing/illegalProcessing/illegalDetail.vue')
      },
      {
        path:'/illegalResult',
        name: 'illegalResult',
        component: () => import('../components/trafficProcessing/illegalProcessing/illegalResult.vue')
      },
      // 业务处理
      // 客户信息
      {
        path:'/customerInformation',
        name: 'customerInformation',
        component: () => import('../components/businessProcess/customerInformation/customerInformation.vue')
      },
      {
        path:'/addCustomerInfo',
        name: 'addCustomerInfo',
        component: () => import('../components/businessProcess/customerInformation/addCustomerInfo.vue')
      },
      // 意向订单
      {
        path:'/intentionOrder',
        name: 'intentionOrder',
        component: () => import('../components/businessProcess/intentionOrder/intentionOrder.vue')
      },
      // 新增/编辑订单
      {
        path:'/addOrder',
        name: 'addOrder',
        component: () => import('../components/businessProcess/intentionOrder/addOrder.vue')
      },
      // 补充资料
      {
        path:'/addInfo',
        name: 'addInfo',
        component: () => import('../components/businessProcess/intentionOrder/addInfor.vue')
      },
      //审核/详情
      {
        path:'/auditOrder',
        name: 'auditOrder',
        component: () => import('../components/businessProcess/intentionOrder/auditOrder.vue')
      },
      // 合同收租
      {
        path:'/contractProduce',
        name: 'contractProduce',
        component: () => import('../components/businessProcess/contractProduce/contractProduce.vue')
      },
      // 合同查看
      {
        path:'/checkContract',
        name: 'checkContract',
        component: () => import('../components/businessProcess/contractProduce/checkContract.vue')
      },
      // 缴费提交
      {
        path:'/payFee',
        name: 'payFee',
        component: () => import('../components/businessProcess/contractProduce/payFee.vue')
      },
      // 重新缴费提交
      {
        path:'/repayFee',
        name: 'repayFee',
        component: () => import('../components/businessProcess/contractProduce/repayFee.vue')
      },
      // 缴费记录
      {
        path:'/paymentRecord',
        name: 'paymentRecord',
        component: () => import('../components/businessProcess/paymentRecord/paymentRecord.vue')
      },
      //车型维护
      {
        path:'/vehicleMaintenance',
        name: 'vehicleMaintenance',
        component: () => import('../components/trafficProcessing/vehicleMaintenance/vehicleMaintenance.vue')
      },
      {
        path:'/addVehicleMaintenance',
        name: 'addVehicleMaintenance',
        component: () => import('../components/trafficProcessing/vehicleMaintenance/addVehicleMaintenance.vue')
      },
      //车辆管理
      {
        path:'/vehicleManagement',
        name: 'vehicleManagement',
        component: () => import('../components/trafficProcessing/vehicleManagement/vehicleManagement.vue')
      },
      {
        path:'/addVehicleManagement',
        name: 'addVehicleManagement',
        component: () => import('../components/trafficProcessing/vehicleManagement/addVehicleManagement.vue')
      },
      {
        path:'/addInsurance',
        name: 'addInsurance',
        component: () => import('../components/trafficProcessing/vehicleManagement/addInsurance.vue')
      },
      {
        path:'/addAS',
        name: 'addAS',
        component: () => import('../components/trafficProcessing/vehicleManagement/addAS.vue')
      },
      //存车地点
      {
        path:'/saveCarLocation',
        name: 'saveCarLocation',
        component: () => import('../components/trafficProcessing/saveCarLocation/saveCarLocation.vue')
      },
      //一键上传
      {
        path:'/keyToUpload',
        name: 'keyToUpload',
        component: () => import('../components/trafficProcessing/keyToUpload/keyToUpload.vue')
      },
      //合同登记
      {
        path:'/contractRegistration',
        name: 'contractRegistration',
        component: () => import('../components/financialTransaction/contractRegistration.vue')
      },
      //计划登记
      {
        path:'/planRegister',
        name: 'planRegister',
        component: () => import('../components/financialTransaction/planRegister.vue')
      },
      //计划变更
      {
        path:'/planChange',
        name: 'planChange',
        component: () => import('../components/financialTransaction/planChange.vue')
      },
      //计划变更记录
      {
        path:'/planChangeRecord',
        name: 'planChangeRecord',
        component: () => import('../components/financialTransaction/planChangeRecord.vue')
      },
      //计划审核
      {
        path:'/planAudit',
        name: 'planAudit',
        component: () => import('../components/financialTransaction/planAudit.vue')
      },
      //计划审核
      {
        path:'/planLook',
        name: 'planLook',
        component: () => import('../components/financialTransaction/planLook.vue')
      },
      //收租台账
      {
        path:'/rentParameter',
        name: 'rentParameter',
        component: () => import('../components/financialTransaction/rentParameter.vue')
      },
      //查看合同缴费记录
      {
        path:'/lookContractPayment',
        name: 'lookContractPayment',
        component: () => import('../components/financialTransaction/lookContractPayment.vue')
      },
      //退车结算
      {
        path:'/backVehicle',
        name: 'backVehicle',
        component: () => import('../components/financialTransaction/backVehicle.vue')
      },
      //退车结算详情
      {
        path:'/backVehicleDetail',
        name: 'backVehicleDetail',
        component: () => import('../components/financialTransaction/backVehicleDetail.vue')
      },
      //退车结算审核
      {
        path:'/backVehicleAudit',
        name: 'backVehicleAudit',
        component: () => import('../components/financialTransaction/backVehicleAudit.vue')
      },
      //查看合同车辆记录
      {
        path:'/lookVehicle',
        name: 'lookVehicle',
        component: () => import('../components/financialTransaction/lookVehicle.vue')
      },
      //查看车辆实时监控
      {
        path:'/vehicleMonitoring',
        name: 'vehicleMonitoring',
        component: () => import('../components/financialTransaction/vehicleMonitoring.vue')
      },
      //查看车辆实时监控
      {
        path:'/backLookVehicle',
        name: 'backLookVehicle',
        component: () => import('../components/financialTransaction/backLookVehicle.vue')
      },
      //预收款核销
      {
        path:'/advancesReceived',
        name: 'advancesReceived',
        component: () => import('../components/financialTransaction/advancesReceived.vue')
      },
      //缴费审核
      {
        path:'/payAuditing',
        name: 'payAuditing',
        component: () => import('../components/financialTransaction/payAuditing.vue')
      },
      //审核操作
      {
        path:'/audit',
        name: 'audit',
        component: () => import('../components/financialTransaction/audit.vue')
      },
      {
        path:'/paymentAccount',
        name: 'paymentAccount',
        component: () => import('../components/financialTransaction/paymentAccount.vue')
      },
      {
        path:'/addAccount',
        name: 'addAccount',
        component: () => import('../components/financialTransaction/addAccount.vue')
      },
      //收租台账报表
      {
        path:'/rentsReport',
        name: 'rentsReport',
        component: () => import('../components/reportManager/rentsReport.vue')
      },
      //首页工作台
      {
        path:'/mainWorkDesk',
        name: 'mainWorkDesk',
        component: () => import('../components/workDesk/mainWorkDesk.vue')
      },
      //财务工作台
      {
        path:'/financialWorkDesk',
        name: 'financialWorkDesk',
        component: () => import('../components/workDesk/financialWorkDesk.vue')
      },
      //车管工作台
      {
        path:'/vehicleWorkDesk',
        name: 'vehicleWorkDesk',
        component: () => import('../components/workDesk/vehicleWorkDesk.vue')
      },
      //业务工作台
      {
        path:'/businessWorkDesk',
        name: 'businessWorkDesk',
        component: () => import('../components/workDesk/businessWorkDesk.vue')
      },
      //提醒处理
      {
        path:'/remindProcess',
        name: 'remindProcess',
        component: () => import('../components/remind/remindProcess.vue')
      },
      //修改密码
      {
        path:'/changePassword',
        name: 'changePassword',
        component: () => import('../components/changePassword.vue')
      } ,
      //推荐车型设置
      {
        path:'/recommendVehicleType',
        name: 'recommendVehicleType',
        component: () => import('../components/recommendVehicleType.vue')
      },
      //个人中心
      {
        path:'/myCenter',
        name: 'myCenter',
        component: () => import('../components/myCenter.vue')
      },
      //账号管理
      {
        path:'/accountManager',
        name: 'accountManager',
        component: () => import('../components/accountManager/accountManager.vue')
      },
      //角色配置
      {
        path:'/roleSetting',
        name: 'roleSetting',
        component: () => import('../components/accountManager/roleSetting.vue')
      },
      //账号管理-新增用户
      {
        path:'/accountManagerAddUser',
        name: 'accountManagerAddUser',
        component: () => import('../components/accountManager/accountManagerAddUser.vue')
      },
      //账号管理-新增角色
      {
        path:'/roleaddFunSetting',
        name: 'roleaddFunSetting',
        component: () => import('../components/accountManager/roleaddFunSetting.vue')
      },
      //充值页面
      {
        path:'/pay',
        name: 'pay',
        component: () => import('../components/payCenter/pay.vue')
      },
      //在线充值页面
      {
        path:'/onlinepay',
        name: 'onlinepay',
        component: () => import('../components/payCenter/onlinepay.vue')
      },
       //充值记录
      {
        path:'/payrecord',
        name: 'payrecord',
        component: () => import('../components/payCenter/payrecord.vue')
      },
       //扣费记录
      {
        path:'/chargerecord',
        name: 'chargerecord',
        component: () => import('../components/payCenter/chargerecord.vue')
      },
       //用户操作记录
      {
        path:'/userOperateLogs',
        name: 'userOperateLogs',
        component: () => import('../components/reportManager/userOperateLogs.vue')
      },
      //发票管理
      {
        path:'/listPage',
        name: 'listPage',
        component: () => import('../components/InvoiceRecord/listPage.vue')
      },
      //新开发票
      {
        path:'/AddInvoice',
        name: 'AddInvoice',
        component: () => import('../components/InvoiceRecord/AddInvoice.vue')
      },
      //发票记录
      {
        path:'/listPageInvoice',
        name: 'listPageInvoice',
        component: () => import('../components/InvoiceRecord/listPageInvoice.vue')
      },
      //发票记录
      {
        path:'/invoiceDetail',
        name: 'invoiceDetail',
        component: () => import('../components/InvoiceRecord/invoiceDetail.vue')
      },
      //品牌车辆车型数统计报表
      {
        path:'/brandVehicleTypeVehicleNum',
        name: 'brandVehicleTypeVehicleNum',
        component: () => import('../components/reportManager/brandVehicleTypeVehicleNum.vue')
      },
       //存车地点车辆数报表
      {
        path:'/parkingLotVehicleNum',
        name: 'parkingLotVehicleNum',
        component: () => import('../components/reportManager/parkingLotVehicleNum.vue')
      },
       //业务员关联统计报表
      {
        path:'/salesManRelationStatistics',
        name: 'salesManRelationStatistics',
        component: () => import('../components/reportManager/salesManRelationStatistics.vue')
      },
       //渠道账户收款统计报表
      {
        path:'/collectionAccountStatistics',
        name: 'collectionAccountStatistics',
        component: () => import('../components/reportManager/collectionAccountStatistics.vue')
      },
       //锁车记录
      {
        path:'/vehicleLockRecord',
        name: 'vehicleLockRecord',
        component: () => import('../components/trafficProcessing/vehicleLockRecord/vehicleLockRecord.vue')
      },
       //锁车车辆列表
      {
        path:'/vehicleLockPageList',
        name: 'vehicleLockPageList',
        component: () => import('../components/trafficProcessing/vehicleLockRecord/vehicleLockPageList.vue')
      }
    ]
  }
]

const router = new Router({
  // mode: 'history', // 打包的时候有这句的删掉，没有就不用管
  base: process.env.BASE_URL,
  routes,
  parseQuery:(query)=>{
   if(query){
     return JSON.parse(decodeURIComponent(escape(window.atob(query))))
   }else{
     return Object.create(null)
   }
  },
  stringifyQuery:(obj)=>{
    if(Object.keys(obj).length>0){
      return `?${window.btoa(unescape(encodeURIComponent(JSON.stringify(obj))))}`
    }
    else{
      return ""
    }
  }
})

router.beforeEach((to, from, next) => {
  //获取用户权限信息，为空即没登录，跳转至登录页
  if (to.path === '/login') {
    next();
  } else {
    if (!getCookie('HTBD_PASS')) {
      next('/login');
    } else {
      next();
    }
  }
  next()
});

export default router;
