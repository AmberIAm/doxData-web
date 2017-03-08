//初始化图表实例
var userType = echarts.init(document.getElementById('user-type'), 'infographic');

//改变窗口大小时，同时改变图表大小
setTimeout(function (){
    window.onresize = function() {
        userType.resize();
    }
},200)

//初步配置图表通用项
var option = {
    tooltip : {
        trigger: 'item',
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
                type: ['line', 'bar']
            },
            saveAsImage: {
                name: 'dox-chart'
            }
        }
    },
    xAxis: {
        axisLabel: {
            interval: '0',
        },
        data: []
    },
    yAxis: {}
}

//使用以上配置的图表通用项配置图表
userType.setOption(option);

//在图表未加载成功时，显示正在加载信息
userType.showLoading();

//用户类型分析:热心用户与一般用户
var userDate = [];
var actValue = []; 
var noActValue = []; 
$.ajax({
    type: "get",
    url: "./json/active-user.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate.push(data.data[i].date);
                actValue.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue.push(result.data[j].value);
                        }
                        userType.hideLoading();
                        userType.setOption({
                            title: {
                                text: '用户类型分析图表'
                            },
                            legend: {
                                data: ['热心用户', '一般用户'],
                            },
                            xAxis: {
                                axisLabel: {
                                    rotate: '45'
                                },
                                data: userDate
                            },
                            series: [{
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top'
                                        }
                                    }
                                },
                                name: '热心用户',
                                type: 'bar',
                                data: actValue
                            },
                            {
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top',
                                        }
                                    }
                                },
                                name: '一般用户',
                                type: 'bar',
                                data: noActValue
                            }]
                        });
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    userType.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        userType.hideLoading();
    }
})

//点播时长按日分析，查询并显示图表
$(".user-search").click(function(){
    var newUserDate = [];
    var newActValue = []; 
    var newNoActValue = []; 
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        type: "get",
        url: "./json/active-user.json",
        data: {
            // type: "day",
            // startTime: 2017/01/01,
            // endTime: 2017/01/25
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                for (var i = 0; i < data.data.length; i++) {
                    newUserDate.push(data.data[i].date);
                    newActValue.push(data.data[i].value);
                }
                $.ajax({
                    type: "get",
                    url: "./json/noActive-user.json",
                    data: {
                        // type: "day",
                        // startTime: 2017/01/01,
                        // endTime: 2017/01/25
                    },
                    dataType: "json",
                    success: function(result) {
                        if (result.code == 200) {
                            for (var j = 0; j < result.data.length; j++) {
                                newNoActValue.push(result.data[j].value);
                            }
                            userType.hideLoading();
                            userType.setOption({
                                title: {
                                    text: '用户类型分析图表'
                                },
                                legend: {
                                    data: ['热心用户', '一般用户'],
                                },
                                xAxis: {
                                    axisLabel: {
                                        rotate: '45'
                                    },
                                    data: newUserDate
                                },
                                series: [{
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: 'top'
                                            }
                                        }
                                    },
                                    name: '热心用户',
                                    type: 'bar',
                                    data: newActValue
                                },
                                {
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: 'top',
                                            }
                                        }
                                    },
                                    name: '一般用户',
                                    type: 'bar',
                                    data: newNoActValue
                                }]
                            });
                        } else {
                            alert(result.message);
                        }
                    },
                    error: function() {
                        alert("图表请求数据失败!");
                        userType.hideLoading();
                    }
                })
            } else {
                alert(data.message);
            }
        },
        error: function() {
            alert("图表请求数据失败!");
            userType.hideLoading();
        }
    })
})


