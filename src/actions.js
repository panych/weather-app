import {getWeatherAndForecast} from './api'

export const NEW_QUERY = 'NEW_QUERY'
export const SET_WEATHER_DATA = 'SET_WEATHER_DATA'

export const search = (query)=> (dispatch, getState)=> {
  const errors = []
  // const
  // getCurrentWeather
  // getForecast
  getWeatherAndForecast(query).then((res)=> {
    console.log(res)
    dispatch({
      type: SET_WEATHER_DATA,
      weather: res.weather,
      forecast: res.forecast,
    })
  }, (err)=> {
    console.log('reject', err)
  })
}

window.s = (q)=> window.store.dispatch(search(q))
