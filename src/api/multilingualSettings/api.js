import axios from 'axios'

// 系统语言配置
export const getListPageInfo = (params,headers) => {//获取系统语言配置分页数据
    return axios.post('/platform-base-service/langConf/listByPage',
params,{headers}).then(res => res.data)};

export const getLanguageListInfo = (params,headers) => {//获取可选语言列表
    return axios.get('/platform-base-service/langCode/list',
{params:params,headers:headers}).then(res => res.data)};

export const addLanguage = (params,headers) => {//新增语言
    return axios.post('/platform-base-service/langConf/save',
params,{headers}).then(res => res.data)};

export const publicLanguage = (params,headers) => {//发布语言
    return axios.post('/platform-base-service/langConf/publish',
params,{headers}).then(res => res.data)};

export const getTipInfo = (params,headers) => {//获取删除前提示信息
    return axios.post('/platform-base-service/langConf/getDeleteDetail',
params,{headers}).then(res => res.data)};

export const deleteLanguage = (params,headers) => {//删除语言
    return axios.post('/platform-base-service/langConf/delete',
params,{headers}).then(res => res.data)};

export const getLangDetail = (params,headers) => {//获取语言编辑详情信息
    return axios.get('/platform-base-service/langConf/getEditDetail',
{params:params,headers:headers}).then(res => res.data)};

export const editLanguage = (params,headers) => {//编辑语言
    return axios.post('/platform-base-service/langConf/edit',
params,{headers}).then(res => res.data)};



//系统语言键设置
export const getKeyPageInfo = (params,headers) => {//获取系统语言键设置分页数据
    return axios.post('/platform-base-service/langKey/listByPage',
params,{headers}).then(res => res.data)};

export const getAllLanguageType = (params,headers) => {//获取所有语言类型列表
    return axios.get('/platform-base-service/dictionaryType/listInternalLangByDictionaryType',
{params:params,headers:headers}).then(res => res.data)};

export const getLanguageType = (params,headers) => {//获取部分语言类型列表
    return axios.get('/platform-base-service/langKey/type/list',
{params:params,headers:headers}).then(res => res.data)};

export const addLangKey = (params,headers) => {//新增语言键设置
    return axios.post('/platform-base-service/langKey/save',
params,{headers}).then(res => res.data)};

export const deleteLangKey = (params,headers) => {//删除语言键设置
    return axios.post('/platform-base-service/langKey/delete',
params,{headers}).then(res => res.data)};

export const editLangKey = (params,headers) => {//编辑语言键设置
    return axios.post('/platform-base-service/langKey/update',
params,{headers}).then(res => res.data)};

export const getMenuList = (params,headers) => {//获取菜单筛选列表
    return axios.get('/platform-base-service/lang/listMenu',
{params:params,headers:headers}).then(res => res.data)};


//语言翻译
export const getTranslationData = (params,headers) => {//获取语言翻译页面数据
    return axios.post('/platform-base-service/lang/listByPage',
params,{headers}).then(res => res.data)};

export const getLangList = (params,headers) => {//获取语言列表
    return axios.get('/platform-base-service/langConf/list',
{params:params,headers:headers}).then(res => res.data)};

export const getAllLangList = (params,headers) => {//获取所有语言列表（不管有没有发布）
  return axios.get('/platform-base-service/langConf/all/list',
    {params:params,headers:headers}).then(res => res.data)};


export const getShowTypeList = (params,headers) => {//获取语言翻译页面数据
    return axios.get('/platform-base-service/dictionaryType/listInternalLangByDictionaryType',
{params:params,headers:headers}).then(res => res.data)};

export const saveTranslation = (params,headers) => {//保存语言翻译
    return axios.post('/platform-base-service/lang/update',
params,{headers}).then(res => res.data)};
