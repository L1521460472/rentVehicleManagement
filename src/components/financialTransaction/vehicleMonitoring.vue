<template>
  <div id="realTimemonitoring" ref="realTimemonitoring">
    <div class="bannerRight" ref="bannerRight">
      <div id="map" ref="map"></div>
      <div id="footer" ref="footer">
        <div class="footerList">
          <el-tabs type="border-card" @tab-click="btn(1)">
            <el-tab-pane label="监控列表">
              <el-table
                :data="tableDataList"
                border
                size="mini"
                :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
                height="206px"
                style="width: 100%;"
              >
                <el-table-column prop="companyName" label="机构名称" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="vehicleNo" label="车牌号" width="90" show-overflow-tooltip></el-table-column>
                <el-table-column prop="gpsTime" label="定位时间" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="whether_locate"
                  width="80"
                  label="定位状态"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.whether_locate == 0">未定位</span>
                    <span v-else>已定位</span>
                  </template>
                </el-table-column>
                <el-table-column prop="velocity" width="90" label="速度(km/h)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="angle" width="80" label="方向" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span v-if="scope.row.angle == 0">正北</span>
                    <span v-if="scope.row.angle == 90">正东</span>
                    <span v-if="scope.row.angle == 180">正南</span>
                    <span v-if="scope.row.angle == 270">正西</span>
                    <span
                      v-if="scope.row.angle >0 && scope.row.angle <= 45"
                    >北偏东{{90 - scope.row.angle }}°</span>
                    <span
                      v-if="scope.row.angle >45 && scope.row.angle < 90"
                    >东偏北{{90 - scope.row.angle }}°</span>
                    <span
                      v-if="scope.row.angle >90 && scope.row.angle <= 135"
                    >东偏南{{ scope.row.angle - 90 }}°</span>
                    <span
                      v-if="scope.row.angle >135 && scope.row.angle < 180"
                    >南偏东{{180 - scope.row.angle }}°</span>
                    <span
                      v-if="scope.row.angle >180 && scope.row.angle <= 225"
                    >南偏西{{ scope.row.angle - 180 }}°</span>
                    <span
                      v-if="scope.row.angle >225 && scope.row.angle < 270"
                    >西偏南{{270 - scope.row.angle }}°</span>
                    <span
                      v-if="scope.row.angle >270 && scope.row.angle <= 315"
                    >西偏北{{ scope.row.angle - 270 }}°</span>
                    <span
                      v-if="scope.row.angle >315 && scope.row.angle < 360"
                    >北偏西{{360 - scope.row.angle }}°</span>
                  </template>
                </el-table-column>
                <el-table-column prop="address" min-width="150" label="位置" show-overflow-tooltip></el-table-column>
              </el-table>
            </el-tab-pane>
            <!-- <el-tab-pane label="提示信息">
              <el-table
                :data="tableData"
                border
                size="mini"
                :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
                style="width: 100%;"
              >
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="电池电机">
              <el-table
                :data="tableData"
                border
                size="mini"
                :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
                style="width: 100%;"
              >
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="故障报警">
              <el-table
                :data="tableData"
                border
                size="mini"
                :header-cell-style="{ background: '#F5F7FA', color: '#333333' }"
                style="width: 100%;"
              >
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
              </el-table>
            </el-tab-pane>-->
          </el-tabs>
          <div class="pos">
            <el-button @click="btn(2)" :icon="icon"></el-button>
          </div>
        </div>
      </div>
      <div class="footerButton">
        <el-button size="small" @click="cancel">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  getCookie,
  setCookie,
  removeCookie,
  getMenuBtnList,
} from "../../public";
import { gcj02tobd09 } from "../../api/WGS84";
export default {
  name: "vehicleMonitoring",
  data() {
    return {
      input: "",
      inputSIM: "",
      map: null,
      icon: "el-icon-caret-top",
      offlineNum: null,
      onLineNum: null,
      index: 0,
      count: 0,
      value: "1",
      number: 5,
      isMarker: false,
      drawer: false,
      multipleSelection: [],
      pointList: [],
      tableData: [],
      treeData: [],
      tableDataList: [],
      point: {},
      defaultProps: {
        children: "children",
        label: "name",
        id: "id",
      },
      str: "",
      vehicleNoStr: "",
      title: "",
      ws: null,
      pageSize: 20,
      currentPage: 1,
      total: 0,
      image: require("../../assets/see2.png"),
      headers: {
        Authorization: getCookie("HTBD_PASS"),
        language: this.$store.state.language,
      },
    };
  },
  methods: {
    initMap() {
      this.map = new BMap.Map("map");
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(
        new BMap.MapTypeControl({
          //地图类型
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      );
      this.map.addControl(
        new BMap.OverviewMapControl({
          isOpen: true,
        })
      );
      this.map.enableScrollWheelZoom();
      this.map.centerAndZoom("深圳", 18);
    },
    btn(val) {
      if (val == 1) {
        this.index = 1;
        this.$refs.footer.style.height = 250 + "px";
        this.$refs.map.style.height =
          this.$refs.realTimemonitoring.offsetHeight - 310 + "px";
      } else {
        this.index++;
        if (this.index % 2 !== 0) {
          this.icon = "el-icon-caret-bottom";
          this.$refs.footer.style.height = 250 + "px";
          this.$refs.map.style.height =
            this.$refs.realTimemonitoring.offsetHeight - 310 + "px";
        } else {
          this.icon = "el-icon-caret-top";
          this.$refs.footer.style.height = 45 + "px";
          this.$refs.map.style.height =
            this.$refs.realTimemonitoring.offsetHeight - 105 + "px";
        }
      }
    },
    onLogin() {
      //初始化WebSocket连接
      var url = "ws://172.18.11.68:8888/conver-service";
      var fullUrl = url;
      var this_ = this;
      if ("WebSocket" in window) {
        this_.ws = new WebSocket(fullUrl);
      } else if ("MozWebSocket" in window) {
        this_.ws = new MozWebSocket(fullUrl);
      } else {
        console.log("浏览器不支持WebSocket");
      }
      this_.ws.onopen = function () {
        console.log("连接服务器成功");
      };
      this_.ws.onclose = function () {
        console.log("与服务器断开连接");
        this_.ws = null;
      };
      this_.ws.onerror = function () {
        console.log("通信发生错误");
        this_ws = null;
      };
      this_.ws.onmessage = function (msg) {
        var jsonOject = eval("(" + msg.data + ")");
        var obj = jsonOject;
        for (var i = 0; i < this_.tableDataList.length; i++) {
          if (this_.tableDataList[i].simNo == obj.SIM_NO) {
            this_.tableDataList[i].lat = obj.LAT;
            this_.tableDataList[i].lng = obj.LNG;
            this_.tableDataList[i].angle = obj.ANGLE;
            this_.tableDataList[i].velocity = obj.VELOCITY;
            this_.tableDataList[i].gpsTime = obj.GPS_TIME;
          }
        }
        this_.map.clearOverlays();
        setTimeout(()=>{
          this_.addMarker();
        },150)
      };
    },
    websocketsend() {
      //数据发送
      var simNoStr = "";
      this.tableDataList.map((res) => {
        simNoStr += res.simNo + ",";
      });
      simNoStr = simNoStr.substr(0, simNoStr.length - 1);
      this.ws.send(simNoStr);
      // console.log(simNoStr);
    },
    addMarker() {
      this.map.clearOverlays();
      this.pointList = [];
      this.tableDataList.map((res) => {
        this.pointList.push({
          lng: res.lng,
          lat: res.lat,
          companyName: res.companyName,
          vehicleNo: res.vehicleNo,
          gpsTime: res.gpsTime,
          velocity: res.velocity,
          angle: res.angle,
          title: "车牌号:" + res.vehicleNo,
          content:
            "机构名称:" +
            res.companyName +
            "</br>" +
            "车辆速度:" +
            (res.velocity || 0) +
            " Km/h" +
            "</br>" +
            "定位地址:" +
            res.address,
          address: "",
        });
      });
      for (let i = 0; i < this.pointList.length; i++) {
        this.point = new BMap.Point(
          this.pointList[i].lng,
          this.pointList[i].lat
        );
        const gc = new BMap.Geocoder();
        var this_ = this;
        gc.getLocation(this.point, function (rs) {
          const addComp = rs.addressComponents;
          const address = rs.address; //得到当前地址
          this_.pointList[i].address = address;
        });
        var marker = new BMap.Marker(this.point); // 创建标注
        var title = this.pointList[i].title;
        var content = this.pointList[i].content;
        this.map.addOverlay(marker); // 将标注添加到地图中
        this.addClickHandler(title, content, marker);
        var label = new BMap.Label(this.pointList[i].vehicleNo, {
          offset: new BMap.Size(-24, 30),
        });
        label.setStyle({
          borderColor: "#000",
          backgroundColor: "#000",
          color: "#baff00",
          opacity: "0.6",
          padding: "5px 10px",
          cursor: "pointer",
        });
        marker.setLabel(label);
      }
      this.tableDataList = this.pointList;
      this.map.panTo(this.point);
    },
    addClickHandler(title, content, marker) {
      marker.addEventListener("click", (e) => {
        this.openInfo(title, content, e);
      });
    },
    openInfo(title, content, e) {
      var e = e.target;
      var titleinfo = title;
      var opts = {
        width: 200, // 信息窗口宽度
        height: 200, // 信息窗口高度
        title: titleinfo, // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
      };
      var point = new BMap.Point(e.getPosition().lng, e.getPosition().lat);
      var infoWindow = new BMap.InfoWindow(content, opts);
      this.map.openInfoWindow(infoWindow, point);
    },
    query() {
      //查询车辆位置
      // console.log(data)
      axios({
        method: "post",
        url: "/vehicle-service/monitoringCenter/selectListByPageLink",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          vehicleNo: this.$route.query.vehicleNo,
          currentPage: 1,
          pageSize: 10,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 0) {
            this.tableDataList = res.data.data.list;
            this.addMarker();
          } else {
            this.$message({
              message: res.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    cancel() {
      //取消新增修改
      this.$router.back();
    },
    search() {
      //搜索
      axios({
        method: "post",
        url: "/vehicle-service/monitoringCenter/selectListByPage",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          companyIds: this.str,
          vehicleNo: this.inputSIM,
          currentPage: 1,
          pageSize: 20,
        },
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status == 0) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.currentPage = res.data.data.pageNum;
          } else {
            this.$message({
              message: res.data.message,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.initMap();
    this.query();
    // this.getTreeData();
    this.onLogin();
  },
};
</script>

<style scoped>
#realTimemonitoring {
  width: 100%;
  box-sizing: border-box;
  height: calc(100% - 60px);
  position: relative;
  border-bottom: 1px solid #efefef;
}
.bar {
  width: 20px;
  height: 100%;
  background: #f2f2f2;
  float: left;
  cursor: pointer;
}
.bannerRight {
  width: 100%;
  height: 100%;
  float: right;
  position: relative;
  overflow: hidden;
}
#map {
  width: 100%;
  height: calc(100% - 102px);
}
.headerLeft {
  width: 160px;
  height: 34px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
#map >>> .anchorTR {
  top: 30px !important;
}
.headerRight {
  position: absolute;
  top: 0;
  right: 0;
  height: 26px;
  margin: 0;
  z-index: 99;
}
.headerRight ul {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #efefef;
}
.headerRight ul li {
  float: left;
  font-size: 14px;
  line-height: 26px;
  margin-right: 10px;
}
#footer {
  width: 100%;
  height: 45px;
  overflow: hidden;
  box-sizing: border-box;
  border-top: 3px solid royalblue;
}
.footerList {
  position: relative;
}
.pos {
  position: absolute;
  top: 0;
  right: 0;
}
.footerButton {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}
#realTimemonitoring >>> .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
#realTimemonitoring >>> .el-tab-pane {
  width: 100%;
  height: 206px;
  box-sizing: border-box;
  overflow-y: auto;
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
#realTimemonitoring >>> .el-drawer__body {
  width: 100%;
  height: 100%;
}
#realTimemonitoring >>> .el-drawer.ltr:focus {
  outline: none;
}
#realTimemonitoring >>> .el-drawer__body:focus {
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
#realTimemonitoring >>> .el-drawer.ltr {
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
.nav {
  width: 300px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding-left: 5px;
  font-weight: 600;
  box-sizing: border-box;
  border-bottom: 1px solid #efefef;
}
.drawerTop .nav button {
  float: right;
}
/* .nav .el-selete {
  width: 100px;
} */
.nav .el-input {
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
  overflow-y: auto;
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
.nav .el-button--mini {
  padding: 7px 10px !important;
}
.nav .el-button + .el-button {
  margin-left: 0;
}

#map >>> .BMap_pop div:nth-child(8) {
  top: 183px !important;
}
#map >>> .BMap_pop div:nth-child(5) {
  display: none;
}
#map >>> .BMap_pop div:nth-child(6) {
  display: none;
}
#map >>> .BMap_pop div:nth-child(7) {
  display: none;
}
.el-table img {
  cursor: pointer;
}
#map >>> .BMap_bubble_title {
  font-size: 13px;
  font-weight: bold;
  text-align: left;
  padding-left: 5px;
  padding-top: 5px;
  border-bottom: 1px solid gray;
  background-color: #efefef;
  border-bottom: 1px solid #efefef;
}
#map >>> .BMap_bubble_content {
  background-color: white;
  font-size: 13px;
  line-height: 30px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 10px;
}
/* #map >>> .BMap_pop img {
	top:43px !important;
	left:215px !important;
} */
/* #map >>> .BMap_top {
	display:none;
}
#map >>> .BMap_bottom {
	display:none;
}
#map >>> .BMap_center {
	display:none;
} */
</style>
