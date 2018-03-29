import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../actions'
import {ForecastContainer} from './forecast'

class App extends Component {
  onSubmit(e) {
    e.preventDefault()
    const query = e.target.elements.query.value
    this.props.submitQuery(query)
  }

  history() {
    return (
      <ul>
        {this.props.queries.map((q, index)=> <li>{q.query} ({q.date})</li>)}
      </ul>
    )
  }

  weather() {
    const data = this.props.weatherData ? this.props.weatherData.weather : null
    return (
      <div>
        <h2>Weather</h2>
        {data ? JSON.stringify(data) : null}
      </div>
    )
  }

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
        <h1>Hello world</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" name="query" placeholder="City name" />
          <input type="submit" value="submit" />
        </form>
        {this.history()}
        {this.weather()}
        <ForecastContainer />
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
