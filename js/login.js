//初始化页面时验证是否记住用户名
$(document).ready(function() {
    if ($.cookie("rmbUser") == "true") {
        $("#rmb-user").attr("checked", true);
        $("#username").val($.cookie("username"));
        $("#password").val($.cookie("password"));
    }
});

//保存用户名
function saveUserInfo() {
    if ($("#rmb-user").attr("checked") == true) {
        var userName = $("#username").val();
        var passWord = $("#password").val();
        $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
        $.cookie("username", username, { expires: 7 }); // 存储一个带7天期限的 cookie
        $.cookie("password", password, { expires: 7 }); // 存储一个带7天期限的 cookie
    }
    else {
        $.cookie("rmbUser", "false", { expires: -1 });
        $.cookie("username", '', { expires: -1 });
        $.cookie("password", '', { expires: -1 });
    }
}

//登录
$('#login').click(function () {
    var user = $("#username").val();
    var pwd = $("#password").val();
    if ($('#username').val() == "" || $('#password').val() == "") {
        alert("用户名或密码不能为空！");
    }
    else {
        $.ajax({
            type: "post",
            url: "",
            data: {
                user: user,
                pwd: pwd
            },
            datatype: 'json',
            success: function(result) {
                if(result.code == 200) {
                    window.location.href = "../index.html";
                } else {
                    alert("用户名或密码错误！");
                }
            },
            error: function(error) {
                alert("error");
            }
        });
    }
});