import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./button.css";
import "./Landing.css";
import returnQR from "../components/QR-Generator";
import Webcam from "react-webcam";
//https://www.npmjs.com/package/react-webcam

const videoConstraints = {
    width: 150,
    height: 150,
    facingMode: "user"//{ exact: "environment" }
};

const WebcamCapture = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );

    return (
        <>
            <Webcam
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </>
    );
};

export default function Landing() {
    const [qrType, setQrType] = useState("camera");
    let result = "";

    function handleChange(event) {
        //change the status
        console.log(event.target.value);
        setQrType(event.target.value);
    }

    function renderPage() {
        return (
            <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary" onClick={handleChange} value="health">Health</button>
                <button type="button" class="btn btn-secondary" onClick={handleChange} value="work">Work</button>
                <button type="button" class="btn btn-secondary" onClick={handleChange} value="camera">Camera</button>
            </div>
        );
    }

    function qrOrWebcam() {
        let result = ""
        if (qrType === "health") {
            result = returnQR(qrType);
        } else if (qrType === "work") {
            result = returnQR(qrType);
        } else {
            result = <WebcamCapture />;
        }
        return result
    }

    return (
        <div>
            {renderPage()}
            <div className='box'>{qrOrWebcam()}</div>
        </div>
    );
}

//{returnQR(qrType)}