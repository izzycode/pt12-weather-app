import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {ListGroup} from 'react-bootstrap'

export default class Cities extends Component {
  state = {
    cities: []
  }
  searchCities = () => {
    let { search } = this.props.location
    if (search.includes('q=')) {
      let query = search.split('q=')[1]
      let url = `https://wyn-weather-api.herokuapp.com/cities?query=${query}`
      fetch(url)
        .then(res => res.json())
        .then(cities => {
          this.setState({ cities })
        })
        .catch(err => console.log(err))
    }
  }
  componentDidMount() {
    this.searchCities()
  }
  componentDidUpdate(prevProps, _prevState, _snapshot) {
    let { search } = this.props.location
    if (search !== prevProps.location.search) {
      this.searchCities()
    }
  }
  render() {
    return (
      <section>
        <ListGroup className="mt-3">
          {
            this.state.cities.map(city => {
              return (
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