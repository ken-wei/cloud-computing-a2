import React, { Component } from "react";
import AuthenticationService from "../api/AuthenticationService";
import { Form, Button } from 'react-bootstrap'
import '../css/Account.css'


class RegisterComponent extends Component {
    constructor (props) 
    {
        super(props);
        this.state = 
        {
            username: "",
            password: "",
            error: ""
        }
    }

    handleInputID = event => 
    {
        this.setState( {username: event.target.value} )
    }

    handleInputPassword = event => 
    {
        this.setState( {password: event.target.value} )
    }

    registerClicked = event => 
    {
        event.preventDefault();
        AuthenticationService.registerAccount({id: this.state.username, password: this.state.password})
        .then(    
            response => {
                if (response.status === 200) {
                    this.props.history.push('/login');
                }
            }      
        ).catch ( error => {
            this.setState({error: "true"});
        })
    }

    render () 
    {
        return (
            <div className="form-outer">
                <div className="form-data">
                
                    <Form onSubmit={this.registerClicked}>
                        <h1>Sign Up</h1>
                        { this.state.error === "true" ? <div className="form-error-msg">Email has already been used!</div> : <div></div>} 
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="username" placeholder="Enter email" onChange={this.handleInputID} required/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleInputPassword} required/>
                        </Form.Group>

                        <div className="form-button">
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                            <div><a href="/login">Login?</a></div>
                        </div>
                        
                    </Form>

                </div>
            </div>
        );
    }

}

export default RegisterComponent;