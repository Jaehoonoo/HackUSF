"use client"

import React, { useEffect, useState } from 'react'
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Stack,
  useMediaQuery, 
  useTheme 
} from "@mui/material"

const fetchAllStats = async () => {
  try {
    const response = await fetch('/api/getAllStats');
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return 0;
  }
}

export default function Stats() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalPending: 0,
    totalRejected: 0,
    totalAccepted: 0,
    totalRsvp: 0,
    totalCheckedIn: 0,
    totalFirstHackers: 0,
    
    totalFreshman: 0,
    totalSophomore: 0,
    totalJunior: 0,
    totalSenior: 0,
    totalGrad: 0,

    totalLunchOne: 0,
    totalDinner: 0,
    totalMidnightSnack: 0,
    totalBreakfast: 0,
    totalLunchTwo: 0
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await fetchAllStats()
      setStats(stats)
    }
    fetchStats()
  }, [])

  const StatPaper = ({ title, value }) => (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        padding: theme.spacing(3),
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }}
    >
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" color="primary">
        {value}
      </Typography>
    </Paper>
  )

  return (
    <Box height="100%"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '20px',
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: isMobile ? 2 : 4,
          px: isMobile ? 1 : 3,
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            mb: 3, 
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          General
        </Typography>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={isMobile ? 2 : 4}
          width="100%"
          alignItems="stretch"
          mb={6}
        >
          <Box flex={1}>
            <StatPaper 
              title="Total Applications" 
              value={stats.totalApplications} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total Pending (Blank)" 
              value={stats.totalPending} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total Accepted" 
              value={stats.totalAccepted} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total Rejected" 
              value={stats.totalRejected} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total RSVP" 
              value={stats.totalRsvp} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total Checked-In" 
              value={stats.totalCheckedIn} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total First-Time Hackers" 
              value={stats.totalFirstHackers} 
            />
          </Box>

        </Stack>

        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            mb: 3, 
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Grade
        </Typography>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={isMobile ? 2 : 4}
          width="100%"
          alignItems="stretch"
          mb={12}
        >
          <Box flex={1}>
            <StatPaper 
              title="Total Freshman" 
              value={stats.totalFreshman} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total Sophomores" 
              value={stats.totalSophomore} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total Juniors" 
              value={stats.totalJunior} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total Seniors" 
              value={stats.totalSenior} 
            />
          </Box>
          <Box flex={1}>
            <StatPaper 
              title="Total Graduates" 
              value={stats.totalGrad} 
            />
          </Box>

          {/* Add more stat papers here as needed */}
        </Stack>
      </Box>
    </Box>
  )
}