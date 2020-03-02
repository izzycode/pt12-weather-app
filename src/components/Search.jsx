import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

import Cities from './Cities'


export default class Search extends Component {
  handleSubmit = e => {
    e.preventDefault()
    let query = e.target.query.value
    this.props.history.push(`/cities?q=${query}`)
  }

  render() {
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
              type="search" />
          </Form.Group>
          <Button variant="primary " type="submit">
            Search
          </Button>
        </Form>
        <Route path="/cities" component={Cities} />
      </section>
    )
  }
}
