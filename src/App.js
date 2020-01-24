import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Stores from './stores'
import Login from './components/Login'
import Signup from './components/Signup'
import Homepage from './components/Homepage'
import HikingTrail from './components/HikingTrail'
import HikingTrailList from './components/HikingTrailList'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentId: null,
      currentUser: "",
      longitude: 0,
      latitude: 0,
      currentTrailName: null,
      currentTrailCity: null,
      currentTrailSummary: null,
      currentTrailLength: null,
      currentTrailStars: null
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
  
  handleMapClick = (info) => {
    this.setState({
      currentTrailName: info.name,
      currentTrailCity: info.city,
      currentTrailSummary: info.summary,
      currentTrailLength: info.length,
      currentTrailStars: info.stars
    })
  }

  // logoutUser = (event) => {
  //   this.setState({
  //     currentId: null,
  //     currentUser: null
  //   })
  // }
  
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
        <Route exact path="/hikingtrails" component={() => <Map lat={this.state.latitude} lng={this.state.longitude} mapClick={this.handleMapClick}/>} />
        <Route exact path="/alltrails" component={() => <HikingTrailList />} />
        <Route exact path="hikingtrails/%60$%7Btrail.id%7D%60" 
        component={() => <HikingTrail />}
        // render={browserInfo => {
        //   const slug = browserInfo.match.params.slug;
        //   const trail = this.state.currentTrailName.find(trail => trail.slug === slug);
        //   return trail ? (<HikingTrail trail={trail} /> ) : ( <h1>Loading...</h1>);
        // }}
         />
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
