<?php
    include "connect.php";
    
    //列表数据查询和渲染 升降序
    //接收数据 
    //默认 第一页 每页10条 按id排序 升序
    $page = isset($_GET["page"]) ? $_GET["page"] : 1; //索引 从哪开始
    $nums = isset($_GET["nums"]) ? $_GET["nums"] : 7; //数量
    $type = isset($_GET["type"]) ? $_GET["type"] : "gid"; //按什么排序
    $order = isset($_GET["order"]) ? $_GET["order"] : "asc"; //升降序
    $clid = isset($_GET["clid"]) ? $_GET["clid"] : "0";
    // echo $nums;
    if($clid){
        //索引-1
        $index = ($page-1)*$nums;
        //获取数据总条数
        $sql2 = "SELECT * from goodlist WHERE clid = $clid";
        // var_dump($res);
        //执行语句
        $res2 = $conn -> query($sql2);
        //sql语句 获取部分数据
        $sql = "select * from goodlist WHERE clid = $clid order by $type $order LIMIT $index,$nums";
        // //执行sql语句
        $res = $conn -> query($sql);
        // var_dump($res);
        //获取结果集内容
        if($res -> num_rows >0){
            $arr = $res -> fetch_all(MYSQLI_ASSOC);
            //查询店铺信息表，将店铺信息传入
            for($i=0;$i<count($arr);$i++){
                $sql3 = "select * from storelist where sid = ".$arr[$i]['sid'];
                $res3 = $conn -> query($sql3);
                $name = $res3 -> fetch_all(MYSQLI_ASSOC)[0]["sname"];
                // var_dump($name);
                $arr[$i]["sname"] = $name;
            }
            // var_dump($arr);
            $goodlist = array(
            'code' => 0,
            "clid" => $clid,
            "total" => $res2->num_rows,  //总条数
            'page' => $index,  //第几页
            'nums' => $nums, //每页多少条
            "type" => $type, //按什么排序
            "order" => $order, //升降序
            'datalist' => $arr, //查询的数据
            );
        }
        else {
            $goodlist = array(
                'code' => 1,
                "message" => "参数有问题"
            );
        }
        // var_dump($goodlist);
        //返回
        $res -> close();
        $res2 -> close();
        $conn -> close();
    } else {
        $goodlist = array(
            'code' => 2,
            "message" => "clid 不能为空"
        );
    }
    echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
?>