//改变窗口大小时，同时改变图表大小
setTimeout(function (){
    window.onresize = function() {
        dayDur.resize();
        weekDur.resize();
        monthDur.resize();
    }
},200)

//初始化图表实例
var dayDur = echarts.init(document.getElementById('day-duration'));
var weekDur = echarts.init(document.getElementById('week-duration'));
var monthDur = echarts.init(document.getElementById('month-duration'));

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
weekDur.setOption(option);
monthDur.setOption(option);

//在图表未加载成功时，显示正在加载信息
dayDur.showLoading();
weekDur.showLoading();
monthDur.showLoading();

//点播时长按日分析，显示图表
var dayDate = [];
var daySum = [];  
var dayAvg = [];
$.ajax({
    type: "get",
    url: "js/day.json",
    data: {
        // type: "day",
        // avg: true,
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(result) {
        if (result.code == 200) {
            for (var i = 0; i < result.data.length; i++) {
                dayDate.push(result.data[i].date);
                daySum.push(result.data[i].sum);
                dayAvg.push(result.data[i].avg);
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
                    type: 'bar',
                    data: dayAvg
                }
                ]
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

//点播时长按日分析，查询并显示图表
$(".play-search-1").click(function(){
    var dayDate2 = [];
    var daySum2 = [];  
    var dayAvg2 = [];
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        type: "get",
        url: "js/day.json",
        data: {
            // type: "day",
            // avg: true,
            // startTime: startTime,
            // endTime: endTime
        },
        dataType: "json",
        success: function(result) {
            if (result.code == 200) {
                // for (var j = 0; j < result.data.length; j++) {
                //     dayDate2.push(result.data[j].date);
                //     daySum2.push(result.data[j].sum);
                //     dayAvg2.push(result.data[j].avg);
                // }
                var n, m;
                for (var j = 0; j < result.data.length; j++) {
                   if (endTime == result.data[j].date) {
                       n = j;
                   }
                   if (startTime == result.data[j].date) {
                       m = j;
                   }
                   while (m < n + 1) {
                       dayDate2.push(result.data[m].date);
                       daySum2.push(result.data[m].sum);
                       dayAvg2.push(result.data[m].avg);
                       m++;
                   }
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
                        data: dayDate2
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
                        data: daySum2
                    },
                    {
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        name: '点播时长均值',
                        type: 'line',
                        data: dayAvg2
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
})

//点播时长按周分析，显示图表
var weekDate = [];
var weekSum = [];  
var weekAvg = [];
$.ajax({
    type: "get",
    url: "js/week.json",
    data: {},
    dataType: "json",
    success: function(result) {
        if (result.code == 200) {
            for (var i = 0; i < result.data.length; i++) {
                weekDate.push(result.data[i].date);
                weekSum.push(result.data[i].sum);
                weekAvg.push(result.data[i].avg);
            }
            weekDur.hideLoading();
            weekDur.setOption({
                title: {
                    text: '用户点播时长按周分析图表'
                },
                legend: {
                    data: ['点播时长总量', '点播时长均值'],
                },
                xAxis: {
                    name: "周",
                    data: weekDate
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
                    type: 'line',
                    data: weekSum
                },
                {
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        }
                    },
                    name: '点播时长均值',
                    type: 'bar',
                    data: weekAvg
                }]
            });
        } else {
            alert(result.message);
        }
    },
    error: function(errorMsg) {
        alert("图表请求数据失败!");
        weekDur.hideLoading();
    }
})

//点播时长按周分析，查询并显示图表
$(".play-search-2").click(function(){
    var weekDate2 = [];
    var weekSum2 = [];  
    var weekAvg2 = [];
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        type: "get",
        url: "js/week.json",
        data: {
            // type: "week",
            // avg: true,
            // startTime: startTime,
            // endTime: endTime
        },
        dataType: "json",
        success: function(result) {
            if (result.code == 200) {
                // for (var j = 0; j < result.data.length; j++) {
                //     weekDate2.push(result.data[j].date);
                //     weekSum2.push(result.data[j].sum);
                //     weekAvg2.push(result.data[j].avg);
                // }
                var n, m;
                for (var j = 0; j < result.data.length; j++) {
                   if (endTime == result.data[j].date) {
                       n = j;
                   }
                   if (startTime == result.data[j].date) {
                       m = j;
                   }
                   while (m < n + 1) {
                       weekDate2.push(result.data[m].date);
                       weekSum2.push(result.data[m].sum);
                       weekAvg2.push(result.data[m].avg);
                       m++;
                   }
                }
                weekDur.hideLoading();
                weekDur.setOption({
                    title: {
                        text: '用户点播时长按周分析图表'
                    },
                    legend: {
                        data: ['点播时长总量', '点播时长均值'],
                    },
                    xAxis: {
                        name: "周",
                        data: weekDate2
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
                        type: 'line',
                        data: weekSum2
                    },
                    {
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        name: '点播时长均值',
                        type: 'bar',
                        data: weekAvg2
                    }]
                });
            } else {
                alert(result.message);
            }   
        },
        error: function(errorMsg) {
            alert("图表请求数据失败!");
            weekDur.hideLoading();
        }
    })
})

//点播时长按月分析，显示图表
var monthDate = [];
var monthSum = [];  
var monthAvg = [];
$.ajax({
    type: "get",
    url: "js/month.json",
    data: {},
    dataType: "json",
    success: function(result) {
        if (result.code == 200) {
            for (var i = 0; i < result.data.length; i++) {
                monthDate.push(result.data[i].date);
                monthSum.push(result.data[i].sum);
                monthAvg.push(result.data[i].avg);
            }
            monthDur.hideLoading();
            monthDur.setOption({
                title: {
                    text: '用户点播时长按月分析图表'
                },
                legend: {
                    data: ['点播时长总量', '点播时长均值'],
                },
                xAxis: {
                    axisLabel: {
                        rotate: '45'
                    },
                    name: "月",
                    data: monthDate
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
                    type: 'line',
                    data: monthSum
                },
                {
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        }
                    },
                    name: '点播时长均值',
                    type: 'bar',
                    data: monthAvg
                }]
            });
        } else {
            alert(result.message);
        }
    },
    error: function(errorMsg) {
        alert("图表请求数据失败!");
        monthDur.hideLoading();
    }
})

