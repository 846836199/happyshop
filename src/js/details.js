$(function(){

    //各个区块的offsetTop
    var runArr = [];
    runArr[0] = $(".parameter").eq(0).offset().top-80;
    runArr[1] = $(".detail").eq(0).offset().top-80;
    runArr[2] = $(".distribution").eq(0).offset().top-80;
    runArr[3] = $(".evaluation").eq(0).offset().top-80;
    var showoffset = $(".details").eq(0).offset();
    var sTop = showoffset.top;
    //商品图片切换
    //一个图片的宽度
    var imgW = $(".img_box .img_list").find("img").eq(0).width()+9;
    //框的宽度
    var img_listW = imgW*$(".img_box .img_list").find("img").size();
    $(".img_box .img_list").eq(0).css("width",img_listW+"px");
    // console.log($(".img_box .img_list").eq(0).width());
    var lW = img_listW-$(".img_box").eq(0).width();
    var moveKey1 = true;
    var moveKey2 = true;
    var imgNum = 0;
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
    var imgArr = ["../img/big1.jpg","../img/big2.jpg","../img/big3.jpg","../img/big1.jpg","../img/big2.jpg","../img/big3.jpg","../img/big1.jpg","../img/big2.jpg","../img/big3.jpg","../img/big1.jpg","../img/big2.jpg","../img/big3.jpg"];
    $(".img_change .img_list").find("img").mouseenter(function () { 
        $(".img_change .img_list").find("img").removeClass("img_active");
        $(this).addClass("img_active");
        $(".good_big").find("img").eq(0).prop("src", imgArr[$(this).index()]);
        $(".glass").find("img").eq(0).prop("src", imgArr[$(this).index()]);
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
    $(".mask").mousemove(function(e) {
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
    })
    
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
    $(".good_mess .check").find("li").click(function(){
        $(this).siblings().removeClass("good_active");
        $(this).addClass("good_active");
    });

    //购物车飞入
    //定点
    var addO = $(".good_mess .btn").find(".addCart").eq(0).offset();
    $(".good_mess .btn").find(".addPoint").eq(0).css({
        left: addO.left+60,
        top: addO.top-10
    });
    // $(".good_mess .btn").find(".addPoint").eq(0).fadeIn(1000);
    var faKey = true;
    $(".good_mess .btn").find(".addCart").eq(0).click(function(e){
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
            });
        }
    });
});