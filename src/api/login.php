<?php
    include "connect.php";

    //获取数据
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";

    if($username && $password){
        //sql语句 验证用户名密码
        $sql = "SELECT * from user where username = '$username' and password = '$password'";

        //执行sql语句 获取结果集
        $res = $conn -> query($sql);
        // var_dump($res);
        if($res -> num_rows >0){
            $arr = $res -> fetch_all(MYSQLI_ASSOC)[0]; 
            $list = array(
                "code" => 0,
                "uid" => $arr["uid"],
                "username" => $username,
                "message" => "登录成功"
            );
            // $arr -> close();
        }
        else {
            $list = array(
                "code" => 1,
                "message" => "用户名或密码错误"
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