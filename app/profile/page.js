"use client"

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
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

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      (async () => {
        const result = await fetchStatus(userId)
        const status = result.data.status
        setStatus(status)
      })()
    }
  }, [isLoaded, userId]);

  return (
    <Box sx={{
      height: '100vh',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
    }}>
      {status === null ? (
        <CircularProgress />
      ) : status === 'accepted' ? (
        /* Change with lunch group and hacker id */
        <Typography variant="h4">Accepted</Typography>
      ) : status === 'pending' ? (
        <Typography variant="h4">Pending Acceptance...</Typography>
      ) : (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Typography variant="h4">Thank you for applying to HackUSF!</Typography>
          <Typography variant="h5">Unfortunately, we couldn&apos;t offer you a spot this time.</Typography>
        </Box>
      )}

    </Box>
  )
}