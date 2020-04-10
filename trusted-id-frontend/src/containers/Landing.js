import React, { useState } from "react";
import { Button, ToggleButtonGroup, ToggleButton, ToggleButtonProps } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import styles from "./button.css";
//https://github.com/zpao/qrcode.react

export default function Landing() {
    const [value, setValue] = useState("camera");
    function handleChange() {
        //change the status
    }

    function renderScreen(val) {
        setValue(val);
    }

    // function status(input) {
    //     if input = true {
    //         'active'
    //     } else {
    //         'disabled'
    //     }
    // }

    function renderPage() {
        return (<ToggleButtonGroup type="block" value={value} onChange={handleChange}>
            <ToggleButton class="landing" value="qrHealth">Option 1</ToggleButton>
            <ToggleButton class="landing" value="qrWork">Option 2</ToggleButton>
            <ToggleButton class="landing" value="camera">Option 3</ToggleButton>
        </ToggleButtonGroup>)
    }

    return (
        <div>
            {renderPage()}
        </div>
    );
}