$(function() {
    //从缓存中取出用户名相关信息
    if($.cookie("dox-rmb") == "true") {
        $("#username").val($.cookie("dox-user"));
        $("#password").val($.cookie("dox-pwd"));
        $("#rmb-user").attr("checked", true);
    }
    //显示登录用户名
    var admin = $.cookie("dox-user");
    $("#admin").html("<span class='am-icon-sign-in'>" + "</span>" + admin);
});

//点击登录
$("#login").click(function() {
    var user = $("#username").val();
    var pwd = $("#password").val();
    if (user == "" || pwd == "") {
        alert("用户名或密码不能为空！");
    } else {
        $.ajax({
            type: "post",
            url: "./json/login.json",
            data: {
                // user: user,
                // pwd: pwd
            },
            dataType: "json",
            success: function(result) {
                if(result.code == 200) {
                    //将用户名相关信息存入缓存
                    if($("#rmb-user").attr("checked") == "checked") {
                        $.cookie("dox-user", user, { expires: 7 });
                        $.cookie("dox-pwd", pwd, { expires: 7 });
                        $.cookie("dox-rmb", "true", { expires: 7 });
                    } else {
                        $.cookie("dox-user", user, { expires: 7 });
                        $.cookie("dox-pwd", "", { expires: 7 });
                        $.cookie("dox-rmb", "false", { expires: 7 });
                    }
                    //登录成功，跳转页面
                    window.location.href = "./index.html";
                } else {
                    alert("用户名或密码错误！");
                }   
            },
            error: function() {
                alert("error");
            }
        });
    }
})