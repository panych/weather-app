import React, {Component} from 'react'

export class Search extends Component {
  onSubmit(e) {
    e.preventDefault()
    const query = e.target.elements.query.value
    this.props.submitQuery(query)
  }

  onLinkClick(e) {
    e.preventDefault()
    const query = e.target.innerText
    console.log(query);
    this.props.submitQuery(query)
  }

  history(queries) {
    return (
      <div className="history">
        {queries.slice(0, 10).map((q, index)=> (
          [<a href="#" onClick={this.onLinkClick.bind(this)}>{q}</a>, ' '] // hacky way to add whitespace between tags
        ))}
      </div>
    )
  }

  render() {
    return <div className="search-panel">
      <form onSubmit={this.onSubmit.bind(this)} className="form-inline">
        <input type="text" name="query" placeholder="Місто (наприклад Odessa)" className="form-control" />
        <input type="submit" value="Шукати" className="btn btn-primary" />
      </form>
      {this.history(this.props.queries)}
    </div>
  }
}
