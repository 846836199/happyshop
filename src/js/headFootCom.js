$(function(){
    //检测是否登录
    var uid = Cookie.get("uid");
    //已经登录
    if(uid){
        //隐藏登录注册相关信息
        $("#header .loginStatus").find(".login").eq(0).hide();
        $("#header .loginStatus").find(".reg").eq(0).hide();
        $("#header .loginStatus").find(".reg_tip").eq(0).hide();
        $("#header .loginStatus").find("span").eq(0).html("欢迎您，"+uid);
        //显示用户界面
        $("#header .loginStatus").find(".reg").eq(0).show();
    }


    //点击隐藏注册福利提示
    $("#header .loginStatus .reg_tip").find("i").eq(0).click(function(){
        $(this).parent().hide();
    });

    //下载快乐购App二维码显示
    $("#header .downApp").hover(function(){
        $(this).find("div").eq(0).show();
    },function(){
        $(this).find("div").eq(0).hide();
    });

    //客服中心菜单显示
    $("#header .service").hover(function(){
        $(this).addClass("ser_active");
        $(this).find(".ser_content").eq(0).show();
    },function(){
        $(this).removeClass("ser_active");
        $(this).find(".ser_content").eq(0).hide();
    });

    //搜索框监听内容更改显示搜索提示
    $("#header .search").bind('input propertychange',function () {
        // console.log($(this));
        var val = $.trim($(this).find(".sea_input").eq(0).val());
        //搜索内容为空时隐藏
        if(val){
            $(this).find(".search_list").eq(0).show();
        } else {
            $(this).find(".search_list").eq(0).hide();
        }
    });
    $("#header .search").find(".sea_input").eq(0).blur(function(){
        $("#header .search").find(".search_list").eq(0).hide(1000);
    });
    $("#header .search_list").find("li").hover(function(){
        $(this).addClass("sea_hover");
    },function(){
        $(this).removeClass("sea_hover");
    });

    //头部购物车显示
    $("#header .head_cart").eq(0).hover(function(){
        $(this).addClass("head_cart_hover");
        $(this).find(".cart_list").eq(0).show();
    },function(){
        $(this).removeClass("head_cart_hover");
        $(this).find(".cart_list").eq(0).hide();
    });

    //分类导航
    $("#nav .classfiy").find("li").hover(function(){
        $(this).addClass("li_hover");
    },function(){
        $(this).removeClass("li_hover");
    });

    $("#nav .classfiy").find("a").hover(function(){
        $(this).addClass("item_hover");
    },function(){
        $(this).removeClass("item_hover");
    });

    //侧边栏
});