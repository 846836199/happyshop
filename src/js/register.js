$(function(){
    var phonestr = ""; //手机输入的内容

    //开关
    var openFunc = false;  //启动注册功能
    var phoneKey = false;   //手机号码
    var passKey = false;    //密码
    var repassKey = false;  //重复密码
    var codeKey = false;    //验证码
    var sureKey = true;     //同意协议
    var tipKey = false;
    //验证码渲染
    $("#register .checkCode").find(".code").eq(0).html(randomNL(4));
    //输入框获取焦点时显示提示信息
    $("#register .input").find("input").focus(function(){
        //获取焦点时去除红框
        $(this).removeClass("focus");
        $(this).nextAll("p").css("visibility","visible");
        openFunc = true; //开启注册
    });

    //限制手机号码输入位数 11位
    $("#register .phoneNum").bind('input propertychange',function () {
        var len = $(this).find("input").val().length;
        if(len==11){
            phonestr=$(this).find("input").val();
        }
        if(len>11){
            $(this).find("input").val(phonestr);
        }
    });

    //正则验证
    $("#register .phoneNum").find("input").eq(0).blur(function(){
        var val = $.trim($(this).val());
        if(val){
            //验证手机号码是否已经注册
            var res = formReg.tel(val);
            if(res){
                $.ajax({
                    type:"GET",
                    url: "../api/checkname.php",
                    data : {"username":val},
                    success:function(data){
                        var res = JSON.parse(data);
                        // console.log(res.code);
                        if(res.code == "0"){
                            $(this).nextAll("p").html(res.message);
                            $(this).nextAll("p").css("color","green");
                            phoneKey = true;
                        }
                    }.bind($(this))
                });
            } else {
                phoneKey = false;
                $(this).nextAll("p").html("<i></i>手机号码格式不正确");
                $(this).nextAll("p").css("color","#E24A4A");
            }
        } else {
            phoneKey = false;
            $(this).nextAll("p").html("<i></i>内容不能为空");
            $(this).nextAll("p").css("color","#E24A4A");
        }
    });

    //密码
    $("#register .pwd").find("input").eq(0).blur(function(){
        var val = $.trim($(this).val());
        if(val){
            var res = formReg.password(val);
            if(res){
                $(this).nextAll("p").html("密码格式正确");
                $(this).nextAll("p").css("color","green");
                passKey = true;
            }
            else {
                passKey = false;
                $(this).nextAll("p").html("<i></i>密码6-18位,首字母开头");
                $(this).nextAll("p").css("color","#E24A4A");
            }
        } else {
            passKey = false;
            $(this).nextAll("p").html("<i></i>内容不能为空");
            $(this).nextAll("p").css("color","#E24A4A");
        }
    });

    // 重复密码
    $("#register .pwdAgain").find("input").eq(0).blur(function(){
        var val = $.trim($("#register .pwd").find("input").val());
        if(val && passKey){
            var val2 = $.trim($(this).val());
            if(val2){
                var res2 = formReg.passSure(val,val2);
                if(res2){
                    $(this).nextAll("p").eq(0).html("密码正确");
                    $(this).nextAll("p").eq(0).css("color","green");
                    repassKey = true;
                } else {
                    repassKey = false;
                    $(this).nextAll("p").eq(0).html("<i></i>密码不一致");
                    $(this).nextAll("p").eq(0).css("color","#E24A4A");
                }
            } else {
                repassKey = false;
                $(this).nextAll("p").eq(0).html("<i></i>内容不能为空");
                $(this).nextAll("p").eq(0).css("color","#E24A4A");
            }
        } else {
            repassKey = false;
            $("#register .pwd").find("input").addClass("focus");
            $("#register .pwd").find("input").nextAll("p").css("visibility","visible");
            $("#register .pwd").find("input").nextAll("p").html("<i></i>请先输入密码且格式正确");
        }
    });

    //验证码
        //点击更新验证码
    $("#register .checkCode").find(".change").eq(0).click(function(){
        $(this).prev().html(randomNL(4));
    });

        //验证验证码是否正确
    $("#register .checkCode").find("input").eq(0).blur(function(){
        //获取验证码
        var str = $(this).next().html().toLowerCase();
        var val = $.trim($(this).val());
        if(val){
            if(val == str){
                $(this).nextAll(".checkCode_error").eq(0).html("验证码正确");
                $(this).nextAll(".checkCode_error").eq(0).css("color","green");
                codeKey = true;
            } else {
                $(this).nextAll(".checkCode_error").eq(0).html("验证码错误");
                $(this).nextAll(".checkCode_error").eq(0).css("color","#E24A4A");
                codeKey = false;
            }
        } else {
            $(this).nextAll(".checkCode_error").eq(0).html("<i></i>内容不能为空");
            $(this).nextAll(".checkCode_error").eq(0).css("color","#E24A4A");
            codeKey = false;
        }
    });

    //点击注册
        //是否已经同意协议
    $("#register .sendMess").find(".sure").eq(0).click(function(){
        sureKey = !sureKey;
        console.log(sureKey);
    });

        //判断各项是否正确
    $("#register .sendMess").find(".btn").eq(0).click(function(){
        if(openFunc){
            if(phoneKey){
                if(passKey){
                    if(repassKey){
                        if(codeKey){
                            if(sureKey){
                                var userName = $("#register .phoneNum").find("input").eq(0).val();
                                var passWord = $("#register .pwd").find("input").eq(0).val();
                                $.ajax({
                                    type: "POST",
                                    url:"../api/insertUser.php",
                                    data:{"username":userName,"password":passWord},
                                    success:function(data){
                                        var res = JSON.parse(data);
                                        if(res.code == "0"){
                                            alert("注册成功");
                                            location.href = "login.html";
                                        } else {
                                            alert("注册失败");
                                        }
                                    }
                                });
                            } else {
                                alert("同意协议后才能注册");
                            }
                        } else {
                            $("#register .checkCode").find("input").eq(0).addClass("focus");
                        }
                    } else {
                        $("#register .pwdAgain").find("input").eq(0).addClass("focus");
                        tipKey = true;
                    }
                } else {
                    $("#register .pwd").find("input").eq(0).addClass("focus");
                    tipKey = true;
                }
            } else {
                $("#register .phoneNum").find("input").eq(0).addClass("focus");
                tipKey = true;
            }
        }
        if(tipKey){
            alert("请完善红框内的信息");
            tipKey = false;
        }
    });
});