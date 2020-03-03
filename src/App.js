import React, {Component} from 'react'
import {Container} from 'react-bootstrap'

import City from './components/City'
import Search from './components/Search'

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  state = {
    city: null,
  }

  setCity = city => this.setState({city})

  render(){
    let {city} = this.state
    return (
      <Container>
        {
          city ?
            <City city={city} resetCity={this.setCity}/>
          :
            <Search setCity={this.setCity}/>
        }
      </Container>
    )
  }

}

