//改变窗口大小时，同时改变图表大小
setTimeout(function (){
    window.onresize = function() {
        userType.resize();
    }
},200)

//初始化图表实例
var userType = echarts.init(document.getElementById('user-type'));

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

//使用以上配置的图表通用项配置图表
userType.setOption(option);

//在图表未加载成功时，显示正在加载信息
userType.showLoading();

//用户类型分析
var userDate = [];
var userSum = [];  
var userAvg = [];
$.ajax({
    type: "get",
    url: "js/month.json",
    data: {
        // type: "user",
        // avg: true,
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(result) {
        if (result.code == 200) {
            for (var i = 0; i < result.data.length; i++) {
                userDate.push(result.data[i].date);
                userSum.push(result.data[i].sum);
                userAvg.push(result.data[i].avg);
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
                    data: userSum
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
                    data: userAvg
                }
                ]
            });
        } else {
            alert(result.message);
        }
    },
    error: function(errorMsg) {
        alert("图表请求数据失败!");
        userType.hideLoading();
    }
})