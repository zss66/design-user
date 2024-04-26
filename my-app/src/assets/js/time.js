/*
 * @Author: zss zjb520zll@gmail.com
 * @Date: 2024-04-15 16:33:48
 * @LastEditors: zss zjb520zll@gmail.com
 * @LastEditTime: 2024-04-15 16:34:02
 * @FilePath: /desktop-tutorial/my-app/src/assets/js/time.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function getDate(date, AddDayCount = 0) {
    if (!date) {
        date = new Date()
    }
    if (typeof date !== 'object') {
        date = date.replace(/-/g, '/')
    }
    const dd = new Date(date)
    dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
    const y = dd.getFullYear()
    const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
    const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay()
    }
}

