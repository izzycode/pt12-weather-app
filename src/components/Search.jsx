import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'

import Cities from './Cities'


export default class Search extends Component {

  state = {
    cities: [],
  }

  handleSubmit = e => {
    e.preventDefault()
    let url = `https://wyn-weather-api.herokuapp.com/cities?query=${e.target.searchTerm.value.trim()}`
    fetch(url)
      .then(res => res.json())
      .then(cities => {
        this.setState({ cities })
      })
      .catch(err => console.log(err))
  }

  render() {
    let {cities} = this.state
    return (
      <section className="mt-3">
        <h1 className="text-center mt-3">
          City Weather Search
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              aria-label="City name"
              name="searchTerm"
              placeholder="e.g.: Miami"
              type="search" />
          </Form.Group>
          <Button variant="primary " type="submit">
            Search
          </Button>
        </Form>
        {
          cities.length ? <Cities cities={cities} setCity={this.props.setCity}/> : null
        }
      </section>
    )
  }
}
