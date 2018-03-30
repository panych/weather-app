// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

export const round10 = (value, exp)=> decimalAdjust('round', value, exp)


export const WEEK_DAYS = 'Неділя,Понеділок,Вівторок,Середа,Четвер,П’ятниця,Субота'.split(',')


export const parseDate = (timestamp) => new Date(timestamp * 1000)

export const drawDay = (d) => {
  const month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()
  const date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
  const day = WEEK_DAYS[d.getDay()]
  return `${day} (${date}.${month})`
}

export const drawTime = (d) => {
  let h = d.getHours()
  h = h < 10 ? `0${h}` : h
  let m = d.getMinutes()
  m = m < 10 ? '0' + m : m
  return `${h}:${m}`
}


export const groupForecasByDay = (forecastList) => {
  const listDates = forecastList.map((item) => item.dt_txt.split(' ')[0])
  const result = []

  listDates.forEach((d, index) => {
    const group = result.find((el) => el.dateText === d)
    if (group) {
      group.items.push(forecastList[index])
    } else {
      result.push({
        date: new Date(d),
        dateText: d,
        items: [forecastList[index]]
      })
    }
  })

  return result
}
