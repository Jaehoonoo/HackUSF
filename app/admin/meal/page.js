"use client";

import AdminNavbar from "@/components/adminNavbar/adminNavbar";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

// Fetch all checked-in users
const fetchCheckedInUsers = async () => {
  try {
    const response = await fetch("/api/getCheckedInUsers"); // Endpoint for users who checked in
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching checked-in users:", error);
    return [];
  }
};

// API function to update user status to "Mealed"
const markAsMealed = async (userId) => {
  try {
    const response = await fetch(`/api/markAsMealed/${userId}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to mark user as Mealed");
    return await response.json();
  } catch (error) {
    console.error("Error marking user as Mealed:", error);
    return null;
  }
};

export default function MealPage() {
  const [checkedInUsers, setCheckedInUsers] = useState([]); // Users eligible for meals
  const [mealedUsers, setMealedUsers] = useState([]); // Users who have received meals
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch checked-in users on mount
  useEffect(() => {
    refreshData();
  }, []);

  // Function to refresh data
  const refreshData = async () => {
    const users = await fetchCheckedInUsers();
    setCheckedInUsers(users);
  };

  // Simulated QR Code Scan - Marks user as "Mealed"
  const handleQRCodeScan = async (userId) => {
    const updatedUser = await markAsMealed(userId);
    if (updatedUser) {
      const timestamp = new Date().toLocaleString(); // Capture meal timestamp

      // Remove user from checked-in list & add to mealed list with timestamp
      setCheckedInUsers((prev) => prev.filter((user) => user.id !== userId));
      setMealedUsers((prev) => [...prev, { ...updatedUser, status: "Mealed", timestamp }]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Admin Navbar */}
      <Box sx={{ mb: 3 }}>
        <AdminNavbar />
      </Box>

      {/* Header with Refresh Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Meal Page</Typography>
        <IconButton onClick={refreshData} title="Refresh Data">
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Main Container - Centered QR Code Platform */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography variant="body1" sx={{ mb: 3 }}>
          Scan the QR code below to get meal.
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
            if (checkedInUsers.length > 0) handleQRCodeScan(checkedInUsers[0].id);
          }}
        >
          <Typography variant="h6" color="gray">
            Scan QR Code
          </Typography>
        </Paper>
      </Box>

      {/* Mealed Users Table */}
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Mealed Users
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
              {mealedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Typography color="success.main">Mealed</Typography>
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
          count={mealedUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Paper>
    </Container>
  );
}
