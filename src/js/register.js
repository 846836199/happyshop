$(function(){
    var phonestr = ""; //手机输入的内容

    //开关
    var phoneKey = false;
    var passKey = false;
    var repassKey = false;
    var codeKey = false;
    //输入框获取焦点时显示提示信息
    $("#register .input").find("input").focus(function(){
        //获取焦点时去除红框
        $(this).removeClass("focus");
        $(this).nextAll("p").css("visibility","visible");
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
    $("#register .phoneNum").find("input").blur(function(){
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
    $("#register .pwd").find("input").blur(function(){
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
    $("#register .pwdAgain").find("input").blur(function(){
        var val = $.trim($("#register .pwd").find("input").val());
        if(val && passKey){
            
            var re2 = formReg.passSure();
        } else {
            $("#register .pwd").find("input").addClass("focus");
            $("#register .pwd").find("input").nextAll("p").css("visibility","visible");
            $("#register .pwd").find("input").nextAll("p").html("<i></i>请先输入密码且格式正确");
        }
    });
});