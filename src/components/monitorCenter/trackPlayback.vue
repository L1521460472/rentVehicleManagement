<template>
  <div id="trackPlayback" ref="trackPlayback">
      <div class="bar" @click="handleOpen">
        <i class="el-icon-caret-right"></i>
      </div>
      <el-drawer
        :visible.sync="drawer"
        direction="ltr"
        :modal="false"
        size="300px"
        :withHeader="false"
        :wrapperClosable="false"
      >
      <div class="drawerTop">
        <div class="nav_left">
          <span>企业</span>
          <el-button @click="handleClose" size="mini"  style="font-size:14px" icon="el-icon-caret-left"></el-button>
        </div>
        <div class="tree">
          <el-tree
            :data="treeData"
            show-checkbox
            ref="tree"
            @check="selectNode"
            default-expand-all
            node-key="id"
            :props="defaultProps"
          >
          </el-tree>
        </div>
      </div>
      <div class="drawerFooter">
        <div class="nav_left">
          <el-input
            size="mini"
            v-model="inputIdCar"
            placeholder="车牌号"
          ></el-input>
          <el-button size="mini" icon="el-icon-search" @click="searchCar"></el-button>
        </div>
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            size="mini"
            border
            tooltip-effect="dark"
            style="width: 100%;"
            :height="heigth"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="40">
            </el-table-column>
            <el-table-column
              prop="vehicleNo"
              label="车牌号"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="simNo"
              label="SIM卡号"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" small layout="total,prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
      </el-drawer>
      <div class="right" ref="bannerRight">
          <div class="headerTop">
              <div class="nav">
                  <span class="demonstration">车牌号<i class="asterisk ">*</i></span>
                  <el-input maxlength="50" size="small" disabled v-model="idCar" placeholder=""></el-input>
              </div>
              <div class="nav">
                  <span class="demonstration">开始时间<i class="asterisk ">*</i></span>
                  <el-date-picker
                    size="small"
                    v-model="startTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder=""
                    prefix-icon="el-icon-time2"
                    clearable
                    :picker-options="pickerOptions"
                    default-time="00:00:00">
                  </el-date-picker>            
              </div>
              <div class="nav">
                  <span class="demonstration">结束时间<i class="asterisk ">*</i></span>
                  <el-date-picker
                    size="small"
                    v-model="endTime"
                    prefix-icon="el-icon-time2"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder=""
                    clearable
                    :picker-options="pickerOptions"
                    default-time="23:59:59">
                  </el-date-picker>
              </div>
              <el-button class="search" type="primary" size="small" @click="selectVehicle">查询</el-button>
          </div>
          <div class="bottom">
            <div id="map_canvas"></div>
            <div class="platBtn">
              <img id="run2" class="icon_video" src="../../assets/speedDown.png" alt="">
              <img id="run" class="icon_video" v-show="isStart" src="../../assets/start.png" alt="">
              <img id="pause" class="icon_video" v-show="!isStart" src="../../assets/pause.png" alt="">
              <img id="run3" class="icon_video" src="../../assets/speedUp.png" alt="">
              <img id="stop" class="icon_video" src="../../assets/reset.png" alt="">
              <span class="multiples">x {{multiples}}</span>
            </div>
            <!-- <button id="run2">减速x2</button>
            <button id="run">开始</button>
            <button id="run3">加速x2</button>
            <button id="stop">停止</button>
            <button id="pause">暂停</button> -->
            <!-- <hr />
            <div class="block">
              <el-slider v-model="value9" :show-tooltip="false" style="width:100%"></el-slider>
            </div>
            <hr /> -->
          </div>
      </div>
  </div>
</template>

