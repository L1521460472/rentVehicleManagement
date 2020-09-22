<template>
  <div id="realTimemonitoring" ref="realTimemonitoring">
    <!-- <el-button " type="primary" style="margin-left: 16px;">
  点我打开
</el-button> -->
    <div class="bar" @click="handleOpen">
      <i class="el-icon-caret-right"></i>
    </div>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="ltr"
      :modal="false"
      :wrapperClosable="false"
      size="300px"
      :with-header="false"
    >
      <div class="drawerTop">
        <div class="nav">
          <span>企业</span>
          <el-button
            @click="handleClose"
            size="mini"
            icon="el-icon-caret-left"
          ></el-button>
        </div>
        <div class="tree">
          <el-tree
            :data="treeData"
            ref="tree"
            show-checkbox
            default-expand-all
            node-key="id"
            @check="query"
            :props="defaultProps"
          >
          </el-tree>
        </div>
      </div>
      <div class="drawerFooter">
        <div class="nav">
          <el-input
            size="mini"
            maxlength="100"
            v-model="inputSIM"
            placeholder="车牌号"
          ></el-input>
          <el-button
            size="mini"
            icon="el-icon-search"
            @click="search"
          ></el-button>
          <el-button size="mini" @click="exportList">导出</el-button>
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
              show-overflow-tooltip
              width="85"
            >
              <!-- <template slot-scope="scope">{{ scope.row.vehicleNo }}</template> -->
            </el-table-column>
            <el-table-column
              prop="simNo"
              label="SIM卡号"
              show-overflow-tooltip
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="vehicleStatus"
              label="状态"
              show-overflow-tooltip
              width="50"
            >
            <template slot-scope="scope">
              <span v-if="scope.row.vehicleStatus == 0">在线</span>
              <span v-if="scope.row.vehicleStatus == 1">离线</span>
            </template>
            </el-table-column>
            <el-table-column label="定位" width="47">
              <template slot-scope="scope">
                <img
                  :src="image"
                  ref="image"
                  alt=""
                  @click="toggleRowSelection([tableData[scope.$index]], true)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            small
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :pager-count="number"
            layout="total,prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-drawer>
    <div class="bannerRight" ref="bannerRight">
      <!-- <div class="headerLeft">
        <el-input
          v-model="input"
          size="small"
          placeholder="搜索车牌号码、车队"
        ></el-input>
      </div> -->
      <div class="headerRight">
        <ul>
          <!-- <li>行驶</li>
          <li>怠速</li>
          <li>停车</li>
          <li>未定位</li>
          <li>离线</li> -->
          <li>在线/离线( {{ onLineNum }} / {{ offlineNum }} )</li>
          <!-- <li>告警</li>
          <li>图片</li>
          <li>全屏</li> -->
        </ul>
      </div>
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
                <el-table-column
                  prop="companyName"
                  label="机构名称"
                  width="150"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="vehicleNo"
                  label="车牌号"
                  width="90"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="gpsTime"
                  label="定位时间"
                  width="150"
                  show-overflow-tooltip
                >
                </el-table-column>
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
                <el-table-column
                  prop="velocity"
                  width="90"
                  label="速度(km/h)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="angle"
                  width="80"
                  label="方向"
                  show-overflow-tooltip
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.angle == 0">正北</span>
                  <span v-if="scope.row.angle == 90">正东</span>
                  <span v-if="scope.row.angle == 180">正南</span>
                  <span v-if="scope.row.angle == 270">正西</span>
                  <span v-if="scope.row.angle >0 && scope.row.angle <= 45">北偏东{{90 - scope.row.angle }}°</span>
                  <span v-if="scope.row.angle >45 && scope.row.angle < 90">东偏北{{90 - scope.row.angle }}°</span>
                  <span v-if="scope.row.angle >90 && scope.row.angle <= 135">东偏南{{ scope.row.angle - 90 }}°</span>
                  <span v-if="scope.row.angle >135 && scope.row.angle < 180">南偏东{{180 - scope.row.angle }}°</span>
                  <span v-if="scope.row.angle >180 && scope.row.angle <= 225">南偏西{{ scope.row.angle - 180 }}°</span>
                  <span v-if="scope.row.angle >225 && scope.row.angle < 270">西偏南{{270 - scope.row.angle }}°</span>
                  <span v-if="scope.row.angle >270 && scope.row.angle <= 315">西偏北{{ scope.row.angle - 270 }}°</span>
                  <span v-if="scope.row.angle >315 && scope.row.angle < 360">北偏西{{360 - scope.row.angle }}°</span>
                </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  min-width="150"
                  label="位置"
                  show-overflow-tooltip
                >
                </el-table-column>
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
            </el-tab-pane> -->
          </el-tabs>
          <div class="pos">
            <el-button @click="btn(2)" :icon="icon"></el-button>
          </div>
        </div>
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
import { gcj02tobd09 , wgs84togcj02 } from "../../api/WGS84";
export default {
  name: "realTimemonitoring",
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
      heigth:window.innerHeight - 590 +'',
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
      //车辆在线离线数
      axios({
        method: "post",
        url: "/vehicle-service/monitoringCenter/getOnlineData",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((res) => {
          if (res.data.status == 0) {
            this.offlineNum = res.data.data.offlineNum;
            this.onLineNum = res.data.data.onLineNum;
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
    btn(val) {
      if (val == 1) {
        this.index = 1;
        this.$refs.footer.style.height = 250 + "px";
        this.$refs.map.style.height =
          this.$refs.realTimemonitoring.offsetHeight - 250 + "px";
      } else {
        this.index++;
        if (this.index % 2 !== 0) {
          this.icon = "el-icon-caret-bottom";
          this.$refs.footer.style.height = 250 + "px";
          this.$refs.map.style.height =
            this.$refs.realTimemonitoring.offsetHeight - 250 + "px";
        } else {
          this.icon = "el-icon-caret-top";
          this.$refs.footer.style.height = 45 + "px";
          this.$refs.map.style.height =
            this.$refs.realTimemonitoring.offsetHeight - 45 + "px";
        }
      }
    },
    handleOpen() {
      this.drawer = true;
      this.$refs.bannerRight.style.width = this.$refs.realTimemonitoring.offsetWidth - 300 + "px";
    },
    handleClose() {
      this.drawer = false;
      this.$refs.bannerRight.style.width = this.$refs.realTimemonitoring.offsetWidth - 20 + "px";
    },
    handleSelectionChange(val) {
      console.log(val)
      var newArr = val.map((item) => {
        return { ...item, address: "" };
      });
      var points = null;
      var arr = newArr.map((items)=>{
        console.log(items)
        let p = wgs84togcj02(items.lng,items.lat);
        let bd09 = gcj02tobd09(p[0],p[1]);
        points = new BMap.Point(bd09[0], bd09[1]);
        const gc = new BMap.Geocoder();
        gc.getLocation(points, function (rs) {
          const addComp = rs.addressComponents;
          const address = rs.address; //得到当前地址  
          items.address = address;
        });
        return items
      })   
      setTimeout(() => {
        this.multipleSelection = arr;
        this.addMarker();
        this.websocketsend();
      }, 300);
    },
    onLogin() {
      //初始化WebSocket连接
      var url = "ws://172.18.11.68:8888/conver-service";
      // var url = "ws://172.18.11.154:8888/conver-service";
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
        var points = null;
        for (var i = 0; i < this_.multipleSelection.length; i++) {
          if (this_.multipleSelection[i].simNo == obj.SIM_NO) {
            this_.multipleSelection[i].lat = obj.LAT;
            this_.multipleSelection[i].lng = obj.LNG;
            this_.multipleSelection[i].angle = obj.ANGLE;
            this_.multipleSelection[i].velocity = obj.VELOCITY;
            this_.multipleSelection[i].gpsTime = obj.GPS_TIME;
            // console.log(this_.multipleSelection)
          }
        }
        this_.tableDataList = this_.multipleSelection;
        this_.map.clearOverlays();
        this_.map.removeOverlay(this_.point)
        setTimeout(()=>{
          this_.addMarker();
        },150)
      };
    },
    websocketsend() {
      //数据发送
      var simNoStr = "";
      this.multipleSelection.map((res) => {
        simNoStr += res.simNo + ",";
      });
      simNoStr = simNoStr.substr(0, simNoStr.length - 1);
      this.ws.send(simNoStr);
      // console.log(simNoStr);
    },
    addMarker() {
      this.map.clearOverlays();
      this.pointList = [];
      this.multipleSelection.map((res) => {
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
      let brr = [];
      
      this.pointList.map((item1)=>{
        let p = wgs84togcj02(item1.lng,item1.lat);
        let bd09 = gcj02tobd09(p[0],p[1]);
        this.point = new BMap.Point(bd09[0],bd09[1]);
        const gc = new BMap.Geocoder();
        var this_ = this;
        gc.getLocation(this.point, function (rs) {
          const addComp = rs.addressComponents;
          const address = rs.address; //得到当前地址
          item1.address = address;
        });
        var marker = new BMap.Marker(this.point); // 创建标注
        var title = item1.title;
        var content = null;
        setTimeout(()=>{
          content = "机构名称:" + item1.companyName + "</br>" + "车辆速度:" +(item1.velocity || 0) +" Km/h" +"</br>" +"定位地址:" + item1.address;
          this.map.addOverlay(marker); // 将标注添加到地图中
          this.addClickHandler(title, content, marker);
        },300)
        var label = new BMap.Label(item1.vehicleNo, {
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
        return marker.setLabel(label);
      })
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
    toggleRowSelection(rows, selected) {
      //定位
      this.count = 0;
      rows.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row, selected);
        this.count++;
      });
      var point = new BMap.Point(rows[0].lng, rows[0].lat);
      this.map.panTo(point);
    },
    getTreeData() {
      //查询企业树
      axios({
        method: "get",
        url: "/vehicle-service/monitoringCenter/getEnterpriseTree",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status == 0) {
            this.treeData = res.data.data;
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
    query(data) {
      //查询车辆位置
      // console.log(data)
      this.str = "";
      this.$refs.tree.getCheckedNodes().map((res) => {
        this.str += res.id + ",";
      });
      this.str = this.str.substring(0, this.str.lastIndexOf(','));
      axios({
        method: "post",
        url: "/vehicle-service/monitoringCenter/selectListByPage",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          companyIds: this.str,
          vehicleNo: "",
          currentPage: 1,
          pageSize: 20,
        },
      })
        .then((res) => {
          console.log(res.data);
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
    getCheckedNodes() {
      console.log();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.str = "";
      this.$refs.tree.getCheckedNodes().map((res) => {
        this.str += res.id + ",";
      });
      this.str = this.str.substring(0, this.str.lastIndexOf(','));
      axios({
        method: "post",
        url: "/vehicle-service/monitoringCenter/selectListByPage",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        data: {
          companyIds: this.str,
          vehicleNo: "",
          currentPage: val,
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
    exportList() {
      //导出
      this.vehicleNoStr = "";
      // console.log(this.$refs.tree.getCheckedNodes());
      this.multipleSelection.map((res) => {
        this.vehicleNoStr += res.vehicleNo + ",";
      });
      this.vehicleNoStr = this.vehicleNoStr.substr(0, this.vehicleNoStr.length - 1);
      axios({
        method: "post",
        url: "/vehicle-service/monitoringCenter/export",
        headers: {
          Authorization: getCookie("HTBD_PASS"),
          language: this.$store.state.language,
        },
        responseType: "blob",
        data: {
          companyIds: this.str,
          vehicleNo:this.inputSIM,
          vehicleNos: this.vehicleNoStr,
        },
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.type === "application/json") {
            this.$message({
              type: "error",
              message: "下载失败，文件不存在或权限不足",
            });
          } else {
            let blob = new Blob([res.data]);
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob); //blob,file.fileName
            } else {
              let link = document.createElement("a");
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("click", false, false);
              link.href = URL.createObjectURL(blob);
              link.download = "车辆信息.xls";
              link.style.display = "none";
              document.body.appendChild(link);
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
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
    this.drawer = true;
    this.initMap();
    this.getTreeData();
    this.onLogin();
  },
  // destroyed() {
  //   this.ws.close(); //离开路由之后断开websocket连接
  // },
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
  width: calc(100% - 300px);
  height: 100%;
  float: right;
  position: relative;
  overflow: hidden;
}
#map {
  width: 100%;
  height: calc(100% - 42px);
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
