import React from 'react'
import { round10 } from '../utils'

const list = (data) => {
  return <ul className="list-unstyled">
    <li>{data.weather[0].description}</li>
    <li>Хмарність {data.clouds.all}%</li>
    <li>{(() => {
      let t = round10(data.main.temp)
      return t > 0 ? `+${t} ℃` : `${t} ℃`
    })()}</li>
    <li>Вологість {data.main.humidity}%</li>
  </ul>
}


export const Weather = (props) => {
  const data = props.weather

  return <div className="weather">
    <h1>{data.name}</h1>
    Зараз тут:
    {list(data)}
  </div>
}
