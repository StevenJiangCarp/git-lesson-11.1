function refresh(json) {
    if (json.err == "1") {
        var tbody = document.querySelector('tbody');
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">${json.msg}</td></tr>`;
    } else if (json.err == "2") {
        alert(json.msg);
    } else {
        var tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        for (var i = 0, len = json.msg.length; i < len; i++) {
            tbody.innerHTML += `<tr>
                                    <td>${i+1}</td>
                                    <td id="userID">${json.msg[i].ID}</td>
                                    <td id="uName">${json.msg[i].username}</td>
                                    <td id="uPwd">${json.msg[i].password}</td>
                                    <td>${json.msg[i].time}</td>
                                    <td>
                                        <button type="button" class="layui-btn layui-btn-sm" id="rewUser">
                                            <i class="layui-icon">&#xe642;</i>编辑
                                        </button>
                                        <button type="button" class="layui-btn layui-btn-sm layui-btn-danger" id="delUser">
                                            <i class="layui-icon">&#xe640;</i>删除
                                        </button>
                                    </td>
                                </tr>`
        }
    }
    displayTd();
}

function displayTd() {
    var allID = document.querySelectorAll('#userID');
    // console.log(allID);
    for (var i = 0, len = allID.length; i < len; i++) {
        allID[i].style.display = "none";
    }
}