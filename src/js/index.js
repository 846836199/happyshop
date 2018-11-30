$(function () {
    //检测是否登录
    var uid = Cookie.get("uid");
    //登录验证提示
    var tipStr = {
        0: ["登录名可能是您的手机号、邮箱或用户名", "用户名不能为空"],
        1: ["密码可能为字母、数字或符号的组合", "密码不能为空"],
        2: ["请输入验证码", "验证码不能为空", "验证码错误"]
    }

    //广告栏 节点 宽度 开关
    var lisW = 0;
    var key = true;
    var key2 = true;

    //限时抢购 节点 宽度 开关
    var limW1 = 0;
    var limW2 = 0;
    var lim_key = true;
    var lim_key2 = true;

    //新品推荐
    var newNum = 0;
    var newAllNum = 0;
    // console.log(uid);
//渲染区-------------------------------------------------------------------------------》
    //顶部购物车渲染
    topcart();
    function topcart(){
        if(uid){
            // console.log(uid);
            $.ajax({
                type:"GET",
                cache:false,
                url:"api/cart.php",
                data:{"uid":uid},
                success:function(data){
                    var res = JSON.parse(data);
                    if(res.code == "0"){
                        $(".cart_list .cartTip").hide();
                        var list = res.datalist;
                        // console.log(list.length);
                        //显示商品数量
                        $(".cartContent .cart_total").find(".goodn").html(list.length);
                        $(".head_cart .gou_nums").html(list.length);
                        $(".sidebar .side_cart").find("span").html(list.length);
                        var total = 0;
                        var html = list.map(function(item){
                            total += item.price*1*item.nums;
                            //获取第一张大图
                            var imgstr = item.bigimg.split("-")[0];
                            //截取图片路径
                            imgstr = imgstr.slice(3);
                            return `<li data-id="${item.cid}">
                                        <img src="${imgstr}" alt="" class="fl goodImg" />
                                        <a href="javascript:;" class="fl goodName">${item.goodname}</a>
                                        <p class="fr goodMess">
                                        ￥<span class="goodp">${(item.price*1).toFixed(2)}</span> × <span class="gn">${item.nums}</span>
                                        </p>
                                        <a href="javascript:;" class="del fr">删除</a>
                                    </li>`;}
                            ).join("");
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
        type:"GET",
        cache:false,
        url:"api/class.php",
        data:{bid:1},
        success:function(data){
            var res = JSON.parse(data);
            if(res.code == "0"){
                // console.log(res);
                var list = res.datalist;
                var html = list.map(function(item){
                    return `<a href="javascript:;" class="clearfix" 
                data-id="${item.clid}">${item.sclass}<span>&gt;</span></a>`;
                }).join("");
                // console.log($(".classfiy").find(".item_con"));
                $(".classfiy").find(".item_con").eq(0).html(html);
                bannerResize();
            }
        }
    });
    $.ajax({
        type:"GET",
        cache:false,
        url:"api/class.php",
        data:{bid:2},
        success:function(data){
            var res = JSON.parse(data);
            if(res.code == "0"){
                // console.log(res);
                var list = res.datalist;
                var html = list.map(function(item){
                    return `<a href="javascript:;" class="clearfix" 
                data-id="${item.clid}">${item.sclass}<span>&gt;</span></a>`;
                }).join("");
                // console.log($(".classfiy").find(".item_con"));
                $(".classfiy").find(".item_con").eq(1).html(html);
            }
        }
    });

    //--------广告栏渲染
    //------------广告第一栏
    $.ajax({
        type:"GET",
        url:"api/goodlist.php",
        cache:false,
        data:{"page":1,"nums":10,"order":"asc"},
        success:function(data){
            var res = JSON.parse(data);
            if(res.code == "0"){
                var list = res.datalist;
                // console.log(list);
                // console.log(list[0].bigimg.split("-")[0].slice(3));
                var html = list.map(function(item){
                    //获取第一张大图
                    var imgstr = item.bigimg.split("-")[0];
                    //截取图片路径
                    imgstr = imgstr.slice(3);
                    return `<li data-id="${item.gid}">
                                <a href="javascript:;"> <img src="${imgstr}" alt="" /> </a>
                                <p class="tip">${item.jianjie}</p>
                                <p class="goodName">
                                <a href="javascript:;">${item.goodname}</a>
                                </p>
                                <p class="goodPrice">
                                ￥<span>${item.price}</span>&nbsp;<del>￥${item.delprice}</del>
                                </p>
                                <span class="wait"><i></i>10:45</span>
                                <span class="now">正在播出</span>
                            </li>`;
                }).join("");
                $(".ad .ad_content").eq(0).find(".list").html(html);
                var adW = ($(".ad .list").find("li").eq(0).width()+6)*$(".ad .list").eq(0).find("li").size();
                // var adW2 = ($(".ad .list").find("li").eq(0).width()+6)*$(".ad .list").eq(1).find("li").size();
                //一页的宽度
                lisW = ($(".ad .list").find("li").eq(0).width()+6)*5;
                // console.log(lisW);
                //设置ul的宽度 left的坐标
                $(".ad .list").eq(0).css({
                    "width":adW+"px",
                    "left":0
                });
            }
        }
    });
    //------------广告第二栏
    $.ajax({
        type:"GET",
        url:"api/goodlist.php",
        cache:false,
        data:{"page":2,"nums":6,"order":"asc"},
        success:function(data){
            var res = JSON.parse(data);
            if(res.code == "0"){
                var list = res.datalist;
                // console.log(list);
                // console.log(list[0].bigimg.split("-")[0].slice(3));
                var html = list.map(function(item){
                    //获取第一张大图
                    var imgstr = item.bigimg.split("-")[0];
                    //截取图片路径
                    imgstr = imgstr.slice(3);
                    return `<li data-id="${item.gid}">
                                <a href="javascript:;"> <img src="${imgstr}" alt="" /> </a>
                                <p class="tip">${item.jianjie}</p>
                                <p class="goodName">
                                <a href="javascript:;">${item.goodname}</a>
                                </p>
                                <p class="goodPrice">
                                ￥<span>${item.price}</span>&nbsp;<del>￥${item.delprice}</del>
                                </p>
                                <span class="wait"><i></i>10:45</span>
                                <span class="now">正在播出</span>
                            </li>`;
                }).join("");
                $(".ad .ad_content").eq(1).find(".list").html(html);
                var adW = ($(".ad .list").find("li").eq(0).width()+6)*$(".ad .list").eq(1).find("li").size();
                // var adW2 = ($(".ad .list").find("li").eq(0).width()+6)*$(".ad .list").eq(1).find("li").size();
                //一页的宽度
                lisW = ($(".ad .list").find("li").eq(0).width()+6)*5;
                // console.log(lisW);
                //设置ul的宽度 left的坐标
                $(".ad .list").eq(1).css({
                    "width":adW+"px",
                    "left":0
                });
            }
        }
    });

    //--------限时抢购
    $.ajax({
        type:"GET",
        url:"api/goodlist.php",
        cache:false,
        data:{"page":1,nums:30},
        success:function(data){
            var res = JSON.parse(data);
            // console.log(res);
            if(res.code == "0"){
                var list = res.datalist;
                var html1 = "";
                var html2 = "";
                var html3 = "";
                for(let i=0;i<10;i++){
                    var imgstr = list[i].bigimg.split("-")[0];
                    //截取图片路径
                    imgstr = imgstr.slice(3);
                    html1+= `<li data-id="${list[i].gid}">
                                <div class="limit_img">
                                <img src="${imgstr}" alt="" />
                                <p><span>抢光了!</span></p>
                                </div>
                                <p class="limit_time">
                                <i></i>&nbsp;据开始<span>&nbsp;12:&nbsp;12:&nbsp;12</span>
                                </p>
                                <div class="limit_name">
                                <p class="limit_title">${list[i].jianjie}</p>
                                <p class="name">${list[i].goodname}</p>
                                </div>
                                <div class="limit_price">
                                <p>￥<span>${list[i].price}</span><del>￥${list[i].delprice}</del></p>
                                <input type="button" value="立即抢购" />
                                </div>
                            </li>`;
                }
                for(let i=10;i<20;i++){
                    var imgstr = list[i].bigimg.split("-")[0];
                    //截取图片路径
                    imgstr = imgstr.slice(3);
                    html2+= `<li data-id="${list[i].gid}">
                                <div class="limit_img">
                                <img src="${imgstr}" alt="" />
                                <p><span>抢光了!</span></p>
                                </div>
                                <p class="limit_time">
                                <i></i>&nbsp;据开始<span>&nbsp;12:&nbsp;12:&nbsp;12</span>
                                </p>
                                <div class="limit_name">
                                <p class="limit_title">${list[i].jianjie}</p>
                                <p class="name">${list[i].goodname}</p>
                                </div>
                                <div class="limit_price">
                                <p>￥<span>${list[i].price}</span><del>￥${list[i].delprice}</del></p>
                                <input type="button" value="立即抢购" />
                                </div>
                            </li>`;
                }
                for(let i=20;i<30;i++){
                    var imgstr = list[i].bigimg.split("-")[0];
                    //截取图片路径
                    imgstr = imgstr.slice(3);
                    html3+= `<li data-id="${list[i].gid}">
                                <div class="limit_img">
                                <img src="${imgstr}" alt="" />
                                <p><span>抢光了!</span></p>
                                </div>
                                <p class="limit_time">
                                <i></i>&nbsp;据开始<span>&nbsp;12:&nbsp;12:&nbsp;12</span>
                                </p>
                                <div class="limit_name">
                                <p class="limit_title">${list[i].jianjie}</p>
                                <p class="name">${list[i].goodname}</p>
                                </div>
                                <div class="limit_price">
                                <p>￥<span>${list[i].price}</span><del>￥${list[i].delprice}</del></p>
                                <input type="button" value="立即抢购" />
                                </div>
                            </li>`;
                }
                //8点专场渲染
                $(".limit_buy .limit_content").eq(0).find(".limit_list").html(html1);
                //15点专场
                $(".limit_buy .limit_content").eq(1).find(".limit_list").html(html2);
                //19点专场
                $(".limit_buy .limit_content").eq(2).find(".limit_list").html(html3);
                //设置列表默认宽度
                limW1 = $(".limit_buy .limit_list").find("li").eq(0).width()+10;
                //一页宽度
                limW2 = limW1*5;
                $(".limit_buy .limit_content").each(function(){
                    var w = limW1*$(this).find(".limit_list").eq(0).find("li").size();
                    // console.log(w);
                    $(this).find(".limit_list").eq(0).css("width",w+"px");
                });
            }
            
        }
    });

    //--------新品推荐
    $.ajax({
        type:"GET",
        cache:false,
        url:"api/goodlist.php",
        data:{page:4,nums:5},
        success:function(data){
            var res = JSON.parse(data);
            // console.log(res);
            newAllNum = res.total;
            var list = res.datalist;
            var html = list.map(function(item){
                var imgstr = item.bigimg.split("-")[0];
                //截取图片路径
                imgstr = imgstr.slice(3);
                return `<li data-id="${item.gid}">
                            <div class="new_img"><img src="${imgstr}" alt="" /></div>
                            <div class="good_name">
                            <p class="good_title">${item.jianjie}</p>
                            <p class="name">${item.goodname}</p>
                            </div>
                            <div class="good_price">
                            ￥<span>${item.price}</span><del>￥${item.delprice}</del>
                            </div>
                        </li>`;
            }).join("");
            $(".new_rec .new_content").find(".new_list").html(html);
        }
    });

    //---------个护美妆
    //-------------分类渲染
    $.ajax({
        type:"GET",
        cache:false,
        url:"api/class.php",
        data:{bid:1},
        success:function(data){
            var res = JSON.parse(data);
            // console.log(res);
            if(res.code == "0"){
                var list = res.datalist;
                var html = list.map(function(item){
                return `<a href="javascript:;" data-id="${item.clid}">${item.sclass}<i></i></a>`;
                }).join("");
                var html2 = list.map(function(item){
                    return `<div class="block_content" data-id="g${item.clid}"></div>`;
                }).join("");
                $(".Beauty .port_page").html(`<a href="javascript:;" class="page_hover">热销<i></i></a>${html}`);
                var con = $(".Beauty .cons").html();
                $(".Beauty .cons").html(con+html2);
                $(".Beauty .port_page").find("a").data("key",true);
            }
        }
    });
    //----------内容渲染
    function addGood(list){
        var html = list.map(function(item){
            var imgstr = item.bigimg.split("-")[0];
            //截取图片路径
            imgstr = imgstr.slice(3);
            return `<li data-id="${item.gid}">
                        <div class="good_img"><img src="${imgstr}" alt="" /></div>
                        <div class="good_name">
                        <p class="good_title">${item.jianjie}</p>
                        <p class="name">${item.goodname}</p>
                        </div>
                        <div class="good_price">
                        ￥<span>${item.price}</span><del>￥${item.delprice}</del>
                        </div>
                    </li>`;
        }).join("");
        var h = `<div class="big_img">
                    <img src="img/block1.jpg" alt="">
                </div>
                <ul class="block_good list_style clearfix">${html}</ul>`
        return h;
    }
    $.ajax({
        type:"GET",
        cache:false,
        url:"api/classgood.php",
        data:{clid:1},
        success:function(data){
            var res = JSON.parse(data);
            // console.log(res);
            if(res.code == "0"){
                var list = res.datalist;
                $(".Beauty").find(".block_content").eq(0).html(addGood(list));
            }
        }
    });
    //---------食品健康
    //-------------分类渲染
    $.ajax({
        type:"GET",
        cache:false,
        url:"api/class.php",
        data:{bid:2},
        success:function(data){
            var res = JSON.parse(data);
            // console.log(res);
            if(res.code == "0"){
                var list = res.datalist;
                var html = list.map(function(item){
                return `<a href="javascript:;" data-id="${item.clid}">${item.sclass}<i></i></a>`;
                }).join("");
                var html2 = list.map(function(item){
                    return `<div class="block_content" data-id="g${item.clid}"></div>`;
                }).join("");
                $(".food .port_page").html(`<a href="javascript:;" class="page_hover">热销<i></i></a>${html}`);
                var con = $(".food .cons").html();
                $(".food .cons").html(con+html2);
                $(".food .port_page").find("a").data("key",true);
            }
        }
    });
    //----------内容渲染
    function addGood(list){
        var html = list.map(function(item){
            var imgstr = item.bigimg.split("-")[0];
            //截取图片路径
            imgstr = imgstr.slice(3);
            return `<li data-id="${item.gid}">
                        <div class="good_img"><img src="${imgstr}" alt="" /></div>
                        <div class="good_name">
                        <p class="good_title">${item.jianjie}</p>
                        <p class="name">${item.goodname}</p>
                        </div>
                        <div class="good_price">
                        ￥<span>${item.price}</span><del>￥${item.delprice}</del>
                        </div>
                    </li>`;
        }).join("");
        var h = `<div class="big_img">
                    <img src="img/block1.jpg" alt="">
                </div>
                <ul class="block_good list_style clearfix">${html}</ul>`
        return h;
    }
    $.ajax({
        type:"GET",
        cache:false,
        url:"api/classgood.php",
        data:{clid:7},
        success:function(data){
            var res = JSON.parse(data);
            // console.log(res);
            if(res.code == "0"){
                var list = res.datalist;
                $(".food").find(".block_content").eq(0).html(addGood(list));
            }
        }
    });
//功能区-------------------------------------------------------------------------------》
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
            topcart();
        }, function () {
            $(this).removeClass("head_cart_hover");
            $(this).find(".cart_list").eq(0).hide();
        });
        //点击跳转购物车
        $(".cartContent .toCart").click(function(){
            window.open("html/cart.html");
        });
        //购物车删除 
        $(".cartContent .list").on("click",".del",function(){
            var cid = $(this).parent().attr("data-id");
            console.log(cid);
            var tip = confirm("您确定要移除这个商品吗？");
            if(tip){
                $.ajax({
                    type:"GET",
                    url:"api/newDel.php",
                    data:{cid:cid},
                    success:function(data){
                        var res = JSON.parse(data);
                        if(res.code == "0"){
                            topcart();
                        }
                    }.bind($(this))
                });
            }
        });
    
        //分类导航
        //---------点击li跳转到全部商品列表
        $("#nav .classfiy").find("li").click(function(){
            window.open("html/list.html?clid=0&name=全部商品");
        });
        $("#nav .classfiy").find("li").hover(function () {
            $(this).addClass("li_hover");
        }, function () {
            $(this).removeClass("li_hover");
        });
        //触摸
        $("#nav .classfiy .item_con").on("mouseenter","a",function(){
            $(this).addClass("item_hover");
        });
        $("#nav .classfiy .item_con").on("mouseleave","a",function(){
            $(this).removeClass("item_hover");
        });
        $("#nav .classfiy .item_con").on("click","a",function(){
            var clid = $(this).attr("data-id");
            var name = $(this).text().slice(0,-1);
            window.open("html/list.html?clid="+clid+"&name="+name);
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
            topcart();
        }, function () {
            $(this).removeClass("cart_bg");
        });
        $("#sidebar .side_cart").eq(0).click(function () {
            if (uid) {
                location.href = "html/cart.html?uid="+uid;
            } else {
                location.href = "html/login.html";
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
                },"slow");
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
        $(this).find(".prev").eq(0).show();
        $(this).find(".next").eq(0).show();
    },function(){
        $(this).find(".prev").eq(0).hide();
        $(this).find(".next").eq(0).hide();
    });

    $(".ad .list").on("mouseenter","li",function(){
        $(this).addClass("good_hover");
    });
    $(".ad .list").on("mouseleave","li",function(){
        $(this).removeClass("good_hover");
    });

    //广告栏轮播
    //跳转全部商品的商品列表

    //---------点击滚动

    $(".ad .ad_content").find(".list").data("num",0);
    // console.log($(".ad .ad_content").find(".list").eq(0).data("num"));
    $(".ad .ad_content").find(".next").click(function(){
        // $(this).next().find(".list").stop(false,true);
        var le = $(this).next().find(".list").css("left");
        le = le.slice(0,-2);
        // console.log(le);
        //da
        if(le>-($(this).next().find(".list").width()-lisW) && key){
            var num = $(this).next().find(".list").data("num")+1;
            
            le = (le*1+lisW)*num;
            key = false;
            $(this).next().find(".list").animate({left:-le+"px"},function(){
                key = true;
            });
        }
    });
    $(".ad .ad_content").find(".prev").click(function(){
        $(this).nextAll(".ad_list").eq(0).stop(false,true);
        var le = $(this).nextAll(".ad_list").eq(0).find(".list").css("left");
        le = le.slice(0,-2);
        // console.log(le);
        if(le<0 && key2){
            var num = $(this).next().find(".list").data("num")-1;
            le = (le*1+lisW)*num;
            key2 = false;
            $(this).nextAll(".ad_list").eq(0).find(".list").animate({left:-le+"px"},function(){
                key2 = true;
            });
        }
    });
    //-----------------点击商品跳转到详情页
    $(".ad .ad_content .list").on("click","li",function(){
        // console.log($(this).attr("data-id"));
        var gid = $(this).attr("data-id")
        window.open("html/details.html?gid="+gid);
    });
    
    //限时抢购轮播

    $(".limit_buy .limit_content").find(".next").click(function(){
        // $(this).next().find(".list").stop(false,true);
        var le = $(this).prevAll(".limit_list").eq(0).css("left");
        le = le.slice(0,-2);
        
        if(le>-($(this).prevAll(".limit_list").eq(0).width()-limW2) && lim_key){
            lim_key =false;
            wid = le*1 + limW2;
            // console.log(wid);
            $(this).prevAll(".limit_list").eq(0).animate({left:-wid+"px"},function(){
                lim_key = true;
            });
        }
    });
    $(".limit_buy .limit_content").find(".prev").click(function(){
        var le = $(this).prev().css("left");
        le = le.slice(0,-2);
        // console.log(le);
        if(le<0 && lim_key2){
            wid = le*1 + limW2;
            lim_key2 = false;
            $(this).prev().animate({left:wid+"px"},function(){
                lim_key2 = true;
            });
        }
    });
    //----------------点击商品跳转到详情页
    $(".limit_buy .limit_content .limit_list").on("click","li",function(){
        // console.log($(this).attr("data-id"));
        var gid = $(this).attr("data-id")
        window.open("html/details.html?gid="+gid);
    });

    //限时抢购 切换
    $(".limit_buy .port_page").find("a").mouseenter(function () { 
        $(".limit_buy .port_page").find("a").removeClass("page_hover");
        $(this).addClass("page_hover");
        $(".limit_buy .limit_content").hide();
        $(".limit_buy .limit_content").eq($(this).index()).show();
    });
    $(".limit_buy .limit_list").on("mouseenter","li",function(){
        $(this).find(".limit_img").eq(0).css("opacity",0.8);
        $(this).find(".limit_name").eq(0).css("text-decoration","underline");
    });
    $(".limit_buy .limit_list").on("mouseleave","li",function(){
        $(this).find(".limit_img").eq(0).css("opacity",1);
        $(this).find(".limit_name").eq(0).css("text-decoration","none");
    });
    $(".limit_buy .limit_content").hover(function(){
        $(this).find(".prev").show();
        $(this).find(".next").show();
    },function(){
        $(this).find(".next").hide();
        $(this).find(".prev").hide();
    });

    //新品推荐 hover
    $(".new_rec .new_list").on("mouseenter","li",function(){
        $(this).addClass("list_hover");
    });
    $(".new_rec .new_list").on("mouseleave","li",function(){
        $(this).removeClass("list_hover");
    });
    //----------点击换新
    $(".new_rec .new_head").find(".change").click(function(){
        newNum++;
        if(newNum*5<=newAllNum){
            $.ajax({
                type:"GET",
                cache:false,
                url:"api/goodlist.php",
                data:{page:newNum,nums:5},
                success:function(data){
                    var res = JSON.parse(data);
                    // console.log(res);
                    newAllNum = res.total;
                    var list = res.datalist;
                    var html = list.map(function(item){
                        var imgstr = item.bigimg.split("-")[0];
                        //截取图片路径
                        imgstr = imgstr.slice(3);
                        return `<li data-id="${item.gid}">
                                    <div class="new_img"><img src="${imgstr}" alt="" /></div>
                                    <div class="good_name">
                                    <p class="good_title">${item.jianjie}</p>
                                    <p class="name">${item.goodname}</p>
                                    </div>
                                    <div class="good_price">
                                    ￥<span>${item.price}</span><del>￥${item.delprice}</del>
                                    </div>
                                </li>`;
                    }).join("");
                    $(".new_rec .new_content").find(".new_list").html(html);
                }
            });
        } else {
            alert("没有更多了");
        }
    });
    //----------------点击商品跳转到详情页
    $(".new_rec .new_content .new_list").on("click","li",function(){
        // console.log($(this).attr("data-id"));
        var gid = $(this).attr("data-id")
        window.open("html/details.html?gid="+gid);
    });

    //区块
    $(".block .cons").on("mouseenter","li",function(){
        $(this).addClass("list_hover");
        // console.log($(this));
    });
    $(".block .cons").on("mouseleave","li",function(){
        $(this).removeClass("list_hover");
    });
    $(".block .cons").on("mouseenter",".big_img",function(){
        $(this).css("opacity",0.8);
    });
    $(".block .cons").on("mouseleave",".big_img",function(){
        $(this).css("opacity",1);
    });
    // $(".Beauty .port_page").find("a").mouseenter(function(){
    //     $(".Beauty .port_page").find("a").removeClass("page_hover");
    //     $(this).addClass("page_hover");
    //     $(".Beauty .block_content").hide();
    //     $(".Beauty .block_content").eq($(this).index()).show();
    // });

    $(".block .port_page").on("mouseenter","a",function(){
        $(this).parent().find("a").removeClass("page_hover");
        $(this).addClass("page_hover");
        var par = $(this).parent().parent().parent();
        
        par.find(".block_content").hide();
        par.find(".block_content").eq($(this).index()).show();
        if($(this).index()>0 && $(this).data("key")){
            $(this).data("key",false);
            // console.log($(this).attr("data-id"));
            $.ajax({
                type:"GET",
                cache:false,
                url:"api/classgood.php",
                data:{clid:$(this).attr("data-id")},
                success:function(data){
                    var res = JSON.parse(data);
                    // console.log(res);
                    if(res.code == "0"){
                        var list = res.datalist;
                        par.find(".block_content").eq($(this).index()).html(addGood(list));
                    }
                }.bind($(this))
            });
        }
    });
    $(".block .cons").on("click","li",function(){
        // console.log($(this).attr("data-id"));
        var gid = $(this).attr("data-id");
        if(gid){
            window.open("html/details.html?gid="+gid);
        } else {
            window.open("html/details.html?gid="+71);
        }
        
    });

    //头部固定搜索栏显示
    var key1 = false;
    var arr = [];
    var ad = document.getElementsByClassName("ad")[0].offsetTop;
    //各个区块的offsetTop
    arr[0] = document.getElementsByClassName("limit_buy")[0].offsetTop-72;
    arr[1] = document.getElementsByClassName("new_rec")[0].offsetTop-72;
    arr[2] = document.getElementsByClassName("activity")[0].offsetTop-72;
    arr[3] = document.getElementsByClassName("Beauty")[0].offsetTop-72;
    arr[4] = document.getElementsByClassName("food")[0].offsetTop-72;
    arr[5] = document.getElementsByClassName("daily")[0].offsetTop-72;
    arr[6] = document.getElementsByClassName("clothing")[0].offsetTop-72;
    arr[7] = document.getElementsByClassName("art")[0].offsetTop-72;
    arr[8] = document.getElementsByClassName("digital")[0].offsetTop-72;
    //滚动切换侧边栏样式
    $(document).scroll(function(){
        var t = document.documentElement.scrollTop;
        if(t>100){
            $("#sidebar .side_bottom").find(".toTop").eq(0).css("opacity",1);
        } else {
            $("#sidebar .side_bottom").find(".toTop").eq(0).css("opacity",0.6);
        }
        if(t>ad){
            // console.log("ad:"+ad);
            // key1 = false;
            $(".rolling .search_top").eq(0).slideDown();
            // $(".rolling .search_top").eq(0).animate({height:52+"px"},function(){
                // key1 = true;
                // $(".rolling .search_top").eq(0).stop();
            // });
            // $(".rolling .search_top").eq(0).css("height",52+"px");
        } else {
            // key1 = true;
            // console.log("t:"+t);
            // $(".rolling .search_top").eq(0).animate({height:0+"px"});
            // $(".rolling .search_top").eq(0).css({
            //     "height":0
            // });
            $(".rolling .search_top").eq(0).slideUp();
            
        }
        if(t>arr[0]-20){
            $(".left_top").eq(0).show();
            
        } else {
            $(".left_top").eq(0).hide();
        }
        
        //
        if(t>=arr[0] && t< arr[1]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .lim").eq(0).find("a").addClass("left_active");
        }
        if(t>=arr[1] && t< arr[2]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .new").eq(0).find("a").addClass("left_active");
        }
        if(t>=arr[2] && t< arr[3]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .act").eq(0).find("a").addClass("left_active");
        }
        if(t>=arr[3] && t< arr[4]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .Bea").eq(0).find("a").addClass("left_active");
        }
        if(t>=arr[4] && t< arr[5]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .foo").eq(0).find("a").addClass("left_active");
        }
        if(t>=arr[5] && t< arr[6]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .dai").eq(0).find("a").addClass("left_active");
        }
        if(t>=arr[6] && t< arr[7]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .clo").eq(0).find("a").addClass("left_active");
        }
        if(t>=arr[7] && t< arr[8]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .ar").eq(0).find("a").addClass("left_active");
        }
        if(t>=arr[8]){
            $(".left_top").eq(0).find("li").removeClass("left_hover");
            $(".left_top").eq(0).find("a").removeClass("left_active");
            $(".left_top .dig").eq(0).find("a").addClass("left_active");
        }
    });

    //左边侧边栏hover
    $(".rolling .left_top").eq(0).find("li").hover(function(){
        if($(this).find("a").eq(0).hasClass("left_active")){

        } else {
            $(this).addClass("left_hover");
        }
        
    },function(){
        $(this).removeClass("left_hover");
    });
    $(".rolling .left_top").eq(0).find("li").click(function(){
        $("html,body").animate({
            scrollTop: arr[$(this).index()]+"px"
        }, "linear");
    });
});