import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Stores from './stores'
import Login from './components/Login'
import Homepage from './components/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      longitude: 0,
      latitude: 0
    }
  }

  handleUserLocation = (lat, long) => {
    this.setState({
      longitude: +long,
      latitude: +lat
    })
  }
  
  componentDidMount() {
    // fetch(Stores)
    // .then(res => res.json())
    // .then(res => console.log(res.features))
    // // .then(store => this.setState({ pokemonCollection: pokemonCollection }))
    // .catch(e => console.error(e))
  }

  render() {
    return (
      <div className="App">
        <Router>
        <Navigation />
        <Switch>
        <Route exact path="/" component={() => <Homepage findLocation={this.handleUserLocation} />} />
        <Route exact path="/hikingtrails" component={() => <Map lat={this.state.latitude} lon={this.state.longitude}/>} />
        <Route exact path="/login" component={() => <Login />} />
        </Switch>
        </Router>
      </div>
      
    )
  }
}

export default App
