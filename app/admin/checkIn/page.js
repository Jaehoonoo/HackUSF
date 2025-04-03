"use client";

import { useState } from "react";
import {
    Box,
    Typography,
    Alert,
} from "@mui/material";
import QRScannerComponent from "../checkInScanner/scanner";

export default function CheckInPage() {
    // State for processing and results
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkInResult, setCheckInResult] = useState(null);

    const checkInUser = async (userId) => {
        try {
            const response = await fetch(`/api/checkUserIn`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                })
            });
            if (!response.ok) throw new Error("Failed to check in user");
            return await response.json();
        } catch (error) {
            console.error("Error checking in user:", error);
            return null;
        }
    }

    const setUserMealGroup = async (userId) => {
        try {
            const response = await fetch(`/api/setLunchGroup`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                })
            });
            if (!response.ok) throw new Error("Failed to check in user");
            return await response.json();
        } catch (error) {
            console.error("Error setting meal group:", error);
            return null;
        }
    }

    // This function will be called when QR is successfully scanned
    const handleScanSuccess = async (userId) => {
        setIsProcessing(true);
        setCheckInResult(null);

        console.log(`Processing check-in for user: ${userId}`);
        console.log(`Meal: ${currentMeal}, Group: ${currentLunchGroup}`);

        const checkInResult = await checkInUser(userId);
        const setUserMealGroupResult = await setUserMealGroup(userId);

        if (checkInResult && setUserMealGroupResult) {
            setCheckInResult({
                success: true,
                message: `User successfully checked in`
            });
        } else {
            setCheckInResult({
                success: false,
                message: "Check-in failed. Please try again."
            });
        }

        setIsProcessing(false);
    };

    const handleScanError = (error) => {
        console.error("Scanning error:", error);
        setCheckInResult({
            success: false,
            message: `Scanning error: ${error}`
        });
    };

    return (
        <Box height="100%" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
        }}>
            {/* Header */}
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4}}>
                <Typography variant="h4">Check In Page</Typography>
            </Box>

            {/* Main Container */}
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: "500px",
                gap: 3
            }}>
                {isProcessing && (
                    <Alert severity="info" sx={{ width: "100%" }}>
                        Processing check-in...
                    </Alert>
                )}

                {checkInResult && (
                    <Alert
                        severity={checkInResult.success ? "success" : "error"}
                        sx={{ width: "100%" }}
                    >
                        {checkInResult.message}
                    </Alert>
                )}

                {/* QR Scanner */}
                <Box sx={{ width: "100%", marginTop: 2 }}>
                    <QRScannerComponent
                        onScanSuccess={handleScanSuccess}
                        onScanError={handleScanError}
                    />
                </Box>
            </Box>
        </Box>
    );
}
