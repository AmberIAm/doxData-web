$(function() {
    var perPage = 5;
    var curPage = 0;
    var listOperate = "<td><button class='am-btn am-btn-default mo-btn'>"
                        + "<i class='am-icon-pencil'></i>修改"
                        + "</button>"
                        + "<button class='am-btn am-btn-default del-btn'>"
                        + "<i class='am-icon-trash-o'></i>删除"
                        + "</button></td>";
    //验证表单
    function validate(result) {
        result.validator({
            onInValid: function(validity) {
                var formField = $(validity.field);
                var formGroup = formField.closest(".am-form-group");
                var formValue = formField.val();
                formGroup.find("input").val("");
                if (formField.is("#newId") || formField.is("#moId")) {
                    if (formValue == "") {
                        formGroup.find("input").attr("placeholder", "请输入1个以上有效字符!");
                    }
                }
                if (formField.is("#newUser") || formField.is("#moUser")) {
                    if (formValue == "") {
                        formGroup.find("input").attr("placeholder", "请输入3个以上有效字符!");
                    }
                }
                if (formField.is("#newName") || formField.is("#moName")) {
                    if (formValue == "") {
                        formGroup.find("input").attr("placeholder", "请输入3个以上有效字符!");
                    }
                }
                if (formField.is("#newType") || formField.is("#moType")) {
                    formGroup.find("select option:eq(0)").text("重要！请选择以下类型！");
                }
            },
            validate: function(validity) {
                var formField = $(validity.field);
                var formValue = formField.val();
                var iLength = function(v1) {
                    v1 = v1.replace(/(^\s*)|(\s*$)/g, "");
                    if (v1.length < 1) {
                        validity.valid = false;
                    }
                };
                var unLength = function(v2) {
                    v2 = v2.replace(/(^\s*)|(\s*$)/g, "");
                    if (v2.length < 3) {
                        validity.valid = false;
                    }
                };
                if (formField.is("#newUser") || formField.is("#newName") || formField.is("#moUser") || formField.is("#moName")) {
                    unLength(formValue);
                }
                else if (formField.is("#newId") || formField.is("#moId")) {
                    iLength(formValue);
                }
                else {
                    if (formValue == "") {
                        validity.valid = false;
                    }
                }
            }
        });
    }
    validate($("#newForm"));
    validate($("#moForm"));
    //新增数据弹窗
    $(".new-btn").click(function() {
        $("#new-data").modal({
            onConfirm: function() {
                var newCheck = $("#newId").hasClass("am-field-valid") && $("#newUser").hasClass("am-field-valid") && $("#newType").hasClass("am-field-valid") && $("#newName").hasClass("am-field-valid");
                if (newCheck) {
                    var formData = $("#newForm").serialize();
                    formData = decodeURIComponent(formData, true);
                    $.ajax({
                        type: "post",
                        url: "./json/user.json",
                        cache: false,
                        /* 依次传递newId，newUser，newType，newName的值
                         格式为newId=6&newUser=曾&newType=1&newName=曾
                         其中选择“普通”和“高级”的类型传递的值依次为1,2 */
                        data: formData,
                        dataType: "json",
                        success: function () {
                            alert("添加成功!");
                            console.log(formData);
                        },
                        error: function () {
                            alert("添加失败!");
                        }
                    });
                } else {
                    alert("表单填写错误！");
                }
            }
        });
    });
    //数据列表分页处理
    function pagiList() {
        $.ajax({
            type: "get",
            url: "./json/listLength.json", //返回用户总列表
            cache: false,
            dataType: "json",
            success: function(list) {
                $("#pagination").pagination(list.data.length, {
                    items_per_page: perPage,
                    callback: function pageSelect(index) { //index为当前页面的页数索引值，第一页为0, 同curPage
                        listForm(index);
                    }
                });
            },
            error: function() {
                alert(data.message);
            }
        })
    }
    //数据列表相关操作
    function listForm(curPage) {
        var userList = "userList" + curPage;
        $.ajax({
            type: "post",
            url: "./json/user.json", //返回每一页的用户列表
            data: {
                perPage: perPage, //每页最多显示的记录条数，当前每页显示5条记录
                curPage: curPage  //当前页面的页数索引值，第一页为0
            },
            cache: false,
            dataType: "json",
            success: function(data) {
                if (data.code == 200) {
                    var dataLen = data.data.length;
                    //读取记录总数
                    $(".record-num").text(dataLen);
                    console.log("perPage:" + perPage + " curPage:" + curPage);
                    //显示数据列表
                    for (var i = 0; i < dataLen; i++) {
                        var listCheckbox = "<td><label class='am-checkbox'>"
                            + "<input type='checkbox' name='userData' value=" + data.data[i].number + " data-am-ucheck>"
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
                    $(".user-form>tbody>tr").remove();
                    $(".user-form").append(userList);
                    $("td button").addClass("list-button");
                    //列表单选框选中效果
                    $(":checkbox").click(function(){
                        $(this).parent().parent().parent().toggleClass("che-style");
                    });
                    //批量删除弹窗
                    $(".delp-btn").click(function() {
                        var delpVal = $(":checked").map(function(){
                            return $(this).val();
                        }).get();
                        delpVal.pop();
                        if(delpVal.length == 0) {
                            alert("请选择需要修改的数据！");
                        } else {
                            $("#del-part").modal({
                                onConfirm: function() {
                                    $.ajax({
                                        type: "post",
                                        url: "./json/user.json",
                                        cache: false,
                                        traditional: true,
                                        data: {
                                            //传递数据ID
                                            delId: delpVal
                                        },
                                        dataType: "json",
                                        success: function() {
                                            alert("删除成功！");
                                        }
                                    });
                                }
                            });
                        }
                    });
                    //删除单条数据弹窗
                    $(".del-btn").click(function() {
                        var delItem = $(this).parent().parent().find("td :eq(1)").text();
                        $("#del-one").modal({
                            onConfirm: function() {
                                $.ajax({
                                    type: "post",
                                    url: "./json/user.json",
                                    data: {
                                        //传递数据ID
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
                        var moForm = $("#moForm");
                        var moItem = $(this).parent().parent().find("td :eq(1)").text();
                        moForm.find(".am-form-group").removeClass("am-form-error").removeClass("am-form-success").find("input").removeClass("am-field-error").removeClass("am-field-valid");
                        moForm.find(".am-form-group").find("select#moType").removeClass("am-field-error").removeClass("am-field-valid");
                        for (var j = 0; j < dataLen; j++) {
                            if (moItem == data.data[j].number) {
                                $("#moId").val(moItem);
                                $("#moUser").val(data.data[j].user);
                                $("#moName").val(data.data[j].name);
                                if (data.data[j].type == "普通") {
                                    $("#moType").val(1);
                                } else {
                                    $("#moType").val(2);
                                }
                            }
                        }
                        $("#mo-data").modal({
                            onConfirm: function() {
                                var moCheck = moForm.find("input").hasClass("am-field-error");
                                if (!moCheck) {
                                    var moData = moForm.serialize();
                                    moData = decodeURIComponent(moData, true);
                                    $.ajax({
                                        type: "post",
                                        url: "./json/user.json",
                                        cache: false,
                                        /* 依次传递moId，moUser，moType，moName的值
                                         格式为moId=6&moUser=曾&moType=1&moName=曾
                                         其中选择“普通”和“高级”的类型传递的值依次为1,2 */
                                        data: moData,
                                        dataType: "json",
                                        success: function () {
                                            alert("保存成功!");
                                        },
                                        error: function () {
                                            alert("保存失败!");
                                        }
                                    });
                                } else {
                                    alert("表单填写错误！");
                                }
                            }
                        });
                    });
                    //搜索
                    $(".search-field").focus(function() {
                        $(".search-field").val("");
                    });
                    $(".search-form").click(function() {
                        var searchList = "searchList" + curPage;
                        $(".user-form>tbody>tr").remove();
                        $.ajax({
                            type: "post",
                            url: "./json/user.json",
                            cache: false,
                            data: {
                                search: $(".search-field").val()
                            },
                            dataType: "json",
                            success: function(result) {
                                if(result.code == 200) {
                                    //显示搜索结果
                                    for (var k = 0; k < dataLen; k++) {
                                        var listCheckbox = "<td><label class='am-checkbox'>"
                                            + "<input type='checkbox' name='userData' value=" + result.data[k].number + " data-am-ucheck>"
                                            + "</label></td>";
                                        searchList += "<tr>"
                                        + listCheckbox
                                        + "<td>" + result.data[k].number + "</td>"
                                        + "<td>" + result.data[k].user + "</td>"
                                        + "<td>" + result.data[k].type + "</td>"
                                        + "<td>" + result.data[k].name + "</td>"
                                        + "<td>" + result.data[k].date + "</td>"
                                        + listOperate
                                        + "</tr>";
                                    }
                                    $(".user-form").append(searchList);
                                    //列表单选框选中效果
                                    $(":checkbox").click(function(){
                                        $(this).parent().parent().parent().toggleClass("che-style");
                                    });   
                                    //删除单条数据弹窗
                                    $(".del-btn").click(function() {
                                        var delItem = $(this).parent().parent().find("td :eq(1)").text();
                                        $("#del-one").modal({
                                            onConfirm: function() {
                                                $.ajax({
                                                    type: "post",
                                                    url: "./json/user.json",
                                                    data: {
                                                        //传递数据ID
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
                                        var moForm = $("#moForm");
                                        var moItem = $(this).parent().parent().find("td :eq(1)").text();
                                        moForm.find(".am-form-group").removeClass("am-form-error").removeClass("am-form-success").find("input").removeClass("am-field-error").removeClass("am-field-valid");
                                        moForm.find(".am-form-group").find("select#moType").removeClass("am-field-error").removeClass("am-field-valid");
                                        for (var j = 0; j < dataLen; j++) {
                                            if (moItem == data.data[j].number) {
                                                $("#moId").val(moItem);
                                                $("#moUser").val(data.data[j].user);
                                                $("#moName").val(data.data[j].name);
                                                if (data.data[j].type == "普通") {
                                                    $("#moType").val(1);
                                                } else {
                                                    $("#moType").val(2);
                                                }
                                            }
                                        }
                                        $("#mo-data").modal({
                                            onConfirm: function() {
                                                var moCheck = moForm.find("input").hasClass("am-field-error");
                                                if (!moCheck) {
                                                    var moData = moForm.serialize();
                                                    moData = decodeURIComponent(moData, true);
                                                    $.ajax({
                                                        type: "post",
                                                        url: "./json/user.json",
                                                        cache: false,
                                                        /* 依次传递moId，moUser，moType，moName的值
                                                         格式为moId=6&moUser=曾&moType=1&moName=曾
                                                         其中选择“普通”和“高级”的类型传递的值依次为1,2 */
                                                        data: moData,
                                                        dataType: "json",
                                                        success: function () {
                                                            alert("保存成功!");
                                                        },
                                                        error: function () {
                                                            alert("保存失败!");
                                                        }
                                                    });
                                                } else {
                                                    alert("表单填写错误！");
                                                }
                                            }
                                        });
                                    });
                                } else {
                                    alert(result.message);
                                }
                            },
                            error: function() {
                                alert("搜索错误！");
                            }
                        });
                    });
                } else {
                    alert(data.message);
                }
            },
            error: function() {
                alert("请求数据失败!");
            }
        });
    }
    listForm(0); //显示数据列表列表第一页信息
    pagiList();
});

