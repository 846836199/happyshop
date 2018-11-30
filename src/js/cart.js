$(function () {
    var uid = Cookie.get("uid");
    $(".buy_btn a").css("background","#ccc");

//渲染区--------------------------------》
    $.ajax({
        type:"GET",
        cache:false,
        url:"../api/cart.php",
        data:{"uid":uid},
        success:function(data){
            var res = JSON.parse(data);
            // console.log(res);
            if(res.code == "0"){
                var list = res.datalist;
                // console.log(list);
                //获取全部店铺
                var storeArr = list.map(function(item){
                    return item.sname;
                });
                //店铺去重
                $.unique(storeArr);
                var listhtml = "";
                storeArr.forEach(function(item){
                    var cartMes = "";
                    var zispan = ""; 
                    if(item == "快乐购官方"){
                        zispan = "<span>自营</span>";
                    }
                    cartMes = `<dl class="list_part">
                                <dt class="clearfix list_title">
                                    <div class="tit_l fl">
                                        <input type="checkbox" class="sCheck">${zispan}${item}
                                    </div>
                                    <div class="tit_r fr">
                                        <span>在线支付满129.00包邮</span>
                                    </div>
                                </dt>`;
                    for(var i=0;i<list.length;i++){
                        if(list[i].sname == item){
                            var imgstr = list[i].smallimg.split("-")[0];
                            var price = (list[i].price*1).toFixed(2);
                            cartMes += `<dd class="list_con clearfix" data-id="${list[i].cid}">
                                            <div class="good_check fl">
                                                <input type="checkbox">
                                            </div>
                                            <div class="good_img">
                                                <img src="${imgstr}" alt="">
                                            </div>
                                            <div class="good_name"><a href="javascript:;">${list[i].goodname}</a></div>
                                            <div class="good_price">￥<span>${price}</span></div>
                                            <div class="good_num" data-id="${list[i].kucun}">
                                                <input type="button" class="sub" value="-">
                                                <input type="text" class="put" value="${list[i].nums}" data-num="${list[i].nums}">
                                                <input type="button" class="add" value="+">
                                            </div>
                                            <div class="good_total">￥<span>${(list[i].price*list[i].nums).toFixed(2)}</span></div>
                                            <div class="remove">
                                                <input type="button" class="del" value="删除">
                                            </div>
                                        </dd>`
                        }
                    }
                    cartMes += "</dl>";
                    listhtml += cartMes;
                });
                $(".cart_list").html(listhtml);
            } else {
                // console.log(1);
                updatacart();
            }
        }
    });
    function updatacart(){
        $(".list_head").hide();
        $(".cartlist").hide();
        $(".account").hide();
        $(".notip").show();
    }
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
        if(total==0){
            $(".buy_btn a").css("background","#ccc");
        } else {
            // C41F3A
            $(".buy_btn a").css("background","#C41F3A");
        }
    }
    //小计
    function xiaoji(obj){
        var price = obj.parent().parent().find(".good_price span").html()*1;
        var num = obj.parent().find(".put").val()*1;
        var total = (price*num).toFixed(2);
        obj.parent().parent().find(".good_total span").html(total);
        // console.log(price);
    }
    //数量加减
    $(".cart_list").on("click",".sub",function(){
        var tclid = $(this).parent().parent().attr("data-id");
        // console.log(tclid);
        $.ajax({
            type:"GET",
            url:"../api/addSub.php",
            cache:false,
            data:{cid:tclid,type:"sub"},
            success:function(data){
                var res = JSON.parse(data);
                // console.log(res);
                if(res.code == "0"){
                    $(this).parent().find(".put").val(res.nums);
                    $(this).parent().find(".put").attr("data-num",res.nums);
                    xiaoji($(this));
                    updateTotal();
                }
            }.bind($(this))
        });
    });

    $(".cart_list").on("click",".add",function(){
        var tclid = $(this).parent().parent().attr("data-id");
        // console.log(tclid);
        $.ajax({
            type:"GET",
            url:"../api/addSub.php",
            cache:false,
            data:{cid:tclid,type:"add"},
            success:function(data){
                var res = JSON.parse(data);
                // console.log(res);
                if(res.code == "0"){
                    $(this).parent().find(".put").val(res.nums);
                    $(this).parent().find(".put").attr("data-num",res.nums);
                    xiaoji($(this));
                    updateTotal();
                }
            }.bind($(this))
        });
    });
    
    $(".cart_list").on("change",".put",function(){
        var tclid = $(this).parent().parent().attr("data-id");
        // console.log(tclid);
        var thisval = $(this).val()*1;
        var thisnum = $(this).attr("data-num");
        if(!isNaN(thisval)){
            $.ajax({
                type:"GET",
                url:"../api/addSub.php",
                cache:false,
                data:{cid:tclid,type:thisval},
                success:function(data){
                    var res = JSON.parse(data);
                    // console.log(res);
                    if(res.code == "0"){
                        $(this).val(res.nums);
                        $(this).attr("data-num",res.nums);
                        xiaoji($(this));
                        updateTotal();
                    }
                }.bind($(this))
            });
        } else {
            alert("只能输入数字");
            $(this).val(thisnum);
        }
    });

    //删除
    $(".cart_list").on("click",".del",function(){
        var thiscid = $(this).parent().parent().attr("data-id");
        console.log(thiscid);
        var index = $(this).parent().parent().index();
        // console.log($(this).parent().parent().parent().children().eq(index).attr("data-id"));
        var tip = confirm("您确定要移除这个商品吗？");
        if(tip){
            $.ajax({
                type:"GET",
                url:"../api/newDel.php",
                data:{cid:thiscid},
                success:function(data){
                    var res = JSON.parse(data);
                    if(res.code == "0"){
                        var par = $(this).parent().parent().parent();
                        par.children().eq(index).remove();
                        if(par.children().size() == 1) {
                            par.remove();
                        }
                    }
                    if($(".cart_list").children().length == 0){
                        // console.log($("cart_list").children().length);
                        updatacart();
                    }
                }.bind($(this))
            });
        }
    });
});