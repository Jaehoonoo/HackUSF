"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Paper, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton } from "@mui/material";

// Mock API function to fetch "Accepted" users
const fetchAcceptedUsers = async () => {
  try {
    const response = await fetch("/api/getAcceptedUsers");
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching accepted users:", error);
    return [];
  }
};

// Mock API function to update user status to "Checked-In" with timestamp
const checkInUser = async (userId) => {
  try {
    const response = await fetch(`/api/checkInUser/${userId}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to check in user");
    return await response.json();
  } catch (error) {
    console.error("Error checking in user:", error);
    return null;
  }
};

export default function CheckInPage() {
  const [acceptedUsers, setAcceptedUsers] = useState([]); // Users eligible for check-in
  const [checkedInUsers, setCheckedInUsers] = useState([]); // Users who checked in
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch accepted and checked-in users on mount
  useEffect(() => {
    refreshData();
  }, []);

  // Function to refresh data
  const refreshData = async () => {
    const users = await fetchAcceptedUsers();
    setAcceptedUsers(users);
  };

  // Simulated QR Code Scan - Marks user as "Checked-In"
  const handleQRCodeScan = async (userId) => {
    const updatedUser = await checkInUser(userId);
    if (updatedUser) {
      const timestamp = new Date().toLocaleString(); // Capture check-in time

      // Remove user from accepted list & add to checked-in list with timestamp
      setAcceptedUsers((prev) => prev.filter((user) => user.id !== userId));
      setCheckedInUsers((prev) => [...prev, { ...updatedUser, status: "Checked-In", timestamp }]);
    }
  };

  return (
    <Box height="100%" sx={{ 
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      }}>
      {/* Header with Refresh Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h4">Check-In Page</Typography>
      </Box>
      {/* Main Container - Centered QR Code Platform */}
      <Box>
        <Typography variant="body1" textAlign="center" sx={{ pb: 3 }}>
          Scan the QR code below to check in.
        </Typography>

        {/* QR Code Platform */}
        <Paper
          elevation={3}
          sx={{
            width: "300px",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          }}
          onClick={() => {
            if (acceptedUsers.length > 0) handleQRCodeScan(acceptedUsers[0].id);
          }}
        >
          <Typography variant="h6" color="gray">
            Scan QR Code
          </Typography>
        </Paper>
      </Box>

      {/* Checked-In Users Table */}
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Checked-In Users
        </Typography>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Timestamp</TableCell> {/* New Column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {checkedInUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Typography color="success.main">Checked-In</Typography>
                  </TableCell>
                  <TableCell>{user.timestamp}</TableCell> {/* Display Timestamp */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={checkedInUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Paper>
    </Box>
  );
}
