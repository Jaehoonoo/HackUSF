"use client"

import { Box, Typography, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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

const confirmRSVP = async (userId, rsvp) => {
  try {
    const response = await fetch('/api/confirmRSVP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId, rsvp}),
    })
  } catch (error) {
    console.error('Error saving application', error)
  }
}

export default function Profile() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth()
  const [lunchGroup, setLunchGroup] = useState("To be assigned...")
  const [rsvp, setRsvp] = useState(false)

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        router.push('/sign-in')
      } else {
        (async () => {
          const result = await fetchStatus(userId)
          if (result && result.data) {
            const status = result.data.status
            setStatus(status)
          }
        })()
      }
    }
  }, [isLoaded, userId, router]);

  const handleChange = (e) => {
    setRsvp(e.target.value)
  }

  const handleSubmit = () => {
    if (userId && isLoaded) {
      confirmRSVP(userId, rsvp)
    }
  }

  return (
    <Box m={0} p={0} sx={{
      height: '100vh',
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
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '0.4rem',
        }}>
          <Box mb={2} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '0.4rem',
          }}>
            <Typography variant="h4">Hacker ID:</Typography>
            <Typography variant="h4">(QR CODE)</Typography>
          </Box>

          <Typography variant="h4" mb={2}>Lunch Group: {lunchGroup}</Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '1rem',
          }}>
            <FormControl fullWidth>
              <InputLabel>RSVP</InputLabel>
              <Select
                value={rsvp}
                label="RSVP"
                onChange={handleChange}
              >
                <MenuItem value={true}>I will be there!</MenuItem>
                <MenuItem value={false}>I will NOT be going...</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleSubmit}
              sx={{
                height: '46px',
                padding: '1.5rem',
                textTransform: 'none',
                color: 'black',
                fontWeight: 600,
                fontSize: '1.2rem',
                borderRadius: '18px',
                boxShadow: '5px 5px 0px black',
                border: '3px solid black',
                backgroundColor: '#f8f8f8',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

                '&:hover': {
                  transform: 'translate(3px, 3px)',
                  boxShadow: '0px 0px 0px black',
                  border: '3px solid black',
                },
              }}
            >
            Confirm
          </Button>
        </Box>
      </Box>
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