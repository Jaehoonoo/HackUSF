"use client"

import React, { useState, useEffect } from 'react';
import AdminNavbar from '@/components/adminNavbar/adminNavbar';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
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

// Fetch all users
const getAllUsers = async (userId) => {
  try {
    const response = await fetch(`/api/getAllUsers`, {
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
    console.error('Error getting all users', error)
    return null
  }
}

// Sample data
const initialData = {
  acceptedUsers: 0, // Start with 0
  rejectedUsers: 0, // Start with 0
  pendingUsers: 0,
  recentUsers: [
    { id: 1, name: 'John Doe', status: 'Pending', email: 'john@example.com'},
    { id: 2, name: 'Jane Smith', status: 'Pending', email: 'jane@example.com'},
    { id: 3, name: 'Alex Johnson', status: 'Accepted', email: 'alex@example.com'},
    { id: 4, name: 'Alex Samira', status: 'Rejected', email: 'alex@example.com'},
    { id: 5, name: 'John Doe', status: 'Pending', email: 'john@example.com'},
    { id: 6, name: 'Jane Smith', status: 'Pending', email: 'jane@example.com'},
    { id: 7, name: 'Alex Johnson', status: 'Accepted', email: 'alex@example.com'},
    { id: 8, name: 'Alex Samira', status: 'Rejected', email: 'alex@example.com'},
    { id: 9, name: 'John Doe', status: 'Pending', email: 'john@example.com'},
    { id: 10, name: 'Jane Smith', status: 'Pending', email: 'jane@example.com'},
    { id: 11, name: 'Alex Johnson', status: 'Accepted', email: 'alex@example.com'},
    { id: 12, name: 'Alex Samira', status: 'Rejected', email: 'alex@example.com'},
    { id: 13, name: 'John Doe', status: 'Pending', email: 'john@example.com'},
    { id: 14, name: 'Jane Smith', status: 'Pending', email: 'jane@example.com'},
    { id: 15, name: 'Alex Johnson', status: 'Accepted', email: 'alex@example.com'},
    { id: 16, name: 'Alex Samira', status: 'Rejected', email: 'alex@example.com'},
  ]
};

initialData.pendingUsers = initialData.recentUsers.filter(user => user.status === 'Pending').length;
initialData.acceptedUsers = initialData.recentUsers.filter(user => user.status === 'Accepted').length;
initialData.rejectedUsers = initialData.recentUsers.filter(user => user.status === 'Rejected').length;

// Create a component for stat cards
const StatCard = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
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
  // TODO: figure out how to populate data and organize users by status
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    school: '',
    notifications: false,
  })

  const handleStatusChange = (userId, newStatus) => {
    setData(prevData => {
      const updatedUsers = prevData.recentUsers.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      );
  
      const acceptedUsers = updatedUsers.filter(user => user.status === "Accepted").length;
      const rejectedUsers = updatedUsers.filter(user => user.status === "Rejected").length;
      const pendingUsers = updatedUsers.filter(user => user.status === "Pending").length; // ✅ Now tracks remaining pending users
  
      return { 
        ...prevData, 
        recentUsers: updatedUsers, 
        acceptedUsers, 
        rejectedUsers,
        pendingUsers // ✅ Update pending users count dynamically
      };
    });
  };  

  // fetch all users on render
  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllUsers();
      console.log(users)
    }
    fetchAllUsers()
  }, [])

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <AdminNavbar />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admission Dashboard
        </Typography>
        <IconButton onClick={refreshData} title="Refresh data">
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Main Stats with Flexbox layout instead of Grid */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        mb: 4 
      }}>
        <Box sx={{ 
          flex: {
            xs: '1 1 100%',  // Full width on extra small screens
            sm: '1 1 calc(50% - 12px)',  // Two per row on small screens (with gap considered)
            md: '1 1 calc(33.333% - 16px)'  // Three per row on medium screens and up
          }
        }}>
          <StatCard 
            title="Pending Users" 
            value={data.pendingUsers}  // ✅ Use updated pending count
            icon={<PendingIcon sx={{ color: 'warning.main' }} />} 
            color="warning"
          />
        </Box>
        <Box sx={{ 
          flex: {
            xs: '1 1 100%',
            sm: '1 1 calc(50% - 12px)',
            md: '1 1 calc(33.333% - 16px)'
          }
        }}>
          <StatCard 
            title="Accepted Users" 
            value={data.acceptedUsers} 
            icon={<CheckCircleIcon sx={{ color: 'success.main' }} />} 
            color="success"
          />
        </Box>
        <Box sx={{ 
          flex: {
            xs: '1 1 100%',
            sm: '1 1 calc(50% - 12px)',
            md: '1 1 calc(33.333% - 16px)'
          }
        }}>
          <StatCard 
            title="Rejected Users" 
            value={data.rejectedUsers} 
            icon={<CancelIcon sx={{ color: 'error.main' }} />} 
            color="error"
          />
        </Box>
      </Box>

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
                      {user.status === "Pending" ? (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton 
                            onClick={() => handleStatusChange(user.id, "Accepted")}
                            sx={{ 
                              backgroundColor: "success.main", 
                              color: "#fff",
                              "&:hover": { backgroundColor: "success.dark" },
                              borderRadius: "8px",
                              padding: "3px 6px"
                            }}
                          >
                            <CheckCircleIcon />
                            <Typography sx={{ ml: 1, fontWeight: "lightbold" }}>Accept</Typography>
                          </IconButton>

                          <IconButton 
                            onClick={() => handleStatusChange(user.id, "Rejected")}
                            sx={{ 
                              backgroundColor: "error.main", 
                              color: "#fff",
                              "&:hover": { backgroundColor: "error.dark" },
                              borderRadius: "8px",
                              padding: "3px 6px"
                            }}
                          >
                            <CancelIcon />
                            <Typography sx={{ ml: 1, fontWeight: "lightbold" }}>Reject</Typography>
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography color={user.status === "Accepted" ? "success.main" : "error.main"} sx={{ fontWeight: "bold" }}>
                          {user.status}
                        </Typography>
                      )}
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