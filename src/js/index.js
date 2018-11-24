$(function () {
    //检测是否登录
    var uid = Cookie.get("uid");
    //登录验证提示
    var tipStr = {
        0: ["登录名可能是您的手机号、邮箱或用户名", "用户名不能为空"],
        1: ["密码可能为字母、数字或符号的组合", "密码不能为空"],
        2: ["请输入验证码", "验证码不能为空", "验证码错误"]
    }
    // console.log(uid);
    //已经登录
    if (uid) {
        //隐藏登录注册相关信息
        $("#header .loginStatus").find(".login").eq(0).hide();
        $("#header .loginStatus").find(".reg").eq(0).hide();
        $("#header .loginStatus").find(".reg_tip").eq(0).hide();
        $("#header .loginStatus").find("span").eq(0).html("欢迎您，" + uid);
        //显示用户界面
        $("#header .loginStatus").find(".logout").eq(0).show();

        //侧边栏 用户状态
        $("#sidebar .side_login").find(".islogin").eq(0).show();
        $("#sidebar .side_login").find(".unlogin").eq(0).hide();
        $("#sidebar .islogin").find("a").eq(0).html(uid + "&nbsp;您好");
    } else {
        //侧边栏 验证码初始化
        $("#sidebar .checkCode").find(".code").eq(0).html(randomNL(4));
    }

    //用户退出
    $("#header .loginStatus").find(".logout").click(function () {
        if (uid) {
            var tip = confirm("您确定要退出吗？");
            // console.log(uid);
            if (tip) {
                var day = new Date();
                day.setDate(day.getDate() - 1);
                document.cookie = "uid=out;expires=" + day.toUTCString() + ";path=/";
                location.href = "index1.html";
            }
        }
    });
    //点击隐藏注册福利提示
    $("#header .loginStatus .reg_tip").find("i").eq(0).click(function () {
        $(this).parent().hide();
    });

    //下载快乐购App二维码显示
    $("#header .downApp").hover(function () {
        $(this).find("div").eq(0).show();
    }, function () {
        $(this).find("div").eq(0).hide();
    });

    //客服中心菜单显示
    $("#header .service").hover(function () {
        $(this).addClass("ser_active");
        $(this).find(".ser_content").eq(0).show();
    }, function () {
        $(this).removeClass("ser_active");
        $(this).find(".ser_content").eq(0).hide();
    });

    //搜索框监听内容更改显示搜索提示
    $("#header .search").bind('input propertychange', function () {
        // console.log($(this));
        var val = $.trim($(this).find(".sea_input").eq(0).val());
        //搜索内容为空时隐藏
        if (val) {
            $(this).find(".search_list").eq(0).show();
        } else {
            $(this).find(".search_list").eq(0).hide();
        }
    });
    $("#header .search").find(".sea_input").eq(0).blur(function () {
        $("#header .search").find(".search_list").eq(0).hide(1000);
    });
    $("#header .search_list").find("li").hover(function () {
        $(this).addClass("sea_hover");
    }, function () {
        $(this).removeClass("sea_hover");
    });

    //头部购物车显示
    $("#header .head_cart").eq(0).hover(function () {
        $(this).addClass("head_cart_hover");
        $(this).find(".cart_list").eq(0).show();
    }, function () {
        $(this).removeClass("head_cart_hover");
        $(this).find(".cart_list").eq(0).hide();
    });

    //分类导航
    $("#nav .classfiy").find("li").hover(function () {
        $(this).addClass("li_hover");
    }, function () {
        $(this).removeClass("li_hover");
    });

    $("#nav .classfiy").find("a").hover(function () {
        $(this).addClass("item_hover");
    }, function () {
        $(this).removeClass("item_hover");
    });

    //侧边栏
    //-----用户状态
    //---------移入显示
    $("#sidebar .user").hover(function () {
        $(this).addClass("cart_bg");
        $(this).find(".side_login").eq(0).show();
    }, function () {
        $(this).removeClass("cart_bg");
        $(this).find(".side_login").eq(0).hide();
    });

    //-------------登录
    $("#sidebar .unlogin .input").find("input").focus(function () {
        //获取焦点时去除红框
        $(this).removeClass("focus");
        $(this).nextAll("p").eq(0).css("visibility", "visible");
        $(this).nextAll("p").eq(0).html(tipStr[$(this).parent().index()]);
    });
    //失焦时隐藏提示信息
    $("#sidebar .unlogin .input").find("input").blur(function () {
        $(this).nextAll("p").css("visibility", "hidden");
    });
    //点击更换验证码
    $("#sidebar .checkCode").find(".change").eq(0).click(function () {
        $(this).prev().html(randomNL(4));
    });

    $("#sidebar .unlogin").find(".btn").eq(0).click(function () {
        // console.log(1);
        //更换验证码
        var val1 = $.trim($("#sidebar .unlogin").find("input").eq(0).val());
        //用户名为空
        if (val1) {
            //密码为空
            var val2 = $.trim($("#sidebar .unlogin").find("input").eq(1).val());
            if (val2) {
                //验证码为空
                var val3 = $.trim($("#sidebar .unlogin").find("input").eq(2).val());
                if (val3) {
                    //验证码错误
                    var val4 = $("#sidebar .checkCode").find(".code").eq(0).html().toLowerCase();
                    if (val3 == val4) {
                        //账号密码验证
                        $.ajax({
                            type: "POST",
                            url: "api/login.php",
                            data: {
                                "username": val1,
                                "password": val2
                            },
                            success: function (data) {
                                var res = JSON.parse(data);
                                if (res.code == "0") {
                                    // console.log(res);
                                    alert("登录成功！");
                                    var day = new Date();
                                    day.setDate(day.getDate() + 7);
                                    document.cookie = "uid=" + res.uid + ";expires=" + day.toUTCString() + ";path=/";
                                    location.href = "index1.html";
                                } else {
                                    $("#sidebar .unlogin").find("p").eq(0).css("visibility", "visible");
                                    $("#sidebar .unlogin").find("p").eq(0).html("<i></i>用户名或密码错误！");
                                    //更新验证码
                                    $("#sidebar .checkCode").find(".code").eq(0).html(randomNL(4));
                                }
                            }
                        });
                    } else {
                        $("#sidebar .unlogin").find("p").eq(2).css("visibility", "visible");
                        $("#sidebar .unlogin").find("p").eq(2).html("<i></i>" + tipStr[2][2]);
                    }
                } else {
                    $("#sidebar .unlogin").find("input").eq(2).addClass("focus");
                    $("#sidebar .unlogin").find("p").eq(2).css("visibility", "visible");
                    $("#sidebar .unlogin").find("p").eq(2).html("<i></i>" + tipStr[2][1]);
                }
            } else {
                $("#sidebar .unlogin").find("p").eq(1).css("visibility", "visible");
                $("#sidebar .unlogin").find("p").eq(1).html("<i></i>" + tipStr[1][1]);
            }
        } else {
            $("#sidebar .unlogin").find("p").eq(0).css("visibility", "visible");
            $("#sidebar .unlogin").find("p").eq(0).html("<i></i>" + tipStr[0][1]);
        }
    });

    //------------用户功能框
    $("#sidebar .islogin .userFunc").find("div").hover(function () {
        $(this).addClass("func_hover");
    }, function () {
        $(this).removeClass("func_hover");
    });

    //-----------购物车功能
    $("#sidebar .side_cart").eq(0).hover(function () {
        $(this).addClass("cart_bg");
    }, function () {
        $(this).removeClass("cart_bg");
    });
    $("#sidebar .side_cart").eq(0).click(function () {
        if (uid) {
            location.href = "cart.html";
        } else {
            location.href = "login.html";
        }
    });

    //------------收藏
    $("#sidebar .collect").eq(0).hover(function () {
        $(this).addClass("cart_bg");
    }, function () {
        $(this).removeClass("cart_bg");
    });
    $("#sidebar .collect").eq(0).click(function () {
        if (uid) {
            alert("暂不支持");
        } else {
            location.href = "login.html";
        }
    });

    //-----------二维码
    $("#sidebar .QR").eq(0).hover(function () {
        $(this).addClass("cart_bg");
        $(this).find(".QRimg").eq(0).show();
    }, function () {
        $(this).removeClass("cart_bg");
        $(this).find(".QRimg").eq(0).hide();
    });

    //------------客服
    $("#sidebar .side_service").eq(0).hover(function () {
        $(this).addClass("cart_bg");
        $(this).find(".ser_content").eq(0).show();
    }, function () {
        $(this).removeClass("cart_bg");
        $(this).find(".ser_content").eq(0).hide();
    });

    //-----------返回顶部
    $("#sidebar .toTop").eq(0).hover(function () {
        $(this).addClass("cart_bg");
    }, function () {
        $(this).removeClass("cart_bg");
    });
    $("#sidebar .toTop").eq(0).click(function () {
        var h = window.scrollY;
        console.log(h);
        if (h > 20) {
            $("html,body").animate({
                scrollTop: 0
            }, "linear");
        }
    });

    //轮播图
    //---------li图片定位
    bannerResize();
    function bannerResize() {
        var w = $(window).width();
        var liW = $("#banner li").eq(0).width();
        // console.log(w,liW);
        var le = (liW - w) / 2;
        $("#banner li").css("left", -(le) + "px");
    }
    //窗口改变 图片位置跟着变
    $(window).resize(function () { 
        bannerResize();
    });
    //页码居中
    var pageW = $("#banner .pages").eq(0).width();
    $("#banner .pages").eq(0).css("margin-left",-pageW/2+"px");
    //-----------轮播
    var timer = null;
    clearInterval(timer);
    timer = setInterval(autoplay,5000);
    var num = 0;
    //全部透明
    $("#banner li").css({
        "opacity":0,
    });
    $("#banner li").eq(0).css("opacity",1);
    function autoplay(){
        //第一张淡出
        // var n = num;
        $("#banner li").eq(num).animate({opacity:0});
        num = ++num >= $("#banner li").size() ? 0 : num;
        $("#banner li").eq(num).animate({opacity:1});
        pageLight();
    }
    function pageLight(){
        $("#banner .pages").find("span").removeClass("active");
        $("#banner .pages").find("span").eq(num).addClass("active");
    }
    //鼠标移入停止动画 移出启动
    $("#banner").hover(function(){
        clearInterval(timer);
    },function(){
        clearInterval(timer);
        timer = setInterval(autoplay,5000);
    });

    //轮播页码点击换页
    $("#banner .pages").on("click","span",function(){
        var index = $(this).index();
        if(num != index){
            $("#banner li").eq(num).animate({opacity:0});
            $("#banner li").eq(index).animate({opacity:1});
            num = index;
            pageLight();
        }
    });

    //广告栏
    //----------点击切换选项卡
    $(".ad .ad_part").find("li").find(".active").eq(0).css("display","block");
    $(".ad .ad_part").find("li").click(function(){
        $(".ad .ad_part").find("li").find(".active").css("display","none");
        $(this).find(".active").eq(0).css("display","block");
        $(".ad .ad_content").css("display","none");
        $(".ad .ad_content").eq($(this).index()).css("display","block");
    });
    //-----------移入显示点击按钮;
    $(".ad .ad_content").hover(function(){
        $(this).find(".list_btn").eq(0).show();
    },function(){
        $(this).find(".list_btn").eq(0).hide();
    });
});