//定义$
function $(id) {
    return document.getElementById(id);
}

//不能为空
function isBlank(str) {
    var re = /^\s*$/;
    return re.test(str);
}

//验证邮箱
function isEmail(str) {
    var re = /^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]+)$/;
    return re.test(str);
}

function chkEmail() {
    if (isBlank($("email").value)) {
        $("emailPrompt").style.color = "red";
        $("emailPrompt").innerText = "× 邮箱不能为空";
        return false;
    } else if (!isEmail($("email").value)) {
        $("emailPrompt").style.color = "orange";
        $("emailPrompt").innerText = "！ 邮箱格式不正确";
        return false;
    } else {
        $("emailPrompt").style.color = "green";
        $("emailPrompt").innerText = "✔ 邮箱格式正确";
        return true;
    }
}

//验证密码
function isPassword(str) {
    var re = /[a-zA-Z0-9]{6,16}/;
    return re.test(str);
}

function chkPassword1() {
    if (isBlank($("password1").value)) {
        $("password1Prompt").style.color = "red";
        $("password1Prompt").innerText = "× 密码不能为空";
        return false;
    } else if (!isPassword($("password1").value)) {
        $("password1Prompt").style.color = "orange";
        $("password1Prompt").innerText = "！ 英文、数字长度为6-16个字符";
        return false;
    } else {
        $("password1Prompt").style.color = "green";
        $("password1Prompt").innerText = "✔ 密码格式正确";
        return true;
    }
}

//提交时验证
document.querySelector('.submit').onclick = function () {
    var msg = "";
    if (!chkEmail($("email").value)) {
        msg += "邮箱不符合要求！\n";
    }
    if (!chkPassword1($("password1").value)) {
        msg += "密码不符合要求！\n";
    }
    if (msg != "") {
        msg = msg.substr(0, msg.length - 1);
        alert(msg);
        return false;
    }

    //去登录
    var username = document.querySelector('#email');
    var password = document.querySelector('#password1');
    ajax({
        data: 'username=' + username.value + '&password=' + password.value + '&ope=log',
        url: 'php/logRes.php',
        type: 'post',
        succeed: function (data) {
            console.log(data);
            var json = JSON.parse(data);
            if (json.err == "1") {
                alert(json.msg);
            } else {
                alert(json.msg);
                window.location.href = 'index.html';
            }
        },
        failed: function (code) {
            alert('链接失败');
            console.log(code);
        }
    });
}