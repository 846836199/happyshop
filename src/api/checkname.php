<?php
    include "connect.php";

    //获取数据
    $username = isset($_GET["username"]) ? $_GET["username"] : "admin";

    if($username){
        //sql语句 查询是否存在
        $sql = "SELECT * from user where username = '$username'";

        //执行sql语句 获取结果集
        $res = $conn -> query($sql);

        //
        if($res -> num_rows <= 0) {
            $list = array(
                "code" => 0,
                "message" => "该用户名可注册"
            );
        }
        else {
            $list = array(
                "code" => 1,
                "message" => "该用户名已存在"
            );
        }
    }
    else {
        $list = array(
                "code" => 2,
                "message" => "用户名不能为空"
        );
    }

    echo json_encode($list,JSON_UNESCAPED_UNICODE);

    //关闭连接
    $conn -> close();
?>