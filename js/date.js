$.fn.datetimepicker.dates['zh-CN'] = {
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  today: "今天",
  suffix: [],
  meridiem: ["上午", "下午"],
};

$('#startTime-ut').datetimepicker({
  format: 'yyyy-mm-dd',
  startDate: '2015-01-01',
  startView: '2',
  minView: '2',
  language: 'zh-CN'
});

$('#endTime-ut').datetimepicker({
  format: 'yyyy-mm-dd',
  startDate: '2015-05-01',
  startView: '2',
  minView: '2',
  todayBtn: true,
  language: 'zh-CN'
});

$('#startTime-pd').datetimepicker({
  format: 'yyyy-mm-dd',
  startDate: '2015-05-01',
  startView: '2',
  minView: '2',
  language: 'zh-CN'
});

$('#endTime-pd').datetimepicker({
  format: 'yyyy-mm-dd',
  startDate: '2015-05-01',
  startView: '2',
  minView: '2',
  todayBtn: true,
  language: 'zh-CN'
});

$('#startTime-pw').datetimepicker({
  format: 'yyyy-mm',
  startDate: '2015-05-01',
  startView: '3',
  minView: '3',
  language: 'zh-CN'
});

$('#endTime-pw').datetimepicker({
  format: 'yyyy-mm',
  startDate: '2015-05-01',
  startView: '3',
  minView: '3',
  language: 'zh-CN'
});

$('#startTime-pm').datetimepicker({
  format: 'yyyy',
  startDate: '2015-05-01',
  startView: '4',
  minView: '4',
  language: 'zh-CN'
});

$('#endTime-pm').datetimepicker({
  format: 'yyyy',
  startDate: '2015-05-01',
  startView: '4',
  minView: '4',
  language: 'zh-CN'
});
