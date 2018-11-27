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
    var imgArr = ["../img/big1.jpg","../img/big2.jpg","../img/big3.jpg","../img/big1.jpg","../img/big2.jpg","../img/big3.jpg"];
    $(".img_change .img_list").find("img").mouseenter(function () { 
        $(".img_change .img_list").find("img").removeClass("img_active");
        $(this).addClass("img_active");
        $(".good_big").find("img").eq(0).prop("src", imgArr[$(this).index()]);
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
});