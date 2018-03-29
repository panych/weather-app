import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../actions'
import {ForecastContainer} from './forecast'
import {Weather} from './weather'
import {Search} from './search'

class App extends Component {

  forecast() {
    const data = this.props.weatherData ? this.props.weatherData.forecast : null
    return (
      <div>
        <h2>Forecast</h2>
        {data ? JSON.stringify(data) : null}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="main">
          {(()=> {
            if (this.props.connection.fetching) {
              return <p>Працюємо...</p>
            } else if (this.props.connection.errors) {
              return <p>Помылка. Щось не так. Спробуйте інший запит (англійська працює краще).<br/> Або не пробуйте.</p>
            } else if (this.props.weatherData && this.props.weatherData.weather) {
              return <Weather weather={this.props.weatherData.weather} />
            } else {
              return <p>Спробуйте щось пошукати →</p>
            }
          })()}

          <Search {...this.props} />
        </div>
        {this.props.connection.errors || this.props.connection.fetching ? '' : <ForecastContainer />}
      </div>
    )
  }
}

export const AppContainer = connect(
  (state)=> { return state },
  (dispatch)=> { return {
    submitQuery: (query)=> {
      dispatch(search(query))
    }
  } }
)(App)
