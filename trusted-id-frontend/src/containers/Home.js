import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Home.css";
import "./button.css";

export default function Register() {
    return (
        <div className="Home">
            <div className="lander">
                <h1>Register</h1>
                <LinkContainer to="/signup">
                    <Button class="${button.styles}">Signup</Button>
                </LinkContainer>
                <p></p>
            </div>
        </div>
    )
}