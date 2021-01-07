import axios from 'axios'

// 运营管理机构
export const getOperationManagementData = (params,headers) => {//获取运营管理机构数据
    return axios.post('/platform-base-service/platformBaseEnterprise/managementPageQuery',
params,{headers}).then(res => res.data)};

export const activeManagement = (params,headers) => {//运营管理机构激活
    return axios.post('/platform-base-service/platformBaseEnterprise/activeManagement',
params,{headers}).then(res => res.data)};

export const loseEefficacyManagement = (params,headers) => {//运营管理机构失效
    return axios.post('/platform-base-service/platformBaseEnterprise/failManagement',
params,{headers}).then(res => res.data)};

export const addManagement = (params,headers) => {//新增运营管理机构
    return axios.post('/platform-base-service/platformBaseEnterprise/insertManagement',
params,{headers}).then(res => res.data)};

export const editManagement = (params,headers) => {//编辑运营管理机构
    return axios.post('/platform-base-service/platformBaseEnterprise/editManagement',
params,{headers}).then(res => res.data)};

export const getStatusList = (params,headers) => {//获取状态列表
    return axios.get('/platform-base-service/dictionaryType/listInternalLangByDictionaryType',
{params:params,headers:headers}).then(res => res.data)};

export const getPrincipalList  = (params,headers) => {//获取负责人列表
    return axios.post('/platform-base-service/platformBaseUserInfo/userListQuery',
params,{headers}).then(res => res.data)};

export const getBelongList = (params,headers) => {//获取归属管理机构
    return axios.get('/platform-base-service/platformBaseEnterprise/belongManagementQuery',
{params:params,headers:headers}).then(res => res.data)};


//组织机构
export const getOrganizationData = (params,headers) => {//获取组织机构数据
    return axios.post('/platform-base-service/platformBaseEnterprise/enterprisePageQuery',
params,{headers}).then(res => res.data)};

export const activeOrganization = (params,headers) => {//组织机构激活
    return axios.post('/platform-base-service/platformBaseEnterprise/activeEnterprise',
params,{headers}).then(res => res.data)};

export const loseEefficacyOrganization = (params,headers) => {//组织机构失效
    return axios.post('/platform-base-service/platformBaseEnterprise/failEnterprise',
params,{headers}).then(res => res.data)};

export const addOrganization = (params,headers) => {//新增组织机构
    return axios.post('/platform-base-service/platformBaseEnterprise/insertEnterprise',
params,{headers}).then(res => res.data)};

export const editOrganization = (params,headers) => {//编辑组织机构
    return axios.post('/platform-base-service/platformBaseEnterprise/editEnterprise',
params,{headers}).then(res => res.data)};

export const getOrganizationDetail = (params,headers) => {//获取组织机构详情
    return axios.get('/platform-base-service/platformBaseEnterprise/enterpriseDetails',
{params:params,headers:headers}).then(res => res.data)};


//部门档案
export const getDepartmentData = (params,headers) => {//获取部门档案数据
    return axios.post('/platform-base-service/platformBaseDepartment/departmentPageQuery',
params,{headers}).then(res => res.data)};

export const activeDepartment = (params,headers) => {//部门档案激活
    return axios.post('/platform-base-service/platformBaseDepartment/activeDepartment',
params,{headers}).then(res => res.data)};

export const loseEefficacyDepartment = (params,headers) => {//部门档案失效
    return axios.post('/platform-base-service/platformBaseDepartment/failDepartment',
params,{headers}).then(res => res.data)};

export const addDepartment = (params,headers) => {//新增部门档案
    return axios.post('/platform-base-service/platformBaseDepartment/insertDepartment',
params,{headers}).then(res => res.data)};

export const editDepartment = (params,headers) => {//编辑部门档案
    return axios.post('/platform-base-service/platformBaseDepartment/editDepartment',
params,{headers}).then(res => res.data)};

export const getDepartmentDetail = (params,headers) => {//获取部门详情
    return axios.get('/platform-base-service/platformBaseDepartment/departmentDetails',
{params:params,headers:headers}).then(res => res.data)};

export const getDepartmentList = (params,headers) => {//部门列表查询
    return axios.post('/platform-base-service/platformBaseDepartment/departmentListQuery',
params,{headers}).then(res => res.data)};


