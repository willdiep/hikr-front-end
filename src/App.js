import React, { Component } from 'react'
import MapPage from './components/MapPage'
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Stores from './stores'
import Login from './components/Login'
import Signup from './components/Signup'
import Homepage from './components/Homepage'
import TrailProfile from './components/TrailProfile'
import HikingTrailList from './components/HikingTrailList'
import NotFound from './components/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentId: null,
      currentUser: '',
      // longitude: 0,
      // latitude: 0,
      currentTrailName: null,
      currentTrailCity: null,
      currentTrailSummary: null,
      currentTrailLength: null,
      currentTrailStars: null,
    }
  }

  handleUserLocation = (lat, long) => {
    // this.setState({
    //   longitude: +long,
    //   latitude: +lat
    // })
    localStorage.setItem('long', long)
    localStorage.setItem('lat', lat)
  }

  handleSignupAndLogin = (username, id) => {
    this.setState({
      currentId: id,
      currentUser: username,
    })
  }

  handleMapClick = (info) => {
    this.setState({
      currentTrailName: info.name,
      currentTrailCity: info.city,
      currentTrailSummary: info.summary,
      currentTrailLength: info.length,
      currentTrailStars: info.stars,
    })
  }

  // logoutUser = (event) => {
  //   this.setState({
  //     currentId: null,
  //     currentUser: null
  //   })
  // }

  renderTrail = (routerProps) => {
    // debugger
    let TrailId = parseInt(routerProps.match.params.id)
    let foundTrail = this.state.trails.find(
      (TrailObj) => TrailObj.id === TrailId
    )
    return foundTrail ? <TrailProfile Trail={foundTrail} /> : <NotFound />
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <Navigation username={this.state.currentUser} />
          <Switch>
            <Route
              exact
              path='/'
              component={() => (
                <Homepage
                  findLocation={this.handleUserLocation}
                  username={this.state.currentUser}
                />
              )}
            />

            <Route
              exact
              path='/mappage'
              component={() => (
                <MapPage
                  lat={this.state.latitude}
                  lng={this.state.longitude}
                  mapClick={this.handleMapClick}
                />
              )}
            />

            <Route
              exact
              path='/alltrails'
              component={() => <HikingTrailList />}
            />

            <Route
              exact
              path='/signup'
              component={() => <Signup signup={this.handleSignupAndLogin} />}
            />

            <Route
              exact
              path='/login'
              component={() => <Login login={this.handleSignupAndLogin} />}
            />

            <Route
              path='/mappage/:id'
              render={(routerProps) => this.renderTrail(routerProps)}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
