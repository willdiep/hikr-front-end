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
        let submitObj = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }

        let userInfo = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        fetch('http://localhost:3000/users', submitObj)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                // this.props.signup(result.id, result.username)

            }
        )
    }

    render () {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username</label><br></br>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label><br></br>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                </div>
                <br></br>
                    <input type="submit" value="Login" />
                </Form>
                <br></br>
                <h4>Don't have an account yet?  <NavLink to="/signup" >Sign Up</NavLink></h4>
            </div>
            
        )
    }

}

export default withRouter(Signup)