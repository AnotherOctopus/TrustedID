import React, { useState, Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./button.css";
import "./Landing.css";
import returnQR from "../components/QR-Generator";
import QrReader from 'react-qr-reader';
import { getAndSendTestResult } from '../libs/getAndSendTestResult';

//https://www.npmjs.com/package/react-qr-reader


class ScanQR extends Component {
    state = {
        result: 'No result'
    }

    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            })
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
                    style={{ width: '100%'}}
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
        //change the status
        //test employee number, need to create an input form field
        //getAndSendTestResult('1944');
        setQrType(event.target.value);
    }

    function renderPage() {
        return (
            <ButtonGroup size="lg">
                <Button variant="secondary" onClick={handleChange} value="health">Health</Button>
                <Button variant="secondary" onClick={handleChange} value="work">Work</Button>
                <Button variant="secondary" onClick={handleChange} value="camera">Camera</Button>
            </ButtonGroup>
        );
    }

    function qrOrWebcam() {
        let result = ""
        if (qrType === "health") {
            result = returnQR(qrType);
        } else if (qrType === "work") {
            result = returnQR(qrType);
        } else {
            //result = <WebcamCapture />;
            result = <ScanQR />
        }
        return result
    }

    function certificateQr() {
        returnQR("certificate");
    }

    return (
        <div className='main'>
            <div className="menu">{renderPage()}</div>
            <div className="content">{qrOrWebcam()}</div>
            <div className="certificate">{certificateQr()}</div>
        </div>
    );
}

//{returnQR(qrType)}