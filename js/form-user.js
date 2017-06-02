$(function() {
    var userList;
    var newId = $(".new-id").val();
    var newUser = $(".new-user").val();
    var newType = $(".new-type").val();
    var newName = $(".new-name").val();
    var listOperate = "<td><button class='am-btn am-btn-default mo-btn'>"
                        + "<i class='am-icon-pencil'></i>修改"
                        + "</button>"
                        + "<button class='am-btn am-btn-default del-btn'>"
                        + "<i class='am-icon-trash-o'></i>删除"
                        + "</button></td>";
    //新增数据弹窗
    $(".new-btn").click(function() {
        $("#new-data").modal({
            onConfirm: function() {
                if(newId == "" || newUser == "" || newName == "") {
                    alert("信息填写不完整！");
                } else {
                    $.ajax({
                        type: "POST",
                        url: "./json/user.json",
                        data: $("#newForm").serialize(),
                        dataType: "json",
                        success: function() {
                            alert("添加成功!");
                            console.log($("#newForm").serialize())
                        },
                        error: function() {
                            alert("添加失败!");
                        }
                    });
                }
            }
        });
    });
    $.ajax({
        type: "get",
        url: "./json/user.json",
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                var dataLen = data.data.length;
                //读取记录总数
                $(".record-num").text(dataLen);
                //数据列表
                for (var i = 0; i < dataLen; i++) {
                    var listCheckbox = "<td><label class='am-checkbox'>"
                                        + "<input type='checkbox' value=" + data.data[i].number + " data-am-ucheck>"
                                        + "</label></td>";
                    userList += "<tr>"
                                + listCheckbox
                                + "<td>" + data.data[i].number + "</td>"
                                + "<td>" + data.data[i].user + "</td>"
                                + "<td>" + data.data[i].type + "</td>"
                                + "<td>" + data.data[i].name + "</td>"
                                + "<td>" + data.data[i].date + "</td>"
                                + listOperate
                                + "</tr>";
                }
                //添加数据并调整样式
                $(".user-form").append(userList);
                $("td button").addClass("list-button");
                //搜索
                $(".search-field").focus(function() {
                    $(".search-field").val("");
                });
                $(".search-form").click(function() {
                    var searchList;
                    var listOperate2 = "<td><button class='am-btn am-btn-default mo-btn'>"
                        + "<i class='am-icon-pencil'></i>修改"
                        + "</button>"
                        + "<button class='am-btn am-btn-default del-btn'>"
                        + "<i class='am-icon-trash-o'></i>删除"
                        + "</button></td>";
                    $(".user-form>tbody>tr").remove();
                    $.ajax({
                        type: "get",
                        url: "./json/user.json",
                        data: {
                            search: $(".search-field").val()
                        },
                        dataType: "json",
                        success: function(result) {
                            if(result.code == 200) {
                                var listCheckbox = "<td><label class='am-checkbox'>"
                                    + "<input type='checkbox' value=" + result.data[0].number + " data-am-ucheck>"
                                    + "</label></td>";
                                searchList += "<tr>"
                                + listCheckbox
                                + "<td>" + result.data[0].number + "</td>"
                                + "<td>" + result.data[0].user + "</td>"
                                + "<td>" + result.data[0].type + "</td>"
                                + "<td>" + result.data[0].name + "</td>"
                                + "<td>" + result.data[0].date + "</td>"
                                + listOperate2
                                + "</tr>";
                                $(".user-form").append(searchList);
                            } else {
                                alert(result.message);
                            }
                        },
                        error: function() {
                            alert("搜索错误！");
                        }
                    });
                });
                //批量删除弹窗
                $(":checkbox").click(function(){
                    $(this).parent().parent().parent().toggleClass("che-style");
                });
                $(".delp-btn").click(function() {
                    var delpVal = $(":checked").map(function(){
                        return $(this).val();
                    }).get();
                    $("#del-part").modal({
                        onConfirm: function() {
                            $.ajax({
                                type: "POST",
                                url: "./json/user.json",
                                cache: false,
                                traditional: true,
                                data: {
                                    delId: delpVal
                                },
                                dataType: "json",
                                success: function() {
                                    alert("删除成功！");
                                }
                            });
                        }
                    });
                });
                //删除单条数据弹窗
                $(".del-btn").click(function() {
                    var delItem = $(this).parent().parent().find("td :eq(1)").text();
                    console.log(delItem);
                    $("#del-one").modal({
                        onConfirm: function() {
                            $.ajax({
                                type: "POST",
                                url: "./json/user.json",
                                data: {
                                    delId: delItem
                                },
                                dataType: "json",
                                success: function() {
                                    alert("删除成功！");
                                }
                            });
                        }
                    });
                });
                //修改数据弹窗
                $(".mo-btn").click(function() {
                    var moItem = $(this).parent().parent().find("td :eq(1)").text();
                    for (var j = 0; j < dataLen; j++) {
                       if (moItem == data.data[j].number) {
                           $(".mo-id").val(moItem);
                           $(".mo-user").val(data.data[j].user);
                           $(".mo-type").val(data.data[j].type);
                           $(".mo-name").val(data.data[j].name);
                       }
                    }
                    $("#mo-data").modal({
                        onConfirm: function() {
                            $.ajax({
                                type: "POST",
                                url: "./json/user.json",
                                data: {
                                    id: $(".mo-id").val(),
                                    user: $(".mo-user").val(),
                                    type: $(".mo-type").val(),
                                    name: $(".mo-name").val()
                                },
                                dataType: "json",
                                success: function() {
                                    alert("保存成功!");
                                },
                                error: function() {
                                    alert("保存失败!");
                                }
                            });
                        }
                    });
                })
            } else {
                alert(data.message);
            }
        },
        error: function() {
            alert("请求数据失败!");
        }
    });

});
