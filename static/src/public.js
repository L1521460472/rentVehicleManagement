//通过id名称获取元素对象
function $id(idName) {
  return document.getElementById(idName);
}
//随机获取min-max的随机整数
function getRand(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}
//判断一个数是否是素数
function isPrime(num) {
  for (var i = 2; i < num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}
//判断一个数在数组中是否存在
function hsEleInArr(arr, num) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      return true;
    }
  }
  return false;
}
//获取十六进制随机颜色值
function getColor() {
  var color = "#";
  var str = "0123456789abcdef";
  var rand;
  for (var i = 0; i < 6; i++) {
    rand = getRand(0, 15);
    color += str.charAt(rand);
  }
  return color;
}

//获取四位数的随机验证码
function getYZM(num) {
  //数字，字母（大小写字母）
  //随机从ASCII中获取数字字母
  //从48-122之间获取一个随机数
  //这个随机数包含了一些特殊字符
  //排除特殊字符 的ASCII码
  //通过ASCII码获取对应字符。
  //获取num次
  var rand, ch;
  var yzm = "";
  for (var i = 0; i < num; i++) {
    //从48-122之间获取一个随机数
    rand = getRand(48, 122);
    if ((rand >= 58 && rand <= 64) || (rand >= 91 && rand <= 96)) {
      //排除特殊字符 的ASCII码
      i--;
    } else {
      //通过ASCII码获取对应字符。
      ch = String.fromCharCode(rand);
      //console.log(typeof ch);
      yzm += ch;
    }
  }
  return yzm;
}

//封装一个时间函数，将时间本地化输出
function dateToString(date) {
  var str = "";
  var weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var f = date.getMinutes();
  var s = date.getSeconds();
  var w = date.getDay(); //0-6

  str += y + "年" + getDb(m) + "月" + getDb(d) + "号 ";
  str += getDb(h) + ":" + getDb(f) + ":" + getDb(s) + " ";
  str += weekArr[w];

  //m是一个个位数，在个位数前加0；
  //封装一个前面加的方法
  return str;
}

function getDb(num) {
  //小于10的数，前面加0
  return num < 10 ? "0" + num : num;
}
//获取两个时间对象的时间差的秒数
function getDifTime(startTime, endTime) {
  return (endTime.getTime() - startTime.getTime()) / 1000;
}

//兼容ie8通过className获取元素对象集合。
function getElesByClassName(className) {
  var elesArr = []; //保存所有以className命名的元素集合
  //通过标签名称获取页面所有的元素集合
  var allEle = document.getElementsByTagName("*");
  //遍历所有元素对象
  for (var i = 0; i < allEle.length; i++) {
    //判断每一个元素是否包含了className命名的元素对象，
    if (allEle[i].className === className) {
      //如果有，把这个元素对象push到一个新数组 中
      elesArr.push(allEle[i]);
    }
  }
  //console.log(allEle);
  //返回这个新数组
  return elesArr;
}
//封装一个函数，获取所有的元素节点
function getChidren(parentNode) {
  //获取 所有的子节点
  var children = parentNode.childNodes;
  var nodeArr = [];
  //遍历所有的子节点
  for (var i = 0; i < children.length; i++) {
    //判断是否是元素节点
    if (children[i].nodeType == 1) {
      //如果是元素节点，保存到nodeArr中
      nodeArr.push(children[i]);
    }
  }
  //返回nodeArr
  return nodeArr;
}
//添加新节点到目标节点的后面
function insertAfter(newNode, target) {
  //获取target的父节点
  var supNode = target.parentNode;
  var children = getChidren(supNode);
  //判断 target是否是父节点的最后一个子元素节点
  if (children[children.length - 1] === target) {
    //如果是：将新节点添加到父节点的最后
    supNode.appendChild(newNode);
  } else {
    //如果不是：说明target一定有下一个兄弟元素节点
    //将新节点添加到下一个兄弟元素节点的前面
    supNode.insertBefore(newNode, target.nextSibling);
  }
}
//兼容ie8获取事件对象的button属性
function getButton(eve) {
  //如果eve不是undefined说明就是高版本的浏览器
  if (eve) {
    //
    //高版本浏览器
    return eve.button;
  } else {
    //ie8下执行
    var but = window.event.button;
    switch (but) {
      case 1:
        return 0;
      case 4:
        return 1;
      case 2:
        return 2;
    }
  }
}
//兼容ie8实现阻止事件冒泡
function stopProp(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}
//兼容ie8实现阻止事件事件默认行为
function preventDef(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}
//兼容ie8实现事件监听
function addEvent(ele, event, callBack) {
  //fn = function(){alert(1)};
  //ele.addEventListener(event,fn);
  if (ele.addEventListener) {
    //现代浏览器
    ele.addEventListener(event, callBack);
  } else {
    //ie8
    ele.attachEvent("on" + event, callBack);
  }
}
//兼容ie8获取事件对象的page属性
function getPage(e) {
  //e.兼容好的事件对象
  var sleft = document.documentElement.scrollLeft || document.body.scrollLeft;
  var stop = document.documentElement.scrollTop || document.body.scrollTop;
  return {
    x: e.clientX + sleft,
    y: e.clientY + stop,
  };
}
//兼容ie8去掉字符串的左右空格
function myTrim(str) {
  //return str.replace(/^\s+/,"");//去掉left
  //return str.replace(/\s+$/,"");//去掉right
  return str.replace(/^\s+|\s+$/g, ""); //去掉前后空格
}

