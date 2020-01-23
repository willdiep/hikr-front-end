import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Stores from './stores'
import Login from './components/Login'
import Signup from './components/Signup'
import Homepage from './components/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentId: null,
      currentUser: "",
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

  handleSignupAndLogin = (username, id) => {
    this.setState({
      currentId: id,
      currentUser: username
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
        <Navigation username={this.state.currentUser} />
        <Switch>
        <Route exact path="/" component={() => <Homepage findLocation={this.handleUserLocation} username={this.state.currentUser} />} />
        <Route exact path="/hikingtrails" component={() => <Map lat={this.state.latitude} lon={this.state.longitude}/>} />
        <Route exact path="/signup" component={() => <Signup signup={this.handleSignupAndLogin}/>} />
        <Route exact path="/login" component={() => <Login login={this.handleSignupAndLogin}/>} />
        {/* <Route exact path="/logout" render={() => this.logoutUser} /> */}
        </Switch>
        </Router>
      </div>
      
    )
  }
}

export default App
