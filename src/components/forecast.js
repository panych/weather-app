import React, { Component } from 'react'
import { connect } from 'react-redux'
import { round10, WEEK_DAYS, drawDay, drawTime, parseDate, groupForecasByDay } from '../utils'


export class Forecast extends Component {
  dayRow(days) {
    return (
      <tr>
        <th>День</th>
        {days.map((group, index) => (
          <td colSpan={group.items.length}
            key={index}
            className={index % 2 ? 'col-even' : 'col-odd'}>
            {drawDay(group.date)}
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
              {drawTime(parseDate((item.dt)))}
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
            {(() => {
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

    const days = groupForecasByDay(this.props.data.list)

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
  (state) => ({ data: state.weatherData ? state.weatherData.forecast : null })
)(Forecast)
