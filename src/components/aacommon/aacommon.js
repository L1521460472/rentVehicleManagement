const common = Object.create(null)
common.install = function(vue) {
	//查询条件组件
	vue.component('getSalesmanBox', ()=>import('@/components/aacommon/getSalesmanBox.vue')) //获取所属业务员
	vue.component('getContractStatus', ()=>import('@/components/aacommon/getContractStatus.vue')) //获取合同状态

  vue.component('getEnterpriseBox', ()=>import('@/components/aacommon/getEnterpriseBox.vue')) //获取所属公司
  vue.component('getBrandInfo', ()=>import('@/components/aacommon/getBrandInfo.vue')) //获取品牌
  vue.component('getvehicleType', ()=>import('@/components/aacommon/getvehicleType.vue')) //获取车型
  vue.component('getVehicle', ()=>import('@/components/aacommon/getVehicle.vue')) //获取当前企业及下属所有车辆
  vue.component('getTianjiaren', ()=>import('@/components/aacommon/getTianjiaren.vue')) //获取添加人


  vue.component('makeSelect', ()=>import('@/components/aacommon/makeSelect.vue')) //获取自定义下拉框 
}
export default common