<script>
import "../../LuShu.js";
import {getCookie,setCookie,removeCookie} from "../../public";
import { gcj02tobd09 , wgs84togcj02 } from "../../api/WGS84";
import {getTrackPlayPoint,getEnterpriseTree,getEnterpriseCars} from "../../api/vehicleMonitoring/api";
export default {
  name: "trackPlayback",
  data() {
    return {
      idCar:'',//车牌号
      startTime:'' || (this.curentTime()+ ' ' +'00:00:00') ,//开始时间
      endTime:'' || (this.curentTime()+ ' ' +'23:59:59'),//结束时间
      isStart:true,//是否显示开始按钮
      gpsArr: [],
      gpsArr2: [],
      speed: 400,
      multiples:1,//播放倍数
      map: new BMap.Map("map_canvas"),
      countm: 0,
      poiList: [],
      poiList1: [],
      poiList2: [],
      sList: [],
      count1: 0,
      step1: 0,
      s: 0,
      s1: 0,
      Timer: "",
      drawer: false,
      inputIdCar:'',//搜索框输入的车牌号
      pickerOptions:{//控制可选时间范围
          disabledDate(time){
              return time.getTime() > Date.now();
          }
      },
      tableData: [],//表格数据
      treeData: [],//企业树
      selectEnterpriseId:'',
      total:0,//表格数据总条数
      currentPage:1,//当前页数
      selectIdCar:'',//表格中选中的车牌号，多选默认选择最后选中的
      defaultProps: {
        children: "children",
        label: "name",
        id:'id'
      },
      // value9: 0,//进度条百分比
      heigth:window.innerHeight - 590 +'',
      headers:{
          Authorization: getCookie("HTBD_PASS"),
          language:this.$store.state.language
      }//请求头
    };
  },
  components: {},
  mounted() {
    this.getEnterpriseTreeList()
    this.todoBMap();
  },
  methods: {
    // 获取企业树
    getEnterpriseTreeList(){
      this.handleOpen()
      getEnterpriseTree({},this.headers).then(res=>{
        if(res.status == 0){
          this.treeData = res.data
        }
      }).catch(err=>{console.log(err)})
    },
    // 选择企业树
    selectNode(val,val2){
      this.selectEnterpriseId = val2.checkedKeys.toString()
      this.getEnterpriseCarsList()
    },
    // 请求企业名下的车辆
    getEnterpriseCarsList(){
      let params = {
          companyIds:this.selectEnterpriseId,
          vehicleNo: this.inputIdCar,
          currentPage: this.currentPage,
          pageSize: 20
      }
      getEnterpriseCars(params,this.headers).then(res=>{
        this.tableData = res.data.list
        this.total = res.data.total
      }).catch(err=>{console.log(err)})
    },
    // 展开企业树
    handleOpen() {
      this.drawer = true;
      this.$refs.bannerRight.style.width = this.$refs.trackPlayback.offsetWidth - 300 + "px";
    },
    // 关闭企业树
    handleClose() {
      this.drawer = false;
      this.$refs.bannerRight.style.width = this.$refs.trackPlayback.offsetWidth - 20 + "px";
    },
    // 表格中车牌号搜索
    searchCar(){
      this.getEnterpriseCarsList()
    },
    // 表格选择
    handleSelectionChange(val) {
      if(val.length > 0) this.idCar = val[val.length-1].vehicleNo;
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val
      this.getEnterpriseCarsList()
    },
    // 格式化当前日期
    curentTime(){ 
        let now = new Date();
        let year = now.getFullYear();       //年
        let month = (now.getMonth() + 1 < 10 ? '0'+(now.getMonth() + 1) : now.getMonth() + 1);     //月
        let day = (now.getDate() < 10 ? '0'+(now.getDate()) : now.getDate());            //日
        let clock = year + "-" + month + '-' + day;
        return(clock); 
    },
    rad(d) {
				return d * Math.PI / 180.0;
		},
    // 查询
    selectVehicle() {
      this.gpsArr = []
      this.sList = []
      this.poiList = []
      this.isStart = true
      if(this.idCar == ''){
        this.$message.warning({
          message:'车牌号不能为空',
          center:true
        })
        return
      }
      if(!this.startTime || !this.endTime){
        this.$message.warning({
          message:'时间不能为空',
          center:true
        })
        return
      }
      let et = new Date(this.endTime).getTime()
      let st = new Date(this.startTime).getTime()
      if(et-st < 0){
        this.$message.warning({
          message:'结束时间不能小于开始时间',
          center:true
        })
        return
      }
      if(et-st > 172799000){
        this.$message.warning({
          message:'时间间隔不能大于48小时',
          center:true
        })
        return
      }
      let params ={
          mapType: 1,
          vehicleNo: this.idCar,
          startTime: this.startTime,
          endTime: this.endTime,
      }
      // this.map.removeOverlay(t)
      getTrackPlayPoint(params,this.headers).then(res=>{
        if(res.status == 0){
          if(res.data.length < 1){
            this.todoBMap();
            this.$message.warning({
              message:'暂无车辆的GPS定位数据',
              center:true
            })
            
          }else{
            console.log(res.data);
            this.gpsArr = res.data;
            this.getTotalMil();
            this.todoMap();
          }
        }else{
          this.todoBMap();
          // this.$message({
          //   message: res.message,
          //   center: true,
          //   type: "error",
          // });
        }
      }).catch(err=>{
          this.$message({
            message: err.response.message,
            center: true,
            type: "error",
          });
      })
    },
    GetDistance(lat1, lng1, lat2, lng2) {
      var EARTH_RADIUS = 6378.137;
      var radLat1 = this.rad(lat1);
      var radLat2 = this.rad(lat2);
      var a = radLat1 - radLat2;
      var b = this.rad(lng1) - this.rad(lng2);
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;
    },
    getTotalMil() {
      //var s1 = 0;
      var lat1, lng1, lat2, lng2;
      let arr = [];
      let arr2 = [];
      for (var i = 0; i < this.gpsArr.length; i++) {
        lat2 = this.gpsArr[i].lat;
        lng2 = this.gpsArr[i].lng;
        this.speed = this.gpsArr[i].velocity;
        if (i == 0) {
          lat1 = lat2;
          lng1 = lng2;
          continue;
        } else if (i <= this.gpsArr.length - 1) {
          this.s1 = this.GetDistance(lat1, lng1, lat2, lng2);
          // if (this.s1 > 0.02) {
            var point = new BMap.Point(lng2, lat2); //118.230272,33.482474
            arr.push(point);
            arr2.push(this.gpsArr[i]);
          // }
          this.s += this.s1;
        }
        lat1 = lat2;
        lng1 = lng2;
      }
      this.sList = arr;
      this.gpsArr2 = arr2;
      return this.s1;
    },
    //初始化地图
    todoBMap() {
      this.map = new BMap.Map("map_canvas");
      var map = this.map;
      map.removeOverlay()
      // map.enableScrollWheelZoom();
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(
        new BMap.MapTypeControl({
          //地图类型
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      );
      map.addControl(
        new BMap.OverviewMapControl({
          isOpen: true,
        })
      );
      map.enableScrollWheelZoom();
      map.centerAndZoom("深圳", 12);
    },
    //初始化路书
    todoMap() {
      this.map = new BMap.Map("map_canvas");
      var map = this.map;
      var lushu;
      var _this = this;
      var count = 0;
      // var progress = document.getElementsByClassName("el-progress-bar__outer")[0];
      // var progress1 = document.getElementsByClassName("el-slider__runway")[0];
      // var progress2 = document.getElementsByClassName(
      //   "el-slider__button-wrapper"
      // )[0];
      for (let i = 0; i < _this.sList.length; i++) {
        var p0 = _this.sList[i].lng;
        var p1 = _this.sList[i].lat;
        var point = new BMap.Point(p0, p1); //118.230272,33.482474
        _this.poiList.push(point);
      }
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(
        new BMap.MapTypeControl({
          //地图类型
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      );
      map.addControl(
        new BMap.OverviewMapControl({
          isOpen: true,
        })
      );
      map.enableScrollWheelZoom();
      map.centerAndZoom(_this.poiList[0], 13);
      var polyline = new BMap.Polyline(_this.poiList, {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.7,
      });
      map.addOverlay(polyline); //增加折线
      //3.填充坐标到路书
      lushu = new BMapLib.LuShu(map, _this.poiList, {
        defaultContent: new Date().toLocaleString(),
        autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon(
          // "http://developer.baidu.com/map/jsdemo/img/car.png",
          "/static/image/car.png",
          new BMap.Size(30, 15),
          {
            anchor: new BMap.Size(15, 7),
          }
        ),
        speed: 400,
        enableRotation: true, //是否设置marker随着道路的走向进行旋转
      });

      //绑定事件
      //开始
      $("run").onclick = function () {
        // _this.countm = 0;
        _this.isStart = false
        count = 0;
        lushu.start();
      };
      //减速*2
      $("run2").onclick = function () {
        if (count == 0) {
          count = 0;
        } else {
          count--;
        }
        if (count == 0) {
          lushu.changeSpeed(1);
          _this.multiples = 1
        } else if (count == 1) {
          lushu.changeSpeed(2);
          _this.multiples = 2
        } else if (count == 2) {
           _this.multiples = 4
          lushu.changeSpeed(4);
        } else if (count == 3) {
           _this.multiples = 8
          lushu.changeSpeed(8);
        } else if (count == 4) {
           _this.multiples = 16
          lushu.changeSpeed(16);
        } else if (count == 5) {
           _this.multiples = 32
          lushu.changeSpeed(32);
        }else if (count == 6) {
           _this.multiples = 64
          lushu.changeSpeed(64);
        }
      };
      //加速*2
      $("run3").onclick = function () {
        if (count == 6) {
          count = 6;
        } else {
          count++;
        }
        if (count == 0) {
          _this.multiples = 1
          lushu.changeSpeed(1);
        } else if (count == 1) {
           _this.multiples = 2
          lushu.changeSpeed(2);
        } else if (count == 2) {
           _this.multiples = 4
          lushu.changeSpeed(4);
        } else if (count == 3) {
           _this.multiples = 8
          lushu.changeSpeed(8);
        } else if (count == 4) {
           _this.multiples = 16
          lushu.changeSpeed(16);
        } else if (count == 5) {
           _this.multiples = 32
          lushu.changeSpeed(32);
        }else if (count == 6) {
           _this.multiples = 64
          lushu.changeSpeed(64);
        }
      };
      //重置速度
      // $("resetSpeed").onclick = function() {
      // 	count = 0;
      // 	lushu.resetSpeed();
      // }
      //重置
      $("stop").onclick = function () {
        _this.isStart = true
        _this.multiples = 1
        lushu.changeSpeed(1)
        count = 0
        clearInterval(_this.Timer);
        lushu.stop();
      };
      // $("back").onclick = function() {
      // 	lushu.back();
      // }
      //暂停
      $("pause").onclick = function () {
        _this.isStart = true
        lushu.pause();
        // _this._moveNext(0)
      };
      //隐藏信息
      // $("hide").onclick = function() {
      // 	lushu.hideInfoWindow();
      // }
      //显示信息
      // $("show").onclick = function() {
      // 	lushu.showInfoWindow();
      // }
      var num = 0;
      var num1 = 0;
      //运行到下一个点
      lushu._moveNext = function (index) {
        var me = this;
        if (index < this._path.length - 1) {
          me._move(me._path[index], me._path[index + 1], me._tween.linear);
        }
      };
      lushu._move = function (initPos, targetPos, effect) {
        var pointsArr = [initPos, targetPos];
        var me = this,
          //当前的帧数
          currentCount = 0,
          //步长，米/秒
          timer = 10,
          step = this._opts.speed / (1000 / timer),
          //初始坐标
          init_pos = this._projection.lngLatToPoint(initPos),
          //获取结束点的(x,y)坐标
          target_pos = this._projection.lngLatToPoint(targetPos),
          //总的步长
          count = Math.round(me._getDistance(init_pos, target_pos) / step);
        // this._map.addOverlay(
        //   new BMap.Polyline(pointsArr, {
        //     strokeColor: "#111",
        //     strokeWeight: 3,
        //     strokeOpacity: 0.5,
        //   })
        // ); // 画线

        //如果小于1直接移动到下一点
        if (count < 1) {
          me._moveNext(++me.i);
          return;
        }
        //两点之间匀速移动
        me._intervalFlag = setInterval(function () {
          //两点之间当前帧数大于总帧数的时候，则说明已经完成移动
          if (currentCount >= count) {
            clearInterval(me._intervalFlag);
            //移动的点已经超过总的长度
            if (me.i > me._path.length) {
              return;
            }
            //运行下一个点
            me._moveNext(++me.i);
          } else {
            currentCount++;
            var x = effect(init_pos.x, target_pos.x, currentCount, count),
              y = effect(init_pos.y, target_pos.y, currentCount, count),
              pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
            //设置marker
            if (pos) {
              _this.step1++;
            }
            //console.log(_this.step1)
            if (currentCount == 1) {
              var proPos = null;
              if (me.i - 1 >= 0) {
                proPos = me._path[me.i - 1];
              }
              if (me._opts.enableRotation == true) {
                me.setRotation(proPos, initPos, targetPos);
              }
              if (me._opts.autoView) {
                if (!me._map.getBounds().containsPoint(pos)) {
                  me._map.setCenter(pos);
                }
              }
            }
            //正在移动
            me._marker.setPosition(pos);
            //设置自定义overlay的位置
            me._setInfoWin(pos);
            // console.log((me.i+2)/me._path.length)
            // if(me.i == me._path.length){

            // }
          }
        }, timer);
        //    _this.countm = Number(((me.i+2)/me._path.length) * 100);//进度条的百分比值
        // _this.value9 = ((me.i + 2) / me._path.length) * 100;
        lushu._opts.defaultContent =
          _this.gpsArr2[me.i].gpsTime +
          " " +
          _this.gpsArr2[me.i].velocity +
          "km/h";

        //    console.log(_this.value9)
        // //点击进度条
        // var progressclick = progress.onmousedown = function(eve){
        // 			var e = eve || event;
        // 		var xx = e.offsetX || e.layerX;
        // 		var yy = e.offsetY || e.layerY;
        // 		var target = e.target || e.srcElement;
        // 		_this.countm = xx / this.offsetWidth * 100; //进度条的百分比值

        // 		me.i = Math.ceil(me._path.length * (xx / this.offsetWidth));
        // 	}
        // var progressclick1 = (progress1.onmousedown = function (eve) {
        //   var e = eve || event;
        //   var xx = e.offsetX || e.layerX;
        //   var yy = e.offsetY || e.layerY;
        //   var target = e.target || e.srcElement;
        //   _this.value9 = (xx / this.offsetWidth) * 100; //进度条的百分比值
        //   // if(me.i + 2 == me._path.length){

        //   // }else{
        //   lushu.start();
        //   // }
        //   me.i = Math.ceil(me._path.length * (xx / this.offsetWidth));
        // });
        // 	var progressclick2 = progress2.onmousedown = function(eve){
        // 		var e = eve || event;
        // 		var xx = e.offsetX || e.layerX;
        // 		var yy = e.offsetY || e.layerY;
        // 		var target = e.target || e.srcElement;
        // 		document.onmousemove = function(eve){
        // 			var xxx=e.pageX-xx;
        // var yyy=e.pageY-yy;
        // var maxL = document.documentElement.clientWidth - 18;
        // var maxT = document.documentElement.clientHeight - 18;

        // var l = xxx < 0 ? 0 : (xxx > maxL ? maxL : xxx);

        // progress2.style.left=l+"px";
        // window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 			console.log(11111)
        // 		}
        // 		document.onmouseup = function(){
        // 		// 	var e = eve || event;
        // 		// var xxx = e.offsetX || e.layerX;
        // 		// var yyy = e.offsetY || e.layerY;
        // 		// var target = e.target || e.srcElement;
        // 		// 	me.i = Math.ceil(me._path.length * (xxx / this.offsetWidth));
        // 		// 	console.log(this.offsetWidth)
        // 			console.log(222222)
        // 		document.onmousemove = null;
        // 		}
        // 	}
      };
      function $(element) {
        return document.getElementById(element);
      }
    },
  },
  destroyed() {
    clearInterval(this.Timer);
  },
};
</script>
<style scoped>
#trackPlayback {
  width: 100%;
  box-sizing: border-box;
  height: calc(100% - 60px);
  position: relative;
  border-bottom: 1px solid #efefef;
}
.bar {
  width: 20px;
  height: 100%;
  background: #efefef;
  float: left;
  cursor: pointer;
}
/* 收缩框 */
.el-drawer__wrapper {
  position: absolute;
  width: 300px;
  box-sizing: border-box;
}
.el-drawer__wrapper:focus {
  outline: none;
}
#trackPlayback >>> .el-drawer__body {
  width: 100%;
  height: 100%;
}
#trackPlayback >>> .el-drawer.ltr:focus {
  outline: none;
}
#trackPlayback >>> .el-drawer__body:focus {
  width: 100%;
  height: 100%;
  outline: none;
}
.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 300px;
}
#trackPlayback >>> .el-drawer.ltr {
  border-left: 1px solid #efefef;
  border-top: 1px solid #efefef;
}
.drawerTop {
  width: 100%;
  height: 380px;
  border-bottom: 1px solid #efefef;
}
.drawerFooter {
  width: 100%;
  height: calc(100% - 380px);
}
.nav_left {
  width: 300px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding-left: 5px;
  font-weight: 600;
  box-sizing: border-box;
  border-bottom: 1px solid #efefef;
}
.drawerTop .nav_left button {
  float: right;
}
/* .nav .el-selete {
  width: 100px;
} */
.nav_left .el-input {
  width: 160px;
}
.tree {
  width: 100%;
  height: calc(100% - 30px);
  overflow-x: auto;
  overflow-y: auto;
}
/* .el-tree {
  width: 100%;
  overflow: scroll;
} */
.tree >>> .el-tree > .el-tree-node {
  display: inline-block;
  min-width: 100%;
}
.table {
  width: 100%;
  height: calc(100% - 60px);
  /* height: 300px; */
  /* overflow-y: auto; */
}
.drawerFooter >>> .el-table .has-gutter tr th {
  /* font-weight: 200; */
  font-size: 12px;
  color: #606266;
}
/* .drawerFooter >>> .el-table th > .cell {
  padding: 0;
}
.drawerFooter >>> .el-table--border th:first-child .cell {
  padding-left: 0;
} */
.pagination {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border-top: 1px solid #efefef;
}
.pagination >>> .el-pagination__total {
  font-size: 12px;
}
.pagination >>> .el-pagination__total {
  margin-right: 0;
}
.nav_left .el-button--mini {
  padding: 7px 10px !important;
}
.nav_left .el-button + .el-button {
  margin-left: 0;
}

