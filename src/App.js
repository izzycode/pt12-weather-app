import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'

import City from './components/City'
import Search from './components/Search'

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

export default App
