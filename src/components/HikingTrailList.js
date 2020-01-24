import React from 'react'
import HikingTrail from './HikingTrail'
import { Link } from 'react-router-dom'

class HikingTrailList extends React.Component {

    constructor() {
        super();
        this.state = {
            trailsArray: []
        }
    }

    componentDidMount() {
    fetch('http://localhost:3000/hikingtrails/')
    .then(res => res.json())
    .then((result) => {
        this.setState({
            trailsArray: result
        })
    })
    }



    render() {
        return (
            <div>
                <center><h1>All Hiking Trails</h1>
                <ul className="trailList">
                {this.state.trailsArray.map(trail => (<li><Link to='hikingtrails/`${trail.id}`'>{trail.name}</Link></li>))}
                </ul>
                </center>
            </div>
        )
    }
}

export default HikingTrailList