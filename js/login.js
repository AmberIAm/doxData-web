//初始化页面时验证是否记住用户名
$(function() {
    if ($.cookie("rmbUser") == "true") {
        $("#rmb-user").attr("checked", true);
        $("#username").val($.cookie("username"));
        alert($.cookie("username"));
        // $("#admin").css("display", "block");
        // $("#admin").val($.cookie("user"));
        $("#password").val($.cookie("password"));
    }
});

//保存用户名
function saveUserInfo() {
    if ($("#rmb-user").attr("checked") == true) {
        var user = $("#username").val();
        var pwd = $("#password").val();
        $.cookie("rmbUser", "true", { expires: 7 });
        $.cookie("username", user, { expires: 7 });
        $.cookie("password", pwd, { expires: 7 });
    }
    else {
        $.cookie("rmbUser", "false", { expires: -1 });
        $.cookie("username", '', { expires: -1 });
        $.cookie("password", '', { expires: -1 });
    }
}

//登录
$("#login").click(function(){
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
                    window.location.href = "./index.html";
                    $("#admin").css("display", "block");
                    $("#admin").html(user);
                } else {
                    alert("用户名或密码错误！");
                }   
                // for (var i = 0; i < result.data.length; i++) {
                //     if (result.data[i].user == user && result.data[i].pwd == pwd) {
                //         window.location.href = "./index.html";
                //     } else {
                //         alert("用户名或密码错误！");
                //     } 
                // }         
            },
            error: function() {
                alert("error");
            }
        });
    }
})