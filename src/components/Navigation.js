import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import logo from '../images/logo.png'

class Navigation extends React.Component {
  logoutUser = (event) => {
    this.setState({
      currentUser: '',
      currentId: null,
    })
  }

  render() {
    return (
      <div>
        <Navbar 
        bg='#eeddcc' variant='light'
        >
          {/* <Navbar.Brand><img className="logo" src={logo} width="425px" height="125px" /></Navbar.Brand> */}
          <Nav className='mr-auto'>
            <NavLink
              exact
              to='/'
              style={{ padding: '9px', color: 'black', textDecoration: 'none' }}
            //   activeStyle={{ border: '1px solid #ddbb98' }}
            >
              <img src={logo} alt='logo' style={{ width: '100px' }} />
            </NavLink>

            {/* <NavLink
              exact
              to='/'
              style={{ display: 'flex', alignItems: 'center', padding: '9px', color: 'black', textDecoration: 'none' }}
            //   activeStyle={{ border: '1px solid #ddbb98' }}
            >
              Home
            </NavLink> */}

            {this.props.username ? (
              <NavLink
                to='/hikingtrails'
                style={{
                  padding: '9px',
                  color: 'black',
                  textDecoration: 'none',
                }}
                // activeStyle={{ border: '1px solid #ddbb98' }}
              >
                Map
              </NavLink>
            ) : null}

            <NavLink
              to='/alltrails'
              style={{ display: 'flex', alignItems: 'center', paddingLeft: '25px', color: 'black', textDecoration: 'none' }}
            //   activeStyle={{ border: '1px solid #ddbb98' }}
            >
              Hiking Trails
            </NavLink>

            {this.props.username ? (
              <NavLink
                to='/profile'
                style={{
                  padding: '9px',
                  color: 'black',
                  textDecoration: 'none',
                }}
                // activeStyle={{ border: '1px solid #ddbb98' }}
              >
                Profile
              </NavLink>
            ) : null}
          </Nav>

          {this.props.username ? (
            <Button onClick={this.logoutUser}>Logout</Button>
          ) : (
            <NavLink
              to='/signup'
              style={{
                padding: '9px',
                color: '#b4b387',
                textDecoration: 'none',
              }}
            //   activeStyle={{ border: '1px solid #ddbb98' }}
            >
              Sign Up
            </NavLink>
          )}

          {this.props.username ? null : (
            <NavLink
              to='/login'
              style={{
                padding: '9px',
                color: '#b4b387',
                textDecoration: 'none',
              }}
            //   activeStyle={{ border: '1px solid #ddbb98' }}
            >
              Login
            </NavLink>
          )}
        </Navbar>
        <br />
      </div>
    )
  }
}

export default Navigation
