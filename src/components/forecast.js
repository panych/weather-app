import React, {Component} from 'react'
import {connect} from 'react-redux'
import {round10, WEEK_DAYS} from '../utils'

const parseDate = (timestamp)=> new Date(timestamp*1000)

const drawDay = (d)=> {
  const month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()
  const date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
  const day = WEEK_DAYS[d.getDay()]
  return `${day} (${date}.${month})`
}

const drawTime = (d)=> {
  let h = d.getHours()
  h = h < 10 ? '0' + h : h
  let m = d.getMinutes()
  m = m < 10 ? '0' + m : m
  return `${h}:${m}`
}


const groupByDay = (weatherList)=> {
  const listDates = weatherList.map((item)=> item.dt_txt.split(' ')[0])
  const result = []

  listDates.forEach((d, index)=> {
    const group = result.find((el)=> el.dateText === d)
    if (group) {
      group.items.push(weatherList[index])
    } else {
      result.push({
        date: new Date(d),
        dateText: d,
        items: [weatherList[index]]
      })
    }
  })

  return result
}


class Forecast extends Component {
  dayRow(days) {
    return (
      <tr>
        <th>День</th>
        {days.map((item, index) => (
          <td colSpan={item.items.length}
            key={index}
            className={index % 2 ? 'col-even' : 'col-odd'}>
            {drawDay(item.date)}
          </td>
        ))}
      </tr>
    )
  }

  timeRow(days) {
    return (
      <tr>
        <th>Місцевий час</th>
        {days.map((group, index) => {
          return group.items.map((item, itemIndex) => (
            <td className={index % 2 ? 'col-even' : 'col-odd'}
              key={`${index}-${itemIndex}`}>
              {drawTime(new Date(item['dt_txt']))}
            </td>
          ))
        })}
      </tr>
    )
  }

  descriptionRow(days) {
    return (
      <tr>
        <th>Погодні явища</th>
        {days.map((group, index) => {
          return group.items.map((item, itemIndex) => (
            <td className={index % 2 ? 'col-even' : 'col-odd'}
              key={`${index}-${itemIndex}`}>
              <small>{item['weather'][0]['description']}</small>
            </td>
          ))
        })}
      </tr>
    )
  }

  tempRow(days) {
    return <tr>
      <th>Температура, ℃</th>
      {days.map((group, index) => {
        return group.items.map((item, itemIndex) => (
          <td className={index % 2 ? 'col-even' : 'col-odd'}
            key={`${index}-${itemIndex}`}>
            {(()=> {
              const t = round10(item.main.temp);
              return t > 0 ? `+${t}` : t
            })()}
          </td>
        ))
      })}
    </tr>
  }

  cloudnessRow(days) {
    return <tr>
      <th>Хмарність, %</th>
      {days.map((group, index) => {
        return group.items.map((item, itemIndex) => (
          <td className={index % 2 ? 'col-even' : 'col-odd'}
            key={`${index}-${itemIndex}`}>
            {item.clouds.all}
          </td>
        ))
      })}
    </tr>
  }

  pressureRow(days) {
    return <tr>
      <th>Тиск</th>
      {days.map((group, index) => {
        return group.items.map((item, itemIndex) => (
          <td className={index % 2 ? 'col-even' : 'col-odd'}
            key={`${index}-${itemIndex}`}>
            {item.main.pressure}
          </td>
        ))
      })}
    </tr>
  }

  humidityRow(days) {
    return <tr>
      <th>Вологість, %</th>
      {days.map((group, index) => {
        return group.items.map((item, itemIndex) => (
          <td className={index % 2 ? 'col-even' : 'col-odd'}
            key={`${index}-${itemIndex}`}>
            {item.main.humidity}
          </td>
        ))
      })}
    </tr>
  }

  render() {
    if (!this.props.data) {
      return null
    }

    const list = this.props.data.list
    const days = groupByDay(list)

    return (
      <div className="forecast">
      <table className="table forecast-table table-bordered">
        <tbody>
          {this.dayRow(days)}
          {this.timeRow(days)}
          {this.descriptionRow(days)}
          {this.cloudnessRow(days)}
          {this.tempRow(days)}
          {this.humidityRow(days)}
        </tbody>
      </table>
      </div>
    )
  }
}


export const ForecastContainer = connect(
  (state)=> ({data: state.weatherData ? state.weatherData.forecast : null})
)(Forecast)
