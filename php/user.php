<?php

/*
****************************************************

	请求方式: post

	url:	php/user.php

	参数：   username = 用户名
			password = 密码
			id = ID（数据库自增段）
			ope = add 增
				  del 删
				  rew 改
				  sel 查 
			什么都不传 = 首次进入 刷新页面
		
	return json:	'{"err":"0","msg":'.$data.'}'
					'{"err":"1","msg":"数据库空空如也！"}'
					'{"err":"2","msg":"此用户名已被占用！"}'
			 
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
    $id = $_POST['id'];

    // 检测操作类型
    switch($ope){
		case "add":
			$sql = "select * from user where username = '{$user}'";
			$res = my_error($sql);
			$row = mysql_fetch_row($res);
			if((int)$row[0]>0){	//判断数据库中是否已存在该用户名
				echo '{"err":"2","msg":"此用户名已被占用！"}';
				exit();
			}else{//添加用户入库
	        	$time = time();
	        	$sql2 = "insert into user values(null,'{$user}','{$pwd}',$time)";
	        	$insert_id = my_error($sql2);
			}
           
			$users = eachData();

			$data = json_encode($users);
			echo '{"err":"0","msg":'.$data.'}';	
			break;  
			 
        case "del":
            $sql = "delete from user where id = '{$id}'";//后端直接根据id删，不用判断存在性
	        my_error($sql);

			$users = eachData();
			
            if(empty($users)){//若数据库删空了
                echo '{"err":"1","msg":"数据库空空如也！"}';
            }else{//刷新页面，整理序号
				$data = json_encode($users);
				echo '{"err":"0","msg":'.$data.'}';
            }
			break;
			
		case "rew":
			$sql = "select * from user where username = '{$user}'";
			$res = my_error($sql);
			$row = mysql_fetch_row($res);
			if((int)$row[0]>0){	//判断数据库中是否已存在该用户名，不能撞名字
				echo '{"err":"2","msg":"此用户名已被占用！"}';
				exit();
			}else{ //更新数据库用户信息
            	$time = time();
	        	$sql2 = "update user set username = '{$user}', password = '{$pwd}', time = '{$time}' where id = {$id}";
            	my_error($sql2);
			}
	       
			$users = eachData();

            $data = json_encode($users);
			echo '{"err":"0","msg":'.$data.'}';
			break;
			
		case "sel"://从库中查询用户
	        $sql = "select * from user where username = '$user'";
			$res = my_error($sql);			
				
	        $users = array();	
	        //利用while循环，每次取到数据之后判断保存数据的结果，只要结果不为false，那么一直取
	        while($row = mysql_fetch_assoc($res)){
		        $users[] = $row;
	        }
            if(empty($users)){//查无此人
                echo '{"err":"1","msg":"此用户不存在！"}';
            }else{//返回json
				$data = json_encode($users);
				echo '{"err":"0","msg":'.$data.'}';
            }
	
			break;
			  
		default://第一次进入页面
			$users = eachData();

            if(empty($users)){//没数据
                echo '{"err":"1","msg":"数据库空空如也！"}';
            }else{//有数据，刷新页面
				$data = json_encode($users);
				echo '{"err":"0","msg":'.$data.'}';
			}
	}

	function eachData(){//遍历整个表格
		$sql = "select * from user";
		$res = my_error($sql);//拿到结果集
		$users = array();//保存取出的记录（数组）	
		while($row = mysql_fetch_assoc($res)){//循环遍历所有结果
			$users[] = $row;
		}
		return $users;
	}
	
	//关闭数据库
	mysql_close(mysql_connect('','root',''));
    

	


 
    





	
    



