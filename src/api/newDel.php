<?php
    // $str = "15-16";
    // $arr = explode("-",$str);
    // var_dump($arr);
    include "connect.php";
    $cid = isset($_GET["cid"]) ? $_GET["cid"] : "";
    if($cid){
        //字符串拆分成数组
        $arr = explode("-",$cid);
        $str = "";
        for($i=0;$i<count($arr);$i++){
            // 字符串拼接
            $str = $str."cid=".$arr[$i]." or ";
        }
        //去掉字符串末尾-和空格
        $str = substr($str,0,mb_strlen($str)-3);
        // echo $str;
        //sql语句
        $sql = "delete from cartlist where $str";
        // echo $sql;
        //执行语句，删除数据
        $res = $conn -> query($sql);
        if($res){
            $list = array(
                "code" => 0,
                "message" => "已删除"
            );  
        }
    }
    else {
        $list = array(
            "code" => 1,
            "message" => "未删除,cid不能为空"
        );
    }
    //返回值
    echo json_encode($list,JSON_UNESCAPED_UNICODE);
    $conn -> close();
?>