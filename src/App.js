import React, { Component } from 'react'
import Map from './Map'
import './App.css'
// import Stores from './stores'

class App extends Component {

  
  
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
        <Map />
      </div>
    )
  }
}

export default App
