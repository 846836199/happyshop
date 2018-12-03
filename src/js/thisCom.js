$(function () {
    //检测是否登录
    var uid = Cookie.get("uid");
    //登录验证提示
    var tipStr = {
        0: ["登录名可能是您的手机号、邮箱或用户名", "用户名不能为空"],
        1: ["密码可能为字母、数字或符号的组合", "密码不能为空"],
        2: ["请输入验证码", "验证码不能为空", "验证码错误"]
    }
    // var thisherf = decodeURIComponent(location.search.slice(1));

    // console.log(thisclid,thisname);
    //渲染区-----------------------------------------------》
    topcart();

    function topcart() {
        if (uid) {
            // console.log(uid);
            $.ajax({
                type: "GET",
                cache: false,
                url: "../api/cart.php",
                data: {
                    "uid": uid
                },
                success: function (data) {
                    var res = JSON.parse(data);
                    if (res.code == "0") {
                        $(".cart_list .cartTip").hide();
                        var list = res.datalist;
                        // console.log(list.length);
                        //显示商品数量
                        $(".cartContent .cart_total").find(".goodn").html(list.length);
                        $(".head_cart .gou_nums").html(list.length);
                        $(".sidebar .side_cart").find("span").html(list.length);
                        var total = 0;
                        var html = list.map(function (item) {
                            total += item.price * 1 * item.nums;
                            //获取第一张大图
                            var imgstr = item.bigimg.split("-")[0];
                            //截取图片路径
                            return `<li data-id="${item.cid}">
                                    <img src="${imgstr}" alt="" class="fl goodImg" />
                                    <a href="javascript:;" class="fl goodName">${item.goodname}</a>
                                    <p class="fr goodMess">
                                    ￥<span class="goodp">${(item.price*1).toFixed(2)}</span> × <span class="gn">${item.nums}</span>
                                    </p>
                                    <a href="javascript:;" class="del fr">删除</a>
                                </li>`;
                        }).join("");
                        $(".cartContent .list").html(html);
                        $(".cartContent .goodt").html(total.toFixed(2));
                        //总价
                        $(".cart_list .cartContent").show();
                    } else {
                        $(".cart_list .cartContent").hide();
                        $(".cart_list .cartTip").html("购物车没商品&nbsp;赶快去选购吧");
                        $(".cart_list .cartTip").show();
                    }
                }
            });
        } else {
            $(".cart_list .cartContent").hide();
            $(".cart_list .cartTip").html(`您还没有登录！<a href="html/login.html">登录</>`);
            $(".cart_list .cartTip").show();
        }

    }
    //头部分类渲染
    $.ajax({
        type: "GET",
        cache: false,
        url: "../api/class.php",
        data: {
            bid: 1
        },
        success: function (data) {
            var res = JSON.parse(data);
            if (res.code == "0") {
                // console.log(res);
                var list = res.datalist;
                var html = list.map(function (item) {
                    return `<a href="javascript:;" class="clearfix" 
                data-id="${item.clid}">${item.sclass}<span>&gt;</span></a>`;
                }).join("");
                // console.log($(".classfiy").find(".item_con"));
                $(".classfiy").find(".item_con").eq(0).html(html);
            }
        }
    });
    $.ajax({
        type: "GET",
        cache: false,
        url: "../api/class.php",
        data: {
            bid: 2
        },
        success: function (data) {
            var res = JSON.parse(data);
            if (res.code == "0") {
                // console.log(res);
                var list = res.datalist;
                var html = list.map(function (item) {
                    return `<a href="javascript:;" class="clearfix" 
                data-id="${item.clid}">${item.sclass}<span>&gt;</span></a>`;
                }).join("");
                // console.log($(".classfiy").find(".item_con"));
                $(".classfiy").find(".item_con").eq(1).html(html);
            }
        }
    });
    //功能区-------------------------------------------------------》

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
                location.href = "../index.html";
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
        topcart();
    }, function () {
        $(this).removeClass("head_cart_hover");
        $(this).find(".cart_list").eq(0).hide();
    });
    //点击跳转购物车
    $(".cartContent .toCart").click(function(){
        window.open("../html/cart.html");
    });
    //购物车删除 
    $(".cartContent .list").on("click", ".del", function () {
        var cid = $(this).parent().attr("data-id");
        console.log(cid);
        var tip = confirm("您确定要移除这个商品吗？");
        if (tip) {
            $.ajax({
                type: "GET",
                url: "../api/newDel.php",
                data: {
                    cid: cid
                },
                success: function (data) {
                    var res = JSON.parse(data);
                    if (res.code == "0") {
                        topcart();
                    }
                }.bind($(this))
            });
        }
    });

    //分类导航
    var navkey = true;
    $("#nav .nav_btn").find("a").eq(0).click(function () {
        if (navkey) {
            $("#nav .classfiy").eq(0).slideDown();
        } else {
            $("#nav .classfiy").eq(0).slideUp();
        }
        navkey = !navkey;
    });
    $("#nav .classfiy").find("li").hover(function () {
        $(this).addClass("li_hover");
    }, function () {
        $(this).removeClass("li_hover");
    });

    //点击跳转全部商品列表
    $("#nav .classfiy").find("li").click(function () {
        window.open("../html/list.html?clid=0&name=全部商品");
    });
    $("#nav .classfiy .item_con").on("mouseenter", "a", function () {
        $(this).addClass("item_hover");
    });
    $("#nav .classfiy .item_con").on("mouseleave", "a", function () {
        $(this).removeClass("item_hover");
    });
    $("#nav .classfiy .item_con").on("click", "a", function () {
        var clid = $(this).attr("data-id");
        var name = $(this).text().slice(0, -1);
        window.open("../html/list.html?clid=" + clid + "&name=" + name);
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
                                    location.href = "index.html";
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
        topcart();
    }, function () {
        $(this).removeClass("cart_bg");
    });
    // console.log(uid);
    $("#sidebar .side_cart").eq(0).click(function () {
        if (uid) {
            console.log(uid);
            location.href = "../html/cart.html?uid=" + uid;
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
        // console.log(h);
        if (h > 20) {
            $("html,body").animate({
                scrollTop: 0
            }, "slow");
        }
    });
    $(document).on("scroll", function () {
        var t = $(document).scrollTop();
        if (t > 200) {
            $("#sidebar .side_bottom").find(".toTop").eq(0).css("opacity", 1);
        } else {
            $("#sidebar .side_bottom").find(".toTop").eq(0).css("opacity", 0.6);
        }
    });
});