$(function () {
    //验证码初始化
    $("#login .checkCode").find(".code").eq(0).html(randomNL(4));

    var tipStr = {
        0: ["登录名可能是您的手机号、邮箱或用户名", "用户名不能为空"],
        1: ["您的密码可能为字母、数字或符号的组合", "密码不能为空"],
        2: ["请输入验证码", "验证码不能为空", "验证码错误"]
    }

    //切换界面
    $("#login .checkLogin").find(".radioBtn").eq(0).click(function () {
        $(this).nextAll("div").css("display", "none");
        $(this).nextAll("div").eq($(this).index()).css("display", "block");
        alert("快捷功能功能暂不支持");
    });
    $("#login .checkLogin").find(".radioBtn").eq(1).click(function () {
        $(this).nextAll("div").css("display", "none");
        $(this).nextAll("div").eq($(this).index()).css("display", "block");
    });

    //获取焦点
    // console.log($("#login .checkLogin").find(".input"));
    //输入框获取焦点时显示提示信息
    $("#login .divTwo .input").find("input").focus(function () {
        //获取焦点时去除红框
        $(this).removeClass("focus");
        $(this).nextAll("p").eq(0).css("visibility", "visible");
        $(this).nextAll("p").eq(0).html(tipStr[$(this).parent().index()][0]);
    });

    //失焦时隐藏提示信息
    $("#login .input").find("input").blur(function () {
        $(this).nextAll("p").css("visibility", "hidden");
    });

    //点击更换验证码
    $("#login .checkCode").find(".change").eq(0).click(function () {
        $(this).prev().html(randomNL(4));
    });

    //登录验证
    $("#login .divTwo").find(".btn").eq(0).click(function () {
        // console.log(1);
        //更换验证码
        var val1 = $.trim($("#login .divTwo").find("input").eq(0).val());
        //用户名为空
        if (val1) {
            //密码为空
            var val2 = $.trim($("#login .divTwo").find("input").eq(1).val());
            if (val2) {
                //验证码为空
                var val3 = $.trim($("#login .divTwo").find("input").eq(2).val());
                if (val3) {
                    //验证码错误
                    var val4 = $("#login .checkCode").find(".code").eq(0).html().toLowerCase();
                    if (val3 == val4) {
                        //账号密码验证
                        $.ajax({
                            type:"POST",
                            url:"../api/login.php",
                            data:{"username":val1,"password":val2},
                            success:function(data){
                                var res = JSON.parse(data);
                                alert(res.message);
                                if(res.code == "0"){
                                    location.href = "../index1.html";
                                    var day = new Date();
                                    day.setDate(day.getDate()+7);
                                    document.cookie = "uid="+res.uid+";expires="+day.toUTCString()+";path=/";

                                } else {
                                    $("#login .checkCode").find(".code").eq(0).html(randomNL(4));
                                }
                            }
                        });
                    } else {
                        $("#login .divTwo").find("input").eq(2).addClass("focus");
                        $("#login .divTwo").find("p").eq(2).css("visibility", "visible");
                        $("#login .divTwo").find("p").eq(2).html("<i></i>" + tipStr[2][2]);
                    }
                } else {
                    $("#login .divTwo").find("input").eq(2).addClass("focus");
                    $("#login .divTwo").find("p").eq(2).css("visibility", "visible");
                    $("#login .divTwo").find("p").eq(2).html("<i></i>" + tipStr[2][1]);
                }
            } else {
                $("#login .divTwo").find("input").eq(1).addClass("focus");
                $("#login .divTwo").find("p").eq(1).css("visibility", "visible");
                $("#login .divTwo").find("p").eq(1).html("<i></i>" + tipStr[1][1]);
            }
        } else {
            $("#login .divTwo").find("input").eq(0).addClass("focus");
            $("#login .divTwo").find("p").eq(0).css("visibility", "visible");
            $("#login .divTwo").find("p").eq(0).html("<i></i>" + tipStr[0][1]);
        }
    });
    $("#login .otherWay").find("a").click(function(){
        alert("暂不支持");
    });
});