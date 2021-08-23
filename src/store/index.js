import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  //存储用户权限信息，初始时为空
  roles: '',
  language:'zh-cn',
  languageTitle:{},
  menuData:[],
  dialogTableVisibles:false,
  id:'',
  editId:'',//修改传的id
  isShow:true,//显示新增还是修改
  isStatus:false,//是否刷新页面
  // menuData:JSON.parse(sessionStorage.getItem(`menuData`))||[]

  openNewTab:{},//打开新的标签页
  logoAddress:"",//logo地址，默认../assets/logo.png
  defualtPage:null,//登录系统默认打开页面
  isUpdatePwdFlag:0,//是否需要修改密码，默认不需要
  UserEnterpriseId:"",//当前用户所属企业ID
  IsCollapse:false,
  systemTitle:"",
  points:[],
}

const getters = {
  getRoles: state => state.language,
  dialogTableVisibles:state=>state.dialogTableVisibles,
  isStatus:state=>state.isStatus
}

const mutations = {
  //添加用户权限，如果存在，不添加
  addRoles(state,{roles}) {
    state.roles = roles;
  },
  changeValue(state,payload){
    state.language = payload;
  },
  changeShow(state,payload){
    state.dialogTableVisibles = payload;
  },
  changeId(state,payload){
    state.id = payload;
  },
  changeEditId(state,payload){
    state.editId = payload;
  },
  changeIsShow(state,payload){
    state.isShow = payload;
  },
  changeIsStatus(state,payload){
    state.isStatus = payload;
  },
  points(state,payload){
    state.points = payload;
  },
  // setMenuData(state,menuData){
  //   sessionStorage.setItem(`menuData`, JSON.stringify(menuData))
  //   state.menuData = menuData
  // },
  openNewTab(state,router){
    state.openNewTab=router;
  },
  setlogoAddress(state,logoAddress){
    state.logoAddress = logoAddress;
  },
  setDefualtPage(state,url){
    state.defualtPage=url;
  },
  setUpdatePwdFlag(state,flag){
    state.isUpdatePwdFlag=flag;
  },
  setUserEnterpriseId(state,enterpriseid){
    state.UserEnterpriseId=enterpriseid;
  },
  setIsCollapse(state,IsCollapse){
    state.IsCollapse=IsCollapse;
  },
  setsystemTitle(state,systemTitle){
    state.systemTitle=systemTitle;
  }
}

const actions = {
  addRoles:({commit},{roles}) =>{
    commit('addRoles',{roles});
  },
  changeValue(context){
    context.commit('changeValue')
  },
  changeShow(context){
    context.commit('changeShow')
  },
  changeId(context){
    context.commit('changeId')
  },
  changeEditId(context){
    context.commit('changeEditId')
  },
  changeIsShow(context){
    context.commit('changeIsShow')
  },
  changeIsStatus(context){
    context.commit('changeIsStatus')
  },
  points(context){
    context.commit('points')
  },
  // updateMenuData(context,value){
  //   context.commit('setMenuData',value)
  // }
  openNewTab(context,router){
     context.commit('openNewTab',router)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
