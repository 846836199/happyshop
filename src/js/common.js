/* 
* @Author: Marte
* @Date:   2018-10-18 17:57:45
* @Last Modified by:   Marte
* @Last Modified time: 2018-11-14 11:31:53
*/

/*
        随机验证码    
        随机输出N位随机数字字母
     */
function randomNL(n) {
  //随机的数字字母
  var str = "0123456789qwertyuiopasdfghjklxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  //输出N位随机数
  var rd = "";
  for (var i = 0; i < n; i++) {
    rd += str.charAt(parseInt(Math.random() * str.length));
  }
  return rd;
}

//-------------------------------------------------------------------------->
/*
        随机颜色
        随机输出16进制或者RGB;
        n=3 输出RGB
        n=16 输出16进制
     */
function randomC(n) {
  //16进制
  if (n === 16) {
    var str = "1234567890abcdef";
    var color = "";
    for (var i = 0; i < 6; i++) {
      color += str.charAt(parseInt(Math.random() * str.length));
    }
    return "#" + color;
    //RGB
  } else if (n === 3) {
    var r = parseInt(Math.random() * 256);
    var g = parseInt(Math.random() * 256);
    var b = parseInt(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  } else {
    conosole.log("实参的值应为3或16");
  }
}

//-------------------------------------------------------------------------->
/*
        过滤敏感词
        过滤默认词语或者自定义词语或者两者合一
        
        有一个实参，则使用默认过滤词语
        有两个实参,并且第二个为数组,数组元素都为字符串，则过滤自定义词语
        有三个实参，并且第二个为数组，第三个实参为true 则默认和自定义两者合一
     */
function filterW(str, arr, add) {
  var words = ["金三胖", "垃圾", "ma了个B", "cao", "gan", "草", "干"];
  var num = 0;
  //检测参数个数
  if (str && arr && add === true) {
    num = 3;
    var t = judge();
    if (t === false) {
      return "函数调用" + false;
    }
  } else if (str && arr) {
    num = 2;
    var t = judge();
    if (t === false) {
      return "函数调用" + false;
    }
  } else if (str) {
    num = 1;
  } else {
    console.log(参数不能为空);
    return "函数调用" + false;
  }
  switch (num) {
    //默认词库过滤
    case 1:
      //遍历词库，匹配过滤词语为**
      words.forEach(function(item) {
        // var reg = new RegExp(words.join('|'),'ig');
        var reg = new RegExp(item, "gi");
        // console.log(reg,str);
        str = str.replace(reg, "**");
      });
      // console.log(str);
      break;
    //替换词库过滤
    case 2:
      words = arr;
      //遍历词库，匹配过滤词语为**
      words.forEach(function(item) {
        var reg = new RegExp(item, "gi");
        // var reg = new RegExp(words.join('|'),'ig');
        str = str.replace(reg, "**");
      });
      break;
    //加词过滤
    case 3:
      //将arr中的词语插入词库
      arr.forEach(function(item) {
        words.push(item);
      });
      //遍历词库，匹配过滤词语为**
      words.forEach(function(item) {
        // var res = new RegExp(item,'gi');
        var reg = new RegExp(words.join("|"), "ig");
        str = str.replace(reg, "**");
      });
      break;
  }
  return str;
  //验证数组
  function judge() {
    var bool = true;
    //arr 是否为数组
    if (Array.isArray(arr)) {
      //arr 组成元素是否都为字符串
      for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] != "string") {
          bool = false;
        }
      }
      if (bool === false) {
        console.log("数组元素不全由字符串组成！");
        return false;
      }
    } else {
      console.log("arr不是数组");
      return false;
    }
  }
}

//-------------------------------------------------------------------------->
/*
    默认日期格式化输出为 “2015年08月24日 09:30:15 星期五”格式

    第一个参数为日期对象[第二个参数为是否隐藏小时分钟秒，false]

    无第二个参数，默认输出 2015年08月24日 09:30:15 星期五 格式
    有第二个参数并且为参数值false,输出 2015年08月24日 星期五 格式
    */

function formmatDate(date, bool) {
  var year = date.getFullYear();
  var month = getZero(date.getMonth() + 1);
  var day = date.getDate();
  var week = weekday(date.getDay());
  var hours = getZero(date.getHours());
  var minutes = getZero(date.getMinutes());
  var secs = getZero(date.getSeconds());
  hms = hours + ":" + minutes + ":" + secs;
  // console.log(xing);
  if (bool === false) {
    return (
      "当前时间为：" + year + "年" + month + "月" + day + "日 " + "星期" + week
    );
  } else {
    return (
      "当前时间为：" +
      year +
      "年" +
      month +
      "月" +
      day +
      "日 " +
      hms +
      " 星期" +
      week
    );
  }

  //加0
  function getZero(num) {
    if (num < 10) {
      console.log(num);
      return "0" + num;
    } else {
      return num;
    }
  }

  //返回星期几
  function weekday(day) {
    var week = "天一二三四五六";
    var str = week.charAt(day);
    return str;
  }
}
//------------------------------------------------------------------------>
/* 
     获取样式：可以获取行内和非行内样式
     参数一： obj 节点名
     参数二: name 属性名
   */
