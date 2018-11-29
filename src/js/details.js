$(function(){
    var uid2 = Cookie.get("uid");
    function getHref(key) {
        var thisherf = decodeURIComponent(location.search.slice(1));
        var arr = thisherf.split("&");
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split("=");
            if (key == arr2[0]) {
                return arr2[1];
            }
        }
    }
    var thisgid = getHref("gid");
    var imgsmallArr = [];
    var imgbigArr = [];

    //飞入购物车开关
    var faKey = true;
    
    //商品图片切换
    //一个图片的宽度
    var imgW = 0;
    //框的宽度
    var img_listW = 0;
    
    // console.log($(".img_box .img_list").eq(0).width());
    var lW = 0;
    var moveKey1 = true;
    var moveKey2 = true;
    var imgNum = 0;
//渲染区------------------------------------------》
    //全部渲染
    $.ajax({
        type:"GET",
        cache:false,
        url:"../api/detail.php",
        data:{gid:thisgid},
        success:function(data){
            var res = JSON.parse(data);
            console.log(res);
            var list = res.datalist;
            $(".head_link .topname").html(list.goodname);
            imgbigArr = list.bigimg.split("-");
            
            imgsmallArr =list.smallimg.split("-");;
            // console.log(imgbigArr,imgsmallArr);
            var html = imgsmallArr.map(function(item){
                return `<img src="${item}">`;
            }).join("");
            $(".img_change .img_list").html(html);
            $(".img_change .img_list").find("img").eq(0).addClass("img_active");

            //图片和框
            //切换栏宽度
            imgW = $(".img_box .img_list").find("img").eq(0).width()+9;
            img_listW = imgW*$(".img_box .img_list").find("img").size();
            $(".img_box .img_list").eq(0).css("width",img_listW+"px");
            lW = img_listW-$(".img_box").eq(0).width();
            //大图和放大镜渲染
            var html2 = $(".good_l .good_big").html()+`<img src="${imgbigArr[0]}">`;
            $(".good_l .good_big").html(html2)
            $(".good_l .glass").html(`<img src="${imgbigArr[0]}">`);

            //商品详情渲染
            $(".good_mess .good_name").html(list.goodname);
            $(".good_mess .introduction").html(list.jianjie);
            $(".good_mess .good_price").html(`<span class="title">快乐价</span>
                                                ￥<span class="price">${list.price}</span>
                                                <del>￥${list.delprice}</del>`);
            if(list.yunfei <= 0){
                $(".freight .fre_con").html("包邮");
            } else {
                $(".freight .fre_con").html(list.yunfei);
            }
            var html3 = list.color.split("-").map(function(item){
            return `<li>${item}<i></i></li>`;
            }).join("");
            $(".color .check").html(html3); 
            $(".color .check").find("li").eq(0).addClass("good_active"); 
            var html4 = list.size.split("-").map(function(item){
                return `<li>${item}<i></i></li>`;
                }).join("");
            $(".size .check").html(html4); 
            $(".size .check").find("li").eq(0).addClass("good_active");
            $(".num").attr("data-id",list.kucun);
            $(".welfare").find("span").html(list.price/100);

            //商品id
            $(".btn .addCart").attr("data-id",list.gid);
        }
    });
    
//功能区------------------------------------------》    
    //各个区块的offsetTop
    var runArr = [];
    runArr[0] = $(".parameter").eq(0).offset().top-80;
    runArr[1] = $(".detail").eq(0).offset().top-80;
    runArr[2] = $(".distribution").eq(0).offset().top-80;
    runArr[3] = $(".evaluation").eq(0).offset().top-80;
    var showoffset = $(".details").eq(0).offset();
    var sTop = showoffset.top;
    //商品图片切换

    $(".img_change").find(".prev").eq(0).click(function(){
        if(img_listW>$(".img_box").eq(0).width()){
            var le = $(".img_box .img_list").eq(0).css("left");
            le = le.slice(0,-2);
            if(le<0 && moveKey1){
                moveKey1 = false;
                imgNum--;
                console.log(imgNum);
                var le = imgW*imgNum;
                $(".img_box .img_list").eq(0).animate({left:-le+"px"},function(){
                    moveKey1 = true;
                });
            }
        }
    });
    $(".img_change").find(".next").eq(0).click(function(){
        if(img_listW>$(".img_box").eq(0).width()){
            var le = $(".img_box .img_list").eq(0).css("left");
            le = le.slice(0,-2);
            if(le>-lW && moveKey2){
                moveKey2 = false;
                imgNum++;
                console.log(imgNum);
                var le = imgW*imgNum;
                $(".img_box .img_list").eq(0).animate({left:-le+"px"},function(){
                    moveKey2 = true;
                });
            }
        }
    });
    //移入切换图片
    $(".img_change .img_list").on("mouseenter","img",function(){
        $(".img_change .img_list").find("img").removeClass("img_active");
        $(this).addClass("img_active");
        $(".good_big").find("img").eq(0).prop("src", imgbigArr[$(this).index()]);
        $(".glass").find("img").eq(0).prop("src", imgbigArr[$(this).index()]);
    });

    //放大镜
    $(".good_big").eq(0).mouseover(function() {
        $(".good_big .area").eq(0).show();
        $(".glass").eq(0).show();
    })
    $(".good_big").eq(0).mouseout(function() {
        $(".good_big .area").eq(0).hide();
        $(".glass").eq(0).hide();
    })
    $(".good_l .good_big").on("mousemove",".mask",function(e){
        var l = e.pageX - $(".good_big").offset().left - ($(".area").width() / 2);
        var t = e.pageY - $(".good_big").offset().top - ($(".area").height() /2);
        if (l < 0) {
            l = 0;
        }
        if (l > $(this).width() - $(".area").width()) {
            l = $(this).width() - $(".area").width();
        }
        if (t < 0) {
            t = 0
        }
        if (t > $(this).height() - $(".area").height()) {
            t = $(this).height() - $(".area").height();
        }
    
        $(".area").css({
            "left": l,
            "top": t
        })
        var pX = l / ($(".mask").width() - $(".area").width());
        var pY = t / ($(".mask").height() - $(".area").height());
        $(".glass img").css({
            "left": -pX * ($(".glass img").width() - $(".glass").width()),
            "top": -pY * ($(".glass img").height() - $(".glass").height())
        })
    });
   
    //点击滚动
    $(document).on("scroll",function(){
        var h = $(document).scrollTop();
        if(h>sTop){
            $(".run_top").eq(0).slideDown();
        } else {
            $(".run_top").eq(0).slideUp();
        }
        if(h>runArr[0] && h<runArr[1]){
            $(".details .details_btn").find("a").removeClass("btn_active");
            $(".details .details_btn").find("a").eq(0).addClass("btn_active");
            $(".run_top ul").find("a").removeClass("run_active");
            $(".run_top ul").find("a").eq(0).addClass("run_active"); 
        }
        if(h>runArr[1] && h<runArr[2]){
            $(".details .details_btn").find("a").removeClass("btn_active");
            $(".details .details_btn").find("a").eq(1).addClass("btn_active");
            $(".run_top ul").find("a").removeClass("run_active");
            $(".run_top ul").find("a").eq(1).addClass("run_active"); 
        }
        if(h>runArr[2] && h<runArr[3]){
            $(".details .details_btn").find("a").removeClass("btn_active");
            $(".details .details_btn").find("a").eq(2).addClass("btn_active");
            $(".run_top ul").find("a").removeClass("run_active");
            $(".run_top ul").find("a").eq(2).addClass("run_active"); 
        }
        if(h>runArr[3]){
            $(".details .details_btn").find("a").removeClass("btn_active");
            $(".details .details_btn").find("a").eq(3).addClass("btn_active");
            $(".run_top ul").find("a").removeClass("run_active");
            $(".run_top ul").find("a").eq(3).addClass("run_active"); 
        }
    });
    
    //按钮点击滚动
    $(".details .details_btn").find("a").click(function(){
        $("html,body").animate({
            scrollTop: runArr[$(this).index()]+5
        },"slow");
    });
    //顶部按钮
    $(".run_top ul").find("li").click(function(){
        $("html,body").animate({
            scrollTop: runArr[$(this).index()]+5
        },"slow");
        // console.log($(this).index());
    });

    //商品参数选择
    $(".good_mess .check").on("click","li",function(){
        $(this).siblings().removeClass("good_active");
        $(this).addClass("good_active");
    });

    //数量加减
    $(".num .sub").click(function(){
        var counts = $(".num .input_con").eq(0).val()*1;
        if(counts>1){
            --counts;
            $(".num .input_con").eq(0).val(counts);
        }
    });
    $(".num .add").click(function(){
        var kucun = $(".num").eq(0).attr("data-id")*1;
        var counts = $(".num .input_con").eq(0).val()*1;
        if(counts<kucun){
            ++counts;
            $(".num .input_con").eq(0).val(counts);
        }
    });
    $(".num .input_con").blur(function(){
        var kucun = $(".num").eq(0).attr("data-id")*1;
        var counts = $(this).val()*1;
        if(counts>kucun){
            $(this).val(kucun);
        }
        if(counts<1){
            $(this).val(1);
        }
    });
    //购物车飞入 加入购物车
    //定点
    var addO = $(".good_mess .btn").find(".addCart").eq(0).offset();
    $(".good_mess .btn").find(".addPoint").eq(0).css({
        left: addO.left+60,
        top: addO.top-10
    });

    $(".good_mess .btn").find(".addCart").eq(0).click(function(e){
        var thisnums = $(".num .input_con").val();
        var thisgid = $(this).attr("data-id");
        if(uid2){
            $.ajax({
                type:"GET",
                cache:false,
                url:"../api/insertGood.php",
                data:{gid:thisgid,uid:uid2,nums:thisnums},
                success:function(data){
                    var res = JSON.parse(data);
                    // console.log(res);
                    if(res.code == "0"){
                        if(faKey){
                            faKey = false;
                            var o = $(".side_cart").eq(0).offset();
                            $(this).next().animate({
                                left:o.left,
                                top:o.top,
                                opacity:1
                            },1000,function(){
                                $(".good_mess .btn").find(".addPoint").eq(0).css({
                                    left: addO.left+60,
                                    top: addO.top-10,
                                    opacity:0
                                });
                                faKey = true;
                                var cartNum =  $(".sidebar .side_cart").find("span").html()*1+thisnums*1;
                                // console.log();
                                $(".sidebar .side_cart").find("span").html(cartNum);
                            });
                        }
                    } else {
                        alert(res.message);
                    }
                }.bind($(this))
            });
        } 
    });
});