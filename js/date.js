$(function(){
    //判断结束日期须大于开始日期
    function compareDate(d1, d2) {
        if(Date.parse(d1.replace(/-/g, "/")) > Date.parse(d2.replace(/-/g, "/"))) {
            alert("出错啦！结束日期应大于开始日期！");
        }
    }
    //用户类型时间查询
    function utCheckDate(){
        var startTimeUt = $(".start-time-ut").val();
        var endTimeUt = $(".end-time-ut").val();
        compareDate(startTimeUt, endTimeUt);
    }
    //点播时长按日查询
    function pddCheckDate(){
        var startTimePdd = $(".start-time-pdd").val();
        var endTimePdd = $(".end-time-pdd").val();
        compareDate(startTimePdd, endTimePdd);
    }
    //点播时长按月查询
    function pdmCheckDate(){
        var startTimePdm = $(".start-time-pdm").val();
        var endTimePdm = $(".end-time-pdm").val();
        compareDate(startTimePdm, endTimePdm);
    }
    //点击触发
    $(".ut-search").click(utCheckDate);
    $(".pdd-search").click(pddCheckDate);
    $(".pdm-search").click(pdmCheckDate);
});

//日历通用设置
$.fn.datetimepicker.dates["zh-CN"] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    today: "今天",
    suffix: [],
    meridiem: ["上午", "下午"]
};
$(".start-time-ut").datetimepicker({
    format: "yyyy-mm-dd",
    startDate: "2015-01-01",
    startView: "2",
    minView: "2",
    language: "zh-CN"
});
$(".end-time-ut").datetimepicker({
    format: "yyyy-mm-dd",
    startDate: "2015-05-01",
    startView: "2",
    minView: "2",
    todayBtn: true,
    language: "zh-CN"
});
$(".start-time-pdd").datetimepicker({
    format: "yyyy-mm-dd",
    startDate: "2015-05-01",
    startView: "2",
    minView: "2",
    language: "zh-CN"
});
$(".end-time-pdd").datetimepicker({
    format: "yyyy-mm-dd",
    startDate: "2015-05-01",
    startView: "2",
    minView: "2",
    todayBtn: true,
    language: "zh-CN"
});
$(".start-time-pdm").datetimepicker({
    format: "yyyy",
    startDate: "2015",
    startView: "4",
    minView: "4",
    language: "zh-CN"
});
$(".end-time-pdm").datetimepicker({
    format: "yyyy",
    startDate: "2015",
    startView: "4",
    minView: "4",
    todayBtn: true,
    language: "zh-CN"
});