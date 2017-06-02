//初始化图表实例
var userType = echarts.init(document.getElementById("user-type"), "infographic");

//改变窗口大小时，同时改变图表大小
setTimeout(function() {
    window.onresize = function() {
        userType.resize();
    }
}, 200);

//容器
var userDate = [];
var userValue = [];
var actValue = [];
var noActValue = [];
var newUserDate = [];
var newUserValue = [];
var newActValue = [];
var newNoActValue = [];

//取值
var startTimeUt = $(".start-time-ut").val();
var endTimeUt = $(".end-time-ut").val();

//在图表未加载成功时，显示正在加载信息
userType.showLoading();

//获取用户总数
$.ajax({
    type: "get",
    url: "./json/all-user.json",
    data: {
        // type: "day",
        // startTime: startTimeUt,
        // endTime: endTimeUt
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate.push(data.data[i].date);
                userValue.push(data.data[i].value);
            }
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        userType.hideLoading();
    }
});

//获取热心用户数
$.ajax({
    type: "get",
    url: "./json/active-user.json",
    data: {
        // type: "day",
        // startTime: startTimeUt,
        // endTime: endTimeUt
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                actValue.push(data.data[i].value);
            }
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        userType.hideLoading();
    }
});

//获取一般用户数
$.ajax({
    type: "get",
    url: "./json/noActive-user.json",
    data: {
        // type: "day",
        // startTime: startTimeUt,
        // endTime: endTimeUt
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                noActValue.push(data.data[i].value);
                userType.setOption(option);
                userType.hideLoading();
            }
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        userType.hideLoading();
    }
});

//图表配置项
option = {
    grid: {
        left: "8%",
        top: "25%",
        right: "2%",
        bottom: "30%",
        tooltip: {
            trigger: "item",
            formatter: "{a}<br/>{b} : {c} (万户)"
        }
    },
    toolbox: {
        show: true,
        right: "20",
        feature: {
            dataZoom: {
                yAxisIndex: false
            },
            dataView: {
                readOnly: true
            },
            magicType: {
                type: ["line", "bar"]
            },
            saveAsImage: {
                name: "dox-chart"
            }
        }
    },
    yAxis: {
        name: "(万户)"
    },
    title: {
        text: "用户类型分析图表"
    },
    legend: {
        data: ["用户总数", "热心用户", "一般用户"]
    },
    xAxis: {
        axisLabel: {
            interval: "0",
            rotate: "45"
        },
        data: userDate
    },
    series: [
        {
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: "top"
                    }
                }
            },
            name: "用户总数",
            type: "bar",
            data: userValue
        },
        {
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: "top"
                    }
                }
            },
            name: "热心用户",
            type: "bar",
            data: actValue
        },
        {
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: "top"
                    }
                }
            },
            name: "一般用户",
            type: "bar",
            data: noActValue
        }
    ]
};

//使用以上配置项配置图表
userType.setOption(option);

//查询时间段
$(".ut-search").click(function(){
    //获取用户总数
    $.ajax({
        type: "get",
        url: "./json/all-user.json",
        data: {
            // type: "day",
            // startTime: startTimeUt,
            // endTime: endTimeUt
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                for (var j = 0; j < data.data.length; j++) {
                    newUserDate.push(data.data[j].date);
                    newUserValue.push(data.data[j].value);
                }
            } else {
                alert(data.message);
            }
        },
        error: function() {
            alert("图表请求数据失败!");
            userType.hideLoading();
        }
    });
    //获取热心用户数
    $.ajax({
        type: "get",
        url: "./json/active-user.json",
        data: {
            // type: "day",
            // startTime: startTimeUt,
            // endTime: endTimeUt
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                for (var j = 0; j < data.data.length; j++) {
                    newActValue.push(data.data[j].value);
                }
            } else {
                alert(data.message);
            }
        },
        error: function() {
            alert("图表请求数据失败!");
            userType.hideLoading();
        }
    });
    //获取一般用户数
    $.ajax({
        type: "get",
        url: "./json/noActive-user.json",
        data: {
            // type: "day",
            // startTime: 2017/01/01,
            // endTime: 2017/01/25
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                for (var j = 0; j < data.data.length; j++) {
                    newNoActValue.push(data.data[j].value);
                    userType.setOption(option);
                    userType.hideLoading();
                }
            } else {
                alert(data.message);
            }
        },
        error: function() {
            alert("图表请求数据失败!");
            userType.hideLoading();
        }
    });
    //图表配置项
    var option = {
        tooltip : {
            trigger: "item",
            formatter: "{a}<br/>{b} : {c} (万户)"
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                dataView: {
                    readOnly: true
                },
                magicType: {
                    type: ["line", "bar"]
                },
                saveAsImage: {
                    name: "dox-chart"
                }
            }
        },
        yAxis: {
            name: "(万户)"
        },
        title: {
            text: "用户类型分析图表"
        },
        legend: {
            data: ["用户总数", "热心用户", "一般用户"]
        },
        xAxis: {
            axisLabel: {
                interval: "0",
                rotate: "45"
            },
            data: newUserDate
        },
        series: [
            {
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: "top"
                        }
                    }
                },
                name: "用户总数",
                type: "bar",
                data: newUserValue
            },
            {
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: "top"
                        }
                    }
                },
                name: "热心用户",
                type: "bar",
                data: newActValue
            },
            {
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: "top"
                        }
                    }
                },
                name: "一般用户",
                type: "bar",
                data: newNoActValue
            }
        ]
    };
    //使用以上配置项配置图表
    userType.setOption(option);
});