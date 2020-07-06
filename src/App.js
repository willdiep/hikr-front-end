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
      currentUserId: null,
      currentUser: '',
      // longitude: 0,
      // latitude: 0,
      currentTrailName: null,
      currentTrailCity: null,
      currentTrailSummary: null,
      currentTrailLength: null,
      currentTrailStars: null,
      currentTrailImgUrl: null,
      currentTrailCondition: null,
      currentTrailId: null,
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
      currentUserId: id,
      currentUser: username,
    },
      
    )
  }

  handleMapClick = (trail) => {
    this.setState({
      currentTrailName: trail.name,
      currentTrailCity: trail.city,
      currentTrailSummary: trail.summary,
      currentTrailLength: trail.length,
      currentTrailStars: trail.stars,
      currentTrailImgUrl: trail.img_url,
      currentTrailCondition: trail.condition,
      currentTrailId: trail.id,
    })
  }

  // logoutUser = (event) => {
  //   this.setState({
  //     currentUserId: null,
  //     currentUser: null
  //   })
  // }

  // renderTrail = (routerProps) => {
  //   // debugger
  //   let TrailId = parseInt(routerProps.match.params.id)
  //   let foundTrail = this.state.trails.find(
  //     (TrailObj) => TrailObj.id === TrailId
  //   )
  //   return foundTrail ? <TrailProfile Trail={foundTrail} /> : <NotFound />
  // }

  render() {
    return (
      <div className='App'>
        <Router>
          <Navigation username={this.state.currentUser} />
          <Switch>
            <Route path='/mappage/trail/:name'>
              <TrailProfile trailInfo={this.state} />
            </Route>

            <Route path='/mappage'>
              <MapPage
                lat={this.state.latitude}
                lng={this.state.longitude}
                mapClick={this.handleMapClick}
              />
            </Route>

            <Route path='/alltrails'>
              <HikingTrailList />
            </Route>

            <Route path='/signup'>
              <Signup signup={this.handleSignupAndLogin} />
            </Route>

            <Route path='/login'>
              <Login login={this.handleSignupAndLogin} />
            </Route>

            <Route path='/'>
              <Homepage
                findLocation={this.handleUserLocation}
                username={this.state.currentUser}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
