"use client"

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from './page.module.css';
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";


const fetchStatus = async (userId) => {
  try {
    const response = await fetch(`/api/getStatus?userId=${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const result = await response.json()
      return result
    }
  } catch (error) {
    console.error('Error getting user status', error)
    return null
  }
}

export default function Profile() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded) {
      const fetchData = async () => {
        const result = await fetchStatus(userId)
        console.log(result)
      }
      fetchData()
    }
  }, [isLoaded, userId]);

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
    }}>

    </Box>
  )
}