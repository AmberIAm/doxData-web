//初始化图表实例
var homeContent = echarts.init(document.getElementById('home-content'), 'infographic');

//改变窗口大小时，同时改变图表大小
setTimeout(function (){
    window.onresize = function() {
        homeContent.resize();
    }
},200)

//在图表未加载成功时，显示正在加载信息
homeContent.showLoading();

//定义每一组数据日期存放的数组
var userDate01 = [];
var userDate02 = [];
var userDate03 = [];
var userDate04 = [];
var userDate05 = [];
var userDate06 = [];
var userDate07 = [];
var userDate08 = [];
var userDate09 = [];
var userDate10 = [];
var userDate11 = [];
var userDate12 = [];

//定义每一组数据热心用户数据存放的数组
var actValue01 = []; 
var actValue02 = []; 
var actValue03 = []; 
var actValue04 = []; 
var actValue05 = []; 
var actValue06 = []; 
var actValue07 = []; 
var actValue08 = []; 
var actValue09 = []; 
var actValue10 = []; 
var actValue11 = []; 
var actValue12 = []; 

//定义每一组数据一般用户数据存放的数组
var noActValue01 = []; 
var noActValue02 = []; 
var noActValue03 = []; 
var noActValue04 = []; 
var noActValue05 = []; 
var noActValue06 = []; 
var noActValue07 = []; 
var noActValue08 = []; 
var noActValue09 = []; 
var noActValue10 = []; 
var noActValue11 = []; 
var noActValue12 = []; 

