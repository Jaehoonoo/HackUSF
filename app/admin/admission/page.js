"use client"

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  CircularProgress,
  Alert,
  ButtonGroup
} from '@mui/material';

const PendingUserApproval = () => {
  const [userData, setUserData] = useState({
    pendingUsers: [],
    pendingUsersCount: 0
  });

  console.log(userData.pendingUsers)
  
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  console.log(selectedUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/getAllUsers');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Filter out any pending users with empty firstName, lastName, or email
        const filteredPendingUsers = result.data.pendingUsers.filter(user => 
          user.firstName && user.lastName && user.email
        );
        
        setUserData({
          ...result.data,
          pendingUsers: filteredPendingUsers,
          pendingUsersCount: filteredPendingUsers.length
        });
      } else {
        throw new Error(result.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (event) => {
    // If we currently have selected users (any number), deselect all
    if (selectedUsers.length > 0) {
      setSelectedUsers([]);
    } else {
      // Otherwise, select the first 100 users
      const usersToSelect = userData.pendingUsers.slice(0, 100).map(user => ({
        userId: user.id,
        firstName: user.firstName,
        recipientEmail: user.email
      }));
      
      setSelectedUsers(usersToSelect);
    }
  };
  
  const handleSelectUser = (user) => {
    setSelectedUsers(prevSelected => {
      // Check if user is already selected by userId
      const existingIndex = prevSelected.findIndex(item => item.userId === user.id);
      
      if (existingIndex >= 0) {
        // User is already selected, remove them
        return [
          ...prevSelected.slice(0, existingIndex),
          ...prevSelected.slice(existingIndex + 1)
        ];
      } else {
        // Check if we've already hit 100 selected users
        if (prevSelected.length >= 100) {
          // Silently ignore the selection if we're at the limit
          return prevSelected;
        }
        
        // User not selected and we're under the limit, so add them
        return [...prevSelected, {
          userId: user.id,
          firstName: user.firstName,
          recipientEmail: user.email
        }];
      }
    });
  };

  const handleApproveUsers = async () => {
    if (selectedUsers.length === 0) return;
    
    try {
      setActionLoading(true);
      
      // Process each selected user individually
      for (const user of selectedUsers) {
        // Send approval request to backend for each user
        const response = await fetch('/api/sendAcceptanceEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.userId,
            firstName: user.firstName,
            recipientEmail: user.recipientEmail
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to approve user: ${user.firstName}`);
        }
      }
      
      // Refresh the user list after approval
      await fetchUsers();
      
      // Clear selection
      setSelectedUsers([]);
      
    } catch (err) {
      setError(err.message);
      console.error('Error approving users:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectUsers = async () => {
    if (selectedUsers.length === 0) return;
    
    try {
      setActionLoading(true);
      
      // Process each selected user individually
      for (const user of selectedUsers) {
        // Send rejection request to backend for each user
        const response = await fetch('/api/sendRejectEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.userId,
            firstName: user.firstName,
            recipientEmail: user.recipientEmail
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to reject user: ${user.firstName}`);
        }
      }
      
      // Refresh the user list after rejection
      await fetchUsers();
      
      // Clear selection
      setSelectedUsers([]);
      
    } catch (err) {
      setError(err.message);
      console.error('Error rejecting users:', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Box height="100%" sx={{ maxWidth: 1000, margin: '0 auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Pending User Approval
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Pending Users ({userData.pendingUsersCount})
            {userData.pendingUsersCount > 100 && 
              <Typography variant="caption" sx={{ ml: 1 }}>
                (Maximum 100 can be selected at once)
              </Typography>
            }
          </Typography>
            
          <ButtonGroup disabled={selectedUsers.length === 0 || actionLoading}>
            <Button 
              variant="contained" 
              color="success"
              onClick={handleApproveUsers}
            >
              Approve Selected ({selectedUsers.length}{selectedUsers.length === 100 ? " (max)" : ""})
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={handleRejectUsers}
            >
              Reject Selected ({selectedUsers.length}{selectedUsers.length === 100 ? " (max)" : ""})
            </Button>
          </ButtonGroup>
          </Box>
          
          {actionLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          
          <TableContainer component={Paper} sx={{
            paddingBottom: '110px',
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < Math.min(100, userData.pendingUsers.length)}
                    checked={selectedUsers.length > 0 && selectedUsers.length === Math.min(100, userData.pendingUsers.length)}
                    onChange={handleSelectAll}
                  />
                  </TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.pendingUsers.map((user) => (
                  <TableRow 
                    key={user.id}
                    hover
                    onClick={() => handleSelectUser(user)}  // Pass the whole user object
                    selected={selectedUsers.some(item => item.userId === user.id)}  // Check if this user is selected
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.some(item => item.userId === user.id)}
                        onChange={() => {}}
                      />
                    </TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
                {userData.pendingUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No pending users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default PendingUserApproval;