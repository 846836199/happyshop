<?php
    include "connect.php";

    //获取数据
    $uid = isset($_GET['uid']) ? $_GET['uid'] : "2";

    //sql语句
    //获取用户购物车数据
    $sql = "SELECT * from cartlist where uid = $uid";

    //执行语句 获取结果集
    $res = $conn -> query($sql);
    //判断该用户购物车内是否有商品
    // var_dump($res);
    if($res){
        if($res-> num_rows > 0) {
        //获取结果内容
            $arr = $res -> fetch_all(MYSQLI_ASSOC);
            // var_dump($arr);
            // 获取结果集内的gid的商品信息
            $arr2 = array();
            for($i=0;$i<count($arr);$i++){
                $sql2 = "select * from goodlist where gid = ".$arr[$i]['gid'];
                $res2 = $conn -> query($sql2);
                $sql3 = "select * from storelist where sid = ".$arr[$i]['sid'];
                //接收商品信息
                $res3 = $conn -> query($sql3);
                // var_dump($res3);
                //插入店铺名
                $sname = $res3 -> fetch_all(MYSQLI_ASSOC);
                $all = $res2 -> fetch_all(MYSQLI_ASSOC)[0];
                //插入购物车列表id
                // $all["gid"] = $arr[$i]["gid"];
                $all["sname"] = $sname[0]["sname"];
                //插入数量
                $all["nums"] = $arr[$i]["nums"];
                // var_dump($all);
                //将所有商品信息插入arr2内
                $all["cid"] = $arr[$i]["cid"];
                $arr2[] = $all;
            }
            // var_dump($arr2);
            $goodlist = array(
                "code" => 0,
                "uid" => $uid,
                "datalist" => $arr2,
                "message" => "加载完成"
            );
            //关闭连接
            $res2 -> close();
            $res -> close();
        }
        else {
            $goodlist = array(
                "code" => 1,
                "message" => "购物车内无商品"
            );
        }

        
    }
    else {
        $goodlist = array(
                "code" => 2,
                "message" => "参数有误，不能为空"
            );
    }
    echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);

    //关闭连接
    $conn -> close();
?>