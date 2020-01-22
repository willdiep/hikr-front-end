import React from 'react';
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';


class Navigation extends React.Component {
    render() {
        return(
            <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><b>Hikr</b></Navbar.Brand>
                <Nav className="mr-auto">
                <NavLink exact to='/' style={{ padding: '9px', color: "#eeddcc" }} activeStyle={{ border: "1px solid white" }}>Home</NavLink>
                <NavLink to='/hikingtrails' style={{ padding: '9px', color: "#eeddcc" }} activeStyle={{ border: "1px solid white" }}>Hiking Trails</NavLink>
                <NavLink to='/profile' style={{ padding: '9px', color: "#eeddcc" }} activeStyle={{ border: "1px solid white" }}>Profile</NavLink>
                </Nav>
                <NavLink to="/login" style={{ padding: '9px', color: "#b4b387" }}>Login</NavLink>
            </Navbar>
            <br />
            </div>
        )
    }
}

export default Navigation