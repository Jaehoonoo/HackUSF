"use client"

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  HourglassEmpty as PendingIcon,
  EventAvailable as CheckedInIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// Sample data
const initialData = {
  pendingUsers: 45,
  acceptedUsers: 182,
  rejectedUsers: 23,
  checkedInUsers: 125,
  totalUsers: 250,
  totalCheckedInUsers: 125,
  recentUsers: [
    { id: 1, name: 'John Doe', status: 'Checked In', email: 'john@example.com', timestamp: '2025-02-26 09:23' },
    { id: 2, name: 'Jane Smith', status: 'Pending', email: 'jane@example.com', timestamp: '2025-02-26 08:45' },
    { id: 3, name: 'Alex Johnson', status: 'Accepted', email: 'alex@example.com', timestamp: '2025-02-25 17:12' },
    { id: 4, name: 'Sarah Williams', status: 'Rejected', email: 'sarah@example.com', timestamp: '2025-02-25 16:08' },
    { id: 5, name: 'Michael Brown', status: 'Checked In', email: 'michael@example.com', timestamp: '2025-02-25 14:33' },
    { id: 6, name: 'Emily Davis', status: 'Pending', email: 'emily@example.com', timestamp: '2025-02-25 13:47' },
    { id: 7, name: 'Robert Wilson', status: 'Accepted', email: 'robert@example.com', timestamp: '2025-02-25 11:20' },
    { id: 8, name: 'Lisa Martinez', status: 'Checked In', email: 'lisa@example.com', timestamp: '2025-02-25 10:15' },
  ]
};

// Create a component for stat cards
const StatCard = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Box sx={{ 
            backgroundColor: `${color}.light`, 
            borderRadius: '50%', 
            p: 1, 
            display: 'flex' 
          }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const UserDashboard = () => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const refreshData = () => {
    // In a real app, this would fetch fresh data from an API
    // For this demo, we'll just simulate a refresh with slightly different numbers
    setData({
      ...data,
      pendingUsers: data.pendingUsers + Math.floor(Math.random() * 5) - 2,
      acceptedUsers: data.acceptedUsers + Math.floor(Math.random() * 5) - 2,
      rejectedUsers: data.rejectedUsers + Math.floor(Math.random() * 3) - 1,
      checkedInUsers: data.checkedInUsers + Math.floor(Math.random() * 5) - 2,
    });
  };

  // Update derived values
  const totalUsers = data.pendingUsers + data.acceptedUsers + data.rejectedUsers;
  const totalCheckedInUsers = data.checkedInUsers;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Dashboard
        </Typography>
        <IconButton onClick={refreshData} title="Refresh data">
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Main Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Pending Users" 
            value={data.pendingUsers} 
            icon={<PendingIcon sx={{ color: 'warning.main' }} />} 
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Accepted Users" 
            value={data.acceptedUsers} 
            icon={<CheckCircleIcon sx={{ color: 'success.main' }} />} 
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Rejected Users" 
            value={data.rejectedUsers} 
            icon={<CancelIcon sx={{ color: 'error.main' }} />} 
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Checked In Users" 
            value={data.checkedInUsers} 
            icon={<CheckedInIcon sx={{ color: 'info.main' }} />} 
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Users" 
            value={totalUsers} 
            icon={<PeopleIcon sx={{ color: 'primary.main' }} />} 
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Checked In" 
            value={totalCheckedInUsers} 
            icon={<CheckedInIcon sx={{ color: 'secondary.main' }} />} 
            color="secondary"
          />
        </Grid>
      </Grid>

      {/* Recent Users Table */}
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Recent Users
          </Typography>
        </Box>
        <TableContainer>
          <Table size={isSmallScreen ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {!isSmallScreen && <TableCell>Email</TableCell>}
                <TableCell>Status</TableCell>
                {!isMediumScreen && <TableCell>Timestamp</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.recentUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    {!isSmallScreen && <TableCell>{user.email}</TableCell>}
                    <TableCell>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: user.status === 'Accepted' ? 'success.main' : 
                               user.status === 'Rejected' ? 'error.main' : 
                               user.status === 'Pending' ? 'warning.main' : 'info.main'
                      }}>
                        {user.status === 'Accepted' && <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />}
                        {user.status === 'Rejected' && <CancelIcon fontSize="small" sx={{ mr: 1 }} />}
                        {user.status === 'Pending' && <PendingIcon fontSize="small" sx={{ mr: 1 }} />}
                        {user.status === 'Checked In' && <CheckedInIcon fontSize="small" sx={{ mr: 1 }} />}
                        {user.status}
                      </Box>
                    </TableCell>
                    {!isMediumScreen && <TableCell>{user.timestamp}</TableCell>}
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.recentUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default UserDashboard;