//获取第 1 组数据（2017-01）
$.ajax({
    type: "get",
    url: "./json/active-user-01.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate01.push(data.data[i].date);
                actValue01.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-01.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue01.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 2 组数据（2017-02）
$.ajax({
    type: "get",
    url: "./json/active-user-02.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate02.push(data.data[i].date);
                actValue02.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-02.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue02.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 3 组数据（2017-03）
$.ajax({
    type: "get",
    url: "./json/active-user-03.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate03.push(data.data[i].date);
                actValue03.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-03.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue03.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 4 组数据（2017-04）
$.ajax({
    type: "get",
    url: "./json/active-user-04.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate04.push(data.data[i].date);
                actValue04.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-04.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue04.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 5 组数据（2017-05）
$.ajax({
    type: "get",
    url: "./json/active-user-05.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate05.push(data.data[i].date);
                actValue05.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-05.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue05.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 6 组数据（2017-06）
$.ajax({
    type: "get",
    url: "./json/active-user-06.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate06.push(data.data[i].date);
                actValue06.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-06.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue06.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 7 组数据（2017-07）
$.ajax({
    type: "get",
    url: "./json/active-user-07.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate07.push(data.data[i].date);
                actValue07.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-07.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue07.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 8 组数据（2017-08）
$.ajax({
    type: "get",
    url: "./json/active-user-08.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate08.push(data.data[i].date);
                actValue08.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-08.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue08.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 9 组数据（2017-09）
$.ajax({
    type: "get",
    url: "./json/active-user-09.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate09.push(data.data[i].date);
                actValue09.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-09.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue09.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 10 组数据（2017-10）
$.ajax({
    type: "get",
    url: "./json/active-user-10.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate10.push(data.data[i].date);
                actValue10.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-10.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue10.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 11 组数据（2017-11）
$.ajax({
    type: "get",
    url: "./json/active-user-11.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate11.push(data.data[i].date);
                actValue11.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-11.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue11.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//获取第 12 组数据（2017-12）
$.ajax({
    type: "get",
    url: "./json/active-user-12.json",
    data: {
        // type: "day",
        // startTime: 2017/01/01,
        // endTime: 2017/01/25
    },
    dataType: "json",
    success: function(data) {
        if (data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                userDate12.push(data.data[i].date);
                actValue12.push(data.data[i].value);
            }
            $.ajax({
                type: "get",
                url: "./json/noActive-user-12.json",
                data: {
                    // type: "day",
                    // startTime: 2017/01/01,
                    // endTime: 2017/01/25
                },
                dataType: "json",
                success: function(result) {
                    if (result.code == 200) {
                        for (var j = 0; j < result.data.length; j++) {
                            noActValue12.push(result.data[j].value);
                        }
                        homeContent.hideLoading();
                        homeContent.setOption(option);
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("图表请求数据失败!");
                    homeContent.hideLoading();
                }
            })
        } else {
            alert(data.message);
        }
    },
    error: function() {
        alert("图表请求数据失败!");
        homeContent.hideLoading();
    }
})

//配置图表
option = {
    baseOption: {
        timeline: {
            axisType: 'category',
            orient: 'vertical',
            autoPlay: true,
            inverse: true,
            playInterval: 1500,
            left: null,
            right: 20,
            top: 20,
            bottom: 20,
            width: 75,
            height: null,
            label: {
               normal: {
                   textStyle: {
                       color: '#000'
                   }
               },
               emphasis: {
                   textStyle: {
                       color: '#fff'
                   }
               }
            },
            symbol: 'diamond',
            lineStyle: {
               color: '#000'
            },
            checkpointStyle: {
               symbol: 'diamond',
               color: '#ff9900',
               borderColor: '#fff',
               borderWidth: 1
            },
            controlStyle: {
               showNextBtn: false,
               showPrevBtn: false,
               normal: {
                   color: '#000',
                   borderColor: '#000'
               },
               emphasis: {
                   color: '#000',
                   borderColor: '#000'
               }
            },
            data: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12']
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b} : {c} (万户)"
        },
        xAxis: {
            nameLocation: 'middle',
            data: userDate02,
            axisLabel: {
                rotate: '45',
                interval: '0',
            }
        },
        yAxis: {
            name: '（万户）',
            axisLabel: {
                interval: '0',
            }
        },
        series: [
            {
                type: 'scatter',
                symbolSize: '20',
            },
            {
                type: 'scatter',
                symbolSize: '35',
            }
        ],
    },
    options: [
        {
            title: {
                text: '2017年01月用户类型分析散点图'
            },
            series: [
                {data: actValue01},
                {data: noActValue01},
            ]
        },
        {
            title: {
                text: '2017年02月用户类型分析散点图'
            },
            series: [
                {data: actValue02},
                {data: noActValue02},
            ]
        },
        {
            title: {
                text: '2017年03月用户类型分析散点图'
            },
            series: [
                {data: actValue03},
                {data: noActValue03},
            ]
        },
        {
            title: {
                text: '2017年04月用户类型分析散点图'
            },
            series: [
                {data: actValue04},
                {data: noActValue04},
            ]
        },
        {
            title: {
                text: '2017年05月用户类型分析散点图'
            },
            series: [
                {data: actValue05},
                {data: noActValue05},
            ]
        },
        {
            title: {
                text: '2017年06月用户类型分析散点图'
            },
            series: [
                {data: actValue06},
                {data: noActValue06},
            ]
        },
        {
            title: {
                text: '2017年07月用户类型分析散点图'
            },
            series: [
                {data: actValue07},
                {data: noActValue07},
            ]
        },
        {
            title: {
                text: '2017年08月用户类型分析散点图'
            },
            series: [
                {data: actValue08},
                {data: noActValue08},
            ]
        },
        {
            title: {
                text: '2017年09月用户类型分析散点图'
            },
            series: [
                {data: actValue09},
                {data: noActValue09},
            ]
        },
        {
            title: {
                text: '2017年10月用户类型分析散点图'
            },
            series: [
                {data: actValue10},
                {data: noActValue10},
            ]
        },
        {
            title: {
                text: '2017年11月用户类型分析散点图'
            },
            series: [
                {data: actValue11},
                {data: noActValue11},
            ]
        },
        {
            title: {
                text: '2017年12月用户类型分析散点图'
            },
            series: [
                {data: actValue12},
                {data: noActValue12},
            ]
        }            
    ]
}
homeContent.setOption(option);







