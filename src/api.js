const apiKey = 'db80476386a4b10065421e2af1fcb7fc'
const apiBase = 'http://api.openweathermap.org/data/2.5/'


export const callApi = (path, params)=> {
  const url = new URL(path, apiBase)
  url.search = '?' + new URLSearchParams(Object.assign({appid: apiKey, lang: 'ua', units: 'metric'}, params)).toString()
  return fetch(url)
}


export const getWeather = (query)=> {
  return callApi('weather', {q: query}).then((res)=> {
    if (res.ok && res.json) {
      return res.json()
    } else {
      return Promise.reject('Error getting weather')
    }
  })
}


export const getForecast = (query)=> {
  return callApi('forecast', {q: query}).then((res)=> {
    if (res.ok && res.json) {
      return res.json()
    } else {
      return Promise.reject('Error getting forecast')
    }
  })
}


export const getWeatherAndForecast = (query)=> {
  return Promise.all([getWeather(query), getForecast(query)]).then((responses)=> {
    return {
      weather: responses[0],
      forecast: responses[1]
    }
  })
}
