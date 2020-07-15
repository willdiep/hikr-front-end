import React from 'react';
import { Form } from 'react-bootstrap'
import { withRouter, NavLink } from 'react-router-dom'

class Signup extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            username:"",
            email: "",
            password: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        // fetch to localhost to post user info

        let userInfo = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }


        let submitObj = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }

     

        // fetch('http://localhost:3000/users', submitObj)
        fetch('https://hikr-backend.herokuapp.com/users', submitObj)
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                this.props.signup(result.username, result.id)

            }
        )
        .catch((err)=>console.log(err))
        this.props.history.push('/')
        
    }

    render () {
        return (
            <div class="signup">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Form onSubmit={this.handleSubmit}>
                <h1>Sign Up</h1>
                <div>
                    <label htmlFor="name">Name</label><br></br>
                    <input type="text" name="name" placeholder="Name" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label><br></br>
                    <input type="text" name="email" placeholder="Email" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="username">Username</label><br></br>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label><br></br>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                </div>
                    <br></br>
                    <input className="buttons" type="submit" value="Signup" />
                </Form>
                <br></br>
                <h4>Already have an account? <NavLink to="/login" >Login</NavLink></h4>
            </div>
            
        )
    }

}

export default withRouter(Signup)