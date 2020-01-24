import React from 'react';
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';

class Navigation extends React.Component {

    logoutUser = (event) => {
        this.setState({
          currentUser: "",
          currentId: null
        })
      }

    render() {
        return(
            <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><b>Hikr</b></Navbar.Brand>
                <Nav className="mr-auto">
                <NavLink exact to='/' style={{ padding: '9px', color: "#eeddcc" }} activeStyle={{ border: "1px solid white" }}>Home</NavLink>
                
                {this.props.username ? <NavLink to='/hikingtrails' style={{ padding: '9px', color: "#eeddcc" }} activeStyle={{ border: "1px solid white" }}>Map</NavLink> : null}
                
                <NavLink to='/alltrails' style={{ padding: '9px', color: "#eeddcc" }} activeStyle={{ border: "1px solid white" }}>Hiking Trails</NavLink>

                {this.props.username ? <NavLink to='/profile' style={{ padding: '9px', color: "#eeddcc" }} activeStyle={{ border: "1px solid white" }}>Profile</NavLink> : null}
                </Nav>
                
                {this.props.username ? <Button onClick={this.logoutUser}>Logout</Button> : <NavLink to="/signup" style={{ padding: '9px', color: "#b4b387" }}>Sign Up</NavLink>}
                
                {this.props.username ? null : <NavLink to="/login" style={{ padding: '9px', color: "#b4b387" }}>Login</NavLink>}
            </Navbar>
            <br />
            </div>
        )
    }
}

export default Navigation