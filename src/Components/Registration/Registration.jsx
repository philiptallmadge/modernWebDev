import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/Auth.js";
// import the necessary components and icons from material UI
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Alert
} from "@mui/material";
import { PersonAdd as RegisterIcon } from "@mui/icons-material";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    userType: "band", // default to band
    name: "",
    genre: "",
    location: "",
    genrePreferred: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Starting registration with data:", formData);
      const additionalInfo = {
        name: formData.name,
        genre: formData.genre,
        location: formData.location,
        genrePreferred: formData.genrePreferred
      };

      const result = await registerUser(
        formData.username,
        formData.password,
        formData.email,
        formData.userType,
        additionalInfo
      );
      console.log("Registration successful:", result);

      // redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  // styling
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <RegisterIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Create your account to connect with the music community
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>I am a</InputLabel>
                <Select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  label="I am a"
                >
                  <MenuItem value="band">Band</MenuItem>
                  <MenuItem value="venue">Venue</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {formData.userType === "band" ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Band Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Venue Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Preferred Genre"
                    name="genrePreferred"
                    value={formData.genrePreferred}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                startIcon={<RegisterIcon />}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Registration; 