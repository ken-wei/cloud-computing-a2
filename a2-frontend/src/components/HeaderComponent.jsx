import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import AuthenticationService from "../api/AuthenticationService.js";
import { withRouter } from "react-router-dom";


class HeaderComponent extends Component {

    render () {
        const isUserloggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/home">Tourist App</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        {isUserloggedIn && <Nav.Link href="/bookmark">Bookmark</Nav.Link>}
                    </Nav>
                    <Nav className="navbar-right">
                        { !isUserloggedIn && <Nav.Link href="/login">Login</Nav.Link>}
                        { isUserloggedIn && <Nav.Link href="/login" onClick={AuthenticationService.logout}>Logout</Nav.Link>}
                        
                    </Nav> 
                </Navbar>
            </header>
        )
    }          
}

export default withRouter(HeaderComponent);