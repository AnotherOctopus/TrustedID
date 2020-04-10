import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { authenticate } from "../actions/Auth";
import { storeHumanId } from "../libs/storeInf";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    license: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.name.length > 0 &&
      fields.license.length > 0
    );
  }

  async function handleSubmit(event) {
    console.log('form submission data', event);
    event.preventDefault();

    setIsLoading(true);

    try {
      const results = await authenticate();
      storeHumanId(results);
      setIsLoading(false);
      setNewUser(newUser);
      renderConfirmationForm()
      history.push("/")
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
    <h1>Form submitted. If authorized, you will be redirected to the main page.</h1>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Full Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="license" bsSize="large">
          <ControlLabel>Driver's License</ControlLabel>
          <FormControl
            type="license"
            value={fields.license}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <Button
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
          onSubmit={handleSubmit}
        >
          Register
        </Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}