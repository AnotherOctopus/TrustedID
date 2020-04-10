import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { authenticate } from "../actions/Auth";
import { storeHumanId } from "../libs/storeInfo";
import styles from "./button.css";

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
    console.log('form submission data', fields);
    event.preventDefault();

    setIsLoading(true);

    try {
      const results = await authenticate(fields.name, fields.license);
      console.log('authenticate results: ', results)
      storeHumanId(results.data.privateKey, results.data.publicKey);
      if (results.errorCode = '200') {
        alert("Success");
      }
      setIsLoading(false);
      setNewUser(newUser);
      //do a pop up
      history.push("/Landing")
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <FormLabel>Full Name</FormLabel>
          <FormControl
            autoFocus
            type="name"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="license" bsSize="large">
          <FormLabel>Driver's License</FormLabel>
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