function getStyle(obj, name) {
  //获取样式
  if (obj.currentStyle) {
    //ie8 以下
    return obj.currentStyle[name];
  } else {
    //主流浏览器
    return getComputedStyle(obj, false)[name];
  }
}

//-------------------------------------------------------------------------->
//运动函数
//obj 运动对象
//json 属性，目标值 {'width':200,'height':400}
//fnend 回调函数（可选参数）
function moveFunc(obj, json, fnend) {
  clearInterval(obj.timer);
  //obj.timer 避免定时器混乱，每个对象都有一个timer
  obj.timer = setInterval(function() {
    var istrue = true;

    //1、获取属性名，获取键名：属性名->初始值
    for (var key in json) {
      var cur = 0; //存初始值
      if (key == "opacity") {
        cur = getStyle(obj, key) * 100; //透明度
      } else {
        cur = parseInt(getStyle(obj, key));
      }

      //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
      //距离越大，速度越大,下面的公式具备方向
      var speed = (json[key] - cur) / 6; //除数为速度比例
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

      //回调函数的开关，各值达到目标后使用回调函数
      if (cur != false) {
        //未达到目标值 为false
        istrue = false;
      } else {
        istrue = true;
      }

      //开始缓冲运动

      //判断是否为opacity
      if (key == "opacity") {
        obj.style.opacity = (cur + speed) / 100;
        obj.style.filter = "alpha(opacity=" + (cur + speed) + ")";
      } else {
        obj.style[key] = cur + speed + "px";
      }
    }

    //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
    if (istrue) {
      //达到目标值，关闭定时器，避免重复执行fnend回调函数
      clearInterval(obj.timer);
      //如果为true,证明以上属性都达到目标值了
      if (fnend) {
        fnend();
      }
    }
  }, 30);
}

//-------------------------------------------------------------------------->
//表单正则验证
/* 
        trim(str);  去除前后空格 
        tel(str);  手机号码
        email(str);  邮箱
        idCard(str); 身份证
        password(str); 密码
        passSure(str); 确认密码
        urlAdr(str);  链接
        userName(str); 用户名
        chinese(str); 中文
        date(str);  日期 1990-09-30 1990-3-5
   */

var formReg = {
  trim: function(str) {
    //去除前后空格
    var reg = /^\s+|\s$/g;
    return str.replace(reg, "");
  },
  tel: function(str) {
    //手机号码
    var reg = /^1[3-9]\d{9}$/;
    return reg.test(str); //符合正则返回true 否则false
  },
  email: function(str) {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(str);
  },
  idCard: function(str) {
    //身份证
    var reg = /^(\d{17}|\d{14})[\dX]$/;
    return reg.test(str);
  },
  password: function(str) {
    //密码 //6-18位首字母开头
    var reg = /^[a-zA-Z]\w{5,17}$/;
    return reg.test(str);
  },
  passSure: function(str1, str2) {
    //重复密码
    return str1 === str2;
  },
  urlAdr: function(str) {
    var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    return reg.test(str);
  },
  userName: function(str) {
    //账号字母开头,6-20位
    var reg = /^[a-zA-Z]\w{5,19}$/;
    return reg.test(str);
  },
  chinese: function(str) {
    //是否为中文
    var reg = /^[\u2E80-\u9FFF]+$/;
    return reg.test(str);
  },
  date: function(str) {
    //1990-09-30 |1990-9-15
    var reg = /^\d{4}-[0-1]?\d-[0-3]?\d$/;
    return reg.test(str);
  }
};

var Cookie = {
  set: function(name, value, prop) {
    //设置cookie
    //存数据到cookie里面:必写的
    var str = name + "=" + value;

    //json存后面一些可选参数
    //expires:设置失效时间
    if (prop) {
      if (prop.expires) {
        str += ";expires=" + prop.expires.toUTCString(); //把时间转成字符串
      }

      //设置path路径

      if (prop.path) {
        //如果设置了
        str += ";path=" + prop.path;
      }

      //domain设置可访问cookie的域名
      if (prop.domain) {
        str += ";domain=" + prop.domain;
      }
    }
    //写到cookie
    document.cookie = str;
  },
  get: function(key) {
    var cookies = document.cookie; //name=tiantian; age=18; usn=yuanyuan; pws=456123
    var arr = cookies.split("; "); //['name=tiantian','age=18','usn=yuanyuan','pws=456123']
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("="); //['name','tiantian']
      if (key == arr2[0]) {
        return arr2[1];
      }
    }
  },
  remove: function(key) {
    //删的原理:设置过期时间
    var now = new Date();
    now.setDate(now.getDate() - 1);
    this.set(key, "no", { expires: now });
  }
};

//------------------------------------>
//ajax
function ajax(method,url,data,success) {
  var req = new XMLHttpRequest();

  //GET传输方式
  if(method == "GET" && data) {
       url += "?" + data;
  }

  req.open(method,url,true);
  
  //发送请求
  //POST传输方式
  if(method == "POST"){
    req.setRequestHeader("content-type","application/x-www-form-urlencoded");
    req.send(data);
  }
  else{
    req.send();
  }
  
  //接受数据
  req.onreadystatechange = function() {
    if(req.readyState == 4){
      if(req.status == 200){
        //获取数据 执行回调函数
        if(success) {
          success(req.responseText);
        }
      } else {
        alert("error:"+req.status);
      }
    }
  }
}
