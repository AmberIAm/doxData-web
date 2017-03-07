//改变窗口大小时，同时改变图表大小
setTimeout(function (){
    window.onresize = function() {
        dayDur.resize();
    }
},200)

//初始化图表实例
var dayDur = echarts.init(document.getElementById('day-duration'), 'infographic');

//初步配置图表通用项
var option = {
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

//使用以上配置的图表通用项分别配置图表
dayDur.setOption(option);

//在图表未加载成功时，显示正在加载信息
dayDur.showLoading();

//点播时长按日分析，显示图表
var dayDate = [];
var daySum = [];  
var dayAvg = [];
$.ajax({
    type: "get",
    url: "./json/day-sum.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                dayDate.push(data.data[i].date);
                daySum.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/day-avg.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            dayAvg.push(result.data[j].value);
                        }
                        dayDur.hideLoading();
                        dayDur.setOption({
                            title: {
                                text: '用户点播时长按日分析图表'
                            },
                            legend: {
                                data: ['点播时长总量', '点播时长均值'],
                            },
                            xAxis: {
                                axisLabel: {
                                    rotate: '45'
                                },
                                data: dayDate
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
                                name: '点播时长总量',
                                type: 'bar',
                                data: daySum
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
                                name: '点播时长均值',
                                type: 'line',
                                data: dayAvg
                            }]
                        });
                    } else {
                        alert(result.message);
                    }
                },
                error: function(errorMsg) {
                    alert("图表请求数据失败!");
                    dayDur.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function(errorMsg) {
        alert("图表请求数据失败!");
        dayDur.hideLoading();
    }
})

//点播时长按日分析，查询并显示图表
$(".play-search-1").click(function(){
    var newDayDate = [];
    var newDaySum = [];  
    var newDayAvg = [];
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        type: "get",
        url: "./json/day-sum.json",
        data: {
            // type: "day",
            // startTime: 2017/01/01,
            // endTime: 2017/01/25
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                for (var i = 0; i < data.data.length; i++) {
                    newDayDate.push(data.data[i].date);
                    newDaySum.push(data.data[i].value);

                }
                $.ajax({
                    type: "get",
                    url: "./json/day-avg.json",
                    data: {
                        // type: "day",
                        // startTime: 2017/01/01,
                        // endTime: 2017/01/25
                    },
                    dataType: "json",
                    success: function(result) {
                        if (result.code == 200) {
                            for (var j = 0; j < result.data.length; j++) {
                                newDayAvg.push(result.data[j].value);
                            }
                            dayDur.hideLoading();
                            dayDur.setOption({
                                title: {
                                    text: '用户点播时长按日分析图表'
                                },
                                legend: {
                                    data: ['点播时长总量', '点播时长均值'],
                                },
                                xAxis: {
                                    axisLabel: {
                                        rotate: '45'
                                    },
                                    data: newDayDate
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
                                    name: '点播时长总量',
                                    type: 'bar',
                                    data: newDaySum
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
                                    name: '点播时长均值',
                                    type: 'line',
                                    data: newDayAvg
                                }]
                            });
                        } else {
                            alert(result.message);
                        }
                    },
                    error: function(errorMsg) {
                        alert("图表请求数据失败!");
                        dayDur.hideLoading();
                    }
                })
            } else {
                alert(data.message);
            }
        },
        error: function(errorMsg) {
            alert("图表请求数据失败!");
            dayDur.hideLoading();
        }
    })
})