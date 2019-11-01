<?php

	//连接数据库
	include 'public.php';

	//选择数据库
	my_error('use test02');

    //分页
	//接收参数
	$page = $_GET["page"]?:1;//当前页数
	$num = $_GET["num"];//一页显示多少条数据
	$act =$_GET["act"];//请求类型
	// echo $page;
	// echo $num;
	// echo $act;

	switch($act){

		case "refresh":
				
			$sql = "select * from user";
			$res = my_error($sql);//拿到结果集
			$total = mysql_num_rows($res);//拿到总条数
			// echo $total;
			$totalPage = ceil($total/$num);//计算分多少页
			// echo $totalPage;

			$start=($page-1)*$num;//匹配数据库limit规则：limit(0,5)从第一条开始，显示5条。

			//边界设置
			if($page<1){
				$page=1;
			}
			if($page>$totalPage){
				$page=$totalPage;
			}

			$sql2 = "select * from user limit $start,$num";
			$res2 = my_error($sql2);
			while($row = mysql_fetch_assoc($res2)){
				$users[] = $row;//把该页的数据取出来
			}
			$data = json_encode($users);
			echo '{"err":"0","msg":'.$data.',"total":'.$total.'}';
			
			break;

	}