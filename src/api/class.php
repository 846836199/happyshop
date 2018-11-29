<?php
    include "connect.php";
    $bid = isset($_GET["bid"]) ? $_GET["bid"] : "";

    if($bid){
        $sql = "SELECT * from classlist WHERE bid = $bid";

        $res = $conn -> query($sql);

        if($res -> num_rows >0){
            $arr = $res -> fetch_all(MYSQLI_ASSOC);
            // var_dump($arr);
            $list = array(
                "code" => "0",
                "datalist" => $arr
            );
        } else {
            $list = array(
                "code" => "1",
                "message" => "没有该类目"
            );
        }
        // var_dump($list);

        echo json_encode($list,JSON_UNESCAPED_UNICODE);

        $res -> close();
        $conn -> close();
    } else {
        echo "bid不能为空";
    }
    
?>