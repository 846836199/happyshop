<?php
    include "connect.php";

    //获取数据
    $cid = isset($_GET["cid"]) ? $_GET["cid"] : "";
    $type = isset($_GET["type"]) ? $_GET["type"] : "";

    if($cid && $type){
        //获取lid下的数量 gid商品id
        $sql = "select nums,gid from cartlist where cid = $cid";
        //执行sql 获取结果集
        $res = $conn -> query($sql);
        // var_dump($res);
        $arr = $res -> fetch_all(MYSQLI_ASSOC)[0];
        // var_dump($arr);
        $num = $arr["nums"]; //数量
        $gid = $arr["gid"]; //商品id
        // var_dump($gid);
        //库存
        $sql2 = "SELECT kucun from goodlist where gid = $gid";
        $res2 = $conn -> query($sql2);
        // var_dump($);
        $stroks = $res2 -> fetch_all(MYSQLI_ASSOC)[0]["kucun"];
        // var_dump($stroks);
        
        // 判断加或减
        if($type == "add") {
            //在库存内
            $num = $num+1;
            if($num<=$stroks){
                $sql3 = "update cartlist set nums = $num where cid = $cid";
                $res3 = $conn -> query($sql3);
                // var_dump($res3);
                $goodlist = array(
                    "code" => 0,
                    "nums" => $num,
                    "stroks" => $stroks,
                    "type" => $type,
                    "message" => "更新成功!"
                );
                //关闭连接
                // $res3 -> close();
            }
            else {
                $goodlist = array(
                    "code" => 1,
                    "nums" => $num-1,
                    "stroks" => $strok,
                    "type" => $type,
                    "message" => "已经到达最大"
                );
            }
        }
        else if($type == "sub"){
            //大于1
            $num = $num-1;
            if($num>=1){
                $sql3 = "update cartlist set nums = $num where cid = $cid";
                $res3 = $conn -> query($sql3);
                // var_dump($res3);
                $goodlist = array(
                    "code" => 0,
                    "nums" => $num,
                    "stroks" => $stroks,
                    "type" => $type,
                    "message" => "更新成功!"
                );
            }
            else {
                $goodlist = array(
                    "code" => 2,
                    "nums" => $num+1,
                    "stroks" => $stroks,
                    "type" => $type,
                    "message" => "最小为1"
                );
            }
        }
        else if(is_numeric($type)){
            $num = $type*1;
            if($num>$stroks){
                $num = $stroks;
            }
            if($num<1){
                $num = 1;
            }
            $sql4 = "update cartlist set nums = $num where cid = $cid";
            $res4 = $conn -> query($sql4);
            $goodlist = array(
                "code" => 0,
                "nums" => $num,
                "stroks" => $stroks,
                "type" => $type,
                "message" => "更新成功!"
            );
        }
        else {
            $goodlist = array(
                    "code" => 3,
                    "type" => $type,
                    "message" => "type 设错"
            );
        }
        $res -> close();
        $res2 -> close();
    }
    else {
        $goodlist = array(
            "code" => 4,
            "type" => $type,
            "message" => "参数为空"
        );
    }
    
    
    //返回数据
    echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);

    //关闭连接
    
    $conn -> close();
?>