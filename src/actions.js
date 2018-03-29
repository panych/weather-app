import {getWeatherAndForecast} from './api'

export const NEW_QUERY = 'NEW_QUERY'
export const SET_WEATHER_DATA = 'SET_WEATHER_DATA'
export const SET_CONNECTION = 'SET_CONNECTION'

export const search = (query)=> (dispatch, getState)=> {
  if (getState().queries[0] === query)
    return

  const date = new Date().toJSON()
  dispatch({type: SET_CONNECTION, data: {fetching: date}})

  getWeatherAndForecast(query).then((res)=> {
    if (getState().connection.fetching !== date) {
      return
    }

    dispatch({
      type: SET_WEATHER_DATA,
      weather: res.weather,
      forecast: res.forecast,
    })

    dispatch({
      type: NEW_QUERY,
      data: query
    })

    dispatch({
      type: SET_CONNECTION,
      data: {fetching: null}
    })
  }, (err)=> {
    if (getState().connection.fetching !== date) {
      return
    }

    dispatch({
      type: SET_CONNECTION,
      data: {
        fetching: null,
        errors: err
      }
    })
  })
}
