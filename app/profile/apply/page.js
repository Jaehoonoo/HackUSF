"use client"

import { Box, TextField, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from "@mui/material";

export default function Apply() {
  return (
    <Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <TextField
        label="First Name"
        variant="outlined"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        margin="normal"
      />
      </Box>
    </Box>
  )
}