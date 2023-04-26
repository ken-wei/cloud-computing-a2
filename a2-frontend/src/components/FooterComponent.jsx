import React, { Component } from "react";
import { Navbar, Container} from 'react-bootstrap';

class FooterComponent extends Component {
    render() {
        return (
            <footer>
                <Navbar bg="dark" variant="dark" className="fixed-bottom">
                    <Container>
                        <Navbar.Text>Cloud Computing A2</Navbar.Text>
                        <Navbar.Text>s3693288 - Ken Wei Ooi</Navbar.Text>
                    </Container>
                </Navbar>
                
            </footer>
        )
    }
}

export default FooterComponent;