import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap';
// import wallpaper from './images/home-page-wallpaper1.jpg'

let locationKey = `${process.env.REACT_APP_LOCATIONIQ_API_KEY}`


// console.log(wallpaper)

class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            location: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            location: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.location.includes(" ")) {
            let formattedCorrectly = this.state.location.replace(' ', '%20')
             var url = 'https://us1.locationiq.com/v1/search.php?key=' + `${locationKey}` + '&q=' + `${formattedCorrectly}` + '&format=json'
        } else {
             var url = 'https://us1.locationiq.com/v1/search.php?key=' + `${locationKey}` + '&q=' + `${this.state.location}` + '&format=json'
        }
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.props.findLocation(result[0].lat, result[0].lon)
          }
        )
        if(this.props.username){
            this.props.history.push('/hikingtrails')
        }
        else {
            this.props.history.push('/signup')
        }
    }
        

    render() {
        return (
            <div class="homepage">
                <br></br><br></br><br></br><br></br>
                <div class="form">
                <h1>Welcome {this.props.username}!</h1>
                <Form onSubmit={this.handleSubmit}>
                <h2>Find a hiking trail:</h2>
                <br></br>
                <div>
                <input type="text" name="location" placeholder="Enter location here..." className="location" value={this.state.location} onChange={this.handleChange}/>
                </div>
                <br></br>
                <input type="submit" value="Submit" className="buttons"/>
                </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Homepage)