import axios from 'axios'

//收款账户

export const getAccountData = (params,headers) => {//收款账户分页查询
    return axios.post('/vehicle-service/collectionAccountInfo/accountInfoPageQuery',
params,{headers}).then(res => res.data)};

export const getEnterpriseList = (params,headers) => {//查询所属公司列表
    return axios.get('/vehicle-service/comboBoxController/getEnterpriseBox',
{params:params,headers:headers}).then(res => res.data)};

export const addAccount = (params,headers) => {//新增收款账户
    return axios.post('/vehicle-service/collectionAccountInfo/insertCollectionAccount',
params,{headers}).then(res => res.data)};

export const getAccountDetail = (params,headers) => {//收款账户详情
    return axios.get('/vehicle-service/collectionAccountInfo/customerDetails',
{params:params,headers:headers}).then(res => res.data)};

export const editAccount = (params,headers) => {//编辑收款账户
    return axios.post('/vehicle-service/collectionAccountInfo/modifyCollectionAccount',
params,{headers}).then(res => res.data)};

