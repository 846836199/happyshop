$(function () {
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
    var thisclid = getHref("clid");
    var thisname = getHref("name");
    $(".head_link").find("a").eq(2).html(thisname);
    var pages = 0; //总页数
    var num = 1; //当前页
    var type = "price"; //按什么排序
    var order = "desc"; //升降序
    //渲染区----------------------------》
    if (thisclid == 0) {
        $.ajax({
            type: "GET",
            cache: false,
            url: "../api/goodlist.php",
            data: {
                "page": 1,
                "nums": 40,
                "type": "gid",
                "order": "asc"
            },
            success: function (data) {
                var res = JSON.parse(data);
                render(res);
                pages = Math.ceil(res.total / 40);
                var html1 = "";
                if (pages > 1) {
                    for (var i = 1; i <= pages; i++) {
                        html1 += `<a href="javascript:;">${i}</a>`;
                    }
                    if (pages > 3) {
                        html1 += `<span>...</span>`;
                    }
                } else {
                    html1 = `<a href="javascript:;">1</a>`;
                }
                update();
                $(".page_btn .pages").html(html1);
                $(".page_btn .pages").find("a").eq(0).addClass("a_active");
                $(".sort_r .total").find("span").html(res.total);
                $(".sort_r .page").find(".topPages").html(pages);
            }
        });
    } else {
        $.ajax({
            type: "GET",
            cache: false,
            url: "../api/classgood.php",
            data: {
                "page": 1,
                "nums": 40,
                "type": "gid",
                "order": "asc",
                "clid": thisclid
            },
            success: function (data) {
                var res = JSON.parse(data);
                render(res);
                var pages = Math.ceil(res.total / 40);
                var html1 = "";
                if (pages > 1) {
                    
                    if (pages > 3) {
                        for (var i = 1; i <= 3; i++) {
                            html1 += `<a href="javascript:;">${i}</a>`;
                        }
                        html1 += `<span>...</span>`;
                    } else {
                        for (var i = 1; i <= pages; i++) {
                            html1 += `<a href="javascript:;">${i}</a>`;
                        }
                    }
                } else {
                    html1 = `<a href="javascript:;">1</a>`;
                    $(".prev").css("display", "none");
                    $(".next").css("display", "none");
                }
                update();
                $(".page_btn .pages").html(html1);
                $(".page_btn .pages").find("a").eq(0).addClass("a_active");
                $(".sort_r .total").find("span").html(res.total);
                $(".sort_r .page").find(".topPages").html(pages);
            }
        });
    }

    function render(data) {
        if (data.code == "0") {
            var list = data.datalist;
            // console.log(list);
            var html = list.map(function (item) {
                var imgstr = item.bigimg.split("-")[0];
                //截取图片路径
                return `<li data-id="${item.gid}">
                            <div class="good_img">
                                <img src="${imgstr}" alt="">
                            </div>
                            <div class="good_mess">
            <p class="good_price">￥${item.price}<del>￥${item.delprice}</del></p>
                                <p class="good_name">${item.goodname}</p>
                            </div>
                        </li>`;
            }).join("");
            $(".list_content .list").html(html);
        }
    }

    //功能区----------------------------------------》
    function update(){
        if(num<=1){
            $(".prev").css("color","#CCCCCC");
        } else {
            $(".prev").css("color","#A2193F");
        }
        if(num>=pages){
            $(".next").css("color","#CCCCCC");
        } else {
            $(".next").css("color","#A2193F");
        }
        $(".page_btn .pages").find("a").removeClass("a_active");
        $(".page_btn .pages").find("a").eq(num-1).addClass("a_active");
        $(".sort_r .page").find(".num").html(num);
        // console.log(num);
    }
    //默认排序为默认
    //设置开关
    $(".sort_l dd").data("key", false);
    //默认的开关开启
    //默认排序
    $(".sort_l .default").click(function () {
        if ($(this).data("key")) {
            $.ajax({
                type: "GET",
                cache: false,
                url: "../api/goodlist.php",
                data: {
                    "page": 1,
                    "nums": 40,
                    "type": "gid",
                    "order": "asc"
                },
                success: function (data) {
                    $(this).addClass("default_active");
                    $(this).data("key", false);
                    $(this).siblings().removeClass("sort_activeUp");
                    $(this).siblings().removeClass("sort_activeDown");
                    var res = JSON.parse(data);
                    render(res);
                    num = 1;
                    update();
                    $(".page_btn .pages").find("a").removeClass("a_active");
                    $(".page_btn .pages").find("a").eq(0).addClass("a_active");
                }.bind($(this))
            });
        }
    });
    //价格销量排序
    $(".sort_l .sort_btn").click(function () {

        if ($(this).hasClass("sales")) {
            type = "xiaoliang";
        } else {
            type = "price";
        }
        if ($(this).data("key")) {
            order = "asc";
        } else {
            order = "desc";
        }
        $.ajax({
            type: "GET",
            cache: false,
            url: "../api/goodlist.php",
            data: {
                "page": 1,
                "nums": 40,
                "type": type,
                "order": order
            },
            success: function (data) {
                console.log($(this).data("key"));
                $(".sort_l .default").data("key",true);
                $(this).data("key", !$(this).data("key"));
                var res = JSON.parse(data);
                render(res);
                if (order == "desc") {
                    $(this).removeClass("sort_activeUp");
                    $(this).addClass("sort_activeDown");
                } else {
                    $(this).removeClass("sort_activeDown");
                    $(this).addClass("sort_activeUp");
                }
                num = 1;
                update();
                $(".page_btn .pages").find("a").removeClass("a_active");
                $(".page_btn .pages").find("a").eq(0).addClass("a_active");
                // console.log($(this).data("key"));
                $(this).siblings().removeClass("sort_activeUp");
                $(this).siblings().removeClass("sort_activeDown");
                $(this).siblings().removeClass("default_active");
            }.bind($(this))
        });
    });

    //上一页 下一页
        
    $(".prev").click(function(){
        if(num>1){
            $.ajax({
                type: "GET",
                cache: false,
                url: "../api/goodlist.php",
                data: {
                    "page": --num,
                    "nums": 40,
                    "type": type,
                    "order": order
                },
                success:function(data){
                    var res = JSON.parse(data);
                    render(res);
                    update();
                }
            });
        }
    });
    $(".next").click(function () {
        if(num<pages){
            $.ajax({
                type: "GET",
                cache: false,
                url: "../api/goodlist.php",
                data: {
                    "page": ++num,
                    "nums": 40,
                    "type": type,
                    "order": order
                },
                success:function(data){
                    var res = JSON.parse(data);
                    render(res);
                    update();
                }
            });
        }
    });
    
    //点击页码跳转页面
    $(".page_btn .pages").on("click","a",function(){
        if(!$(this).hasClass("a_active")){
            $.ajax({
                type: "GET",
                cache: false,
                url: "../api/goodlist.php",
                data: {
                    "page": $(this).index()*1+1,
                    "nums": 40,
                    "type": type,
                    "order": order
                },
                success:function(data){
                    var res = JSON.parse(data);
                    num = $(this).index()+1;
                    render(res);
                    update();
                    console.log(pages,num);
                }.bind($(this))
            });
        }
    });

    //点击商品跳转详情
    $(".list_content .list").on("click","li",function(){
        var gid = $(this).attr("data-id");
        window.open("../html/details.html?gid="+gid);
    });
});