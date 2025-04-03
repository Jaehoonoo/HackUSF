"use client";

import { useState } from "react";
import {
    Box,
    Typography,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Alert,
} from "@mui/material";
import QRScannerComponent from "../checkInScanner/scanner";

export default function MealPage() {
    // State for dropdown selections
    const [currentMeal, setCurrentMeal] = useState("");
    const [currentLunchGroup, setCurrentLunchGroup] = useState("");

    // State for processing and results
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkInResult, setCheckInResult] = useState(null);

    const markAsMealed = async (userId, currentMeal, currentLunchGroup) => {
        try {
            const response = await fetch(`/api/lunchCheckIn`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    currentMeal: currentMeal,
                    currentLunchGroup: currentLunchGroup
                })
            });
            if (!response.ok) throw new Error("Failed to mark user as Mealed");
            return await response.json();
        } catch (error) {
            console.error("Error marking user as Mealed:", error);
            return null;
        }
    };

    // This function will be called when QR is successfully scanned
    const handleScanSuccess = async (userId) => {
        // Validate that meal and group are selected
        if (!currentMeal || !currentLunchGroup) {
            setCheckInResult({
                success: false,
                message: "Please select both meal type and location group before scanning"
            });
            return;
        }

        setIsProcessing(true);
        setCheckInResult(null);

        console.log(`Processing check-in for user: ${userId}`);
        console.log(`Meal: ${currentMeal}, Group: ${currentLunchGroup}`);

        const result = await markAsMealed(userId, currentMeal, currentLunchGroup);

        if (result) {
            setCheckInResult({
                success: true,
                message: `User successfully checked in for ${currentMeal} in group ${currentLunchGroup}`
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

    // Handle dropdown changes
    const handleMealChange = (event) => {
        setCurrentMeal(event.target.value);
    };

    const handleGroupChange = (event) => {
        setCurrentLunchGroup(event.target.value);
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
                <Typography variant="h4">Meal Check In Page</Typography>
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
                {/* Dropdown Menus */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                    <FormControl fullWidth>
                        <InputLabel id="meal-type-label">Meal</InputLabel>
                        <Select
                            labelId="meal-type-label"
                            id="meal-type"
                            label="Meal Type"
                            value={currentMeal}
                            onChange={handleMealChange}
                            variant="outlined">
                            <MenuItem value="lunch1">Lunch 1</MenuItem>
                            <MenuItem value="dinner">Dinner</MenuItem>
                            <MenuItem value="breakfast">Breakfast</MenuItem>
                            <MenuItem value="lunch2">Lunch 2</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="meal-group-label">Location</InputLabel>
                        <Select
                            labelId="meal-group-label"
                            id="group"
                            label="Group"
                            value={currentLunchGroup}
                            onChange={handleGroupChange}
                            variant="outlined">
                            <MenuItem value="priority">Priority</MenuItem>
                            <MenuItem value="1">Group 1</MenuItem>
                            <MenuItem value="2">Group 2</MenuItem>
                            <MenuItem value="3">Group 3</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Status Messages */}
                {(!currentMeal || !currentLunchGroup) && (
                    <Alert severity="info" sx={{ width: "100%" }}>
                        Please select both meal type and location group before scanning
                    </Alert>
                )}

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