import React, { Component } from "react";
import AuthenticationService from "../api/AuthenticationService";
import { Form, Button } from 'react-bootstrap';
import '../css/Account.css'


class LoginComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: "false"
        }
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleID = event => {
        this.setState({ username: event.target.value });
    }

    handlePassword = event => {
        this.setState({ password: event.target.value });
       
    }

    loginClicked = event => {
        event.preventDefault();
        AuthenticationService.authenticate({id: this.state.username, password: this.state.password})
        .then (
            response => {
                if (response.status === 200) {
                    AuthenticationService.registerSuccessfulLogin(this.state.username)
                    this.props.history.push(`/home`);
                }
            }
        ).catch ( error => {
            this.setState({error: "true"});
        })

    }


    render() {
        return (
            <div className="form-outer">
                <div className="form-data">
                
                    <Form onSubmit={this.loginClicked}>
                        <h1>Login</h1>
                        { this.state.error === "true" ? <li className="form-error-msg">Invalid Email or Password !</li> : <div></div>}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="username" placeholder="Enter email" onChange={this.handleID} required/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handlePassword} required />
                        </Form.Group>

                        <div className="form-button">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            <div><a href="/register">Register?</a></div>
                        </div>
                        
                    </Form>

                </div>
            </div>
        
        );
    }

}

export default LoginComponent;