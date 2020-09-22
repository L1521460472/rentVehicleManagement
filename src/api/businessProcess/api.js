import axios from 'axios'


//业务处理

export const getCustomerData = (params,headers) => {//客户信息分页查询
    return axios.post('/vehicle-service/customerInfo/customerPageQuery',
params,{headers}).then(res => res.data)};

export const addCustomerInfo = (params,headers) => {//新增客户信息
    return axios.post('/vehicle-service/customerInfo/insertCustomerInfo',
params,{headers}).then(res => res.data)};

export const getCustomerDetail = (params,headers) => {//编辑客户信息详情
    return axios.get('/vehicle-service/customerInfo/customerDetails',
{params:params,headers:headers}).then(res => res.data)};

export const editCustomerInfo = (params,headers) => {//编辑客户信息
    return axios.post('/vehicle-service/customerInfo/modifyCustomerInfo',
params,{headers}).then(res => res.data)};

// 意向订单
export const intenaionOrderData = (params,headers) => {//意向订单分页查询
    return axios.post('/vehicle-service/leaseOrderInfo/leaseOrderPageQuery',
params,{headers}).then(res => res.data)};

export const getEnterpriseList = (params,headers) => {//查询所属公司列表
    return axios.get('/vehicle-service/comboBoxController/getEnterpriseBox',
{params:params,headers:headers}).then(res => res.data)};

export const brandList = (params,headers) => {//车辆品牌列表
    return axios.post('/vehicle-service/brandInfo/brandInfoListQuery',
params,{headers}).then(res => res.data)};

export const modelsList = (params,headers) => {//车型列表
    return axios.post('/vehicle-service/vehicleTypeInfo/vehicleTypePageQuery',
params,{headers}).then(res => res.data)};

export const getSalesmanList = (params,headers) => {//业务员列表
    return axios.get('/vehicle-service/comboBoxController/getSalesmanBox',
{params:params,headers:headers}).then(res => res.data)};

export const distriSaleman = (params,headers) => {//分配业务员
    return axios.post('/vehicle-service/leaseOrderInfo/leaseOrderAssignUser',
params,{headers}).then(res => res.data)};

export const addOrder = (params,headers) => {//新增意向订单
    return axios.post('/vehicle-service/leaseOrderInfo/insertLeaseOrderInfo',
params,{headers}).then(res => res.data)};

export const getOrderDetail = (params,headers) => {//查询意向订单详情
    return axios.get('/vehicle-service/leaseOrderInfo/leaseOrderDetailQuery',
{params:params,headers:headers}).then(res => res.data)};

export const editOrder = (params,headers) => {//编辑意向订单
    return axios.post('/vehicle-service/leaseOrderInfo/modifyLeaseOrderInfo',
params,{headers}).then(res => res.data)};

export const searchModelsList = (params,headers) => {//根据品牌查车型列表
    return axios.get('/vehicle-service/vehicleTypeInfo/queryVehicleTypeListByBrandId',
{params:params,headers:headers}).then(res => res.data)};

export const supplementOrder = (params,headers) => {//订单资料补充
    return axios.post('/vehicle-service/leaseOrderInfo/leaseOrderAddMaterial',
params,{headers}).then(res => res.data)};

export const auditOrder = (params,headers) => {//审核意向订单
    return axios.post('/vehicle-service/leaseOrderInfo/leaseOrderVerify',
params,{headers}).then(res => res.data)};

//合同收租

export const contractProduceData = (params,headers) => {//合同收租分页
    return axios.post('/vehicle-service/leaseContractInfo/leaseContractInfoQueryPage',
params,{headers}).then(res => res.data)};

export const expireContractData = (params,headers) => {//即将到期合同分页查询
    return axios.post('/vehicle-service/leaseContractInfo/expiringLeaseContractQueryPage',
params,{headers}).then(res => res.data)};

export const taxesContractData = (params,headers) => {//即将交租合同分页查询
    return axios.post('/vehicle-service/leaseContractInfo/rentSoonLeaseContractQueryPage',
params,{headers}).then(res => res.data)};

export const exportContract = (params,headers) => {//合同收租导出
    return axios.post('/vehicle-service/leaseContractInfo/exportLeaseContractInfoQueryPage',
params,{headers:headers,responseType: "blob"}).then(res => res.data)};

export const checkContractData = (params,headers) => {//合同查看
    return axios.get('/vehicle-service/leaseContractInfo/goLeaseContractInfoPlanViewPage',
{params:params,headers:headers}).then(res => res.data)};

export const payFeeDetail = (params,headers) => {//跳转缴费提交页面
    return axios.get('/vehicle-service/leaseContractInfo/goLeaseContractInfoRentCollectionPage',
{params:params,headers:headers}).then(res => res.data)};

export const submitPayment = (params,headers) => {//缴费提交
    return axios.post('/vehicle-service/leaseContractInfo/leaseContractInfoSubmitPayment',
params,{headers}).then(res => res.data)};

export const getFeeAccount = (params,headers) => {//获取选中公司的账号
    return axios.get('/vehicle-service/collectionAccountInfo/queryAccountInfoByEnterpriseId',
{params:params,headers:headers}).then(res => res.data)};

export const paymentRecord = (params,headers) => {//缴费记录
    return axios.post('/vehicle-service/rentCollectionInfo/queryPagePayCostRecord',
params,{headers}).then(res => res.data)};

export const getImgsrcList = (params,headers) => {//获取附件地址
    return axios.post('/vehicle-service/efileInfo/findImgURL',
params,{headers}).then(res => res.data)};

export const conversionURL = (params,headers) => {//附件查看地址转换
    return axios.get('/vehicle-service/efileInfo/findConversionURL',
{params:params,headers:headers}).then(res => res.data)};





