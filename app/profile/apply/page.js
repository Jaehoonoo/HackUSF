"use client";

import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

import countriesList from "./countriesList";
import universitiesList from "./universitiesList";
import majorsList from "./majorsList";

const saveApplication = async (userId, formData) => {
  try {
    const response = await fetch('/api/saveApplication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId, ...formData}),
    })
  } catch (error) {
    console.error('Error saving application', error)
  }
}

export default function Apply() {
  const { userId } = useAuth()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    country: "",
    gender: "",
    ethnicity: "",

    school: "",
    major: "",
    levelOfStudy: "",

    firstHackathon: false,
    shirtSize: "",
    dietaryRestrictions: [],
    otherAccommodations: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // If the field is a checkbox, handle it appropriately
    if (type === "checkbox") {
      // Check if the field is expected to be an array (e.g., dietaryRestrictions)
      if (Array.isArray(formData[name])) {
        setFormData({
          ...formData,
          [name]: checked
            ? [...formData[name], value] // Add value if checked
            : formData[name].filter(item => item !== value), // Remove value if unchecked
        });
      } else {
        // Handle non-array checkbox fields if needed (e.g., single checkboxes like "First Hackathon?")
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      // Handle non-checkbox inputs (TextField, Select, etc.)
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make API call to submit the form data
    saveApplication(userId, formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 3,
        alignItems: "center",
        flexWrap: "wrap",
        width: { xs: "95%", sm: "90%", md: "85%", lg: "75%" },
        margin: "auto",
        padding: 2,
        border: "3px solid black",
        boxShadow: "4px 4px 0 black",
        borderRadius: 3,
        mt: { xs: 8, lg: 2 },
        mb: 3,
      }}
    >
      {/* Personal Info Section */}
      <Typography
        variant="h4"
        sx={{
          width: "100%",
          textAlign: "center",
          marginBottom: 2,
          fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
        }}
      >
        Personal Info
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        sx={{ width: "100%" }}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        sx={{ width: "100%" }}
      />
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleChange}
        sx={{ width: "100%" }}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        sx={{ width: "100%" }}
      />
      <TextField
        label="Age"
        variant="outlined"
        name="age"
        value={formData.age}
        onChange={handleChange}
        sx={{ width: "100%" }}
      />
      <Autocomplete
        disablePortal
        options={countriesList}
        renderInput={(params) => <TextField {...params} label="Country of Residence" />}
        value={formData.country}
        onChange={handleChange}
        name="country"
        sx={{ width: "100%", margin: "normal" }}
      />
      <Autocomplete
        disablePortal
        options={["Male", "Female", "Other", "Prefer not to say"]}
        renderInput={(params) => <TextField {...params} label="Gender" />}
        value={formData.gender}
        onChange={handleChange}
        name="gender"
        sx={{ width: "100%", margin: "normal" }}
      />
      <Autocomplete
        disablePortal
        options={[
          "American Indian or Alaska Native",
          "Asian",
          "Black or African American",
          "Hispanic or Latino",
          "Native Hawaiian or Other Pacific Islander",
          "White",
          "Not Hispanic or Latino",
        ]}
        renderInput={(params) => <TextField {...params} label="Ethnicity" />}
        value={formData.ethnicity}
        onChange={handleChange}
        name="ethnicity"
        sx={{ width: "100%", margin: "normal" }}
      />

      {/* Education Info Section */}
      <Typography
        variant="h4"
        sx={{
          width: "100%",
          textAlign: "center",
          marginBottom: 2,
          fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
        }}
      >
        School Info
      </Typography>
      <Autocomplete
        disablePortal
        options={universitiesList}
        renderInput={(params) => <TextField {...params} label="University" />}
        value={formData.school}
        onChange={handleChange}
        name="school"
        sx={{ width: "100%", margin: "normal" }}
      />
      <Autocomplete
        disablePortal
        options={majorsList}
        renderInput={(params) => <TextField {...params} label="Major" />}
        value={formData.major}
        onChange={handleChange}
        name="major"
        sx={{ width: "100%", margin: "normal" }}
      />
      <Autocomplete
        disablePortal
        options={["Freshman", "Sophomore", "Junior", "Senior", "Graduate Student"]}
        renderInput={(params) => <TextField {...params} label="Level of Study" />}
        value={formData.levelOfStudy}
        onChange={handleChange}
        name="levelOfStudy"
        sx={{ width: "100%", margin: "normal" }}
      />

      {/* Event Info Section */}
      <Typography
        variant="h4"
        sx={{
          width: "100%",
          textAlign: "center",
          marginBottom: 2,
          fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
        }}
      >
        Event Info
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="First Hackathon?"
          name="firstHackathon"
          onChange={handleChange}
        />
      </FormGroup>
      <Autocomplete
        disablePortal
        options={["XS", "S", "M", "L", "XL", "XXL"]}
        renderInput={(params) => <TextField {...params} label="Shirt Size" />}
        value={formData.shirtSize}
        onChange={handleChange}
        name="shirtSize"
        sx={{ width: "100%", margin: "normal" }}
      />
      <FormGroup sx={{ width: "100%" }}>
        <Typography variant="h6">Dietary Restrictions</Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="Vegan"
          value="Vegan"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Vegetarian"
          value="Vegetarian"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Halal"
          value="Halal"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Nuts"
          value="Nuts"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Fish"
          value="Fish"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Gluten"
          value="Gluten"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Dairy"
          value="Dairy"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Eggs"
          value="Eggs"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="No Beef"
          value="No Beef"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="No Pork"
          value="No Pork"
          name="dietaryRestrictions"
          onChange={handleChange}
        />
        <TextField
          label="Other Accommodations?"
          variant="outlined"
          name="otherAccommodations"
          value={formData.otherAccommodations}
          onChange={handleChange}
          margin="normal"
          sx={{ width: "100%" }}
        />
      </FormGroup>

      {/* Disclaimer/COC/Privacy Section */}
      <FormGroup>
        <Typography variant="h6">Disclaimer</Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="I understand that this is an application and does not guarantee admission."
          onChange={handleChange}
        />
        <Typography variant="h6">Code of Conduct</Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="I have read and agree to the MLH Code of Conduct"
          onChange={handleChange}
        />
        <Typography variant="h6">Privacy Policy</Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in line with the MLH Privacy Policy. I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy."
          onChange={handleChange}
        />
      </FormGroup>

      {/* Submit Button */}
      <Box width="100%" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2
      }}>
        <Button
          sx={{
            width: 'max(200px, 20vw)',
            textTransform: 'none',
            color: 'black',
            fontWeight: 700,
            fontSize: {
              xs: '1.2rem',
              sm: '1.4rem',
            },
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
          onClick={handleSubmit} // Trigger routing on click
        >
          Apply/Save
        </Button>
      </Box>
    </Box>
  );
}
