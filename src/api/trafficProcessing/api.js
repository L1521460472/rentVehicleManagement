import axios from 'axios'


//违章处理

export const getIllegalData = (params,headers) => {//获取违章处理分页数据
    return axios.post('/vehicle-service/violationInfo/queryPageViolationInfo',
params,{headers}).then(res => res.data)};

export const getEnterpriseList = (params,headers) => {//查询所属公司列表
    return axios.get('/vehicle-service/comboBoxController/getEnterpriseBox',
{params:params,headers:headers}).then(res => res.data)};

export const getSalesmanList = (params,headers) => {//查询所属业务员列表
    return axios.get('/vehicle-service/comboBoxController/getSalesmanBox',
{params:params,headers:headers}).then(res => res.data)};

export const getImgsrcList = (params,headers) => {//获取附件地址
    return axios.post('/vehicle-service/efileInfo/findImgURL',
params,{headers}).then(res => res.data)};


export const addIllegal = (params,headers) => {//违章登记
    return axios.post('/vehicle-service/violationInfo/addViolationInfo',
params,{headers}).then(res => res.data)};

export const editIllegalDetail = (params,headers) => {//违章编辑详情
    return axios.get('/vehicle-service/violationInfo/goEditViolationPage',
{params:params,headers:headers}).then(res => res.data)};

export const editIllegal = (params,headers) => {//违章修改
    return axios.post('/vehicle-service/violationInfo/updateViolationInfo',
params,{headers}).then(res => res.data)};

export const getVehicleList = (params,headers) => {//查询车牌号列表
    return axios.get('/vehicle-service/comboBoxController/fuzzySearchVehicle',
{params:params,headers:headers}).then(res => res.data)};

export const getHandleVehicleDetail = (params,headers) => {//车辆处理详情
    return axios.get('/vehicle-service/violationInfo/goHandlingViolationPage',
{params:params,headers:headers}).then(res => res.data)};

export const handleIllegal = (params,headers) => {//违章处理
    return axios.post('/vehicle-service/violationInfo/handlingViolation',
params,{headers}).then(res => res.data)};

export const getAuditVehicleDetail = (params,headers) => {//车辆审核详情
    return axios.get('/vehicle-service/violationInfo/goAuditViolationPage',
{params:params,headers:headers}).then(res => res.data)};

export const auditIllegal = (params,headers) => {//审核车辆违章
    return axios.post('/vehicle-service/violationInfo/auditViolation',
params,{headers}).then(res => res.data)};

export const getLookDetail = (params,headers) => {//车辆查看详情
    return axios.get('/vehicle-service/violationInfo/findViolationInfoDetails',
{params:params,headers:headers}).then(res => res.data)};