.right {
  width: calc(100% - 300px);
  height: 100%;
  float: right;
  position: relative;
  overflow: hidden;
}
.headerTop{
  width: 100%;
  height: 66px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
}
.demonstration {
  display: inline-block;
  /* width: 60px; */
  font-size: 12px;
  margin-left: 20px;
  margin-right: 10px;
  text-align: right;
  color: #333333;
}
.nav {
  /* width: 20%; */
  float: left;
}
.nav .el-input {
  width: 160px;
}
.nav .el-input__inner {
  width: 160px;
}
.nav >>> .el-input--suffix {
  width: 160px;
}
.asterisk{
  color: red;
}
.search{
  margin-left: 10px;
}
.bottom{
  height: calc(100% - 66px);
}
#map_canvas {
  /* width: 100%; */
  height: calc(100% - 24px);
}
.el-icon-caret-right {
  width: 20px;
  height: 100%;
  color: #428bca;
  text-align: center;
  background-color: #f2f2f2;
}
.nav >>> .el-input--prefix .el-input__inner{
  padding: 0 15px !important;
}
.icon_video{
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 8px;
}
.multiples{
  color: #3598DB;
  margin-left: 15px;
  line-height: 25px;
}
.platBtn{
  display: flex;
  align-items: center;
}
</style>
