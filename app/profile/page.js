"use client"

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from './page.module.css';
import { useState, useEffect } from "react";

export default function Profile() {
  const router = useRouter();

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        height: '100vh',
    }}>

    </Box>
  )
}