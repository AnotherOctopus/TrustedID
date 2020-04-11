import React, { useState, Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./button.css";
import "./Landing.css";
import returnQR from "../components/QR-Generator";
import QrReader from 'react-qr-reader';
import { getAndSendTestResult } from '../libs/getAndSendTestResult';
import confirmScan from '../libs/confirmScannedCertificate';

//https://www.npmjs.com/package/react-qr-reader


class ScanQR extends Component {
    state = {
        result: 'No result'
    }

    handleScan = data => {
        if (data) {
            console.log("Handle Scan called with data:", data)
            this.setState({
                result: data
            })

            // confirmScan(data);
        }
    }
    handleError = err => {
        console.error(err)
    }

    render() {
        return (
            <div>
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '290px'}}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}

export default function Landing() {
    const [qrType, setQrType] = useState("camera");
    let result = "";

    function handleChange(event) {
        setQrType(event.target.value);
    }

    function handleRequest(event) {
        //change the status
        //test employee number, need to create an input form field
        getAndSendTestResult('1944');
    }

    function buttonMenu() {
        return (
            <ButtonGroup size="med">
                <Button variant="secondary" onClick={handleChange} value="certificate">Certificate</Button>
                <Button variant="secondary" onClick={handleChange} value="health">Health</Button>
                <Button variant="secondary" onClick={handleChange} value="work">Work</Button>
                <Button variant="secondary" onClick={handleChange} value="camera">Camera</Button>
            </ButtonGroup>
        );
    }

    function requestMenu() {
        return (
            <Button size="lg" 
            variant="secondary" 
            onClick={handleRequest} 
            value="testResult">
                Request Test Results
            </Button>
        )
    }

    function qrOrWebcam() {
        let result = ""
        if (qrType === "health" || qrType === "work" || qrType === "certificate") {
            result = returnQR(qrType);
        } else {
            result = <ScanQR />
        }
        return result
    }

    return (
        <div className='main'>
            <div className="menu">{buttonMenu()}</div>
            <div className="content">{qrOrWebcam()}</div>
            <div className="menu">{requestMenu()}</div>
        </div>
    );
}