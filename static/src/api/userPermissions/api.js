import axios from 'axios'

//App用户权限设置
export const getAppUserSettingsData = (params,headers) => {//获取App用户权限设置页面数据
    return axios.post('/platform-base-service/platformAppUserAuthoritySetting/listAppUserAuthorityByPage',
params,{headers}).then(res => res.data)};

export const appDeactive = (params,headers) => {//app用户权限设置失效
    return axios.post('/platform-base-service/platformAppUserAuthoritySetting/status/disabled',
params,{headers}).then(res => res.data)};

export const appAactive = (params,headers) => {//app用户权限设置激活
    return axios.post('/platform-base-service/platformAppUserAuthoritySetting/status/enabled',
params,{headers}).then(res => res.data)};

export const addAppUserSetting = (params,headers) => {//新增App用户
    return axios.post('/platform-base-service/platformAppUserAuthoritySetting/save',
params,{headers}).then(res => res.data)};

export const editAppUserSetting = (params,headers) => {//编辑App用户
    return axios.post('/platform-base-service/platformAppUserAuthoritySetting/update',
params,{headers}).then(res => res.data)};

export const getAppUserDeail = (params,headers) => {//获取app用户权限设置详情
    return axios.get('/platform-base-service/platformAppUserAuthoritySetting/getAppUserAuthorityDetail',
{params:params,headers:headers}).then(res => res.data)};

export const getBelongList = (params,headers) => {//获取归属管理机构
    return axios.get('/platform-base-service/platformBaseEnterprise/belongManagementQuery',
{params:params,headers:headers}).then(res => res.data)};

export const appUserFuctionList = (params,headers) => {//App用户功能权限列表
    return axios.post('/platform-base-service/platformBaseRole/listAppUserFunctionAuthorityByPage',
params,{headers}).then(res => res.data)};

export const appUserDataList = (params,headers) => {//App用户数据权限列表
    return axios.post('/platform-base-service/platformBaseRole/listAppUserDataAuthorityByPage',
params,{headers}).then(res => res.data)};

export const distributeFunction = (params,headers) => {//App用户功能权限分配
    return axios.post('/platform-base-service/platformAppUserAuthoritySetting/function/authority/bind',
params,{headers}).then(res => res.data)};

export const distributeData = (params,headers) => {//App用户数据权限分配
    return axios.post('/platform-base-service/platformAppUserAuthoritySetting/date/authority/bind',
params,{headers}).then(res => res.data)};

export const getStatusList = (params,headers) => {//获取状态列表
    return axios.get('/platform-base-service/dictionaryType/listInternalLangByDictionaryType',
{params:params,headers:headers}).then(res => res.data)};

// 功能权限设置
export const getFunctionsettingList = (params,headers) => {//App用户数据权限分配
    return axios.post('/platform-base-service/platformBaseRole/listAuthoritySettingByPage',
params,{headers}).then(res => res.data)};

export const getFunctionsettingList2 = (params,headers) => {//角色权限分配
    return axios.post('/platform-base-service/roleConfig/listPage',
params,{headers}).then(res => res.data)};

export const funcDeactiveStatus = (params,headers) => {//失效状态
    return axios.post('/platform-base-service/platformBaseRole/role/status/disabled',
params,{headers}).then(res => res.data)};

export const funcActiveStatus = (params,headers) => {//激活状态
    return axios.post('/platform-base-service/platformBaseRole/role/status/enabled',
params,{headers}).then(res => res.data)};

export const addFunSetting = (params,headers) => {//新增功能权限设置
    return axios.post('/platform-base-service/platformBaseRole/functionRole/add',
params,{headers}).then(res => res.data)};

export const addFunSetting2 = (params,headers) => {//角色分配-新增功能权限设置
    return axios.post('/platform-base-service/roleConfig/addFunctionRole',
params,{headers}).then(res => res.data)};

export const editFunSetting = (params,headers) => {//编辑功能权限设置
    return axios.post('/platform-base-service/platformBaseRole/functionRole/update',
params,{headers}).then(res => res.data)};

export const getFunDeail = (params,headers) => {//获取功能权限设置详情
    return axios.get('/platform-base-service/platformBaseRole/getFunctionAuthoritySettingDetail',
{params:params,headers:headers}).then(res => res.data)};

export const getTypeList = (params,headers) => {//获取下拉框状态及角色类型
    return axios.post('/platform-base-service/dictionaryType/listInternalLangByDictionaryMultType',
params,{headers}).then(res => res.data)};

export const getLoseEfficacyTip= (params,headers) => {//获取角色失效提示
    return axios.post('/platform-base-service/platformBaseRole/getStatusEnableDetail',
params,{headers}).then(res => res.data)};

export const getUndistribute = (params,headers) => {//获取待分配权限树列表
    return axios.get('/platform-base-service/platformBaseMenu/listUnassignedMenuButton',
{params:params,headers:headers}).then(res => res.data)};

export const getUndistribute2 = (params,headers) => {//账号管理-获取待分配权限树列表
    return axios.get('/platform-base-service/roleConfig/listUnassignedMenuButton',
{params:params,headers:headers}).then(res => res.data)};

export const getDistribute = (params,headers) => {//获取已分配权限树列表
    return axios.get('/platform-base-service/platformBaseMenu/listAssignedMenuButton',
{params:params,headers:headers}).then(res => res.data)};

export const distributeFun = (params,headers) => {//分配功能权限
    return axios.post('/platform-base-service/platformBaseRole/assignFunctionPermission',
params,{headers}).then(res => res.data)};
