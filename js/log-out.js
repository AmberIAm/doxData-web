$("#log-out").click(function(){
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
                window.location.href = "./login.html";
            } else {
                alert("错误！");
            }   
        },
        error: function() {
            alert("error");
        }
    });
})