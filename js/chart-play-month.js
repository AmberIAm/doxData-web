//初始化图表实例
var monthDur = echarts.init(document.getElementById("month-duration"), "infographic");

//改变窗口大小时，同时改变图表大小
setTimeout(function() {
    window.onresize = function() {
        monthDur.resize();
    }
}, 200);

//初步配置图表通用项
var option = {
    grid: {
        left: "5%",
        top: 90,
        right: "4%",    
        bottom: 70,
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
    xAxis: {
        axisLabel: {
            interval: "0"
        },
        data: []
    },
    yAxis: {}
};

//使用以上配置的图表通用项分别配置图表
monthDur.setOption(option);

//在图表未加载成功时，显示正在加载信息
monthDur.showLoading();

//点播时长按月分析，显示图表
var monthDate = [];
var monthSum = [];
var monthAvg = [];
$.ajax({
    type: "get",
    url: "./json/month-sum.json",
    data: {
        // type: "month",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                monthDate.push(data.data[i].date);
                monthSum.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/month-avg.json",
                data: {
                    // type: "month",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            monthAvg.push(result.data[j].value);
                        }
                        monthDur.hideLoading();
                        monthDur.setOption({
                            title: {
                                text: "用户点播时长按月分析图表"
                            },
                            legend: {
                                data: ["点播时长总量", "点播时长均值"]
                            },
                            xAxis: {
                                axisLabel: {
                                    rotate: "45"
                                },
                                data: monthDate
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
                                    name: "点播时长总量",
                                    type: "bar",
                                    data: monthSum
                                },
                                {
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: "top",
                                            }
                                        }
                                    },
                                    name: "点播时长均值",
                                    type: "bar",
                                    data: monthAvg
                                }
                            ]
                        });
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    monthDur.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        monthDur.hideLoading();
    }
});

//点播时长按月分析，查询并显示图表
$(".pdm-search").click(function(){
    var newMonthDate = [];
    var newMonthSum = [];
    var newMonthAvg = [];
    var startTimePdm = $(".start-time-pdm").val();
    var endTimePdm = $(".end-time-pdm").val();
    $.ajax({
        type: "get",
        url: "./json/month-sum.json",
        data: {
            // type: "month",
            // startTime: 2017/01/01,
            // endTime: 2017/01/25
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                for (var i = 0; i < data.data.length; i++) {
                    newMonthDate.push(data.data[i].date);
                    newMonthSum.push(data.data[i].value);
                }
                $.ajax({
                    type: "get",
                    url: "./json/month-avg.json",
                    data: {
                        // type: "month",
                        // startTime: 2017/01/01,
                        // endTime: 2017/01/25
                    },
                    dataType: "json",
                    success: function(result) {
                        if (result.code == 200) {
                            for (var j = 0; j < result.data.length; j++) {
                                newMonthAvg.push(result.data[j].value);
                            }
                            monthDur.hideLoading();
                            monthDur.setOption({
                                title: {
                                    text: "用户点播时长按月分析图表"
                                },
                                legend: {
                                    data: ["点播时长总量", "点播时长均值"],
                                },
                                xAxis: {
                                    axisLabel: {
                                        rotate: "45"
                                    },
                                    data: newMonthDate
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
                                        name: "点播时长总量",
                                        type: "bar",
                                        data: newMonthSum
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
                                        name: "点播时长均值",
                                        type: "bar",
                                        data: newMonthAvg
                                    }
                                ]
                            });
                        } else {
                            alert(result.message);
                        }
                    },
                    error: function() {
                        alert("图表请求数据失败!");
                        monthDur.hideLoading();
                    }
                })
            } else {
                alert(data.message);
            }
        },
        error: function() {
            alert("图表请求数据失败!");
            monthDur.hideLoading();
        }
    })
});