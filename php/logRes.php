<?php

/*
****************************************************

	请求方式: post

	url:	php/losRes.php

	参数：   username = 用户名
			password = 密码
			ope = res 注册
				= log 登录
		
	return json:	'{"err":"0","msg":"注册成功！"}'
					'{"err":"1","msg":"此用户名已被注册！"}'
			 
****************************************************
*/

	//连接数据库
	include 'public.php';

	//选择数据库
	my_error('use test02');
    
    //接收参数
    $user = $_POST['username'];
    $pwd = $_POST['password'];
    $ope = $_POST['ope'];

    //判断是注册还是登录操作
    switch($ope){
        case "res":
            //判断数据库中是否已存在该用户名
			$sql = "select * from user where username = '{$user}'";
			$res = my_error($sql);
			$row = mysql_fetch_row($res);
			// echo $row;
			if((int)$row[0]>0){
				echo '{"err":"1","msg":"此用户名已被注册！"}';
			}else{
                echo '{"err":"0","msg":"注册成功！"}';
            }
            //添加用户入库
	        $time = time();
	        $sql2 = "insert into user values(null,'{$user}','{$pwd}',$time)";
	        $insert_id = my_error($sql2);
            break;
        case "log":
            //判断数据库中是否已存在该用户名
			$sql = "select * from user where username = '{$user}' and password='{$pwd}'";
			$res = my_error($sql);
			$row = mysql_fetch_row($res);
			// echo $row;
			if((int)$row[0]>0){
				echo '{"err":"0","msg":"登录成功！"}';
			}else{
                echo '{"err":"1","msg":"用户名与密码不匹配！"}';
            }
            break;
	}
	
	//关闭数据库
	mysql_close(mysql_connect('','root',''));