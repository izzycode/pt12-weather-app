import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {ListGroup} from 'react-bootstrap'

export default class Cities extends Component {

  setCity = e => {
    let url = `https://wyn-weather-api.herokuapp.com/cities/${e.target.value}`
    fetch(url)
      .then(res => res.json())
      .then(city => this.props.setCity(city))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section>
        <ListGroup className="mt-3">
          {
            this.props.cities.map(city => {
              return (
                <ListGroup.Item
                  action="action"
                  key={city.id}
                  onClick={this.setCity}
                  value={city.id}
                  variant="light"
                >
                  {city.name}
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
      </section>
    )
  }
}