//点播时长按月分析，查询并显示图表
$(".play-search-3").click(function(){
    var monthDate2 = [];
    var monthSum2 = [];  
    var monthAvg2 = [];
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        type: "get",
        url: "js/month.json",
        data: {
            // type: "month",
            // avg: true,
            // startTime: startTime,
            // endTime: endTime
        },
        dataType: "json",
        success: function(result) {
            if (result.code == 200) {
                // for (var j = 0; j < result.data.length; j++) {
                //     monthDate2.push(result.data[j].date);
                //     monthSum2.push(result.data[j].sum);
                //     monthAvg2.push(result.data[j].avg);
                // }
                var n, m;
                for (var j = 0; j < result.data.length; j++) {
                   if (endTime == result.data[j].date) {
                       n = j;
                   }
                   if (startTime == result.data[j].date) {
                       m = j;
                   }
                   while (m < n + 1) {
                       monthDate2.push(result.data[m].date);
                       monthSum2.push(result.data[m].sum);
                       monthAvg2.push(result.data[m].avg);
                       m++;
                   }
                }
                monthDur.hideLoading();
                monthDur.setOption({
                    title: {
                        text: '用户点播时长按月分析图表'
                    },
                    legend: {
                        data: ['点播时长总量', '点播时长均值'],
                    },
                    xAxis: {
                        axisLabel: {
                            rotate: '45'
                        },
                        name: "月",
                        data: monthDate2
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
                        type: 'line',
                        data: monthSum2
                    },
                    {
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        name: '点播时长均值',
                        type: 'bar',
                        data: monthAvg2
                    }]
                });
            } else {
                alert(result.message);
            }   
        },
        error: function(errorMsg) {
            alert("图表请求数据失败!");
            monthDur.hideLoading();
        }
    })
})