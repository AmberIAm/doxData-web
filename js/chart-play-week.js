//初始化图表实例
var weekDur = echarts.init(document.getElementById('week-duration'), 'infographic');

//改变窗口大小时，同时改变图表大小
setTimeout(function (){
    window.onresize = function() {
        weekDur.resize();
    }
},200)

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
weekDur.setOption(option);

//在图表未加载成功时，显示正在加载信息
weekDur.showLoading();

//点播时长按周分析，显示图表
var weekDate = [];
var weekSum = [];  
var weekAvg = [];
$.ajax({
    type: "get",
    url: "./json/week-sum.json",
    data: {
        // type: "week",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                weekDate.push(data.data[i].date);
                weekSum.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/week-avg.json",
                data: {
                    // type: "week",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            weekAvg.push(result.data[j].value);
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
                                name: '周',
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
                                type: 'bar',
                                data: weekSum
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
                                data: weekAvg
                            }]
                        });
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    weekDur.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        weekDur.hideLoading();
    }
})

//点播时长按周分析，查询并显示图表
$(".play-search-2").click(function(){
    var newWeekDate = [];
    var newWeekSum = [];  
    var newWeekAvg = [];
    var startTime = $("#startTime-pw").val();
    var endTime = $("#endTime-pw").val();
    $.ajax({
        type: "get",
        url: "./json/week-sum.json",
        data: {
            // type: "week",
            // startTime: 2017/01/01,
            // endTime: 2017/01/25
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                for (var i = 0; i < data.data.length; i++) {
                    newWeekDate.push(data.data[i].date);
                    newWeekSum.push(data.data[i].value);
                }
                $.ajax({
                    type: "get",
                    url: "./json/week-avg.json",
                    data: {
                        // type: "week",
                        // startTime: 2017/01/01,
                        // endTime: 2017/01/25
                    },
                    dataType: "json",
                    success: function(result) {
                        if (result.code == 200) {
                            for (var j = 0; j < result.data.length; j++) {
                                newWeekAvg.push(result.data[j].value);
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
                                    name: '周',
                                    data: newWeekDate
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
                                    data: newWeekSum
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
                                    data: newWeekAvg
                                }]
                            });
                        } else {
                            alert(result.message);
                        }
                    },
                    error: function() {
                        alert("图表请求数据失败!");
                        weekDur.hideLoading();
                    }
                })
            } else {
                alert(data.message);
            }
        },
        error: function() {
            alert("图表请求数据失败!");
            weekDur.hideLoading();
        }
    })
})