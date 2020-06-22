import React from 'react'
import { Form } from 'react-bootstrap'
import { withRouter, NavLink } from 'react-router-dom'

class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // fetch to localhost to check for user info
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(result => {
        result.forEach(user => {
          if (
            user.username === this.state.username &&
            user.password === this.state.password
          ) {
            this.props.login(user.username, user.id)
            this.props.history.push('/')
          } else {
            this.props.history.push('/signup')
          }
        })
      })
  }

  render() {
    return (
      <div class="login">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">Username</label>
            <br></br>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <input className="buttons" type="submit" value="Login" />
        </Form>
        <br></br>
        <h4>
          Don't have an account yet? <NavLink to="/signup">Sign Up</NavLink>
        </h4>
      </div>
    )
  }
}

export default withRouter(Signup)
