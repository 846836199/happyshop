<?php
    include "connect.php";

    //获取数据
    $gid = isset($_GET["gid"]) ? $_GET["gid"] : "";
    $uid = isset($_GET["uid"]) ? $_GET["uid"] : "";
    $nums = isset($_GET["nums"]) ? $_GET["nums"] : ""
    ;
    if($gid && $uid && $nums){
        //sql语句
        //判断该商品是否在购物车内
        $sql = "SELECT * from cartlist where uid = $uid and gid = $gid";
        $res = $conn -> query($sql);
        // var_dump($res);
        if($res -> num_rows <= 0){
            //获取店铺id
            $sql2 = "select * from goodlist where gid = $gid";
            $res2 = $conn -> query($sql2);
            $sid = $res2 -> fetch_all(MYSQLI_ASSOC)[0]["sid"];
            // var_dump($sid);
            //信息插入userlist表
            $sql2 = "INSERT INTO cartlist (uid,gid,sid,nums) VALUES ($uid,$gid,$sid,$nums)";
            // //执行sql语句 获取结果集
            $res1 = $conn -> query($sql2);
            // var_dump($res1);
            if($res1){
                $goodlist = array(
                    "code" => 0,
                    "gid" => $gid,
                    "uid" => $uid,
                    "sid" => $sid,
                    "nums" => $nums,
                    "message" => "加入成功"
                    );
            }
            else{
            $goodlist = array(
                "code" => 2,
                "message" => "加入失败"
                ); 
            }
        }
        else {
            $goodlist = array(
                "code" => 1,
                "message" => "该商品已在购物车内"
                );
        }
    }
    else{
        $goodlist = array(
            "code" => 3,
            "message" => "参数不能为空"
            );
    }
    
    //返回数据
    echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);     
?>