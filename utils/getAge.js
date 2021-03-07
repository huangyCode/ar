import moment from 'moment'

export function getAge(str){
    let birthday =moment(str).format('YYYY-MM-DD');
    let nowDay = moment(new Date().getTime()).format('YYYY-MM-DD');
    let brithdayArr = birthday.split('-');
    let nowDayArr = nowDay.split('-');
    let yearMinus = Number(nowDayArr[0]) -  Number(brithdayArr[0]);
    let monthMinus = Number(nowDayArr[1]) -  Number(brithdayArr[1]);
    let dayMinus = Number(nowDayArr[2]) -  Number(brithdayArr[2]);
    let age;
    if (yearMinus <= 0) {
        if (monthMinus === 0) {// 同月份的
            age = dayMinus + "天";
        } else {
            age = monthMinus + "个月";
        }
    } else {
        if (monthMinus < 0) {// 当前月>生日月
            let moth = (12 - Number(brithdayArr[1]) + Number(nowDayArr[1]));
            if (yearMinus === 1) {
                age = moth + "个月";
            } else {
                age = (yearMinus - 1) + "岁" + moth + "个月";
            }
        } else if (monthMinus == 0) {// 同月份的，再根据日期计算年龄

            if (dayMinus > 0) {
                age = (yearMinus + 1) + "岁";
            } else {
                age = yearMinus + "岁";
            }
        } else  {
            age = (yearMinus + 1) + "岁";
        }
    }
    return age;
}