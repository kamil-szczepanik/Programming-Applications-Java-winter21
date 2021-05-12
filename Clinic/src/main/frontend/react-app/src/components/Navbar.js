import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import {Button, Navbar, Nav} from 'react-bootstrap';

function Navi() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand ><Link to="/about" className='navbar-brand'>About</Link>
</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="doctors">sss</Nav.Link>
            <Nav.Link href="#">ssss</Nav.Link>
            <NavLink to="/about" className='nav-link'>About</NavLink>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Navi