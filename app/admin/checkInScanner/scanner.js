import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Box, Button } from '@mui/material';

const QRScannerComponent = ({ onScanSuccess, onScanError }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
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
    }, [isScanning]);

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
        setIsPaused(false);

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
        };

        const handleSuccess = (decodedText, decodedResult) => {
            if (ignoreScanRef.current || isPaused) {
                return;
            }

            console.log("Scan detected:", decodedText);
            
            // For any scan, we pause for a couple seconds
            setIsPaused(true);
            ignoreScanRef.current = true;

            if (isValidScan(decodedText)) {
                setScanResult(decodedText);
                
                if (onScanSuccess) {
                    onScanSuccess(decodedText);
                }
                
                // For valid scans, we could stop completely
                // Or just pause and continue after timeout
                setTimeout(() => {
                    setIsPaused(false);
                    ignoreScanRef.current = false;
                    console.log("Resuming scan after successful read");
                }, 2000); // 2 second pause
                
                return;
            }

            // For invalid scans, we pause briefly then resume
            setTimeout(() => {
                setIsPaused(false);
                ignoreScanRef.current = false;
                console.log("Resuming scan after invalid read");
            }, 2000); // 2 second pause
        };

        const handleError = (error) => {
            // console.warn(`QR code scanning failed: ${error}`);
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        }}>
            <div id="qr-reader" ref={scannerDivRef} style={{ width: '300px' }}></div>

            <Box>
                {!isScanning ? (
                    <Button
                        variant="contained"
                        onClick={startScanner}
                    >
                        Start Scanner
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={stopScanner}
                    >
                        Stop Scanner
                    </Button>
                )}
            </Box>
            
            {isPaused && (
                <div className="mt-2 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                    Paused... processing scan
                </div>
            )}
        </Box>
    );
};

export default QRScannerComponent;