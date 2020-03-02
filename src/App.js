import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {Container, Row, Col, Image, Form, Button, ListGroup, CardDeck, Card} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path='/city/:cityId' component={City}/>
          <Route path='/' component={Search}/>
        </Switch>
      </Container>
    </Router>
  )
}

class Search extends Component{
  handleSubmit = e => {
    e.preventDefault()
    let query = e.target.query.value
    this.props.history.push(`/cities?q=${query}`)
  }

  render(){
    return (
      <section className="mt-3">
        <h1 className="text-center mt-3">
          City Weather Search
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              aria-label="City name"
              name="query"
              placeholder="e.g.: Miami"
              type="search"/>
          </Form.Group>
          <Button variant="primary " type="submit">
            Search
          </Button>
        </Form>
        <Route path="/cities" component={Cities}/>
      </section>
    )
  }
}

class Cities extends Component {
  state = {
    cities: []
  }
  searchCities = () => {
    let {search} = this.props.location
    if (search.includes('q=')) {
      let query = search.split('q=')[1]
      let url = `https://wyn-weather-api.herokuapp.com/cities?query=${query}`
      fetch(url)
        .then(res => res.json())
        .then(cities => {
          this.setState({cities})
        })
        .catch(err => console.log(err))
    }
  }
  componentDidMount() {
    this.searchCities()
  }
  componentDidUpdate(prevProps, _prevState, _snapshot) {
    let {search} = this.props.location
    if (search !== prevProps.location.search) {
      this.searchCities()
    }
  }
 render(){
   return(
      <section>
        <ListGroup className="mt-3">
          {
            this.state.cities.map(city => {
              return(
                <Link to={`/city/${city.id}`} key={city.id}>
                  <ListGroup.Item variant="light" action>
                    {city.name}
                  </ListGroup.Item>
                </Link>
              )
            })
          }

        </ListGroup>
      </section>
   )
 }
}

class City extends Component {
  state = {
    name: '',
    forecasts: []
  }

  componentDidMount() {
    let url = `https://wyn-weather-api.herokuapp.com/cities/${this.props.match.params.cityId}`
    fetch(url)
      .then(res => res.json())
      .then(({name, forecasts}) => {
        this.setState({name, forecasts})
      })
      .catch(err => console.log(err))
  }

  render (){
    let city = this.state
    return (
      <Fragment>
        <h1 className = "text-center mt-3" >
          Weather for {city.name}
        </h1>
        <Row>
          {
            this.state.forecasts.map( day => {
              let date = new Date(day['date'])
              let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
              return(
                <Col xs md={6} lg={4} key={date}>
                  <Card className="mt-3 text-center">
                    <Card.Header>
                      <Card.Title className="m-0">
                        {weekdays[date.getDay()]}
                      </Card.Title>
                      <small>{date.toLocaleDateString('en-US')}</small>
                    </Card.Header>
                    <Image src={day['image']} style={{maxWidth: '100px', display: 'block', margin: 'auto'}}/>
                    <Card.Body className="p-2">
                      <ul style={{listStyle: 'none', padding: 0}}>
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

export default App
