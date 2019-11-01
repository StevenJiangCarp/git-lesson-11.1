//分页
(function () {
    //初始化layui
    layui.use('element', function () {
        var element = layui.element;
    });

    //使用layui分页模块
    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage,
            layer = layui.layer;

        //完整功能
        laypage.render({
            elem: 'demo7',
            count: 100,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if (!first) {
                    //do something
                }
            }
        });
    });
})();