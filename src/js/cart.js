$(function () {
    var uid = Cookie.get("uid");


//渲染区--------------------------------》
    $.ajax({
        type:"GET",
        cache:false,
        url:"../api/cart.php",
        data:{"uid":uid},
        success:function(data){
            var res = JSON.parse(data);
            console.log(res);
            if(res.code == "0"){
                var list = res.datalist;
                //获取全部店铺
                var storeArr = list.map(function(item){
                    return item.sname;
                });
                //店铺去重
                $.unique(storeArr);

            }
        }
    });

//功能区--------------------------》    
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

    //全选
    $(".all_check").click(function(){
        //获取自己的checked属性
        var che = $(this).prop("checked");
        //赋予所有勾选框
        $(".all_check").prop("checked",che);
        $(".list_part .tit_l").find("input").prop("checked",che);
        $(".list_con .good_check").find("input").prop("checked",che);
        updateTotal();
    });
    //店铺全选
    $(".cart_list").on("click",".sCheck",function(){
        //获取自己的checked属性
        var che = $(this).prop("checked");
        //赋予店铺所有勾选框
        var index = $(this).parent().parent().parent().find(".good_check input").prop("checked",che);
        alltrue();
        updateTotal();
    });
    //单个取消勾选后取消店铺全选
    $(".cart_list").on("click",".good_check input",function(){
        var che = $(this).prop("checked");
        if(che == false){
            $(".all_check").prop("checked",false);
            $(this).parent().parent().parent().find(".tit_l input").prop("checked",false);
        }
        check($(this));
        alltrue();
    });
    //单选全选后 店铺全选自动勾上
    function check(obj){
        var num = 0;
        var par = obj.parent().parent().parent().find("dd .good_check input");
        // console.log(obj.parent().parent().parent().find("dd .good_check input"))
        par.each(function(){
            // console.log($(this).prop("checked"))
            if($(this).prop("checked")){
                ++num;
            }
        });
        if(num == par.size()){
            obj.parent().parent().prevAll("dt").find(".sCheck").prop("checked",true);
        }
        updateTotal();
    }
    //单选或者店铺全部后 全选自动勾上
    function alltrue(){
        var num = 0;
        var sChecks = $(".cart_list").find(".sCheck");
        sChecks.each(function(){
            if($(this).prop("checked")){
                ++num;
            }
        });
        if(num == sChecks.size()){
            //全选勾上
            $(".all_check").prop("checked",true);
        } else {
            $(".all_check").prop("checked",false);
        }
        
    }
    //更新总数
    function updateTotal(){
        var dd = $(".cart_list .good_check").find("input");
        var total = 0;
        var num = 0;
        dd.each(function(){
            $(this).parent().parent().removeClass("list_active");
            if($(this).prop("checked")){
                num++;
                var xiaoji = $(this).parent().nextAll(".good_total").text();
                xiaoji = xiaoji.slice(1);
                total += xiaoji*1;  
                $(this).parent().parent().addClass("list_active");
            }
        });
        $(".account .good_num").find("span").html(num);
        $(".account .good_sum").find("span").html("￥"+total.toFixed(2));
    }
});