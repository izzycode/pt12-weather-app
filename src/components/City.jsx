import React, { Component, Fragment } from 'react'
import { Row, Col, Card, Image } from 'react-bootstrap'

export default class City extends Component {
  state = {
    name: '',
    forecasts: []
  }

  componentDidMount() {
    let url = `https://wyn-weather-api.herokuapp.com/cities/${this.props.match.params.cityId}`
    fetch(url)
      .then(res => res.json())
      .then(({ name, forecasts }) => {
        this.setState({ name, forecasts })
      })
      .catch(err => console.log(err))
  }

  render() {
    let city = this.state
    return (
      <Fragment>
        <h1 className="text-center mt-3" >
          Weather for {city.name}
        </h1>
        <Row>
          {
            this.state.forecasts.map(day => {
              let date = new Date(day['date'])
              let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
              return (
                <Col xs md={6} lg={4} key={date}>
                  <Card className="mt-3 text-center">
                    <Card.Header>
                      <Card.Title className="m-0">
                        {weekdays[date.getDay()]}
                      </Card.Title>
                      <small>{date.toLocaleDateString('en-US')}</small>
                    </Card.Header>
                    <Image src={day['image']} style={{ maxWidth: '100px', display: 'block', margin: 'auto' }} />
                    <Card.Body className="p-2">
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>
                          <label className="m-0 text-secondary">Weather</label>
                          <div>
                            {day['weather']}
                          </div>
                        </li>
                        <li>
                          <label className="m-0 text-secondary">Max Temperature</label>
                          <div>
                            {parseInt(Number(day['max_temp']))} °C
                          </div>
                        </li>
                        <li>
                          <label className="m-0 text-secondary">Min Temperature</label>
                          {parseInt(Number(day['min_temp']))}
                          °C
                        </li>
                        <li>
                          <label className="m-0 text-secondary">Humidity</label>
                          <div>
                            {parseInt(Number(day['humidity']))} %
                          </div>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </Fragment>
    )
  }
}