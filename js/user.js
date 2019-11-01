//首次进入后台页面时拉取数据
// (function () {
//     ajax({
//         url: 'php/user.php',
//         type: 'post',
//         succeed: function (data) {
//             console.log(data);
//             var json = JSON.parse(data);
//             refresh(json);
//         },
//         failed: function (code) {
//             alert('链接失败');
//             console.log(code);
//         }
//     });
// })();


//添加用户
(function () {
    layui.use('layer', function () {

        //使用layui弹出层模块
        var layer = layui.layer;

        document.querySelector('#addUser').onclick = function () {
            layer.open({
                title: '请输入添加的内容',
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '240px'], //宽高
                content: `<div id="add">
                                <span class="user">用户名:</span>
                                <input class="username1" type="text""><br>
                                <span class="pwd">密码:</span>
                                <input class="password1" type="text">
                            </div>`,
                shade: 0.4,
                anim: 3, //动画种类
                maxmin: true,
                btn: ['确认', '取消'],
                'btn1': function (index, layero) {
                    var username = document.querySelector('.username1');
                    var password = document.querySelector('.password1');
                    ajax({
                        data: 'username=' + username.value + '&password=' + password.value + '&ope=add',
                        url: 'php/user.php',
                        type: 'post',
                        succeed: function (data) {
                            console.log(data);
                            var json = JSON.parse(data);
                            refresh(json);
                        },
                        failed: function (code) {
                            alert('链接失败');
                            console.log(code);
                        }
                    });
                    // alert('数据添加成功！')
                    layer.close(index);
                },
                'btn2': function (index, layero) {}
            });
        }

    })
})();


//查询用户
(function () {
    document.querySelector('#selUser').onclick = function () {
        var selIpt = document.querySelector('#selIpt');
        ajax({
            url: 'php/user.php',
            data: 'username=' + selIpt.value + '&ope=sel',
            type: 'post',
            succeed: function (data) {
                console.log(data);
                var json = JSON.parse(data);
                refresh(json);
            },
            failed: function (err) {
                console.log(err);
            }
        })
    }

})();


//删除用户
(function () {
    document.querySelector('tbody').onclick = function (e) {
        var e = e || window.event;
        var tg = e.target || e.srcElement;

        if (tg.id == 'delUser') {
            var r = confirm("是否删除该条数据!");
            if (r == true) {
                this.removeChild(tg.parentNode.parentNode);
                var id = tg.parentNode.parentNode.querySelector('#userID').innerText;
                ajax({
                    url: 'php/user.php',
                    data: 'id=' + id + '&ope=del',
                    type: 'post',
                    succeed: function (data) {
                        var json = JSON.parse(data);
                        refresh(json);
                    },
                    failed: function (err) {
                        console.log(err);
                    }
                })
            }
        }
    }
})();


//编辑用户
(function () {
    layui.use('layer', function () {

        //使用layui弹出层模块
        var layer = layui.layer;

        document.querySelector('.layui-table').onclick = function (e) {
            var e = e || window.event;
            var tg = e.target || e.srcElement;

            if (tg.id == 'rewUser') {
                //获取内容显示在弹出框中
                var uname = tg.parentNode.parentNode.querySelector('#uName');
                var upwd = tg.parentNode.parentNode.querySelector('#uPwd');

                layer.open({
                    title: '请输入编辑的内容',
                    type: 1,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '240px'], //宽高
                    content: `<div id="rew">
                                        <span class="user">用户名:</span>
                                        <input class="username2" type="text" value="${uname.innerText}"><br>
                                        <span class="pwd">密码:</span>
                                        <input class="password2" type="text" value="${upwd.innerText}">
                                    </div>`,
                    shade: 0.4,
                    anim: 1, //动画种类
                    maxmin: true,
                    btn: ['确认', '取消'],
                    'btn1': function (index, layero) {
                        var username = document.querySelector('.username2');
                        var password = document.querySelector('.password2');
                        var id = tg.parentNode.parentNode.querySelector('#userID').innerText;
                        ajax({
                            data: 'username=' + username.value + '&password=' + password.value + '&ope=rew' + '&id=' + id,
                            url: 'php/user.php',
                            type: 'post',
                            succeed: function (data) {
                                console.log(data);
                                var json = JSON.parse(data);
                                refresh(json);
                            },
                            failed: function (code) {
                                alert('链接失败');
                                console.log(code);
                            }
                        });
                        layer.close(index);
                    },
                    'btn2': function (index, layero) {}
                });
            }
        }

    })
})();


//分页
(function () {

    ajax({
        data: 'page=1&num=10&act=refresh',
        url: 'php/user2.php',
        type: 'get',
        succeed: function (data) {
            console.log(data);
            var json = JSON.parse(data);
            refresh(json); //首次进入刷新页面

            //使用layui分页模块
            layui.use(['laypage', 'layer'], function () {
                var laypage = layui.laypage;

                //完整功能
                laypage.render({
                    elem: 'demo7',
                    count: json.total, //同时，获取总条数
                    layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
                    jump: function (obj, first) {
                        //首次不执行
                        if (!first) {
                            ajax({
                                data: 'page=' + obj.curr + '&num=' + obj.limit + '&act=refresh',
                                url: 'php/user2.php',
                                type: 'get',
                                succeed: function (data) {
                                    console.log(data);
                                    var json = JSON.parse(data);
                                    refresh(json);
                                    obj.count = json.total;
                                },
                                failed: function (code) {
                                    alert('链接失败');
                                    console.log(code);
                                }
                            })
                        }
                    }
                });
            });
        },
        failed: function (code) {
            alert('链接失败');
            console.log(code);
        }
    })

})();