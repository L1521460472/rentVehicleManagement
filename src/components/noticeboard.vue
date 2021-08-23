<template>
    <div class="headers">
        <div class="title">
            <div v-if="disabled" class="titleTop">请按F11开启全屏看板</div>
            <div class="titleLeft">
                <img :src="imageUrl" alt="">
                <div class="titleText"><span class="gradient-text gradient-text-one">{{systemName}} <span class="lookData">数据看板</span></span></div>
            </div>
            <div class="titleRight">
                <div v-for="(item,index) in dateStr" :key="index">
                    <div class="year" v-if="index == 3"><div class="timeList">{{item}}</div> <div class="yeartext">年</div> </div>
                    <div class="month" v-else-if="index == 5"><span class="timeList">{{item}}</span> <span class="monthtext">月</span> </div>
                    <div class="date" v-else-if="index == 7"><span class="timeList">{{item}}</span> <span class="datetext">日</span> </div>
                    <div class="hours" v-else-if="index == 9 || index == 11"><span class="timeList">{{item}}</span> <span class="hourstext">:</span> </div>
                    <div class="timeList" v-else>{{item}}</div>
                </div>
                <img @click="handleClick" :src="image" alt="">
            </div>
        </div>
        <hr>
        <div class="banner">
            <div class="bannerLeft">
                <div class="box1">
                    <div class="image-box image-box1"></div>
                    <div class="image-box image-box2"></div>
                    <div class="image-box image-box3"></div>
                    <div class="image-box image-box4"></div>
                    <div class="boxTop">
                        <div class="boxTitle">实时统计</div>
                        <div class="boxBanner">
                            <el-row type="flex" justify='space-between'>
                                <el-col :span="12">
                                    <div class="contentList">
                                        <div class="contentListLeft"><img src="../assets/noticeboard/icon_车辆.svg" alt=""></div>
                                        <div class="contentListRight">
                                            <div class="boxText">车辆总数(辆)</div>
                                            <div class="boxNum1">{{totalVehicleNums}}</div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="contentList">
                                        <div class="contentListLeft"><img src="../assets/noticeboard/icon_车辆在线.svg" alt=""></div>
                                        <div class="contentListRight">
                                            <div class="boxText">当前在线数(辆)</div>
                                            <div class="boxNum2">{{onlineVehicleNums}}</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify='space-between'>
                                <el-col :span="12">
                                    <div class="contentList">
                                        <div class="contentListLeft"><img src="../assets/noticeboard/icon_在租车辆.svg" alt=""></div>
                                        <div class="contentListRight">
                                            <div class="boxText">在租车辆</div>
                                            <div class="boxNum3">{{rentingVehicleNums}}</div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="contentList">
                                        <div class="contentListLeft"><img src="../assets/noticeboard/icon_活跃率.svg" alt=""></div>
                                        <div class="contentListRight">
                                            <div class="boxText">车辆利用率(%)</div>
                                            <div class="boxNum4">{{vehicleUtilization * 100}}</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="boxFooter">
                        <div class="boxBg">本月总行驶里程(km)</div>
                        <div class="boxNumber1">{{monthlyMileage}}</div>
                        <div class="boxBg">离线设备数(辆)</div>
                        <div class="boxNumber2">{{number}}</div>
                    </div>
                </div>
                <div class="box">
                    <div class="image-box image-box1"></div>
                    <div class="image-box image-box2"></div>
                    <div class="image-box image-box3"></div>
                    <div class="image-box image-box4"></div>
                    <div class="boxTitle">车型分类</div>
                    <div class="boxBanner">
                        <div id="vehicleType" ref='vehicleType' style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
            </div>
            <div class="bannerCenter">
                <div id="bMap"></div>
                <div class="bannerCenterFooter">
                    <div class="bannerbox">
                        <div class="bannerbox1">{{overdueNums}}</div>
                        <div class="bannerboxText">租金逾期数</div>
                    </div>
                    <div class="bannerbox">
                        <div class="bannerbox2">{{violations}}</div>
                        <div class="bannerboxText">车辆违章数</div>
                    </div>
                    <div class="bannerbox">
                        <div class="bannerbox3">{{reportReords}}</div>
                        <div class="bannerboxText">紧急上报数</div>
                    </div>
                    <div class="bannerbox">
                        <div class="bannerbox4">{{repairAndMaintanNums}}</div>
                        <div class="bannerboxText">维保审核数</div>
                    </div>
                </div>
            </div>
            <div class="bannerRight">
                <div class="box">
                    <div class="image-box image-box1"></div>
                    <div class="image-box image-box2"></div>
                    <div class="image-box image-box3"></div>
                    <div class="image-box image-box4"></div>
                    <div class="boxTitle">车辆里程TOP20</div>
                    <div class="boxBanner1">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <table cellpadding="0" cellspacing="0" class="table"  width="100%">	
                                        <thead>			
                                        <tr class="tableHeader">
                                            <th class="name" style="width:15%">序号</th>
                                            <th class="name">车型</th>
                                            <th class="name">车牌号</th> 
                                            <th class="name">里程统计</th> 
                                            <th class="name">昨日里程</th> 
                                        </tr>
                                        </thead>
                                        <tbody>
                                                <tr class="cell" :class="'tableCell' + index" v-for="(item1,index) in tableData1" :key="item1.id">
                                                    <td>{{index + 1}}</td>
                                                    <td width='60'><div class="td2">{{item1.typeName}}</div></td>
                                                    <td width='60'><div class="td3">{{item1.vehicleNo}}</div></td>
                                                    <td width='60'><div class="td4">{{item1.totalMileage}}</div></td>
                                                    <td>{{item1.yesterdayMileage}}</td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="swiper-slide">
                                    <table cellpadding="0" cellspacing="0" class="table"  width="100%">	
                                        <thead>			
                                        <tr class="tableHeader">
                                            <th class="name" style="width:15%">序号</th>
                                            <th class="name">车型</th>
                                            <th class="name">车牌号</th> 
                                            <th class="name">里程统计</th> 
                                            <th class="name">昨日里程</th> 
                                        </tr>
                                        </thead>
                                        <tbody>
                                                <tr class="cell" :class="'tableCell' + index" v-for="(item,index) in tableData2" :key="item.id">
                                                    <td>{{index + 8}}</td>
                                                    <td width='60'><div class="td2">{{item.typeName}}</div></td>
                                                    <td width='60'><div class="td3">{{item.vehicleNo}}</div></td>
                                                    <td width='60'><div class="td4">{{item.totalMileage}}</div></td>
                                                    <td>{{item.yesterdayMileage}}</td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="swiper-slide">
                                    <table cellpadding="0" cellspacing="0" class="table"  width="100%">	
                                        <thead>			
                                        <tr class="tableHeader">
                                            <th class="name" style="width:15%">序号</th>
                                            <th class="name">车型</th>
                                            <th class="name">车牌号</th> 
                                            <th class="name">里程统计</th> 
                                            <th class="name">昨日里程</th> 
                                        </tr>
                                        </thead>
                                        <tbody>
                                                <tr class="cell" :class="'tableCell' + index" v-for="(item,index) in tableData3" :key="item.id">
                                                    <td>{{index + 15}}</td>
                                                    <td width='60'><div class="td2">{{item.typeName}}</div></td>
                                                    <td width='60'><div class="td3">{{item.vehicleNo}}</div></td>
                                                    <td width='60'><div class="td4">{{item.totalMileage}}</div></td>
                                                    <td>{{item.yesterdayMileage}}</td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- 如果需要导航按钮 -->
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="image-box image-box1"></div>
                    <div class="image-box image-box2"></div>
                    <div class="image-box image-box3"></div>
                    <div class="image-box image-box4"></div>
                    <div class="boxTitle">近30日每日总运行里程统计</div>
                    <div class="boxBanner2">
                        <div id="echars"></div>
                    </div>
                </div>
                <div class="box">
                    <div class="image-box image-box1"></div>
                    <div class="image-box image-box2"></div>
                    <div class="image-box image-box3"></div>
                    <div class="image-box image-box4"></div>
                    <div class="boxTitle">昨日数据</div>
                    <div class="boxBanner">
                        <div class="yesterday">
                            <div class="yesterdayLeft">
                                <img src="../assets/noticeboard/icon_行驶里程.svg" alt="">
                            </div>
                            <div class="yesterdayCenter">
                                <div class="yesterdayCenterT">行驶里程</div>
                                <div class="yesterdayCenterF">单位：公里</div>
                            </div>
                            <div class="yesterdayRight">
                                {{totalMileage}}
                            </div>
                        </div>
                        <div class="yesterday">
                            <div class="yesterdayLeft">
                                <img src="../assets/noticeboard/icon_充电电量.svg" alt="">
                            </div>
                            <div class="yesterdayCenter">
                                <div class="yesterdayCenterT">充电电量</div>
                                <div class="yesterdayCenterF">单位：度</div>
                            </div>
                            <div class="yesterdayRight">
                                {{electricity}}
                            </div>
                        </div>
                        <div class="yesterday">
                            <div class="yesterdayLeft">
                                <img src="../assets/noticeboard/icon_满充次数.svg" alt="">
                            </div>
                            <div class="yesterdayCenter">
                                <div class="yesterdayCenterT">满充次数</div>
                                <div class="yesterdayCenterF">单位：次</div>
                            </div>
                            <div class="yesterdayRight">
                                {{num}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import "swiper/css/swiper.css"
// import 'swiper/swiper-bundle.css'
 import axios from "axios";
 import echarts from 'echarts'
 import {getCookie,setCookie,removeCookie} from "../public";
export default {
    name:'noticeboard',
    data() {
        return {
            disabled:true,
            systemName:'租车管理系统',
            time:new Date().toTimeString(),
            dateStr:[],
            imageUrl:require('../assets/logo.png'),
            timers:null,
            electricity:0,//总充电电量
            num:0,//满充次数
            totalMileage:0,//总运行里程
            monthlyMileage:0,//当月行驶里程累积
            number:0,//不在线的设备数
            onlineVehicleNums:0,//当前在线数(辆)
            rentingVehicleNums:0,//在租车辆(辆)
            totalVehicleNums:0,//车辆总数(辆)
            vehicleUtilization:0,//车辆利用率(%)
            overdueNums:0,//租金逾期数
            repairAndMaintanNums:0,//维保审核数
            reportReords:0,//紧急上报数
            violations:0,//车辆违章数
            image:require('../assets/noticeboard/全屏.svg'),
            fullScreen: false,//是否在全屏
            xAxis_data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],//近30日每日总运行里程统计
            series_data: [],//近30日每日总运行里程统计
            seriesType_data:[],//车型分类
            seriesType_data1:[],
            tableData1:[],
            tableData2:[],
            tableData3:[],
            points: [],
            map: '',// 保存地图实例
            centerLng: '114.064552', // 经度
            centerLat: '22.548457', // 纬度
            heatmapOverlay: {},// 热力图覆盖物
            headers:{
                Authorization: getCookie("HTBD_PASS"),
                language:this.$store.state.language
            },//请求头
        }
    },
    methods: {
        handleClick(){
            this.fullScreen = !this.fullScreen;
            if (this.fullScreen) {//当前要启动全屏
            //this.pageFullScreen();//执行全屏之后的一些操作
            this.image = require('../assets/noticeboard/退出全屏.svg')
            this.windowFullScreen();
            } else {//当前要退出全屏
            //this.pageExitFullScreen();//执行退出全屏之后的一些操作
            this.windowExitFullScreen();
            this.image = require('../assets/noticeboard/全屏.svg')
            }
        },
        indexMethod(index) {
            return index + 1;
        },
        //启动全屏
        windowFullScreen() {
            let docElm = document.documentElement;
            if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
            }else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
            }else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
            }
        },
          //退出全屏
        windowExitFullScreen() {
            if (document.exitFullscreen) {
            document.exitFullscreen();
            } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
            }
        },
        //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
        checkFull() {
            //火狐浏览器
            let isFull = document.mozFullScreen ||
                            document.fullScreen ||
                            document.webkitIsFullScreen ||
                            document.webkitRequestFullScreen ||
                            document.mozRequestFullScreen ||
                            document.msFullscreenEnabled;
            if (isFull === undefined) isFull = false;
            return isFull;
        },
        dateToString() {
            var date = new Date();
            var str = "";
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var h = date.getHours();
            var f = date.getMinutes();
            var s = date.getSeconds();
            str += y + this.getDb(m) + this.getDb(d);
            str += this.getDb(h) + '' + this.getDb(f) + '' + this.getDb(s);
            this.dateStr = str.split('');
        },
        getDb(num) {
            //小于10的数，前面加0
            return num < 10 ? "0" + num : num;
        },
        //车型分类图表
        vehicleTypeChart() {
            let myChart = echarts.init(document.getElementById("vehicleType"));
            var option = {
            color: ['#AC85FA','#00F3F7','#FF9847','#F2D701','#49B3FF'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                    orient: 'vertical',
                    left: 'left',
                    top: 'middle',
                    width: "5", // 图例组件的宽度
                    // itemWidth: 6, // 图例标记的图形宽度。
                    textStyle: { //图例文字的样式
                                color: '#ffffff',
                                fontSize: 10,
                            },
                },
            series: [{
                name:'总数',
                data: this.seriesType_data,
                type: 'pie',
                radius: [15, 60],
                center: ['65%', '50%'],
                roseType: 'area',
                labelLine: {
                    show: true,//数据标签引导线
                    length: 0,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                label: {
                        formatter: '{c}辆',
                    },
            }]
            };
                myChart.setOption(option);
                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
        },
        //热力图
        getBMapData(){ 
            // let now = new Date();
            // let year = now.getFullYear();       //年
            // let month = (now.getMonth() + 1 < 10 ? '0'+(now.getMonth() + 1) : now.getMonth() + 1);     //月
            // let day = (now.getDate() < 10 ? '0'+(now.getDate()) : now.getDate());            //日
            // let clock = year + "-" + month + '-' + day;
            axios({
                method: "post",
                url: "/vehicle-service/dataBoardVehicle/trackHeatMap",
                headers: this.headers,
                data: {
                    enterpriseId: getCookie("UserEnterpriseId")
                },
            })
                .then((result) => {
                    this.points = result.data.data;
                    this.centerLng = result.data.data[0].lng;
                    this.centerLat = result.data.data[0].lat;
                    this.initHeatMap();
                })
                .catch((err) => {
                    
                });
        },
        // 创建和初始化地图函数
            initMap(){
                this.createMap();// 创建地图
                this.getBMapData();// 添加热力图覆盖物
                this.initHeatMap();
            },
            // 方法 - 创建地图
            createMap(){
                // 在百度地图容器中创建地图实例
                let map = new BMap.Map("bMap");
                // 将map变量存储在全局
              //  map.addControl(
            //     new BMap.MapTypeControl({
            //     //地图类型
            //     mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
            //     })
            // );
                this.map = map;
                // 设定地图的中心点和坐标
                console.log(this.points)
                // let point = new BMap.Point(this.centerLng, this.centerLat);
                let point = new BMap.Point(this.centerLng, this.centerLat);
                // 设置中心点坐标和地图级别
                // map.enableScrollWheelZoom();
                this.map.centerAndZoom(point, 11);
                // 允许滚轮缩放
                this.map.enableScrollWheelZoom(point, 11);
                this.map.setMapType(BMAP_HYBRID_MAP)
                // 添加左上角缩放比例尺(offset: new BMap.Size(0, 0)为比例尺的坐标位置)
                // var opts = {offset: new BMap.Size(11, 11)}
                // this.map.addControl(new BMap.NavigationControl(opts));
                // // 设置地图默认缩放比例
                // this.map.setZoom(11);
            },
            // 方法 - 添加热力图覆盖物
            initHeatMap () {
                this.heatmapOverlay = new BMapLib.HeatmapOverlay({
                    // 热力图的每个点的半径大小
                    'radius': 25,
                    // 热力的透明度0~1
                    'opacity': 1,
                    // 其中 key 表示插值的位置0~1，value 为颜色值
                    'gradient': {
                        0:'rgb(87, 82, 221)',
                        .4:'rgb(138, 225, 64)',
                        1:'rgb(220, 74, 65)'
                    }
                })
                // 清除图层(每次重新调用需要清除上一个覆盖物图层)
                this.map.clearOverlays();
                // 添加热力覆盖物
                this.map.addOverlay(this.heatmapOverlay);
                this.heatmapOverlay.setDataSet({data: this.points,max:100});
                // 显示热力图，隐藏为this.heatmapOverlay.hide();
                this.heatmapOverlay.show();
            },
        //获取30日里程echarts的数据
        getEchartsData() {
            axios({
                method: "post",
                url: "/vehicle-service/dataBoardVehicle/monthMiles",
                headers: this.headers,
                data: {
                    enterpriseId:getCookie("UserEnterpriseId")
                },
            })
                .then((result) => {
                    
                    // this.xAxis_data = [];
                    this.series_data = [];
                    result.data.data.forEach((item) => { //循环数据
                        // this.xAxis_data.push(item.time);
                        this.series_data.push(item.mile);
                    });
                    this.totalDistance();
                })
                .catch((err) => {
                    
                });
        },
        totalDistance() {
            let myChart = echarts.init(document.getElementById("echars"));
            let option = {
                grid: {
                    left: '15%',
                    right: '0',
                    bottom: '20%',
                    top: '20%',
                    width:'83%',
                },
                tooltip: {
                //提示框组件
                trigger: "axis",
                formatter: "时间：{b}<br/>里程：{c}",
                },
                xAxis: {
                type: "category",
                boundaryGap: false, //不从头开始显示，从中间开始显示
                axisLabel: {
                    show: true,
                    textStyle: {
                    color: "#fff", //更改坐标轴文字颜色
                    fontSize: 12, //更改坐标轴文字大小
                    },
                },
                // boundaryGap: false,
                data: this.xAxis_data,
                },
                yAxis: {
                type: "value",
                name:'里程',
                nameTextStyle:{
                    color:"#ffffff", 
                    fontSize:12,  
                },
                minInterval:1,
                axisLabel: {
                    show: true,
                    textStyle: {
                    color: "#fff", //更改坐标轴文字颜色
                    fontSize: 12, //更改坐标轴文字大小
                    },
                },
                },
                series: [
                {
                    data: this.series_data,
                    type: "line",
                    areaStyle: {
                    normal: {
                        //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(98,231,255,0.48)",
                        },
                        {
                            offset: 0.34,
                            color: "rgba(98,231,255,0.25)",
                        },
                        {
                            offset: 1,
                            color: "rgba(98,231,255,0.00)",
                        },
                        ]),
                    },
                    }, //区域颜色渐变
                    // smooth: true,
                    color: "#62E7FF",
                },
                ],
            };
            myChart.setOption(option);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        //昨天数据
        yesterdayData(){
            axios({
                method: "post",
                url: "/vehicle-service/dataBoardVehicle/yesterdayData",
                headers: this.headers,
                data: {
                    enterpriseId: getCookie("UserEnterpriseId")
                },
            })
                .then((result) => {
                    
                    this.electricity = result.data.data.electricity;
                    this.num = result.data.data.num;
                    this.totalMileage = result.data.data.totalMileage;
                })
                .catch((err) => {
                    
                });
        },
        //车辆里程TOP20
        yesterdayMileage(){
            axios({
                method: "post",
                url: "/vehicle-service/dataBoardVehicle/yesterdayMileage",
                headers: this.headers,
                data: {
                    enterpriseId: getCookie("UserEnterpriseId")
                },
            })
                .then((result) => {
                    var tableData = result.data.data;
                    this.tableData1 = tableData.slice(0,7)
                    this.tableData2 = tableData.slice(7,14)
                    this.tableData3 = tableData.slice(14)
                })
                .catch((err) => {
                    
                });
        },
        //实时统计
        statisticsData1(){
            axios({
                method: "post",
                url: "/vehicle-service/dataBoard/realTimeStatistics",
                headers: this.headers,
                data: {
                    enterpriseId: getCookie("UserEnterpriseId")
                },
            })
                .then((result) => {
                    
                    this.monthlyMileage = result.data.data.monthlyMileage;
                    this.number = result.data.data.num;
                    this.onlineVehicleNums = result.data.data.onlineVehicleNums;
                    this.rentingVehicleNums = result.data.data.rentingVehicleNums;
                    this.totalVehicleNums = result.data.data.totalVehicleNums;
                    this.vehicleUtilization = result.data.data.vehicleUtilization;
                })
                .catch((err) => {
                    
                });
        },
        //租金逾期数、车辆违章数、紧急上报数、维保审核数
        businessStatistics(){
            axios({
                method: "post",
                url: "/vehicle-service/dataBoard/businessStatistics",
                headers: this.headers,
                data: {
                    enterpriseId: getCookie("UserEnterpriseId")
                },
            })
                .then((result) => {
                    this.overdueNums = result.data.data.overdueNums;
                    this.repairAndMaintanNums = result.data.data.repairAndMaintanNums;
                    this.reportReords = result.data.data.reportReords;
                    this.violations = result.data.data.violations;
                })
                .catch((err) => {
                    
                });
        },
        //车型分类
        vehicleTypeClassify(){
            axios({
                method: "post",
                url: "/vehicle-service/dataBoard/vehicleTypeClassify",
                headers: this.headers,
                data: {
                    enterpriseId: getCookie("UserEnterpriseId")
                },
            })
                .then((result) => {
                    
                    this.seriesType_data = [];
                    for(let i=0;i<result.data.data.length;i++){
                        this.seriesType_data.push({value:result.data.data[i].number,name:result.data.data[i].vehicleTypeName})
                    }
                    this.vehicleTypeChart()
                })
                .catch((err) => {
                    
                });
        },
        cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
            if(row.rowIndex=="0" || row.rowIndex=="1" || row.rowIndex=="2"){
            return 'color:yellow'
            }
        },
    },
    created(){
    },
    mounted() {
        setTimeout(() => {
            window.onload()
          }, 10)
        this.vehicleTypeClassify()
        this.getEchartsData()
        this.yesterdayData()
        this.statisticsData1()
        this.businessStatistics()
        this.yesterdayMileage()
        // 创建和初始化地图函数
        // this.getBMapData();
        new Swiper ('.swiper-container', {
            direction: 'vertical', // 垂直切换选项
            loop: false, // 循环模式选项
            autoplay: {
                delay: 4000,//1秒切换一次
            },
        })
        if(getCookie("setlogoAddress") !== ''){
            this.imageUrl = getCookie("setlogoAddress")
        }
        if(getCookie("setsystemTitle") !== ''){
            this.systemName = getCookie("setsystemTitle");
        }
        //由于 全屏状态下 ，按 "Esc" 键退出全屏，浏览器监听不到 "Esc" 键的事件，所以需要通过浏览器窗口大小改变的事件去触发退出全屏事件
        window.addEventListener("resize", () => {
            //增加 timer 定时器的原因是全屏和退出全屏的事件会触发两次窗口大小改变事件，做一次过滤
            if (this.timer) return;
            this.timer = setTimeout(() => {
            // 如果是按 "Esc" 键退出全屏，窗口状态已经是非全屏，但是之前记录的状态还是全屏的状态
            if (!this.checkFull() && this.fullScreen) {
                //退出全屏状态。。。
                this.fullScreen = false;
                this.image = require('../assets/noticeboard/全屏.svg')
            }else{
                //进入全屏状态。。。
                this.disabled = false
            }
            clearTimeout(this.timer);
            this.timer = null;
            }, 0);
        });
        this.timers = setInterval(()=>{
            this.dateToString()
        },1000) 
        this.initMap();
        setTimeout(()=>{
            let point = new BMap.Point(this.points[0].lng, this.points[0].lat);
            this.map.panTo(point);
        },1000)
    },
    watch:{
    },
    destroyed() {
        clearInterval(this.timers);
        this.timers = null;
  },
}
</script>
<style scoped>
.headers{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #081944;
    padding: 30px 63px;
    z-index: 9999;
}
.title{
    width: 100%;
    height: 60px;
}
.titleTop{
    width: 270px;
    height: 50px;
    line-height: 50px;
    background-color: rgba(34, 40, 54,.8);
    text-align: center;
    position: absolute;
    top: 25px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 16px;
    color: rgba(255,255,255,0.8);
    z-index: 22222;
}
.titleLeft{
    width: 60%;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
}
.titleLeft img{
    display: block;
    width: 40px;
    height: 40px;
    float: left;
}
.titleText{
    width: calc(100% - 60px);
    height: 60px;
    line-height: 60px;
    float: right;
    font-weight: 700;
    letter-spacing: 6px;
    display: flex;
    align-items: center;
}
.lookData{
    font-size: 24px;
    font-weight:400;
    letter-spacing: 3px;
}
.gradient-text{text-align: left;text-indent:10px;line-height: 50px;font-size:32px;font-weight:bolder; position: relative; }
.gradient-text-one{  
    background-image:-webkit-linear-gradient(90deg,#015db2,#55ebff); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
}
.titleRight{
    float: right;
    display: flex;
    margin-top: 22px;
}
.titleRight img {
    margin-left: 20px;
    cursor: pointer;
}
.timeList{
    width: 18px;
    height: 24px;
    line-height: 24px;
    background: rgba(255,255,255,0.15);
    text-align: center;
    font-size: 20px;
    color: rgba(255,255,255,0.73);
    margin-right: 5px;
    float: left;
}
.year{
    float: left;
}
.yeartext{
    float: left;
    font-size: 20px;
    color: rgba(255,255,255,0.73);
    margin: 0 10px 0 5px;
}
.monthtext{
    float: right;
    font-size: 20px;
    color: rgba(255,255,255,0.73);
    margin: 0 10px 0 5px;
}
.datetext{
    float: right;
    font-size: 20px;
    color: rgba(255,255,255,0.73);
    margin: 0 10px 0 5px;
}
.hourstext{
    float: right;
    font-size: 20px;
    color: rgba(255,255,255,0.73);
    margin: 0 5px 0 0px;
}
hr{
    width: 100%;
    height: 3px;
    border: 0;
    margin-bottom: 20px;
    background: -webkit-linear-gradient(left, rgba(219,242,255,.1),#0f84da 52%, rgba(198,234,255,.1)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(219,242,255,.1),#0f84da 52%, rgba(198,234,255,.1)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgba(219,242,255,.1),#0f84da 52%, rgba(198,234,255,.1)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(219,242,255,.1),#0f84da 52%, rgba(198,234,255,.1)); /* 标准的语法（必须放在最后） */
}
.banner{
    width: 100%;
    height: calc(100% - 90px);
}
.bannerLeft{
    width: 25%;
    height: 100%;
    box-sizing: border-box;
    float: left;
}
.box{
    width: 100%;
    height: 32%;
    border: 2px solid #113866 !important;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 3%;
}
.box1{
    width: 100%;
    height: 66%;
    border: 2px solid #113866;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 3%;
}
.image-box{
    z-index: 999;
    position: absolute;
    width: 12px;
    height: 12px;
}
.image-box1{
    top: -2px;
    left: -2px;
    border-top: 2px solid #4DDFFF;
    border-left: 2px solid #4DDFFF;
}
.image-box2{
    top: -2px;
    right: -2px;
    border-top: 2px solid #4DDFFF;
    border-right: 2px solid #4DDFFF;
}
.image-box3{
    bottom: -2px;
    right: -2px;
    border-bottom: 2px solid #4DDFFF;
    border-right: 2px solid #4DDFFF;
}
.image-box4{
    bottom: -2px;
    left: -2px;
    border-bottom: 2px solid #4DDFFF;
    border-left: 2px solid #4DDFFF;
}
.boxTitle{
    width: 100%;
    height: 15%;
    background-color: #0B225B;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #6FFFFF;

    box-sizing: border-box;
    padding-left: 24px;
}
.boxBanner{
    width: 100%;
    height: 85%;
    padding: 20px 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.boxBanner1{
    width: 100%;
    height: 85%;
    padding: 9px 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}
.boxBanner2{
    width: 100%;
    height: 85%;
    padding: 0 10px 0 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.boxTop{
    width: 100%;
    height: 50%;
}
.boxFooter{
    width: 100%;
    height: 50%;
    padding: 0 26px;
    box-sizing: border-box;
}
.boxBg{
    width: 70%;
    height: 54px;
    margin-left: 15%;
    line-height: 50px;
    text-align: center;
    background: url('../assets/noticeboard/Frame141.svg') no-repeat;
    background-size:100% 100%;
    color: rgba(255,255,255,0.8);
    font-size: 14px;
}
.boxNumber1{
    color: #FF7E36;
    font-size: 35px;
    text-align: center;
}
.boxNumber2{
    color: #FF4236;
    font-size: 35px;
    text-align: center;
}
.el-row{
    width: 100%;
    height: 46%;
}
.el-col{
    width: 48%;
    height: 100%;
}

.contentList{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    background-color: #0B225B;
}
.contentListLeft{
    width: 28%;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
}
.contentListLeft img{
    display: block;
    height: 24px;
}
.contentListRight{
    width: 72%;
    height: 100%;
    float: left;
}
.boxText{
    font-size: 10px;
    color: rgba(255,255,255,0.8);
    text-align: right;
}
.boxNum1{
    font-size: 20px;
    line-height: 40px;
    color: #6EB9FF;
    text-align: right;
}
.boxNum2{
    font-size: 20px;
    line-height: 40px;
    color: #62FFD0;
    text-align: right;
}
.boxNum3{
    font-size: 20px;
    line-height: 40px;
    color: #E2FF6E;
    text-align: right;
}
.boxNum4{
    font-size: 20px;
    line-height: 40px;
    color: #FF6262;
    text-align: right;
}
.bannerCenter{
    width: 50%;
    height: 100%;
    float: left;
}
#bMap{
    width: 94%;
    height: 66%;
    margin-bottom: 4%;
    margin-left: 3%;
    box-sizing: border-box;
}
.bannerCenterFooter{
    width: 100%;
    height: 32%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
}
.bannerbox{
    width: 193px;
    height: 193px;
    background: url('../assets/noticeboard/Frame137.svg') no-repeat;
    background-size:100% 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.bannerbox1{
    font-size: 50px;
    color: #FFB46E;
}
.bannerbox2{
    font-size: 50px;
    color: #CA5AFF;
}
.bannerbox3{
    font-size: 50px;
    color: #FF4141;
}
.bannerbox4{
    font-size: 50px;
    color: #65DAFF;
}
.bannerboxText{
    font-size: 14px;
    color: #ffffff;
}
.bannerRight{
    width: 25%;
    height: 100%;
    float: left;
}
/* .table{
    width: 100%;
    height: 100%;
    overflow: hidden;
} */
.tableHeader{
    background-color: rgba(255,255,255,0.2);
}
.tableHeader th{
    font-size: 10px;
    color: rgba(255,255,255,0.8);
    text-align: center;
}
.cell{
    font-size: 10px;
    color: #FFFFFF;
}
.tableCell0,.tableCell1,.tableCell2 td{
    font-size: 10px;
    color: #FF5E5E;
}
.table tbody tr td{
    text-align: center;
    height: 17px;
    line-height: 17px;
}
.td2{
    width: 59px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
}
.td3{
    width: 68px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
}
.td4{
    width: 60px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
}
#echars{
    width: 100%;
    height: 100%;
}
.yesterday{
    width: 100%;
    height: 30%;
    display: flex;
    margin-bottom: 3%;
}
.yesterdayLeft{
    width: 24%;
    height: 100%;
}
.yesterdayLeft img{
    display: block;
    width: 100%;
    height: 100%;
}
.yesterdayCenter{
    width: 30%;
    height: 100%;
}
.yesterdayCenterT{
    font-size: 16px;
    color: #ffffff;
    margin-bottom: 5px;
    box-sizing: border-box;
    padding-left: 15px;
}
.yesterdayCenterF{
    font-size: 10px;
    color: rgba(255,255,255,0.6);
    box-sizing: border-box;
    padding-left: 15px;
}
.yesterdayRight{
    width: 46%;
    height: 100%;
    line-height: 46px;
    font-size: 26px;
    color: #ffffff;
    text-align: right;
}
/deep/ .swiper-container{
    width: 100%;
    height: 100%;
}
/deep/ .swiper-wrapper{
    width: 100%;
    height: 100%;
}
/deep/ .swiper-slide{
    width: 100%;
    height: 100%;
}
.swiper-button-prev{
    opacity: 0;
}
.swiper-button-next{
    opacity: 0;
}
</style>