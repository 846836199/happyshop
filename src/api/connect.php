<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "happyshop";

    //连接数据库
    $conn = new mysqli($servername,$username,$password,$dbname);

    //测试
    if($conn -> connect_error){
        die("连接失败".$conn -> connect_error);
    }

    //设置字符编码
    $conn -> set_charset("utf8");
    // echo "连接成功";
?>