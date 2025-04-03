import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

const QRScannerComponent = ({ onScanSuccess, onScanError }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const scannerRef = useRef(null);
    const scannerDivRef = useRef(null);
    const ignoreScanRef = useRef(false);

    // Initialize scanner when component mounts
    useEffect(() => {
        if (scannerDivRef.current) {
            scannerRef.current = new Html5Qrcode('qr-reader');
        }

        // Cleanup on unmount
        return () => {
            if (scannerRef.current && isScanning) {
                scannerRef.current.stop().catch(err => {
                    console.error("Error stopping scanner:", err);
                });
            }
        };
    }, []);

    const isValidScan = (data) => {
        if (data === null || typeof data !== 'string') {
            return false;
        }

        const pattern = /^user_[a-zA-Z0-9]{27}$/;
        return pattern.test(data);
    };

    const startScanner = () => {
        if (!scannerRef.current) {
            setError("Scanner not initialized.");
            return;
        }

        setError(null);
        setScanResult(null);
        ignoreScanRef.current = false;

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
        };

        const handleSuccess = (decodedText, decodedResult) => {
            if (ignoreScanRef.current) {
                return;
            }

            if (isValidScan(decodedText)) {
                setScanResult(decodedText);
                stopScanner();

                if (onScanSuccess) {
                    onScanSuccess(decodedText);
                }
                return;
            }

            console.log("Invalid Scan:", decodedText);
            ignoreScanRef.current = true;

            setTimeout(() => {
                ignoreScanRef.current = false;
                console.log("Resuming scan");
            }, 1000);
        };

        const handleError = (error) => {
            console.warn(`QR code scanning failed: ${error}`);
            if (onScanError) {
                onScanError(error);
            }
        };

        scannerRef.current.start(
            { facingMode: "environment" },
            config,
            handleSuccess,
            handleError
        ).then(() => {
            setIsScanning(true);
            console.log("Scanner started");
        }).catch((err) => {
            console.error("Error starting scanner:", err);
            setError(`Failed to start scanner: ${err.message || err}`);
        });
    };

    const stopScanner = () => {
        if (scannerRef.current && isScanning) {
            scannerRef.current.stop().then(() => {
                setIsScanning(false);
            }).catch((err) => {
                console.error("Error stopping scanner:", err);
            });
        }
    };

    return (
        <div className="qr-scanner-container">
            <div id="qr-reader" ref={scannerDivRef} style={{ width: '300px' }}></div>

            <div className="scanner-controls mt-4">
                {!isScanning ? (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={startScanner}
                    >
                        Start Scanner
                    </button>
                ) : (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={stopScanner}
                    >
                        Stop Scanner
                    </button>
                )}
            </div>
        </div>
    );
};

export default QRScannerComponent;