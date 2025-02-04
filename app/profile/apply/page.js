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
import { useEffect, useState, useRef } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

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

const getApplication = async (userId) => {
  try {
    const response = await fetch(`/api/getApplication?userId=${encodeURIComponent(userId)}`, {
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
    console.error('Error getting application', error)
    return null
  }
}

export default function Apply() {
  const { userId } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false);

  

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

    disclaimer: false,
    codeOfConduct: false,
    privacyPolicy: false
  });

  const { user, isLoaded } = useUser();
  const hasSetEmail = useRef(false);

  useEffect(() => {
    if (isLoaded && user && user.primaryEmailAddress?.emailAddress && !hasSetEmail.current && userId) {
      const timeoutId = setTimeout(() => {
        // Set email only if it hasn't been set already
        setFormData((prevFormData) => {
          if (prevFormData.email !== user.primaryEmailAddress.emailAddress) {
            return { ...prevFormData, email: user.primaryEmailAddress.emailAddress };
          }
          return prevFormData;
        });
        hasSetEmail.current = true;
      }, 500);
  
      // Cleanup function to clear the timeout when dependencies change or component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [user, isLoaded, userId]); // Depend on userId to ensure data is fetched based on the user
  
  
  useEffect(() => {
    if (userId) {
      const fetchApplication = async () => {
        const result = await getApplication(userId);
        if (result && result.success) {
          setFormData((prevFormData) => {
            // Only update if there's a change in data
            if (prevFormData !== result.data) {
              return { ...prevFormData, ...result.data };
            }
            return prevFormData;
          });
        }
      };
      fetchApplication();
    }
  }, [userId]); // Separate effect to handle fetching application data

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

    if (loading) return; // Prevent multiple submissions

    setLoading(true); // Disable button

    // Make API call to submit the form data
    saveApplication(userId, formData);

    // Show popup message
    setShowPopup(true);

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
      setLoading(false); // Enable button again
    }, 3000);

  };

  // useEffect(() => {
  //   if(userId) {
  //     const fetchApplication = async () => {
  //       const result = await getApplication(userId)
  //       if (result && result.success) {
  //         setFormData(result.data)
  //       }
  //     }
  //     fetchApplication()
  //   }
  // }, [userId])

  return (
    <form onSubmit={handleSubmit}>
    <Box
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
        required
      />
      <TextField
        label="Last Name"
        variant="outlined"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        sx={{ width: "100%" }}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleChange}
        sx={{ width: "100%" }}
        required
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        sx={{ width: "100%" }}
        required
      />
      <TextField
        label="Age"
        variant="outlined"
        name="age"
        value={formData.age}
        onChange={handleChange}
        sx={{ width: "100%" }}
        required
      />
      <Autocomplete
        disablePortal
        options={countriesList}
        renderInput={(params) => <TextField {...params} label="Country of Residence" required />}
        value={formData.country}
        onChange={(event, newValue) => handleChange({ target: { name: 'country', value: newValue } })}
        name="country"
        sx={{ width: "100%", margin: "normal" }}
      />
      <Autocomplete
        disablePortal
        options={["Male", "Female", "Other", "Prefer not to say"]}
        renderInput={(params) => <TextField {...params} label="Gender" required />}
        value={formData.gender}
        onChange={(event, newValue) => handleChange({ target: { name: 'gender', value: newValue } })}
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
        renderInput={(params) => <TextField {...params} label="Ethnicity" required />}
        value={formData.ethnicity}
        onChange={(event, newValue) => handleChange({ target: { name: 'ethnicity', value: newValue } })}
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
        renderInput={(params) => <TextField {...params} label="University" required />}
        value={formData.school}
        onChange={(event, newValue) => handleChange({ target: { name: 'school', value: newValue } })}
        name="school"
        sx={{ width: "100%", margin: "normal" }}
      />
      <Autocomplete
        disablePortal
        options={majorsList}
        renderInput={(params) => <TextField {...params} label="Major" required />}
        value={formData.major}
        onChange={(event, newValue) => handleChange({ target: { name: 'major', value: newValue } })}
        name="major"
        sx={{ width: "100%", margin: "normal" }}
      />
      <Autocomplete
        disablePortal
        options={["Freshman", "Sophomore", "Junior", "Senior", "Graduate Student"]}
        renderInput={(params) => <TextField {...params} label="Level of Study" required />}
        value={formData.levelOfStudy}
        onChange={(event, newValue) => handleChange({ target: { name: 'levelOfStudy', value: newValue } })}
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
          control={<Checkbox checked={formData.firstHackathon} />}
          label="Is This Your First Hackathon?"
          name="firstHackathon"
          onChange={handleChange}
        />
      </FormGroup>
      <Autocomplete
        disablePortal
        options={["XS", "S", "M", "L", "XL", "XXL"]}
        renderInput={(params) => <TextField {...params} label="Shirt Size" required />}
        value={formData.shirtSize}
        onChange={(event, newValue) => handleChange({ target: { name: 'shirtSize', value: newValue } })}
        name="shirtSize"
        sx={{ width: "100%", margin: "normal" }}
      />
      <FormGroup sx={{ width: "100%" }}>
        <Typography variant="h6">Dietary Restrictions</Typography>
        {["Vegan", "Vegetarian", "Halal", "Nuts", "Fish", "Gluten", "Dairy", "Eggs", "No Beef", "No Pork"].map((restriction) => (
          <FormControlLabel
            key={restriction}
            control={
              <Checkbox
                checked={formData.dietaryRestrictions.includes(restriction)}
                value={restriction}
                name="dietaryRestrictions"
                onChange={handleChange}
              />
            }
            label={restriction}
          />
        ))}

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
          control={<Checkbox checked={formData.disclaimer} required />}
          label="I understand that this is an application and does not guarantee admission."
          name="disclaimer"
          onChange={handleChange}
        />
        <Typography variant="h6">Code of Conduct</Typography>
        <FormControlLabel
          control={<Checkbox checked={formData.codeOfConduct} required />}
          label={
            <>
              I have read and agree to the{' '}
              <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                MLH Code of Conduct
              </a>
            </>
          }
          name="codeOfConduct"
          onChange={handleChange}
        />
        <Typography variant="h6">Privacy Policy</Typography>
        <FormControlLabel
          control={<Checkbox checked={formData.privacyPolicy} required />}
          label={
            <>
              I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in line with the MLH Privacy Policy. I further agree to the terms of both the{' '}
              <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                MLH Privacy Policy
              </a> and the{' '}
              <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                MLH Contest Terms and Conditions.
              </a>
            </>
          }
          name="privacyPolicy"
          onChange={handleChange}
        />
      </FormGroup>

      {/* Submit Button */}
      <Box width="100%" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
        mb: 2
      }}>
        <Button
          type="submit"
          disabled={loading}
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
        >
          Apply/Save
        </Button>
      </Box>

      {/* Temporary Popup Message */}
      {showPopup && (
        <Box
          sx={{
            position: "fixed",
            top: "40%",
            left: {xs: "50%", lg: "58%"},
            transform: "translate(-50%, -50%)",
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <Typography>Application submitted successfully!</Typography>
        </Box>
      )}
    </Box>
    </form>
  );
}
