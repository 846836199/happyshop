<?php
    include "connect.php";

    //获取数据
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";

    if($username && $password){
        //sql语句 插入user表
        $sql = "INSERT INTO user (username,password) VALUES ('$username','$password')";

        //执行sql语句 获取结果集
        $res = $conn -> query($sql);
        if($res){
            $list = array(
                "code" => 0,
                "message" => "注册成功"
            );
        }
        else {
            $list = array(
                "code" => 1,
                "message" => "注册失败"
            );
        }
    }
    else {
        $list = array(
                "code" => 2,
                "message" => "用户名或密码不能为空"
        );
    }

    //返回数据
    echo json_encode($list,JSON_UNESCAPED_UNICODE);

    //关闭连接
    $conn -> close();
?>