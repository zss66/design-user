const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const currentDate = now.getDate();
const currentDay = now.getDay(); // 0 表示周日，1 表示周一，以此类推
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

// 生成数据
const content = [
    {
        "timezh": generateDynamicTimeZh(0),
        "id": 1,
        "timelist": generateDynamicTimeList(currentHour, currentMinute)
    },
    {
        "timezh": generateDynamicTimeZh(1),
        "id": 2,
        "timelist": generateStaticTimeList()
    },
    {
        "timezh": generateDynamicTimeZh(2),
        "id": 3,
        "timelist": generateStaticTimeList()
    }
];

// 动态生成时间列表（当天）
function generateDynamicTimeList(startHour, startMinute) {
    const timeList = [];

    // 如果当前时间已经过了今天最早的时间，将立即送达加入列表
    if (startHour > 8 || (startHour === 8 && startMinute >= 45)) {
        timeList.push({ "timestr": "立即送达" });
    }

    // 从当前时间开始，每隔一个小时生成一个时间段，直到晚上8点
    let hour = startHour + 1; // 从下一个小时开始
    while (hour < 20) {
        const timeString = `${padZero(hour)}:00-${padZero(hour + 1)}:00`;
        timeList.push({ "timestr": timeString });
        hour++;
    }

    return timeList;
}

// 动态生成时间描述（明天和后天）
function generateDynamicTimeZh(offset) {
    const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const targetDate = new Date(now.getTime() + (offset * 24 * 60 * 60 * 1000));
    const targetDay = daysOfWeek[targetDate.getDay()];
    const targetMonth = targetDate.getMonth() + 1;
    const targetDateNum = targetDate.getDate();
    return `${targetMonth}月${targetDateNum}日 (${targetDay})`;
}

// 静态生成时间列表（后续两天）
function generateStaticTimeList() {
    const timeList = [];

    // 从早上9点开始，每隔一个小时生成一个时间段，直到晚上8点
    let hour = 9;
    while (hour < 20) {
        const timeString = `${padZero(hour)}:00-${padZero(hour + 1)}:00`;
        timeList.push({ "timestr": timeString });
        hour++;
    }

    return timeList;
}

// 补零函数，用于确保数字两位数格式
function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}

console.log(JSON.stringify(content, null, 2));