function setCookie(key, value, iDay) {
  //设置cookie,按时间
  var oDate = new Date();
  oDate.setTime(oDate.getTime() + iDay * 24 * 60 * 60 * 1000); //设置过期时间,getTime()设置时间
  document.cookie = key + "=" + value + ";expires=" + oDate.toGMTString();
}

function getCookie(key) {
  //获取指定的key的cookie值
  var arr = document.cookie.split(";"); //获取当前域名的所有cookie，以;分割成数组。
  for (var i = 0; i < arr.length; i++) {
    var brr = arr[i].split("=");
    if (brr[0].trim() == key) {
      return brr[1];
    }
  }
  return ""; //没有找到返回值
}

function removeCookie(key) {
  //移除cookie
  setCookie(key, 1, -1);
}

function dateToString(date) {
  //日期转字符串
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString();
  var day = date.getDate().toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  var dateTime = year + "-" + month + "-" + day;
  return dateTime;
}

function debounce(fn, delay) {
  //防抖后
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}

function throttle(fn, delay) {
  //节流后
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(function() {
      fn();
      flag = true;
    }, delay);
  };
}
// 机构编码验证
function regexpCode(value) {
  let reg = /^[A-Za-z0-9]+$/
  return reg.test(value)
}
// 联系电话验证
function regexpMobile(value) {
  let reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}$)/
  return reg.test(value)
}
// 邮箱验证
function regexpEmail(value) {
  let reg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
  return reg.test(value)
}
// 验证地址
function regexpAddr(value) {
  let reg = /^[0-9]*$/
  return reg.test(value)

}
// 验证开户行
function regexpBankName(value) {
  let reg = /^[\u4e00-\u9fa5]{0,}$/
  return reg.test(value)

}
// 验证身份证驾驶证（只做数字大写字母校验）
function regexpidCard(value) {
  let reg = /^[A-Z0-9]+$/
  return reg.test(value)
}
// 获取页面权限按钮
function getMenuBtnList(menuList, path) {
  let btnList = []
  menuList.map(item => {
    if (item.url == path) {
      btnList = item.children
      return
    }
    item.children.map(item2 => {
      if (item2.url == path) {
        btnList = item2.children
        return
      }
      item2.children.map(item3 => {
        if (item3.url == path) {
          btnList = item3.children
          return
        }
      })
    })
  })
  return btnList
}

//格式化金额
function formatJE(money) {
  if (money) {
    let arr = String(money).split('.');
    if (arr.length == 1) {
      money = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + ".00";
    } else {
      if(arr[1].length==1){
        arr[1]=arr[1]+'0'
      }
      money = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + "." + arr[1];
    }
  }
  return money;
}
function formatJE2(money) {
  if (money) {
    money = String(money).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
  return money;
}
//格式化时间
//formatDate('yyyy-MM-dd HH:mm:ss')
//formatDate('yyyy/MM/dd HH:mm:ss')
function formatDate(date,fmt) {
        if(!date){
          return ""
        }
        if(typeof date =='string'){
          date=new Date(date);
        }
        var o = {
            "M+": date.getMonth() + 1,//月份
            "d+": date.getDate(), //日
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
}
// 下载附件
function download(url,fileName) {
  var x = new XMLHttpRequest();
  x.open("GET",`${url}`, true);
  x.responseType = 'blob';
  x.onload=function(e) {
      var url = window.URL.createObjectURL(x.response)
      var a = document.createElement('a');
      a.href = url
      a.download = fileName;
      a.click()
  }
  x.send(null);
}
//将一个对象属性赋值到另一个对象对应属性里面
function convertObject(target,origin){
  if(origin&&target){
     for(var pname in origin){
       if(target.hasOwnProperty(pname)){
         target[pname]=origin[pname];
       }
     }
  }
}
//打开一个新的标签页
function openNewTab($this,title,url,params){
  if($this&&$this.$store){
    var router={name:title,url:url,params:params}
    $this.$store.dispatch('openNewTab',router)
  }
}
// const downloadRes = async (url, name) => {
//   let response = await fetch(url)
//   // 内容转变成blob地址
//   let blob = await response.blob()
//   // 创建隐藏的可下载链接
//   let objectUrl = window.URL.createObjectURL(blob)
//   let a = document.createElement('a')
//   //地址
//   a.href = objectUrl
//   //修改文件名
//   a.download = name
//   // 触发点击
//   document.body.appendChild(a)
//   a.click()
//   //移除
//   setTimeout(() => document.body.removeChild(a), 1000)
// }
module.exports = {
  setCookie,
  getCookie,
  removeCookie,
  dateToString,
  getMenuBtnList, 
  regexpCode,
  regexpMobile,
  regexpEmail,
  regexpAddr,
  regexpBankName,
  regexpidCard,
  formatJE,
  formatJE2,
  formatDate,
  download,
  openNewTab,
  convertObject,
  debounce
  // downloadRes
};
