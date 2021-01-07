import axios from 'axios'

// 轨迹回放
export const getTrackPlayPoint = (params,headers) => {//获取轨迹回放点集合
    return axios.post('/vehicle-service/trackPlayback/trackPlaybackQuery',
params,{headers}).then(res => res.data)};

export const getEnterpriseTree = (params,headers) => {//获取企业树
    return axios.get('/vehicle-service/trackPlayback/getEnterpriseTree',
{params:params,headers:headers}).then(res => res.data)};

export const getEnterpriseCars = (params,headers) => {//获取企业归属车辆
    return axios.post('/vehicle-service/trackPlayback/selectListByPage',
params,{headers}).then(res => res.data)};

