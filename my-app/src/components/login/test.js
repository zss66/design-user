// 解析时间格式
const appointmentString = "5月6日 (周五)-11:00-12:00";

// 使用正则表达式提取时间信息
const regex = /(\d{1,2})月(\d{1,2})日.*-(\d{1,2}):(\d{2})/;
const matches = appointmentString.match(regex);

// 如果正则解析成功
if (matches) {
    const month = parseInt(matches[1]);
    const day = parseInt(matches[2]);
    const hour = parseInt(matches[3]);
    const minute = parseInt(matches[4]);

    // 获取当前时间
    const currentTime = new Date();

    // 获取预约时间
    const appointmentTime = new Date(currentTime.getFullYear(), month - 1, day, hour, minute);
    console.log(appointmentTime);
    // 计算时间差
    const timeDiff = appointmentTime.getTime() - currentTime.getTime();

    if (timeDiff > 0) {
        // 将时间差转换为小时和分钟
        console.log(timeDiff);
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        // 输出结果
        console.log(`距离预约时间还有 ${hoursDiff} 小时 ${minutesDiff} 分钟`);
    } else {
        console.log("预约时间已过。");
    }
} else {
    console.log("无法解析预约时间。");
}